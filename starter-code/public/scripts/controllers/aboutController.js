'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};

  // COMMENTED: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // (JOE C. SAYS: aboutController.index is showing the HTML element ID'd as "about" and hides it's siblings. Then, the function calls app.repos.requestRepos and passes app.repoView.index as a parameter/callback function. requestRepos lives in repo.js and repoview.index lives in repoView.js)
  aboutController.index = () => {
    $('#about').show().siblings().hide();
    app.repos.requestRepos(app.repoView.index);
  };

  module.aboutController = aboutController;
})(app);
