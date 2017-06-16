'use strict';
var app = app || {};

(function (module) {
  function Article(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  Article.all = [];

  // REVIEW: We no longer need our prototype toHtml() method. This functionality has been relocated to the view.
  //         As a result, Article.prototype.toHtml has been deleted.

  // REVIEW: With ES6 arrow functions, if the function only has one parameter, you don't need parentheses.
  //         This is similar to saying Article.loadAll = function(rows).
  //DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // Article.loadAll is called by Article.fetchall. It receives an array of objects from fetchAll as its 'rows' paramater. It then sorts the 'rows' array based on each object's publishedOn property (which it uses to create new Date objects set to the original object's publishedOn date property). It then uses the map method on the now sorted rows array to create a new array of Article objects and sets the Article.all array = to this new array.
  Article.loadAll = rows => {
    rows.sort((a, b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)));
    Article.all = rows.map(ele => new Article(ele));
  };

  // DONE: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // Article.fetchAll is called from the articleController.js file and the adminView.js file. Article.fetchAll calls $.get('/articles'), which executes a postgresql query that returns all articles from the database (along with an inner join on related author names and urls). The query results are pased back as the 'results' parameter of the '.then' anonymous function, which subsequently calls Article.loadAll and passes the query results to its own 'results' parameter. Once loadAll sorting and creating articles in the 'rows' array, fetchAll executes the callback function passed to it by the originating js files.
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
  Article.findWhere = function (field, value, callback) {
    $.get('/articles/find', { field: field, val: value })
      .then(callback)
  };

  // REVIEW: A new method for gathering all of the categories
  Article.allCategories = function (callback) {
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
  // The numWordsByAuthor function calculates the number of words each author has created (across all related articles). It uses the filter method on the Article.all array of articles to select total articles for each author, then uses the map method to create a new array along with the match method to remove spaces from each article before using reduce to calculate the total number of characters for the article (and add it to the acumulated total). This function is called by the initAdminPage.

  Article.numWordsByAuthor = () => {
    return Article.allAuthors().map(author => {
      return {
        name: author,
        numWords: Article.all.filter(a => a.author === author).map(a => a.body.match(/\b\w+/g).length).reduce((a, b) => a + b)
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

  // The Article.truncateTable function calls the app.delete('/articles') function in the server.js file, which removes all rows from the articles table in the kilovolt database. It then runs the console.log method, then the callback function that was passed to it from the calling function.
    
  Article.truncateTable = callback => {
    $.ajax({
      url: '/articles',
      method: 'DELETE',
    })
      .then(console.log)
      .then(callback);
  };

  Article.prototype.insertRecord = function (callback) {
    $.post('/articles', { author: this.author, authorUrl: this.authorUrl, body: this.body, category: this.category, publishedOn: this.publishedOn, title: this.title })
      .then(console.log)
      .then(callback);
  };

  Article.prototype.deleteRecord = function (callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'DELETE'
    })
      .then(console.log)
      .then(callback);
  };

  Article.prototype.updateRecord = function (callback) {
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
