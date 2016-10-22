// i know that there is a jQuery plugin that does the validation easier, but instead
//i decided to go with a manual solution so I can write a little bit more code

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
    //validateBlank(inputObject);

    //check valid email
    validateEmail(inputObject.email);

    //check if terms are checked
    validateTerms();

    //check password strenth. (pass to this function the following options)
    // 1. Desired password length
    // 2. True if you want the password to contain both lowercase and uppercase letters
    // 3. True if you want the password checker to contain at least one special character
    validatePassword(inputObject.pass,6,true,true);

  });


  //check if input boxes are blank
  function validateBlank(inputObject) {

    if (inputObject.name == ""){
      console.log("name cannot be blank");

      //console.log($("#name").parentNode.addClass("has-error"));
      $("#name").parent().addClass('has-error');
    }

    if (inputObject.lastName == ""){
      console.log("lastname cannot be blank");
      $("#lastname").parent().addClass('has-error');
    }

    if (inputObject.nickName == ""){
      console.log("nickName cannot be blank");
      $("#nickname").parent().addClass('has-error');
    }

    if (inputObject.email == ""){
      console.log("email cannot be blank");
      $("#email").parent().addClass('has-error');
    }

    if (inputObject.pass == ""){
      console.log("pass cannot be blank");
      $("#password").parent().addClass('has-error');
    }


  }

  function validateEmail(email) {

    //regular expression with what an email should contain
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(regex)){
      console.log("invalid email");
    }
    else
      console.log("success");
  }

  function validateTerms() {

    if (!$("#terms").prop("checked")){
      console.log("terms are not checked");
    }
  }

  function validatePassword(pass,passLength,lowerUpperLetters, specialCharacters) {

    var strength = 0;

    //check password length
    if (pass.length >= passLength)
      strength += 1;

    //check password for lowercase and uppercase letters (if the option is chosen)
    if (lowerUpperLetters == true){
      var regex = /([a-z].*[A-Z])|([A-Z].*[a-z])/;

      if (pass.match(regex)){
        strength += 1;
      }
    }

    if (specialCharacters == true){
      var regex = /([!,%,&,@,#,$,^,*,?,_,~])/;

      if (pass.match(regex)){
        strength += 1;
      }

    }

    console.log(strength);
  }

});
