const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const paperRouter = require("./routers/paperRouter");
const paperTypeRouter = require("./routers/paperTypeRouter");
const envelopeRouter = require("./routers/envelopeRouter");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(paperRouter);
app.use(paperTypeRouter);
app.use(envelopeRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
