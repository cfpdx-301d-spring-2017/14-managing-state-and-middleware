'use strict';
var app = app || {};

(function(module) {
  const adminView = {
    initAdminPage : () => {
      let template = Handlebars.compile($('#author-template').text());
        // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
        // JOE C. SAYS: This function is calling app.Article.numWordsAll which is creating an array and then running a forEach loop on that array. The .forEach loop is referring to each item within it as a 'stat', and is using jQuery to append some html via Handlebars.js; Handlebars is parsing that text into HTML and writing it to the DOM. It calls numWordsByAuthor (via articleView.js) and the Handlebars template is in articleView.js
      app.Article.numWordsByAuthor().forEach(stat => $('.author-stats').append(template(stat)));
      $('#blog-stats .articles').text(app.Article.all.length);
      $('#blog-stats .words').text(app.Article.numWordsAll());
    }
  };

  app.Article.fetchAll(adminView.initAdminPage);
  module.adminView = adminView;
})(app);
