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

// C-OMMENT: What is this function doing?
// This makes our page.js route listeners defined above start listening, so when someone lands on those paths, the callbacks start running one after the other finishes.
// STRETCH C-OMMENT: There is another way to write this same method. Find it in the documentation and comment what it is here.
// You can also use page.start(); We included it below, commented out.
page();
// page.start();
