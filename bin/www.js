const app = require("../app");

app.listen(3000,(err,data)=>{
    console.log("Connected to Server")
}).on('error',(err)=>{
    console.log("Err ",err.message)
})