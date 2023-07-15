INSERT INTO department (id, name) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Human Resources');


INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Commander In Chief', 60000.00, 1),
(2, 'Marketing', 40000.00, 2),
(3, 'HR Specialist', 45000.00, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Oliver', 'Sykes', 1, NULL),
(2, 'Mat', 'Nichols', 2, 1),
(3, 'Lee', 'Malia', 3, 1),
(4, 'Matt', 'Kean', 4, 1),
(5, 'Jordan', 'Fish', 5, 1),
(6, 'Noah', 'Sebastian', 6, 1),
(7, 'Henry', 'Cavill', 7, 1);
(8, '')