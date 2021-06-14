const express=require("express");
const Owner = require("./models/owner");
const Consumer=require("./models/consumer")
const app=express();
require("./db/connect");
// const hbs=require("hbs");
const path=require("path");
const bodyParser=require('body-parser')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const cookieParser=require("cookie-parser");
app.use(cookieParser());






const port=3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('index',{loggedin:false,name:""})
})

app.get('/register-owner',(req,res)=>{
    res.render('Loginowner',{error:false,message:""})
})

app.post('/register-owner',async (req,res)=>{
    try{
        const user=new Owner({
            fname:req.body.fname,
            lname:req.body.lname,
            username:req.body.username,
            email:req.body.email,
            address1:req.body.address1,
            address2:req.body.address2,
            password:req.body.password,
            cpassword:req.body.cpassword,
            city:req.body.city,
            state:req.body.state,
            zipcode:req.body.zipcode,
            phone:req.body.phone
        })
        
        const result=await user.save();
        //Swal('Registered successfully');
        res.status(200).render('Loginowner',{error:true,message:"Registered successfully! Login to continue"})

    }
    catch(err)
    {
        res.status(404).send(err);
    }
})

app.get('/register-consumer',(req,res)=>{
    res.render('LoginUser',{error:false,message:""})
})

app.post('/register-consumer',async (req,res)=>{
    try{

        const user=new Consumer({
            fname:req.body.fname,
            lname:req.body.lname,
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            cpassword:req.body.cpassword,
            phone:req.body.phone
        })
        
        const result=await user.save();
        console.log(result);
        //Swal('Registered successfully');
        res.status(200).render('LoginUser',{error:true,message:"Registered successfully! Login to continue"})

    }
    catch(err)
    {
        res.status(404).send(err);
    }
})

app.get('/login-owner',(req,res)=>{
    res.render('loginO',{error:false});
})

app.post('/login-owner',async (req,res)=>{
    try{
        const username=req.body.uname;
        const password=req.body.psw;
        const loginData=await Owner.findOne({username:username});
        console.log(loginData);
        const isMatch=await bcrypt.compare(password,loginData.password);

        const token=await loginData.generateAuthToken();
        res.cookie("loginjwt",token,{
            // expires:new Date(Date.now() + 50000),
            httpOnly:true,
        });
        console.log(isMatch);
        if(isMatch)
        {
            let uname=loginData.fname;
            uname=uname.charAt(0).toUpperCase() + uname.slice(1);
            res.status(200).render('index',{loggedin:true,name:uname});
        }
        else{
            // Swal('Oops! Incorrect credentials');
            
            res.render('loginO',{ error:true})
        }
    }
    catch(err)
    {   //Swal('Server error');
        res.status(400).send(err)
    }
})


app.get('/login-consumer',(req,res)=>{
    res.render('loginC',{error:false});
})

app.post('/login-consumer',async (req,res)=>{
    try{
        const username=req.body.uname;
        const password=req.body.psw;
        const loginData=await Consumer.findOne({username:username});
        console.log(loginData);
        const isMatch=await bcrypt.compare(password,loginData.password);

        const token=await loginData.generateAuthToken();
        res.cookie("loginjwt",token,{
            expires:new Date(Date.now() + 50000),
            httpOnly:true,
        });
        console.log(isMatch);
        if(isMatch)
        {
            let uname=loginData.fname;
            uname=uname.charAt(0).toUpperCase() + uname.slice(1);
            //Swal('Login successful');
            res.status(200).render('index',{loggedin:true,name:uname});
        }
        else{
            //res.json({message:"Incorrect credentials"});
            res.render('loginC',{error:true})
            //res.render('/login-owner')
        }
    }
    catch(err)
    {
        res.status(400).send(err)
    }
})



app.get("/logout",(req,res)=>{
    try{

        //res.clearCookie("loginjwt");
        //res.cookie.set('loginjwt', {expires: Date.now()});
        
        //console.log("Logout successful");
        //await req.user.save();
        res.render('index',{loggedin:false,name:""});
    }
    catch(err)
    {
        res.status(500).send(err);
    }
})

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})