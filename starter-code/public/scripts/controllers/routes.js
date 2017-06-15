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
// This comment is part of our pages.js node package, and it basically sets up our routes in the SPA. It creates the URL path and gives instructions to your current page on what to load to it by taking in the relevant index/loadAll/etc. functions as callbacks. The last two definitions, the authorName and categoryName page functions, take input from the selected filters to create their paths. Whereas the above page functions specify paths and actions, the page() below acts as a sort of init function for pages.js.
// STRETCH COMMENT: There is another way to write this same method. Find it in the documentation and comment what it is here.
page();
