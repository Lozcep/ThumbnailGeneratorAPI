const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require('dotenv').config();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Generator API",
      description: "Generator image API",
      contact: {
        name: "José Lozada",
      },
      servers: [`${process.env.BASE_URL}:${process.env.PORT}`],
    },
  },
  //
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT 

    this.paths = {
      uploads: "/api/uploads",
    };

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }


  middlewares() {
    //swagger
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.uploads, require("../routes/uploads"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

module.exports = Server;
