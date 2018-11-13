
$(document).on("pageshow","#workerscompInsurance_page", function( event ) {
               CheckDeviceId(useridCust);
changeimg('cmplogo',RegisteredFor);
changefooterlogo('footerlogo',RegisteredFor);

               
$('#backtosearch').off("click").on("click", function() {
    if(RegisteredFor=="Meineke"){
       $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/meinekehome.html",{transition: "slide",reverse: false});
    }
    else if(RegisteredFor=="Brokkrr"){
       $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/brokkrrhome.html",{transition: "slide",reverse: false});
    }
    if(RegisteredFor=="APSP"){
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/apsphome.html",{transition: "slide",reverse: false});
    }
                                                                     
});
               var hbcontent=getcontentheight();

               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }else{
               
               hbcontent=stopPageOverflow(hbcontent);
               
               }
               if(RegisteredFor=="Brokkrr"){
               $('#wfooter').hide();
               }
               else{
              
               $('#wfooter').show();
              
               }
		
	var max_chars = 5;
	$('#zipcode').keyup( function(e){
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
	    	$('#txtlat').val('');
	        $('#txtlang').val('');
	    }
	});

	 var user=sessionStorage.getItem('CustomerUser');
	    if(user===null || user=='')
		{
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
			
		}
		
	    var UserId, EmailId;
	    
	    var obj=JSON.parse(user);
		var issuccess = obj.IsSuccess;
		var ErrorMessage=obj.ErrorMessage;
		if(issuccess==true)
			{
			var UserDetails=obj.UserDetails;
			$.each(UserDetails, function (i, userobj) {
				
				UserId=userobj.UserId;
				EmailId=userobj.EmailId;
				ZipCode=userobj.PinCode;
				
				if(ZipCode!='')
				{
					$('#zipcode').val(ZipCode);
					$('#zipcode').keyup();
				}
				getMenuDetailsCustomer(menuCustFirstname,menuCustLastname,menuCustProfilepic);
			});
		}
		else
		{
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
		}


	$('#saveworkercompensationInsurance').off("click").on("click", function() {	
        
	    $.mobile.loading("show");
	    
		var zipid = $('#zipcode');
		var cityid = $('#txtcity');
	
		zipid.keyup(validatezip);

		function validatezip()
	 	{
			
	 		 if (globalvalidaterequired3(zipid,"errorzip") & globalvalidaterequired3(cityid,"errorcity")){
	 	        	return true;
	 	       }
	 	        else{
	 	        	return false;
	 	       	}
	 	}
	
		
	 	function validateFields(){
	 		
	 		if (globalvalidaterequired3(zipid,"errorzip") & globalvalidaterequired3(cityid,"errorcity"))
	 		{
	         	return true;
	        }
	        else
	        {
	        	
	         	return false;
	        }
	 	} 	
	 	 if(validateFields())
		 {	 
                                            
	 		var ZipCode=$('#zipcode').val();
	 		var City=$('#txtcity').val();
	 		var NoOfEmployees=$("#Noofemployee option:selected").text();
	 		var GrossPayroll=$("#GrossPayrol option:selected").text();
            if(NoOfEmployees=="Select"){
                NoOfEmployees="";
            }
            if(GrossPayroll=="Select"){
                GrossPayroll="";
            }
	 		var Latitude=$('#txtlat').val();
	 		var Longitude=$('#txtlang').val();
            //  alert(GrossPayroll);
            //  alert(NoOfEmployees);
            var DeclarationDoc=$('#getfileconversion').val();
            var DocName= $('#fileInput').val();
           // alert("parameters :"+UserId+' '+Longitude+' '+Latitude+' '+ZipCode+' '+City+' '+NoOfEmployees+' '+DeclarationDoc+' '+DocName+' '+GrossPayroll);
                                                          
	 		$.ajax({		
				type: "POST",
				url: webserviceURL,
                   data: {UserId:UserId,ZipCode:ZipCode,City:City,NoOfEmployees:NoOfEmployees,DeclarationDoc:DeclarationDoc,DocName:DocName,GrossPayroll:GrossPayroll,Longitude:Longitude,Latitude:Latitude,DeclarationDoc:DeclarationDoc,DocName:DocName,ActionName:"DoSaveWorkersCompensationDetails"},
				success: function (data) {	
					var obj = JSON.parse(data);
					//alert('data '+ data);
					var issuccess = obj.IsSuccess;
					var ErrorMessage=obj.ErrorMessage;
				
					if(issuccess==true)
					{
						sessionStorage.setItem('SearchList',data);
						sessionStorage.setItem('SearchListtype',"Workers compensation");
						globalcountcontact=0;
						cards=[];
						$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/contactBroker.html",{transition: "none",reverse: false});
						//alert('issuccess' + issuccess)
					}
					else if(issuccess==false)
					{
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html(ErrorMessage);
				    	$('#InfopopupLifeInsurance').popup('open');
							
						}
					else
						{
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html("Please try again.");
				    	$('#InfopopupLifeInsurance').popup('open');
						}	

					},        					
				
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					if(errorThrown!=""){	
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
				    	$('#InfopopupLifeInsurance').popup('open');
					}
					else{					
					}	
				}			 			
			});
	 		
		 }
	 	 else
	 	 {
	 		 $.mobile.loading("hide");
	 		 jQuery("label[for='messagetext']").html("Please validate details.");
	 		 $('#InfopopupLifeInsurance').popup('open');
    	
	 	 }
		 	
	});
	
               $('#labelfileInput').on("click", function (){
                                       $('#errordiv').text("");
                                       $('#ConfirmPictureInfopopup').popup('open');
                                       });
               
               $('#OpenGallery').on("click", function () {
                                    $('#ConfirmPictureInfopopup').popup('close');
                                    getdocImages("fileInput","getfileconversion","InfopopupLifeInsurance");
                                    });
               
               $('#OpenCamera').on("click", function () {
                                   $('#ConfirmPictureInfopopup').popup('close');
                                   getdocImagescamera("fileInput","getfileconversion","InfopopupLifeInsurance");
                                   });

	
	$('#OkbtnLifeInsurance').off("click").on("click", function() {
		$('#InfopopupLifeInsurance').popup('close');
	});
});

