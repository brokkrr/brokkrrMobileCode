$(document).on("pagebeforeshow","#personallinehomeInsurance_page",function(){
	
});

$(document).on("pageshow","#personallinehomeInsurance_page", function( event ) {
               CheckDeviceId(useridCust);
changeimg('cmplogo',RegisteredFor);
changefooterlogo('footerlogo',RegisteredFor);
            //   var hbcontent=getcontentheight();
           //    $('.ui-content').css('height',hbcontent);
$.mobile.loading("hide");
    $('#pautoInsurancePage').off("click").on("click", function() {
     $.mobile.loading("show");
     $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/personallineautoInsurance.html",{transition: "slide",reverse: false});
                                                                
    });

	
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
	var divEstimatedValue=$("#divEstimatedValue");

	var divLanguage=$("#divLanguage");
	
	var Insurance=0;
	
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

			// BindCompanyList();

	
	$('#ddlEstimatedValue').change(function() {
		var idx = this.selectedIndex;
		if(idx=="0")
		{
			
		}
		else 
		{
			
		}		
	});
	
  
	
	$('#ddlLanguage').change(function() {
		//var idx = this.selectedIndex;  
		$('#divLanguage').removeClass('ui-btn');
		if(idx=="0")
		{
		
		}
		else 
		{
	
		}		
	});
	
	
	$('#saveHomeInsurance').off("click").on("click", function() {
	    $.mobile.loading("show");
	    
		var zipid = $('#zipcode');
		var cityid = $('#txtcity');
		
		var IsInsured = $('#ddlInsurance');
	
 		var EstimatedValue1=$("#ddlEstimatedValue");
 		var Language1=$("#ddlLanguage");
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
	 		if (globalvalidaterequired3(zipid,"errorzip") & globalvalidaterequired3(cityid,"errorcity") &
                globalvalidaterequired6(IsInsured,divHometype)&
                globalvalidaterequired5(EstimatedValue1,divEstimatedValue) & globalvalidaterequired6(Language1,divLanguage))
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
	 		
	 		var IsInsured=$("#ddlInsurance option:selected").text();
	 		var IsInsured1=false;
	 		if(IsInsured=='Currently insured')
	 		{
	 			IsInsured1=true;
	 		}
	 		
	 		
            var CompanyName='';
	 		if(IsInsured1==false)
	 		{
	 			CompanyName='';
	 		}
	 	
            var CoverageExpires='';
	 		var EstimatedValue=$("#ddlEstimatedValue option:selected").text();
	 		var Language=$("#ddlLanguage option:selected").text();
	 		var Notes=$('#txtNote').val();
	 		var Latitude=$('#txtlat').val();
	 		var Longitude=$('#txtlang').val();
            var DeclarationDoc=$('#getfileconversion').val();
            var DocName= $('#fileInput').val();
                                         //   alert(DocName);
	 		$.ajax({		
				type: "POST",
				url: webserviceURL,
				data: {UserId:UserId,ZipCode:ZipCode,City:City,EstimatedValue:EstimatedValue,IsInsured:IsInsured1,CompanyName:CompanyName,CoverageExpires:CoverageExpires,Language:Language,Notes:Notes,Longitude:Longitude,Latitude:Latitude,DeclarationDoc:DeclarationDoc,DocName:DocName,ActionName:"DoSaveHomeInsuranceDetails"},
				success: function (data) {	
					var obj = JSON.parse(data);
		
					var issuccess = obj.IsSuccess;
					var ErrorMessage=obj.ErrorMessage;
				
					if(issuccess==true)
					{
						sessionStorage.setItem('SearchList',data);
						sessionStorage.setItem('SearchListtype',"Home");
						globalcountcontact=0;
						cards=[];
						$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/contactBroker.html",{transition: "none",reverse: false});
					}
					else if(issuccess==false)
					{
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html(ErrorMessage);
				    	$('#InfopopupHomeInsurance').popup('open');
							
						}
					else
						{
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html("Please try again.");
				    	$('#InfopopupHomeInsurance').popup('open');
						}	

					},        					
				
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					if(errorThrown!=""){	
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
				    	$('#InfopopupHomeInsurance').popup('open');
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
	 		 $('#InfopopupHomeInsurance').popup('open');
    	
	 	 }
		 	
	});
	
               $('#labelfileInput').on("click", function (){
                                       $('#errordiv').text("");
                                       $('#ConfirmPictureInfopopup').popup('open');
                                       });
               
               $('#OpenGallery').on("click", function () {
                                    $('#ConfirmPictureInfopopup').popup('close');
                                    getdocImages("fileInput","getfileconversion","InfopopupHomeInsurance");
                                    });
               
               $('#OpenCamera').on("click", function () {
                                   $('#ConfirmPictureInfopopup').popup('close');
                                   getdocImagescamera("fileInput","getfileconversion","InfopopupHomeInsurance");
                                   });
               
	$('#OkbtnHomeInsurance').off("click").on("click", function() {
		$('#InfopopupHomeInsurance').popup('close');
	});
	

});
