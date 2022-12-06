const express=require('express');
const app=express();
const fs=require('fs');

const bodyparser=require('body-parser');

app.use(express.urlencoded({
    extended: true
  }));

const loginroute=require('./router/login.js');
const { addListener } = require('process');
const { Script } = require('vm');

//const localStorage=require('localStorage');

//app.use(bodyparser.text);
app.get('/',((req,res)=>{
    // res.send(`<html><body><form action="/chatpage" method="post"><input input type="text" name="id" id="id1"><button type="Submit" id="id2">Login</button></form><script> const nam=document.getElementById('id1');const submit=document.getElementById('id2');
    // submit.addEventListener("click", ()=>{
    //     localStorage.setItem("name", nam.value);

    //     ${check++}
        
    // });
    // </script></body></html>`);
    res.sendFile("C:/Users/Abhijit singh/Desktop/javascrit/expresschatapplication/index.htm")
   
}));

app.use('/chatpage',(req,res,next)=>{
 
    fs.readFile('message.txt',(err,data)=>{
        if(err){
            console.log("something wrong with ffile 24");
        }else{
            if(data.length===0) {data="no text"};
                    return res.send(`<p>${data}</p><html><body><form  action="/storchat" method="post">
                    <input input type="text" name="message">
                    <input type="hidden" name="username" id="id5">
                     <button type="Submit" id="id2">SEND</button>
                     </form>
                     <script> let nam=document.getElementById('id5');
                            const submit=document.getElementById('id2');
                    submit.addEventListener("click", ()=>{
                     //   nam.value=JSON.parse(localStorage.getItem("name"));
                       nam.value=localStorage.getItem("name");
                       
                        
                    });
                    </script></body></html>`);

                    // return res.sendFile("C:/Users/Abhijit singh/Desktop/javascrit/expresschatapplication/chatpage.htm")
                
          
                }
     });
 });

 app.post('/storchat',(req,res)=>{
    console.log("hhh"+req.body.username);
    fs.appendFile('message.txt',` ${req.body.username}=${req.body.message}\r\n `,()=>{
   });
    res.redirect(302,'/chatpage');
});


app.use((req,res,next)=>{
    res.status(400).send('<h1>something went wrong!Page doesnot found</h1>');
});

app.listen(4000,(err)=>{
    if(!err){
        console.log("4000 is listening")
    }else{
        console.log("something went wrong with server")
    }
})

