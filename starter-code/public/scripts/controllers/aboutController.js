'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // (put your response in a COMMENT here)
  // aboutController.index is a function that uses jQuery to show the #about section and hide its sibling. It then executes requestRepos which is found within repos.js, and sends a parameter of repoView.index which is found within repoView.js which appends to the repo Handlebars template.
  aboutController.index = () => {
    $('#about').show().siblings().hide();
    app.repos.requestRepos(app.repoView.index);
  };

  module.aboutController = aboutController;
})(app);
