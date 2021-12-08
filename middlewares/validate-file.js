const { response } = require("express")


const validateFileUpload = (req, res = response, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image ) {
        return res.status(400).json({
            msg: 'Not image found '
        });
    }

    next();

}

 
module.exports = {
    validateFileUpload
}
