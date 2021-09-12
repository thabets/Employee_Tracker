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
      console.log(answer.init_action);
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
async function addADepartment() {}
async function addARole() {}
async function addAnEmp() {
  db.query("SELECT * FROM emp_role", (err, data) => {
    const formatted = data.map((row) => {
      return {
        name: `${row.first_name}${row.last_name}`,
        value: row.id,
      };
    });

    inquirer.prompt([
      {
        type: "input",
        name: "emp_fname",
        message:
          "What is the first name of the employee you would like to add?",
      },
      {
        type: "input",
        name: "emp_lname",
        message: "What is the last name of the employee you would like to add?",
      },
      {
        type: "list",
        name: "emp_title",
        message:
          "Choose from the list provided the title the employee will receive:",
        choices: formatted,
      },
    ]);
  });
}
async function updEmp() {}

menu();
