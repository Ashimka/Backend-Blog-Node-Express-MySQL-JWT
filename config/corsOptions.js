const allowedOrigins = require("./allowedOrigins.js");

const corsOptions = {
  origin: allowedOrigins,
};

module.exports = corsOptions;
