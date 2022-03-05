const sql = require("../config/db.config").connection;

// constructor
const Course = function (course) {
  this.title = course.title;
  this.description = course.description;
  this.published = course.published;
  this.imageUrl = course.imageUrl;
  this.createdAt = course.createdAt;
  this.updatedAt = course.updatedAt;
  this.rating = course.rating;
};

Course.create = (newCourse, result) => {
  sql.query("INSERT INTO courses SET ?", newCourse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created course: ", { id: res.insertId, ...newCourse });
    result(null, { id: res.insertId, ...newCourse });
  });
};

Course.findById = (id, result) => {
  sql.query(`SELECT * FROM courses WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found course: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Course with the id
    result({ kind: "not_found" }, null);
  });
};

Course.getAll = (title, result) => {
  let query = "SELECT * FROM courses";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("courses: ", res);
    result(null, res);
  });
};

Course.getAllPublished = (result) => {
  sql.query("SELECT * FROM courses WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("courses: ", res);
    result(null, res);
  });
};

Course.updateById = (id, course, result) => {
  sql.query(
    "UPDATE courses SET title = ?, description = ?, published = ?, imageUrl = ?, updatedAt = ? WHERE id = ?",
    [
      course.title,
      course.description,
      course.published,
      course.imageUrl,
      new Date(),
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Course with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated course: ", { id: id, ...course });
      result(null, { id: id, ...course });
    }
  );
};

Course.remove = (id, result) => {
  sql.query("DELETE FROM courses WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Course with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted course with id: ", id);
    result(null, res);
  });
};

Course.removeAll = (result) => {
  sql.query("DELETE FROM courses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} courses`);
    result(null, res);
  });
};

module.exports = Course;
