$(document).on("pagebeforecreate","#benefits_page", function (event) {
               if (strDevice!="iPad"){
               $("#SubIndustryName").attr("data-native-menu", "false");
               //  $("#editSICcode").attr("data-native-menu", "false");
               }
               
               });

$(document).on("pageshow","#benefits_page", function( event,ui ) {
              CheckDeviceId(useridCust);
               changeimg('cmplogo',RegisteredFor);
            
               var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }else{
               if(devicename=='iPhoneX'){
               hbcontent=hbcontent-25;
               }
                $('.ui-content').css('height',hbcontent);
              // hbcontent=stopPageOverflow(hbcontent);
               
               }
              //29Nov16
               var str=ui.prevPage.prop("id");
               //var n = str.indexOf("SubIndustryName");
               var d = str.indexOf("dialog");
               if(parseInt(d)>1){
               return false;
               }
               $('#SICcodeSelect').hide();
               var optgrp='<optgroup label=""></optgroup>';
               var Industrylist=sessionStorage.getItem('Industrylist');
               //alert(Industrylist);
               var obj=JSON.parse(Industrylist);
               var issuccess = obj.IsSuccess;
               var ErrorMessage=obj.ErrorMessage;
               
               if(issuccess==true)
               {
               var industry=obj.IndustryMaster;
            
               
               $('<option  />', {value: "0", text: "Select Industry"}).appendTo('#IndustryName');
               $('<option />', {value: "0", text: "Select NAICS Code"}).appendTo('#SubIndustryName');
                $('#SICcodeSelect').hide();
               $("#SubIndustryName option[value=0]").attr('selected', 'selected');
               $('#IndustryName').append(optgrp);
               $('<option  />', {value: "0", text: "I don't know"}).appendTo('#IndustryName');
               $.each(industry, function(i, ind) {
                      
                      $('<option />', {value: ind.IndustryId, text: ind.IndustryName}).appendTo('#IndustryName');
                      
                      });
               $('select').selectmenu('refresh', true);
               }
               //29Nov16 End
               
               
               
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
	var divEmployee=$("#divEmployee");
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
		 //BindCompanyList();

	/*01 Jan 2018*/
	/*$('#ddlInsurance').change(function() {
		var idx = this.selectedIndex;
		if(idx=="2")
		{
			$("div#divInsCmpName").show();
	    	//$("#InsCmpName").val('');
			//alert('Called : '+idx);
		}
		else
		{
			//$("div#divInsCmpName").show();
			$("div#divInsCmpName").hide();
		}
		
		
			
	    
	});*/
	/*01 Jan 2018*/
	
	$('#saveBenefitsInsurance').off("click").on("click", function() {
	    $.mobile.loading("show");
	    
		var zipid = $('#zipcode');
		var cityid = $('#txtcity');
		
		var IsInsured = $('#ddlInsurance');
		//var Company=$('#ddlCompanyName');/01 Jan 2018
		
		//var CoverageExpires1=$("#ddlCoverage");//01 Jan 2018
 		var Employee1=$("#ddlEmployee");
 		var Language1=$("#ddlLanguage");
		zipid.keyup(validatezip);

		function validatezip()
	 	{
			//alert('validatezip() called.');
	 		 if (globalvalidaterequired3(zipid,"errorzip") & globalvalidaterequired3(cityid,"errorcity")){
	 	        	return true;
	 	       }
	 	        else{
	 	        	return false;
	 	       	}
	 	}
	
	 	function validateFields(){

	 		if (globalvalidaterequired3(zipid,"errorzip") & globalvalidaterequired3(cityid,"errorcity") & /*globalvalidaterequired7(IsInsured,Company,divHometype) & globalvalidaterequired5(CoverageExpires1,divCoverage)*/ 
                globalvalidaterequired6(IsInsured,divHometype) & globalvalidaterequired5(Employee1,divEmployee) & globalvalidaterequired6(Language1,divLanguage))
	 		{
	         	return true;
	        }
	        else
	        {
	         	return false;
	        }
	 	}
	 	/* 01 Jan 2018
	 	function validateInsurance()
	 	{

	 		if(globalvalidaterequired4(IsInsured,Company,divHometype))
	 		{
	 			return true
	 		}
	 		else
	 		{
	 			return false;
	 		}
	 	}*/
	 	
	 	 if(validateFields())
		 {
                                                
                                                var IndustryID=$("#IndustryName option:selected").val();
                                                var SubIndustryList=[];
                                                
                                                $('#SubIndustryName :selected').each(function(){
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
                                                $('#InfopopupBenefits').popup('open');
                                                return false;
                                                }
                                                }
                                                
	 		//alert("Valid");
	 		var ZipCode=$('#zipcode').val();
	 		var City=$('#txtcity').val();
	 		var IsInsured=$("#ddlInsurance option:selected").text();
	 		var IsInsured1=false;
	 		if(IsInsured=='Currently insured')
	 		{
	 			IsInsured1=true;
	 		}
	 		//var CompanyName=$("#ddlCompanyName option:selected").text();// 01 Jan 2018
            
            var CompanyName='';
	 		if(IsInsured1==false)
	 		{
	 			CompanyName='';
	 		}
	 		
	 		//var CoverageExpires=$("#ddlCoverage option:selected").text();// 01 Jan 2018
            var CoverageExpires='';
	 		var Employee=$("#ddlEmployee option:selected").text();
	 		var Language=$("#ddlLanguage option:selected").text();
	 		var Notes=$("#txtNotes").val();
	 		var Latitude=$('#txtlat').val();
	 		var Longitude=$('#txtlang').val();
                                                
            var DeclarationDoc=$('#getfileconversion').val();
            var DocName= $('#fileInput').val();
	 		//alert(ZipCode+','+City+','+IsInsured+','+CompanyName+','+CoverageExpires+','+Employee+','+Language+','+Notes+','+Latitude+','+IsInsured1);
	 	
	 		
	 		$.ajax({		
				type: "POST",
				url: webserviceURL,
				data: {UserId:UserId,ZipCode:ZipCode,City:City,IsInsured:IsInsured1,InsuranceCompany:CompanyName,EmployeeStrength:Employee,CoverageExpires:CoverageExpires,Language:Language,Notes:Notes,Longitude:Longitude,Latitude:Latitude,IndustryId:IndustryID,SubIndustryId:SiccodeList,DeclarationDoc:DeclarationDoc,DocName:DocName,ActionName:"DoSaveBenefitInsuranceDetails"},
				success: function (data) {	
					var obj = JSON.parse(data);
					//alert('data '+ data);
					var issuccess = obj.IsSuccess;
					var ErrorMessage=obj.ErrorMessage;
				//alert('IsSuccess : '+issuccess);
					if(issuccess==true)
					{
						sessionStorage.setItem('SearchList',data);
						sessionStorage.setItem('SearchListtype',"Benefits");
						globalcountcontact=0;
						cards=[];
						$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/contactBroker.html",{transition: "none",reverse: false});
						//alert('issuccess' + issuccess)
					}
					else if(issuccess==false)
					{
						$.mobile.loading("hide"); //1.4.5
						jQuery("label[for='messagetext']").html(ErrorMessage);
				    	$('#InfopopupBenefits').popup('open');
							
						}
					else
						{
						$.mobile.loading("hide"); //1.4.5
						jQuery("label[for='messagetext']").html("Please try again.");
				    	$('#InfopopupBenefits').popup('open');
						}	

					},        					
				
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					if(errorThrown!=""){	
						$.mobile.loading("hide"); //1.4.5
						jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
				    	$('#InfopopupBenefits').popup('open');
					}
					else{					
					}	
				}			 			
			});
	 		
		 }
	 	 else
	 	 {
	 		 $.mobile.loading("hide"); //1.4.5*/
	 		 jQuery("label[for='messagetext']").html("Please validate details.");
	 		 $('#InfopopupBenefits').popup('open');
    	
	 	 }
		 	
	});
               $('#labelfileInput').on("click", function (){
                                       $('#errordiv').text("");
                                       $('#ConfirmPictureInfopopup').popup('open');
                                       });
               
               $('#OpenGallery').on("click", function () {
                                    $('#ConfirmPictureInfopopup').popup('close');
                                    getdocImages("fileInput","getfileconversion","InfopopupBenefits");
                                    });
               
               $('#OpenCamera').on("click", function () {
                                   $('#ConfirmPictureInfopopup').popup('close');
                                   getdocImagescamera("fileInput","getfileconversion","InfopopupBenefits");
                                   });
               
	
	$('#OkbtnBenefits').off("click").on("click", function() {
		$('#InfopopupBenefits').popup('close');
	});
});

