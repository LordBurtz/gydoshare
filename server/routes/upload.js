let repo = undefined

const handle_get = (req, res) => res.json({"upload": "true"}) 

const post_file = (req, res) => {
    if (!req.files || Object.keys(req.files) === 0) {
        console.log("No files")
        return res.status(400).send("No files were uploaded :/")
    }

    

    repo.register_files(req.body, req.files);

    console.log(req.files)
    console.log("-----")
    console.log(req.body)
}

module.exports = (db) => {
    repo = require("../repositories/upload.js")(db);

    const router = require("express").Router();

    router.get("/", handle_get);
    router.post("/", post_file);

    return router;
}