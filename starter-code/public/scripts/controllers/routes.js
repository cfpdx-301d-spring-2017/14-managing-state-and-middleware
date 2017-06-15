'use strict';
var app = app || {};

page('/', app.articleController.loadAll, app.articleController.index);
page('/about', app.aboutController.index);
page('/article/:article_id', app.articleController.loadById, app.articleController.index);

// Redirect home if the default filter option is selected:
page('/category', '/');
page('/author', '/');

page('/author/:authorName', app.articleController.loadByAuthor, app.articleController.index);
page('/category/:categoryName', app.articleController.loadByCategory, app.articleController.index);

// COMMENTED: What is this function doing?
// JOE C. SAYS: All it's doing is calling the function that the page.js library returns. Essentially, it's instantiating the use of the library for us.

// STRETCH COMMENT: There is another way to write this same method. Find it in the documentation and comment what it is here.

page();
