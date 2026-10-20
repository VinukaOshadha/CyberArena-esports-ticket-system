import {
  Routes,
  Route
} from 'react-router-dom';

import Navbar
  from './components/Navbar';

import ProtectedRoute
  from './components/ProtectedRoute';

import AdminRoute
  from './components/AdminRoute';

import Home
  from './pages/Home';

import Tournaments
  from './pages/Tournaments';

import MyTickets
  from './pages/MyTickets';

import Leaderboard
  from './pages/Leaderboard';

import Support
  from './pages/Support';

import Login
  from './pages/Login';

import Register
  from './pages/Register';

import Profile
  from './pages/Profile';

import AdminDashboard
  from './pages/AdminDashboard';

import NotFound
  from './pages/NotFound';

import './App.css';


function App() {

  return (

    <div className="app">

      <Navbar />


      <Routes>

        <Route
          path="/"
          element={
            <Home />
          }
        />


        <Route
          path="/tournaments"
          element={
            <Tournaments />
          }
        />


        <Route
          path="/my-tickets"
          element={

            <ProtectedRoute>

              <MyTickets />

            </ProtectedRoute>

          }
        />


        <Route
          path="/leaderboard"
          element={
            <Leaderboard />
          }
        />


        <Route
          path="/support"
          element={
            <Support />
          }
        />


        <Route
          path="/profile"
          element={

            <ProtectedRoute>

              <Profile />

            </ProtectedRoute>

          }
        />


        <Route
          path="/admin"
          element={

            <AdminRoute>

              <AdminDashboard />

            </AdminRoute>

          }
        />


        <Route
          path="/login"
          element={
            <Login />
          }
        />


        <Route
          path="/register"
          element={
            <Register />
          }
        />


        <Route
          path="*"
          element={
            <NotFound />
          }
        />

      </Routes>

    </div>

  );

}


export default App;