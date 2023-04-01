/*
Student Name : Manal Magdy Eid Khalil
Student ID : B1901825
*/
module.exports = app => {
  const departments = require("../controllers/department.controller.js");
/*
HERE I used Express Router which provides  with a way to modularize routes and apply middleware functions to them.
 By using a router instead of a full express application, making it easier to manage and optimize the performance of the  application.
*/
  var router = require("express").Router();

  // so the request goes into middleware stack and when it hits this  next line of code , it'll match the url and 2 middlware routers will run
  app.use("/api/departments", router); // this process called mounting routers



  /*
  So basically here the / or the root directory refers to url we defined already in router variable
  */
 // Create a new department
  router.post("/", departments.create);

  // Retrieve all Departments
  router.get("/", departments.findAll);

  // Retrieve a single Department with id
  router.get("/:id", departments.findOne);// api/department/:id

  // Add admin to department
  router.post("/:id/employee", departments.addEmployee); //api/department/:id/employee

  // Update a Department with id
  router.put("/:id", departments.update);

  // Delete a Department with id
  router.delete("/:id", departments.delete);

  // Delete a all departments
  router.delete("/", departments.deleteAll);


};


