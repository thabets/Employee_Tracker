const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
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
        console.log("You have now exited, have a wonderful day!");
        db.end();
      }
    });
}
async function viewAllDepartments() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "view_department",
        message: "Would you like to view all departments?",
      },
    ])
    .then((answers) => {
      if (answers) {
        db.query("SELECT * FROM department", (err, data) => {
          console.table(data);
          menu();
        });
      }
    });
}
async function viewAllRoles() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "view_roles",
        message: "Would you like to view all roles?",
      },
    ])
    .then((answers) => {
      if (answers) {
        db.query("SELECT * FROM emp_role", (err, data) => {
          console.table(data);
          menu();
        });
      }
    });
}
async function viewAllEmp() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "view_department",
        message: "Would you like to view all Employees?",
      },
    ])
    .then((answers) => {
      if (answers) {
        db.query("SELECT * FROM employee", (err, data) => {
          console.table(data);
          menu();
        });
      }
    });
}
async function addADepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO department(department_name) Values (?)",
        [answers.department],
        (err, data) => {
          console.log(data);
          menu();
        }
      );
    });
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
async function updEmp() {
  db.query("SELECT * FROM employee", (err, data) => {
    const formatted = data.map((row) => {
      return {
        name: `${row.first_name} ${row.last_name}`,
        value: row.id,
      };
    });
    // need to put the formatted within the same choice list.
    inquirer
      .prompt([
        {
          type: "list",
          name: "whichEmp",
          message:
            "Please choose the employee you would like to update from the list provided",
          choices: formatted,
        },
        // {
        //   type: "checkbox",
        //   name: "updName",
        //   message: "Would you like to update the employee name?",
        // },
        // {
        //   type: "checkbox",
        //   name: "updRole",
        //   message: "Would you like to update the employee role?",
        // },
        // {
        //   type: "checkbox",
        //   name: "updMng",
        //   message: "Would you like to update the employee manager?",
        // },
      ])
      .then((answer) => {
        if (answer.whichEmp.id === 1) {
          updRole();
        } else if (answer.whichEmp.id === 2) {
          updRole();
        } else if (answer.updMng) {
          updMng();
        } else {
          db.end();
        }
      });
  });
}
async function updRole() {
  db.query("SELECT * FROM emp_role", (err, data) => {
    const formatted = data.map((row) => {
      return {
        name: `${row.emp_title} ${row.emp_salary} ${department_id}`,
        value: row.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "newRole",
          message:
            "Please choose from the list provided the new role of the employee",
          choices: formatted,
        },
      ])
      .then((answers) => {
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
menu();
