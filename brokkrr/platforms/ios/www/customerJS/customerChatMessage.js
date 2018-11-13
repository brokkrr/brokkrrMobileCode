$(document).on("pagebeforeshow","#customerChatMessagePage",function(){
	$("div#divMessage").show(); 
	$("div#divError").hide();
	ChattingTimespanDBExist='false';
	chatlist=[];
	customerdeletechatmsgarray=[];
	
	var user=sessionStorage.getItem('CustomerUser');
    var useridtemp;
    var CustomerMessageId;
    var obj=JSON.parse(user);
	var issuccess = obj.IsSuccess;
	var ErrorMessage=obj.ErrorMessage;
	if(issuccess==true)
		{
		var UserDetails=obj.UserDetails;
		$.each(UserDetails, function (i, userobj) {
			
			useridtemp=userobj.UserId;
			
		});
	}
	
	var messagedetails=sessionStorage.getItem('getMegdetailsForChat');
	if(messagedetails!==null)
	{
		var mainmsg = JSON.parse(messagedetails);
		CustomerMessageId=mainmsg.CustomerMessageId;              // alert(mainmsg);
	}
   
	 getUnreadChatMsg("customerChatcontentError",useridtemp,CustomerMessageId,'broker');
});

$(document).on("pagehide","#customerChatMessagePage",function(){ // When leaving pagetwo

	window.clearInterval(MyVarCustomer);
});

var ChattingTimestamp="";

