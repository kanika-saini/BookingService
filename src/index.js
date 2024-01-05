const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiRoutes = require("./routes/index");
const db = require("./models/index");
const { PORT } = require("./config/serverConfig");
const setUpAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, () => {
    console.log("Server startedb at port", PORT);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};
setUpAndStartServer();
