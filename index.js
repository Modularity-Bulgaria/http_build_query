const { encodeURIRequest } = require("./encoding");

function http_build_query(json) {
  return encodeURIRequest(json);
}

module.exports = http_build_query;
