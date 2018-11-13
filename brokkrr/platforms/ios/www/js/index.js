$.mobile.pushStateEnabled = false;
/*
$(document).bind("mobileinit", function() {
                 $.mobile.allowCrossDomainPages = true;
                 $.support.cors = true;
                 $.mobile.buttonMarkup.hoverDelay = 50;
                 });*/

$(document).on("pagebeforecreate","#indexPage", function (event) {
               autoLogin();
    });

$(document).on("pageshow","#indexPage,#brokerPage,#SignupBroker_Page", function( event ,ui) {
 
    sessionStorage.setItem("selectedcompany","Brokkrr");
	$('#customerBtn').off("click").on("click", function() {
		
	     $.mobile.loading("show"); 
	     $( ":mobile-pagecontainer" ).pagecontainer( "change", "customer/customer.html",{transition: "slide",reverse: false});
	 });
   
	
	$('#brokerBtn').off("click").on("click", function() {
		
	     $.mobile.loading("show"); 
	     $( ":mobile-pagecontainer" ).pagecontainer( "change", "broker/broker.html",{transition: "slide",reverse: false});
	 });
	
	//Broker.html
	
	$('#brokerLoginBtn').off("click").on("click", function() {
		
	      $.mobile.loading("show"); 
	      $( ":mobile-pagecontainer" ).pagecontainer( "change", "brokerLogin.html",{transition: "slide",reverse: false});
	      $("[data-position='fixed']").fixedtoolbar('hide');
	 });
	$('#brokerSignupBtn').off("click").on("click", function() {
		
	      $.mobile.loading("show"); 
	      $( ":mobile-pagecontainer" ).pagecontainer( "change", "brokerSignup.html",{transition: "slide",reverse: false});
	 });
	
	$('#borkerloginbackBtn').off("click").on("click", function() {
	      $("#borkerloginbackBtn").attr('class','backbtnArrow');//17Mar17
          $("#borkerloginbackBtn" ).toggle( "highlight" );//17Mar17
	      $.mobile.loading("show");
	      $( ":mobile-pagecontainer" ).pagecontainer( "change", "../../www/main.html",{transition: "slide",reverse: true});
	      
	 });
//meineke customer
            
$('#mcustomerbtn').off("change").on("change", function() {
    var selectedcompany=$("#mddlselectcompany option:selected").text();
    if(selectedcompany==null||selectedcompany==""||selectedcompany==undefined||selectedcompany=="Select for your association"){
        selectedcompany="Brokkrr";
    }
    sessionStorage.setItem("selectedcompany",selectedcompany);
  //  alert(selectedcompany);
    $.mobile.loading("show");
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "customerSignup.html",{transition: "slide",reverse: false});
    $("[data-position='fixed']").fixedtoolbar('hide');
});

//Customer.html
	
	$('#customerLoginBtn').off("click").on("click", function() {		
	      $.mobile.loading("show"); 
	      $( ":mobile-pagecontainer" ).pagecontainer( "change", "customerLogin.html",{transition: "slide",reverse: false});
	      $("[data-position='fixed']").fixedtoolbar('hide');
	 });
	

	$('#customerSignupBtn').off("click").on("click", function() {
		
	      $.mobile.loading("show"); 
	      $( ":mobile-pagecontainer" ).pagecontainer( "change", "customerSignup.html",{transition: "slide",reverse: false});
	 });
	

	$('#CustomerloginbackBtn').off("click").on("click", function() {
              $("#CustomerloginbackBtn").attr('class','backbtnArrow');//17Mar17
              $("#CustomerloginbackBtn" ).toggle( "highlight" );//17Mar17
		      $.mobile.loading("show");
		      $( ":mobile-pagecontainer" ).pagecontainer( "change", "../../www/main.html",{transition: "slide",reverse: true});
		 });
	
	$('#Okbtn').off("click").on("click", function() {
		$('#Infopopup').popup('close');
	});
    
 });
