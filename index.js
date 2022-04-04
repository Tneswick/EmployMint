const { prompts } = require('inquirer');
const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const writeFile = require('./src/writeFile');

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
        },
        {
            type: 'list',
            name: 'next',
            message: 'Would you like to add engineers, interns, or complete your team and generate your HTML?',
            choices: ['Input Engineers', 'Input Interns', 'Generate HTML']
        }
    ])
    .then(({ name, id, email, officeNumber, next }) => {
        const manager = new Manager(name, id, email, officeNumber)
        managerArr.push(manager)

        if (next === 'Input Engineers') {
            askEngineer()
        }
        else if (next === 'Input Interns') {
            askIntern()
        }
        else {
            endFunc();
        }
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
                                .prompt({
                                    type: 'confirm',
                                    name: 'end',
                                    message: 'Would you like to complete your team and generate the HTML?',
                                    default: false
                                })
                                .then(({ end }) => {
                                    if (end) {
                                        endFunc();
                                        
                                    }
                                    else {
                                        promptEngineer()
                                    }
                                })
                        }
                    })
            }
        }
        promptEngineer();
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
            name: 'school',
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
                        endFunc();
                    }
                    else {
                        inquirer.prompt({
                            type: 'list',
                            name: 'next',
                            message: 'Please select an option from the list',
                            choices: ['Input more Engineers', 'Input more Interns', 'Complete team and generate HTML']
                        })
                        .then(({ next }) => {
                            if (next === 'Input more Engineers') {
                                askEngineer()
                            }
                            else if (next === 'Input more Interns') {
                                askIntern()
                            }
                            else {
                                endFunc();
                            }
                        })
                    }
                })
        }
    })
}

// html building functions
const getManager = function() {
    const html = 
    `<div class="col-2">
        <div class="card shadow rounded">
            <div class="card-header fs-5 text-center bg-danger bg-gradient text-white">
                ${managerArr[0].getName()}<br/>
                <strong>Manager</strong>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${managerArr[0].getId()}</li>
                <li class="list-group-item">Email: <a href="mailto: ${managerArr[0].getEmail()}">${managerArr[0].getEmail()}</a></li>
                <li class="list-group-item">Office Number: ${managerArr[0].officeNumber}</li>
            </ul>
        </div>
    </div>\n`

    return html;
}

const getEngineers = function() {
    let html = "" 
    for (let i = 0; i < engineerArr.length; i++) {
        const engineer =
        `<div class="col-2">
            <div class="card shadow rounded">
                <div class="card-header fs-5 text-center bg-dark bg-gradient text-white">
                    ${engineerArr[i].getName()}<br/>
                    <strong>Engineer</strong>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${engineerArr[i].getId()}</li>
                    <li class="list-group-item">Email: <a href="mailto: ${engineerArr[i].getEmail()}">${engineerArr[i].getEmail()}</a></li>
                    <li class="list-group-item">GitHub: <a href="https://github.com/${engineerArr[i].github}">${engineerArr[i].github}</a></li>
                </ul>
            </div>
        </div>\n`
        html += engineer
    }
    return html;
}

const getInterns = function () {
    let html = ""
    for (let i = 0; i < internArr.length; i++) {
        const intern = 
        `<div class="col-2">
            <div class="card shadow rounded">
                <div class="card-header fs-5 text-center bg-dark bg-gradient text-white">
                    ${internArr[i].getName()}<br/>
                    <strong>Intern</strong>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${internArr[i].getId()}</li>
                    <li class="list-group-item">Email: <a href="mailto: ${internArr[i].getEmail()}">${internArr[i].getEmail()}</a></li>
                    <li class="list-group-item">School: ${internArr[i].getSchool()}</li>
                </ul>
            </div>
        </div>\n`
        html += intern        
    }
    return html;
}

const generateHTML = function() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Team</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
    <header class="col-12 fs-1 p-5 bg-primary bg-gradient text-white text-center fw-bold shadow-lg mb-5">My Team</header>
    <section class="row justify-content-around">
        ${getManager()}
        ${getEngineers()}
        ${getInterns()}
    </section>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>`
}

const endFunc = function() {
    writeFile(generateHTML())
    console.log('Page created! Check the /dist folder to find your index.html file!');
}

askManager();