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

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // repoView.index runs ui, which is defined above and takes the #about section in index.html, empties whatever is in the ul currently, and shows that section while hiding its sibling section. Then it grabs the ul that is in that #about section and appends new repo objects that are made from app.repos that have been filtered by ones that have a name (which is all, so there's no difference here between app.repos and repos.all), and creates a new array of those objects that have gone through our handelbars compile method above. It calls ui, append, map, and with (which was defined in repo.js), and render, defined above.
  repoView.index = function() {
    ui();

    $('#about ul').append(
      app.repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(app);
