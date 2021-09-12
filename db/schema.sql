DROP TABLE IF EXISTS department; 
CREATE TABLE department(
  department_id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY(department_id)
);

DROP TABLE IF EXISTS emp_role;
CREATE TABLE emp_role(
id INT AUTO_INCREMENT NOT NULL,
emp_title VARCHAR(30) NOT NULL,
emp_salary DECIMAL(20,2) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY(id)
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
department_id INT NOT NULL,
manager INT,
PRIMARY KEY(id)
);

DROP TABLE IF EXISTS management;
CREATE TABLE management(
id INT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);


