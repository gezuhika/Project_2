// import { json } from "sequelize/types";

// Get references to page elements
var $formName = $("#form-data");
var $formDescription = $("#form-description");
var $formDeptAddress = $("#departure");
var $formDestAddress = $("#destination");
var $formDepartTime = $("#departTime");
var $formNumSeats = $("#seats");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $updateBtn = $("#reserve-button");
var formComplete;

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  updateDriver: function (id, seats) {
    return $.ajax({
      url: "/api/examples/" + id,
      type: "PUT",
      data: { numberOfSeats: seats }
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $drivers = data.map(function (driver) {
      var $a = $("<a>")
        .text(driver.driverName)
        .attr("href", "/example/" + driver.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": driver.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($drivers);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var driver = {
    driverName: $formName.val().trim(),
    YMM: $formDescription.val().trim(),
    departAddress: $formDeptAddress.val().trim(),
    destAddress: $formDestAddress.val().trim(),
    departTime: $formDepartTime.val().trim(),
    numSeats: $formNumSeats.val().trim()
  };

  if ((driver.driverName && driver.YMM && driver.numSeats && driver.departAddress && driver.destAddress && driver.departTime)) {
    formComplete = true;
  } else {
    formComplete = false;
  }

  API.saveExample(driver).then(function () {
    refreshExamples();
  });

  // Change Modal Text based on whether form is complete

  if (!formComplete) {
    $("#modal-title")[0].innerHTML = "FORM UNFINISHED!!"
    $("#modalHeading")[0].innerHTML = "You have not completed the form.";
    $("#modalParagraph")[0].innerHTML = "Please fill out the empty fields.";
  } else {
    $formName.val("");
    $formDescription.val("");
    $formDeptAddress.val("");
    $formDestAddress.val("");
    $formDepartTime.val("");
    $formNumSeats.val("");
    $("#modal-title")[0].innerHTML = "Ride Added!!"
    $("#modalHeading")[0].innerHTML = "Your Ride Has Been Added.";
    $("#modalParagraph")[0].innerHTML = "You will recieve an email when you have a rider.";
  }
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

var handleUpdateBtn = function () {
  var seats = $("#seat-picker").val();
  var id = $("#driver-id")[0].innerHTML;
  API.updateDriver(id, seats).then(function () {
    location.reload();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$updateBtn.on("click", handleUpdateBtn);

if ($("#seats").val() === "0"){}


// THIS SECTION IS FOR THE GMAPS AUTOCOMPLETE

var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(37.0070572, -109.0233971),
  new google.maps.LatLng(40.9907122, -102.0740990));



var inputDepart = document.getElementById("departure");
var optionsDepart = {
  bounds: defaultBounds,
  types: ["address"],
  strictBounds: true
};
autocompleteDepart = new google.maps.places.Autocomplete(inputDepart, optionsDepart);

var inputDest = document.getElementById("destination");
var optionsDest = {
  bounds: defaultBounds,
  types: ["establishment", "geocode"],
  strictBounds: true
};
autocompleteDest = new google.maps.places.Autocomplete(inputDest, optionsDest);

// Prevent ENTER key from submitting driver form

$(document).on('keydown', function (e) {
  if (e.keyCode == 13) {
    return false;
  }
});


