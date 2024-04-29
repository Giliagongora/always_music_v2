const express = require("express"); // Se importa el paquete Express para crear una aplicación Express.
const app = express(); //crea una instancia de una aplicación Express, que se utilizará para configurar y manejar rutas, middleware y otras funcionalidades en tu servidor Node.js.
const axios = require("axios"); // Se importa el paquete Axios, que se utiliza para realizar solicitudes HTTP desde el servidor.
const fs = require("fs"); // Se importa el módulo fs (File System) para realizar operaciones relacionadas con archivos en el sistema de archivos del servidor.
const morgan = require("morgan"); // Se importa el paquete morgan, que se utiliza para registrar las solicitudes HTTP entrantes en la aplicación.


const { Pool } = require("pg"); // Se importa la clase Pool del paquete pg, que se utiliza para interactuar con una base de datos PostgreSQL

app.use(express.json()); // Este middleware analiza el cuerpo de las solicitudes entrantes en formato JSON. Es útil cuando el servidor recibe datos JSON en solicitudes POST o PUT, permitiendo acceder a estos datos a través de req.body en las rutas de la aplicación Express.
app.use(morgan("dev")); // Este middleware usa Morgan para registrar detalles de solicitudes HTTP en la consola del servidor. Con el parámetro 'dev', Morgan muestra información detallada como método HTTP, ruta, código de estado y tiempo de respuesta.

// Configuración de la base de datos
const pool = new Pool({
  user: "postgres", // user: Es el nombre de usuario para acceder a la base de datos.
  host: "localhost", // host: Es la dirección del servidor donde se ejecuta la base de datos. "localhost" significa que está en el mismo equipo.
  database: "alwaysmusic", // database: Es el nombre de la base de datos a la que se quiere acceder.
  password: "gongora", // password: Es la contraseña para acceder a la base de datos.
  port: 5432, // port: Es el número de puerto donde la base de datos PostgreSQL está escuchando las conexiones.
});

// manejo del process.argv
const argumentos = process.argv.slice(2); // obtiene todos los argumentos de la línea de comandos pasados al script Node.js, excluyendo los primeros dos elementos (process.argv[0] y process.argv[1]), que son la ruta del ejecutable de Node.js y la ruta del archivo JavaScript en ejecución, respectivamente. El método slice(2) se utiliza para eliminar estos dos primeros elementos y obtener solo los argumentos proporcionados al script.
// posicion 0 funcion a usar
const funcion = argumentos[0]; // se asigna el primer argumento (posición 0) a la variable funcion, que probablemente indica qué función debe ejecutar el script.

// resto de posiciones los otros campos. Las siguientes líneas asignan los siguientes argumentos a variables individuales.
const rut = argumentos[1];
const nombre = argumentos[2];
const curso = argumentos[3];
const nivel = argumentos[4];

app.listen(3000, () => console.log("Servidor escuchando Puerto: " + PORT));

// Agregar un nuevo estudiante
let estudiante = async ({ rut, nombre, curso, nivel }) => {
  let { rut, nombre, curso, nivel } = req.query;

//   if (rut === "" || nombre === "" || curso === "" || nivel === "") {
//     return res.send("No puedes dejar los campos vacios");
//   }
  // Ingresar nuevo alumnos:
  // node server agregar 12.345.678-9 Marcela G-72 Experta

  // const estudiante = { rut, nombre, curso, nivel }: Crea un objeto llamado "estudiante" con las propiedades { rut, nombre, curso, nivel } obtenidas de los parámetros de consulta.
  let estudiante = {
    rut,
    nombre,
    curso,
    nivel,
  };

  console.log("out of try",estudiante);

  try {
let estudiantes = [];
estudiantes.push(estudiante);
    // fs.writeFileSync("deportes.json", JSON.stringify(data)): Convierte el objeto "data" a formato JSON y escribe el contenido en el archivo "deportes.json", sobrescribiendo su contenido anterior de manera síncrona.
    fs.writeFileSync("estudiantes.json", JSON.stringify(data));

  } catch (error) {
    res.status(500).send("Algo salió mal...");
  }

}
// Consultar los estudiantes registrados.
// Consultar estudiante por rut.
// Actualizar la información de un estudiante.
// Eliminar el registro de un estudiante.

// Funcion IIFE que recibe de la linea de comando y llama funciones asincronas internas
(async () => {
  // recibir funciones y campos de la linea de comando
  switch (funcion) {
    case "agregar":
      estudiante({ rut, nombre, curso, nivel });
      break;
    case "editar":
      editarAlumno({ rut, nombre, curso, nivel });
      break;
    case "rut":
      consultaRut(argumentos[1]);
      break;
    case "todos":
      totalAlumnos();
      break;
    case "editar":
      nuevoAlumno({ rut, nombre, curso, nivel });
      break;
    case "eliminar":
      eliminarAlumno(argumentos[1]);
      break;
    default:
      console.log("Funcion: " + funcion + " no es valida");
      break;
  }

  pool.end();
})();

// Comandos para probar por cosola
//
// Ingresar nuevo alumnos:
// node index agregar 12.345.678-9 Marcela G-72 Experta
//
// Consultar todos:
// node index todos
//
// Consultar por rut:
// node index rut 12.345.678-9
//
// Editar alumno por rut:
// node index editar Gilia 12.345.678-9 E-70 Avanzada
//
// Eliminar alumno por rut:
// node index eliminar 12.345.678-9
