const mongoose=require("mongoose");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const ownerSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },

    lname:{
        type:String,
        required:true
    },
    email:{
        
        type:String,
        required:true
    },
    username:{
        unique:true,
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    address1:{
        type:String,
        required:true
    },
    address2:{
        type:String
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipcode:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        minLength:10,
        maxLength:10
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

})




ownerSchema.pre('save', async function(next){
    //console.log('Hi from middleware');
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,12)
        this.cpassword=await bcrypt.hash(this.password,12)
    }
    next();
})
  
ownerSchema.methods.generateAuthToken = async function()
{
    try{
        let token=jwt.sign({_id:this._id},"THISISTHEMAJORPROJECTWITHFULLAUTHENTICATION");
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err)
    {
        console.log(err)
    }
}

const Owner=new mongoose.model("OWNER",ownerSchema);
module.exports=Owner;