// main javascript file/code
const express = require("express"); // require coomjs way of doing import
const mysql = require("mysql2"); // import mysql2 module/package/library/framework

const server = express(); // creating a http server -- get, post ,patch, put, delete
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tendamema",
  database: "eldohub_library",
});

server.use(express.urlencoded({ extended: true })); /// decode url

server.get("/home", (req, res) => {
  res.send(
    "Request for home recieved -- this is the response for home online -- ",
  );
});
server.get("/dashboard", (req, res) => {
  // get data from db
  dbConnection.query("SELECT * FROM borrowings", function (error, data) {
    if (error) {
      console.log(error);
      res.status(500).send("Databaase error occured");
    } else {
      res.json(data); // api
    }
  });
});

server.get("/book", (req, res) => {
  const isbn = req.query.isbn;
  const user = req.query.user;
  console.log(isbn);
  dbConnection.query(
    `SELECT * from book_details WHERE isbn=${isbn}`,
    (err, bookData) => {
      if (err) {
        return res.send(err);
      }
      console.log(bookData);
      res.render("book.ejs", { bookData }); // html -- ejs templating language
    },
  );
});
// 9781101870334
// create a route for every table in eldohub library -- localhost:3003/books -- data all books - on the browser
// http://localhost:3003/author?id=4 --- all author 4 books

/// start the server -- telling node - access the network ,and waith for incoming http requests
server.listen(3003, () => console.log("server started. running"));
// http://localhost:3003/dashboard
