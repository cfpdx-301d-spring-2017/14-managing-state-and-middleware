'use strict';
var app = app || {};

(function(module) {
  const newArticle = {};

  // COMMENTED: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // JOE C. SAYS: This function is using jQuery to grab all the HTML elements with the class of 'tab-content' and show them on the page. It is grabbing he HTML ID of export-field and hiding it. It is then placing an event listener with an ID of article-json and listens on the 'focus' user action and selects the thing that gets focused on. It is then creating a pair of event listeners with the ID of new-form. One acts on change, which performs newArticle.create and another ('submit') which calls newArticle.submit. They are event handlers and live in this same file.
  newArticle.initNewArticlePage = function() {
    $('.tab-content').show();
    $('#export-field').hide();
    $('#article-json').on('focus', function() {
      $(this).select();
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
