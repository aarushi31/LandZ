

const submit=document.getElementById('submit');

submit.addEventListener('click',registerUser);

async function registerUser(e)
{
    e.preventDefault();
    const fname=document.getElementById('First-name')
    const lname=document.getElementById('Last-name')
    const username=document.getElementById('inputUsername')
    const email=document.getElementById('inputEmail4')
    const password=document.getElementById('inputPassword4')
    const cpassword=document.getElementById('inputConfirmPassword4p')
    const city=document.getElementById('inputCity')
    const address1=document.getElementById('inputAddress1')
    const address2=document.getElementById('inputAddress2')
    const state=document.getElementById('inputState')
    const zipcode=document.getElementById('inputZip')
    const phone=document.getElementById('inputPhone')

    const result=await fetch('/api/oregister',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },

        body:JSON.stringify({
            fname,lname,username,email,city,state,phone,zipcode,address1,address2,password,cpassword
        })
    }).then(res=>res.json())

}