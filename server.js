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
    console.log('\n');
    inquirer.prompt([
        {
            type: 'list',
            name: 'delete',
            message: "Please choose from the menu below:",
            choices: [
                "DELETE Department",
                "DELETE Role",
                "DELETE Employee"
            ]
        }
    ]).then(answers6 => {
        switch (answers6.delete) {
            case 'DELETE Employee':
                deleteEmployee();
                break;
            case 'DELETE Department':
                deleteDepartment();
                break;
            case 'DELETE Role':
                deleteRole();
                break;
            default:
                deleteQuery();
        }
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
function deleteEmployee() {
    connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.log('-------------------------------------------')
        console.log('++++++++++++++ EMPLOYEE LIST ++++++++++++++')
        console.log('-------------------------------------------')
        console.table(results);
        console.log('\n');
        console.log('-------------------------------------------')
    })
    inquirer.prompt([
        {
            type: "input",
            name: "empId",
            message: "Please enter the employee ID of the employee you want to delete:"
        }
    ]).then(answers7 => {
        connection.query("DELETE FROM employee WHERE id = ?", answers7.empId, (err) => {
            if (err) throw err;
            console.log('\n');
            console.log('-------------------------------------------');
            console.log("***** The Employee has been DELETED *******");
            console.log('-------------------------------------------');
            console.log('\n');
            mainQuery();
        })
    })
}
function deleteRole() {
    connection.query("SELECT * FROM role", (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.log('-------------------------------------------')
        console.log('++++++++++++++ COMPANY ROLES ++++++++++++++')
        console.log('-------------------------------------------')
        console.table(results);
        console.log('\n');
        console.log('-------------------------------------------')
    })
    inquirer.prompt([
        {
            type: "input",
            name: "roleId",
            message: "Please enter the role ID of the role you want to delete:"
        }
    ]).then(answers => {
        connection.query("DELETE FROM role WHERE id = ?", answers.roleId, (err) => {
            if (err) throw err;
            console.log('\n');
            console.log('-------------------------------------------');
            console.log("******* The Role has been DELETED *********");
            console.log('-------------------------------------------');
            console.log('\n');
            mainQuery();
        })
    })
}
function deleteDepartment() {
    connection.query("SELECT * FROM department", (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.log('-------------------------------------------')
        console.log('+++++++++++ COMPANY DEPARTMENTS +++++++++++')
        console.log('-------------------------------------------')
        console.table(results);
        console.log('\n');
        console.log('-------------------------------------------')
    })
    inquirer.prompt([
        {
            type: "input",
            name: "depId",
            message: "Please enter the Department ID of the department you want to DELETE:"
        }
    ]).then(answers => {
        connection.query("DELETE FROM department WHERE id = ?", answers.depId, (err) => {
            if (err) throw err;
            console.log('\n');
            console.log('-------------------------------------------');
            console.log("***** The Department has been DELETED *****");
            console.log('-------------------------------------------');
            console.log('\n');
            mainQuery();
        })
    })
}
