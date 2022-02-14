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
    }
    
});







app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});