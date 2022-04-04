const { prompts } = require('inquirer');
const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const managerArr = []
const engineerArr = []
const internArr = []

console.log('Welcome to your team tracking service: EmployMint');

const askManager = function() {
    inquirer
        .prompt([{
            type: 'input',
            name: 'name', 
            message: "What is your team manager's name?",
            validate: name => {
                if(name) {
                    return true
                }
                console.log('\nPlease enter a valid response');
                return false
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What is your team manager's ID number",
            validate: id => {
                if (parseInt(id)) {
                    return true
                }
                console.log('\nPlease enter a valid response');
                return false
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your team manager's email address?"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is your team manager's office number?",
            validate: office => {
                if (parseInt(office)) {
                    return true
                }
                console.log('\nPlease enter a valid response');
                return false
            }
        }
    ])
    .then(({ name, id, email, officeNumber }) => {
        const manager = new Manager(name, id, email, officeNumber)
        managerArr.push(manager)
    })
}

const askEngineer = function() {
    inquirer
        .prompt([{
            type: 'input',
            name: 'name', 
            message: "What is the engineer's name?",
            validate: name => {
                if(name) {
                    return true
                }
                console.log('\nPlease enter a valid response');
                return false
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the engineer's ID number",
            validate: id => {
                if (parseInt(id)) {
                    return true
                }
                console.log('\nPlease enter a valid response');
                return false
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the engineer's email address?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is this engineer's github username?",
            validate: github => {
                if (github) {
                    return true
                }
                console.log('\nPlease enter a valid response');
                return false
            }
        },
        {
            type: 'confirm',
            name: 'nextEngineer',
            message: 'Would you like to enter another Engineer?',
            default: false
        }
    ])
    .then(({ name, id, email, github, nextEngineer }) => {
        const engineer = new Engineer(name, id, email, github)
        engineerArr.push(engineer)
        const promptEngineer = function() {
            if(nextEngineer) {
                askEngineer()            
            } else {
                inquirer
                    .prompt({
                        type: 'confirm',
                        name: 'interns',
                        message: 'Would you like to add intern(s)?',
                        default: false
                    })
                    .then(({ interns }) => {
                        if(interns) {
                            askIntern()
                        }
                        else {
                            inquirer
                                prompt({
                                    type: 'confirm',
                                    name: 'end',
                                    message: 'Would you like to complete your team and generate the HTML?',
                                    default: false
                                })
                                .then(({ end }) => {
                                    if (end) {
                                        generateHTML()
                                    }
                                    else {
                                        promptEngineer()
                                    }
                                })
                        }
                    })
            }
        }
    })
}

const askIntern = function() {
    inquirer
        .prompt([{
            type: 'input',
            name: 'name', 
            message: "What is the intern's name?",
            validate: name => {
                if(name) {
                    return true
                }
                console.log('\nPlease enter a valid response');
                return false
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the intern's ID number",
            validate: id => {
                if (parseInt(id)) {
                    return true
                }
                console.log('\nPlease enter a valid response');
                return false
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the intern's email address?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the name of the intern's school?",
            validate: github => {
                if (github) {
                    return true
                }
                console.log('\nPlease enter a valid response');
                return false
            }
        },
        {
            type: 'confirm',
            name: 'nextIntern',
            message: 'Would you like to enter another Intern?',
            default: false
        }    
    ])
    .then(({ name, id, email, school, nextIntern }) => {
        const intern = new Intern(name, id, email, school)

        internArr.push(intern)
        if (nextIntern) {
            askIntern()
        }
        else {
            inquirer
                .prompt({
                    type: 'confirm',
                    name: 'end',
                    message: 'Would you like to complete your team and generate the HTML?'
                })
                .then(({ end }) => {
                    if (end) {
                        generateHTML();
                    }
                    else {
                        inquirer.prompt({
                            type: 'list',
                            name: 'next',
                            message: 'Please select an option from the list',
                            choices: ['']
                        })
                    }
                })
        }
    })
}