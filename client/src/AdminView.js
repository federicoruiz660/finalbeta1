import React from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

function AdminView({
  nombre,
  marca_id,
  precio,
  stock,
  categoria_id,
  codigo,
  id,
  imagen,
  editar,
  setNombre,
  setMarcaId,
  setPrecio,
  setStock,
  setCategoriaId,
  setCodigo,
  setId,
  setImagen,
  setEditar,
  getProductos,
  addProducto,
  updateProducto,
  limpiarCampos,
  listProductos,
  editarProducto,
  deleteProducto,
}) {
  return (
    <>
      <ProductForm
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
      />
      <ProductTable
        listProductos={listProductos}
        editarProducto={editarProducto}
        deleteProducto={deleteProducto}
      />
    </>
  );
}

export default AdminView;