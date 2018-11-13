/* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    	//document.getElementById("BrokerLinkedinLoginSignupBtn").addEventListener('click',  this.onDeviceReady, false);
    	//document.addEventListener('click', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    	//alert("recv func");
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

		//Initializing extensions
		SocialGap.Facebook_ChangeSettings('appID', 'appSecret', 'fbAppDomain', 'fbScopes');
		SocialGap.Linkedin_ChangeSettings('apiKey', 'secretKey', 'ldAppDomain', 'ldScopes');	  

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

	logonSuccess: function(accessToken)
	{
		//alert("LinkedIn Login success");
		apicall(accessToken);
		//localStorage.clear();
		// $( ":mobile-pagecontainer" ).pagecontainer( "change", "profileBroker.html",{transition: "slide",reverse: false});
		//alert("hhhhhiiiiiiiiiii clear");
		//cordovaWebView.clearCache(true);
		//android.webkit.CookieManager.getInstance().removeAllCookie();
		
		//localStorage.removeData();
		//sessionStorage.clear();
	},
	
	logonFailure: function(){
		 $.mobile.loading("hide");
		//alert('Error occured, Please try again!');
	}

};
function apicall(accessToken) {	  
	  url="https://api.linkedin.com/v1/people/~:(id,email-address,first-name,last-name,headline)?oauth2_access_token="+accessToken+"&format=json";
	  //alert(url);
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState==4)
				var response=xhr.responseText;
			//alert(response.firstName);
			
				//alert("response Json:"+response);
				 var obj = JSON.parse(response);
				 var FirstName=obj.firstName;
			      var LastName=	obj.lastName;
			      var Email=obj.emailAddress;
			      var action=sessionStorage.getItem('LinkedInLogin')
			      sessionStorage.removeItem("LinkedInLogin")
			     			      
			      if(action=='BrokerLogin')
			    	  {
			    	  BrokerLogin(FirstName,LastName,Email);
			    	  }
			      else if(action=='BrokerSignup')
			      	{
			    	  BrokerSignup(FirstName,LastName,Email);
			    	  }
			      else if(action=='CustomerLogin')
			      	{
			    	  CustomerLogin(FirstName,LastName,Email);
			    	  }
			      else if(action=='CustomerSignup')
			      	{
                        
			    	  CustomerSignup(FirstName,LastName,Email);
			    	 }
			      
		};

		xhr.onerror = function(){
			 $.mobile.loading("hide");
			alert("Error occured, Please try again!");
		};
		xhr.send();

	}

function ClearLocalStorage()
{
	for(var i=0, len=localStorage.length; i<len; i++) {
  		//alert('i ' + i);
  	    var key = localStorage.key(i);
  	    var value = localStorage[key];
  	   // alert('key '+key + 'value '+value);
          if(key != 'DeviceID'){
  	  localStorage.removeItem(key);
          }
  	}
}

//alert(RegisteredFor);
function CustomerSignup(FirstName,LastName,Email)
{
	$.ajax({		
			type: "POST",
			url: webserviceURL,
			data: {FirstName:FirstName,LastName:LastName,EmailId:Email,Provider:"Linkedin",UserType:"Customer",RegisteredFor:RegisteredFor,ActionName:"DoExternalLogin"},
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
  					//ClearLocalStorage();
                    ClearAllSessionWithoutlocation();
                    
  					if(res.RegisterdType=="Linkedin")
      				{
  						
  						
		  				if(IsNewRegistered==true)
		      			{
							sessionStorage.setItem('Provider',"Linkedin");	
							sessionStorage.setItem('CustomerUser',data);
                            localStorage.setItem('CustomerUser',data);
							//getCompanyList();
                            getIndustryList(RegisteredFor);
                            GetIndustrySICCodeList("");
							$( ":mobile-pagecontainer" ).pagecontainer( "change", "customerSignupNext.html",{transition: "slide",reverse: false});
							     								   
		      			}
		      			else
		      			{
		      				if(res.IsUpdateProfile=="True")
		  					{
                       SetDeviceIdForiOS(res.UserId);
                                sessionStorage.setItem('CustomerUser',data);
                                localStorage.setItem('CustomerUser',data);
		      					//getCompanyList();
                                getIndustryList(RegisteredFor);
                                GetIndustrySICCodeList("");
                                if(res.RegisteredFor=='Meineke'||res.RegisteredFor=='APSP'){
                                    $( ":mobile-pagecontainer" ).pagecontainer( "change", "meinekeprofileCustomer.html",{transition: "slide",reverse: false});
                                }
                                else{
                                    $( ":mobile-pagecontainer" ).pagecontainer( "change", "profileCustomer.html",{transition: "slide",reverse: false});
                                }
		      					//$( ":mobile-pagecontainer" ).pagecontainer( "change", "profileCustomer.html",{transition: "slide",reverse: false});
		  							
		  					}
		  					else
		  					{
		  						sessionStorage.setItem('Provider',"Linkedin");
		  						sessionStorage.setItem('CustomerUser',data);
                                localStorage.setItem('CustomerUser',data);
		  						//getCompanyList();
                                getIndustryList(RegisteredFor);
                                GetIndustrySICCodeList("");
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
}


function CustomerLogin(FirstName,LastName,Email)
{
	$.ajax({		
			type: "POST",
			url: webserviceURL,
			data: {FirstName:FirstName,LastName:LastName,EmailId:Email,Provider:"Linkedin",UserType:"Customer",RegisteredFor:RegisteredFor,ActionName:"DoExternalLogin"},
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
  					//ClearLocalStorage();
                       ClearAllSessionWithoutlocation();
                       
				if(IsNewRegistered==true)
      			{
      		
					sessionStorage.setItem('Provider',"Linkedin");	
					sessionStorage.setItem('CustomerUser',data);
                    localStorage.setItem('CustomerUser',data);
					//getCompanyList();
                    getIndustryList(RegisteredFor);
                    GetIndustrySICCodeList("");
					$( ":mobile-pagecontainer" ).pagecontainer( "change", "customerSignupNext.html",{transition: "slide",reverse: false});
					     								   
      			}
      			else
      			{
      				if(res.IsUpdateProfile=="True")
  					{
                       SetDeviceIdForiOS(res.UserId);
                       sessionStorage.setItem('CustomerUser',data);
                       localStorage.setItem('CustomerUser',data);
                      // getCompanyList();
                       getIndustryList(RegisteredFor);
                       GetIndustrySICCodeList("");
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
  						sessionStorage.setItem('Provider',"Linkedin");
  						sessionStorage.setItem('CustomerUser',data);
                        localStorage.setItem('CustomerUser',data);
  						//getCompanyList();
                       getIndustryList(RegisteredFor);
                       GetIndustrySICCodeList("");
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
}

function BrokerSignup(FirstName,LastName,Email)
{
	  $.ajax({		
			type: "POST",
			url: webserviceURL,
			data: {FirstName:FirstName,LastName:LastName,EmailId:Email,Provider:"Linkedin",UserType:"Broker",RegisteredFor:"Brokkrr",ActionName:"DoExternalLogin"},
			success: function (data) {	
				//alert(data);
				var obj = JSON.parse(data);
				var issuccess = obj.IsSuccess;
				var ErrorMessage=obj.ErrorMessage;
				
				if(issuccess==true)
				{
					$.mobile.loading("hide");
					var UserDetails=obj.UserDetails;
    				var IsNewRegistered=obj.IsNewRegister;
    				
    				$.each(UserDetails, function (i, res) {
    					//ClearLocalStorage();
                           ClearAllSessionWithoutlocation();
                           
    					if(res.RegisterdType=="LinkedIn")
          				{	
							if(IsNewRegistered==true)
		        			{
		        			 	sessionStorage.setItem('BrokerUser',data);
								sessionStorage.setItem('Provider',"Linkedin");
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
		    						sessionStorage.setItem('Provider',"Linkedin");
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
}

function BrokerLogin(FirstName,LastName,Email)
{
	  $.ajax({		
			type: "POST",
			url: webserviceURL,
			data: {FirstName:FirstName,LastName:LastName,EmailId:Email,Provider:"Linkedin",UserType:"Broker",RegisteredFor:"Brokkrr",ActionName:"DoExternalLogin"},
			success: function (data) {	
				//alert(data);
				var obj = JSON.parse(data);
				var issuccess = obj.IsSuccess;
				var ErrorMessage=obj.ErrorMessage;
				
				if(issuccess==true)
				{
					$.mobile.loading("hide");
					var UserDetails=obj.UserDetails;
    				var IsNewRegistered=obj.IsNewRegister;
    				
    				$.each(UserDetails, function (i, res) {
    					//ClearLocalStorage();
                           ClearAllSessionWithoutlocation();
                           
					if(IsNewRegistered==true)
        			{
        			 	sessionStorage.setItem('BrokerUser',data);
						sessionStorage.setItem('Provider',"Linkedin");
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
    						sessionStorage.setItem('Provider',"Linkedin");
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
}
