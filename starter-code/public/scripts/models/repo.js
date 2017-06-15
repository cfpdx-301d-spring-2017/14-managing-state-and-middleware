'use strict';
var app = app || {};

(function(module) {
  const repos = {};
  repos.all = [];

  // COMMENTED: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // JOE C. SAYS: requestRepos is a function sending an ajax .get request to the user/repos endpoint, where it then sending the recieved data to the repos.all array as defined in line 6 and fires a callback function. This function is called by app.aboutController.index. This function calls another call as a callback, but that is not hard-coded into this code block.
  repos.requestRepos = function(callback) {
    $.get('/github/user/repos')
    .then(data => repos.all = data, err => console.error(err))
    .then(callback);
  };

  repos.with = attr => repos.all.filter(repo => repo[attr]);

  module.repos = repos;
})(app);
