import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const defaultData = { moodeTrackerData: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

// let express = require('express');
import express from 'express';
let app = express();


// app.get('/',(req,res)=>{
//     res.send('This is the main page');
// })

app.use(express.json());

let moodTracker = [];

app.post('/new-data', (req,res)=>{
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date:currentDate,
        Mood: req.body["Today I am"]
    }
    db.data.moodeTrackerData.push(obj);
    db.write()
    .then(() => {
      //send message back to the client
      res.json({task : 'success'});
    });

    // moodTracker.push(obj);
    // console.log(moodTracker);
    
})



app.use('/',express.static('public'));

app.listen(3000,()=>{
    console.log('listening at localhost:3000');
})

app.get('/data',(req,res)=>{
    // let obj = {data: moodTracker};
    db.read()
    .then(() => {
      //save the messages to an object
      let obj = {data : db.data.moodeTrackerData};
      //send the messages to the client
      res.json(obj);
    });

    // res.json(obj);
})

// db.read()
//     .then(() => {
//       //save the messages to an object
//       let theData = {messages : db.data.messages};
//       //send the messages to the client
//       response.json(theData);
//     });