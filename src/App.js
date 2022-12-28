import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Register } from "./components/pages/Register";
import { AuthProvider } from "./content/AuthContext";
import { Navbar } from "./components/layouts/Navbar";

function App() {
  useEffect(() => {
    document.body.classList.add("h-full");
    document.documentElement.classList.add("h-full", "bg-gray-100");
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="min-h-full">
                <Navbar />
                <Home />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
