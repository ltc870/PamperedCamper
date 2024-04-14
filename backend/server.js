const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const connectDB = require("./database/database");
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/campgrounds", require("./routes/campgroundRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}`));
