const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.static("dist"));

app.use(express.json());
app.use(cors());

let data = [
  {
    name: "Arto Hellas",
    number: "888",
    id: 1,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "gg",
    number: "66",
    id: 4,
  },
  {
    name: "gwegweg",
    number: "15351",
    id: 5,
  },
  {
    name: "jj",
    number: "55",
    id: 6,
  },
  {
    name: "rf32r32",
    number: "r32",
    id: 7,
  },
  {
    name: "g",
    number: "g",
    id: 8,
  },
];

app.get("/persons", (req, res) => {
  res.json(data);
});
app.post("/persons", (req, res) => {
  const maxId = data.length > 0 ? Math.max(...data.map((n) => n.id)) : 0;
  const body = req.body;
  const newPerson = {
    name: body.name,
    number: body.number,
    id: maxId + 1,
  };
  data = data.concat(newPerson);
  res.json(newPerson);
});
app.delete("/persons/:id", (req, res) => {
  const personId = Number(req.params.id);
  data = data.filter((person) => person.id !== personId);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
