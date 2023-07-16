const inquirer = require("inquirer");
const mysql = require("mysql2");
// create MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeeTracker_db",
});

// connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
    // start the application
    start();
});

// function to start app
function start() {
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Add a manager",
                "Update an employee role",
                "View all employees by manager",
                "View all employees by department",
                "Delete Departments | Roles | Employees",
                "Exit",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Add a Manager":
                    addManager();
                    break;
                case "Update an employee role":
                    updateEmployeeRole();
                    break;
                case "View employees my Manager":
                    viewEmployeesByManager();
                    break;
                case "View Employees by Department":
                    viewEmployeesByDepartment();
                    break;
                case "Delet Departments | Roles | Employees":
                    deleteDepartmentsRolesEmployees();
                    break;
                case "Exit":
                    connection.end();
                    console.log("Goodbye!");
                    break;
            }
        });
}

// function to view all departments
function viewAllDepartments() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        //restart application
        start();
    });
}

//function to view all roles
function viewAllRoles() {
    const query = "SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.departments_id = departments.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        //restart application
        start();
    });
}

//view all employees
function viewAllEmployees() {
    const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM employee e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        //restart app
        start();
    });
}
function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            name: "name", 
            message: "Enter the name of the new department:",
        })
        .then((answer) => {
            console.log(answer.name);
            const query = `INSERT INTO departments (department_name) VALUES ("${answer.name}")`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log(`Added department ${answer.name} to the database!`);
                // restart app
                start();
                console.log(answer.name);
            });
        });
}
// add role
function addRole() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Enter the title of the new role:",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Enter the salary of the new role:",
                },
                {
                    type: "list",
                    name: "department",
                    message: "Select the department for the new role:",
                    choices: res.map(
                        (department) => department.department_name
                    ),
                },
            ])
            .then((answers) => {
                const department = res.find(
                    (department) => department.name === answers.department
                );
                const query  = "INSERT INTO roles SET ?";
                connection.query(
                    query,
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: department,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(
                            `Added role ${answers.title} with salary ${answers.salary} to the ${answers.department} department in the database!`
                        );
                        // restart app
                        start();
                        }
                );
            });
    });
}
//function to add an employee
function addEmployee() {
    connection.query("SELECT id, title FROM roles", (error, results) => {
        if (error) {
            console.error(error);
            return;
        }

        const roles = results.map(({ id, title }) => ({
            name: title,
            value: id,
        }));

        //retrieve list of employees from the database to use as managers
        connection.query(
            `SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee`,
            (error, results) => {
                if (error) {}
                console.error(error);
                return;
            })
            
            const managers = results.map(({ id, name}) => ({
                name,
                value: id,
            }));

            //promt for employee info
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "firstName",
                        message: "Enter the employee's first name:",
                    },
                    {
                        type: "input",
                        name: "lastName",
                        message: "Enter the employee's last name:",
                    },
                    {
                        type: "list",
                        name: "roleId",
                        message: "Select the employee role:",
                        choices: roles,
                    },
                    {
                        type: "list",
                        name: "managerId",
                        message: "Select the employee manager:",
                        choices: [
                            { name: "None", value: null},
                            ...managers,
                        ],   
                    },
                ])
                .then((answers) => {
                    // insert employee into database
                    const sql =
                        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                    const values = [
                        answers.firstName, 
                        answers.lastName, 
                        answers.roleId,
                        answers.managerId,
                    ];
                    connection.query(sql, values, (error) => {
                        if (error) {
                            console.error(error);
                            return;
                        }

                        console.log("Employee added successfully");
                        start();
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        );
    }

    //function to add a manager
    function addManager() {
        const queryDepartments = "SELECT * FROM departments";
        const queryEmployees = "SELECT * FROM employee";

        connection.query(queryDepartments, (err, resDepartments) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "departments",
                        message: "Select the department:",
                        choices: resDepartments.map(
                            (department) => department.department_name
                        ),
                    },
                    {
                        type: "list",
                        name: "employee",
                        message: "Select the employee to add a manager to:",
                        choices: resEmployees.map(
                            (employee) =>
                            `${employee.first_name} ${employee.last_name}`
                        ),
                    },
                    {
                        type: "list",
                        name: "manager",
                        message: "Select the employee's manager:",
                        choices: resEmployees.map(
                            (employee) =>
                            `${employee.first_name} ${employee.last_name}`
                        ),
                    },
                ])
                .then((answers) => {
                    const department = resDepartments.find(
                        (department) =>
                            department.department_name === answers.department
                    );
                    const employee = resEmployees.find(
                        (employee) =>
                        `${employee.first_name} ${employee.last_name}` ===
                        answers.employee
                    );
                    const query =
                        "UPDATE employee SET manager_id = ? WHERE id = ? AND role_id IN (SELECT id FROM roles WHERE department_id = ?)";
                    connection.query(
                        query,
                        [manager.id, employee.id, department.id],
                        (err, res) => {
                            if (err) throw err;
                            console.log(
                                `Added manager ${manager.first_name} ${manager.last_name} to employee ${employee.first_name} ${employee.last_name} in department ${ departent.department_name}!`
                            );
                            //restart app
                            start();
                        }
                    );
                });
        });
    }

    //function to update employee role
