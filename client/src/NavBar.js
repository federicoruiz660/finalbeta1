import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar({ setAdminView, setClientView, setReportsView, setUpdatePricesView }) {
  const location = useLocation();

  const handleUpdatePricesClick = () => {
    setUpdatePricesView();
    setAdminView(false);
    setClientView(false);
    setReportsView(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Control, Stock y Listado
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${location.pathname === "/admin" ? "active" : ""}`}>
              <Link className="nav-link" to="/admin" onClick={setAdminView}>
                Administrar productos
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === "/client" ? "active" : ""}`}>
              <Link className="nav-link" to="/client" onClick={setClientView}>
                Vista del Cliente
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === "/update" ? "active" : ""}`}>
              <Link
                className="nav-link"
                to="/update" // Corregir la ruta a "/update"
                onClick={handleUpdatePricesClick}
              >
                Actualizaciones de precios
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;