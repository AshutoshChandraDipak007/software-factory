import React from "react";
import "./App.css";
import Example from "./features/othermodules/MaterialTableCRUD";
import ResponsiveApp from "./features/othermodules/responsive-web/ResponsiveApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./components/contact/Contacts";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<ResponsiveApp />}></Route>
          <Route path="contact" element={<Contacts />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
