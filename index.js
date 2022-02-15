// Express JS
const express = require('express');
const app = express();

// port
const PORT = 8080;


// Cors
const cors = require('cors');
app.use(cors());


// Body Parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// MySQL
const mysql = require('mysql');

// Database Config
const databaseConnectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
}


const conn = mysql.createConnection(databaseConnectionConfig);

conn.connect((error) => {
    if (error) {
        console.log("Connection Failed");
        console.log(error);
    } else {
        console.log("Connection Successful");

        // Select Data---------------------------------
        app.get('/api/get', function (req, res) {
            let selectQuery = "SELECT * FROM `task`";

            conn.query(selectQuery, (error, result) => {
                if (error) {
                    console.log("Data Select Failed");
                    console.log(error);
                } else {
                    res.send(result)
                }
            })

        })
        // app.get('/allTask', function (req, res) {
        //     let selectQuery = "SELECT * FROM `task`";

        //     conn.query(selectQuery, (error, result) => {
        //         if (error) {
        //             console.log("Data Select Failed");
        //             console.log(error);
        //         } else {
        //             res.send(result)
        //         }
        //     })

        // })




        // Post Data---------------------------------
        app.post('/api/post', function (req, res) {

            const { title, date, duration, type } = req.body;

            const sql = "INSERT INTO task VALUES ?";
            const values = [['null', title, date, duration, type]];

            conn.query(sql, [values], (error) => {
                if (error) {
                    console.log("Data Insert Failed");
                    console.log(error);
                } else {
                    console.log("Data Insert Successful");
                }
            })
        })



        //  Delete Data---------------------------------
        app.delete('/api/remove/:id', function (req, res) {
            const taskId = req.params.id;

            let deleteQuery = "DELETE FROM task WHERE id =" + taskId;

            conn.query(deleteQuery, (error) => {
                if (error) {
                    console.log("Data Delete Failed");
                    console.log(error);
                } else {
                    console.log("Data Delete Successful");
                }
            })

        })


        // Read Data by ID----------------------------------------
        app.get('/api/get/:id', function (req, res) {

            const taskId = req.params.id;

            let selectQuery = "SELECT * FROM `task` WHERE id =" + taskId;

            conn.query(selectQuery,  (error, result) => {
                if (error) {
                    console.log("Data Select Failed");
                    console.log(error);
                } else {
                    res.send(result)
                }
            })

        })


        // Update Data by ID----------------------------------------
        app.put('/api/update/:id', function (req, res) {

            const taskId = req.params.id;

            const { title, date, duration, type } = req.body;

            let updateQuery = "UPDATE task SET title = ?, date = ?, duration = ?, type = ? WHERE id = ?";

            // const values = [title, date, duration, type, taskId];


            conn.query(updateQuery, [title, date, duration, type, taskId], (error, result) => {
                if (error) {
                    console.log("Data Select Failed");
                    console.log(error);
                } else {
                    res.send(result)
                }
            })

        })















    }

});







app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});