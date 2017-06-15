'use strict';
var app = app || {};

(function(module) {
  const adminView = {
    initAdminPage : () => {
      let template = Handlebars.compile($('#author-template').text());
        // C-OMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
        // This function takes the numWordsByAuthor array of author objects and applies forEach to it, with the function applied taking each object and applying the handlebars template to it, and appending them to the list with the author-stats class in admin.html. It also fills in the number of total articles in the blog-stats .articles from the Article.all array and the total number of words from all articles in the blog-stats .words table cells in admin.html.
        // This calls numWordsByAuthor to get its returned array (it is in article.js), the text method, numWordsAll (to get the number returned by that method), forEach, append, and the template function from our handlebars compiler.
      app.Article.numWordsByAuthor().forEach(stat => $('.author-stats').append(template(stat)));
      $('#blog-stats .articles').text(app.Article.all.length);
      $('#blog-stats .words').text(app.Article.numWordsAll());
    }
  };

  app.Article.fetchAll(adminView.initAdminPage);
  module.adminView = adminView;
})(app);
