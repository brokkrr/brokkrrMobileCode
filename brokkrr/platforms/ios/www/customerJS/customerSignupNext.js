$(document).on("pageshow","#SignupCustomerNext", function( event ) {

               var hbcontent=getcontentheight();
               $('.ui-content').css('height',hbcontent);
	/*var max_chars = 5;
	$('#zip').keyup( function(e){
		
	    if ($(this).val().length >= max_chars) { 
	        $(this).val($(this).val().substr(0, max_chars));
	    }
	});*/
	var ActionName="";
	var max_chars = 5;
	$('#zipid').keyup( function(e){
		//alert('called');
	    if ($(this).val().length >= max_chars) { 
	        $(this).val($(this).val().substr(0, max_chars));
	    }
	    if ($(this).val().length>=5)
	    {
	    	var zip=$(this).val();
	    	localCity=getCityZipcode(zip);
			$('#txtcity').val(localCity);
			
	    }
	    else
	    {
	    	$('#txtcity').val('');
	    }
	});
	
	var user=sessionStorage.getItem('CustomerUser');
               
    if(user===null || user=='')
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
		
	}
	
    var UserId, EmailId, FirstName, LastName,profilepic="",prevImg="";
    
    var obj=JSON.parse(user);
	var issuccess = obj.IsSuccess;
	var ErrorMessage=obj.ErrorMessage;
	if(issuccess==true)
    {
		var UserDetails=obj.UserDetails;
		$.each(UserDetails, function (i, userobj) {
			
			UserId=userobj.UserId;
			EmailId=userobj.EmailId;
			FirstName=userobj.FirstName;
			LastName=userobj.LastName;
            registeredfor=userobj.RegisteredFor;
		});
	}
	else
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
	}
	var ExternalReg= sessionStorage.getItem('Provider');
	if(ExternalReg !== null)
	{
		var divcontent='Thank you for using '+ExternalReg+' . We have pulled up your information from '+ExternalReg+ '.You can edit and add more details.<hr>'
		$('#externalhead').append(divcontent);	
		sessionStorage.removeItem("Provider")
	}
	
	$('#email').val(EmailId)
	$('#firstname').val(FirstName)
	$('#lastname').val(LastName)
	$('#email').prop('disabled',true);
    $('#profilepicprofile').attr("src",dcustomerimg);
               
	var img = "";
