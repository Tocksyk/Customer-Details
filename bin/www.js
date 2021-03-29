const app = require("../app");
const PORT = process.env.PORT || 3000;
app.listen(PORT,(err,data)=>{
    console.log("Connected to Server")
}).on('error',(err)=>{
    console.log("Err ",err.message)
})