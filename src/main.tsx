import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/home/home";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import UserProfile from "./pages/user/user-profile";
import ProtectedRoute from "./components/protected-route";
import ScrollTo from "./scrollto";
import ProtectedRouteAuth from "./components/protectedrouteauth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollTo />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <ProtectedRouteAuth>
                <Register />
              </ProtectedRouteAuth>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRouteAuth>
                <Login />
              </ProtectedRouteAuth>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
