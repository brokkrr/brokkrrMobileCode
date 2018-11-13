$(document).on("pageshow","#brokerLoginPage,#brokerForgetPage", function( event ) {
               var passfield = $("#password");

               $(".toggle-password").click(function() {
                                           if(passfield.val() != ""){
                                           if ($('#password').attr("type") == "password") {
                                           $('#password').attr("type", "text");
                                           $('#showhide').attr("src", "../images/show_password.png");
                                           
                                           } else {
                                           $('#password').attr("type", "password");
                                           $('#showhide').attr("src", "../images/hide_password.png");
                                           
                                           }
                                           }
                                           });
               var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }
               else{
                hbcontent=stopPageOverflow(hbcontent);
               }
               $('.ui-content').css('height',hbcontent);
               
if(CustomerBadgesInt>0){
        window.clearInterval(CustomerBadgesInt);
    }
    if(IntLatestmsgCustomer>0){
        window.clearInterval(IntLatestmsgCustomer);
    }
        
	openFB.init({appId: '1004008993055033'/*,		 accessToken:'EAAORJA9h4TkBANBnLiUgTJWnSoBMQXyAZBPSxQ3k5uJr0x4uPFWaPjaBBkZAoWORZC389izepHpnuIbmAyf4aG0jhotdYaWsCbv6YxGr6RYFPG1ofKRHZClUR2O10EkEP7HFqdH2ZABqbfK3JpzIThsAoFqKHAyGIEOWGRfOSGgZDZD'
	*/
	});
               
    function onDeviceReady() {
        getGeolocation();
    }
	
	chkLogin('Broker');
	
$('#closecontactBrokerPopup').off("click").on("click", function() {
    $('#myModalError').modal('hide');
});
	
$('#BrokerDoLoginBtn').off("click").on("click", function() {
      var DeviceID=localStorage.getItem('DeviceID');
     userLogin();
      ///alert(device.isVirtual);
      /*if(DeviceID==null||DeviceID==""|| DeviceID=='iOSnull'||DeviceID=='iOS'){
    jQuery("label[for='notifytext']").html("We are unable to send notifications. Please reinstall the app or press continue");
     $('#notifyPopup').popup('open');
                                       }
    else{
        userLogin();
    }*/
  
});
/*
$('#OkbtnnotifyPopup').off("click").on("click", function() {
        $('#notifyPopup').popup('close');
});
$('#Continuebtn').off("click").on("click", function() {
    $('#notifyPopup').popup('close');
     userLogin();
});*/
$('#ForgetPasswordbtn').off("click").on("click", function() {
	jQuery("label[for='forgetmessagetext']").html("");
	$.mobile.loading("show");
    var emailid= $('#Forgotpassemail').val();
    var emailidid= $('#Forgotpassemail');
	emailidid.keyup(validateEmail);
		
function validateEmail(){
    if (globalvalidateEmail(emailidid)){
        return true;
    }
    else{
        return false;
    }
}
                                        
if(globalvalidateEmail(emailidid)){
    $.ajax({
        type: "POST",
        url: webserviceURL,
        data: {EmailId:emailid,ActionName:"DoForgetPassword"},
        success: function (data) {
            var obj = JSON.parse(data);
            var issuccess = obj.IsSuccess;
            var ErrorMessage=obj.ErrorMessage;
            if(issuccess==true){
                $.mobile.loading("hide");
                $("#forgetinfo").hide();
                $("div#forgetpasstextbox").hide();
                $("#ForgetPasswordbtn").hide();
                $("div#forgetsuccessmsg").show();
                $("#Gotologinbtn").show();
            }
            else{
                $.mobile.loading("hide");
                $("#forgetinfo").hide();
                $("div#forgetpasstextbox").hide();
                $("#ForgetPasswordbtn").hide();
                $("div#forgeterrormsg").show();
                $("#forgorpassretry").show();
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown!=""){
                $.mobile.loading("hide");
                $("#forgetinfo").hide();
                $("div#forgetpasstextbox").hide();
                $("#ForgetPasswordbtn").hide();
                $("div#forgeterrormsg").show();
                $("#forgorpassretry").show();
            }
            else{
            }
        }
    });
}
else{
    $.mobile.loading("hide");
    jQuery("label[for='forgetmessagetext']").html("Please validate details.");
}
                                        
});
	
$('#forget_password').off("click").on("click", function() {
    $('#Forgetpassword').popup('open');
});
	
$('#ForgetPasswordclosebtn').off("click").on("click", function() {
    $('#Forgotpassemail').val('');
    jQuery("label[for='forgetmessagetext']").html("");
    $('#myModalForgetPassword').modal('hide');
    ///$('#myModalError').modal('hide');
                                             document.getElementById("overlay").style.display="none";
                                             $('#InfopopupLogin').popup('close');
    setTimeout(function() {
        $("#forgetPasswordModal").trigger('blur');
    },10);
});

$('#OkbtnBrokerLogin').off("click").on("click", function() {
    $('#InfopopupLogin').popup('close');
});
$("#InfopopupLogin").popup({
    afterclose: function () {
            document.getElementById("overlay").style.display="none";
    }
});
function clearfield(){
    $('#username').val("");
    $('#password').val("");
}
		
$('#BrokerloginbackBtn').off("click").on("click", function() {
    $("#BrokerloginbackBtn").attr('class','backbtnArrow');
    $("#BrokerloginbackBtn" ).toggle( "highlight" );
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/broker.html",{transition: "slide",reverse: false});
});
               
$('#forgorpassretry').off("click").on("click", function() {
    refreshPage();
});
	
function refreshPage() {
    $.mobile.changePage(window.location.href,{
		      allowSamePageTransition : true,
		      transition              : 'none',
		      showLoadMsg             : false,
		      reloadPage              : true
    });
}
	
               function userLogin(){
               $.mobile.loading("show");
               ClearAllSessionWithoutlocation();
               
               var username=$('#username').val();
               var password=$('#password').val();
               username=jQuery.trim(username);
               password=jQuery.trim(password);
               var usernameid = $('#username');
               var passwordid = $('#password');
               usernameid.keyup(validateUsername);
               passwordid.keyup(validatePassword);
               
               function validateUsername(){
               if (globalvalidateEmail(usernameid)){
               return true;
               }
               else{
               return false;
               }
               }
               
               function validatePassword(){
               if(globalvalidaterequired(passwordid)){
               return true;
               }
               else{
               return false;
               }
               }
               
               function validateFields(){
               if (validateUsername() & validatePassword()){
               return true;
               }
               else{
               return false;
               }
               }
               
               function CheckRequiredField(){
               if (globalvalidaterequired(usernameid) & globalvalidaterequired(passwordid)){
               return true;
               }
               else{
               return false;
               }
               }
               
               if(validateFields()){
               
               var check = $("#rememberme").is(":checked");
               if(check) {
               sessionStorage.setItem("UserName",$('#username').val());
               sessionStorage.setItem("Password",$('#password').val());
               insertData('Broker');
               }
               else{
               truncateTable('Broker');
               }
               
               $.ajax({
                      type: "POST",
                      url: webserviceURL,
                      data: {UserName:username,Password:password,UserType:"Broker",ActionName:"DoLogin"},
                      success: function (data) {
                      var obj = JSON.parse(data);
                      var issuccess = obj.IsSuccess;
                      var ErrorMessage=obj.ErrorMessage;
                      var UserDetails=obj.UserDetails;
                      
                      if(issuccess==true){
                      clearfield();
                      $.each(UserDetails, function (i, res) {
                             $.mobile.loading("hide");
                             useridBroker=res.UserId;
                             if(res.IsUpdateProfile=="True"){
                             SetDeviceIdForiOS(res.UserId);
                             sessionStorage.setItem('BrokerUser',data);
                             localStorage.setItem('BrokerUser',data);
                             setInitialVariable();
                             
                             $( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/profileBroker.html",{transition: "slide",reverse: false});
                             }
                             else{
                             sessionStorage.setItem('BrokerUser',data);
                             localStorage.setItem('BrokerUser',data);
                             setInitialVariable();
                             getIndustryList(RegisteredFor);
                             GetIndustrySICCodeList("");
                             $( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/brokerSignupNext.html",{transition: "slide",reverse: false});
                             }
                             });
                      }
                      else if(issuccess==false){
                      $.mobile.loading("hide");
                      jQuery("label[for='messagetext']").html(ErrorMessage);
                      /// $('#myModalError').modal('show');
                      document.getElementById("overlay").style.display="block";
                      $('#InfopopupLogin').popup('open');
                      }
                      else{
                      $.mobile.loading("hide");
                      jQuery("label[for='messagetext']").html("Please try again.");
                      document.getElementById("overlay").style.display="block";
                      $('#InfopopupLogin').popup('open');
                      /// $('#myModalError').modal('show');
                      }
                      },
                      error : function(XMLHttpRequest, textStatus, errorThrown) {
                      if(errorThrown!=""){
                      $.mobile.loading("hide");
                      jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
                      ///$('#myModalError').modal('show');
                      document.getElementById("overlay").style.display="block";
                      $('#InfopopupLogin').popup('open');
                      }
                      else{
                      }
                      }
                      });
               }
               else{
               $.mobile.loading("hide");
               if(!CheckRequiredField()){
               jQuery("label[for='messagetext']").html("Please enter required fields.");
               ///$('#myModalError').modal('show');
               document.getElementById("overlay").style.display="block";
               $('#InfopopupLogin').popup('open');
               }
               else if(!globalvalidateEmail(usernameid)){
               jQuery("label[for='messagetext']").html("Please enter valid email id.");
               /// $('#myModalError').modal('show');
               document.getElementById("overlay").style.display="block";
               $('#InfopopupLogin').popup('open');
               }
               else{
               jQuery("label[for='messagetext']").html("Please validate details.");
               /// $('#myModalError').modal('show');
               document.getElementById("overlay").style.display="block";
               $('#InfopopupLogin').popup('open');
               }
               }
               }
});

