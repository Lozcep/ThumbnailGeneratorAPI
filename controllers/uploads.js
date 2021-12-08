const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require("../helpers");

const saveImage = async (req, res = response) => {
  try {
    await subirArchivo(req.files, "imgs");

    const { tempFilePath } = req.files.image;
    const newImage = await cloudinary.uploader.upload(tempFilePath);

    console.log({ newImage });

    const imageAux = newImage.url.split("/");

    const imageName = imageAux[imageAux.length - 1];

    const baseUrl = "http://res.cloudinary.com";

    res.json({
      orinalImage: newImage.secure_url,
      "400x300": `${baseUrl}/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/h_300,w_400/${imageName}`,
      "160x120": `${baseUrl}/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/h_120,w_160/${imageName}`,
      "120x120": `${baseUrl}/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/h_120,w_120/${imageName}`,
    });
  } catch (msg) {
    console.log(msg);
    res.status(400).json({ msg });
  }
};

module.exports = { 
   saveImage,
};
