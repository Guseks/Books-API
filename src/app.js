const express = require("express");
const cors = require("cors");
const routes = require("./routes.js");

function launchApp(){
  const app = express();
  const port = 3000;
  const hostname = "localhost";

  //MiddleWares
  app.use(express.json());

  app.use(cors());

  app.use('/api', routes);

  // Start the Express.js server
  app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
  });


}

module.exports = {launchApp};