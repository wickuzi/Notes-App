import React, { useState } from "react";
import logo1 from "../assets/logo-2.png";
import "../style/main.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [menuOpen] = useState(false);
  const Navigate = useNavigate();

  return (
    <div id="body">
      {/* Navbar */}
      <header className="navbar-default">
        <a className="navbar-brand" href="#home">
          <img src={logo1} alt="LOGO" />
      
        </a>

        <nav className={`navbar-nav ${menuOpen ? "open" : ""}`}>
          <li className="btn-iniciar"><a onClick={() => Navigate('/login')}>Inicia Sesion Ahora</a></li>

        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero-area">
        <div className="container">
          <h1>Una App simple de Notas</h1>
          <p>App de Notas desarrollada con Django y React, con un diseño limpio y funcional.</p>
        <button className="btn-home" onClick={() => Navigate("/register")}>Registrate</button>
        </div>
      </section>

      

      
    </div>
  );
}

export default Home;
