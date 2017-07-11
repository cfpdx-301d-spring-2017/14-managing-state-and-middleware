'use strict';
var app = app || {};

(function(module) {
  const adminView = {
    initAdminPage : () => {
      let template = Handlebars.compile($('#author-template').text());
        // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
        //We are calling app.Article.numWordsByAuthor, which returns an object of the author's name and total number of words. This function is running a forEach function that takes the stats of the author and appends them to the template. It takes the stats of the authors and adds them to the Article.all array. It calls app.Article.numWordsAll which will return the total number of words in all of the articles and add this to the #blog-stats .words section.
      app.Article.numWordsByAuthor().forEach(stat => $('.author-stats').append(template(stat)));
      $('#blog-stats .articles').text(app.Article.all.length);
      $('#blog-stats .words').text(app.Article.numWordsAll());
    }
  };

  app.Article.fetchAll(adminView.initAdminPage);
  module.adminView = adminView;
})(app);
