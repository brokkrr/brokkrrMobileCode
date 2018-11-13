$(document).on("pagehide","#brokerMessagePage",function(){
        window.clearInterval(MessageIntervalbroker);
});

$(document).on("pagebeforeshow","#brokerMessagePage",function(){
        $("#deletemultiplemsg").hide();
		//$("#messageSearchheader").hide();
		CountMsg=0;
        MessageExistInDB="false";
		messagelist=[];
		deletemsgarray=[];
});

var MessageTimestampDB="";

$(document).on("pageshow","#brokerMessagePage", function( event ) {
               CheckDeviceId(useridBroker);
               var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }
               else{
               hbcontent=stopPageOverflow(hbcontent);
               }
               $('.ui-content').css('height',hbcontent);
               
	$("#deletemultiplemsg").hide();
    var editclick="false";
    var cnt;
    $.mobile.loading("show");
    //$("#messageSearchheader").hide();
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
    var DeviceId; //Notification 1Dec16
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

    getMenuDetailsBrokkrr(menuFirstname,menuLastname,menuProfilepic);//Hambergermenu
        
	$.ajax({		
		type: "POST",
		url: webserviceURL,
		data: {UserId:UserId,TimeStamp:MessageTimestampDB,ActionName:"DoGetMessages"},
		success: function (data) {
          //alert(data);
			var obj = JSON.parse(data);
			var issuccess = obj.IsSuccess;
			var ErrorMessage=obj.ErrorMessage;
          
			if(issuccess==true){
				var ContactedMessageList=obj.ContactedMessageList;
               //alert(ContactedMessageList);
				if(parseInt(ContactedMessageList.length) > 0)
	       		{
					$.each(ContactedMessageList, function (i, res) {
                          
						if(messagelist.indexOf(res.MessageId) >=0)
						{//alert('contains');
						}
						else{ //alert('not contains '+ res.MessageId);
                           var content='';
                           var profileimg='';
					
                           if(res.ProfilePictureImg!=''){
                                profileimg=res.ProfilePictureImg;
							}
                           else{
                                profileimg=dcustomerimg;//'../images/customer.jpg';
							}
							var dt = res.LocalDateTime;
                            var msgdate=getMsgdateTime(dt);
  
							content='<li  id='+res.MessageId+' data-corners="false"  data-shadow="false" data-inset=true data-wrapperels="div" data-icon="arrow-r"  data-theme="c"  class="ui-btn ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c message" style="height:110px!important;width:110% !important;">'
                            +'<div style="width:100% !important;margin-top:-7%!important;">'
                            +'<div style="height:60px;width:94% !important;float:left !important;" >'
							+'<div onclick="getChatMessageBroker(\'' + res.MessageId+ '\',\''+res.CustomerMsgId+'\' ,\'' + res.BrokerId+ '\',\'' + res.CustomerId+ '\',\'' + res.CustomerName+ '\',\''+msgdate+'\',\''+res.DeclarationDocPath+'\')">'
						    +'<img src='+profileimg+' class="ui-li-thumb circle"  width="100" height="100">'
						    +'<h3 class="ui-li-heading NameMessage" ><div style="display:none;" id="IsRead'+res.MessageId+'">true</div><span id="Name'+res.MessageId+'"> '+res.CustomerName+' </span> <br><div style="display:none;" id="Hidden'+res.MessageId+'"> '+res.CustomerName+' </div> </h3>'
						    +'<div class="countmsg" id="Count'+res.MessageId+'" ></div>'
						  
						    +'<p class="ui-li-desc MainMessage" id="LatestMsg'+res.MessageId+'">'+res.Message+'</p>'
							//+'</a></div>'
							+'</div></div>'
							+'<div class="tickdiv"><img src="../images/redioButton.png" id="tick'+res.MessageId+'" onclick="getBrokerDeletedItems(\'' + res.MessageId+ '\')" class="tickimg"></div>'
							+'</div>'
							+'<br>'
							+'<br>'
						    +'<div class="msgDate" id="date'+res.MessageId+'">'+msgdate+'</div>'
                            +'<div onclick="getChatMessageBroker(\'' + res.MessageId+ '\',\''+res.CustomerMsgId+'\' ,\'' + res.BrokerId+ '\',\'' + res.CustomerId+ '\',\'' + res.CustomerName+ '\',\''+msgdate+'\',\''+res.DeclarationDocPath+'\')"><img src="../images/arrow.png" class="arrowmsg" ></div>'
                            +'<input type="hidden" id="mainmsg'+res.MessageId+'" />'
						    +'</li>';
						    $('#IsRead'+res.MessageId).text(res.IsRead);
                        
							//DB Change
							//if(MessageTimestamp=="")
							if(parseInt(ContactedMessageList.length) == parseInt(i+1))
							{
								MessageTimestamp=res.ContactDate;
							}
                          
							messagelist.push(res.MessageId);
                           //alert("normal"+messagelist);
							$('#brokerMeassage').prepend(content);
                            $('#mainmsg'+res.MessageId).val(res.Message);
                           
						    CountMsg++;
						}	
						
					 });
					$('ul#brokerMeassage').listview('refresh');
					//messagelist=[];
                    if(MessageTimestampDB=="")
                        {
                        MessageTimestamp="";
                        }
                    else
                        {
          
                        MessageTimestamp="";
                        }
	       		}
				else
				{
                    var	content='<li align="center" data-corners="false"  data-shadow="false" data-inset=true data-wrapperels="div" data-icon="arrow-r"  data-theme="c" class="ui-btn ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c">'
						+'Message not available.'
					    +'</li>';
						$('#brokerMeassage').append(content);
						$('ul#brokerMeassage').listview('refresh');
                }
		
                /*get latest message*/
                $.ajax({
                  type: "POST",
                  url: webserviceURL,
                  data: {UserId:UserId,ActionName:"DoGetUnreadMsgCount"},
                  success: function (data) {
                       var obj = JSON.parse(data);
                       var issuccess = obj.IsSuccess;
                       var ErrorMessage=obj.ErrorMessage;
                       var MessageDetails=obj.MessageDetails;
                       var ContactedMessageList=obj.ContactedMessageList;
                  
                       if(issuccess==true){
                            var totalunreadconver=0;
                  
                            $.each(MessageDetails, function (i, res) {
                                   if(parseInt(res.Cnt) >=1){
                                        totalunreadconver++;
                                        jQuery('#Count'+res.MessageId).addClass('circlechatcount');
                                        jQuery('#date'+res.MessageId).addClass('UnreadMsgdate');
                                        $('#Count'+res.MessageId).text(res.Cnt);
                         
                                   }

                                   var dt = res.dtime;
                                   var msgdate=getMsgdateTime(dt);
                                   $('#date'+res.MessageId).text(msgdate);
                         
                                   if(res.CustMessage!=''){
                                        $('#LatestMsg'+res.MessageId).text(res.CustMessage);
                                   }
                                   else{
                                        var msgid=res.MessageId;
                                        getmsg(UserId,msgid);//ajax called
                                   }
                            });
                            if(totalunreadconver >0){
                                jQuery('#totalunreadcount').addClass('circlechatcountheader');
                                $('#totalunreadcount').text(totalunreadconver);
                                jQuery('#totalunreadcountmenubroker').addClass('circlechatcountheader');
                                $('#totalunreadcountmenubroker').text(totalunreadconver);
                            }
                       }
                       },
                       error : function(XMLHttpRequest, textStatus, errorThrown) {
                       }
                });
           /*get latest message*/
                $.mobile.loading("hide");
			}
			else if(issuccess==false){
				$.mobile.loading("hide"); //1.4.5
				jQuery("label[for='messagetext']").html(ErrorMessage);
		    	$('#InfopopupBrokerMessage').popup('open');
            }
			else{
				$.mobile.loading("hide"); //1.4.5
				jQuery("label[for='messagetext']").html("Please try again.");
		    	$('#InfopopupBrokerMessage').popup('open');
            }
			},
            error : function(XMLHttpRequest, textStatus, errorThrown) {
			//alert('Error');
		    }
	});

/*get latest message*/
      
MessageIntervalbroker=setInterval(function(){
    $.ajax({
        type: "POST",
        url: webserviceURL,
        data: {UserId:UserId,TimeStamp:MessageTimestampDB,ActionName:"DoGetMessages"},
        success: function (data) {
            var arrayList=[];
            var obj = JSON.parse(data);
            var issuccess = obj.IsSuccess;
            var ErrorMessage=obj.ErrorMessage;
                                                          
            if(issuccess==true){
                var ContactedMessageList=obj.ContactedMessageList;
                if(parseInt(ContactedMessageList.length) > 0){
                     $.each(ContactedMessageList, function (i, res) {
                          arrayList.push(res.MessageId);
                     });
                     $('ul#brokerMeassage').listview('refresh');
                }
                $.each(messagelist, function(idx, value){
                     if ($.inArray(value,arrayList) == -1) {
                          $('li#'+value).remove();//remove
                     }
                });
                $.mobile.loading("hide");
            }
            else if(issuccess==false){
                $.mobile.loading("hide"); //1.4.5
                jQuery("label[for='messagetext']").html(ErrorMessage);
                $('#InfopopupBrokerMessage').popup('open');
            }
            else{
                $.mobile.loading("hide"); //1.4.5
                jQuery("label[for='messagetext']").html("Please try again.");
                $('#InfopopupBrokerMessage').popup('open');
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
        }
    });
    $.ajax({
        type: "POST",
        url: webserviceURL,
        data: {UserId:UserId,ActionName:"DoGetUnreadMsgCount"},
        success: function (data) {
           
            var obj = JSON.parse(data);
            var issuccess = obj.IsSuccess;
            var ErrorMessage=obj.ErrorMessage;
            var MessageDetails=obj.MessageDetails;
            var badgescount='';
            var badgescnt=obj.UnreadMsgCnt;
            var ContactedMessageList=obj.ContactedMessageList;
            var mainmsgarray=[];
                                                        
            if(issuccess==true){
                                                       
                $.each(badgescnt, function (i, res) {
                    badgescount=res.UnreadMsgCnt;
                });
                cnt=badgescount;
                //window.plugins.pushNotification.setApplicationIconBadgeNumber(noti.successHandler,noti.errorHandler, cnt);
                app.push.setApplicationIconBadgeNumber(function() {},function() {},cnt);
                var totalunreadconver=0;
                if(parseInt(ContactedMessageList.length) > 0){
                    totalunreadconver=parseInt(ContactedMessageList.length);
                    $.each(ContactedMessageList, function (i, res) {
                        mainmsgarray.push(res.MessageId);
                        jQuery('#Count'+res.MessageId).addClass('circlechatcount');
                        jQuery('#date'+res.MessageId).addClass('UnreadMsgdate');
                        $('#Count'+res.MessageId).text('1');
                                                               
                        if(messagelist.indexOf(res.MessageId) >=0){//alert('contains');
                        }
                        else{// alert('not contains '+ res.MessageId);
                            var content='';
                            var profileimg='';
                            if(res.ProfilePictureImg!=''){
                                profileimg=res.ProfilePictureImg;
                            }
                            else{
                                profileimg=dcustomerimg;
                            }
                            var dt = res.LocalDateTime;
                            var msgdate=getMsgdateTime(dt);
                           
                            content='<li id='+res.MessageId+' class="ui-btn ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c message" style="height:110px!important;width:110% !important;" >'
                                +'<div style="width:100% !important;margin-top:-7%!important;">'
                                +'<div style="height:60px;width:94% !important;float:left !important;" >'
                                +'<div onclick="getChatMessageBroker(\'' + res.MessageId+ '\',\''+res.CustomerMsgId+'\' ,\'' + res.BrokerId+ '\',\'' + res.CustomerId+ '\',\'' + res.CustomerName+ '\', \''+msgdate+'\',\''+res.DeclarationDocPath+'\')">'
                                +'<img src='+profileimg+' class="ui-li-thumb circle"  width="100" height="100">'
                                +'<h3 class="ui-li-heading NameMessage" ><div style="display:none;" id="IsRead'+res.MessageId+'">true</div><span id="Name'+res.MessageId+'"> '+res.CustomerName+'</span> <br><div style="display:none;" id="Hidden'+res.MessageId+'"> '+res.CustomerName+' </div> </h3>'
                                +'<div class="countmsg" id="Count'+res.MessageId+'" ></div>'
                                +'<p class="ui-li-desc MainMessage" id="LatestMsg'+res.MessageId+'">'+res.Message+'</p>'
                                //+'</a></div>'
                                +'</div></div>'
                                +'<div class="tickdiv"><img src="../images/redioButton.png" id="tick'+res.MessageId+'" onclick="getBrokerDeletedItems(\'' + res.MessageId+ '\')" class="tickimg"></div>'
                                +'</div>'
                                +'<br>'
                                +'<br>'
                                +'<div class="msgDate" id="date'+res.MessageId+'">'+msgdate+'</div>'
                                +'<div onclick="getChatMessageBroker(\'' + res.MessageId+ '\',\''+res.CustomerMsgId+'\' ,\'' + res.BrokerId+ '\',\'' + res.CustomerId+ '\',\'' + res.CustomerName+ '\',\''+msgdate+'\',\''+res.DeclarationDocPath+'\')"><img src="../images/arrow.png" class="arrowmsg"></div>'
                                +'<input type="hidden" id="mainmsg'+res.MessageId+'" />'
                                +'</li>';
                                //DB Change
                                //if(MessageTimestamp=="")
                                if(parseInt(ContactedMessageList.length) == parseInt(i+1)){
                                        MessageTimestamp=res.ContactDate;
                                }
                           
                                messagelist.push(res.MessageId);
                                                            
                                $('#brokerMeassage').prepend(content);
                                $('#mainmsg'+res.MessageId).val(res.Message);
                                                               
                                $('ul#brokerMeassage').listview('refresh');
                                CountMsg++;
                                                               
                            }
                            $('#IsRead'+res.MessageId).text(res.IsRead);
                    });
                }
                                                      
                var UnreadMsgArray = [];

                $.each(MessageDetails, function (i, res) {
                    var msgcountevery=0;
                    if(mainmsgarray.indexOf(res.MessageId) <0){
                        if(parseInt(res.Cnt) >0){
                            totalunreadconver++;
                            UnreadMsgArray.push(res.MessageId);
                        }
                    }
                                                               
                    $.each(ContactedMessageList, function (i, res1) {
                        UnreadMsgArray.push(res1.MessageId);
                        if(parseInt(res.MessageId) == parseInt(res1.MessageId)){
                            msgcountevery++
                        }
                    });
                       
                    msgcountevery=parseInt(res.Cnt) + parseInt(msgcountevery);
                    if(parseInt(msgcountevery) >=1){
                        jQuery('#Count'+res.MessageId).addClass('circlechatcount');
                        jQuery('#date'+res.MessageId).addClass('UnreadMsgdate');
                        $('#Count'+res.MessageId).text(msgcountevery);
                    }
                                                               
                    var dt = res.dtime;
                    var msgdate=getMsgdateTime(dt);
                                                               
                    $('#date'+res.MessageId).text(msgdate);
                    if(res.CustMessage!=''){
                        $('#LatestMsg'+res.MessageId).text(res.CustMessage);
                    }
                    else{
                        var msgid=res.MessageId;
                        getmsg(UserId,msgid);//ajax called;
                    }
                });
           
                if(MessageDetails.length>0){
                    $.each(messagelist, function (idx, value) {
                        if ($.inArray(value, UnreadMsgArray) == -1) {
                            jQuery('#Count' + value).removeClass('circlechatcount');
                            jQuery('#date' + value).removeClass('UnreadMsgdate');
                            $('#Count' + value).text('');
                        }
                    });
                }
                                                        
                if(totalunreadconver >0){
                    jQuery('#totalunreadcount').addClass('circlechatcountheader');
                    $('#totalunreadcount').text(totalunreadconver);
                    jQuery('#totalunreadcountmenubroker').addClass('circlechatcountheader');
                    $('#totalunreadcountmenubroker').text(totalunreadconver);
                }
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}, 2000);

$('#OkbtnBrokerMessage').off("click").on("click", function() {
    $('#InfopopupBrokerMessage').popup('close');
});
               
$('#deletemessages').off("click").on("click", function() {
    if(editclick=="false"){
        $('.tickimg').css({ display: "block" });
        editclick="true";
    }
    else{
        $('.tickimg').css({ display: "none" });
        editclick="false";
    }
});
	 
$('#deleteconfirmpopupcloseBrokerMessage').off("click").on("click", function() {
    $('#deleteconfirmpopupBrokerMessage').popup('close');
});
	 
$('#deletemultiplemsg').off("click").on("click", function() {
    jQuery("label[for='messagetextdeletecon']").html('Are you sure to delete messages?');
    $('#deleteconfirmpopupBrokerMessage').popup('open');
});
	 
$('#deletemessagesconfirmBrokerMessage').off("click").on("click", function() {
    var listtodelete=deletemsgarray.toString();
    $.ajax({
        type: "POST",
        url: webserviceURL,
        data: {UserId:UserId,MessageId:listtodelete,ActionName:"DoDeleteMultipleMessage"},
        success: function (data) {
            var obj = JSON.parse(data);
            var issuccess = obj.IsSuccess;
            var ErrorMessage=obj.ErrorMessage;
            if(issuccess==true){
				for(i=0; i<=deletemsgarray.length;i++){
					$('#'+deletemsgarray[i]).remove();
                }
                // $('#brokerSearchbtn').show();
                deletemsgarray=[];
                CountMsg--;
                if(CountMsg==0){
                    var	content='<li align="center" data-corners="false"  data-shadow="false" data-inset=true data-wrapperels="div" data-icon="arrow-r"  data-theme="c" class="ui-btn ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c">'
							+'Message not available.'
						    +'</li>';
                        $('#brokerMeassage').append(content);
                        $('ul').listview('refresh');
                }
                $('.tickimg').css({ display: "none" });
                $("#deletemultiplemsg").hide();
                $("#deletemessages").show();
                editclick="false";
                $('#deleteconfirmpopupBrokerMessage').popup('close');
            }
            else if(issuccess==false){
                $('.tickimg').css({ display: "none" });
                $("#deletemultiplemsg").hide();
                $("#deletemessages").show();
                editclick="false";
                $('#deleteconfirmpopupBrokerMessage').popup('close');
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            $('#deleteconfirmpopupBrokerMessage').popup('close');
        }
    });
});
	 
$(document).on("touchstart",function(event){
    var a3 = Swiped.init({
        query: '#brokerMeassage li',
        list: true,
        left: 185
    });
    $('#brokerMeassage li').addClass('dynamicclass');
    });
               
});//PAGE SHOW


function getChatMessageBroker(BrokerMessageId,CustomerMessageId,BrokerId,CustomerId,CustomerName,MsgDate,DeclarationDocPath)
	{
      
        var mainmsgtext=$('#mainmsg'+BrokerMessageId).val();
        deletemsgarray=[];
        var msgisread=document.getElementById('IsRead'+BrokerMessageId).innerHTML;
        var getMegdetails='{"BrokerMessageId":"'+BrokerMessageId+'","CustomerMessageId":"'+CustomerMessageId+'","BrokerId":"'+BrokerId+'","CustomerId":"'+CustomerId+'" ,"CustomerName":"'+CustomerName+'","Message":"'+mainmsgtext+'","MsgDate":"'+MsgDate+'","IsRead":"'+msgisread+'","DeclarationDocPath":"'+DeclarationDocPath+'"}';
   
        sessionStorage.setItem('getMegdetailsForChat',getMegdetails);
        
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "brokerChatMessage.html",{transition: "slide",reverse: false});
	}

function getBrokerDeletedItems(id)
{
deletemsgarray.push(id);
    
if(parseInt(deletemsgarray.length) >0){
    if(deletemsgarray.indexOf(id) >=0)
    {
        $('#tick'+id).attr('src','../images/radioBtn_checked.png');
        $("#deletemessages").hide();
        $("#deletemultiplemsg").show();
        
        for (var i = 0; i < deletemsgarray.length; i++)
        {
            for (var j = 0; j < deletemsgarray.length; j++)
            {
                if (i != j)
                {
                    if (deletemsgarray[i] == deletemsgarray[j])
                    {
                        removeBrokerTick(deletemsgarray[i]);
                    }
                }
            }
        }
    }
}
    
}


function removeBrokerTick(removeid){
    $('#tick'+removeid).attr('src','../images/redioButton.png');
    deletemsgarray = jQuery.grep(deletemsgarray, function(value) {
        return value != removeid;
    });
    
    if(parseInt(deletemsgarray.length) <=0)
    {
        $("#deletemessages").show();
        $("#deletemultiplemsg").hide();
    }
}

