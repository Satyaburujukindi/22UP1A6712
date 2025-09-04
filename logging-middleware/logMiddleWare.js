const axios = require("axios");

async function Log(stack, level, pkg, message) {
  try {
    // enforce lowercase & valid values
    const allowedStacks = ["backend", "frontend"];
    const allowedLevels = ["debug", "info", "warn", "error", "fatal"];

    if (!allowedStacks.includes(stack)) throw new Error("Invalid stack");
    if (!allowedLevels.includes(level)) throw new Error("Invalid level");

    const payload = { stack, level, package: pkg, message };

    await axios.post("http://20.244.56.144/evaluation-service/logs", payload);

    console.log('[LOG SENT]', payload);
  } catch (err) {
    console.error("[LOG FAILED]", err.message);
  }
}

module.exports = Log;