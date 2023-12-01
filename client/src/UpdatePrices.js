import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UpdatePrices.css";

function UpdatePrices() {
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [porcentajeMarca, setPorcentajeMarca] = useState("");
  const [porcentajeCategoria, setPorcentajeCategoria] = useState("");
  const [reload, setReload] = useState(false);
  const [updatedInfoList, setUpdatedInfoList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/marcas").then((response) => {
      setMarcas(response.data);
    });

    Axios.get("http://localhost:3001/categorias").then((response) => {
      setCategorias(response.data);
    });
  }, [reload]);

  const handleUpdatePricesByMarca = () => {
    Axios.put(`http://localhost:3001/update-precios/${selectedMarca}`, {
      porcentaje: porcentajeMarca,
    })
      .then((response) => {
        alert(response.data);
        const updatedInfo = {
          tipo: "Marca",
          nombre: marcas.find((marca) => marca.id === parseInt(selectedMarca))?.nombre,
          porcentaje: porcentajeMarca,
        };
        setUpdatedInfoList([...updatedInfoList, updatedInfo]);
        setReload(!reload);
      })
      .catch((error) => {
        console.error(error);
        alert("Error al actualizar los precios por marca");
      });
  };

  const handleUpdatePricesByCategoria = () => {
    Axios.put(`http://localhost:3001/update-precios-categoria/${selectedCategoria}`, {
      porcentaje: porcentajeCategoria,
    })
      .then((response) => {
        alert(response.data);
        const updatedInfo = {
          tipo: "Categoría",
          nombre: categorias.find((categoria) => categoria.id === parseInt(selectedCategoria))?.nombre,
          porcentaje: porcentajeCategoria,
        };
        setUpdatedInfoList([...updatedInfoList, updatedInfo]);
        setReload(!reload);
      })
      .catch((error) => {
        console.error(error);
        alert("Error al actualizar los precios por categoría");
      });
  };

  const handleFinalizar = () => {
    setUpdatedInfoList([]);
    setReload(!reload);
  };

  return (
    <div className="container">
      <h2>Actualizar Precios</h2>

      <div className="form-group">
        <h3>Por Marca</h3>
        <label>
          Seleccione la marca:
          <select value={selectedMarca} onChange={(e) => setSelectedMarca(e.target.value)}>
            <option value="">Seleccione una marca</option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Porcentaje de multiplicación:
          <input
            type="text"
            value={porcentajeMarca}
            onChange={(e) => setPorcentajeMarca(e.target.value)}
          />
        </label>
        <br />
        <button className="btn btn-primary" onClick={handleUpdatePricesByMarca}>
          Actualizar Precios
        </button>
      </div>

      <div className="form-group">
        <h3>Por Categoría</h3>
        <label>
          Seleccione la categoría:
          <select
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Porcentaje de multiplicación:
          <input
            type="text"
            value={porcentajeCategoria}
            onChange={(e) => setPorcentajeCategoria(e.target.value)}
          />
        </label>
        <br />
        <button className="btn btn-primary" onClick={handleUpdatePricesByCategoria}>
          Actualizar Precios
        </button>
      </div>

      {updatedInfoList.length > 0 && (
        <div>
          <h3>Información Actualizada</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Nombre</th>
                <th>Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              {updatedInfoList.map((updatedInfo, index) => (
                <tr key={index}>
                  <td>{updatedInfo.tipo}</td>
                  <td>{updatedInfo.nombre}</td>
                  <td>{updatedInfo.porcentaje}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div>
        <button className="btn btn-finalizar" onClick={handleFinalizar}>
          Finalizar
        </button>
      </div>
    </div>
  );
}

export default UpdatePrices;