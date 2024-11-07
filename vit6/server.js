// LIBRARIES NEEDED
const express = require('express');
const app = express();
const mysql = require('mysql2');
const mongoose = require('mongoose');

// SQL CONNECTION
// TO DO: connect to mysql with the host, database, user, and password. 
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'company_db',
    user: 'root',
    password: 'TurtleB0t$'
});
// MySQL Connection Verification
function verifyMySQLConnection() {
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to MySQL: ' + err.stack);
            return;
        }
        console.log('MySQL connected as id ' + connection.threadId);
    });
}

// MONGOOSE CONNECTION
// TODO: connect to your local host on the companyDB collection
mongoose.connect('mongodb://localhost:27017/companyDB') 
    .catch(err => console.error('Error connecting to MongoDB:', err));
// TODO: Mongoose Schema and Model
const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['planning', 'in-progress', 'completed', 'on-hold'],
        default: 'planning'
    },
    team: [{
        type: String,
        ref: 'Employee'
    }]
});

const ProjectModel = mongoose.model('Project', ProjectSchema);
// MongoDB Connection Verification 
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// ENDPOINTS
// Endpoint to get all projects from MongoDB when you enter: http://localhost:3000/projects
app.get('/projects', async (req, res) => {
    try {
        const projects = await ProjectModel.find({});
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Endpoint to get all employees from MySQL when you enter: http://localhost:3000/employees
app.get('/employees', function (req, res) {
    connection.query('SELECT * FROM employees', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

// RUNNING THE SERVER
app.listen(3001, function () {
    console.log('Server is running on port 3000!');
    verifyMySQLConnection();
});