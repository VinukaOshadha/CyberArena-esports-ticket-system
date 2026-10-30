const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');
const Tournament = require('../models/Tournament');


// =========================================================
// GENERATE UNIQUE TICKET CODE
// =========================================================

const generateTicketCode = () => {
  return `CA-${Date.now()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;
};


// =========================================================
// RESERVE TICKET
// POST /api/tickets/reserve/:tournamentId
// Maximum 3 active tickets per user per tournament
// =========================================================

const reserveTicket = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    if (
      !tournamentId ||
      !mongoose.Types.ObjectId.isValid(tournamentId)
    ) {
      return res.status(400).json({
        message: 'Invalid tournament ID.',
      });
    }

    const tournament =
      await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({
        message: 'Tournament not found.',
      });
    }

    if (tournament.availableSeats <= 0) {
      return res.status(400).json({
        message: 'No seats available for this tournament.',
      });
    }


    // Count current ACTIVE tickets
    const activeTicketCount =
      await Ticket.countDocuments({
        user: req.user._id,
        tournament: tournamentId,
        status: 'RESERVED',
      });


    if (activeTicketCount >= 3) {
      return res.status(400).json({
        message:
          'Maximum 3 tickets allowed per tournament.',
      });
    }


    // Safely decrease one available seat
    const updatedTournament =
      await Tournament.findOneAndUpdate(
        {
          _id: tournamentId,
          availableSeats: { $gt: 0 },
        },
        {
          $inc: {
            availableSeats: -1,
          },
        },
        {
          new: true,
        }
      );


    if (!updatedTournament) {
      return res.status(400).json({
        message: 'No seats available for this tournament.',
      });
    }


    try {
      const ticket = await Ticket.create({
        user: req.user._id,
        tournament: tournamentId,
        ticketCode: generateTicketCode(),
        price: tournament.price,
        status: 'RESERVED',
        reservedAt: new Date(),
      });


      const populatedTicket =
        await Ticket.findById(ticket._id)
          .populate('tournament');


      return res.status(201).json({
        message: 'Ticket reserved successfully.',
        ticket: populatedTicket,
        reservedCount: activeTicketCount + 1,
        maxTickets: 3,
      });

    } catch (ticketError) {

      // Return the seat if ticket creation fails
      await Tournament.findByIdAndUpdate(
        tournamentId,
        {
          $inc: {
            availableSeats: 1,
          },
        }
      );

      throw ticketError;
    }

  } catch (error) {
    console.error(
      'RESERVE TICKET ERROR:',
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        'Unable to reserve ticket.',
    });
  }
};


// =========================================================
// GET LOGGED-IN USER'S TICKETS
// GET /api/tickets/my
// =========================================================

const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      user: req.user._id,
    })
      .populate('tournament')
      .sort({
        createdAt: -1,
      });


    return res.status(200).json(
      tickets
    );

  } catch (error) {
    console.error(
      'GET MY TICKETS ERROR:',
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        'Could not load your tickets.',
    });
  }
};


// =========================================================
// CANCEL TICKET
// PATCH /api/tickets/cancel/:ticketId
// =========================================================

const cancelTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    if (
      !ticketId ||
      !mongoose.Types.ObjectId.isValid(ticketId)
    ) {
      return res.status(400).json({
        message: 'Invalid ticket ID.',
      });
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: 'Ticket not found.',
      });
    }

    // User can only cancel their own ticket
    if (
      ticket.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: 'Not authorized.',
      });
    }

    // Prevent double cancellation
    if (ticket.status === 'CANCELLED') {
      return res.status(400).json({
        message: 'Ticket is already cancelled.',
      });
    }

    // Store tournament ID before changing ticket
    const tournamentId = ticket.tournament;

    // Change ticket status
    ticket.status = 'CANCELLED';

    await ticket.save();

    // =====================================================
    // RETURN ONE SEAT TO TOURNAMENT
    // =====================================================

    const updatedTournament =
      await Tournament.findByIdAndUpdate(
        tournamentId,
        {
          $inc: {
            availableSeats: 1,
          },
        },
        {
          new: true,
        }
      );

    if (!updatedTournament) {
      return res.status(404).json({
        message: 'Tournament not found.',
      });
    }

    return res.status(200).json({
      message: 'Ticket cancelled successfully.',
      ticket,
      tournament: updatedTournament,
    });

  } catch (error) {
    console.error(
      'CANCEL TICKET ERROR:',
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        'Unable to cancel ticket.',
    });
  }
};


module.exports = {
  reserveTicket,
  getMyTickets,
  cancelTicket,
};
