// i know that there is a jQuery plugin that does the validation easier, but instead
//i decided to go with a manual solution so I can write a little bit more code

$(document).ready(function () {

  //event listener for submit buttons clicks
  $('#submit').click(function () {
    //get values from form
    var name = $('#name').val();
    var lastName = $('#lastname').val();
    var nickName = $('#nickname').val();
    var email = $('#email').val();
    var pass = $('#password').val();

    //place everything into an object
    var inputObject = {
      name : name,
      lastName : lastName,
      nickName : nickName,
      email : email,
      pass : pass
    };
    //check if there are any blank fields
    if (validateBlank(inputObject)) {

      //check password strenth. (pass to this function the following options)
      //  // // // 1. Desired password length
      //  // // // 2. True if you want the password to contain both lowercase and uppercase letters
      //  // // // 3. True if you want the password checker to contain at least one special character
        if (validatePassword(inputObject.pass, 6, true, true) && validateEmail(inputObject.email)) {

          if (validateTerms())
            alert('You made it pal, please login now');
        }
      }

  });

  //check if input boxes are blank
  function validateBlank(inputObject) {

    var allBlank = false;

    if (inputObject.name == ''){
      //console.log($("#name").parentNode.addClass("has-error"));
      $('#name').parent().addClass('has-error');
      showPopOver('name');
      removeHasError('#name');
      allBlank = true;

    }

    if (inputObject.lastName == ''){
      console.log('lastname cannot be blank');
      $('#lastname').parent().addClass('has-error');

      showPopOver('lastName');
      removeHasError('#lastname');
      allBlank = true;
    }

    if (inputObject.nickName == ''){
      $('#nickname').parent().addClass('has-error');

      showPopOver('nickname');
      removeHasError('#nickname');
      allBlank = true;
    }

    if (inputObject.email == ''){
      console.log('email cannot be blank');
      $('#email').parent().addClass('has-error');

      showPopOver('email');
      removeHasError('#email');
      allBlank = true;

    }

    if (inputObject.pass == ''){
      console.log('pass cannot be blank');
      $('#password').parent().addClass('has-error');

      showPopOver('password');
      removeHasError('#password');
      allBlank = true;
    }

    if (allBlank == true)
      return false;
    else
      return true;

  }

  function validateEmail(email) {

    //regular expression with what an email should contain
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(regex)){
      //console.log("invalid email");
      $('#email').parent().addClass('has-error');
      showPopOver('email', 'format not valid');
      removeHasError('#email');
      return false;
    }
    else
      //console.log("success");
      return true;
  }

  function validateTerms() {


    var checkBox = $('#terms');

    if (checkBox.is(':checked'))
      return true;
    else {
      alert('Please accept the terms');
      return false;
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

    //check if password contains special characters
    if (specialCharacters == true){
      var regex = /([!,%,&,@,#,$,^,*,?,_,~])/;

      if (pass.match(regex)){
        strength += 1;
      }

    }

    //decide if password is strong enough
    if (strength == 1 && !lowerUpperLetters && !specialCharacters)
      return true;
    else if (strength == 2 && lowerUpperLetters && !specialCharacters)
      return true;
    else if (strength == 2 && !lowerUpperLetters && specialCharacters)
      return true;
    else if (strength == 3 && lowerUpperLetters && specialCharacters)
      return true;
    else {
      $('#password').parent().addClass('has-error');
      showPopOver('password', 'weak password');
      removeHasError('#password');
      return false;
    }


  }

  //optionally send to this function a different msg to be displayed instead of the default one.
  function showPopOver(el, msg) {
    var popover = $('#' + el + '-bubble').popover({
      trigger : 'manual',
      placement : 'bottom',
      content : msg || 'muss ausgefullt werden',
      template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
    });

    $('#' + el + '-bubble').popover('show');

    //hide popover after some time.
    window.setTimeout(function () {
      $('#' + el + '-bubble').popover('destroy');
    }, 5000);

  }

  //remove the has-error class when the inputfield gets focus
  function removeHasError(el){
    $(el).focus(function() {
      $(el).parent().removeClass('has-error');
    });

  }
});
