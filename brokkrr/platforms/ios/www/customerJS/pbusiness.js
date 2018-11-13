$(document).on("pagebeforecreate","#personallinebusinessInsurance_page", function (event) {
               if (strDevice!="iPad"){
               $("#BusinessSubIndustryName").attr("data-native-menu", "false");

               }
              
               });

$(document).on("pageshow","#personallinebusinessInsurance_page", function( event,ui ) {
               CheckDeviceId(useridCust);
changeimg('cmplogo',RegisteredFor);
changefooterlogo('footerlogo',RegisteredFor);
   /*
var hbcontent=getcontentheight();
$('.ui-content').css('height',hbcontent);*/
               var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }else{
               
               hbcontent=stopPageOverflow(hbcontent);
               
               }
               
               var str=ui.prevPage.prop("id");
               var d = str.indexOf("dialog");
               if(parseInt(d)>1){
               return false;
               }
                $('#SICcodeSelect').hide();
                var optgrp='<optgroup label=""></optgroup>';
               var Industrylist=sessionStorage.getItem('Industrylist');
               var obj=JSON.parse(Industrylist);
               var issuccess = obj.IsSuccess;
               var ErrorMessage=obj.ErrorMessage;
               
               if(issuccess==true)
               {
               var industry=obj.IndustryMaster;
               $('<option />', {value: "0", text: "Select Industry"}).appendTo('#BusinessIndustryName');
               $('<option />', {value: "0", text: "Select NAICS Code"}).appendTo('#BusinessSubIndustryName');
               
               $("#BusinessSubIndustryName option[value=0]").attr('selected', 'selected');
               $('#BusinessIndustryName').append(optgrp);
                $('<option  />', {value: "0", text: "I don't know"}).appendTo('#BusinessIndustryName');
               $.each(industry, function(i, ind) {
                      
                      $('<option />', {value: ind.IndustryId, text: ind.IndustryName}).appendTo('#BusinessIndustryName');
                      
                      });
               $('select').selectmenu('refresh', true);
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
	var divRevenue=$("#divRevenue");
	var divCoverage=$("#divCoverage");
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
	
		// BindCompanyList();
	
	$('#saveBusinessInsurance').off("click").on("click", function() {
	    $.mobile.loading("show");
	    
		var zipid = $('#zipcode');
		var cityid = $('#txtcity');
		
		var IsInsured = $('#ddlInsurance');
		var Company=$('#ddlCompanyName');
		
		var CoverageExpires1=$("#ddlCoverage");
 		var Revenue1=$("#ddlRevenue");
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
		/* 01 Jan 2018
		function validateCompany()
	 	{
	 		 if (globalvalidaterequired4(IsInsured,Company,divHometype))
	 		 {
	 	        	return true;
	 	     }
	 	     else
	 	     {
	 	        	return false;
	 	     }
	 	}*/
	
		
	 	function validateFields(){
	 		if (globalvalidaterequired3(zipid,"errorzip") & globalvalidaterequired3(cityid,"errorcity") & globalvalidaterequired5(CoverageExpires1,divCoverage) & globalvalidaterequired5(Revenue1,divRevenue) & globalvalidaterequired6(Language1,divLanguage))
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
                                                //29Nov16
                                                var IndustryID=$("#BusinessIndustryName option:selected").val();
                                                var SubIndustryList=[];
                                                
                                                $('#BusinessSubIndustryName :selected').each(function(){
                                                                                     if(parseInt($(this).val()) >0)
                                                                                     {
                                                                                     SubIndustryList.push($(this).val());
                                                                                     }
                                                                                     });
                                                var SiccodeList=SubIndustryList.toString();
                                                if(parseInt(IndustryID)!=0){
                                                if(SubIndustryList==""){
                                                
                                                $.mobile.loading("hide");
                                                jQuery("label[for='messagetext']").html("Please select NAICS code.");
                                                $('#InfopopupBusiness').popup('open');
                                                return false;
                                                }
                                                }
                                                
	 		var ZipCode=$('#zipcode').val();
	 		var City=$('#txtcity').val();
	 		var IsInsured=$("#ddlInsurance option:selected").text();
	 		var IsInsured1=false;
	 		if(IsInsured=='Currently insured')
	 		{
	 			IsInsured1=true;
	 		}

            var CompanyName='';

	 		var CoverageExpires=$("#ddlCoverage option:selected").text();
	 		var Revenue=$("#ddlRevenue option:selected").text();
	 		var Language=$("#ddlLanguage option:selected").text();
	 		var Notes=$("#txtNotes").val();
	 		var SICCode='';
	 		var Latitude=$('#txtlat').val();
	 		var Longitude=$('#txtlang').val();
	 		
	 		//alert(ZipCode+','+City+','+IsInsured+','+CompanyName+','+CoverageExpires+','+Revenue+','+Language+','+Notes+','+Latitude+','+IsInsured1);
	 	
	 		
	 		$.ajax({		
				type: "POST",
				url: webserviceURL,
				data: {UserId:UserId,ZipCode:ZipCode,City:City,IsInsured:IsInsured1,InsuranceCompany:CompanyName,SICCode:SICCode,Revenue:Revenue,CoverageExpires:CoverageExpires,Language:Language,Notes:Notes,Longitude:Longitude,Latitude:Latitude,IndustryId:IndustryID,SubIndustryId:SiccodeList,ActionName:"DoSaveBusinessInsuranceDetails"},
				success: function (data) {	
					var obj = JSON.parse(data);
					//alert('data '+ data);
					var issuccess = obj.IsSuccess;
					var ErrorMessage=obj.ErrorMessage;
				
					if(issuccess==true)
					{
						sessionStorage.setItem('SearchList',data);
						sessionStorage.setItem('SearchListtype',"Business");
						globalcountcontact=0;
						cards=[];
						$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/contactBroker.html",{transition: "none",reverse: false});
						//alert('issuccess' + issuccess)
					}
					else if(issuccess==false)
					{
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html(ErrorMessage);
				    	$('#InfopopupBusiness').popup('open');
							
						}
					else
						{
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html("Please try again.");
				    	$('#InfopopupBusiness').popup('open');
						}	

					},        					
				
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					if(errorThrown!=""){	
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
				    	$('#InfopopupBusiness').popup('open');
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
	 		 $('#InfopopupBusiness').popup('open');
    	
	 	 }
		 	
	});
	
	
	$('#OkbtnBusiness').off("click").on("click", function() {
		$('#InfopopupBusiness').popup('close');
	});
});

function pFillSicCodeBusiness()
{
    
    var IndId=$("#BusinessIndustryName option:selected").val();
    $('#BusinessSubIndustryName').empty();
		  if(parseInt(IndId) >0)
          {
                $('#SICcodeSelect').show();
              $.ajax({
                     type: "POST",
                     url: webserviceURL,
                     data: {IndustryId:IndId,ActionName:"DoGetSubIndustryMaster"},
                     success: function (data) {
                     //alert('data '+data);
                     var obj=JSON.parse(data);
                     var issuccess = obj.IsSuccess;
                     var ErrorMessage=obj.ErrorMessage;
                     
                     if(issuccess==true)
                     {
                     var SubIndustryMaster=obj.SubIndustryMaster;
                     //alert(SubIndustryMaster);
                     if(strDevice!="iPad"){
                     $('<option />', {text: "Select NAICS Code"}).appendTo('#BusinessSubIndustryName');
                     }
                     else{
                     $('#BusinessSubIndustryName').append('<option value=0>Select NAICS Code</option>');
                     $("#BusinessSubIndustryName option[value=0]").attr('selected', 'selected');
                     }

                     $.each(SubIndustryMaster, function(i, IndSubCat) {
                            
                            $('<option />', {value: IndSubCat.SubIndustryId, text: IndSubCat.SICCode+ '-'+ IndSubCat.SubIndustryName}).appendTo('#BusinessSubIndustryName');
                            
                            });
                     $('select').selectmenu('refresh', true);
                     
                     }
                     },
                     error : function(XMLHttpRequest, textStatus, errorThrown) {
                     
                     }
                     });
          }
          else
          {
              
              $('#BusinessSubIndustryName').empty();
              $('<option  />', {value: "0", text: "Select NAICS Code"}).appendTo('#BusinessSubIndustryName');
              $("#BusinessSubIndustryName option[value=0]").attr('selected', 'selected');
              $('#SICcodeSelect').hide();
              
          }
		  
		  $('select').selectmenu('refresh', true);
    
}

function pCountSicCodeBusiness()
{
     if (strDevice=="iPad"){
    var count=0;
    var selectedcount = $("#BusinessSubIndustryName").find(":selected").length;
    
    if(selectedcount <=0)
    {
        $("#BusinessSubIndustryName option[value=0]").remove();
        $('#BusinessSubIndustryName').prepend('<option value=0>Select NAICS Code</option>');
        $("#BusinessSubIndustryName option[value=0]").attr('selected', 'selected');
    }
    $('#BusinessSubIndustryName :selected').each(function(){      
                                         if(parseInt($(this).val()) >0)
                                         {
                                         $("#BusinessSubIndustryName option[value=0]").remove();
                                         }
                                         });
     }
}
