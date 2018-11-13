$(document).on("pageshow","#customerSignupPage", function( event ) {
    var selectedcompany=sessionStorage.getItem('selectedcompany');
	//Index.html
    if(selectedcompany=="Meineke"){
        RegisteredFor="Meineke";
    }
    else if(selectedcompany=="APSP"){
        RegisteredFor="APSP";
    }
    else{
        RegisteredFor="Brokkrr";
    }
    
               
	$('#customerDoSignupBtn').off("click").on("click", function() {
		
		//alert('Called');
		 // $.mobile.loadingMessageTextVisible = true;
		    $.mobile.loading("show");
		   
		    var username=$('#username').val();
		    username=jQuery.trim(username);
		    
	    	var password=$('#password').val();   	
	    	password=jQuery.trim(password);
	    	
			var usernameid = $('#username');
	    	var passwordid = $('#password');
	    	
	    	//On key press
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
	    	       // if(globalvalidaterequired(passwordid))
	    	        if(globalvalidatePassword(passwordid))
	    	        {
	    	        	
	    	        	return true;
	    	        }
	    	        else
	    	        {
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
	    	
	    	if(validateFields())
	    	{
            //alert(RegisteredFor);
			$.ajax({		
				type: "POST",
				url: webserviceURL,
                   data: {UserName:username,Password:password,UserType:"Customer",RegisteredFor:RegisteredFor,ActionName:"DoRegularSignUp"},
				success: function (data) {	
					var obj = JSON.parse(data);
					var issuccess = obj.IsSuccess;
					var ErrorMessage=obj.ErrorMessage;
					var Response=obj.Response;
                  // alert("DoRegularSignUp :"+RegisteredFor);
					if(issuccess==true)
						{
							clearfield();
							$.each(Response, function (i, res) {
								$.mobile.loading("hide"); 
								if(res.EmailSuccess=="True")
								{
									jQuery("label[for='messagetext']").html('You have registered successfully. A confirmation email has been sent to '+res.EmailId +'. Please verify your email address and ID.');
							    	$('#InfopopupCustomerSignup').popup('open');
								}
								else
								{
									jQuery("label[for='messagetext']").html('You have registered successfully, but confirmation email was not sent on '+res.EmailId +' .');
							    	$('#InfopopupCustomerSignup').popup('open');
								}
								
							 });
						}
					else if(issuccess==false)
					{
						$.mobile.loading("hide"); //1.4.5
						jQuery("label[for='messagetext']").html(ErrorMessage);
				    	$('#InfopopupCustomerSignup').popup('open');
							
						}
					else
						{
						$.mobile.loading("hide"); //1.4.5
						jQuery("label[for='messagetext']").html("Please try again.");
				    	$('#InfopopupCustomerSignup').popup('open');
						}	

					},        					
				
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					if(errorThrown!=""){	
						$.mobile.loading("hide"); //1.4.5
						jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
				    	$('#InfopopupCustomerSignup').popup('open');
					}
					else{					
					}	
				}			 			
			});
	   }
	    else
	    {
	    	$.mobile.loading("hide"); //1.4.5
	    	if(!CheckRequiredField())
	    	{
	    		jQuery("label[for='messagetext']").html("Please enter required fields.");
	    		$('#InfopopupCustomerSignup').popup('open');
	    	}
	    	else if(!globalvalidateEmail(usernameid))
	    	{
	    		jQuery("label[for='messagetext']").html("Please enter valid email id.");
	    		$('#InfopopupCustomerSignup').popup('open');
	    		
	    	}
	    	else if(!globalvalidatePassword(passwordid))
	    	{
	    		jQuery("label[for='messagetext']").html("Password must be 8 to 15 characters and not accept white space.");
	    		$('#InfopopupCustomerSignup').popup('open');
	    	}
	    	else
	    	{
	    		jQuery("label[for='messagetext']").html("Please validate details.");
	    		$('#InfopopupCustomerSignup').popup('open');
	    	}
	    }
	      //$( ":mobile-pagecontainer" ).pagecontainer( "change", "customerSignupNext.html",{transition: "slide",reverse: false});
	 });
	
	$('#OkbtnCustomerSignup').off("click").on("click", function() {
		$('#InfopopupCustomerSignup').popup('close');
	});
	
	function clearfield(){
		 $('#username').val("");
		 $('#password').val(""); 
	}  
	$('#CustomersignupbackBtn').off("click").on("click", function() {
          $("#CustomersignupbackBtn").attr('class','backbtnArrow');
          $("#CustomersignupbackBtn" ).toggle( "highlight" );
	      $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customer.html",{transition: "slide",reverse: false});
	 });
	
});
