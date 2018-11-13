$(document).on("pageshow","#Home_Page", function( event ) {
               CheckDeviceId(useridCust);
    var hbcontent=getcontentheight();
    $('.ui-content').css('height',hbcontent);
               
	getCompanyList();
    getIndustryList(RegisteredFor);
    GetIndustrySICCodeList("");
	 var user=sessionStorage.getItem('CustomerUser');
	    if(user===null || user=='')
		{
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
			
		}
		if(menuCustFirstname!="")
        {
			$("#name").text(menuCustFirstname);
            getMenuDetailsCustomer(menuCustFirstname,menuCustLastname,menuCustProfilepic);
		}
		else
		{
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
		}

		 $('#ViewCustomerProfile').off("click").on("click", function() {
			 $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/profileCustomer.html",{transition: "slide",reverse: false});
		 });
		
});
