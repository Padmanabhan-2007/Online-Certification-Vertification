const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Allows us to read JSON sent from frontend

// Create the Connection Pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test Connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
    } else {
        console.log("Connected to MySQL Database!");
        connection.release();
    }
});

// A sample "Admin Dashboard" route to fetch counts
app.get('/api/stats', (req, res) => {
    const sql = "SELECT COUNT(*) as totalStudents FROM students"; 
    // Note: You'll need to create this table in MySQL first!
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result[0]);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.post('/api/issue-certificate', (req, res) => {
    const { certificate_id, student_name, course_name, issue_date } = req.body;
    const sql = "INSERT INTO certificates (certificate_id, student_name, course_name, issue_date) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [certificate_id, student_name, course_name, issue_date], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to save to database" });
        }
        res.send({ message: "Success! Data saved to MySQL." });
    });
});


app.post('/api/issue-certificate', (req, res) => {
    const { certificate_id, student_name, course_name, issue_date } = req.body;
    const sql = "INSERT INTO certificates (certificate_id, student_name, course_name, issue_date) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [certificate_id, student_name, course_name, issue_date], (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: "Duplicate ID or DB error" });
        }
        res.json({ message: "Saved to MySQL!" });
    });
});