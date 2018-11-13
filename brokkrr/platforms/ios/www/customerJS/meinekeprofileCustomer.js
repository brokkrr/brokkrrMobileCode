$(document).on("pageshow","#meinekeCustomerProfilePage", function( event ) {
            /*   if (devicename=='iPhone4s'){
               $('#meinekeCustomerProfilePage').css('overflow','scroll');
               }*/
            
    changeimg('cmplogo',RegisteredFor);
    changefooterlogo('footerlogo',RegisteredFor);
    var hbcontent=getcontentheight();
    $('.ui-content').css('height',hbcontent);
          // getIndustryList();
    CustomerBadgesInt=setInterval(function(){BadgesCount(UserId);}, 2000);
    IntLatestmsgCustomer=setInterval(function(){
        getLatestmsgCount(UserId,"Customer");//11NOV16
        getLatestvdocnt(UserId);
    }, 2000);

    checkConnection('InfopopupProfileCustomer');
    var profilepic="";
	var UserId="";
	var FirstName1="";
	var LastName1="";
	var PhoneNo1="";
	var Zipcode1="";

    $.mobile.loading("show");
   
               
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
			//$("#HouseType").text(userobj.HouseType);
			$("#Address").text(userobj.Address);
			//$("#NumberofCars").text(userobj.NoOfCars);
			//$("#Occupation").text(userobj.TypeOfEmployment);
			$("#CompanyName").text(userobj.CompanyName);
            $("#Website").text(userobj.Website);
            $("#NumberofEmployees").text(userobj.NoOfEmp);
            $("#EstPremium").text(userobj.EstPremium);
		});

		$.mobile.loading("hide");
	}
	else
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
	}
	
	CheckDeviceId(useridCust);
	$.mobile.loading("hide");

	
	 $('#meditCustomer').off("click").on("click", function() {
		 $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/meinekeeditCustomerProfile.html",{transition: "slide",reverse: false});
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
	 
    $('#OkbtnProfileCustomer').off("click").on("click", function() {
          $('#InfopopupProfileCustomer').popup('close');
    });

    $('#meinkefooterSearch').off("click").on("click", function() {
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/meinekelines.html",{transition: "slide",reverse: false});
        
    });
});
