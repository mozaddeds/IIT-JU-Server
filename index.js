const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
const cors = require('cors');


const { response } = require('express');

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }))



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://anoorz:adityzarinnoor@cluster0.3l2o1.mongodb.net/iitju?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    const noticeCollection = client.db("iitju").collection("notice");
    const teacherCollection = client.db("iitju").collection("teacher");

    console.log("hitting db");

    app.post('/addnotice', (req, res) => {

        const newNotice = req.body;
        console.log("before sending");

        noticeCollection.insertOne(newNotice)
            .then((result, error) => {
                res.send(result.insertedCount > 0)
                console.log("done");
                console.log(error);
            })
    });

    app.get('/allnotices', (req, res) => {
        noticeCollection.find()
            .toArray((err, items) => {
                res.send(items)
            })
    })

    

    app.get('/teachers', (req, res) => {
        teacherCollection.find()
            .toArray((err, items) => {
                res.send(items)
            })
    })

    app.post('/addteacher', (req, res) => {
        const newTeacher = req.body;
        teacherCollection.insertOne(newTeacher)
            .then((result, error) => {
                res.send(result.insertedCount > 0)
            })
    })


})

app.listen(process.env.PORT || port)