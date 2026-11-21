import http from "node:http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/api/hello") {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: "Hello from Node.js Backend!",
      status: "success"
    }));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Backend running on port 3000");
});