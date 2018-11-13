$(document).on("pageshow","#lifeInsurance_page", function( event ) {
               CheckDeviceId(useridCust);
            /*   var hbcontent=getcontentheight();
               $('.ui-content').css('height',hbcontent);*/
               changeimg('cmplogo',RegisteredFor); 
               var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }else{
               
               hbcontent=stopPageOverflow(hbcontent);
               
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
	
	var divHometype=$("#divHometype");
	var divFaceValue=$("#divFaceValue");
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

	 //BindCompanyList();
               
/*01 Jan 2018*/
/*
	$('#ddlInsurance').change(function() {
		var idx = this.selectedIndex;    
		
		if(idx=="1")
		{
			$("div#divInsCmpName").show();
			
		}
	
	});
*/
/*01 Jan 2018*/
	
	$('#saveLifeInsurance').off("click").on("click", function() {	
        
	    $.mobile.loading("show");
	    
		var zipid = $('#zipcode');
		var cityid = $('#txtcity');
		
		//var CoverageExpires1=$("#ddlCoverage");//01 Jan 2018
 		var FaceValue1=$("#ddlFaceValue");
 		var Language1=$("#ddlLanguage");
		
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
	 		
	 		if (globalvalidaterequired3(zipid,"errorzip") & globalvalidaterequired3(cityid,"errorcity") & /*globalvalidaterequired5(CoverageExpires1,divCoverage) &*/ globalvalidaterequired5(FaceValue1,divFaceValue) & globalvalidaterequired6(Language1,divLanguage))
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
	 		var IsInsured1=false;
	 		var CompanyName='';	 		
	 		//var CoverageExpires=$("#ddlCoverage option:selected").text();//01 Jan 2018
            var CoverageExpires='';
	 		var FaceValue=$("#ddlFaceValue option:selected").text();
	 		var Language=$("#ddlLanguage option:selected").text();
	 		var Notes=$("#txtNotes").val();
	 		var Latitude=$('#txtlat').val();
	 		var Longitude=$('#txtlang').val();
            var DeclarationDoc=$('#getfileconversion').val();
            var DocName= $('#fileInput').val();
                                            
	 		$.ajax({		
				type: "POST",
				url: webserviceURL,
				data: {UserId:UserId,ZipCode:ZipCode,City:City,IsInsured:IsInsured1,InsuranceCompany:CompanyName,FaceValue:FaceValue,CoverageExpires:CoverageExpires,Language:Language,Notes:Notes,Longitude:Longitude,Latitude:Latitude,DeclarationDoc:DeclarationDoc,DocName:DocName,ActionName:"DoSaveLifeInsuranceDetails"},
				success: function (data) {	
					var obj = JSON.parse(data);
					//alert('data '+ data);
					var issuccess = obj.IsSuccess;
					var ErrorMessage=obj.ErrorMessage;
				
					if(issuccess==true)
					{
						sessionStorage.setItem('SearchList',data);
						sessionStorage.setItem('SearchListtype',"Life");
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
