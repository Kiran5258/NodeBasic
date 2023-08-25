const fs=require("fs")
const path= require("path")

const express=require("express")
const app=express()
app.use(express.urlencoded({extended:false}))
app.get("/",(req,res)=>{
    res.send(`<form method='POST' action='/store-user'>
    <label>Your Name</lable>
    <input name='username' type='text'>
    <label>Your age</lable>
    <input name='userage' type='text'> 
    <label>Your birthdate</lable>
    <input name='userdob' type='date'> 
    <button type='submit'>send data</button> 
    </form>`);
    
});
app.post("/store-user",(req,res)=>{
    const enteredname=req.body.username;
    const enteredage=req.body.userage;
    const entereddob=req.body.userdob;
    const enteredData=[enteredname,enteredage,entereddob]
    const filepath = path.join(__dirname,'user.json')
    const filedata=fs.readFileSync(filepath)
    const existinguserdata=JSON.parse(filedata)
    console.log(filedata,existinguserdata)
    existinguserdata.push(enteredData)
    fs.writeFileSync(filepath,JSON.stringify(existinguserdata));
    console.log(filepath,filedata,existinguserdata)
    res.send('<h1>Userdata stored</h1>')
});

app.listen(3000)