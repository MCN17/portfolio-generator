// const fs = require("fs");    No longer need to use the fs library becuase of the the code right below this line
const { writeFile, copyFile } = require("./utils/generate-site.js");
const generatePage = require('./src/page-template');
const inquirer = require("inquirer");

inquirer
const promptUser = () => {

    return inquirer.prompt([

        
        {
            type: "input",
            name: "name",
            message: "What is your name? (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter your name");
                    return false;
                }
            }
        },
        {
            type: "input", 
            name: "github", 
            message: "Enter your Github Username",
            validate: githubNameInput => {
                if (githubNameInput) {
                    return true;
                } else {
                    console.log("Please enter your GitHub username!");
                    return false;
                }
            }
        }, 
        {
            type: "confirm", 
            name: "confirmAbout", 
            message: "Would you like to enter some information about yourself for an 'About' section?", 
            default: true
        },
        {
            type: "input", 
            name: "about" ,
            message: "Provide some information about yourself:", 
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};
// promptUser().then(answers => console.log(answers));

const promptProject = portfolioData => {

    // If there's no "projects" array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    console.log(`
    
    =================
    
    Add a New Project 

    =================
    `);

        return inquirer.prompt([
            {
                type: "input", 
                name: "name", 
                message: "What is the name of your project?", 
                validate: projectNameInput => {
                    if (projectNameInput) {
                        return true;
                    } else {
                        console.log("Please enter your name");
                        return false;
                    }
                }
            }, 
            {
                type: "input", 
                name: "description", 
                message: "Provide a description of the project (Required)", 
                validate: descriptionInput => {
                    if (descriptionInput) {
                        return true;
                    } else {
                        console.log("Please provide a description of the project!");
                        return false;
                    }
                }
            }, 
            {
                type: "checkbox", 
                name: "languages", 
                message: "What did you build this project with? (Check all that apply)",
                choices: ["JavaScript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
            }, 
            {
                type: "input", 
                name: "link", 
                message: "Enter the Github link to your project. (Required)", 
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log("Please provide a link to your github!");
                        return false;
                    }
                }
            },
            {
                type: "confirm", 
                name: "feature", 
                message: "Wuold you like to feature this project?", 
                default: false
            }, 
            {
                type: "confirm", 
                name: "confirmAddProject", 
                message: "Would you like to enter another project",
                default: false
            }
        ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
}

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });
    
    // console.log(portfolioData);


// const fs = require("fs");
// const generatePage = require("./src/page-template.js");

// const pageHTML = generatePage(name, github);

// fs.writeFile("./index.html", pageHTML, err => {
//     if (err) throw new Error(err);
  
//     console.log('Portfolio complete! Check out index.html to see the output!');
//   });











// const profileDataArgs = process.argv.slice(2, process.argv.length);
// const [name, github] = profileDataArgs;

// const fs = require("fs");

// // console.log(profileDataArgs);

// const generatePage = (name, github) => {
//     return `
//     <!DOCTYPE html> 
//   <html lang="en"> 
//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Portfolio Demo</title>
//   </head>
  
//   <body>
//     <h1>${name}</h1>
//     <h2><a href="https://github.com/${github}">Github</a></h2>
//   </body> 
//   </html>
//   `;
// };
// // console.log(name, github);
// // console.log(generatePage(name, github));



// fs.writeFile("index.html", generatePage(name, github), err=> {
//     if (err) throw err;

//     console.log("Portfolio complete! Check out index.html to see the output!");
// });
























// const printProfileData = profileDataArr => {

//     //This 
//     for (let i = 0; i < profileDataArr.length; i++) {
//       console.log(profileDataArr[i]);
//     }

//     console.log('================');

//     // Is the same as this....
//     profileDataArr.forEach(profileItem => console.log(profileItem));
//   };

//   printProfileData(profileDataArgs);

  
