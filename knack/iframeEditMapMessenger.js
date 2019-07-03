(function() {
  var myView = window.viewIdsArray.shift(0);

  // Import jQuery into this file from CDN
  // https://stackoverflow.com/questions/34338411/how-to-import-jquery-using-es6-syntax
  var script = document.createElement("SCRIPT");
  script.src =
    "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
  script.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script);

  // Create polling function for made sure jQuery is loaded and ready...
  var checkReady = function(callback) {
    if (window.jQuery) {
      callback(jQuery);
    } else {
      window.setTimeout(function() {
        checkReady(callback);
      }, 20);
    }
  };

  //   function AutozoomSendMessageToApp(message) {
  //     var iframe = document.getElementById("mapIFrame").contentWindow;
  //     const stringifiedMessage = JSON.stringify(message);
  //     console.log("inside API", stringifiedMessage);
  //     iframe.postMessage(stringifiedMessage, "*");
  //   }

  // Start polling...
  checkReady(function($) {
    var $viewSelector = $(myView);

    // Add React app as iframe if iframe doesn't already exist
    if ($("#mapIFrame").length === 0) {
      $(
        '<iframe src="https://5d1ad828f6d3f10009e4ca54--wonderful-heyrovsky-db4c26.netlify.com/" frameborder="0" scrolling="yes" id="mapIFrame" \
    style="width: 100%;height: 523px;"></iframe>'
      ).appendTo($viewSelector);
    }

    // set up Post Message connection with iframe and parent page
    // var iframe = document.getElementById("mapIFrame").contentWindow;

    // listen for response
    // window.addEventListener("message", function(event) {
    //   console.log("message received:  " + event.data, event);
    //   var data = event.data;
    //   if (data.message === "LAT_LON_FIELDS") {
    //     var $latLonFields = $("#kn-input-field_3300");

    //     $latLonFields.find("#latitude").val(data.lat);
    //     $latLonFields.find("[name='longitude']").val(data.lng);
    //   }
    // });

    function sendMessageToApp(message) {
      var stringifiedMessage = JSON.stringify(message);
      console.log("inside API", stringifiedMessage);
      iframe.postMessage(stringifiedMessage, "*");
    }

    $("#mapIFrame").on("load", function() {
      debugger;
      var urlArray = window.location.href.split("/");
      var recordId = urlArray[urlArray.length - 2];

      var markerMessage = {
        message: "SIGNS_API_REQUEST",
        view: myView.slice(1),
        scene: "scene_1028",
        token: Knack.getUserToken(),
        app_id: Knack.application_id,
        id: recordId
      };

      console.log(markerMessage);

      sendMessageToApp(markerMessage);
    });

    // $(function() {
    // Get the current location from browser.
    // TODO: we might need to wrap this in try/catch check
    // navigator.geolocation.getCurrentPosition(function(position) {
    // create message object for React App
    //   const geolocationMessage = {
    //     message: "KNACK_GEOLOCATION",
    //     lat: position.coords.latitude,
    //     lon: position.coords.longitude
    //   };

    // envoke message once the iframe is loaded
    //   $("#mapIFrame").on("load", function() {
    //     AutozoomSendMessageToApp(geolocationMessage);
    //   });
    // });
  });
})();