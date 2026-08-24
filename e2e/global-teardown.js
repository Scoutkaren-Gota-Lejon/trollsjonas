const { execFileSync } = require("child_process");

module.exports = async () => {
  execFileSync("npx", ["astro", "preview", "stop"], { stdio: "inherit" });
};
