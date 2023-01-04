import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "../ProtectedRoute";
import { Register } from "../pages/Register";
import { AuthProvider } from "../../content/AuthContext";
import { Navbar } from "./Navbar";
import { Footer } from "flowbite-react";

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
            <ProtectedRoute register={false}>
              <div className="min-h-full">
                <Navbar />
                <Home />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute register={true}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