/*Yogita*/
 function autoLogin()
 {
     var userBroker=localStorage.getItem('BrokerUser');
     var userCustomer=localStorage.getItem('CustomerUser');
     var DeviceID=localStorage.getItem('DeviceID');
     //alert("autoLogin: " +DeviceID)
     var isexist='';
     
     if(userBroker!=null){
         
         var obj = JSON.parse(userBroker);
         var UserDetails=obj.UserDetails;
         
         $.each(UserDetails, function (i, res) {
                $.mobile.loading("hide");
                
                // alert(res.UserId);
                $.ajax({
                      
                       type: "POST",
                       url: webserviceURL,
                       data: {UserId:res.UserId,ActionName:"DoCheckUserExist"},
                       success: function (data) {
                       //alert("DoCheckUserExist"+data);
                       var obj = JSON.parse(data);
                       var issuccess = obj.IsSuccess;
                       var response=obj.Response;
                       //isexist = obj.Response[0].IsExists;
                       var IsAvailablebroker=obj.Response[0].IsAvailable;
                     //  alert(IsAvailablebroker);
                       if(response.length>0){
                       sessionStorage.setItem("IsAvailable",IsAvailablebroker);
                       if(res.IsUpdateProfile=="True")
                       {
                       SetDeviceIdForiOS(res.UserId);//DoSetDeviceId
                       sessionStorage.setItem('BrokerUser',userBroker);
                       localStorage.setItem('BrokerUser',userBroker);
                       setInitialVariable();
                       
                       $( ":mobile-pagecontainer" ).pagecontainer( "change", "broker/profileBroker.html",{transition: "none"});
                       }
                       else
                       {
                       
                       sessionStorage.setItem('BrokerUser',userBroker);
                       localStorage.setItem('BrokerUser',userBroker);
                       setInitialVariable();
                       getIndustryList(RegisteredFor);
                       GetIndustrySICCodeList("");
                       $( ":mobile-pagecontainer" ).pagecontainer( "change", "broker/brokerSignupNext.html",{transition: "none"});
                       }
                       
                       }
                       else{
                            $( ":mobile-pagecontainer" ).pagecontainer( "change", "main.html",{transition: "none"});
                       }
                       
                       },
                       error : function(XMLHttpRequest, textStatus, errorThrown) {
                       
                       }
                       
                       });
               
               
                
                });
     }
     
     
     if(userCustomer!=null){
         var obj = JSON.parse(userCustomer);
         var UserDetails=obj.UserDetails;
         
         $.each(UserDetails, function (i, res) {
                $.mobile.loading("hide");
               
                $.ajax({
                       type: "POST",
                       url: webserviceURL,
                       data: {UserId:res.UserId,ActionName:"DoCheckUserExist"},
                       success: function (data) {
                       
                       var obj = JSON.parse(data);
                       var issuccess = obj.IsSuccess;
                       var response=obj.Response;
                       //isexist = obj.Response[0].IsExists;
                       //alert(isexist);
                       if(response.length>0){
                       if(res.IsUpdateProfile=="True")
                       {
                        SetDeviceIdForiOS(res.UserId);//DoSetDeviceId
                       sessionStorage.setItem('CustomerUser',userCustomer);
                       localStorage.setItem('CustomerUser',userCustomer);
                       //alert("here");
                       RegisteredFor=res.RegisteredFor;
                       if(res.RegisteredFor=='Meineke'){
                       $( ":mobile-pagecontainer" ).pagecontainer( "change", "customer/meinekeprofileCustomer.html",{transition: "slide",reverse: false});
                       }
                       else if(res.RegisteredFor=='APSP'){
                       $( ":mobile-pagecontainer" ).pagecontainer( "change", "customer/meinekeprofileCustomer.html",{transition: "slide",reverse: false});
                       }
                       else{
                       $( ":mobile-pagecontainer" ).pagecontainer( "change", "customer/profileCustomer.html",{transition: "slide",reverse: false});
                       }
                       
                       }
                       else
                       {
                       
                       sessionStorage.setItem('CustomerUser',userCustomer);
                       localStorage.setItem('CustomerUser',userCustomer);
                       
                       $( ":mobile-pagecontainer" ).pagecontainer( "change", "customer/customerSignupNext.html",{transition: "none"});
                       }
                       }
                       else{
                       $( ":mobile-pagecontainer" ).pagecontainer( "change", "main.html",{transition: "none"});
                       }
                       
                       
                       },
                       error : function(XMLHttpRequest, textStatus, errorThrown) {
                       
                       }
                       
                       });
               // alert("userexist :"+userexist);
                
               
                
                
                });
     }
    

 }
