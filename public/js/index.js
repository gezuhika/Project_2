// Get references to page elements
var $formName = $("#form-data");
var $formDescription = $("#form-description");
var $formDeptAddress = $("#departure");
var $formDestAddress = $("#destination");
var $formDepartTime = $("#departTime");
var $formNumSeats = $("#seats");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $drivers = data.map(function(driver) {
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
var handleFormSubmit = function(event) {
  event.preventDefault();

  var driver = {
    driverName: $formName.val().trim(),
    YMM: $formDescription.val().trim(),
    departAddress: $formDeptAddress.val().trim(),
    destAddress: $formDestAddress.val().trim(),
    departTime: $formDepartTime.val().trim(),
    numSeats: $formNumSeats.val().trim()
  };

  if (!(driver.driverName && driver.YMM && driver.numSeats)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(driver).then(function() {
    refreshExamples();
  });

  $formName.val("");
  $formDescription.val("");
  $formDeptAddress.val("");
  $formDestAddress.val("");
  $formDepartTime.val("");
  $formNumSeats.val("");

};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
