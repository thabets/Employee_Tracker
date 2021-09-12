USE employee_db;

INSERT INTO department(department_name)
VALUES
("Legal"),
("Accounting"),
("R&D"),
("Sales");
INSERT INTO emp_role(emp_title,emp_salary,department_id)
-- WRITE down all the roles and link then to the department
-- Then link them with the role_id so it will show department name, title of employee as well as salary for the different roles
VALUES
("Engineer", 60000, 3),
("Lawyer",70000,1),
("Sales Rep", 50000, 4),
("Accountant", 70000, 2),
("Lead Engineer",80000,3),
("Sales Manager",70000,4),
("Paralegal", 45000, 1);

INSERT INTO employee(first_name,last_name,emp_role,manager_id)
VALUES
('Ronald', 'Firbank', 1, 11),
('Virginia', 'Woolf', 1, NULL),
('Piers', 'Gaveston', 2, NULL),
('Charles', 'LeRoi', 3, NULL),
('Katherine', 'Mansfield', 4, NULL),
('Dora', 'Carrington', 2, NULL),
('Edward', 'Bellamy', 3, 31),
('Montague', 'Summers', 4, 41),
('Octavia', 'Butler', 4, 41),
('Unica', 'Zurn', 3, 31);

INSERT INTO management(id,first_name,last_name)
VALUES
(11,'Virginia', 'Woolf'),
(31,'Charles', 'LeRoi'),
(41,'Katherine', 'Mansfield');