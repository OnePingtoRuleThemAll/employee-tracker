# Employee Management System
This is a command-line application that allows business owners to view and manage departments, roles, and employees in their company. The application provides various options to organize and pan the business effectively.

## User Story
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company so that I can organize and plan my business efficiently.

## Acceptance Criteria
The application meet the following acceptance criteria:
1. When the application is started, the user is presented with the following options:
- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role
2. When the user chooses to view all departments, a formatted table is displayed showing the department names and department ID's.
3. When the user chooses to view all roles, a formatted table is displayed showing employee data, including employee IDs, first names, last names, job titles, departments, salaries, and managers that the employee reports to.
5. When the user chooses to add a department, and that department is added to the database. 
6. Whem the user chooses to add a role, they are prompted to enter the name, salary, and department for the role, and that role is added to the database.
7. When the user chooses to add an employee, they are prompted to enter the employee's first name, last name, role, and manager. The employee is then added to the database.
8. When the user chooses to update an employee role, they are prompted to select an employee to update and their new role. The employee's role information is then updated in the database.

## Installation
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. INstall the required dependencies using npm install.

## Usage
1. Start the application: node index.js
2. Follow the prompts and select the desired options to view and manage departments, roles, and employees in your company.

## Technologies Used
- Javascript
- Node.js
- MySQL

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please submit an issue or a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any questions or inquiries, please contact me at Sissy1310@aol.com


## Bonus
Try to add some additional functionality to your application, such as the ability to do the following:

Update employee managers.

View employees by manager.

View employees by department.

Delete departments, roles, and employees.

View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.