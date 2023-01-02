import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "../ProtectedRoute";
import { Register } from "../pages/Register";
import { AuthProvider } from "../../content/AuthContext";
import { Navbar } from "./Navbar";

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
