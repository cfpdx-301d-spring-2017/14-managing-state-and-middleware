'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};

  // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // (aboutController.index is showing the section #about while hiding its siblings. It calls requestRepos which has a callback funciton of (app.repoView.index). aboutController.index is called in ('/about') route in routes.js. (app.requestRepos) is located in repo.js and (app.repoView.index is in repoView.js.)
  aboutController.index = () => {
    $('#about').show().siblings().hide();
    app.repos.requestRepos(app.repoView.index);
  };

  module.aboutController = aboutController;
})(app);
