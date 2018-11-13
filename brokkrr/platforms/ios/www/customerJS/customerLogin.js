$(document).on("pageshow","#customerLoginPage,#customerForgetPage", function( event ) {
              
             //$('#showhide').attr("src", "../images/showpassword.png");
               /* cache dom references */
               
              var passfield = $("#password");
              
               $(".toggle-password").click(function() {
                                          if(passfield.val() != ""){
                                           if ($('#password').attr("type") == "password") {
                                           $('#password').attr("type", "text");
                                           $('#showhide').attr("src", "../images/show_password.png");
                                           
                                           } else {
                                           $('#password').attr("type", "password");
                                           $('#showhide').attr("src", "../images/hide_password.png");
                                           
                                           }
                                            }
                                           });
               

              
             
               //Index.html
	//InsertLoginDetails('Select','Customer');
           /*    var hbcontent=getcontentheight();
               $('.ui-content').css('height',hbcontent);*/
               var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }else{
               
               hbcontent=stopPageOverflow(hbcontent);
               
               }
               
              if(BrokerBadgesInt>0){
               window.clearInterval(BrokerBadgesInt);}
               if(IntLatestmsgBroker>0){
               window.clearInterval(IntLatestmsgBroker);
               }
	  chkLogin('Customer');
	
	
	$('#closecontactBrokerPopup').off("click").on("click", function() {
		//alert('closecontactBrokerPopup called');
		  //modal.style.display = "none";
		$('#myModalError').modal('hide');
		});
              
	
	$('#customerDoLoginBtn').off("click").on("click", function() {
                                             var DeviceID=localStorage.getItem('DeviceID');
                                              CustuserLogin();
                                            /* if(DeviceID==null||DeviceID==""||DeviceID=='iOSnull'||DeviceID=='iOS'){
                                             jQuery("label[for='notifytext']").html("We are unable to send notifications. Please reinstall the app or press continue");
                                             $('#CustnotifyPopup').popup('open');
                                             }
                                             else{
                                             CustuserLogin();
                                             }*/
		//alert("Customer Login");
	
		
		//$.mobile.loadingMessageTextVisible = true;
		//ClearAllSession();
       
});
      /*         $('#CustOkbtnnotifyPopup').off("click").on("click", function() {
                                                      $('#CustnotifyPopup').popup('close');
                                                      });
               $('#CustContinuebtn').off("click").on("click", function() {
                                                 $('#CustnotifyPopup').popup('close');
                                                 CustuserLogin();
                                                 
                                                 });*/
	$('#ForgetPasswordbtn').off("click").on("click", function() {
		jQuery("label[for='forgetmessagetext']").html("");
			//$.mobile.loadingMessageTextVisible = true;
		    $.mobile.loading("show");
			var emailid= $('#Forgotpassemail').val();
			var emailidid= $('#Forgotpassemail');
			
			
			emailidid.keyup(validateEmail);	
			
			function validateEmail(){
	  	      if (globalvalidateEmail(emailidid)){
	  	        	return true;
	  	       }
	  	        else{
	  	        	return false;
	  	       	}
	  	    }
			 if(globalvalidateEmail(emailidid))
		     {
				// alert('IF');
				 
					$.ajax({		
						type: "POST",
						url: webserviceURL,
						data: {EmailId:emailid,ActionName:"DoForgetPassword"},
						success: function (data) {	
							var obj = JSON.parse(data);
							var issuccess = obj.IsSuccess;
							var ErrorMessage=obj.ErrorMessage;
							if(issuccess==true)
							{
								//alert('Success');
								
								//$.mobile.loading("hide"); //1.4.5
								//jQuery("label[for='forgetmessagetext']").html("Email sent to your email id.");
						    	
								$.mobile.loading("hide"); //1.4.5
								//$('#Forgetpassword').popup('close');
								
								
								
								$("#forgetinfo").hide();
								$("div#forgetpasstextbox").hide();
								$("#ForgetPasswordbtn").hide();
						
								$("div#forgetsuccessmsg").show();
								$("#Gotologinbtn").show();
								
								
								/*$('#myModalForgetPassword').modal('hide');
								
								$('#Forgotpassemail').val('');
								
								
								jQuery("label[for='messagetext']").html("Email sent to your email id.");
								$('#myModalError').modal('show');
							*/
								
								
								/*	$('#Forgetpassword').on("popupafterclose",function(){
									
									$('#Infopopup').popup('open');
									
									jQuery("label[for='messagetext']").html("Email sent to your email id.");
									
										setTimeout(function()
									     {
											
									         $('#Infopopup').popup('open');
											
									     }, 100);
								})*/
								
							}
							else
							{
								//alert("fail");
								$.mobile.loading("hide"); //1.4.5
								//jQuery("label[for='forgetmessagetext']").html("Error occured,please try again.");
								
								
								
								$("#forgetinfo").hide();
								$("div#forgetpasstextbox").hide();
								$("#ForgetPasswordbtn").hide();
						
								$("div#forgeterrormsg").show();
								$("#forgorpassretry").show();
								
								//$('#Forgetpassword').popup('close');
							/*	$('#myModalForgetPassword').modal('hide');
								$('#Forgotpassemail').val('');
								jQuery("label[for='messagetext']").html("Error occured,please try again.");
								$('#myModalError').modal('show');*/
								
								/*$('#Forgetpassword').on("popupafterclose",function(){
									
									
									jQuery("label[for='messagetext']").html("Error occured,please try again.");
									setTimeout(function()
										     {
										      
										$('#myModalError').modal('show');
										     }, 100);
								})*/
							}
			
							},        					
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							if(errorThrown!=""){	
								$.mobile.loading("hide"); //1.4.5
								//jQuery("label[for='forgetmessagetext']").html("We are unable to connect the server. Please try again later.");
								
								
								$("#forgetinfo").hide();
								$("div#forgetpasstextbox").hide();
								$("#ForgetPasswordbtn").hide();
						
								$("div#forgeterrormsg").show();
								$("#forgorpassretry").show();
								
								//('#Forgetpassword').popup('close');
								/*$('#myModalForgetPassword').modal('hide');
								$('#Forgotpassemail').val('');
								
								jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
								$('#myModalError').modal('show');*/
								
								
								
								/*$('#Forgetpassword').on("popupafterclose",function(){
									
									
									jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
									setTimeout(function()
										     {
										         $('#Infopopup').popup('open');
										     }, 100);
								})*/

						   			
							}
							else{					
							}	
						}			 			
					});
		     }
			 else
			{
				
				 	$.mobile.loading("hide"); //1.4.5
				 	//alert("Please validate details.");
					jQuery("label[for='forgetmessagetext']").html("Please validate details.");
					///$('#myModalError').modal('show');
                                            document.getElementById("overlay").style.display="block";
                                            $('#InfopopupBrokerLogin').popup('open');
			 
				 	
			}
		});
		
		$('#forget_password').off("click").on("click", function() {
			$('#Forgetpassword').popup('open');
		});
		
		$('#ForgetPasswordclosebtn').off("click").on("click", function() {
			$('#Forgotpassemail').val('');
			jQuery("label[for='forgetmessagetext']").html("");
			//$('#Forgetpassword').popup('close');
			$('#myModalForgetPassword').modal('hide');
			////$('#myModalError').modal('hide');
                                                     document.getElementById("overlay").style.display="none";
                                                     $('#InfopopupBrokerLogin').popup('close');
			  setTimeout(function() {
			        $("#forgetPasswordModal").trigger('blur');
			    },10);
			
		});
		
		
		$('#OkbtnLogin').off("click").on("click", function() {
			$('#InfopopupBrokerLogin').popup('close');
		});
               $("#InfopopupBrokerLogin").popup({
                                          afterclose: function () {
                                          document.getElementById("overlay").style.display="none";
                                          }
                                          });
		
		function clearfield(){
			 $('#username').val("");
			 $('#password').val(""); 
		}  
		
		$('#CustomerloginbackBtn').off("click").on("click", function() {
		     // $.mobile.loadingMessageTextVisible = true;
		     // $.mobile.loading("show", {text: 'Processing...',textVisible: true,theme: 'b'});
              $("#CustomerloginbackBtn").attr('class','backbtnArrow');//17Mar17
              $("#CustomerloginbackBtn" ).toggle( "highlight" );//17Mar17
		      $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customer.html",{transition: "slide",reverse: false});
		 });
		
		
		$('#forgorpassretry').off("click").on("click", function() {
			refreshPage();
		 });
		
		function refreshPage() {
			//alert('Refresh');
			  $.mobile.changePage(
			    window.location.href,
			    {
			      allowSamePageTransition : true,
			      transition              : 'none',
			      showLoadMsg             : false,
			      reloadPage              : true
			    }
			  );
			}
		
	/*	$("#rememberme").on("click", function(){
		    check = $("#rememberme").is(":checked");
		    if(check) {
		        alert("Checkbox is checked.");
		        sessionStorage.setItem("UserName",$('#username').val());
		    	sessionStorage.setItem("Password",$('#password').val());
		    	
		        InsertLoginDetails('Insert');
		    } else {
		        alert("Checkbox is unchecked.");
		        InsertLoginDetails('Delete');
		    }
		}); */
               function CustuserLogin(){
               ClearAllSessionWithoutlocation();
               $.mobile.loading("show");
               
               
               
               
               
               var username=$('#username').val();
               username=jQuery.trim(username);
               
               var password=$('#password').val();
               password=jQuery.trim(password);
               
               var usernameid = $('#username');
               var passwordid = $('#password');
               
               //On key press
               usernameid.keyup(validateUsername);
               passwordid.keyup(validatePassword);
               function validateUsername(){
               if (globalvalidateEmail(usernameid)){
               return true;
               }
               else{
               return false;
               }
               }
               function validatePassword(){
               // if(globalvalidaterequired(passwordid))
               if(globalvalidaterequired(passwordid))
               {
               return true;
               }
               else
               {
               return false;
               }
               }
               
               function validateFields(){
               if (validateUsername() & validatePassword()){
               return true;
               }
               else{
               return false;
               }
               }
               function CheckRequiredField(){
               if (globalvalidaterequired(usernameid) & globalvalidaterequired(passwordid)){
               return true;
               }
               else{
               return false;
               }
               }
               
               if(validateFields())
               {
               
               var check = $("#rememberme").is(":checked");
               if(check) {
               // alert("Checkbox is checked.");
               sessionStorage.setItem("UserName",$('#username').val());
               sessionStorage.setItem("Password",$('#password').val());
               
               
               insertData('Customer');
               } else {
               
               truncateTable('Customer');
               }
               
               $.ajax({
                      type: "POST",
                      url: webserviceURL,
                      data: {UserName:username,Password:password,UserType:"Customer",ActionName:"DoLogin"},
                      success: function (data) {
                      var obj = JSON.parse(data);
                      var issuccess = obj.IsSuccess;
                      var ErrorMessage=obj.ErrorMessage;
                      var UserDetails=obj.UserDetails;
                      //alert(data);
                      if(issuccess==true)
                      {
                      clearfield();
                      $.each(UserDetails, function (i, res) {
                             $.mobile.loading("hide");
                             //Notification 1Dec16
                             
                             useridCust=res.UserId;
                             if(res.IsUpdateProfile=="True")
                             {
                             SetDeviceIdForiOS(res.UserId);
                             var profilepic='';
                             sessionStorage.setItem('CustomerUser',data);
                             localStorage.setItem('CustomerUser',data);
                             if(res.ProfilePictureImg != '')
                             {
                             profilepic=res.ProfilePictureImg+'?'+Math.random();
                             }
                             else
                             {
                             
                             profilepic=dcustomerimg;
                             
                             }
                             menuCustProfilepic=profilepic;
                             menuCustFirstname=res.FirstName;
                             menuCustLastname=res.LastName;
                             RegisteredFor=res.RegisteredFor;
                             //alert("DoLogin :"+res.RegisteredFor);
                             if(res.RegisteredFor=='Meineke'){
                             
                             $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/meinekeprofileCustomer.html",{transition: "slide",reverse: false});
                             }
                             else if(res.RegisteredFor=='APSP'){
                             $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/meinekeprofileCustomer.html",{transition: "slide",reverse: false});
                             }
                             else{
                             $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/profileCustomer.html",{transition: "slide",reverse: false});
                             }
                             
                             }
                             else
                             {
                             
                             sessionStorage.setItem('CustomerUser',data);
                             localStorage.setItem('CustomerUser',data);
                             $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerSignupNext.html",{transition: "slide",reverse: false});
                             }
                             
                             });
                      }
                      else if(issuccess==false)
                      {
                      $.mobile.loading("hide"); //1.4.5
                      jQuery("label[for='messagetext']").html(ErrorMessage);
                      //$('#Infopopup').popup('open');
                      //var modal = document.getElementById('myModalError');
                      //modal.style.display = "block";
                      ///$('#myModalError').modal('show');
                      document.getElementById("overlay").style.display="block";
                      $('#InfopopupBrokerLogin').popup('open');
                      
                      }
                      else
                      {
                      $.mobile.loading("hide"); //1.4.5
                      jQuery("label[for='messagetext']").html("Please try again.");
                      //$('#Infopopup').popup('open');
                      ///$('#myModalError').modal('show');
                      document.getElementById("overlay").style.display="block";
                      $('#InfopopupBrokerLogin').popup('open');
                      }
                      
                      },
                      
                      error : function(XMLHttpRequest, textStatus, errorThrown) {
                      if(errorThrown!=""){
                      $.mobile.loading("hide"); //1.4.5
                      jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
                      //$('#Infopopup').popup('open');
                      ///$('#myModalError').modal('show');
                      document.getElementById("overlay").style.display="block";
                      $('#InfopopupBrokerLogin').popup('open');
                      }
                      else{
                      }
                      }
                      });
               }
               else
               {
               $.mobile.loading("hide"); //1.4.5
               if(!CheckRequiredField())
               {
               jQuery("label[for='messagetext']").html("Please enter required fields.");
               //$('#Infopopup').popup('open');
               ///$('#myModalError').modal('show');
               document.getElementById("overlay").style.display="block";
               $('#InfopopupBrokerLogin').popup('open');
               }
               else if(!globalvalidateEmail(usernameid))
               {
               jQuery("label[for='messagetext']").html("Please enter valid email id.");
               //$('#Infopopup').popup('open');
               ///$('#myModalError').modal('show');
               document.getElementById("overlay").style.display="block";
               $('#InfopopupBrokerLogin').popup('open');
               
               }
               else
               {
               jQuery("label[for='messagetext']").html("Please validate details.");
               //$('#Infopopup').popup('open');
               ///$('#myModalError').modal('show');
               document.getElementById("overlay").style.display="block";
               $('#InfopopupBrokerLogin').popup('open');
               }
               }
               }
	
});
