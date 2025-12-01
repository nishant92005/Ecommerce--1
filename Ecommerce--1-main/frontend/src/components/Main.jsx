import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./auth/signup/SignUp";
import Login from "./auth/login/Login";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Main;
