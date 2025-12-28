import React from "react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
