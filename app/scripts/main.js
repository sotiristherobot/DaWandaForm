$(document).ready(function () {

  //event listener for submit buttons clicks
  $("#submit").click(function () {
    //get values from form
    var name = $("#name").val();
    var lastName = $("#lastname").val();
    var nickName = $("#nickname").val();
    var email = $("#email").val();
    var pass = $("#password").val();

    //place everything into an object
    var inputObject = {
      name : name,
      lastName : lastName,
      nickName : nickName,
      email : email,
      pass : pass
    };

    //check if there are any blank fields
    validateBlank(inputObject);

  });


  //check if input boxes are blank
  function validateBlank(inputObject) {

    if (inputObject.name == ""){
      console.log("name cannot be blank");
    }

    if (inputObject.lastName == ""){
      console.log("lastname cannot be blank");
    }

    if (inputObject.nickName == ""){
      console.log("nickName cannot be blank");
    }

    if (inputObject.email == ""){
      console.log("email cannot be blank");
    }

    if (inputObject.pass == ""){
      console.log("pass cannot be blank");
    }


  }

});
