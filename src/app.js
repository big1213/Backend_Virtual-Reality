const express = require("express");
const { sequelize } = require("./models");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api", routes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Crypto Exchange API is running" });
});

// Start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

module.exports = app;
