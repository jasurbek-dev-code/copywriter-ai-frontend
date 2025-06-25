import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import NavbarProfile from "../components/navbar-profile";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  const location = useLocation();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    setisLoggedIn(!!localStorage.getItem("token"));
  }, [location]);
  return (
    <>
      {isLoggedIn ? <NavbarProfile /> : <Navbar />}
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
      <Footer />
    </>
  );
}
