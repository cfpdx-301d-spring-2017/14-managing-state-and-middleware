'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};

  // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // (put your response in a comment here)

  //This function shows the about id section in the DOM, and hides its siblings. It then calls the app.repos.requestRepos function and passes it the app.repoView.index as a callback function. It's called from routes.js, the page listener '/about'.

  aboutController.index = () => {
    $('#about').show().siblings().hide();
    app.repos.requestRepos(app.repoView.index);
  };

  module.aboutController = aboutController;
})(app);
