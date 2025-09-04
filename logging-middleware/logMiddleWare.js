const axios = require("axios");

const allowedStacks = ["backend", "frontend"];
const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
const allowedPackages = {
  backend: ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"],
  frontend: ["api", "component", "hook", "page", "state", "style"],
  both: ["auth", "config", "middleware", "utils"]
};

async function Log(stack, level, pkg, message) {
  try {
    // Validate stack
    if (!allowedStacks.includes(stack)) {
      throw new Error('Invalid stack: ${stack}');
    }

    // Validate level
    if (!allowedLevels.includes(level)) {
      throw new Error('Invalid level: ${level}');
    }

    // Validate package
    const validPkgs = [...allowedPackages.both, ...allowedPackages[stack]];
    if (!validPkgs.includes(pkg)) {
      throw new Error('Invalid package: ${pkg} for stack: ${stack}');
    }

    const payload = { stack, level, package: pkg, message };

    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      payload
    );

    console.log("[LOG SUCCESS]", response.data);
  } catch (err) {
    console.error("[LOG ERROR]", err.message);
  }
}

module.exports = Log;