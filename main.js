// main javascript file/code
const express = require("express"); // require coomjs way of doing import

const server = express(); // creating a http server -- get, post ,patch, put, delete
server.get("/home", (req, res) => {
  res.send(
    "Request for home recieved -- this is the response for home online -- ",
  );
});

server.get("/dashboard", (req, res) => {
  // get data from db
  res.json({
    message: "responging to dashboard request --- from the internet",
    data: [23, 34, 434, 45, 54, 54, 64, 65],
  });
});
/// start the server -- telling node - access the network ,and waith for incoming http requests
server.listen(3003, () => console.log("server started. running"));
// http://localhost:3003/dashboard
