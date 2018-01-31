function sendData(){
    // Get input values into variables
    nameInput 		= 	$('#name').val();
    emailInput = 	$('#email').val();

    d = new Date(); // for now
    nowmonthnumber = d.getMonth() +1;
    currenttime = ""+ d.getFullYear() + "-"+pad(nowmonthnumber,2) + "-"+pad(d.getDate(),2)+"";

    console.log(currenttime);

console.log(emailInput);
    //Check that all inputs have been filled in
    if (nameInput == "" | emailInput == ""){
        alert("Make sure you've filled out all the input fields.");
    } else {
        // *********************************** push to cloud foundry *********************************
        sendform();
    }
}


function sendform(inputurl) {
  var url = "https://fd71d5de-2f81-4fb8-a50e-0527b8402aae-bluemix.cloudant.com/applicant_details";
  var http = new XMLHttpRequest();
  var params = "{\"name\":\""+nameInput+"\",\"email\":\""+emailInput+"\",\"timestamp\":\""+currenttime+"\"}";
  http.open("POST", url, true);

  //Send the proper header information along with the request
  // http.setRequestHeader("Content-type", "application/json");

  // Key:wnsumbefulancienceristay
  // Password:0b2b1532a907575767b0b8bd0d7a1474fb2c8c87

  var username = "wnsumbefulancienceristay";
  var password = "0b2b1532a907575767b0b8bd0d7a1474fb2c8c87";

  http.setRequestHeader("Content-type", "application/json");
  http.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));


  http.onreadystatechange = function() { //Call a function when the state changes.
      console.log(http.readyState);
      if(http.readyState == 4 && http.status == 200) {
        handle200(http);
      } else if(http.readyState == 4 && http.status == 201) {
        handle201(http);
      } else if(http.readyState == 4 && http.status == 404) {
        handle404(http);
      } else if(http.readyState == 4 && http.status == 401) {
        console.log('unauthorized');
      } else {
        console.log(http.readyState);
        // console.log(http.responseText);
      }
      // else if(http.status == 200) {
      //   handle200();
      // } else if(http.status == 201) {
      //   handle201();
      // } else if(http.status == 404) {
      //   handle404();
      // } else {
      //   alert("literally no idea what happened");
      // }

  }
  http.send(params);
  // formsuccess();
}


// function formcallback(data) {
//   alert("HI ELLIE AND PETER");
// }


function pad(num, size) {
   var s = num+"";
   while (s.length < size) s = "0" + s;
   return s;
}


// Key:wnsumbefulancienceristay
// Password:0b2b1532a907575767b0b8bd0d7a1474fb2c8c87




function handle200 (http) {
    alert('200'); // success codes have the success signature
    console.log(http.status);
    formsuccess();
};

function handle201 (http) {
    alert('201'); // success codes have the success signature
    console.log(http.status);
    formsuccess();
};

function handle404 (http) {
    alert('404'); // failing codes have the error signature
    console.log(http.status);
};

function formsuccess() {
  alert("Success!");
}
