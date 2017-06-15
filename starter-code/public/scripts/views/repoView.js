'use strict';
var app = app || {};

(function(module) {
  const repoView = {};

  const ui = function() {
    let $about = $('#about');

    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  const render = Handlebars.compile($('#repo-template').text());

  // COMMENTED: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // JOHN SAYS: This function is dynamically creating the user interface. The ui function lives on line 7 of this file and clearcuts the UI so it can be dynamically created. The jQuery object is calling the HTML element(s) that are unordered lists of the HTML element with the ID of "About" and is appending all git repositories with a specific name that is brought about with the render object which is defined in articleView.js line 9. The .with function is defined in repo.js which filters array results based on a method or item we provide to it. .map is a standard javascript method which creates a new array, which is then returned to the repos object.
  repoView.index = function() {
    ui();

    $('#about ul').append(
      app.repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(app);
