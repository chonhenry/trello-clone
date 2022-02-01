import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadUser } from "./api";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

const App: React.FC = () => {
  const { setUser } = useAuth();

  useEffect(() => {
    loadUser()
      .then((res) => {
        console.log(res);
        if (setUser) {
          setUser({
            name: res.data.name,
            _id: res.data._id,
            email: res.data.email,
          });
        }
      })
      .catch((error) => {
        // console.log(error.response);
      });
  }, [setUser]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
