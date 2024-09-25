import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import PrivateRoute from "./components/Private";
import "./styles/App.css";

import "../src/styles/App.css";
import Navbar from "./components/Navbar";
import Layout from "./pages/Layout";
import Requests from "./pages/Requests";
import Footer from "./components/footer";
import Landing from "./pages/Landing";
import Analytics from "./pages/Analytics";

const Main = lazy(() => import("./pages/Main"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const PetView = lazy(() => import("./pages/PetView"));
const Profile = lazy(() => import("./pages/Profile"));
const AddPet = lazy(() => import("./pages/AddPet"));
const Chat = lazy(() => import("./pages/Chat"));

const App = () => {
  return (
    <div>
      <Router>
        <Layout>
          {/* Navbar */}
          <Navbar />
          {/* Routing */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route path="/home" element={<Main />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/Profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/requests"
                element={
                  <PrivateRoute>
                    <Requests />
                  </PrivateRoute>
                }
              />
              <Route
                path="/addpet"
                element={
                  <PrivateRoute>
                    <AddPet />
                  </PrivateRoute>
                }
              />
              <Route path="/petview/:PetID" element={<PetView />} />
              <Route path="/chat/:receiverId/:petId" element={<Chat />} />
              <Route path="/chats" element={<Chat />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </Suspense>
          {/* Footer */}
          <Footer />
        </Layout>
      </Router>
    </div>
  );
};

export default App;
