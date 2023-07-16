const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');

//connect to database
const company_db = mysql.createConnection(
    {
        host: 'localhost',
        // mySQL username
        password: 'Grumpy101#',
        database: 'company_db',
    },
    console.log('')
);


//view options
const optionsQ = [
    {
        type: 'list',
        message: "Select an option from the menu",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add New Role", "View All Departments",
         "Add Deparment"],
        name: 'menuOptions',
    },
]