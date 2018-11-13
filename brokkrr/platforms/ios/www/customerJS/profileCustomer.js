$(document).on("pageshow","#CustomerProfilePage", function( event ) {
             /*  if (devicename=='iPhone4s'){
               $('#CustomerProfilePage').css('overflow','scroll');
               }*/
               
    CustomerBadgesInt=setInterval(function(){BadgesCount(UserId);}, 2000);
    IntLatestmsgCustomer=setInterval(function(){
        getLatestmsgCount(UserId,"Customer");//11NOV16
        getLatestvdocnt(UserId);
    }, 2000);
              // alert(device.name);
    checkConnection('InfopopupProfileCustomer');
    var profilepic="";
	var UserId="";
	var FirstName1="";
	var LastName1="";
	var PhoneNo1="";
	var Zipcode1="";

    $.mobile.loading("show");
               
    /*var hbcontent=getcontentheight();
    $('.ui-content').css('height',hbcontent);*/
               var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }else{
               
               hbcontent=stopPageOverflow(hbcontent);
               
               }
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
            UserId=userobj.UserId;
            useridCust=userobj.UserId;
			FirstName1=userobj.FirstName;
			LastName1=userobj.LastName;
               if(userobj.ProfilePictureImg != '')
               {
               profilepic=userobj.ProfilePictureImg+'?'+Math.random();
               }
               else
               {
               
               profilepic=dcustomerimg;
               
               }
            menuCustProfilepic=profilepic;
            menuCustFirstname=FirstName1;
            menuCustLastname=LastName1;
            
            getMenuDetailsCustomer(menuCustFirstname,menuCustLastname,menuCustProfilepic);

			$("#custname").text(userobj.FirstName + ' '+ userobj.LastName);
			$("#phone").text(userobj.PhoneNo);
			
			PhoneNo1=userobj.PhoneNo;
			$("#zip").text(userobj.PinCode);
			Zipcode1=userobj.PinCode;
			
			$("#email").text(userobj.EmailId);
			$("#HouseType").text(userobj.HouseType);
			$("#Address").text(userobj.Address);
			$("#NumberofCars").text(userobj.NoOfCars);
			$("#Occupation").text(userobj.TypeOfEmployment);
			$("#CompanyName").text(userobj.CompanyName);
		});

		$.mobile.loading("hide");
	}
	else
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
	}
	
	CheckDeviceId(useridCust);
	$.mobile.loading("hide");

	
	 $('#editCustomer').off("click").on("click", function() {
		 $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/editCustomerProfile.html",{transition: "slide",reverse: false});
	 });
	 
	 $('input[type=radio][name=optcars]').change(function() {
	        if (this.value == 'true') {
	        	$("#divCars").show();
	        	$("input#inpNoofcars").val('1');
	        }
	        else if (this.value == 'false') {
	        	$("#divCars").hide();
	        }
	    });
	 
	 
	 ////////////////////////////////////////////////////// For Saving Details //////////////////////////////////
	 
	 $('#UpdateCustomerProfile').off("click").on("click", function() {
		 $.mobile.loading("show");
	
	 var HouseType=$('input:radio[name=optHouse]:checked').val();
	 var Address=$('#Address').val();
	 var IsHavingCar=$('input:radio[name=optcars]:checked').val();
	 var NoOfCars='';
	
	 if($('input:radio[name=optcars]:checked').val() == "true"){
		 NoOfCars=$('#inpNoofcars').val();
	 }
	 var TypeOfEmployment='';
	 
	 if($('input:radio[name=optEmployed]:checked').val() == "Employed"){
		 TypeOfEmployment='Employed';
	 }
	 else if($('input:radio[name=optEmployed]:checked').val() == "Self Employed"){
		 TypeOfEmployment='Self Employed';
	 }
	 var Companyname=$('#companyname').val();
                                                 
		  var Result={
		 			  "UserDetails" : [
		 			    {
		 			    	 "UserId":UserId,
		 			    	 "FirstName":FirstName1,
			 			     "LastName":LastName1,
		 			         "Address":Address,
		 			         "City":"",
		 			         "PinCode":Zipcode1,
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
		 			         "ProfilePicture":"",
		 			         "PhoneNo":PhoneNo1
		 			        
		 			    }
		 			  ]
		 			};
			 
			var resp= JSON.stringify(Result);

		$.ajax({		
			type: "POST",
			url: webserviceURL,
			data: {Result:JSON.stringify(Result),ActionName:"DoUpdateProfileCustomer",IsProfilePicUpdated:false},
			success: function (data) {	
			   var obj = JSON.parse(data);
			
				var issuccess = obj.IsSuccess;
				var ErrorMessage=obj.ErrorMessage;
				
				if(issuccess==true)
					{
					$.mobile.loading("hide"); 
					var UserDetails=obj.UserDetails;
					sessionStorage.setItem('CustomerUser',data);
					$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/meinekelines.html",{transition: "slide",reverse: false});
					}
				else if(issuccess==false)
				{

					$.mobile.loading("hide");
					jQuery("label[for='messagetext']").html(ErrorMessage);
			    	$('#InfopopupProfileCustomer').popup('open');
					}
				else
					{
					$.mobile.loading("hide");
					jQuery("label[for='messagetext']").html("Error Occured,Please try again.");
			    	$('#InfopopupProfileCustomer').popup('open');
					}	

				},        					
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if(errorThrown!=""){
					$.mobile.loading("hide");
					jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
			    	$('#InfopopupProfileCustomer').popup('open');
			    	
				}
				else{					
				}	
			}			 			
		});
	
	 }); 
	 //End of Saving details
    $('#OkbtnProfileCustomer').off("click").on("click", function() {
          $('#InfopopupProfileCustomer').popup('close');
    });
               
     $('#footerSearch').off("click").on("click", function() {
           $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/meinekelines.html",{transition: "slide",reverse: false});
     });
    
   
});
