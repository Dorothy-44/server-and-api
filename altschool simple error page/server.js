const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// Function to load and display files
function loadPage(file, res, type, code = 200) {
    fs.readFile(path.join(__dirname, file), (err, data) => {
        if (err) {
            console.error("Error reading file:", file);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Server error. Try again later.");
        } else {
            res.writeHead(code, { "Content-Type": type });
            res.end(data);
        }
    });
}

const server = http.createServer((req, res) => {
    const page = req.url.split("/")[1];
    console.log("Request received for:", req.url);

    if (page === "" || page === "index.html") {
        loadPage("index.html", res, "text/html");
    } else if (page === "style.css") {
        loadPage("style.css", res, "text/css");
    } else if (page.endsWith(".html")) {
        loadPage("404.html", res, "text/html", 404);
    } else {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Invalid request format. Please use .html files.");
    }
});

server.listen(PORT, () => {
    console.log(`✅ Server started on http://localhost:${PORT}`);
});
