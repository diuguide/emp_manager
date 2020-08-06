const inquirer = require("inquirer");
const mysql = require('mysql');
require("console.table");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "new_password",
    database: "emp_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected');
    mainQuery();
});

function mainQuery() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'main',
                message: "Please choose from the menu below:",
                choices: [
                    "Add Departments, Roles, or Employees",
                    "View Departments, Roles, or Employees",
                    "Update Employee Roles",
                    "Update Employee Managers",
                    "View Employees by Manager",
                    "Delete Departments, Roles, or Employees"
                ]
            }
        ]).then(answers => {
            // switch statement for each role  
            switch (answers.main) {
                case 'Add Departments, Roles, or Employees':
                    addQuery();
                    break;
                case 'View Departments, Roles, or Employees':
                    viewQuery();
                    break;
                case 'Update Employee Roles':
                    updateQuery();
                    break;
                case 'Update Employee Managers':
                    managerQuery();
                    break;
                case 'View Employees by Manager':
                    man_empQuery();
                    break;
                case 'Delete Departments, Roles, or Employees':
                    deleteQuery();
                    break;

                default:
                    mainQuery();
                    break;
            }
        });
};

function addQuery() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'add',
            message: "Please choose from the menu below:",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee"
            ]
        }

    ]).then(answers => {
        // switch statement for each role  
        switch (answers.add) {
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            default:
                mainQuery();
                break;
        }
    });

}
const departmentChoices = {
    viewDepartments : "View Departments",
    viewRoles : "View Roles",
    viewEmployees : "View Employees"  
}
function viewQuery() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'view',
            message: "Please choose from the menu below:",
            choices: [
                departmentChoices.viewDepartments,
                departmentChoices.viewRoles,
                departmentChoices.viewEmployees
            ]
        }

    ]).then(answers => {
        // switch statement for each role  
        switch (answers.view) {
            case departmentChoices.viewDepartments:
                viewDepartments();
                break;
            case departmentChoices.viewRoles:
                viewRoles();
                break;
            case departmentChoices.viewEmployees:
                viewEmployees();
                break;
            default:
                mainQuery();
                break;
        }
    });
}


function viewDepartments() {
    connection.query("SELECT * FROM department", (err, results) => {
        console.table(results);
        mainQuery();
    })
}
function viewRoles() {
    connection.query("SELECT * FROM role", (err, results) => {
        console.table(results);
        mainQuery();
    })
}
function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, results) => {
        console.table(results);
        mainQuery();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the new department?"
        }
    ]).then(answers => {
        connection.query("INSERT INTO department(name)VALUES(?)", answers.name, (err) => {
            if (err) throw err;
            console.log("Department has been added");
            mainQuery();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?"
        },
        {
            type: "input",
            name: "depId",
            message: "What is the department ID of the new role?"
        }

    ]).then(answers => {
        connection.query("INSERT INTO role(title, salary, department_id)VALUES(?, ?, ?)", [answers.title, answers.salary, answers.depId], (err) => {
            if (err) throw err;
            console.log("Role has been added");
            mainQuery();
        })
    });
}
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstname",
            message: "What is the first name of the new Employee?"
        },
        {
            type: "input",
            name: "lastname",
            message: "What is the last name of the new Employee?"
        },
        {
            type: "input",
            name: "roleId",
            message: "What is the role ID of the new employee?"
        }
    ]).then(answers => {
        connection.query("INSERT INTO department(name)VALUES(?)", answers.name, (err) => {
            if (err) throw err;
            console.log("Department has been added");
            mainQuery();
        })
    })
}

function updateEmployeeRoles() {
    inquirer.prompt ([
        {
        type: "list",
        name: "role",
        message: "Please choose a role to update",
        choices: [

        ]
        }
    ])
}




