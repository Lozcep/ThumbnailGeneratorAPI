const path = require("path");

const subirArchivo = (files, carpeta = "") => {
  const validExtensions = ["png", "jpeg"];

  return new Promise((resolve, reject) => {
    const { image } = files;
    const nombreCortado = image.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];


    // Validar la extension
    if (!validExtensions.includes(extension)) {
      return reject(
        ` ${extension} extension is not allowed - only extensions are allowed: ${validExtensions}`
      );
    }

    if (image.size >  5000000) {
        return reject(
            ` The file must be less than 5MB`
          );
    }

    resolve();
  });
};

module.exports = {
  subirArchivo,
};
