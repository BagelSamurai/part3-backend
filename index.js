require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.static("dist"));

const Entry = require("./models/Entry");
app.use(express.json());
app.use(cors());
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);
app.get("/persons", (req, res) => {
  Entry.find({}).then((notes) => {
    res.json(notes);
  });
});
app.get("/persons/:id", (req, res) => {
  Entry.findById(req.params.id).then((entry) => {
    res.json(entry);
  });
});
app.post("/persons", (req, res, next) => {
  const body = req.body;

  const newPerson = new Entry({
    name: body.name,
    number: body.number,
  });
  newPerson
    .save()
    .then((savedEntry) => {
      res.json(savedEntry);
    })
    .catch((error) => next(error));
});
app.delete("/persons/:id", (req, res, next) => {
  Entry.findByIdAndDelete(req.params.id)
    .then((deletedEntry) => {
      if (deletedEntry) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Entry not found" });
      }
    })
    .catch((error) => next(error));
});
app.put("/persons/:id", (req, res, next) => {
  const body = req.body;

  const entry = {
    name: body.name,
    number: body.number,
  };

  Entry.findByIdAndUpdate(req.params.id, entry, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
