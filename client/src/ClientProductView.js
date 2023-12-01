import React from "react";
import "./styles.css"; 

function ClientProductView({ listProductos }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Nombre</th>
          <th scope="col">Marca</th>
          <th scope="col">Categoría</th>
          <th scope="col">Precio</th>
          <th scope="col">Stock</th>
          <th scope="col">Imagen</th>
        </tr>
      </thead>
      <tbody>
        {listProductos.map((val) => (
          <tr key={val.id}>
            <td>{val.codigo}</td>
            <td>{val.nombre}</td>
            <td>{val.nombre_marca}</td>
            <td>{val.nombre_categoria}</td>
            <td>{val.precio}</td>
            <td>{val.stock}</td>
            <td>
              {val.imagen && (
                <img
                  src={`/imagenes/${val.imagen}`}
                  alt={val.nombre}
                  className="product-image" // Aplica la clase de estilos CSS
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ClientProductView;
