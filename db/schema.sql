CREATE TABLE department(
  id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE emp_role(
id INT AUTO_INCREMENT NOT NULL,
emp_title VARCHAR(30) NOT NULL,
emp_salary DECIMAL(20,2) NOT NULL,
department_name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT NOT NULL,
manager INT,
PRIMARY KEY(id)
);
CREATE TABLE management(
id INT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);


