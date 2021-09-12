USE employee_db;

INSERT INTO department(department_name)
VALUES
("Legal"),
("Accounting"),
("R&D"),
("Sales");
INSERT INTO emp_role(emp_title,emp_salary,department_name)
-- WRITE down all the roles and link then to the department
-- Then link them with the role_id so it will show department name, title of employee as well as salary for the different roles
("Engineer", 60000, "R&D"),
("Lawyer",70000,"Legal"),
("Sales Rep", 50000, "Sales"),
("Accountant", 70000, "Accounting"),
("Lead Engineer",80000,"R&D"),
("Sales Manager",70000,"Sales"),
("Paralegal", 45000, "Legal");

INSERT INTO employee(first_name,last_name,role_id,manager)
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
(11,'Virginia', 'Woolf'),
(31,'Charles', 'LeRoi'),
(41,'Katherine', 'Mansfield');