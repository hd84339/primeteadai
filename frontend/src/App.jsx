import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Shared Tasks Route (Placeholder) */}
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
                    <p className="text-gray-500 mt-1">Manage your active projects.</p>
                    <div className="mt-8 p-12 bg-white rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                      <p>Tasks board coming soon...</p>
                    </div>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Profile Route (Placeholder) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your account settings.</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
