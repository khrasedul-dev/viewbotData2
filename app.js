const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rasedul20:rasedul20@telegramproject.w3ip3.mongodb.net/telegramProject',{useNewUrlParser:true,useUnifiedTopology:true}).catch((e)=>{
        console.log(e)
}).then((d)=>console.log('Database connected')).catch((e)=>console.log(e))


const newSchema = new mongoose.Schema({
    userId : {
        type: String
    },
    name: {
        type: String
    },
    referrer_id: {
        type: String
    },
    referral_count: {
        type: String
    },
    twitter: {
        type: String
    },
    reddit: {
        type: String
    },
    wallet: {
        type: String
    }
},{versionKey: false})

const User = mongoose.model('user',newSchema)

const app = express();

app.get("/",async (req,res)=>{
    const data = await User.find();
    let htdata = ""
    if(data.length > 0){
        data.map((data)=>{
            htdata = htdata+`
            <tr>
                <td>${data.userId}<td/>
                <td>${data.name}<td/>
                <td>${data.referrer_id || 'Empty'}<td/>
                <td>${data.referral_count}<td/>
                <td>${data.wallet}<td/>
                <td>${data.twitter}<td/>
                <td>${data.reddit}<td/>
            </tr>`
        })
    }

    console.log(data)
    
    const tddata = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    #customers {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    #customers td, #customers th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    
    #customers tr:nth-child(even){background-color: #f2f2f2;}
    
    #customers tr:hover {background-color: #ddd;}
    
    #customers th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #04AA6D;
      color: white;
    }
    h1{
        text-align:center;
        border-bottom: 1px solid black;
        color: #04AA6D;
    }
    </style>
    </head>
    <body>
    
    <h1 >User Information</h1>
    <br><br><br><br>
    
    <table id="customers">
    <tr>
    <th>User Id<th/>
    <th>Name<th/>
    <th>Referrer ID<th/>
    <th>Referral Count<th/>
    <th>Wallet<th/>
    <th>Twitter<th/>
    <th>Reddit<th/>
    </tr>
${htdata}
    </table>
    
    </body>
    </html>`
    res.send(tddata)
    // res.send(data)
});

app.listen(process.env.PORT || 8080,()=>{
    console.log('app is running...')
})
