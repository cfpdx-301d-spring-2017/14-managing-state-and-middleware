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

  // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // This function is part of an IIFE which is called on load of index.html. It first calls the ui function, which is declared above and selects our about section, empties the ul elements, and shows only the about section.  Next it uses the previously declared render function which compiles our repo-template, finds all of the repos with the name property and appends them to the about ul
  repoView.index = function() {
    ui();

    $('#about ul').append(
      app.repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(app);
