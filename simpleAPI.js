const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

 app.get('/api/data', (_, res) => {
     fs.readFile('models/profiles.json', 'utf8', (err, data)=>{
         res.send(data)
     })
 })
 
 app.get('/api/profiles/:id', (req, res) => {
     fs.readFile('models/profiles.json', 'utf8', (err, data) => {
         res.setHeader('Content-Type', 'application/json');
         const profiles = JSON.parse(data);
         const profile = profiles['profile' + req.params.id];
         if (profile) {
             console.log(profile);
             res.end(JSON.stringify(profile));
         } else {
             res.status(404).send('Profile Not Found');
         };
     });
 });
 
 app.use(express.urlencoded({ extended: true }));
 app.use(express.json())
 app.use(express.raw())
 app.put('/api/profile', (req, res) => {
     let text = JSON.stringify(req.body)
         fs.appendFile('./models/data.txt', text, 'utf8', (err, data) => {
             console.log(req.body)
             if (!err) {
                res.send('Data recieved thank you')
             } else { 
                 return "Cannot write" + data
             }
         })
 })

 app.delete("/api/delete/:id", (req, res) => {
     fs.readFile('models/profiles.json', 'utf8', (err, data) => {
        res.setHeader('Content-Type', 'application/json');
        let profiles = JSON.parse(data);
        let profile = profiles['profile' + req.params.id];
        console.log(profile);
        res.end(JSON.stringify(profile));
     })
 })

app.listen(3000, () => {
    console.log('Node running on localhost:port 3000')
})
