'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy'); // REVIEW: We've added a new package here to our requirements, as well as in the package.json
const PORT = process.env.PORT || 3000;
const app = express();
// const conString = 'postgres://USERNAME:PASSWORD@HOST:PORT';
const conString = 'postgres://@localhost:5432/kilovolt'; // TODO: Don't forget to set your own conString
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));


// DONE: What is this function doing? Why do we need it? Where does it receive a request from?
// (put your response in a DONE here)

// The proxyGitHub function is passing its request and response parameters (objects) to the requestProxy function. The requestProxy function creates a new object with two properties. The first is the 'url' property, which is a concatenated string comprised of a static string and the value of the request.params[0] property (i.e. '/users/repos'). The latter is appended to the end of the static string to complete the full url string. The second property is 'headers', which is actually another object with an Authorization property. This Authorization property is also a concatenated string comprised of a static string and the value of the GITHUB_TOKEN env variable in our .env file (accessed through the process object). These two properties are then passed back to higher-order app.get('github/*) function and used as its request parameter to provide the proper api endpoint and the token for authentication with GitHub. The app.get('github/*) response from GitHub, which is an array of repo objects, is then passed back to the originating requestRepos function as the 'data' parameter of the anonymous funtion (line 12 of repos.js file) called by the first .then method. 
 

function proxyGitHub(request, response) {
  console.log('Routing GitHub request for', request.params[0]);
  (requestProxy({
    url: `https://api.github.com/${request.params[0]}`,
    headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
  }))(request, response);
}


// DONE: What is this route doing? Where does it receive a request from?
// (put your response in a DONE here)

// It would handle a request for the /new route in route.js if that route existed (which it doesn't). If the route did exist, when called it would pass app.get('/new') the related request and response objects to the response.sendFile method, which would return the 'new.html' file located in the '/public' directory.

app.get('/new', (request, response) => response.sendFile('new.html', { root: './public' }));
app.get('/admin', (request, response) => response.sendFile('admin.html', { root: './public' }));
app.get('/github/*', proxyGitHub);

// REVIEW: This is a new route to find a specific instance of an article record from the DB.
app.get('/articles/find', (request, response) => {
  let sql = `SELECT * FROM articles
            INNER JOIN authors
            ON articles.author_id=authors.author_id
            WHERE ${request.query.field}=$1`

  client.query(sql, [request.query.val])
    .then(result => response.send(result.rows))
    .catch(console.error);
})

// REVIEW: This is a new route for gathering all of the unique categories from our articles table
app.get('/categories', (request, response) => {
  client.query(`SELECT DISTINCT category FROM articles;`)
    .then(result => response.send(result.rows))
    .catch(console.error);
})

app.get('/articles', (request, response) => {
  client.query(`
    SELECT * FROM articles
    INNER JOIN authors
      ON articles.author_id=authors.author_id;`
  )
    .then(result => response.send(result.rows))
    .catch(console.error);
});

app.post('/articles', function (request, response) {
  client.query(
    'INSERT INTO authors(author, "authorUrl") VALUES($1, $2) ON CONFLICT DO NOTHING',
    [request.body.author, request.body.authorUrl],
    function (err) {
      if (err) console.error(err)
      queryTwo()
    }
  )

  function queryTwo() {
    client.query(
      `SELECT author_id FROM authors WHERE author=$1`,
      [request.body.author],
      function (err, result) {
        if (err) console.error(err)
        queryThree(result.rows[0].author_id)
      }
    )
  }

  function queryThree(author_id) {
    client.query(
      `INSERT INTO
      articles(author_id, title, category, "publishedOn", body)
      VALUES ($1, $2, $3, $4, $5);`,
      [
        author_id,
        request.body.title,
        request.body.category,
        request.body.publishedOn,
        request.body.body
      ],
      function (err) {
        if (err) console.error(err);
        response.send('insert complete');
      }
    );
  }
});


// DONE: What is this route doing? Where does it receive a request from?
// (put your response in a DONE here)

// This function is called from Article.prototype.updateRecord method located in the article.js file. This function updates the related author record (based on request.body.author_id) in the authors table and then updates the related article record in articles table (based on request.params.id). If successful, it then sends back a 'Update complete' response. If not successful, it uses the .catch metho to log a console error message.

app.put('/articles/:id', (request, response) => {
  client.query(`
    UPDATE authors
    SET author=$1, "authorUrl"=$2
    WHERE author_id=$3
    `,
    [request.body.author, request.body.authorUrl, request.body.author_id]
  )
    .then(() => {
      client.query(`
      UPDATE articles
      SET author_id=$1, title=$2, category=$3, "publishedOn"=$4, body=$5
      WHERE article_id=$6
      `,
        [
          request.body.author_id,
          request.body.title,
          request.body.category,
          request.body.publishedOn,
          request.body.body,
          request.params.id
        ]
      )
    })
    .then(() => response.send('Update complete'))
    .catch(console.error);
});

app.delete('/articles/:id', (request, response) => {
  client.query(
    `DELETE FROM articles WHERE article_id=$1;`,
    [request.params.id]
  )
    .then(() => response.send('Delete complete'))
    .catch(console.error);
});

app.delete('/articles', (request, response) => {
  client.query('DELETE FROM articles')
    .then(() => response.send('Delete complete'))
    .catch(console.error);
});

app.get('*', (request, response) => response.sendFile('index.html', { root: './public' }));

loadDB();

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));


//////// ** DATABASE LOADERS ** ////////
////////////////////////////////////////
function loadAuthors() {
  fs.readFile('./public/data/hackerIpsum.json', (err, fd) => {
    JSON.parse(fd.toString()).forEach(ele => {
      client.query(
        'INSERT INTO authors(author, "authorUrl") VALUES($1, $2) ON CONFLICT DO NOTHING',
        [ele.author, ele.authorUrl]
      )
        .catch(console.error);
    })
  })
}

function loadArticles() {
  client.query('SELECT COUNT(*) FROM articles')
    .then(result => {
      if (!parseInt(result.rows[0].count)) {
        fs.readFile('./public/data/hackerIpsum.json', (err, fd) => {
          JSON.parse(fd.toString()).forEach(ele => {
            client.query(`
            INSERT INTO
            articles(author_id, title, category, "publishedOn", body)
            SELECT author_id, $1, $2, $3, $4
            FROM authors
            WHERE author=$5;
          `,
              [ele.title, ele.category, ele.publishedOn, ele.body, ele.author]
            )
              .catch(console.error);
          })
        })
      }
    })
}

function loadDB() {
  client.query(`
    CREATE TABLE IF NOT EXISTS
    authors (
      author_id SERIAL PRIMARY KEY,
      author VARCHAR(255) UNIQUE NOT NULL,
      "authorUrl" VARCHAR (255)
    );`
  )
    .then(loadAuthors)
    .catch(console.error);

  client.query(`
    CREATE TABLE IF NOT EXISTS
    articles (
      article_id SERIAL PRIMARY KEY,
      author_id INTEGER NOT NULL REFERENCES authors(author_id),
      title VARCHAR(255) NOT NULL,
      category VARCHAR(20),
      "publishedOn" DATE,
      body TEXT NOT NULL
    );`
  )
    .then(loadArticles)
    .catch(console.error);
}
