$(document).on("pageshow","#personallineautoInsurance_page,#personallineautoInsuranceNext_page", function( event ) {
          CheckDeviceId(useridCust);
               $.mobile.loading("hide");
changeimg('cmplogo',RegisteredFor);
changefooterlogo('footerlogo',RegisteredFor);
/*var hbcontent=getcontentheight();
$('.ui-content').css('height',hbcontent);*/
               var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }else{
               
               hbcontent=stopPageOverflow(hbcontent);
               
               }


	var max_chars = 5;
	$('#zipcode').keyup( function(e){
		
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

	var divHometype=$("#divHometype");
	//var divCoverage=$("#divCoverage");//01 Jan 2018
	var divLanguage=$("#divLanguage");
              
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

      //  BindCompanyList();
      
               
	//Clicked on Economy Car Image
	$('#SelectEconomy').off("click").on("click", function() {
                              
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
		
		if(validatezip())
		 {
			    var ZipCode=$('#zipcode').val();
	 	 		var City=$('#txtcity').val();
	 	 		
	 	 		var Latitude=$('#txtlat').val();
	 	 		var Longitude=$('#txtlang').val();
	 	 		var AutoType='Economy';
	 	 		
	 	 		sessionStorage.setItem('AutoZipCode',ZipCode);
	 	 		sessionStorage.setItem('AutoCity',City);
	 	 		sessionStorage.setItem('AutoLatitude',Latitude);
	 	 		sessionStorage.setItem('AutoLongitude',Longitude);
	 	 		sessionStorage.setItem('AutoType',AutoType);
	 	 		//alert('All Set :'+AutoType);
	 	 		$.mobile.loading("hide");
	 	 		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/personallineautoInsuranceNext.html",{transition: "slide",reverse: false});
		 }
		 else
	 	 {
	 		 $.mobile.loading("hide");
	 		 jQuery("label[for='messagetext']").html("Please validate details.");
	 		 $('#InfopopupAutoInsurance').popup('open');
    	
	 	 }	
	});
	

	$('#SelectStandard').off("click").on("click", function() {
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
		
		if(validatezip())
		 {
			    var ZipCode=$('#zipcode').val();
	 	 		var City=$('#txtcity').val();
	 	 		
	 	 		var Latitude=$('#txtlat').val();
	 	 		var Longitude=$('#txtlang').val();
	 	 		var AutoType='Standard';
	 	 		
	 	 		sessionStorage.setItem('AutoZipCode',ZipCode);
	 	 		sessionStorage.setItem('AutoCity',City);
	 	 		sessionStorage.setItem('AutoLatitude',Latitude);
	 	 		sessionStorage.setItem('AutoLongitude',Longitude);
	 	 		sessionStorage.setItem('AutoType',AutoType);
	 	 		
	 	 		//alert('All Set :'+AutoType);
	 	 		$.mobile.loading("hide");
	 	 		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/personallineautoInsuranceNext.html",{transition: "slide",reverse: false});
		 }
		 else
	 	 {
	 		 $.mobile.loading("hide");
             jQuery("label[for='messagetext']").html("Please validate details.");
	 		 $('#InfopopupAutoInsurance').popup('open');
    	
	 	 }	
	});
	
	//Clicked on Luxury Car Image
	$('#SelectLuxury').off("click").on("click", function() {
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
		
		if(validatezip())
		 {
			    var ZipCode=$('#zipcode').val();
	 	 		var City=$('#txtcity').val();	 	 		
	 	 		var Latitude=$('#txtlat').val();
	 	 		var Longitude=$('#txtlang').val();
	 	 		var AutoType='Luxury';
	 	 		sessionStorage.setItem('AutoZipCode',ZipCode);
	 	 		sessionStorage.setItem('AutoCity',City);
	 	 		sessionStorage.setItem('AutoLatitude',Latitude);
	 	 		sessionStorage.setItem('AutoLongitude',Longitude);
	 	 		sessionStorage.setItem('AutoType',AutoType);
	 	 		//alert('All Set :'+AutoType);
	 	 		$.mobile.loading("hide");
	 	 		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/personallineautoInsuranceNext.html",{transition: "slide",reverse: false});
		 }
		 else
	 	 {
	 		 $.mobile.loading("hide");
	 		 jQuery("label[for='messagetext']").html("Please validate details.");
	 		 $('#InfopopupAutoInsurance').popup('open');
    	
	 	 }	
	});
	
	//Clicked on Collectable Car Image
	$('#SelectCollectable').off("click").on("click", function() {
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
		
		if(validatezip())
		 {
			    var ZipCode=$('#zipcode').val();
	 	 		var City=$('#txtcity').val();
	 	 		
	 	 		var Latitude=$('#txtlat').val();
	 	 		var Longitude=$('#txtlang').val();
	 	 		var AutoType='Collectible';
	 	 		
	 	 		sessionStorage.setItem('AutoZipCode',ZipCode);
	 	 		sessionStorage.setItem('AutoCity',City);
	 	 		sessionStorage.setItem('AutoLatitude',Latitude);
	 	 		sessionStorage.setItem('AutoLongitude',Longitude);
	 	 		sessionStorage.setItem('AutoType',AutoType);
	 	 		
	 	 		//alert('All Set :'+AutoType);
	 	 		$.mobile.loading("hide");
	 	 		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/personallineautoInsuranceNext.html",{transition: "slide",reverse: false});
		 }
		 else
	 	 {
	 		 $.mobile.loading("hide");
	 		 jQuery("label[for='messagetext']").html("Please validate details.");
	 		 $('#InfopopupAutoInsurance').popup('open');
    	
	 	 }	
	});
	
	
	//Submit button of Auto Insurance Next Page
	$('#saveAutoInsurance').off("click").on("click", function() {
	    $.mobile.loading("show");
		var IsInsured = $('#ddlInsurance');
		//var Company=$('#ddlCompanyName');//01 Jan 2018
		//var CoverageExpires1=$("#ddlCoverage");//01 Jan 2018
 		var Language1=$("#ddlLanguage");

		function validateFields(){
	 		if ( globalvalidaterequired6(IsInsured,divHometype) & globalvalidaterequired6(Language1,divLanguage))
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
	 		var ZipCode=sessionStorage.getItem('AutoZipCode');
	 		var City=sessionStorage.getItem('AutoCity');
	 		 		
	 		var IsInsured=$("#ddlInsurance option:selected").text();
	 		var IsInsured1=false;
	 		if(IsInsured=='Currently insured')
	 		{
	 			IsInsured1=true;
	 		}
	 		
	 		//var CompanyName=$("#ddlCompanyName option:selected").text();//01 Jan 2018
            var CompanyName='';
	 		if(IsInsured1==false)
	 		{
	 			CompanyName='';
	 		}
	 		//var CoverageExpires=$("#ddlCoverage option:selected").text();//01 Jan 2018
            var CoverageExpires=''
	 		var Language=$("#ddlLanguage option:selected").text();
	 		var Notes=$("#txtNotes").val();
	 		
	 		var Latitude=sessionStorage.getItem('AutoLatitude');
	 		var Longitude=sessionStorage.getItem('AutoLongitude');
	 		
	 		var VehicleType=sessionStorage.getItem('AutoType');
            var DeclarationDoc=$('#getfileconversion').val();
            var DocName= $('#fileInput').val();
                                            
	 		 $.ajax({		
				type: "POST",
				url: webserviceURL,
				data: {UserId:UserId,ZipCode:ZipCode,City:City,VehicleType:VehicleType,IsInsured:IsInsured1,InsuranceCompany:CompanyName,CoverageExpires:CoverageExpires,Language:Language,Notes:Notes,Longitude:Longitude,Latitude:Latitude,DeclarationDoc:DeclarationDoc,DocName:DocName,ActionName:"DoSaveAutoInsuranceDetails"},
				success: function (data) {	
					var obj = JSON.parse(data);
					var issuccess = obj.IsSuccess;
					var ErrorMessage=obj.ErrorMessage;
				
					if(issuccess==true)
					{
						sessionStorage.setItem('SearchList',data);
						sessionStorage.setItem('SearchListtype',"Auto");
						globalcountcontact=0;
						cards=[];
						$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/contactBroker.html",{transition: "none",reverse: false});
					}
					else if(issuccess==false)
					{
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html(ErrorMessage);
				    	$('#InfopopupAutoInsurance').popup('open');
							
						}
					else
						{
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html("Please try again.");
				    	$('#InfopopupAutoInsurance').popup('open');
						}	

					},        					
				
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					if(errorThrown!=""){	
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
				    	$('#InfopopupAutoInsurance').popup('open');
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
	 		 $('#InfopopupAutoInsurance').popup('open');
	 	 }
		 	
	});
               $('#labelfileInput').on("click", function (){
                                       $('#errordiv').text("");
                                       $('#ConfirmPictureInfopopup').popup('open');
                                       });
               
               $('#OpenGallery').on("click", function () {
                                    $('#ConfirmPictureInfopopup').popup('close');
                                    getdocImages("fileInput","getfileconversion","InfopopupAutoInsurance");
                                    });
               
               $('#OpenCamera').on("click", function () {
                                   $('#ConfirmPictureInfopopup').popup('close');
                                   getdocImagescamera("fileInput","getfileconversion","InfopopupAutoInsurance");
                                   });
	$('#OkbtnAutoInsurance').off("click").on("click", function() {
		$('#InfopopupAutoInsurance').popup('close');
	});
});
