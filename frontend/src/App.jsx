import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Tournaments from './pages/Tournaments';
import Leaderboard from './pages/Leaderboard';
import Support from './pages/Support';
import Login from './pages/Login';

// ADD THIS LINE
import Register from './pages/Register';

import './App.css';

function App() {
  return (
    <div className="app">

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/tournaments"
          element={<Tournaments />}
        />

        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />

        <Route
          path="/support"
          element={<Support />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ADD THIS REGISTER ROUTE */}
        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

    </div>
  );
}

export default App;