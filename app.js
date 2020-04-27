const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

//ask what type of employee they want (need to be able to add as many as they want)
//inquirer question with a list (enginner, intern, manager, none)
//must be able to add unlimited number
//answer questions based on specific type of employee
//create instance of said employee using "new manager/intern"

const questions = [
    {
        type: "list",
        name: "employeeType",
        message: "Which Employee Would You Like To Add? Use Up & Down Arrows To Select",
        choices: ["Manager", "Engineer", "Intern"]
    }
];

const mQuestions = [
    {
        type: "input",
        name: "name",
        message: "Please Enter the Employee's First Name"
    },
    {
        type: "input",
        name: "id",
        message: "Please Enter ID"
    },
    {
        type: "input",
        name: "email",
        message: "Please Enter Email Address"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Please Enter Office Number"
    },
];

const eQuestions = [
    {
        type: "input",
        name: "name",
        message: "Please Enter the Employee's First Name"
    },
    {
        type: "input",
        name: "id",
        message: "Please Enter ID"
    },
    {
        type: "input",
        name: "email",
        message: "Please Enter Email Address"
    },
    {
        type: "input",
        name: "github",
        message: "Please Enter GitHub ID"
    },
];

const iQuestions = [
    {
        type: "input",
        name: "name",
        message: "Please Enter the Intern's First Name"
    },
    {
        type: "input",
        name: "id",
        message: "Please Enter ID"
    },
    {
        type: "input",
        name: "email",
        message: "Please Enter Email Address"
    },
    {
        type: "input",
        name: "school",
        message: "Please Enter University"
    },
];


//use write file, once all employees are entered and once NONE is selected
//if response is none, then we run writeFile (render method must run before)
//if they immediately say NONE (without ever entering employee), need if statement: if there is somethig in the employees array, then run render/write file. if not, do not run

function writeToFile(filename, data) {
    fs.writeFile(filename, data, function(err){
        if (err) {
            console.log(err);
        }
        else {console.log("Success!")};
    })
};

function finalQuestions() {

    const final = [
        {
            type: "list",
            name: "end",
            message: "Would You Like To Add Another Employee?",
            choices: ["Yes", "No"]
        },
    ];
    
    inquirer
    .prompt(final)
    .then(function(response) {
        if (response.end === "Yes") {
            init();
        }
        else {  
            var newHTML = render(employees);
            writeToFile(outputPath, newHTML);
        }
    });
};
    
var employees = [];

function init() {

inquirer
.prompt(questions)
.then(function(response){

    if (response.employeeType === "Manager") {
        inquirer.prompt(mQuestions)
        .then(function(response) {
            employees.push(new Manager(response.name, response.id, response.email, response.officeNumber));
            finalQuestions();
            console.log(employees);
        });
    }
    else if (response.employeeType === "Engineer") {
        inquirer.prompt(eQuestions)
        .then(function(response) {
            employees.push(new Engineer(response.name, response.id, response.email, response.github));
            finalQuestions();
            console.log(employees);
        });
    }
    else if (response.employeeType === "Intern") {
        inquirer.prompt(iQuestions)
        .then(function(response) {
            employees.push(new Intern (response.name, response.id, response.email, response.school));
            finalQuestions();
            console.log(employees);
        });
    }
});

};

init();