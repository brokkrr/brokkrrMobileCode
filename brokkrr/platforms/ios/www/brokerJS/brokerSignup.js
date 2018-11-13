$(document).on("pageshow","#brokerSignupPage", function( event ) {
  
var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }
               else{
                hbcontent=stopPageOverflow(hbcontent);
               }
$('.ui-content').css('height',hbcontent);
               
$('#BrokerDoSignupBtn').off("click").on("click", function() {
    $.mobile.loading("show");
    var username=$('#username').val();
    username=jQuery.trim(username);
    var password=$('#password').val();
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
    if(globalvalidatePassword(passwordid)){
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
		$.ajax({		
			type: "POST",
			url: webserviceURL,
			data: {UserName:username,Password:password,UserType:"Broker",RegisteredFor:"Brokkrr",ActionName:"DoRegularSignUp"},
			success: function (data) {	
				var obj = JSON.parse(data);
				var issuccess = obj.IsSuccess;
				var ErrorMessage=obj.ErrorMessage;
				var Response=obj.Response;	
				if(issuccess==true){
                    clearfield();
                    $.each(Response, function (i, res) {
                    $.mobile.loading("hide");
                    if(res.EmailSuccess=="True"){
                        jQuery("label[for='messagetext']").html('You have registered successfully. A confirmation email has been sent to '+res.EmailId +'. Please verify your email address and ID.');
                        $('#InfopopupSignup').popup('open');
                    }
                    else{
                        jQuery("label[for='messagetext']").html('You have registered successfully, but confirmation email was not sent on '+res.EmailId +' .');
                        $('#InfopopupSignup').popup('open');
                    }
                    });
                }
                else if(issuccess==false){
                    $.mobile.loading("hide");
                    jQuery("label[for='messagetext']").html(ErrorMessage);
                    $('#InfopopupSignup').popup('open');
                }
                else{
					$.mobile.loading("hide");
					jQuery("label[for='messagetext']").html("Please try again.");
			    	$('#InfopopupSignup').popup('open');
                }
            },
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if(errorThrown!=""){	
					$.mobile.loading("hide");
					jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
			    	$('#InfopopupSignup').popup('open');
				}
				else{					
				}	
			}			 			
		});
   }
   else{
    	$.mobile.loading("hide");
    	if(!CheckRequiredField())
    	{
    		jQuery("label[for='messagetext']").html("Please enter required fields.");
    		$('#InfopopupSignup').popup('open');
    	}
    	else if(!globalvalidateEmail(usernameid))
    	{
    		jQuery("label[for='messagetext']").html("Please enter valid email id.");
    		$('#InfopopupSignup').popup('open');
    	}
    	else if(!globalvalidatePassword(passwordid))
    	{
    		jQuery("label[for='messagetext']").html("Password must be 8 to 15 characters and not accept white space.");
    		$('#InfopopupSignup').popup('open');
    	}
    	else
    	{
    		jQuery("label[for='messagetext']").html("Please validate details.");
    		$('#InfopopupSignup').popup('open');
    	}
    }
});
	
$('#OkbtnSignup').off("click").on("click", function() {
    $('#InfopopupSignup').popup('close');
});
	
function clearfield(){
    $('#username').val("");
    $('#password').val("");
}
	
$('#BrokersignupbackBtn').off("click").on("click", function() {
    $("#BrokersignupbackBtn").attr('class','backbtnArrow');
    $("#BrokersignupbackBtn" ).toggle( "highlight" );
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/broker.html",{transition: "slide",reverse: false});
});

});//Page End
