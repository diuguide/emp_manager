const inquirer = require("inquirer");
const mysql = require('mysql');
require("console.table");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "new_password",
    database: "emp_db"
});
connection.connect(function (err) {
    if (err) throw err;
});
mainQuery();
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
                    // "Update Employee Managers",
                    // "View Employees by Manager",
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
                // case 'Update Employee Managers':
                //     managerQuery();
                //     break;
                // case 'View Employees by Manager':
                //     man_empQuery();
                //     break;
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

    ]).then(answers1 => {
        // switch statement for each role  
        switch (answers1.add) {
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
    viewDepartments: "View Departments",
    viewRoles: "View Roles",
    viewEmployees: "View Employees"
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

    ]).then(answers2 => {
        // switch statement for each role  
        switch (answers2.view) {
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
function updateQuery() {
    connection.query("SELECT * FROM employee", (err, results) => {
        console.log('\n' + '\n');
        console.table(results);
        inquirer.prompt([
            {
                type: "input",
                name: "empId",
                message: "Please enter the ID of an employee to update"
            },
            {
                type: "input",
                name: "newRole",
                message: "Enter a new role ID to be assigned to the employee"
            }
        ]).then(answers3 => {
            connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answers3.newRole, answers3.empId], (err) => {
                if (err) throw err;
                console.log('\n');
                console.log('-------------------------------------------')
                console.log("!!! The Employee Role has been updated !!!!");
                console.log('-------------------------------------------')
                console.log('\n');
                mainQuery();
            })
        })
    })
}
function deleteQuery() {
    connection.query("SELECT * FROM employee", (err, results) => {
        console.log('\n' + '\n');
        console.table(results);
        inquirer.prompt([
            {
                type: "input",
                name: "empId",
                message: "Please enter the ID of an employee to DELETE"
            }
        ]).then(answers6 => {
            connection.query("DELETE FROM employee WHERE id = ?", answers6.empId, (err) => {
                if (err) throw err;
                console.log('\n');
                console.log('-------------------------------------------')
                console.log("!!! The Employee Role has been updated !!!!");
                console.log('-------------------------------------------')
                console.log('\n');
                mainQuery();
            })
        })
    })
}
function viewDepartments() {
    connection.query("SELECT * FROM department", (err, results) => {
        console.log('\n');
        console.log('-------------------------------------------')
        console.log('+++++++++++ COMPANY DEPARTMENTS +++++++++++')
        console.log('-------------------------------------------')
        console.table(results);
        console.log('\n');
        console.log('-------------------------------------------')
        mainQuery();
    })
}
function viewRoles() {
    connection.query("SELECT * FROM role", (err, results) => {
        console.log('\n');
        console.log('-------------------------------------------')
        console.log('++++++++++++++ COMPANY ROLES ++++++++++++++')
        console.log('-------------------------------------------')
        console.table(results);
        console.log('\n');
        console.log('-------------------------------------------')
        mainQuery();
    })
}
function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, results) => {
        console.log('\n');
        console.log('-------------------------------------------')
        console.log('++++++++++++++ EMPLOYEE LIST ++++++++++++++')
        console.log('-------------------------------------------')
        console.table(results);
        console.log('\n');
        console.log('-------------------------------------------')
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
    ]).then(answers4 => {
        connection.query("INSERT INTO department(name)VALUES(?)", answers4.name, (err) => {
            if (err) throw err;
            console.log('\n');
            console.log('-------------------------------------------')
            console.log("!!!!!!!! Department has been added !!!!!!!!");
            console.log('-------------------------------------------')
            console.log('\n');
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

    ]).then(answers5 => {
        connection.query("INSERT INTO role(title, salary, department_id)VALUES(?, ?, ?)", [answers5.title, answers5.salary, answers5.depId], (err) => {
            if (err) throw err;
            console.log('\n');
            console.log('-------------------------------------------')
            console.log("!!!!!!!! A New Role has been added !!!!!!!!");
            console.log('-------------------------------------------')
            console.log('\n');
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
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the manager ID of the new employee?"
        }
    ]).then(answers6 => {
        connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES(?, ?, ?, ?)", [answers6.firstname, answers6.lastname, answers6.roleId, answers6.managerId], (err) => {
            if (err) throw err;
            console.log('\n');
            console.log('-------------------------------------------')
            console.log("!!!!!! A New Employee has been added !!!!!!");
            console.log('-------------------------------------------')
            console.log('\n');
            mainQuery();
        })
    })
}






