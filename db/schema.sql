DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employee_tracker;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departmen_name VARCHAR(200) NOT NULL
);

CREATE TABLE roleS (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(200),
    salary DECIMAL(10,2), 
    department_id INT, 
    FOREIGN KEY (department_id) 
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT, 
    manager_id INT NOT NULL
);