$(document).on("pageshow","#customerChatMessagePage", function( event ) {
               CheckDeviceId(useridCust);
               var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }
               else{
                hbcontent=stopPageOverflow(hbcontent);
              /* if(devicename=='iPhoneX'){
               hbcontent=hbcontent-23;
               }
               hbcontent=hbcontent-20;*/
               }
              $('.ui-content').css('height',hbcontent);
$('#customerChatcontent').val("");
	MyVarCustomer='';
	ChattingTimestamp="";
    $.mobile.loading("show");
    var submitChatCount=1;
    GetChatFlag='No';
    
	var messagedetails=sessionStorage.getItem('getMegdetailsForChat');

	var user=sessionStorage.getItem('CustomerUser');
    if(user===null || user=='')
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
		
	}
	
    var UserId, EmailId, FirstName, LastName,profilepic;
    var DeviceId;// Notification 1Dec16
    var obj=JSON.parse(user);
	var issuccess = obj.IsSuccess;
	var ErrorMessage=obj.ErrorMessage;
	if(issuccess==true)
		{
		var UserDetails=obj.UserDetails;
		$.each(UserDetails, function (i, userobj) {
			
			UserId=userobj.UserId;
			EmailId=userobj.EmailId;
			FirstName=userobj.FirstName;
			LastName=userobj.LastName;
			profilepic=userobj.ProfilePictureImg;
		});
	}
	else
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
	}
	
	
	var listforread = [];
	if(messagedetails!==null)
	{
		//alert(messagedetails);
		sessionStorage.removeItem('getMegdetailsForChat');
		var mainmsg = JSON.parse(messagedetails);
		
		var BrokerMessageId=mainmsg.BrokerMessageId;
		var CustomerMessageId=mainmsg.CustomerMessageId;
		var BrokerId=mainmsg.BrokerId;
		var CustomerId=mainmsg.CustomerId;
		var CustomerName=mainmsg.CustomerName;
		var MainMessage=mainmsg.Message;
		var MsgDate=mainmsg.MsgDate;
        var flagIsRead=mainmsg.IsRead;
    //    DeviceId=getDeviceId(BrokerId);

          /*     $.ajax({
                      type: "POST",
                      url: webserviceURL,
                      data: {UserId:BrokerId,ActionName:"DoGetDeviceId"},
                      success: function (data) {
                      //alert('data '+data);
                      var obj = JSON.parse(data);
                      
                      var issuccess = obj.IsSuccess;
                      var ErrorMessage=obj.ErrorMessage;
                      
                      if(issuccess==true)
                      {
                      var objDeviceid=obj.DeviceId;
                      $.each(objDeviceid, function (i, res) {
                              DeviceId=res.DeviceId;
                             });
                      }
                      },
                      error : function(XMLHttpRequest, textStatus, errorThrown) {
                      
                      }
                      });*/
   
		$("#headname").text(CustomerName);
		 
		//Main message 
		$('#chat1').append('<div><p class="mainChat speechright msgRight">'+MainMessage+' <span class="msgRight msgdatetime" style="padding-top:5%;">&nbsp;&nbsp;'+MsgDate+'</span></p></div><div class="cleardiv"></div>');

		var ChattingTimestampDB=""
        var oldchatmsgarray=[];
		$.ajax({		
			type: "POST",
			url: webserviceURL,
           // timeout:10000,
			data: {UserId:UserId,TimeStamp:ChattingTimestampDB,MessageId:CustomerMessageId,ActionName:"DoGetChatMessagesByMessageId"},
			success: function (data) {
              
			var obj = JSON.parse(data);
				var issuccess = obj.IsSuccess;
				var ErrorMessage=obj.ErrorMessage;
							
				if(issuccess==true)
				{
					var chatMessage=obj.ChatMessages;

					$.each(chatMessage, function (i, res) {
                           $.mobile.loading("show");
                        oldchatmsgarray.push(res.ChatId);
						if(chatlist.indexOf(res.ChatId) >=0)	
						{//alert('if');
							if(res.BrokerMessage !=''){
								if(res.IsRead=='False')
								{
									listforread.push(parseInt(res.ChatId));
								
								}
								}
						}
						else{
						var dt = res.LocalDateTime;
                        var msgdate=getMsgdateTime(dt);
							if(res.CustomerMessage != ''){
                           if(res.IsDeletedByCustomer!="True"){
								 $('#chat1').append('<a data-transition="slide" href="#" onclick="ClickonChat(\'' + res.ChatId+ '\')"><p id='+res.ChatId+' class="Chat speechright msgRight fontcolorchat">'+res.CustomerMessage+' <span class="msgRight msgdatetime" style="padding-top:5%;">&nbsp;&nbsp;'+msgdate+'</span></p></a><div class="cleardiv"></div>');
                           } 
								 
							}
							else{
                          // alert("else");
								if(res.IsRead=='False')
								{
									listforread.push(parseInt(res.ChatId));
								
								}
                           if(res.IsDeletedByCustomer!="True"){
								$('#chat1').append('<a data-transition="slide" href="#" onclick="ClickonChat(\'' + res.ChatId+ '\')"><p id='+res.ChatId+' class="Chat speech fontcolorchat">'+res.BrokerMessage+' <span class="msgRight msgdatetime fontcolorchat" style="padding-top:5%;">&nbsp;&nbsp;'+msgdate+'</span></p></a>');
                           }
									
							}
							//DB Change
							if(parseInt(chatMessage.length) == parseInt(i+1))
							{
								ChattingTimestampDB=res.MessageDate;
							}
							
						}			         
					});
					
					var IsMessageDeleted=obj.IsMessageDeleted;
					
					$.each(IsMessageDeleted, function (i, res) {
						IsDeletedonCustomer1=res.IsDeleted;
						if(res.IsDeleted=='True')
						{
							$("#customerChatcontentError").val('You can not send message because customer is no longer available for this chat.');
							$("div#divMessage").hide(); 
							$("#customerChatcontentError").css("font-weight", "bold");
							$("div#divError").show();
							$("#customerChatcontentError").attr("disabled", "disabled");
						}
						else
						{
							 $("div#divMessage").show(); 
								$("div#divError").hide();
						}
						
					});
					
					
					if(ChattingTimespanDBExist=="false")
					{

						ChattingTimestampDB="";
					}
					else
					{
						ChattingTimestampDB="";
					}

						if(parseInt(listforread.length)>0 || flagIsRead=='False')
						{

							SetIsReadFlag(listforread,UserId,CustomerMessageId);
						}
						else
						{

							GetChatFlag='Yes';

						}
						var chatBoxheight=$('#chat1')[0].scrollHeight
						ScrollDown(chatBoxheight);
						
				$.mobile.loading("hide"); 
				}
				else if(issuccess==false)
				{
					GetChatFlag='Yes';
					$.mobile.loading("hide");
					jQuery("label[for='messagetext']").html(ErrorMessage);
			    	$('#InfopopupChatCustomerMessage').popup('open');
						
				}
				else
				{
					$.mobile.loading("hide");
					jQuery("label[for='messagetext']").html("Please try again.");
			    	$('#InfopopupChatCustomerMessage').popup('open');
				}	

				},        					
			
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if(errorThrown!=""){	
					$.mobile.loading("hide");
					jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
			    	$('#InfopopupChatCustomerMessage').popup('open');
				}
				else{					
				}	
			}			 			
		});
		MyVarCustomer=setInterval(function()
					{
                    ////////////////////////////////////////////////*Yogita*/
                                  $.ajax({
                                   type: "POST",
                                   url: webserviceURL,
                                  // timeout:10000,
                                   data: {UserId:UserId,TimeStamp:ChattingTimestampDB,MessageId:CustomerMessageId,ActionName:"DoGetChatMessagesByMessageId"},
                                   success: function (data) {
                                   var obj = JSON.parse(data);
                                   var issuccess = obj.IsSuccess;
                                   var ErrorMessage=obj.ErrorMessage;
                                   var newchatmsgarray=[];
                                         
                                   if(issuccess==true)
                                   {
                                      //   alert("customerchat");
                                   var chatMessage=obj.ChatMessages;
                                         
                                         $.each(chatMessage, function (i, res) {
                                                
                                                newchatmsgarray.push(res.ChatId);
                                               
                                                newchatmsgarray=jQuery.unique(newchatmsgarray);
                                                });
                                      
                                         
                                         var ToshowchatList = [];
                                         $.each(newchatmsgarray, function(idx, value){
                                                if ($.inArray(value,oldchatmsgarray) == -1) {
                                                ToshowchatList.push(value);
                                                }
                                                });
                                         if(newchatmsgarray.length<oldchatmsgarray.length){
                                         $.each(oldchatmsgarray, function(idx, value){
                                                if ($.inArray(value,newchatmsgarray) == -1) {
                                                $('#'+value).remove();
                                                }
                                                });
                                         }
                                    
                                   $.each(chatMessage, function (i, res) {
                                          for(i=0;i<ToshowchatList.length;i++){
                                          if(ToshowchatList[i]==res.ChatId){
                                          var dt = res.LocalDateTime;
                                          var msgdate=getMsgdateTime(dt);
                                          if(res.CustomerMessage != ''){
                                          if(res.IsDeletedByCustomer!="True"){
                                         //// $('#chat1').append('<a data-transition="slide" href="#" onclick="ClickonChat(\'' + res.ChatId+ '\')"><p id='+res.ChatId+' class="Chat speechright msgRight fontcolorchat">'+res.CustomerMessage+' <span class="msgRight msgdatetime" style="padding-top:5%;">&nbsp;&nbsp;'+msgdate+'</span></p></a><div class="cleardiv"></div>');
                                          }
                                          
                                          }
                                          else{
                                          
                                          if(res.IsRead=='False')
                                          {
                                          listforread.push(parseInt(res.ChatId));
                                          
                                          }
                                          if(res.IsDeletedByCustomer!="True"){
                                         
                                          }
                                          
                                          }
                                          //DB Change
                                          if(parseInt(chatMessage.length) == parseInt(i+1))
                                          {
                                          ChattingTimestampDB=res.MessageDate;
                                          }
                                          
                                          }
                                          oldchatmsgarray.push(ToshowchatList[i]);
                                           oldchatmsgarray=jQuery.unique(oldchatmsgarray);
                                          /////var chatBoxheight=$('#chat1')[0].scrollHeight
                                          /////ScrollDown(chatBoxheight);
                                          /////$('#customerChatcontent').blur();
                                          }
                                          });
                                    ToshowchatList=[];
                                   var IsMessageDeleted=obj.IsMessageDeleted;
                                   
                                   $.each(IsMessageDeleted, function (i, res) {
                                          IsDeletedonCustomer1=res.IsDeleted;
                                          //alert('In Main : '+IsDeletedoncustomer1);
                                          if(res.IsDeleted=='True')
                                          {
                                          $("#customerChatcontentError").val('You can not send message because customer is no longer available for this chat.');
                                          $("div#divMessage").hide(); 
                                          $("#customerChatcontentError").css("font-weight", "bold");
                                          $("div#divError").show();
                                          $("#customerChatcontentError").attr("disabled", "disabled");
                                          }
                                          else
                                          {
                                          $("div#divMessage").show(); 
                                          $("div#divError").hide();
                                          }
                                          
                                          });
                                   
                                   
                                   ChattingTimestampDB="";
                                   if(parseInt(listforread.length)>0 || flagIsRead=='False')
                                   {
                                   SetIsReadFlag(listforread,UserId,CustomerMessageId);
                                   }
                                   else
                                   {
                                   GetChatFlag='Yes';
                                   }
                                   
                                   
                                   $.mobile.loading("hide"); 
                                   }
                                   else if(issuccess==false)
                                   {
                                   GetChatFlag='Yes';
                                   $.mobile.loading("hide");
                                   jQuery("label[for='messagetext']").html(ErrorMessage);
                                   $('#InfopopupChatCustomerMessage').popup('open');
                                   }
                                   else
                                   {
                                   $.mobile.loading("hide");
                                   jQuery("label[for='messagetext']").html("Please try again.");
                                   $('#InfopopupChatCustomerMessage').popup('open');
                                   }	
                                   
                                   },        					
                                   
                                   error : function(XMLHttpRequest, textStatus, errorThrown) {
                                   if(errorThrown!=""){	
                                   $.mobile.loading("hide");
                               
                                   }
                                   else{					
                                   }	
                                   }			 			
                                   });

                                  var SetUnreadArrayInterval=[];

						 if(GetChatFlag=='Yes')
						 {
							 GetChatFlag='No';

							 $.ajax({		
									type: "POST",
									url: webserviceURL,
									data: {UserId:UserId,MessageId:CustomerMessageId,ActionName:"DoGetUnreadChatMessages"},
									success: function (data) {	
										var obj = JSON.parse(data);
										var issuccess = obj.IsSuccess;
										var ErrorMessage=obj.ErrorMessage;
													
										if(issuccess==true)
										{
											var chatMessage=obj.ChatMessages;
												$.each(chatMessage, function (i, res) {
                                                       
													if(chatlist.indexOf(res.ChatId) >=0)	
													{
														SetUnreadArrayInterval.push(parseInt(res.ChatId));
													}
													else{
													var dt = res.LocalDateTime;
                                                    var msgdate=getMsgdateTime(dt);

													SetUnreadArrayInterval.push(parseInt(res.ChatId));

                                                              $('#chat1').append('<a data-transition="slide" href="#" onclick="ClickonChat(\'' + res.ChatId+ '\')"><p id='+res.ChatId+' class="Chat speech fontcolorchat">'+res.BrokerMessage+' <span class="msgRight msgdatetime" style="padding-top:5%;">&nbsp;&nbsp;'+msgdate+'</span></p></a>');
                                                  
													//if ($("#customerChatcontent").is(':focus')) {
                                                       
														    var chatBoxheight=$('#chat1')[0].scrollHeight
															 ScrollDown(chatBoxheight);
														//}
													}
												});
												
												var IsMessageDeleted=obj.IsMessageDeleted;
												
												$.each(IsMessageDeleted, function (i, res) {
													IsDeletedonCustomer2=res.IsDeleted;
													if(res.IsDeleted=='True')
													{
														$("#customerChatcontentError").val('You can not send message because broker is no longer available for this chat.');
														$("div#divMessage").hide(); 
														$("#customerChatcontentError").css("font-weight", "bold");
														$("div#divError").show();
														$("#customerChatcontentError").attr("disabled", "disabled");
													}
													else
													{
														 $("div#divMessage").show(); 
														 $("div#divError").hide();
													}
													
												});
												if(parseInt(SetUnreadArrayInterval.length)>0)
												{
													SetIsReadFlag(SetUnreadArrayInterval,UserId,"");
												}
												else
												{
													GetChatFlag='Yes';
												}
										}
										else
										{
											GetChatFlag='Yes';
										}
									
										},        					
									error : function(XMLHttpRequest, textStatus, errorThrown) {
									
									}			 			
								});
							
						}
						 else
						{
						}
					}, 2000);
		
	}
	else
	{
		$.mobile.loading("hide"); //1.4.5
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerMessage.html",{transition: "slide",reverse: false});	
	}
		$('#customerChatEnter').off("click").on("click", function() {
		var chatcontent=$('#customerChatcontent').val();
		$('#customerChatcontent').focus();
		if(chatcontent!='')
		{
			 var nowdt = new Date();
			 var onlydate= (nowdt.getMonth() + 1) + '/' + nowdt.getDate() + '/' + nowdt.getFullYear();
			 var nowtime = nowdt.getHours() + ":" + nowdt.getMinutes() + ":" + nowdt.getSeconds();
			 var sec='';
			 var hrs =nowdt.getHours();
			
			 if(hrs>12){
					hrs=hrs-12;
					sec="PM";
					
				}
				else if(hrs==12)
				{
					sec="PM";
				}
				else
				{
					sec="AM";
				}
				 var LocalDateTime=onlydate + ' '+  nowtime + ' '+ sec;

		    $.mobile.loading("show");
			
			$.ajax({
				type: "POST",
				url: webserviceURL,
				data: {BrokerMsgId:BrokerMessageId,CustMsgId:CustomerMessageId,CustomerId:CustomerId,BrokerId:BrokerId,CustomerMessage:chatcontent,OldMessageId:0,LocalDateTime:LocalDateTime,ActionName:"DoSaveCustomerChat"},
				success: function (data) {	
				var obj = JSON.parse(data);
		
					var issuccess = obj.IsSuccess;
					var ErrorMessage=obj.ErrorMessage;
								
					if(issuccess==true)
					{
						var response=obj.Response;
						var listforread = [];
						$.each(response, function (i, res) {
							 oldchatmsgarray.push(res.NewMessageId);
							$('#chat1').append('<a data-transition="slide" href="#" onclick="ClickonChat(\'' + res.NewMessageId+ '\')"><p id='+res.NewMessageId+' class="Chat speechright msgRight fontcolorchat">'+chatcontent+'&nbsp;&nbsp; <span class="msgRight msgdatetime" style="padding-top:5%;" id="date'+submitChatCount+'"></span></p></a><div class="cleardiv"></div>');
							 $("#date"+submitChatCount).text('Sending....');
                               
                             /*  var ActionName='';
                               var NewDevice='';
                               var indexid=DeviceId.indexOf('Android');
                               var indexid1=DeviceId.indexOf('iOS');
                              // alert(indexid1);
                               if(parseInt(indexid) >= 0)
                               {
                           
                               ActionName='DoPushNotification';
                               NewDevice=DeviceId.replace('Android','');
                               }
                               else if(parseInt(indexid1) >= 0)
                               {
                          
                               ActionName='DoPushNotificationForiOS';
                               NewDevice=DeviceId.replace('iOS','');
                               }
                             */
                              // if(DeviceId !=='' || DeviceId !== null)
                             //  {
                               var title=FirstName+' '+ LastName;
                               var msgcnt=1;
                               var message=chatcontent;
                               
                               $.ajax({
                                      type: "POST",
                                      url: webserviceURL,
                                      data: {/*DeviceId:NewDevice,*/message:message,title:title,msgcnt:msgcnt,UserId:BrokerId,ActionName:"DoSendNotification"},
                                      success: function (data) {
                                      },        
                                      error : function(XMLHttpRequest, textStatus, errorThrown) {
                                      }			 			
                                      });
                               
                           //    }
                               
							 var chatBoxheight=$('#chat1')[0].scrollHeight
							 ScrollDown(chatBoxheight);
                               var dt = res.LocalDateTime;
                               var msgdate=getMsgdateTime(dt);
								
								$("#date"+submitChatCount).text(msgdate);
								submitChatCount++;
						});
							$.mobile.loading("hide"); 
					}
					else if(issuccess==false)
					{
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html(ErrorMessage);
				    	$('#InfopopupChatCustomerMessage').popup('open');
							
					}
					else
					{
						jQuery("label[for='messagetext']").html("Please try again.");
				    	$('#InfopopupChatCustomerMessage').popup('open');
					}	
	
					},        					
				
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					if(errorThrown!=""){	
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
				    	$('#InfopopupChatCustomerMessage').popup('open');
					}
					else{					
					}	
				}			 			
			});
			
			$.mobile.loading("hide");
			
			
			$('#customerChatcontent').val(""); 
		////	var chatBoxheight=$('#chat1')[0].scrollHeight
		////	ScrollDown(chatBoxheight);
			
		}
		////var chatBoxheight=$('#chat1')[0].scrollHeight
		//// ScrollDown(chatBoxheight);
		 
	});
	
