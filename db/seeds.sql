INSERT INTO departments (department_name) 
VALUES
('Executive Staff'),
('Marketing'),
('Human Resources'),
('Finance'),
('Engineering'),
('Information Technology'),
('Customer Relations')
('Research and Development'),
('Legal'),
('Maintenance');


INSERT INTO roles (id, title, salary, department_id) VALUES
('Commander In Chief', 60000.00, 1),
('Marketing Manager', 40000.00, 2),
('HR Specialist', 45000.00, 3),
('Finance Head', 452000.00, 4),
('Senior Engineer', 78100.00, 5),
('IT Manager', 154200.00, 6),
('Customer Relations Manager', 50000.00, 7),
('Research and Development Manager', 45610.00, 8),
('Legal Manager', 456600.00, 9)
('Maintenance Manager', 12300.00, 10);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
('Oliver', 'Sykes', 1),
('Mat', 'Nichols', 2, 2),
('Lee', 'Malia', 3, 3),
('Matt', 'Kean', 4, 4),
('Jordan', 'Fish', 5, 5),
('Noah', 'Sebastian', 6, 6),
('Henry', 'Cavill', 7, 7),
('Brandon', 'Boyd', 8, 8),
('Mark', 'Hammil', 9, 9),
('Hayden', 'Christensen', 10, 10);