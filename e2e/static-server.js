#!/usr/bin/env node
/**
 * Minimal foreground static server for `dist/`, used as Playwright's webServer.
 *
 * `astro preview` cannot fill this role: on macOS it daemonizes and the
 * foreground process exits immediately (Playwright reports "Process from
 * config.webServer exited early"), while on Linux/CI it stays in the
 * foreground. That platform split makes it unusable either way. This server
 * behaves identically everywhere.
 *
 * It mirrors the two production behaviours the e2e suite depends on:
 *   - directory URLs resolve to index.html (build.format: "directory")
 *   - unknown paths serve 404.html with a real 404 status, matching the
 *     Apache `ErrorDocument 404 /404.html` rule in public/.htaccess
 */
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "dist");
const PORT = Number(process.env.PORT || 9000);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

const send = (res, status, body, type) => {
  res.writeHead(status, {
    "content-type": type || "text/plain; charset=utf-8",
    "content-length": Buffer.byteLength(body),
  });
  res.end(body);
};

const notFound = (res) => {
  const page = path.join(ROOT, "404.html");
  if (fs.existsSync(page)) {
    send(res, 404, fs.readFileSync(page), TYPES[".html"]);
  } else {
    send(res, 404, "Not found");
  }
};

http
  .createServer((req, res) => {
    let pathname;
    try {
      ({ pathname } = new URL(req.url, `http://localhost:${PORT}`));
      pathname = decodeURIComponent(pathname);
    } catch {
      return send(res, 400, "Bad request");
    }

    // Refuse to escape the output directory.
    const target = path.join(ROOT, path.normalize(pathname));
    if (target !== ROOT && !target.startsWith(ROOT + path.sep)) {
      return send(res, 403, "Forbidden");
    }

    let file = target;
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      // trailingSlash: "always" — redirect bare directory paths, as Apache does.
      if (!pathname.endsWith("/")) {
        res.writeHead(301, { location: `${pathname}/` });
        return res.end();
      }
      file = path.join(file, "index.html");
    }

    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      return notFound(res);
    }

    send(res, 200, fs.readFileSync(file), TYPES[path.extname(file)]);
  })
  .listen(PORT, () => {
    console.log(`Serving ${ROOT} on http://localhost:${PORT}/`);
  });
