// ProductForm.js
import React from "react";
import "./styles.css";

function ProductForm({
  nombre,
  marca_id,
  precio,
  stock,
  categoria_id,
  codigo,
  imagen,
  editar,
  setNombre,
  setMarcaId,
  setPrecio,
  setStock,
  setCategoriaId,
  setCodigo,
  setImagen,
  setId,
  setEditar,
  addProducto,
  updateProducto,
  limpiarCampos,
  ...otrosProps
}) {
  return (
    <div className="card text-center">
      <div className="card-header">
        {editar ? "Actualizar Producto" : "Registro de Productos"}
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Código:
          </span>
          <input
            type="text"
            onChange={(event) => setCodigo(event.target.value)}
            className="form-control"
            value={codigo}
            placeholder="Código del producto"
            aria-label="Código"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Nombre:
          </span>
          <input
            type="text"
            onChange={(event) => setNombre(event.target.value)}
            className="form-control"
            value={nombre}
            placeholder="Nombre del producto"
            aria-label="Nombre"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Marca:
          </span>
          <input
            type="text"
            onChange={(event) => setMarcaId(event.target.value)}
            className="form-control"
            value={marca_id}
            placeholder="Marca del producto"
            aria-label="Marca"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Precio:
          </span>
          <input
            type="number"
            onChange={(event) => setPrecio(event.target.value)}
            className="form-control"
            value={precio}
            placeholder="Precio del producto"
            aria-label="Precio"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Stock:
          </span>
          <input
            type="number"
            onChange={(event) => setStock(event.target.value)}
            className="form-control"
            value={stock}
            placeholder="Stock del producto"
            aria-label="Stock"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Categoría:
          </span>
          <input
            type="text"
            onChange={(event) => setCategoriaId(event.target.value)}
            className="form-control"
            value={categoria_id}
            placeholder="Categoría del producto"
            aria-label="Categoría"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Imagen:
          </span>
          <input
            type="text"
            onChange={(event) => setImagen(event.target.value)}
            className="form-control"
            value={imagen}
            placeholder="Nombre del archivo de imagen"
            aria-label="Imagen"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          {imagen && (
            <img
              src={`/imagenes/${imagen}`}
              alt="Imagen del producto"
              className="form-image"
            />
          )}
        </div>
      </div>
      <div className="card-footer text-muted">
        {editar ? (
          <div>
            <button className="btn btn-warning m-2" onClick={updateProducto}>
              Actualizar
            </button>
            <button className="btn btn-info m-2" onClick={limpiarCampos}>
              Cancelar
            </button>
          </div>
        ) : (
          <button className="btn btn-success" onClick={addProducto}>
            Registrar
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductForm;
