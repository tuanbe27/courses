const Course = require("../models/course.model.js");
// Create and Save a new Course
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Course
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
    imageUrl: req.body.imageUrl,
    rating: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  // Save Course in the database
  Course.create(course, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course.",
      });
    else res.send(data);
  });
};

// Retrieve all Courses from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;
  Course.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses.",
      });
    else res.send(data);
  });
};

// Find a single Course with a id
exports.findOne = (req, res) => {
  Course.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Course with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published Courses
exports.findAllPublished = (req, res) => {
  Course.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses.",
      });
    else res.send(data);
  });
};

// Update a Course identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);
  Course.updateById(req.params.id, new Course(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Course with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
  Course.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Course with id " + req.params.id,
        });
      }
    } else res.send({ message: `Course was deleted successfully!` });
  });
};

// Delete all Courses from the database.
exports.deleteAll = (req, res) => {
  Course.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all courses.",
      });
    else res.send({ message: `All Courses were deleted successfully!` });
  });
};
