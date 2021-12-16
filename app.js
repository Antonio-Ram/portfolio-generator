const inquirer = require('inquirer');

const generatePage = require('./src/page-template.js');

const { writeFile, copyFile } = require('./utils/generate-site.js');

/*const pageHTML = generatePage (name, github);

fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err;
    
    console.log('Portfolio complete! Check out index.html to see the output!');
});*/
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if (nameInput){
          return true;
        }else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'Github username',
      message: 'Enter you github Username',
      validate: usernameInput => {
        if (usernameInput){
          return true;
        }else {
          console.log('Please enter your username!');
          return false;
        }
      } 
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter som information about yourself for an "About" section',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        }else{
          return false;
        }
      }
    }
  ]);
};

const promptProject = portfolioData => {
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
          type: 'input',
          name: 'name',
          message: 'What is the name of your project?',
          validate: nameInput => {
            if (nameInput){
              return true;
            }else {
              console.log('Please enter your project name!');
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'description',
          message: 'Provide a description of the project (Required)',
          validate: descInput => {
            if (descInput){
              return true;
            }else {
              console.log('Please enter your description!');
              return false;
            }
          }
        },
        {
          type: 'checkbox',
          name: 'languages',
          message: 'What did you build this project with? (Check all that apply)',
          choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
          type: 'input',
          name: 'link',
          message: 'Enter the Github link to your project. (Required)',
          validate: linkInput => {
            if (linkInput){
              return true;
            }else {
              console.log('Please enter your link!');
              return false;
            }
          }
        },
        {
          type: 'confirm',
          name: 'feature',
          message: 'Would you like to feature this project?',
          default: false
        },
        {
          type: 'confirm',
          name: 'confirmAddProject',
          message: 'Would you like to enter another project?',
          default: false
        }
      ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
  });
};

  /*promptUser()
    .then(promptProject)
    .then(portfolioData => {
      const pageHTML = generatePage (portfolioData);
      // original fs data
      fs.writeFile('index.html', generatePage(portfolioData), err => {
          if (err) throw err;
      });//
      fs.writeFile('./dist/index.html', pageHTML, err => {
        if (err){
          console.log(err);
          return;
        }
        console.log('Page created! Check out index.html in this directory to see it!');

        fs.copyFile('./src/style.css', './dist/style.css', err => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('Style sheet copied successfully!');
        });
      });
    });*/

    //Refaactor th fs funtionality to use promises instead of callbacks
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

