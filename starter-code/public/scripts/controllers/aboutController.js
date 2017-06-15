'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};

  // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // This function displays the about section, and hides all its siblings. It then calls on repos.RequestRepos, taking our repoView.index function as an argument. These functions live in repos.js and repoView.js respectively. This function serves as a middleman for the repos.requestRepos function which performs the $.get request for our GitHub API data, and serves the result to our repoView to display it.
  aboutController.index = () => {
    $('#about').show().siblings().hide();
    app.repos.requestRepos(app.repoView.index);
  };

  module.aboutController = aboutController;
})(app);
