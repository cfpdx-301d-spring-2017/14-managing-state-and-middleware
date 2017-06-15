'use strict';
var app = app || {};

(function(module) {
  function Article(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  Article.all = [];

  // REVIEW: We no longer need our prototype toHtml() method. This functionality has been relocated to the view.
  //         As a result, Article.prototype.toHtml has been deleted.

  // REVIEW: With ES6 arrow functions, if the function only has one parameter, you don't need parentheses.
  //         This is similar to saying Article.loadAll = function(rows).
  // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // This function loads all the rows that are contained in our article display, sorting them by their publish date. It calls a map function, which grabs all the articles and readies them to be displayed.
  Article.loadAll = rows => {
    rows.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)));
    Article.all = rows.map(ele => new Article(ele));
  };

  // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // This is a .get request for our article data. It takes the results of our loadAll function and initiates a callback into our article controller.
  Article.fetchAll = callback => {
    $.get('/articles')
      .then(
        results => {
          Article.loadAll(results);
          callback();
        }
      )
  };

  // REVIEW: We have a new method to query our DB for a specific record, based on varying criteria
  Article.findWhere = function(field, value, callback) {
    $.get('/articles/find', {field: field, val: value})
      .then(callback)
  };

  // REVIEW: A new method for gathering all of the categories
  Article.allCategories = function(callback) {
    $.get('/categories', callback);
  };

  Article.numWordsAll = () => {
    return Article.all.map(article => article.body.match(/\b\w+/g).length)
      .reduce((a, b) => a + b)
  };

  Article.allAuthors = () => {
    return Article.all.map(article => article.author)
      .reduce((names, name) => {
        if (names.indexOf(name) === -1) names.push(name);
        return names;
      }, []);
  };

  // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // This function calculates the number of words that an author has written throughout all their articles. It calls on the allAuthors function (declared above), which maps the articles by author and pushes them into an array of each unique author. numWordsByAuthor then filters through the individual authors and runs the calcualations for the word count throughout the articles that have author names matching the array.
  Article.numWordsByAuthor = () => {
    return Article.allAuthors().map(author => {
      return {
        name: author,
        numWords: Article.all.filter(a => a.author === author)
          .map(a => a.body.match(/\b\w+/g).length)
          .reduce((a, b) => a + b)
      }
    })
  };

  Article.stats = () => {
    return {
      numArticles: Article.all.length,
      numWords: Article.numWordsAll(),
      Authors: Article.allAuthors(),
    }
  };

  // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // This is an ajax call that uses the DELETE method as described in our server.js file to wipe the whole table of articles.
  Article.truncateTable = callback => {
    $.ajax({
      url: '/articles',
      method: 'DELETE',
    })
      .then(console.log)
      .then(callback);
  };

  Article.prototype.insertRecord = function(callback) {
    $.post('/articles', {author: this.author, authorUrl: this.authorUrl, body: this.body, category: this.category, publishedOn: this.publishedOn, title: this.title})
      .then(console.log)
      .then(callback);
  };

  Article.prototype.deleteRecord = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'DELETE'
    })
      .then(console.log)
      .then(callback);
  };

  Article.prototype.updateRecord = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'PUT',
      data: {
        author: this.author,
        authorUrl: this.authorUrl,
        body: this.body,
        category: this.category,
        publishedOn: this.publishedOn,
        title: this.title,
        author_id: this.author_id
      }
    })
      .then(console.log)
      .then(callback);
  };

  module.Article = Article;
})(app);
