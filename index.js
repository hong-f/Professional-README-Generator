// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Enter Project name.',
        name: 'title'

    },
    
    {
        type: 'input',
        message: 'Provide short description of application function.',
        name: 'description',
    },
   
    {
        type: 'input',
        message: 'Application Instructions(optional)',
        name: 'installation',
    },
    {
        type: 'checkbox',
        message: 'Select license this application uses',
        name: 'license',
        choices: [
            'MIT',
            'Apache_2.0',
            'Perl',
            'Other',
            'None',
        ]

    },
    {
        type: 'input',
        message: 'Provide instructions for use of this application',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'How can users contribute to this application?',
        name: 'contributing',
    },
    {
        type: 'input',
        message: 'Provide test case for your application (Optional)',
        name: 'test',
    },
    {
        type: 'input',
        message: 'Enter your GitHub username',
        name: 'userName',
    },
    {
        type: 'input',
        message: 'Enter your email address',
        name: 'email',
    },

];

// TODO: Create a function to write README file
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
      fs.writeFile('./generated/generated-README.md', fileContent, err => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve({
          ok: true,
          message: 'README file created.'
        });
      });
    });
  };
  
  // Function that prompts questions + store user inputs
  const init = () => {
  
    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData;
    })
};
  // TODO: Create a function to initialize app
  init()
  .then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
  })
  .then(pageMD => {
    return writeFile(pageMD);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse.message);
  })
  .catch(err => {
    console.log(err);
  });