function updateEmployeeRole() {
    const queryEmployees =
        "SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id";
    const queryRoles = "SELECT * FROM roles";
    connection.query(queryEmployees, (err, resEmployees) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Sleect the employee to update:",
                    choices: resEmployees.map(
                        (employee) =>
                            `${employee.first_name} ${employee.last_name}`
                    ),
                },
                {
                    type: "list",
                    name: "role",
                    message: "Select the new role:",
                    choices: resRoles.map((role) => role.title),
                },
            ])
            .then((answers) => {
                const employee = resEmployees.find(
                    `${employee.first_name} ${employee.last_name}` ===
                    answers.employee
                );
                const role = resRoles.find(
                    (role) => role.title === answers.role   
                );
                const query =
                    "UPDATE employee SET role_id = ? WHERE id = ?";
                connection.query(
                    query, 
                    [role.id, employee.id],
                    (err, res) => {
                        if (err) throw err;
                        console.log(
                            `Updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`
                        );
                        //restart the app
                        start();
                    }
                );
            });
    });
}

//function to view employee by manager
function viewEmployeesByManager() {
    const query = `
    SELECT
        e.id,
        e.first_name,
        e.last_name,
        r.title,
        d.department_name,
        CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM
        employee e
        INNER JOIN roles r ON e.role_id = r.id
        INNER JOIN departments d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
    ORDER BY
        manager_name,
        e.last_name,
        e.first_name
        `;

        connection.query(query, (err, res) => {
            if (err) throw err;

            //group employees by manager
            const employeesByManager = res.reduce((acc, cur) => {
                const managerName = cur.manager_name;
                if (acc[managerName]) {
                    acc[managerName].push(cur);
                } else {
                    acc[managerName] = [cur];
                }
                return acc;
            },{});

            //display employees by manager
            console.log("Employees by manager:");
            for (const managerName in employeesByManager) {
                console.log(`\n${managerName}:`);
                const employees = employeesByManager[managerName];
                employees.forEach((employee) => {
                    console.log(
                        `  ${employee.fist_name} ${employee.last_name} | ${employee.title} | ${employee.department_name}`
                    );
                });
            }

            //restart app
            start();
            });
}

//function to view employees by department
function viewEmployeesByDepartment() {
    const query = 
        "SELECT departments.department_name, employee.first_name, employee.last_name, FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN departments_id = departments.id ORDER BY departments.department_name ASC";

        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log("\nEmployees by department:");
            console.table(res);
            //restart app
            start();
        });
}

//function to delete departments roles employees
function deleteDepartmentsRolesEmployees() {
    inquirer
        .prompt({
            type: "list",
            name: "data",
            message: "What would you like to delete?",
            choices: ["Employee", "Role", "Department"],
        })
        .then((answer) => {
            switch (answer.data) {
                case "Employee":
                    deleteEmployee();
                    break;
                case "Role":
                    deleteRole();
                    break;
                case "Department":
                    deleteDepartment();
                    break;
                default:
                    console.log(`Invalid data: ${answer.data}`);
                    start();
                    break;
            }
        });
}

//function to delete employees
function deleteEmployee() {
    const query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
        if (err) throw err;
        const employeeList = res.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));
        employeeList.push({ name: "Go Back", vlaue: "back"}); //add a "back" option
        inquirer
            .prompt({
                type: "list",
                name: "id",
                message: "Select the employee you want to delete:",
                choices: employeeList,
            })
            .then((answer) => {
                if (answer.id === "back") {
                    //check if user select "back"
                    deleteDepartmentsRolesEmployees();
                    return;
                }
                const query = "DELETE FROM employee WHERE id = ?";
                connection.query(query, [answer.id], (err, res) => {
                    if (err) throw err;
                    console.log(
                        `Deleted employee with ID ${answer.id} from the database!`

                    );
                    // restart app
                    start();
                });
            });
    });
}

//function to delete role
function deleteRole() {
    //retrieve all available roles from the database
    const query = "SELECT * FROM roles";
    connection.query(query, (err, res) => {
        if (err) throw err;
        //map through retrieved roles to create an array of choices
        const choices = res.map((role) => ({
            name: `${role.title} (${role.id}) - ${role.salary}`,
            value: role.id,
        }));
        // add a "Go Back" option to list of choices
        choices.push({ name: "Go Back", value: null });
        inquirer
            .promp({
                type: "list",
                name: "roleId",
                message: "Select the role you want to delete:",
                choices:  choices,
            })
            .then((answer) => {
                //check if the user chose the "go back" option
                if (answer.roleId === null) {
                    // go back to deleteDepartmentRolesEmployees function
                    deleteDepartmentsRolesEmployees();
                    return;
                }
                const query = "DELETE FROM roles WHERE id = ?";
                connection.query(query, [answer.roleId], (err, res) => {
                    if (err) throw err;
                    console.log(
                        `Deleted role with ID ${answer.roleId} from the database!`
                    );
                    start();
                });
            });
    });
}

//function to delete department
function deleteDepartment() {
    //get list of departments
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err
    }
}