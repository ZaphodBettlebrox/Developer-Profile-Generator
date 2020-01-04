const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "color",
      message: "What is your color?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
  ]);
}

function generateHTML(answers) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Portfolio Page</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <link rel="stylesheet" href="style.css">
  </head>
  <body>
  
      <div class="container-fluid">
          <div class="box tempBackground">
              <div class="row">
                  <div class="col-md-12 margin-top">
                      <img  class = "image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="blank image">
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <h1 class="center">Hi!</h1>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <h1 class="center">My name is: ${answers.color}</h1>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <p class="center">Link to location: ${answers.location}</p>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <p class="center"> Link to GitHub Profile: ${answers.bio}</p>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <p class="center"> Link to blog: ${answers.LinkedinUrl}</p>
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="col-md-12">
                  <p class="center"> User Bio: ${answers.github}</p>
              </div>
          </div>
          <div class="row">
              <div class="col-md-6">
                  <p class="center box tempBackground"> Number of Public repositories: ${answers.GithubUrl}</p>
              </div>
              <div class="col-md-6">
                  <p class="center box tempBackground"> Followers: ${answers.GithubUrl}</p>
              </div>
          </div>
          
          <div class="row">
              <div class="col-md-6">
                  <p class="center box tempBackground"> following: ${answers.GithubUrl}</p>
              </div>
              <div class="col-md-6">
                  <p class="center box tempBackground"> GitHub stars: ${answers.GithubUrl}</p>
              </div>
          </div>
  ​
      </div>
      <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  </body>
  </html>`;
}

promptUser()

// .then(function(answers) {
//     const queryUrl = `https://api.github.com/users/${answers.github}/repos?per_page=100`;
  
//     axios
//     .get(queryUrl)
//     .then(function(res) {
//       console.log(res.data);
     
//       const repoNames = res.data.map(repo=>{
//         return repo.name
//       })

//     //   fs.writeFile("repos.txt", repoNames, function(err){
//     //     if (err){
//     //       throw err
//     //     }else{
//     //       console.log(`${repoNames.length} repos exist`);
//     //     }
//     //   })   
//     })
//   })


  .then(function(answers) {

    let name = answers.github;
    console.log(name);
    
    let choice = answers.color;
    console.log(choice);
    
    const html = generateHTML(answers);

    return writeFileAsync("testindex.html", html);
  })

  .then(function() {
    console.log("Successfully wrote to testindex.html");
  })

  .catch(function(err) {
    console.log(err);
  })

