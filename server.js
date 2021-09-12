const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PW,
    database: "employee_db",
  },
  console.log("Connected to the employee database")
);

function menu() {
  console.log("Welcome to the Employee Tracker!");
  inquirer
    .prompt([
      {
        type: "list",
        name: "init_action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      if (answer.init_action === "View all departments") {
        viewAllDepartments();
      } else if (answer.init_action === "View all roles") {
        viewAllRoles();
      } else if (answer.init_action === "View all employees") {
        viewAllEmp();
      } else if (answer.init_action === "Add a department") {
        addADepartment();
      } else if (answer.init_action === "Add a role") {
        addARole();
      } else if (answer.init_action === "Add an employee") {
        addAnEmp();
      } else if (answer.init_action === "Update an employee role") {
        updEmp();
      } else {
        db.end();
      }
    });
}
async function viewAllDepartments() {}
async function viewAllRoles() {}
async function viewAllEmp() {}
async function addADepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "department",
      message: "What is the name of the department you would like to add?",
    },
  ]);
}
async function addARole() {
  db.query("SELECT * FROM department", (err, data) => {
    const formatted = data.map((row) => {
      return {
        name: `${row.department_id}${row.department_name}`,
        value: row.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "department_id",
          message:
            "Please choose what department will the role fall under? 1 for Legal, 2 for Accounting, 3 for R&D and 4 For Sales",
          choices: ["1", "2", "3", "4"],
        },
        {
          type: "input",
          name: "emp_salary",
          message: "What is the yearly pay for the role?",
        },
        {
          type: "input",
          name: "emp_title",
          message: "what would be the title of the position?",
        },
      ])
      .then((answers) => {
        console.log(answers);
        db.query(
          "INSERT INTO emp_role(emp_title,emp_salary,department_id) Values (?,?,?)",
          [answers.emp_title, answers.emp_salary, answers.department_id],
          (err, data) => {
            console.log(data);
            menu();
          }
        );
      });
  });
}
async function addAnEmp() {
  db.query("SELECT * FROM emp_role", (err, data) => {
    const formatted = data.map((row) => {
      return {
        name: `${row.emp_title}${row.emp_salary}${row.department_id}`,
        value: row.id,
      };
    });

    inquirer
      .prompt([
        {
          type: "input",
          name: "emp_fname",
          message:
            "What is the first name of the employee you would like to add?",
        },
        {
          type: "input",
          name: "emp_lname",
          message:
            "What is the last name of the employee you would like to add?",
        },
        {
          type: "list",
          name: "emp_title",
          message:
            "Choose from the list provided the title the employee will receive:",
          choices: formatted,
        },
        {
          type: "list",
          name: "manager",
          message: "Select Who manages the employee?",
          choices: [
            "Virginia Woolf",
            "Charles LeRoi",
            "Katherine Mansfield",
            "Not Applicable",
          ],
        },
      ])
      .then((answers) => {
        console.log(answers);
        db.query(
          "INSERT INTO employee(first_name,last_name,emp_role,manager) Values (?,?,?,?)",
          [
            answers.emp_fname,
            answers.emp_lname,
            answers.emp_title,
            answers.manager,
          ],
          (err, data) => {
            console.log(data);
            menu();
          }
        );
      });
  });
}
async function updEmp() {}

menu();
