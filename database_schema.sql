CREATE DATABASE IF NOT EXISTS certify_secure_db;
USE certify_secure_db;

-- Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    certificate_id VARCHAR(50) PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL
);

-- Students Table
CREATE TABLE IF NOT EXISTS students (
    student_id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL
);
