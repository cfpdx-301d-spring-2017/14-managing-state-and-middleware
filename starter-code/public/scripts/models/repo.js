'use strict';
var app = app || {};

(function(module) {
  const repos = {};
  repos.all = [];

  // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // The repos.requestRepo function does the following: 1) Calls the $.get('/github/user/repos') handler function, which calls the app.get('/github/*', proxyGitHub) function in the server.js file. This calls the proxyGitHub function also in the server.js file. The proxyGitHub function forms the proper GitHub API request and returns an array of repo objects as the response, which is passed back as the 'data' paramater for the anonymous function that is called by the .then method on line 12 of the requestRepos function.
  repos.requestRepos = function(callback) {
    $.get('/github/user/repos')
    .then(data => repos.all = data, err => console.error(err))
    .then(callback);
  };

  repos.with = attr => repos.all.filter(repo => repo[attr]);

  module.repos = repos;
})(app);
