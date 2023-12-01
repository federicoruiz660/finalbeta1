const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "bdfinal",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectado a la base");
  }
});

app.post("/create", (req, res) => {
  const { nombre, marca_id, precio, stock, categoria_id, codigo, imagen } = req.body;

  db.query(
    "SELECT * FROM productos WHERE codigo = ?",
    [codigo],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al verificar el código");
      } else {
        if (result.length > 0) {
          const errorMessage = "Ese código ya se encuentra registrado";
          console.log(errorMessage);
          res.status(400).send(errorMessage);
        } else {
          db.query(
            "INSERT INTO productos(nombre, marca_id, precio, stock, categoria_id, codigo, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [nombre, marca_id, precio, stock, categoria_id, codigo, imagen],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send("Error al guardar los datos");
              } else {
                console.log("Datos guardados correctamente");
                res.status(200).send("Datos guardados correctamente");
              }
            }
          );
        }
      }
    }
  );
});


app.get("/productos", (req, res) => {
  db.query(
    "SELECT productos.*, marcas.nombre AS nombre_marca, categorias.nombre AS nombre_categoria FROM productos INNER JOIN marcas ON productos.marca_id = marcas.id INNER JOIN categorias ON productos.categoria_id = categorias.id",
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al obtener los datos");
      } else {
        // Redondea los precios a un solo decimal antes de enviarlos al cliente
        const productosConPreciosRedondeados = result.map((producto) => {
          return {
            ...producto,
            precio: parseFloat(producto.precio).toFixed(1),
          };
        });

        console.log("Datos obtenidos");
        res.status(200).send(productosConPreciosRedondeados);
      }
    }
  );
});

app.put("/update/:id", (req, res) => {
  const idProducto = req.params.id;
  const { nombre, marca_id, precio, stock, categoria_id, codigo, imagen } = req.body;

  db.query(
    "UPDATE productos SET nombre = ?, marca_id = ?, precio = ?, stock = ?, categoria_id = ?, codigo = ?, imagen = ? WHERE id = ?",
    [nombre, marca_id, precio, stock, categoria_id, codigo, imagen, idProducto],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al actualizar los datos");
      } else {
        console.log("Datos actualizados correctamente");
        res.status(200).send("Datos actualizados correctamente");
      }
    }
  );
});


app.delete("/delete/:id", (req, res) => {
  const idProducto = req.params.id;

  db.query("DELETE FROM productos WHERE id = ?", idProducto, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al eliminar los datos");
    } else {
      console.log("Datos eliminados correctamente");
      res.status(200).send("Datos eliminados correctamente");
    }
  });
});


// Ruta para obtener marcas
app.get("/marcas", (req, res) => {
  db.query("SELECT * FROM marcas", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener las marcas");
    } else {
      res.status(200).send(result);
    }
  });
});

// Ruta para obtener categorías
app.get("/categorias", (req, res) => {
  db.query("SELECT * FROM categorias", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener las categorías");
    } else {
      res.status(200).send(result);
    }
  });
});

// Actualizar precios por marca
app.put("/update-precios/:marca_id", (req, res) => {
  const { marca_id } = req.params;
  const { porcentaje } = req.body;

  db.query(
    "UPDATE productos SET precio = precio * (1 + (? / 100)) WHERE marca_id = ?",
    [porcentaje, marca_id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al actualizar los precios");
      } else {
        console.log("Precios actualizados correctamente");
        res.status(200).send("Precios actualizados correctamente");
      }
    }
  );
});

// Actualizar precios por categoría
app.put("/update-precios-categoria/:categoria_id", (req, res) => {
  const { categoria_id } = req.params;
  const { porcentaje } = req.body;

  db.query(
    "UPDATE productos SET precio = precio * (1 + (? / 100)) WHERE categoria_id = ?",
    [porcentaje, categoria_id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al actualizar los precios");
      } else {
        console.log("Precios actualizados correctamente");
        res.status(200).send("Precios actualizados correctamente");
      }
    }
  );
});



app.listen(3001, () => {
  console.log("Servidor corriendo en el puerto 3001");
});
