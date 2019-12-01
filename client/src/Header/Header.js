import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

export default props => {
  const links = [
    { exact: true, id: "home-link", to: "/", label: "Accueil" },
    { id: "projects-link", to: "/projects", label: "Projets" },
    { id: "publications-link", to: "/publications", label: "Publications" }
  ];

  return (
    <header>
      <div id="logo-container">
        <img id="logo" src="/img/logo-coding.png" alt="Logo de Polydata" />
        <div id="hdr">
          <p id="sitetitle">Labo Semantic IA</p>
          <p id="subtitle">
            Intelligence artificielle
            <br />
            Web sémantique
          </p>
        </div>
      </div>
      <nav>
        <ul className="links">
          {links.map(l => (
            <li key={l.id}>
              <NavLink
                id={l.id}
                activeClassName="active"
                to={l.to}
                exact={l.exact}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
