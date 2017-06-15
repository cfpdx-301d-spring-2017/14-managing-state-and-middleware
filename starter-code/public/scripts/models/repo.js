'use strict';
var app = app || {};

(function(module) {
  const repos = {};
  repos.all = [];

  // C-OMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // the function requestRepos has a callback parameter called callback. It uses jQuery to get user repos from GitHub. It will either receive data which it adds to repos.all (an Array of Objects), or receive an error message which logs to the console. If successful it will then execute the callback function. This is called within aboutController.js by aboutController.index. The callback given is app.repoView.index which is defined in repoView.js
  repos.requestRepos = function(callback) {
    $.get('/github/user/repos')
    .then(data => repos.all = data, err => console.error(err))
    .then(callback);
  };

  repos.with = attr => repos.all.filter(repo => repo[attr]);

  module.repos = repos;
})(app);
