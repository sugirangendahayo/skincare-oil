// App.jsx - Updated with admin routes and protection
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Categories from './pages/Categories';
import AdminDashboard from './pages/admin/AdminDashboard';
import { isAdmin } from './utils/auth';

// Protected Admin Route component
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === 'admin' ? children : <Navigate to="/" />;
};

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/categories" element={<Categories />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;