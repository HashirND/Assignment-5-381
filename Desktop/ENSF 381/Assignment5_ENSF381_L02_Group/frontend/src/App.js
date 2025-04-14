import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Homepage from './components/Homepage.js';
import CoursesPage from './components/CoursesPage.js';
import LoginPage from './components/LoginPage.js';
import SignupPage from './components/SignupPage.js'; 

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> {/**/}
          <Route 
            path="/courses" 
            element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