/*	$( "#customerChatcontent" ).click(function() {
		var chatBoxheight=$('#chat1')[0].scrollHeight
		 ScrollDown(chatBoxheight);
	});*/
	
               $("input").focus(function () {
                            /*    window.currentHeight = $(this).height();
                                setTimeout(function() {
                                           window.scrollTo(0, window.currentHeight);
                                           }, 0);
                                var chatBoxheight=$('#chat1')[0].scrollHeight
                                ScrollDown(chatBoxheight);*/
                                
                                });

	$('#OkbtnChatCustomerMessage').off("click").on("click", function() {
		$('#InfopopupChatCustomerMessage').popup('close');
	});
	
	
	$('#CustomerChatMessageBackBtn').off("click").on("click", function() {
		window.clearInterval(MyVarCustomer);
        $("#CustomerChatMessageBackBtn").attr('class','backbtnArrow');//17Mar17
        $("#CustomerChatMessageBackBtn").toggle( "highlight" );//17Mar17
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerMessage.html",{transition: "slide",reverse: true});
		
	});

	
	 $(document).on( 'taphold', 'p.Chat', tapholdHandler );

    function tapholdHandler( event ){
   	
   	 if(customerdeletechatmsgarray.indexOf(this.id) >=0)
			{//alert('contains '+ this.id);
			}
   	 else
   	{
   		customerdeletechatmsgarray.push(this.id);
        $('#'+this.id).addClass('SelectChatForDelete');
      $('#deletechatcustomer').show();
    
   }
   
   }
    
    
    $('#deletechatcustomer').off("click").on("click", function() {
		
		 jQuery("label[for='messagetextdeletecon']").html('Are you sure to delete chat messages?');
	    	$('#deleteconfirmpopupcustomer').popup('open');
	 });
	 
	 $('#deleteconfirmpopupclosecustomer').off("click").on("click", function() {
			
	    	$('#deleteconfirmpopupcustomer').popup('close');
	 });
	 
	 
	 
	 $('#deletemessagesconfirmcustomer').off("click").on("click", function() {
		
		 var listtodelete=customerdeletechatmsgarray.toString();

		 $.ajax({		
				type: "POST",
				url: webserviceURL,
				data: {UserId:UserId,MessageId:listtodelete,ActionName:"DoDeleteMultipleChatMessage"},
				success: function (data) {
					var obj = JSON.parse(data);
					var issuccess = obj.IsSuccess;
					var ErrorMessage=obj.ErrorMessage;					
					if(issuccess==true)
					{
						for(i=0; i<=customerdeletechatmsgarray.length;i++)
						{

						$('#'+customerdeletechatmsgarray[i]).remove();
						}
						
						$('#deletechatcustomer').hide();
						
				       
						customerdeletechatmsgarray=[];
						
						
						$('#deleteconfirmpopupcustomer').popup('close');
					}
					else if(issuccess==false)
					{
						$('#deleteconfirmpopup').popup('close');
					}
				
					},        					
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$('#deleteconfirmpopupcustomer').popup('close');
				}			 			
			});
		 
	 });
	
	
});

function ClickonChat(ChatId)
{

if(parseInt(customerdeletechatmsgarray.length) >0)
 {
	if(customerdeletechatmsgarray.indexOf(ChatId) >=0)
	{
	       $('#'+ChatId).removeClass('SelectChatForDelete');
	       customerdeletechatmsgarray = jQuery.grep(customerdeletechatmsgarray, function(value) {
	         return value != ChatId;
	       });

	       if(parseInt(customerdeletechatmsgarray.length) <=0)
	    	   {
	    	   $('#deletechatcustomer').hide();
	    	  
	    	   }
	}
	else
		{
		customerdeletechatmsgarray.push(ChatId);
	       $('#'+ChatId).addClass('SelectChatForDelete');
	       $('#deletechatcustomer').show();
		}
 }

}
