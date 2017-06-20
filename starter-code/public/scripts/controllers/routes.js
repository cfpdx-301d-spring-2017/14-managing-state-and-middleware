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

// DONE: What is this function doing?
// This function is part of the page.js module. It is executed when the routes.js file is loaded. The page() function must be executed to instantiate/load the page object, which is required for any explicit page listening routes to work. Effectively, calling page() 'starts' the page module. The other way to write this same method is to use page.start;.

// STRETCH DONE: There is another way to write this same method. Find it in the documentation and DONE what it is here.
// page.start([options]);
page();
