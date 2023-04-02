const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")

    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
    }

})
exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {

            cb(null, true)
        }
        else {
            cb(null, false)
            return res.status(400).json({ error: "File types allowed are .jpeg, .png, .jpg" });

        }
    }

});

exports.downloadFile = (req, res)=>{
    const filename = req.params.filename;
    const path = __basedir + '/uploads/';

    res.download(path + filename, (error)=>{
        if(error){
            res.status(500).send({message: 'File cannot be downloaded '+error})
        }
    })
}





