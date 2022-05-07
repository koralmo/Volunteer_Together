import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import AllNote from "./screens/AllNote/AllNote";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import SingleNote from "./screens/SingleNote/SingleNote";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/SingleNote/CreateNote";
import { useState } from "react";
import React from "react";
import { Routes } from "react-router-dom";
const App = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
          <Route path="/allnotes" element={<AllNote search={search} />} />
          <Route path="/note/:id" element={<SingleNote />} />
          <Route path="/createnote" element={<CreateNote />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
