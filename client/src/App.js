import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Axios from "axios";
import AdminView from "./AdminView";
import ClientProductView from "./ClientProductView";
import UpdatePrices from "./UpdatePrices";
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [listProductos, setListProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [marca_id, setMarcaId] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria_id, setCategoriaId] = useState("");
  const [codigo, setCodigo] = useState("");
  const [id, setId] = useState("");
  const [imagen, setImagen] = useState(null);
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = () => {
    Axios.get("http://localhost:3001/productos").then((response) => {
      setListProductos(response.data);
    });
  };


  const addProducto = () => {
    if (nombre && marca_id && precio && stock && categoria_id && codigo && imagen) {
      Axios.post("http://localhost:3001/create", {
        nombre,
        marca_id,
        precio,
        stock,
        categoria_id,
        codigo,
        imagen,
      })
        .then(() => {
          getProductos();
          alert("Producto registrado");
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      alert("Por favor complete todos los campos");
    }
  };

  const updateProducto = () => {
    if (id && nombre && marca_id && precio && stock && categoria_id && codigo && imagen) {
      Axios.put(`http://localhost:3001/update/${id}`, {
        nombre,
        marca_id,
        precio,
        stock,
        categoria_id,
        codigo,
        imagen,
      })
        .then((response) => {
          if (response.status === 200) {
            getProductos();
            limpiarCampos();
            alert("Producto actualizado correctamente");
          } else {
            alert("Error al actualizar el producto");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Error al actualizar el producto");
        });
    } else {
      alert("Por favor complete todos los campos");
    }
  };

  const editarProducto = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setMarcaId(val.marca_id);
    setPrecio(val.precio);
    setStock(val.stock);
    setCategoriaId(val.categoria_id);
    setCodigo(val.codigo);
    setImagen(val.imagen);
    setId(val.id);
  };

  const limpiarCampos = () => {
    setNombre("");
    setMarcaId("");
    setPrecio("");
    setStock("");
    setCategoriaId("");
    setCodigo("");
    setImagen("");
    setId("");
    setEditar(false);
  };

  const deleteProducto = (id, nombre) => {
    const confirmacion = window.confirm(
      `¿Estás seguro que deseas eliminar el producto "${nombre}"?`
    );
    if (confirmacion) {
      Axios.delete(`http://localhost:3001/delete/${id}`)
        .then(() => {
          getProductos();
          alert(`El producto "${nombre}" ha sido eliminado.`);
        })
        .catch((error) => {
          alert("Error al eliminar el producto.");
        });
    }
  };

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminView
                nombre={nombre}
                marca_id={marca_id}
                precio={precio}
                stock={stock}
                categoria_id={categoria_id}
                codigo={codigo}
                id={id}
                imagen={imagen}
                editar={editar}
                setNombre={setNombre}
                setMarcaId={setMarcaId}
                setPrecio={setPrecio}
                setStock={setStock}
                setCategoriaId={setCategoriaId}
                setCodigo={setCodigo}
                setId={setId}
                setImagen={setImagen}
                setEditar={setEditar}
                getProductos={getProductos}
                addProducto={addProducto}
                updateProducto={updateProducto}
                limpiarCampos={limpiarCampos}
                listProductos={listProductos}
                editarProducto={editarProducto}
                deleteProducto={deleteProducto}
              />
            }
          />
          <Route path="/update" element={<UpdatePrices />} />
          <Route path="/client" element={<ClientProductView listProductos={listProductos} />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;