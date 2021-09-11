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
        AddARole();
      } else if (answer.init_action === "Add an employee") {
        addAnEmp();
      } else if (answer.init_action === "Update an employee role") {
        updEmp();
      } else {
        db.end();
      }
    });
}
