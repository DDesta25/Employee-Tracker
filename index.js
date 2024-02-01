const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the Employee_Tracker database.`)
);

const prompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "what would you like to do",
        choices: [
          { name: "view all departments", value: "VIEW_DEPARTMENTS" },
          { name: "view all employees", value: "VIEW_EMPLOYEES" },
          { name: "view all roles", value: "VIEW_ROLES" },

          { name: "add a department", value: "ADD_DEPARTMENT" },
          { name: "add a role", value: "ADD_ROLE" },
          { name: "add an employee", value: "ADD_EMPLOYEE" },
          { name: "update an employee role", value: "UPDATE_EMPLOYEE_ROLE" },
        ],
      },
    ])
    .then((res) => {
      let choice = res.choices;
      switch (choice) {
        case `VIEW_EMPLOYEES`:
          getAllEmployees();
          break;
        case `VIEW_ROLES`:
          getAllRoles();
          break;
        case `ADD_ROLE`:
          addRole();
          break;
        case `ADD_DEPARTMENT`:
          addDepartment();
          break;
        case `ADD_EMPLOYEE`:
          addEmployee();
          break;
        case `VIEW_DEPARTMENTS`:
          viewDepartment();
          break;
        case `UPDATE_EMPLOYEE_ROLE`:
          updateEmployeeRole();
          break;
        default:
          break;
      }
    });
};

// This will have the initial prompt for "What do you want to do?"
prompt();

/** ToDo --eventually I have a Join that shows the department name */
function getAllEmployees() {
  db.query(`select * from employee`, (err, results) => {
    console.table(results);
    console.log("view all employee");
    prompt();
  });
}

function getAllRoles() {
  db.query(`select * from role`, (err, results) => {
    console.table(results);
    console.log("view all role");
    prompt();
  });
}

function viewDepartment() {
  db.query(`select * from department`, (err, results) => {
    console.table(results);
    console.log("view all department");
    prompt();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "whats the name of the new department",
      },
    ])
    .then((answers) => {
      db.query("insert into department set ?", answers, (err, results) => {
        if (err) throw err;
        console.table(results);
        prompt();
      });
    });
}

function addRole() {
  db.query("select * from department", (err, results) => {
    const departmentArray = results.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "whats the title of the role",
        },
        {
          type: "number",
          name: "salary",
          message: "what is the salary",
        },
        {
          type: "list",
          name: "department_id",
          message: "what department is this role in",
          choices: departmentArray,
        },
      ])
      .then((answers) => {
        db.query("insert into role set ?", answers, (err, results) => {
          if (err) throw err;
          console.table(results);
          prompt();
        });
      });
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "whats the first name of the employee",
        validate: (firstNameInput) => {
          if (firstNameInput) {
            return true;
          } else {
            console.log("please enter first name");
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'what is the last name of the employee',
        validate: LastNameInput => {
          if (LastNameInput) {
            return true;
          } else {
            console.log("please enter last name");
            return false;
          }
        }
      }
    ])
    .then((answers) => {
      db.query("INSERT INTO employee SET ?", answers, (err, results) => {
        if (results) throw results;
        console.table(results);
        prompt();
      });
    });
}

function updateEmployeeRole() {
  db.query("select * from department", (err, results) => {
    const employeeArray = results.map((employee) => ({
      name: employee.name,
      value: employee.id,
    }));

    const roleArray = [
      { name: "Role 1", value: 1 },
      { name: "Role 2", value: 2 },
      { name: "Role 3", value: 3 },
      { name: "Role 4", value: 4 },
      { name: "Role 5", value: 5 },
      { name: "Role 6", value: 6 },
      { name: "Role 7", value: 7 },
    ];

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "what employee role do you want to update ",
          choices: employeeArray,
        },
        {
          type: "list",
          name: "role",
          message: "what is their updated role",
          choices: roleArray,
        },
      ])
      .then((answers) => {
        db.query(
          "UPDATE employee SET role_id = ? WHERE employee_name =?",
          [answers.role, answers.employee],
          (err, results) => {
            if (results) throw results;
            console.table("Employee role updated");
            prompt();
          }
        );
      });
  });
}
