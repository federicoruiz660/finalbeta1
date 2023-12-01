import React from "react";

function ProductTable({ listProductos, editarProducto, deleteProducto, ...otrosProps }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Código</th>
          <th scope="col">Nombre</th>
          <th scope="col">Marca</th>
          <th scope="col">Categoría</th>
          <th scope="col">Precio</th>
          <th scope="col">Stock</th>
          <th scope="col">Imagen</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {listProductos.map((val) => (
          <tr key={val.id}>
            <th scope="row">{val.id}</th>
            <td>{val.codigo}</td>
            <td>{val.nombre}</td>
            <td>{val.nombre_marca}</td>
            <td>{val.nombre_categoria}</td>
            <td>{val.precio}</td>
            <td>{val.stock}</td>
            <td>{val.imagen}</td>
            <td>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  onClick={() => editarProducto(val)}
                  className="btn btn-info"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => deleteProducto(val.id, val.nombre)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