function FillSicCodeBenefits()
{
 
    var IndId=$("#IndustryName option:selected").val();

    $('#SubIndustryName').empty();
    $('select').selectmenu('refresh', true);
    var optgrp='<optgroup label=""></optgroup>';
   
		  if(parseInt(IndId) >0)
          {
              $('#SICcodeSelect').show();
              $.ajax({
                     type: "POST",
                     url: webserviceURL,
                     data: {IndustryId:IndId,ActionName:"DoGetSubIndustryMaster"},
                     success: function (data) {
                     //   alert('data '+data);
                     var obj=JSON.parse(data);
                     var issuccess = obj.IsSuccess;
                     var ErrorMessage=obj.ErrorMessage;
                     
                     if(issuccess==true)
                     {
                     var SubIndustryMaster=obj.SubIndustryMaster;
                     if(strDevice!="iPad"){
                     $('<option />', {text: "Select NAICS Code"}).appendTo('#SubIndustryName');
                     }
                     else{
                     $('#SubIndustryName').append('<option value=0>Select NAICS Code</option>');
                     $("#SubIndustryName option[value=0]").attr('selected', 'selected');
                     }
                    
                    // $('<option />', {text: "Select SIC Code"}).appendTo('#SubIndustryName');
                     $('#SubIndustryName').append(optgrp);
                    
                     $.each(SubIndustryMaster, function(i, IndSubCat) {
                            
                            $('<option />', {value: IndSubCat.SubIndustryId, text: IndSubCat.SICCode+ '-'+ IndSubCat.SubIndustryName}).appendTo('#SubIndustryName');
                            
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
              
              $('#SubIndustryName').empty();
              $('<option  />', {value: "0", text: "Select NAICS Code"}).appendTo('#SubIndustryName');
              $('#SICcodeSelect').hide();
              $('select').selectmenu('refresh', true);
          }
		  
		  $('select').selectmenu('refresh', true);
    
}

function CountSicCodeBenefits()
{
     if (strDevice=="iPad"){
   // alert("CountSicCodeBenefits");
    var count=0;
    var selectedcount = $("#SubIndustryName").find(":selected").length;
    
    if(selectedcount <=0)
    {
        //alert('length '+ selectedcount);
        $("#SubIndustryName option[value=0]").remove();
        
        $('#SubIndustryName').prepend('<option value=0>Select NAICS Code</option>');
        $("#SubIndustryName option[value=0]").attr('selected', 'selected');
    }
    
    
    $('#SubIndustryName :selected').each(function(){
                                         
                                         
                                         if(parseInt($(this).val()) >0)
                                         {
                                         $("#SubIndustryName option[value=0]").remove();
                                         }
                                         });
     }
}
