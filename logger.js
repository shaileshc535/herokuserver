const fs = require("fs");
const path = require("path");

const logging = {};
logging.log = function (methodName, errMsg) {
  const date = new Date().toString();
  const data = "\n=> Error in " + methodName + " >>> " + errMsg + " at " + date;
  const milliseconds =
    new Date().getDate() +
    "-" +
    parseInt(new Date().getMonth() + 1) +
    "-" +
    new Date().getFullYear();
  const jsonPath = path.join(__dirname, "logs/");
  fs.appendFile(jsonPath + milliseconds.toString(), data, function (err) {
    // if (err) throw err;
    console.log("Updated!");
  });
};
module.exports = logging;
