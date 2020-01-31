// ---WHAT NEEDS TO BE DONE---
// where do I put the await?
// let statements to be seen on html

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
var gs = require('github-scraper');
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  inquirer.prompt([
    {
      type: "list",
      name: "color",
      message: "What is your color?",
      choices: ['green', 'blue', 'pink', 'red']

    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
  ])
// .then(function(answers){
//     return choiceColor = answers.color
// })
// .catch(function(err) {
//     console.log(err);
// })

.then(function(answers) {
    const queryUrl = `https://api.github.com/users/${answers.github}`;
  
    axios.get(queryUrl)
    .then(function(result) {
    //    console.log(res.data);
       const userData = {
        githubURL: result.data.html_url,
        githubPic: result.data.avatar_url,
        githubRepos: result.data.public_repos,
        githubFollowers: result.data.followers,
        githubFollowing: result.data.following,
        githubLocation: result.data.location,
        githubBlog: result.data.blog,
        githubName: result.data.name,
        githubBio: result.data.bio,
        githubStars: result.data.stars,
      };
      console.log(userData);
      const html = generateHTML(userData);
      writeFileAsync('autocreated.html', html, 'utf8');
    })
    // .then(function(res, err){
    //     generateHTML(userData)
    //     writeFileAsync("autocreated.html", html);

    // })
})
}

function generateHTML(userData) {
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
                        <h1 class="center">My name is: ${userData.githubName}</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p class="center">Link to location: ${userData.githubLocation}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p class="center"> Link to GitHub Profile: ${userData.githubURL}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p class="center"> Link to blog: ${userData.githubBlog}</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p class="center"> User Bio: ${userData.githubBio}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <p class="center box tempBackground"> Number of Public repositories: ${userData.githubRepos}</p>
                </div>
                <div class="col-md-6">
                    <p class="center box tempBackground"> Followers: ${userData.githubFollowers}</p>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-6">
                    <p class="center box tempBackground"> following: ${userData.githubFollowing}</p>
                </div>
                <div class="col-md-6">
                    <p class="center box tempBackground"> GitHub stars: ${userData.githubStars}</p>
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


// .then(function(res) {
//     const html = generateHTML(res.data.bio);
//     console.log(bio);
//     console.log(login);
//     console.log(followers);
//     console.log(name);
//     console.log(location);
//     console.log(following);
//     console.log(repo);

//     return writeFileAsync("index.html", html);
// })
// .catch(function(err) {
//     console.log(err);
// })

// .then(function() {
// console.log("Successfully wrote to index.html");
// })

// .catch(function(err) {
// console.log(err);
// })

// .then(function(){
//  console.log(choiceColor);
// })

// .catch(function(err) {
// console.log(err);
// })
promptUser()
