module.exports = (app) => {
  const courses = require("../controllers/course.controller.js");
  var router = require("express").Router();

  // Create a new Course
  router.post("/", courses.create);

  // Retrieve all Tutorials
  router.get("/", courses.findAll);

  // Retrieve all published Tutorials
  router.get("/published", courses.findAllPublished);

  // Retrieve a single Course with id
  router.get("/:id", courses.findOne);

  // Update a Course with id
  router.put("/:id", courses.update);

  // Delete a Course with id
  router.delete("/:id", courses.delete);

  // Delete all Tutorials
  router.delete("/", courses.deleteAll);

  app.use("/api/courses", router);
};
