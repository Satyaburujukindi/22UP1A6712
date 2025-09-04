const axios = require("axios");

async function Log(stack, level, pkg, message) {
  try {
    const payload = { stack, level, package: pkg, message };

    await axios.post("http://20.244.56.144/test/logs", payload);

    console.log('[LOGGED] ${stack} | ${level} | ${pkg} -> ${message}');
  } catch (error) {
    console.error("Failed to send log:", error.message);
  }
}

module.exports = Log;