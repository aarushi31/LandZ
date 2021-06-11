const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://Aarushi:Archit@256@cluster0.pjb8r.mongodb.net/majorProject?retryWrites=true&w=majority",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connection successfull with db")
})
.catch(err=>{
    console.log("Connection to db not successfull due to",err);
})
