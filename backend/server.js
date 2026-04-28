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

// Fetch Stats (Students Count)
app.get('/api/stats', (req, res) => {
    const sql = "SELECT COUNT(*) as totalStudents FROM students"; 
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result[0]);
    });
});

// Fetch All Certificates (For Admin Dashboard)
app.get('/api/certificates', (req, res) => {
    const sql = "SELECT certificate_id, student_name, course_name, issue_date FROM certificates";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
});

// Fetch Single Certificate by ID (For Verification)
app.get('/api/certificates/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT certificate_id, student_name, course_name, issue_date FROM certificates WHERE certificate_id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ error: "Certificate not found" });
        res.json(results[0]);
    });
});

// Issue New Certificate
app.post('/api/issue-certificate', (req, res) => {
    const { certificate_id, student_name, course_name, issue_date } = req.body;
    const sql = "INSERT INTO certificates (certificate_id, student_name, course_name, issue_date) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [certificate_id, student_name, course_name, issue_date], (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: "Duplicate ID or DB error" });
        }
        res.json({ message: "Success! Data saved to MySQL." });
    });
});

// Fetch All Students
app.get('/api/students', (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
});

// Register New Student
app.post('/api/students', (req, res) => {
    const { studentId, fullName, email, dateOfBirth } = req.body;
    const sql = "INSERT INTO students (student_id, full_name, email, date_of_birth) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [studentId, fullName, email, dateOfBirth], (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: "Duplicate ID or DB error" });
        }
        res.json({ message: "Student registered successfully!" });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});