$('#profilePhotoimg').on("click", function () {
    getImages("profilepicprofile","edittxtprofilepic","InfopopupCustomerSignupNext");
}); //end of input button
	  
	
	  
	
	$('#CustomerSignupNext').off("click").on("click", function() {
	     $.mobile.loading("show");
	       
	    var firstnameid = $('#firstname');
	 	var phoneid = $('#phone');
	 	var emailid = $('#email');
	 	var zipid = $('#zipid');
	 	
	 	firstnameid.keyup(validatefirstname);
	 	phoneid.keyup(validatephone);
	 	emailid.keyup(validateemail);
	 	zipid.keyup(validatezip);
	 	
	 	profilepic=$('#edittxtprofilepic').val();

	 	function validatezip()
	 	{
	 		 if (globalvalidaterequired2(zipid)){
	 	        	return true;
	 	       }
	 	        else{
	 	        	return false;
	 	       	}
	 	}
	 	
	 	function validatefirstname()
	 	{
	 		 if (globalvalidaterequired2(firstnameid)){
	 	        	return true;
	 	       }
	 	        else{
	 	        	return false;
	 	       	}
	 	}
	 	
	 		
	 	function validatephone()
	 	{
	 		 if (globalvalidaterequired2(phoneid)){
	 	        	return true;
	 	       }
	 	        else{
	 	        	return false;
	 	       	}
	 	}
	 	 
	 	function validateemail()
	 	{
	 		 if (globalvalidaterequired2(emailid)){
	 	        	return true;
	 	       }
	 	        else{
	 	        	return false;
	 	       	}
	 	}
	 	
	 	
	 	function validateFields(){
	 		if (globalvalidaterequired2(firstnameid) & globalvalidaterequired2(phoneid)& globalvalidaterequired2(emailid) & globalvalidaterequired2(zipid)){
	         	return true;
	        }
	         else{
	         	return false;
	        	}	
	 	}
	 	
	 var firstname=$('#firstname').val();
	 var lastname=$('#lastname').val();
	 var phone=$('#phone').val();
	 var zip=$('#zipid').val();
	 var email=$('#email').val();

	 var Result={
	 			  "UserDetails" : [
	 			    {
	 			      "UserId":UserId,
	 			         "FirstName":firstname,
	 			         "LastName":lastname,
	 			         "Address":"",
	 			         "City":"",
	 			         "PinCode":zip,
	 			         "MobNo":"",
	 			         "State":"",
	 			         "Country":"",
	 			         "HouseType":"",
	 			         "AddressOfHouse":"",
	 			         "IsHavingCar":"",
	 			         "NoOfCars":"",
	 			         "TypeOfEmployment":"",
	 			         "CompanyName":"",
	 			         "DOB":"",
	 			         "ProfilePicture" : profilepic,
	 			         "PhoneNo":phone
	 			    }
	 			  ]
	 			};
                                             
    var meinekeResult={
                "UserDetails" : [
                    {
                        "UserId":UserId,
                        "FirstName":firstname,
                        "LastName":lastname,
                        "Address":"",
                        "City":"",
                        "PinCode":zip,
                        "MobNo":"",
                        "State":"",
                        "Country":"",
                        "HouseType":"",
                        "AddressOfHouse":"",
                        "IsHavingCar":"",
                        "NoOfCars":"",
                        "TypeOfEmployment":"",
                        "CompanyName":"",
                        "DOB":"",
                        "ProfilePicture" : profilepic,
                        "PhoneNo":phone,
                        "Website":"",
                        "NoOfEmp":"",
                        "EstPremium":""
                   }
              ]
    };
	 	
	
	 	 if(validateFields())
	 	{
                                          
            if(registeredfor=="Meineke"||registeredfor=="APSP"){
                 ActionName="DoUpdateProfileCustomerForMeineke";
                 Result=meinekeResult;
            }
            else{
                ActionName="DoUpdateProfileCustomer";
                Result=Result;
            }
                                         
	 		 //alert('Valid :'+JSON.stringify(Result));
	 		$.ajax({		
	 			type: "POST",
	 			url: webserviceURL,
	 			data: {Result:JSON.stringify(Result),ActionName:ActionName,IsProfilePicUpdated:'true'},
	 			success: function (data) {
	 				
	 			   var obj = JSON.parse(data);
	 			 // alert('data: '+data);
	 				var issuccess = obj.IsSuccess;
	 				var ErrorMessage=obj.ErrorMessage;
	 				
	 				if(issuccess==true)
	 					{
	 					$.mobile.loading("hide"); 
	 					var UserDetails=obj.UserDetails;
	 				
	 					$.each(UserDetails, function (i, res) {
                  
	 						SetDeviceIdForiOS(res.UserId); 
	 						sessionStorage.setItem('CustomerUser',data);
                            localStorage.setItem('CustomerUser',data);
                                RegisteredFor=res.RegisteredFor;
                             
                        $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/meinekelines.html",{transition: "slide",reverse: false});
                             
	 					 });
	 					}
	 				else if(issuccess==false)
	 				{
	 					$.mobile.loading("hide"); //1.4.5
	 					jQuery("label[for='messagetext']").html(ErrorMessage);
	 			    	$('#InfopopupCustomerSignupNext').popup('open');
	 					}
	 				else
	 					{
	 					$.mobile.loading("hide"); //1.4.5
	 					jQuery("label[for='messagetext']").html("Error Occured,Please try again.");
	 			    	$('#InfopopupCustomerSignupNext').popup('open');
	 					}	

	 				},        					
	 			error : function(XMLHttpRequest, textStatus, errorThrown) {
	 				if(errorThrown!=""){	
	 					$.mobile.loading("hide"); //1.4.5
	 					jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
	 			    	$('#InfopopupCustomerSignupNext').popup('open');
	 			    	
	 				}
	 				else{					
	 				}	
	 			}			 			
	 		});
	 	}
	 	 else
	 	 {
	 		 $.mobile.loading("hide"); //1.4.5
	 		 jQuery("label[for='messagetext']").html("Please validate details.");
	 		 $('#InfopopupCustomerSignupNext').popup('open');
    	
	 	 }
	     
	    // $( ":mobile-pagecontainer" ).pagecontainer( "change", "profileCustomer.html",{transition: "slide",reverse: false});
	 });
	
	$('#OkbtnSignupNext').off("click").on("click", function() {
		$('#InfopopupCustomerSignupNext').popup('close');
	});
	
    $('#csignupbckbtn').off("click").on("click", function() {
        $("#csignupbckbtn").attr('class','backbtnArrow');
        $("#csignupbckbtn" ).toggle( "highlight" );
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
    });
});
