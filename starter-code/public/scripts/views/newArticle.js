'use strict';
var app = app || {};

(function(module) {
  const newArticle = {};

  // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // The initNewArticlePage does the following: 1) runs the show() method on the .tab-content class in the DOM, 2) hides the export-field id in the DOM, 3) adds an event listener for the focus event on the article-json id in the DOM with an event handler of $(this).select(). There is no article-json id on any html page, so the event listener/handler will never be executed. Likewise, the initNewArticlePage function will never be called because the only html page with the newArticle.js script reference is the new.html page, which is not exposed in the nav.
  newArticle.initNewArticlePage = function() {
    $('.tab-content').show();
    $('#export-field').hide();
    $('#article-json').on('focus', function() {
      $(this).select();
      console.log('this.select value = ' + $(this));
    });
    $('#new-form').on('change', newArticle.create);
    $('#new-form').on('submit', newArticle.submit);
  };

  newArticle.create = function() {
    $('#articles').empty();
    let formArticle = new app.Article({
      title: $('#article-title').val(),
      author: $('#article-author').val(),
      authorUrl: $('#article-author-url').val(),
      category: $('#article-category').val(),
      body: $('#article-body').val(),
      publishedOn: new Date().toISOString()
    });

    formArticle.render = function() {
      let template = Handlebars.compile($('#article-template').text());

      this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
      this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
      this.body = marked(this.body);

      return template(this);
    };

    $('#articles').append(formArticle.render('#article-template'));
    $('pre code').each((i, block) => hljs.highlightBlock(block));
  };

  newArticle.submit = function(event) {
    event.preventDefault();
    let article = new app.Article({
      title: $('#article-title').val(),
      author: $('#article-author').val(),
      authorUrl: $('#article-author-url').val(),
      category: $('#article-category').val(),
      body: $('#article-body').val(),
      publishedOn: new Date().toISOString()
    });

    article.insertRecord();
    window.location = '../';
  };

  newArticle.initNewArticlePage();
  module.newArticle = newArticle;
})(app);
