import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Login from "@/pages/Login/Login";
import React from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
