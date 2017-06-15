'use strict';
var app = app || {};

(function(module) {
  const repos = {};
  repos.all = [];

  // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // This function requests the repo data from GitHub. It's called in the aboutController, using the repoView as its argument. This is the model portion in the MVC workflow for populating our about section with our repo information.
  repos.requestRepos = function(callback) {
    $.get('/github/user/repos')
      .then(data => repos.all = data, err => console.error(err))
      .then(callback);
  };

  repos.with = attr => repos.all.filter(repo => repo[attr]);

  module.repos = repos;
})(app);
