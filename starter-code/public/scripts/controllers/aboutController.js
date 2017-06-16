'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};

  // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // (put your response in a DONE here)

  //This function calls the show() method to display the #about id section in the DOM, then hides all other sections using the chained .siblings().hide() methods. It then calls the app.repos.requestRepos function and passes it the app.repoView.index as the callback function. The aboutController.index function is called from the page '/about' listener in the routes.js file.

  aboutController.index = () => {
    $('#about').show().siblings().hide();
    app.repos.requestRepos(app.repoView.index);
  };

  module.aboutController = aboutController;
})(app);
