$(document).on("pagebeforeshow","#brokerChatMessagePage",function(){
               CheckDeviceId(useridBroker);
    $("div#divMessage").show();
    $("div#divError").hide();
    ChattingTimespanDBExist='false';
    chatlist=[];
    brokerdeletechatmsgarray=[];
    var messagedetails=sessionStorage.getItem('getMegdetailsForChat');
    if(messagedetails!==null){
        var mainmsg = JSON.parse(messagedetails);
        BrokerMessageId=mainmsg.BrokerMessageId;
    }
     getUnreadChatMsg("brokerChatcontentError",useridBroker,BrokerMessageId,'customer');
  
});

$(document).on("pagehide","#brokerChatMessagePage",function(){
    window.clearInterval(MyVarBroker);
});

$(document).on("pageshow","#brokerChatMessagePage", function( event ) {
               var cntchat=[];
               var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }
               else{
               hbcontent=stopPageOverflow(hbcontent);
               }
               $('.ui-content').css('height',hbcontent);
$('#brokerChatcontent').val("");
    var savechatmsg=[];
    var submitChatCount=1;
	MyVarBroker='';
    $.mobile.loading("show");
    GetChatFlag='No';
	var messagedetails=sessionStorage.getItem('getMegdetailsForChat');
	var user=sessionStorage.getItem('BrokerUser');
               
    if(user===null || user=='')
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/brokerLogin.html",{transition: "slide",reverse: false});
	}
	else
	{
		user=sessionStorage.getItem('BrokerUser');
	}
		
    var UserId, EmailId;
    var DeviceId;
               
	var obj=JSON.parse(user);
	var issuccess = obj.IsSuccess;
	var ErrorMessage=obj.ErrorMessage;
	
	if(issuccess==true)
	{
		var UserDetails=obj.UserDetails;
		$.each(UserDetails, function (i, userobj) {
			
			UserId=userobj.UserId;
			EmailId=userobj.EmailId;
			
		});
	}
	else
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/brokerLogin.html",{transition: "slide",reverse: false});
	}
	
	
	var listforread = [];
	if(messagedetails!==null)
	{
		sessionStorage.removeItem('getMegdetailsForChat');
		var mainmsg = JSON.parse(messagedetails);
        //alert(mainmsg);
		var BrokerMessageId=mainmsg.BrokerMessageId;
		var CustomerMessageId=mainmsg.CustomerMessageId;
		var BrokerId=mainmsg.BrokerId;
		var CustomerId=mainmsg.CustomerId;
		var CustomerName=mainmsg.CustomerName;
		var MainMessage=mainmsg.Message;
		var MsgDate=mainmsg.MsgDate;
        var flagIsRead=mainmsg.IsRead;
        var docpath=mainmsg.DeclarationDocPath;
      //  var base64=mainmsg.DeclarationDocBase64;
        sessionStorage.setItem('documentpath',docpath);
        sessionStorage.setItem('messageid',BrokerMessageId);
              // alert(base64);
            /*   $.ajax({
                      type: "POST",
                      url: webserviceURL,
                      data: {UserId:CustomerId,ActionName:"DoGetDeviceId"},
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
                             //alert('DEviceID '+DeviceId);
                             });
                      }
                      },
                      error : function(XMLHttpRequest, textStatus, errorThrown) {
                      
                      }
                      });*/
		$("#headname").text(CustomerName);
//Main message
		$('#chat1').append('<div><p class="mainChat speechright msgRight">'+MainMessage+' <span class="msgRight msgdatetime" style="padding-top:5%;">&nbsp;&nbsp;'+MsgDate+'</span></p></div><div class="cleardiv"></div>');

    $('#DeclarationDoc').off("click").on("click", function() {
            window.open(docpath, "_system");
    });
    
               
        var Brokeroldchatmsgarray=[];
        var ChattingTimestampDB="";
		$.ajax({
			type: "POST",
			url: webserviceURL,
            //timeout:60000,
			data: {UserId:UserId,TimeStamp:ChattingTimestampDB,MessageId:BrokerMessageId,ActionName:"DoGetChatMessagesByMessageId"},
			success: function (data) {
                var obj = JSON.parse(data);
				var issuccess = obj.IsSuccess;
				var ErrorMessage=obj.ErrorMessage;
							
				if(issuccess==true){
					var chatMessage=obj.ChatMessages;
					var IsMessageDeleted=obj.IsMessageDeleted;
				
					$.each(chatMessage, function (i, res) {
                            $.mobile.loading("show");
                        Brokeroldchatmsgarray.push(res.ChatId);
                          // alert(chatlist.indexOf(res.ChatId));
						if(chatlist.indexOf(res.ChatId) >=0)	
						{
							if(res.CustomerMessage !=''){
                                if(res.IsRead=='False'){
                                    listforread.push(parseInt(res.ChatId));
                                }
							}
						}
						else{
                            var dt = res.LocalDateTime;
                            var msgdate=getMsgdateTime(dt);
							if(res.BrokerMessage != ''){
                                if(res.IsDeletedByBroker!="True"){
                                    $('#chat1').append('<a data-transition="slide" href="#" onclick="ClickonBrokerChat(\'' + res.ChatId+ '\')"><p id='+res.ChatId+' class="Chat speechright msgRight fontcolorchat">'+res.BrokerMessage+' <span class="msgRight msgdatetime fontcolorchat" style="padding-top:5%;">&nbsp;&nbsp;'+msgdate+'</span></p></a><div class="cleardiv"></div>');
                                }
							}
							else{
								if(res.IsRead=='False'){
									listforread.push(parseInt(res.ChatId));
								}
                                if(res.IsDeletedByBroker!="True"){
									$('#chat1').append('<a data-transition="slide" href="#" onclick="ClickonBrokerChat(\'' + res.ChatId+ '\')"><p id='+res.ChatId+' class="Chat speech fontcolorchat">'+res.CustomerMessage+' <span class="msgRight msgdatetime fontcolorchat" style="padding-top:5%;">&nbsp;&nbsp;'+msgdate+'</span></p></a><div class="cleardiv"></div>');
                                }
							}
							if(parseInt(chatMessage.length) == parseInt(i+1))
							{
								ChattingTimestampDB=res.MessageDate;
							}
						}		
					});
					
					$.each(IsMessageDeleted, function (i, res) {
						IsDeletedonBroker1=res.IsDeleted;
						if(res.IsDeleted=='True')
						{
							$("#brokerChatcontentError").val('You can not send message because customer is no longer available for this chat.');
							$("div#divMessage").hide(); 
							$("#brokerChatcontentError").css("font-weight", "bold");
							$("div#divError").show();
							$("#brokerChatcontentError").attr("disabled", "disabled");
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
                        SetIsReadFlag(listforread,UserId,BrokerMessageId);
                    }
                    else
                    {
                        GetChatFlag='Yes';
                    }
						
                    var chatBoxheight=$('#chat1')[0].scrollHeight
                    ScrollDown(chatBoxheight);
						
				$.mobile.loading("hide"); 
				}
				else if(issuccess==false){
					GetChatFlag='Yes';
					$.mobile.loading("hide");
					jQuery("label[for='messagetext']").html(ErrorMessage);
			    	$('#InfopopupChatBrokerMessage').popup('open');
				}
				else{
					$.mobile.loading("hide");
					jQuery("label[for='messagetext']").html("Please try again.");
			    	$('#InfopopupChatBrokerMessage').popup('open');
				}
            },
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if(errorThrown!=""){	
					$.mobile.loading("hide");
					jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
			    	$('#InfopopupChatBrokerMessage').popup('open');
				}
				else{					
				}	
			}			 			
		});
		
               
               
//Interval
MyVarBroker=setInterval(function(){
    $.ajax({
        type: "POST",
        url: webserviceURL,
        //timeout:60000,
        data: {UserId:UserId,TimeStamp:ChattingTimestampDB,MessageId:BrokerMessageId,ActionName:"DoGetChatMessagesByMessageId"},
        success: function (data) {
            var newchatmsgarray=[];
            var obj = JSON.parse(data);
            var issuccess = obj.IsSuccess;
            var ErrorMessage=obj.ErrorMessage;
            if(issuccess==true){
                var chatMessage=obj.ChatMessages;
                var IsMessageDeleted=obj.IsMessageDeleted;
                $.each(chatMessage, function (i, res) {
                     newchatmsgarray.push(res.ChatId);
                });

                var ToshowchatList = [];
                $.each(newchatmsgarray, function(idx, value){
                    if ($.inArray(value,Brokeroldchatmsgarray) == -1) {
                    ToshowchatList.push(value);
                    }
                });
           
                if(newchatmsgarray.length<Brokeroldchatmsgarray.length){
                    $.each(Brokeroldchatmsgarray, function(idx, value){
                           if ($.inArray(value,newchatmsgarray) == -1) {
                                $('#'+value).remove();
                           }
                    });
                }
         
          
           $.each(chatMessage, function (i, res) {
                if(ToshowchatList.length>0){
                  for(i=0;i<ToshowchatList.length;i++){
                  if(ToshowchatList[i]==res.ChatId){
                  var dt = res.LocalDateTime;
                  var msgdate=getMsgdateTime(dt);
                  if(res.BrokerMessage != ''){
                  if(res.IsDeletedByBroker!="True"){
                  //alert("if");
                  /////Check this once again
                  //$('#chat1').append('<a data-transition="slide" href="#" onclick="ClickonBrokerChat(\'' + res.ChatId+ '\')"><p id='+res.ChatId+' class="Chat speechright msgRight fontcolorchat">'+res.BrokerMessage+' <span class="msgRight msgdatetime fontcolorchat" style="padding-top:5%;">&nbsp;&nbsp;'+msgdate+'</span></p></a><div class="cleardiv"></div>');
                  }
                  }
                  else{
                  if(res.IsRead=='False'){
                  listforread.push(parseInt(res.ChatId));
                  }
                  if(res.IsDeletedByBroker!="True"){
                  
                  }
                  }
                  
                  if(parseInt(chatMessage.length) == parseInt(i+1)){
                  ChattingTimestampDB=res.MessageDate;
                  }
                  }
                  
                  Brokeroldchatmsgarray.push(ToshowchatList[i]);
                  
                   var chatBoxheight=$('#chat1')[0].scrollHeight
                   ScrollDown(chatBoxheight);
                   $('#brokerChatcontent').blur();
                  }
                  Brokeroldchatmsgarray=jQuery.unique(Brokeroldchatmsgarray);
                  }
                  });
           
           
           
           
                 
         //  alert("after: "+ToshowchatList)
           
           
                ToshowchatList=[];
                $.each(IsMessageDeleted, function (i, res) {
                    IsDeletedonBroker1=res.IsDeleted;
                    if(res.IsDeleted=='True'){
                        $("#brokerChatcontentError").val('You can not send message because customer is no longer available for this chat.');
                        $("div#divMessage").hide();
                        $("#brokerChatcontentError").css("font-weight", "bold");
                        $("div#divError").show();
                        $("#brokerChatcontentError").attr("disabled", "disabled");
                    }
                    else{
                        $("div#divMessage").show();
                        $("div#divError").hide();
                    }
                                              
                });
           
                ChattingTimestampDB="";
                if(parseInt(listforread.length)>0 || flagIsRead=='False'){
                     SetIsReadFlag(listforread,UserId,BrokerMessageId);
                }
                else{
                     GetChatFlag='Yes';
                }
                $.mobile.loading("hide");
            }
            else if(issuccess==false){
                GetChatFlag='Yes';
                $.mobile.loading("hide");
                jQuery("label[for='messagetext']").html(ErrorMessage);
                $('#InfopopupChatBrokerMessage').popup('open');
            }
            else{
                $.mobile.loading("hide");
                jQuery("label[for='messagetext']").html("Please try again.");
                $('#InfopopupChatBrokerMessage').popup('open');
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
    if(GetChatFlag=='Yes'){
        GetChatFlag='No';
            $.ajax({
                type: "POST",
                url: webserviceURL,
                data: {UserId:UserId,MessageId:BrokerMessageId,ActionName:"DoGetUnreadChatMessages"},
                success: function (data) {
                    var obj = JSON.parse(data);
                    var issuccess = obj.IsSuccess;
                    var ErrorMessage=obj.ErrorMessage;
												
                    if(issuccess==true){
                        var chatMessage=obj.ChatMessages;
                        $.each(chatMessage, function (i, res) {
                            if(chatlist.indexOf(res.ChatId) >=0){
                                SetUnreadArrayInterval.push(parseInt(res.ChatId));
                            }
                            else{
								var dt = res.LocalDateTime;
                                var msgdate1=getMsgdateTime(dt);
                                SetUnreadArrayInterval.push(parseInt(res.ChatId));
                                $('#chat1').append('<a data-transition="slide" href="#" onclick="ClickonBrokerChat(\'' + res.ChatId+ '\')"><p id='+res.ChatId+' class="Chat speech fontcolorchat">'+res.CustomerMessage+' <span class="msgRight msgdatetime" style="padding-top:5%;">&nbsp;&nbsp;'+msgdate1+'</span></p></a>');
                               // if ($("#brokerChatcontent").is(':focus')) {
                                    var chatBoxheight=$('#chat1')[0].scrollHeight
                                    ScrollDown(chatBoxheight);
                               // }
                            }
                        });
											
                        var IsMessageDeleted=obj.IsMessageDeleted;
											
                        $.each(IsMessageDeleted, function (i, res) {
                            IsDeletedonBroker2=res.IsDeleted;
                            if(res.IsDeleted=='True'){
                                $("#brokerChatcontentError").val('You can not send message because customer is no longer available for this chat.');
                                $("div#divMessage").hide();
                                $("#brokerChatcontentError").css("font-weight", "bold");
                                $("div#divError").show();
                                $("#brokerChatcontentError").attr("disabled", "disabled");
                            }
                            else{
                                $("div#divMessage").show();
                                $("div#divError").hide();
                            }
                        });
                        if(parseInt(SetUnreadArrayInterval.length)>0){
                            SetIsReadFlag(SetUnreadArrayInterval,UserId,"");
						}
                        else{
							GetChatFlag='Yes';
						}
                    }
                    else{
                        GetChatFlag='Yes';
                    }
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                }
            });
        }
        else{
        }
    }, 1000);
               
	}
	else
	{
		$.mobile.loading("hide");
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/brokerMessage.html",{transition: "slide",reverse: false});	
	}
	
$('#brokerChatEnter').off("click").on("click", function() {
    var chatcontent=$('#brokerChatcontent').val();
    $('#brokerChatcontent').focus();
    if(chatcontent!=''){
                                      
		var msgdate2='';
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
            data: {BrokerMsgId:BrokerMessageId,CustomerMsgId:CustomerMessageId,CustomerId:CustomerId,BrokerId:BrokerId,BrokerMessage:chatcontent,OldMessageId:0,LocalDateTime:LocalDateTime,ActionName:"DoSaveBrokerChat"},
            success: function (data) {
				var obj = JSON.parse(data);
                var issuccess = obj.IsSuccess;
                var ErrorMessage=obj.ErrorMessage;
                if(issuccess==true){
                    var response=obj.Response;
                    var listforread = [];
                    $.each(response, function (i, res) {
                        cntchat.push(res.NewMessageId);
                        Brokeroldchatmsgarray.push(res.NewMessageId);
                        $('#chat1').append('<a data-transition="slide" href="#" onclick="ClickonBrokerChat(\'' + res.NewMessageId+ '\')"><p id='+res.NewMessageId+' class="Chat speechright msgRight fontcolorchat">'+chatcontent+'&nbsp;&nbsp; <span class="msgRight msgdatetime" style="padding-top:5%;" id="date'+submitChatCount+'"> </span></p></a><div class="cleardiv"></div>');
                        $("#date"+submitChatCount).text('Sending....');
                           
                      /*  var ActionName='';
                        var NewDevice='';
                        var indexid=DeviceId.indexOf('Android');
                        var indexid1=DeviceId.indexOf('iOS');
                        
                        if(parseInt(indexid) >= 0){
                            ActionName='DoPushNotification';
                            NewDevice=DeviceId.replace('Android','');
                        }
                        else if(parseInt(indexid1) >= 0){
                            ActionName='DoPushNotificationForiOS';
                            NewDevice=DeviceId.replace('iOS','');
                        }
                        */
                      //  if(DeviceId !=='' || DeviceId !== null){
                            var title=menuFirstname+' '+ menuLastname;
                            var msgcnt=1;
                            var message=chatcontent;
                               
                            $.ajax({
                                type: "POST",
                                url: webserviceURL,
                                data: {/*DeviceId:NewDevice,*/message:message,title:title,msgcnt:msgcnt,UserId:CustomerId,ActionName:"DoSendNotification"},
                                success: function (data) {
                                
                                },
                                error : function(XMLHttpRequest, textStatus, errorThrown) {
                                      //alert('error'+textStatus);
                                }
                            });
                               
                       // }
							 
                        var chatBoxheight=$('#chat1')[0].scrollHeight
                        ScrollDown(chatBoxheight);
                        var dt = res.LocalDateTime;
                        var msgdate2=getMsgdateTime(dt);
                        $("#date"+submitChatCount).text(msgdate2);
                        submitChatCount++;
							
                    });
               
                    $.mobile.loading("hide");
                }
                else if(issuccess==false){
                    $.mobile.loading("hide");
                    jQuery("label[for='messagetext']").html(ErrorMessage);
                    $('#InfopopupChatBrokerMessage').popup('open');
                }
                else{
                    $.mobile.loading("hide");
                    jQuery("label[for='messagetext']").html("Please try again.");
				    $('#InfopopupChatBrokerMessage').popup('open');
                }
            },
				
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                if(errorThrown!=""){
                    $.mobile.loading("hide");
                    jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
                    $('#InfopopupChatBrokerMessage').popup('open');
                }
                else{
                }
            }
        });
			
        $.mobile.loading("hide");
        $('#brokerChatcontent').val("");
       //// var chatBoxheight=$('#chat1')[0].scrollHeight
        ////ScrollDown(chatBoxheight);
    }
   //// var chatBoxheight=$('#chat1')[0].scrollHeight
    ////ScrollDown(chatBoxheight);
                                     // alert(chatBoxheight);
});
/*
$( "#brokerChatcontent" ).click(function() {
   var chatBoxheight=$('#chat1')[0].scrollHeight
   ScrollDown(chatBoxheight);
});*/
               
 
$("input").focus(function () {
   /* window.currentHeight = $(this).height();
    window.height = $(window).height();
    setTimeout(function() {
        window.scrollTo(0, window.currentHeight);
    }, 0);
   
    var chatBoxheight=$('#chat1')[0].scrollHeight
    ScrollDown(chatBoxheight);*/
});

$('#OkbtnChatBrokerMessage').off("click").on("click", function() {
    $('#InfopopupChatBrokerMessage').popup('close');
});
	
$('#BrokerChatMessageBackBtn').off("click").on("click", function() {
    window.clearInterval(MyVarBroker);
    $("#BrokerChatMessageBackBtn").attr('class','backbtnArrow');
    $("#BrokerChatMessageBackBtn" ).toggle( "highlight" );
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/brokerMessage.html",{transition: "slide",reverse: true});
});
	
	
	
	
$(document).on( 'taphold', 'p.Chat', tapholdHandler );
function tapholdHandler( event ){
   	if(brokerdeletechatmsgarray.indexOf(this.id) >=0)
        {//alert('contains '+ this.id);
        }
   	else
        {
        // alert('else '+this.id);
   		brokerdeletechatmsgarray.push(this.id);
        $('#'+this.id).addClass('SelectChatForDelete');
        $('#deletechatbroker').show();
    }
}
        
$('#deletechatbroker').off("click").on("click", function() {
    jQuery("label[for='messagetextdeletecon']").html('Are you sure to delete chat messages?');
    $('#deleteconfirmpopupbroker').popup('open');
});
	 
$('#deleteconfirmpopupclosebroker').off("click").on("click", function() {
    $('#deleteconfirmpopupbroker').popup('close');
});
	 
$('#deletemessagesconfirmbroker').off("click").on("click", function() {
    var listtodelete=brokerdeletechatmsgarray.toString();

    $.ajax({
        type: "POST",
        url: webserviceURL,
        data: {UserId:UserId,MessageId:listtodelete,ActionName:"DoDeleteMultipleChatMessage"},
        success: function (data) {
            var obj = JSON.parse(data);
            var issuccess = obj.IsSuccess;
            var ErrorMessage=obj.ErrorMessage;
                
            if(issuccess==true){
                for(i=0; i<=brokerdeletechatmsgarray.length;i++){
                    $('#'+brokerdeletechatmsgarray[i]).remove();
                }
                
                $('#deletechatbroker').hide();
                brokerdeletechatmsgarray=[];
                $('#deleteconfirmpopupbroker').popup('close');
            }
            else if(issuccess==false){
                $('#deleteconfirmpopupbroker').popup('close');
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            $('#deleteconfirmpopupbroker').popup('close');
        }
    });
});
  
});//PAGESHOW END

function ClickonBrokerChat(ChatId)
{
    if(parseInt(brokerdeletechatmsgarray.length) >0)
    {
        if(brokerdeletechatmsgarray.indexOf(ChatId) >=0)
        {
            $('#'+ChatId).removeClass('SelectChatForDelete');
            brokerdeletechatmsgarray = jQuery.grep(brokerdeletechatmsgarray, function(value) {
                return value != ChatId;
            });
            if(parseInt(brokerdeletechatmsgarray.length) <=0)
            {
                $('#deletechatbroker').hide();
            }
        }
        else
        {
            brokerdeletechatmsgarray.push(ChatId);
            $('#'+ChatId).addClass('SelectChatForDelete');
            $('#deletechatbroker').show();
        }
    }
   
}










