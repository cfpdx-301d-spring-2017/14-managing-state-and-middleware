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

  // The repoView.index function does the following: 1) Calls the ui() function, which sets the $about variable equal to the #about id in the DOM, then finds the 'ul' in the DOM and clears its list items, then it runs the show() method on the #about id in the DOM, then it hides all sibling DOM elements, 2) returns all repos with a 'name' property (which would be all repos), then each repo object is passed to the map() function, which runs the render() function on each repo object, which creates a new array of HTML list items which are then appended to the 'ul'.
  repoView.index = function() {
    ui();

    $('#about ul').append(
      app.repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(app);
