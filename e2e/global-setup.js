const { execFileSync } = require("child_process");

const PORT = 9000;
const URL = `http://localhost:${PORT}/`;

/**
 * `astro preview` daemonizes itself and the foreground process exits
 * immediately, so it cannot be used as Playwright's `webServer.command` — that
 * reports "Process from config.webServer exited early". Astro exposes explicit
 * stop/status subcommands for this daemon, so the server is managed here
 * instead. Using astro preview (rather than a generic static server) keeps the
 * 404 behaviour faithful: it serves dist/404.html with a real 404 status, which
 * is what the Apache `ErrorDocument 404 /404.html` rule does in production.
 */
module.exports = async () => {
  execFileSync("npx", ["astro", "preview", "--port", String(PORT)], {
    stdio: "inherit",
  });

  const deadline = Date.now() + 30_000;
  for (;;) {
    try {
      const response = await fetch(URL);
      if (response.ok) return;
    } catch {
      // Server not up yet.
    }
    if (Date.now() > deadline) {
      throw new Error(`Preview server did not become ready at ${URL}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
};
