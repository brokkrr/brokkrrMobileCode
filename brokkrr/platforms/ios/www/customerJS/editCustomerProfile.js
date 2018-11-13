$(document).on("pageshow","#CustomerProfileEditPage", function( event ) {
               CheckDeviceId(useridCust);
               var hbcontent=getcontentheight();
               $('.ui-content').css('height',hbcontent);
	var UserId="";
	var firstname="";
	var lastname="";
	var profilepic="";
	var prevImg="";
	
	var HouseType1="";
	var Address1="";
	var IsHavingCar1="";
	var NoOfCars1="";
	var TypeOfEmployment1="";
	var Companyname1="";
	
	 $('#Houseaddress').prop('disabled', false);
	 $('#inpNoofcars').prop('disabled', false);

    $.mobile.loading("show");
    sessionStorage.setItem('CustomerProfilephotoupdated','false');
    var max_chars = 5;
	$('#txtzip').keyup( function(e){
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
	
	 var max_phcount =10;
		$('#txtphone').keyup( function(e){
		    if ($(this).val().length >= max_phcount) { 
		        $(this).val($(this).val().substr(0, max_phcount));
		    }
		});

    var user=sessionStorage.getItem('CustomerUser');
    if(user===null || user=='')
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
		
	}

	var obj=JSON.parse(user);
	var issuccess = obj.IsSuccess;
	var ErrorMessage=obj.ErrorMessage;
	
	if(issuccess==true)
		{
		var UserDetails=obj.UserDetails;
		
		$.each(UserDetails, function (i, userobj) {
			var profilepic,IsAvailable;
			getMenuDetailsCustomer(menuCustFirstname,menuCustLastname,menuCustProfilepic);
               
			 UserId=userobj.UserId;
			 firstname=userobj.FirstName;
			 lastname=userobj.LastName;
			 profilepic=userobj.ProfilePictureImg;
			
			 $("#txtfname").val(userobj.FirstName);
			 $("#txtlname").val(userobj.LastName);
			 
			$("#txtphone").val(userobj.PhoneNo);
			$("#email").val(userobj.EmailId);
			$("#txtzip").val(userobj.PinCode);
			$("#txtzip").keyup();
			
			HouseType1=userobj.HouseType;
			Address1=userobj.Address;
   
if(userobj.IsHavingCar=='True')
			{
				$("input#inpNoofcars").val(userobj.NoOfCars);
               $("#optcars option[value=true]").attr('selected', 'selected');
			}
			else
			{
               $("#optcars option[value=false]").attr('selected', 'selected');
				$("#divNoofcars").hide();
			}
                $("#optcars option[value=0]").remove();
			$('select').selectmenu('refresh',true);
			
			
			if(userobj.HouseType=='Rent')
			{
               $('select[name^="houseType"] option[value="Rent"]').attr("selected","selected");
			}
			else if(userobj.HouseType=='Own')
			{
				$('select[name^="houseType"] option[value="Own"]').attr("selected","selected");
			}
			
			$("input#Houseaddress").val(userobj.Address);
               $("#houseType option[value=0]").remove();
			$('select').selectmenu('refresh',true);
			
			if(userobj.TypeOfEmployment=='Employed')
			{
				$('select[name^="Occupation"] option[value="Employed"]').attr("selected","selected");
			}
			else if(userobj.TypeOfEmployment=='Self Employed')
			{
				$('select[name^="Occupation"] option[value="Self Employed"]').attr("selected","selected");
					
			}
               $("#Occupation option[value=0]").remove();
		$('select').selectmenu('refresh',true);
			$("input#Companyname").val(userobj.CompanyName);


		});
		
		$.mobile.loading("hide");
	}
	else
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
	}
	
	$('#optcars').change(function() {

		var idx = this.selectedIndex;   
		if(idx=="0")
		{
			$("input#inpNoofcars").val('1');
			$("#divNoofcars").show();
	    	
		}
		else if(idx=="1")
		{
			$("#divNoofcars").hide();
		}
	
	});

	$.mobile.loading("hide");

	 $('#customerUpdateProfile').off("click").on("click", function() {
		    $.mobile.loading("show");

	var fnameid=$('#txtfname');
	 var phoneid = $('#txtphone');
	 var zipid = $('#txtzip');
	 var HouseType=$("#houseType option:selected").val();
	 var IsHavingCar=$("#optcars option:selected").val();

	 
	 var NoOfCars='';
	if(IsHavingCar=="true")
		{
		NoOfCars=$('#inpNoofcars').val(); 
		}

	 var TypeOfEmployment=$("#Occupation option:selected").val();
	 var Companyname=$('#Companyname').val();
	 	profilepic=$('#edittxtprofilepic').val();

	 	fnameid.keyup(validatefirstname);
	 	phoneid.keyup(validatephone);
		zipid.keyup(validatepincode);
		function validatepincode()
		{
			
			 if (globalvalidaterequired2(zipid)){
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
		function validatefirstname()
		{
			 if (globalvalidaterequired2(fnameid)){
		        	return true;
		       }
		        else{
		        	return false;
		       	}
		}
		
				
		function validateFields(){
			if (globalvalidaterequired2(zipid) & globalvalidaterequired2(phoneid) & globalvalidaterequired2(fnameid)){
	        	return true;
	       }
	        else{
	        	return false;
	       	}	
		}

		 if(validateFields())
			{
			 var Result={
		 			  "UserDetails" : [
		 			    {
		 			    	 "UserId":UserId,
		 			    	 "FirstName":$('#txtfname').val(),
			 			     "LastName":$('#txtlname').val(),
		 			         "Address":$('#Houseaddress').val(),
		 			         "City":$('#txtcity').val(),
		 			         "PinCode":$('#txtzip').val(),
		 			         "MobNo":"",
		 			         "State":"",
		 			         "Country":"",
		 			         "HouseType":HouseType,
		 			         "AddressOfHouse":"",
		 			         "IsHavingCar":IsHavingCar,
		 			         "NoOfCars":NoOfCars,
		 			         "TypeOfEmployment":TypeOfEmployment,
		 			         "CompanyName":Companyname,
		 			         "DOB":"",
		 			         "ProfilePicture":profilepic,
		 			         "PhoneNo":$('#txtphone').val()
		 			        
		 			    }
		 			  ]
		 			};
 
			var resp= JSON.stringify(Result);
			var profileFlag=sessionStorage.getItem('CustomerProfilephotoupdated');

		$.ajax({		
 			type: "POST",
 			url: webserviceURL,
 			data: {Result:JSON.stringify(Result),ActionName:"DoUpdateProfileCustomer",IsProfilePicUpdated:profileFlag},
 			success: function (data) {	
 			   var obj = JSON.parse(data);
 				var issuccess = obj.IsSuccess;
 				var ErrorMessage=obj.ErrorMessage;
 				
 				if(issuccess==true)
 					{
 					$.mobile.loading("hide"); 
 					var UserDetails=obj.UserDetails;
 				
 					$.each(UserDetails, function (i, res) {
 						var name=res.FirstName+' '+res.LastName;
 						sessionStorage.setItem('CustomerUser',data); 	
 						$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/profileCustomer.html",{transition: "slide",reverse: false});
 						
 							
 					 });
 					}
 				else if(issuccess==false)
 				{
 					$.mobile.loading("hide");
 					jQuery("label[for='messagetext']").html(ErrorMessage);
 			    	$('#InfopopupEditCustomerProfile').popup('open');
 					}
 				else
 					{
 					$.mobile.loading("hide");
 					jQuery("label[for='messagetext']").html("Error Occured,Please try again.");
 			    	$('#InfopopupEditCustomerProfile').popup('open');
 					}	

 				},        					
 			error : function(XMLHttpRequest, textStatus, errorThrown) {
 				if(errorThrown!=""){	
 					$.mobile.loading("hide");
 					jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
 			    	$('#InfopopupEditCustomerProfile').popup('open');
 			    	
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
		    	$('#InfopopupEditCustomerProfile').popup('open');
		    	
		    }
	 });  
	    
               
$('#profilePhotoimg').on("click", function (){
    $('#bCustConfirmPictureInfopopup').popup('open');
});

var img = "";
	
$('#OpenGallerycust').on("click", function () {
    $('#bCustConfirmPictureInfopopup').popup('close');
    getImages("profilepicprofile","edittxtprofilepic","InfopopupEditCustomerProfile");
});
	      
$('#OpenCameracust').on("click", function () {
    $('#bCustConfirmPictureInfopopup').popup('close');
    getImagescamera("profilepicprofile","edittxtprofilepic","InfopopupEditCustomerProfile");
});
               
$('#OkbtnEditCustomerProfile').off("click").on("click", function() {
    $('#InfopopupEditCustomerProfile').popup('close');
});
               
});
