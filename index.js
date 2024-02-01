const inquirer = require("inquirer");
const mysql = require("mysql2");

const prompt = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "choices",
      message: "what would you like to do",
      choices: [
        { name: "view all departments", value: "VIEW_DEPARTMENTS" },
        { name: "view all employees", value: "VIEW_EMPLOYEES" }
        { name: "view all roles", value: "VIEW_ROLES" },
        { name: "view all employee_role", value: "VIEW_EMPLOYEE_ROLE" },
        { name: "add a department", value: "ADD_DEPARTMENT" },
        { name: "add a role", value: "ADD_ROLE"},
        { name: "add an employee", value: "ADD_EMPLOYEE"},
        { name: "update an employee role", value: "UPDATE_EMPLOYEE_ROLE" },
      ],
    },
  ])
  .then((res)=> {
let choice = res.choice 
switch (choice) {
    case `VIEW_EMPLOYEES`:
    //   getAllEmployees();
    console.log(choice);
      break;
    case `view roles`:
      getAllRoles();
      break;
  
    default:
      break;
  }
  } )

};

/* prompt with -- 
  List:
  - view employees
  - view departments
  - view roles
  - add employee
  - change role
  - add role
*/

// This will have the initial prompt for "What do you want to do?"
start();

/** ToDo --eventually I have a Join that shows the department name */
function getAllEmployees(params) {
  db.query(`select * from employees`, (err, results) => {
    console.table(results);
    start();
  });
}

function getAllRoles(params) {
  db.query(`select * from roles`, (err, results) => {
    console.table(results);
    start();
  });
}
// function to query fro all employees and log the table
switch (key) {
  case `view employees`:
    getAllEmployees();
    break;
  case `view roles`:
    getAllRoles();
    break;

  default:
    break;
}

// Here are the bonus options for Employee Tracker:
// update employee managers, view employees by manager,
//  view employees by department, departments, roles, and employees,
// view the total utilized budget of a department

// view all departments,
//  view all roles, view all employees, add a department, add a role, add an employee,
// and update an employee role
