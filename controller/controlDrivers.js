/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var express = require("express");
var router = express.Router();

var db = require("../models");

router.get("/", function (req, res) {
        res.render("index", {
            msg: "Welcome to ShredShare!",
        });
});

// Load drivers.handlebars
router.get("/drivers" , function(req, res){
    res.render("../views/drivers/driverInput.handlebars", {
    });
});

router.get("/passengers" , function(req, res){
        db.Example.findAll({}).then(function (dbExamples) {
            res.render("../views/passengers/passSearch.handlebars", {
                msg: "Welcome to ShredShare!",
                examples: dbExamples
            });
    });
});

// Load example page and pass in an example by id
router.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbResponse) {
        res.render("example", {
            driver: dbResponse
        });
    });
});

// Get all examples
router.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
        res.json(dbExamples);
    });
});

// Create a new example
router.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
        res.json(dbExample);
    });
});

//  UPDATE DATABASE
router.put("/api/examples/:id", function(req, res) {
    db.Example.findOne({where: {id: req.params.id}})
        .then(function(driver) {
            if(parseInt(req.body.numberOfSeats) > driver.numSeats) {
                throw new Error("Cannot book more seats than are available");
            } else {
                var availableSeats = driver.numSeats - parseInt(req.body.numberOfSeats);
                return db.Example.update({numSeats: availableSeats}, {where: {id: req.params.id}});
            }
        })
        .then(function(driver) {
            res.json(driver);
        });
});
// Delete an example by id
router.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
        res.json(dbExample);
    });
});

// Render 404 page for any unmatched routes
router.get("*", function (req, res) {
    res.render("404");
});

module.exports = router;
