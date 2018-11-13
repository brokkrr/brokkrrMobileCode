$(document).on("pageshow","#brokerLoginPage,#brokerSignupPage,#customerLoginPage,#customerSignupPage", function( event ) {
    var selectedcompany=sessionStorage.getItem('selectedcompany');
    if(selectedcompany=="Meineke"){
        RegisteredFor="Meineke";
    }
    else if(selectedcompany=="APSP"){
        RegisteredFor="APSP";
    }
    else{
        RegisteredFor="Brokkrr";
    }
	  // Defaults to sessionStorage for storing the Facebook token
	 openFB.init({appId: '1004008993055033'/*,
		 accessToken:'EAAORJA9h4TkBANBnLiUgTJWnSoBMQXyAZBPSxQ3k5uJr0x4uPFWaPjaBBkZAoWORZC389izepHpnuIbmAyf4aG0jhotdYaWsCbv6YxGr6RYFPG1ofKRHZClUR2O10EkEP7HFqdH2ZABqbfK3JpzIThsAoFqKHAyGIEOWGRfOSGgZDZD'
     */
     });

   
	 //Broker Facebook login
	$('#BrokerFacebookLoginBtn').off("click").on("click", function() {
	   
		//ClearAllSession();
        ClearAllSessionWithoutlocation();
	    $.mobile.loading("show");
	    
		openFB.login(function(response) {
			
			  if(response.status === 'connected') {
				  
			    openFB.api({path: '/me', success: function(data){
				  var FirstName=data.first_name;
			      var LastName=	data.last_name;
			      var Email=data.email;
			   
			      $.ajax({		
          			type: "POST",
          			url: webserviceURL,
          			data: {FirstName:FirstName,LastName:LastName,EmailId:Email,Provider:"Facebook",UserType:"Broker",RegisteredFor:RegisteredFor,ActionName:"DoExternalLogin"},
          			success: function (data) {	
          				var obj = JSON.parse(data);
          				var issuccess = obj.IsSuccess;
          				var ErrorMessage=obj.ErrorMessage;
          				
          				if(issuccess==true)
          				{
          					$.mobile.loading("hide");
          					var UserDetails=obj.UserDetails;
	          				var IsNewRegistered=obj.IsNewRegister;
	          				
	          				$.each(UserDetails, function (i, res) {
                            
							if(IsNewRegistered==true)
		          			{
		          		
								sessionStorage.setItem('BrokerUser',data);
								sessionStorage.setItem('Provider',"Facebook");
                                localStorage.setItem('BrokerUser',data);
                                   
								//getCompanyList();
                                getIndustryList(RegisteredFor);
                                GetIndustrySICCodeList("");
								 $( ":mobile-pagecontainer" ).pagecontainer( "change", "brokerSignupNext.html",{transition: "slide",reverse: false});
   							     								   
		          			}
		          			else
		          			{
		          				if(res.IsUpdateProfile=="True")
	          					{
                                   SetDeviceIdForiOS(res.UserId);
                                    sessionStorage.setItem('BrokerUser',data);
                                    localStorage.setItem('BrokerUser',data);
		          					
		          					 $( ":mobile-pagecontainer" ).pagecontainer( "change", "profileBroker.html",{transition: "slide",reverse: false});
	          							
	          					}
	          					else
	          					{
	          						          						
	          						sessionStorage.setItem('BrokerUser',data);
	          						sessionStorage.setItem('Provider',"Facebook");
                                    localStorage.setItem('BrokerUser',data);
	          						//getCompanyList();
                                   getIndustryList(RegisteredFor);
                                   GetIndustrySICCodeList("");
	          						$( ":mobile-pagecontainer" ).pagecontainer( "change", "brokerSignupNext.html",{transition: "slide",reverse: false});
	          					}
		          			}	
		          				
	          			  });
          				}
          				else if(issuccess==false)
          				{
          					$.mobile.loading("hide"); //1.4.5
          					jQuery("label[for='messagetext']").html(ErrorMessage);
          			    	$('#InfopopupBrokerLogin').popup('open');
          						
          				}
          				else
          				{
          					$.mobile.loading("hide"); //1.4.5
          					jQuery("label[for='messagetext']").html("Please try again.");
          			    	$('#InfopopupBrokerLogin').popup('open');
          				}	

          				},        					
          			
          			error : function(XMLHttpRequest, textStatus, errorThrown) {
          				if(errorThrown!=""){	
          					$.mobile.loading("hide"); //1.4.5
          					jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
          			    	$('#InfopopupBrokerLogin').popup('open');
          				}
          				else{					
          				}	
          			}			 			
          		});
			     
			      
			    }, error: function(err) {console.log(err);}});
			  } else {
				  $.mobile.loading("hide"); //1.4.5
			    jQuery("label[for='messagetext']").html("Error occured, Please try again.");
				    $('#InfopopupBrokerLogin').popup('open');
			  }
			}, {scope: 'email,public_profile'});
		
	});
	
	
	 //Broker Facebook login
	$('#BrokerFacebookSignupBtn').off("click").on("click", function() {
		//$.mobile.loadingMessageTextVisible = true;
		//ClearAllSession();
        ClearAllSessionWithoutlocation();
	    $.mobile.loading("show");
	    
		openFB.login(function(response) {
			  if(response.status === 'connected') {
			
			    openFB.api({path: '/me', success: function(data){
				  var FirstName=data.first_name;
			      var LastName=	data.last_name;
			      var Email=data.email;
			   
			      $.ajax({		
          			type: "POST",
          			url: webserviceURL,
          			data: {FirstName:FirstName,LastName:LastName,EmailId:Email,Provider:"Facebook",UserType:"Broker",RegisteredFor:RegisteredFor,ActionName:"DoExternalLogin"},
          			success: function (data) {	
          				var obj = JSON.parse(data);
          				var issuccess = obj.IsSuccess;
          				var ErrorMessage=obj.ErrorMessage;
          				
          				if(issuccess==true)
          				{
          					$.mobile.loading("hide");
          					var UserDetails=obj.UserDetails;
	          				var IsNewRegistered=obj.IsNewRegister;
	          				
	          				$.each(UserDetails, function (i, res) {
                            
	          				if(res.RegisterdType=="Facebook")
	          				{
								if(IsNewRegistered==true)
			          			{
			          				sessionStorage.setItem('BrokerUser',data);
									sessionStorage.setItem('Provider',"Facebook");
                                    localStorage.setItem('BrokerUser',data);
									//getCompanyList();
                                   getIndustryList(RegisteredFor);
                                   GetIndustrySICCodeList("");
									 $( ":mobile-pagecontainer" ).pagecontainer( "change", "brokerSignupNext.html",{transition: "slide",reverse: false});
	   							     								   
			          			}
			          			else
			          			{
			          				if(res.IsUpdateProfile=="True")
		          					{
                                   SetDeviceIdForiOS(res.UserId);
			          					 sessionStorage.setItem('BrokerUser',data);
                                         localStorage.setItem('BrokerUser',data);
			          					 
			          					 $( ":mobile-pagecontainer" ).pagecontainer( "change", "profileBroker.html",{transition: "slide",reverse: false});
		          							
		          					}
		          					else
		          					{
		          						sessionStorage.setItem('BrokerUser',data);
		          						
		          						sessionStorage.setItem('Provider',"Facebook");
                                        localStorage.setItem('BrokerUser',data);
		          						//getCompanyList();
                                        getIndustryList(RegisteredFor);
                                        GetIndustrySICCodeList("");
		          						$( ":mobile-pagecontainer" ).pagecontainer( "change", "brokerSignupNext.html",{transition: "slide",reverse: false});
		          					}
			          			}
	          				}
	          				else
	          				{
	          					$.mobile.loading("hide"); //1.4.5
	          					jQuery("label[for='messagetext']").html('User Already Exist!');
	          			    	$('#InfopopupBrokerLogin').popup('open');
	          				}
		          				
	          			  });
          				}
          				else if(issuccess==false)
          				{
          					$.mobile.loading("hide"); //1.4.5
          					jQuery("label[for='messagetext']").html(ErrorMessage);
          			    	$('#InfopopupBrokerLogin').popup('open');
          						
          				}
          				else
          				{
          					$.mobile.loading("hide"); //1.4.5
          					jQuery("label[for='messagetext']").html("Please try again.");
          			    	$('#InfopopupBrokerLogin').popup('open');
          				}	

          				},        					
          			
          			error : function(XMLHttpRequest, textStatus, errorThrown) {
          				if(errorThrown!=""){	
          					$.mobile.loading("hide"); //1.4.5
          					jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
          			    	$('#InfopopupBrokerLogin').popup('open');
          				}
          				else{					
          				}	
          			}			 			
          		});
			     
			      
			    }, error: function(err) {console.log(err);}});
			  } else {
				  $.mobile.loading("hide"); //1.4.5
			    jQuery("label[for='messagetext']").html("Error occured, Please try again.");
				    $('#InfopopupBrokerLogin').popup('open');
			  }
			}, {scope: 'email,public_profile'});
		
	});
	

	
	 //Customer Facebook login
	$('#CustomerFacebookLoginBtn').off("click").on("click", function() {
		//$.mobile.loadingMessageTextVisible = true;
		//ClearAllSession();
        ClearAllSessionWithoutlocation();
	    $.mobile.loading("show");
	    
		openFB.login(function(response) {
			  if(response.status === 'connected') {
			
			    openFB.api({path: '/me', success: function(data){
				  var FirstName=data.first_name;
			      var LastName=	data.last_name;
			      var Email=data.email;
			   
			      $.ajax({		
          			type: "POST",
          			url: webserviceURL,
          			data: {FirstName:FirstName,LastName:LastName,EmailId:Email,Provider:"Facebook",UserType:"Customer",RegisteredFor:RegisteredFor,ActionName:"DoExternalLogin"},
          			success: function (data) {	
          				var obj = JSON.parse(data);
          				var issuccess = obj.IsSuccess;
          				var ErrorMessage=obj.ErrorMessage;
          				
          				if(issuccess==true)
          				{
          					$.mobile.loading("hide");
          					var UserDetails=obj.UserDetails;
	          				var IsNewRegistered=obj.IsNewRegister;
	          				
	          				$.each(UserDetails, function (i, res) {
                            
							if(IsNewRegistered==true)
		          			{
		          			
								sessionStorage.setItem('Provider',"Facebook");	
								sessionStorage.setItem('CustomerUser',data);
                                localStorage.setItem('CustomerUser',data);
								
								$( ":mobile-pagecontainer" ).pagecontainer( "change", "customerSignupNext.html",{transition: "slide",reverse: false});
   							     								   
		          			}
		          			else
		          			{
		          				if(res.IsUpdateProfile=="True")
	          					{
                                   SetDeviceIdForiOS(res.UserId);
                                   sessionStorage.setItem('CustomerUser',data);
                                   localStorage.setItem('CustomerUser',data);
                                   if(res.RegisteredFor=='Meineke'||res.RegisteredFor=='APSP'){
                                   $( ":mobile-pagecontainer" ).pagecontainer( "change", "meinekeprofileCustomer.html",{transition: "slide",reverse: false});
                                   }
                                   else{
                                   $( ":mobile-pagecontainer" ).pagecontainer( "change", "profileCustomer.html",{transition: "slide",reverse: false});
                                   }
		          					// $( ":mobile-pagecontainer" ).pagecontainer( "change", "profileCustomer.html",{transition: "slide",reverse: false});
	          							
	          					}
	          					else
	          					{
	          					    sessionStorage.setItem('Provider',"Facebook");
	          						sessionStorage.setItem('CustomerUser',data);
                                   localStorage.setItem('CustomerUser',data);
	          						
	          						$( ":mobile-pagecontainer" ).pagecontainer( "change", "customerSignupNext.html",{transition: "slide",reverse: false});
	          					}
		          			}	
		          				
	          			  });
          				}
          				else if(issuccess==false)
          				{
          					$.mobile.loading("hide"); //1.4.5
          					jQuery("label[for='messagetext']").html(ErrorMessage);
          			    	$('#InfopopupLogin').popup('open');
          						
          				}
          				else
          				{
          					$.mobile.loading("hide"); //1.4.5
          					jQuery("label[for='messagetext']").html("Please try again.");
          			    	$('#InfopopupLogin').popup('open');
          				}	

          				},        					
          			
          			error : function(XMLHttpRequest, textStatus, errorThrown) {
          				if(errorThrown!=""){	
          					$.mobile.loading("hide"); //1.4.5
          					jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
          			    	$('#InfopopupLogin').popup('open');
          				}
          				else{					
          				}	
          			}			 			
          		});
			     
			      
			    }, error: function(err) {console.log(err);}});
			  } else {
				  $.mobile.loading("hide"); //1.4.5
			    jQuery("label[for='messagetext']").html("Error occured, Please try again.");
				    $('#InfopopupLogin').popup('open');
			  }
			}, {scope: 'email,public_profile'});
		
	});
	
	 //Customer Facebook login
	$('#CustomerFacebookSignupBtn').off("click").on("click", function() {
		//$.mobile.loadingMessageTextVisible = true;
		//ClearAllSession();
       ClearAllSessionWithoutlocation();
	   $.mobile.loading("show");
	    
		openFB.login(function(response) {
			  if(response.status === 'connected') {
			
			    openFB.api({path: '/me', success: function(data){
				  var FirstName=data.first_name;
			      var LastName=	data.last_name;
			      var Email=data.email;
			   
			      $.ajax({		
          			type: "POST",
          			url: webserviceURL,
                         data: {FirstName:FirstName,LastName:LastName,EmailId:Email,RegisteredFor:RegisteredFor,Provider:"Facebook",UserType:"Customer",ActionName:"DoExternalLogin"},
          			success: function (data) {	
          				var obj = JSON.parse(data);
          				var issuccess = obj.IsSuccess;
          				var ErrorMessage=obj.ErrorMessage;
          				
          				if(issuccess==true)
          				{
          					$.mobile.loading("hide");
          					var UserDetails=obj.UserDetails;
	          				var IsNewRegistered=obj.IsNewRegister;
	          				
	          				$.each(UserDetails, function (i, res) {
                            
	          				if(res.RegisterdType=="Facebook")
	          				{
								if(IsNewRegistered==true)
			          			{
			  						sessionStorage.setItem('Provider',"Facebook");	
									sessionStorage.setItem('CustomerUser',data);
                                    localStorage.setItem('CustomerUser',data);
									
									$( ":mobile-pagecontainer" ).pagecontainer( "change", "customerSignupNext.html",{transition: "slide",reverse: false});
	   							     								   
			          			}
			          			else
			          			{
			          				if(res.IsUpdateProfile=="True")
		          					{
                                   SetDeviceIdForiOS(res.UserId);
			          					 sessionStorage.setItem('CustomerUser',data);
                                   localStorage.setItem('CustomerUser',data);
                                   if(res.RegisteredFor=='Meineke'||res.RegisteredFor=='APSP'){
                                   $( ":mobile-pagecontainer" ).pagecontainer( "change", "meinekeprofileCustomer.html",{transition: "slide",reverse: false});
                                   }
                                   else{
                                   $( ":mobile-pagecontainer" ).pagecontainer( "change", "profileCustomer.html",{transition: "slide",reverse: false});
                                   }
			          				//	 $( ":mobile-pagecontainer" ).pagecontainer( "change", "profileCustomer.html",{transition: "slide",reverse: false});
		          							
		          					}
		          					else
		          					{
		          						sessionStorage.setItem('Provider',"Facebook");
		          						sessionStorage.setItem('CustomerUser',data);
                                   localStorage.setItem('CustomerUser',data);
		          					
		          						$( ":mobile-pagecontainer" ).pagecontainer( "change", "customerSignupNext.html",{transition: "slide",reverse: false});
		          					}
			          			}
	          				}
	          				else
	          				{
	          					$.mobile.loading("hide"); //1.4.5
	          					jQuery("label[for='messagetext']").html('User Already Exist!');
	          			    	$('#InfopopupLogin').popup('open');
	          				}
		          				
	          			  });
          				}
          				else if(issuccess==false)
          				{
          					$.mobile.loading("hide"); //1.4.5
          					jQuery("label[for='messagetext']").html(ErrorMessage);
          			    	$('#InfopopupLogin').popup('open');
          						
          				}
          				else
          				{
          					$.mobile.loading("hide"); //1.4.5
          					jQuery("label[for='messagetext']").html("Please try again.");
          			    	$('#InfopopupLogin').popup('open');
          				}	

          				},        					
          			
          			error : function(XMLHttpRequest, textStatus, errorThrown) {
          				if(errorThrown!=""){	
          					$.mobile.loading("hide"); //1.4.5
          					jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
          			    	$('#InfopopupLogin').popup('open');
          				}
          				else{					
          				}	
          			}			 			
          		});
			     
			      
			    }, error: function(err) {console.log(err);}});
			  } else {
				  $.mobile.loading("hide"); //1.4.5
			    jQuery("label[for='messagetext']").html("Error occured, Please try again.");
				    $('#InfopopupLogin').popup('open');
			  }
			}, {scope: 'email,public_profile'});
		
	});
	
	
});

