const fileUpload = require("express-fileupload")
const database = require("../../../database/connection")
const rootRef = database.ref('customers')



exports.getData = function (req, res, next) {
    let arr = []
    rootRef.once("value").then((snapshot) => {
        snapshot.forEach(data => {
            arr.push(data.val())
        });
        res.json(arr)
    })

}

exports.updateData = function (req, res, next) {
    const data = {
        name: req.body.name,
        email: req.body.email,
        file: req.body.file
    }
    console.log(req.body.last)
    rootRef.child(req.body.last).remove()
    rootRef.child(req.body.name).update(data)
    res.json("Data Updated")
}

exports.deleteData = function (req, res, next) {
    let data = req.body.name
    rootRef.child(data).remove()
    res.json("Data Deleted")
}

exports.addData = function (req, res, next) {
    let fileObj = req.files.file
    let filename = String(fileObj.name)
    let t = filename.indexOf(" ")
    filename = filename.split(" ").join("")
    fileObj.mv('./public/upload/' + filename, (err) => {
        if (err) {
            res.status(404)

        } else {
            res.status(200)

        }
    })
    // Adding in Database
    rootRef.child(req.body.name).set({
        name: req.body.name,
        email: req.body.email,
        file: filename
    })
    res.json("Data Added")
}
