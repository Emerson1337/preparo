const express = require("express");

const app = express();

app.use(express.json());

const tokens = [];

app.get("/tokens", (request, response) => {
  return response.json(tokens);
});

app.post("/tokens", (request, response) => {
  tokens.push(request.body);

  return response.json(request.body);
})

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});