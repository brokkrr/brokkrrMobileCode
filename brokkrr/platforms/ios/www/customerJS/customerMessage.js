$(document).on("pagehide","#customerMessagePage",function(){
	window.clearInterval(MessageIntervalCust);
});

$(document).on("pagebeforeshow","#customerMessagePage",function(){
        $("#Customerdeletemultiplemsg").hide();
	//	$("#messageSearchheader").hide();
		CountMsg=0;
		//DB Change
		MessageExistInDB="false"; 
		messagelist=[];
		deletemsgarray=[];
		 var user=sessionStorage.getItem('CustomerUser');
		 var useridtemp="";
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
			
});

//DB Change
var MessageTimestamp="";


$(document).on("pageshow","#customerMessagePage", function( event ) {
CheckDeviceId(useridCust);
               var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }
               else{
              hbcontent=stopPageOverflow(hbcontent);
               }
               
               $('.ui-content').css('height',hbcontent);
               
               $("#Customerdeletemultiplemsg").hide();
               var editclick="false";
               var cnt;

    $.mobile.loading("show");
    var user=sessionStorage.getItem('CustomerUser');
    if(user===null || user=='')
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
		
	}
	
    var UserId, EmailId, FirstName, LastName,profilepic,registeredfor;
    
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
            registeredfor=userobj.RegisteredFor;
		});
	}
	else
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
	}
    showmenulink(registeredfor);
	var profile='';
	
getMenuDetailsCustomer(menuCustFirstname,menuCustLastname,menuCustProfilepic);
	
	//DB Change MessageTimestampDB
	//GetCustomerMessage('Select * from CustomerMessage WHERE UserID="'+UserId+'" order by id asc');
	//alert('timestamp '+MessageTimestampDB);
	$.ajax({		
		type: "POST",
		url: webserviceURL,
		data: {UserId:UserId,TimeStamp:MessageTimestampDB,ActionName:"DoGetMessages"},
		success: function (data) {	
			//alert('Success Auto');
			//alert('Success data '+ data);
			var obj = JSON.parse(data);
			//alert(data);
			var issuccess = obj.IsSuccess;
			var ErrorMessage=obj.ErrorMessage;
					
			if(issuccess==true)
				{
				//alert('array '+messagelist);
				var ContactedMessageList=obj.ContactedMessageList;
				//alert('msg count :'+parseInt(ContactedMessageList.length));
				if(parseInt(ContactedMessageList.length) > 0)
	       		{
				//alert('IF');
					
					$.each(ContactedMessageList, function (i, res) {
						
					if(messagelist.indexOf(res.MessageId) >=0)	
					{//alert('contains');
					}
					else{ //alert('not contains '+ res.MessageId);
					var content='';
					var profileimg='';
						if(res.ProfilePictureImg!='')
							{
							
							profileimg=res.ProfilePictureImg;
							}
						else
							{
                           profileimg=dcustomerimg;//'../images/customer.jpg';
							}
						
						//var dt = res.ContactDate;
						var dt = res.LocalDateTime;
                        var msgdate=getMsgdateTime(dt);
                           
					
						
						
						
                    content='<li  id='+res.MessageId+' data-corners="false"  data-shadow="false" data-inset=true data-wrapperels="div" data-icon="arrow-r"  data-theme="c" class="ui-btn ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c message" style="height:110px!important;width:110% !important;">'
						+'<div  class="ui-btn-inner ui-li" style="width:100% !important;margin-top:-7%!important;">'
						+'<div class="ui-btn-text" style="height:60px;width:94% !important;float:left !important;">'
						+'<div data-transition="slide" onclick="getChatMessageCustomer(\'' + res.BrokerMsgId+ '\',\''+res.MessageId+'\' ,\'' + res.BrokerId+ '\',\'' + res.CustomerId+ '\',\'' + res.BrokerName+ '\',\''+msgdate+'\')">'
					    +'<img src='+profileimg+' class="ui-li-thumb circle" width="100" height="100">'
					    +'<h3 class="ui-li-heading NameMessage"><div style="display:none;" id="IsRead'+res.MessageId+'">true</div><span id="Name'+res.MessageId+'" > '+res.BrokerName+' </span> <br><div style="display:none;" id="Hidden'+res.MessageId+'"> '+res.BrokerName+' </div></h3>'
					    +'<div class="countmsg" id="Count'+res.MessageId+'" ></div>'
					    +'<p class="ui-li-desc MainMessage" id="LatestMsg'+res.MessageId+'">'+res.Message+'</p>'
                        +'</div></div>'
						+'<div class="tickdiv"><img src="../images/redioButton.png" id="tick'+res.MessageId+'" onclick="getDeletedItems(\'' + res.MessageId+ '\')" class="tickimg"></div>'
						+'</div>'
						+'<br>'
						+'<br>'
					    +'<div class="msgDate" id="date'+res.MessageId+'">'+msgdate+'</div>'
                        +'<div onclick="getChatMessageCustomer(\'' + res.BrokerMsgId+ '\',\''+res.MessageId+'\' ,\'' + res.BrokerId+ '\',\'' + res.CustomerId+ '\',\'' + res.BrokerName+ '\',\''+msgdate+'\')"><img src="../images/arrow.png" class="arrowmsg"></div>'
                        +'<input type="hidden" id="mainmsgtext'+res.MessageId+'" />'
					    +'</li>';
						$('#IsRead'+res.MessageId).text(res.IsRead);
						//DB Change
						if(parseInt(ContactedMessageList.length) == parseInt(i+1))
						{
							MessageTimestamp=res.ContactDate;
						}
						
                           
                           messagelist.push(res.MessageId);
						
						$('#CustomerMeassage').prepend(content);
                        $('#mainmsgtext'+res.MessageId).val(res.Message);
                           
						CountMsg++;
						
							
					}
                           
                           
					 });
					$('ul#CustomerMeassage').listview('refresh');
			
					//DB Change
					
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
					//DB Change
					if(MessageExistInDB!="true")
					{
					var	content='<li data-corners="false"  data-shadow="false" data-inset=true data-wrapperels="div" data-icon="arrow-r"  data-theme="c" class="ui-btn ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c">'
						+'Message not available.'
					    +'</li>';
						$('#CustomerMeassage').append(content);

						$('ul#CustomerMeassage').listview('refresh');
					}
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
                  if(issuccess==true)
                  {
                  var totalunreadconver=0;
                  $.each(MessageDetails, function (i, res) {
                         if(parseInt(res.Cnt) >=1)
                         {
                         totalunreadconver++;
                         jQuery('#Count'+res.MessageId).addClass('circlechatcount');
                         jQuery('#date'+res.MessageId).addClass('UnreadMsgdate');
                         $('#Count'+res.MessageId).text(res.Cnt);
                         
                         }

                         var dt = res.dtime;
                         var msgdate=getMsgdateTime(dt);

                         $('#date'+res.MessageId).text(msgdate);
                         
                         if(res.BrokerMessage!=''){
                         $('#LatestMsg'+res.MessageId).text(res.BrokerMessage);
                         }
                         else{
                         var msgid=res.MessageId;

                         getmsg(UserId,msgid);//ajax called
                         }
                         
                         
                         if(totalunreadconver >0)
                         {
                         jQuery('#totalunreadcount').addClass('circlechatcountheader');
                         $('#totalunreadcount').text(totalunreadconver);
                         
                         jQuery('#totalunreadcountmenucust').addClass('circlechatcountheader');
                         $('#totalunreadcountmenucust').text(totalunreadconver);
                         }
                         
                         });
                  }
                  
                  },
                  error : function(XMLHttpRequest, textStatus, errorThrown) {
                  
                  }
                  });
           
           
           /*get latest message*/
           
				
					$.mobile.loading("hide");
			}
			else if(issuccess==false)
			{
				$.mobile.loading("hide"); //1.4.5
				jQuery("label[for='messagetext']").html(ErrorMessage);
		    	$('#InfopopupCustomerMessage').popup('open');
					
				}
			else
				{
				$.mobile.loading("hide"); //1.4.5
				jQuery("label[for='messagetext']").html("Error occured,Please try again.");
		    	$('#InfopopupCustomerMessage').popup('open');
				}
			},
		error : function(XMLHttpRequest, textStatus, errorThrown) {

			$.mobile.loading("hide");
			jQuery("label[for='messagetext']").html("Error occured,Please try again.");
	    	$('#InfopopupCustomerMessage').popup('open');
		}			 			
	});

    $('#footerSearchBroker').off("click").on("click", function() {
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/meinekelines.html",{transition: "slide",reverse: false});
    });

               MessageIntervalCust=setInterval(function()
                                               {
                                               /*Delete messages remove Yogita*/
                                               $.ajax({
                                                type: "POST",
                                                url: webserviceURL,
                                                data: {UserId:UserId,TimeStamp:MessageTimestampDB,ActionName:"DoGetMessages"},
                                                success: function (data) {
                                                var arrayList=[];
                                                var obj = JSON.parse(data);
                                                var issuccess = obj.IsSuccess;
                                                var ErrorMessage=obj.ErrorMessage;
                                                
                                                if(issuccess==true)
                                                {
                                                
                                                var ContactedMessageList=obj.ContactedMessageList;
                                                
                                                
                                                if(parseInt(ContactedMessageList.length) > 0)
                                                {
                                                
                                                $.each(ContactedMessageList, function (i, res) {
                                                       arrayList.push(res.MessageId);
                                                       });
                                                $('ul#brokerMeassage').listview('refresh');
                                                }
                                                var TodeleteList = [];
                                                $.each(messagelist, function(idx, value){
                                                       if ($.inArray(value,arrayList) == -1) {
                                                       TodeleteList.push(value);
                                                       }
                                                       });
                                                // alert("TodeleteList"+TodeleteList);
                                                for(i=0;i<TodeleteList.length;i++){
                                                $('li#'+TodeleteList[i]).remove();//remove
                                                }
                                                
                                                $.mobile.loading("hide");
                                                }
                                                else if(issuccess==false)
                                                {
                                                $.mobile.loading("hide"); //1.4.5
                                                jQuery("label[for='messagetext']").html(ErrorMessage);
                                                $('#InfopopupBrokerMessage').popup('open');
                                                
                                                }
                                                else
                                                {
                                                $.mobile.loading("hide"); //1.4.5
                                                jQuery("label[for='messagetext']").html("Please try again.");
                                                $('#InfopopupBrokerMessage').popup('open');
                                                }
                                                },
                                                error : function(XMLHttpRequest, textStatus, errorThrown) {
                                                //alert('Error');
                                                }
                                                });
                                               /*deleted messages removed Yogita*/
                                               
                                               
                                               
                                               $.ajax({
                                                      type: "POST",
                                                      url: webserviceURL,
                                                      data: {UserId:UserId,ActionName:"DoGetUnreadMsgCount"},
                                                      success: function (data) {
                                                     // alert('data '+data);
                                                      var obj = JSON.parse(data);
                                                      var issuccess = obj.IsSuccess;
                                                      var ErrorMessage=obj.ErrorMessage;
                                                      var MessageDetails=obj.MessageDetails;
                                                      var badgescount='';
                                                      var badgescnt=obj.UnreadMsgCnt;

                                                      
                                                      var ContactedMessageList=obj.ContactedMessageList;
                                                      var mainmsgarray=[];
                                                      
                                                      if(issuccess==true)
                                                      {
                                                      $.each(badgescnt, function (i, res) {
                                                             badgescount=res.UnreadMsgCnt;
                                                             });
                                                      cnt=badgescount;
                                                      //window.plugins.pushNotification.setApplicationIconBadgeNumber(noti.successHandler,noti.errorHandler, cnt);
                                                       app.push.setApplicationIconBadgeNumber(function() {},function() {},cnt);
                                                      var totalunreadconver=0;
                                                      
                                                      if(parseInt(ContactedMessageList.length) > 0)
                                                      {
                                                      totalunreadconver=parseInt(ContactedMessageList.length);
                                                      $.each(ContactedMessageList, function (i, res) {
                                                             
                                                             mainmsgarray.push(res.MessageId);
                                                             
                                                             jQuery('#Count'+res.MessageId).addClass('circlechatcount');
                                                             jQuery('#date'+res.MessageId).addClass('UnreadMsgdate');
                                                             $('#Count'+res.MessageId).text('1');
                                                             
                                                             
                                                             if(messagelist.indexOf(res.MessageId) >=0)
                                                             {//alert('contains');
                                                             }
                                                             else{ //alert('not contains '+ res.MessageId);
                                                             var content='';
                                                             var profileimg='';
                                                             if(res.ProfilePictureImg!='')
                                                             {
                                                             
                                                             profileimg=res.ProfilePictureImg;
                                                             }
                                                             else
                                                             {
                                                             profileimg=dcustomerimg;//'../images/customer.jpg';
                                                             }
                                                             
                                                             //var dt = res.ContactDate;
                                                             var dt = res.LocalDateTime;
                                                             var msgdate=getMsgdateTime(dt);
                                                             
                                                             
                                                             content='<li  id='+res.MessageId+' data-corners="false"  data-shadow="false" data-inset=true data-wrapperels="div" data-icon="arrow-r"  data-theme="c" class="ui-btn ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c message" style="height:110px!important;width:110% !important;">'
                                                             +'<div  class="ui-btn-inner ui-li" style="width:100% !important;">'
                                                             +'<div class="ui-btn-text" style="height:60px;width:94% !important;float:left !important;">'
                                                             +'<div data-transition="slide" onclick="getChatMessageCustomer(\'' + res.BrokerMsgId+ '\',\''+res.MessageId+'\' ,\'' + res.BrokerId+ '\',\'' + res.CustomerId+ '\',\'' + res.BrokerName+ '\',\''+msgdate+'\')">'
                                                             +'<img src='+profileimg+' class="ui-li-thumb circle" width="100" height="100">'
                                                             +'<h3 class="ui-li-heading NameMessage"><div style="display:none;" id="IsRead'+res.MessageId+'">true</div><span id="Name'+res.MessageId+'" > '+res.BrokerName+' </span> <br><div style="display:none;" id="Hidden'+res.MessageId+'"> '+res.BrokerName+' </div></h3>'
                                                             +'<div class="countmsg" id="Count'+res.MessageId+'" ></div>'
                                                            
                                                             +'<p class="ui-li-desc MainMessage" id="LatestMsg'+res.MessageId+'">'+res.Message+'</p>'
                                                            // +'</a></div>'
                                                             +'</div></div>'
                                                             
                                                             +'<div class="tickdiv"><img src="../images/redioButton.png" id="tick'+res.MessageId+'" onclick="getDeletedItems(\'' + res.MessageId+ '\')" class="tickimg"></div>'
                                                             +'</div>'
                                                             +'<br>'
                                                             +'<br>'
                                                             +'<div class="msgDate" id="date'+res.MessageId+'">'+msgdate+'</div>'
                                                             +'<div onclick="getChatMessageCustomer(\'' + res.BrokerMsgId+ '\',\''+res.MessageId+'\' ,\'' + res.BrokerId+ '\',\'' + res.CustomerId+ '\',\'' + res.BrokerName+ '\',\''+msgdate+'\')"><img src="../images/arrow.png" class="arrowmsg"></div>'
                                                             +'<input type="hidden" id="mainmsgtext'+res.MessageId+'" />'
                                                             +'</li>';
                                                             
                                                             //DB Change
                                                             if(parseInt(ContactedMessageList.length) == parseInt(i+1))
                                                             {
                                                             MessageTimestamp=res.ContactDate;
                                                             }
                                                             
                                                             
                                                             
                                                             $('#CustomerMeassage').prepend(content);
                                                             $('#mainmsgtext'+res.MessageId).val(res.Message);
                                                             
                                                             CountMsg++;
                                                            
                                                             }
                                                             $('#IsRead'+res.MessageId).text(res.IsRead);
                                                             });
                                                      }
                                                      
                                                      var UnreadMsgArray = [];
                                                      $.each(MessageDetails, function (i, res) {
                                                            
                                                             var msgcountevery=0;
                                                             if(mainmsgarray.indexOf(res.MessageId) <0)
                                                             {
                                                             
                                                             
                                                             if(parseInt(res.Cnt) >0)
                                                             {
                                                             
                                                             
                                                             totalunreadconver++;
                                                             UnreadMsgArray.push(res.MessageId);
                                                             }
                                                             }
                                                             
                                                             $.each(ContactedMessageList, function (i, res1) {
                                                                    UnreadMsgArray.push(res1.MessageId);
                                                                    if(parseInt(res.MessageId) == parseInt(res1.MessageId))
                                                                    {
                                                                    msgcountevery++
                                                                    }
                                                                    });
                                                             msgcountevery=parseInt(res.Cnt) + parseInt(msgcountevery);
                                                             
                                                             if(parseInt(msgcountevery) >=1)
                                                             {
                                                             
                                                             jQuery('#Count'+res.MessageId).addClass('circlechatcount');
                                                             jQuery('#date'+res.MessageId).addClass('UnreadMsgdate');
                                                             $('#Count'+res.MessageId).text(msgcountevery);
                                                             
                                                             }
                                                             
                                                            
                                                             var dt = res.dtime;
                                                             var msgdate=getMsgdateTime(dt);
                                                             
                                                             
                                                             
                                                             $('#date'+res.MessageId).text(msgdate);
                                                             if(res.BrokerMessage!=''){
                                                             $('#LatestMsg'+res.MessageId).text(res.BrokerMessage);
                                                             }
                                                             else{
                                                             var msgid=res.MessageId;
                                                             //alert(res.MessageId);
                                                             getmsg(UserId,msgid);//ajax called
                                                             }
                                                             
                                                             if(totalunreadconver >0)
                                                             {
                                                             
                                                             
                                                             
                                                             jQuery('#totalunreadcount').addClass('circlechatcountheader');
                                                             $('#totalunreadcount').text(totalunreadconver);
                                                             
                                                             jQuery('#totalunreadcountmenucust').addClass('circlechatcountheader');
                                                             $('#totalunreadcountmenucust').text(totalunreadconver);
                                                             
                                                             }
                                                             
                                                             });
                                                      if(MessageDetails.length>0){
                                                      $.each(messagelist, function (idx, value) {
                                                             if ($.inArray(value, UnreadMsgArray) == -1) {
                                                             
                                                             //alert('value '+value);
                                                             //TodeleteList.push(value);
                                                             
                                                             jQuery('#Count' + value).removeClass('circlechatcount');
                                                             jQuery('#date' + value).removeClass('UnreadMsgdate');
                                                             $('#Count' + value).text('');
                                                             
                                                             }
                                                             });
                                                      }
                                                      }
                                                      
                                                      },  					
                                                      error : function(XMLHttpRequest, textStatus, errorThrown) {
                                                      
                                                      }			 			
                                                      });
                                               
                                               
                                               
                                               }, 2000);
	

	$('#OkbtnCustomerMessage').off("click").on("click", function() {
		$('#InfopopupCustomerMessage').popup('close');
	});
	
	 $('#SearchBar').keyup("click",function(){
		
		 
		  var valThis = this.value.toLowerCase(),
		 	lenght  = this.value.length;

		  
		  
		  $('ul#CustomerMeassage').find('li').each(function(){
		 
			  var brokernameid;
              brokernameid=this.id;
              
		 		var e=document.getElementById('Hidden'+brokernameid).innerHTML;
		 		
		 		var text  = e.toLowerCase(),
		 		
		 		textL = text.replace("<span style='background-color:#FF9;color:#555;'>","").replace("</span>",""),
		 		htmlR = '<b>' + text.substr(0, lenght) + '</b>' + text.substr(lenght);		 		
		 	
		 		
		 		if (textL.indexOf(valThis) >= 0) {	
		 					 			
	                $(this).show();             
	                    var query = new RegExp("("+valThis+")", "gim");
	                    
	                	var enew = e.replace(/(<span>|<\/span>)/igm, "");
	                	document.getElementById('Name'+brokernameid).innerHTML = enew;
	                	var newe = enew.replace(query, "<span style='background-color:#FF9;color:#555;'>$1</span>");
	                	document.getElementById('Name'+brokernameid).innerHTML = newe;
	                	
	                	if(valThis=="")
	                		{
	                			document.getElementById('Name'+brokernameid).innerHTML=e;	
	                		}            
		         }
		 		 else
		 			 {	
		 			// alert('else');
		 			 	$(this).hide();		 			
		 			 }	
		 	}); 	
		 
		 });  

	 
	 $('#Customerdeletemessages').off("click").on("click", function() {
                                                  if(editclick=="false"){
                                                  $('.tickimg').css({ display: "block" });
                                                  editclick="true";
                                                  }
                                                  else{
                                                  $('.tickimg').css({ display: "none" });
                                                  editclick="false";
                                                  }
	
	 });
	 
               $('#Customerdeletemultiplemsg').off("click").on("click", function() {
                                                       //alert("edit");
                                                       jQuery("label[for='messagetextdeletecon']").html('Are you sure to delete messages?');
                                                       $('#deleteconfirmpopup').popup('open');
                                                       });
	 $('#deleteconfirmpopupclose').off("click").on("click", function() {
			
	    	$('#deleteconfirmpopup').popup('close');
	 });
	 
	 
	 
	 $('#deletemessagesconfirm').off("click").on("click", function() {

			var listtodelete=deletemsgarray.toString();
		
			$.ajax({		
				type: "POST",
				url: webserviceURL,
				data: {UserId:UserId,MessageId:listtodelete,ActionName:"DoDeleteMultipleMessage"},
				success: function (data) {	
					var obj = JSON.parse(data);
					//alert('data '+ data);
					var issuccess = obj.IsSuccess;
					var ErrorMessage=obj.ErrorMessage;					
					if(issuccess==true)
					{
						for(i=0; i<=deletemsgarray.length;i++)
							{
							
							$('#'+deletemsgarray[i]).remove();
							}
					       //$('#brokerSearchbtn').show();
						
						CountMsg--;
						
						deletemsgarray=[];
						
						if(CountMsg==0)
						{
						//alert('Count==0');
						var	content='<li data-corners="false"  data-shadow="false" data-inset=true data-wrapperels="div" data-icon="arrow-r"  data-theme="c" class="ui-btn ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c">'
							+'Message not available.'
						    +'</li>';
							$('#CustomerMeassage').append(content);
							
							$('ul').listview('refresh');
						}
                   $("#Customerdeletemultiplemsg").hide();
                   $("#Customerdeletemessages").show();
                    $('.tickimg').css({ display: "none" });
                   editclick="false";
						$('#deleteconfirmpopup').popup('close');
						
					}
					else if(issuccess==false)
						{
                   $("#Customerdeletemultiplemsg").hide();
                   $("#Customerdeletemessages").show();
                    $('.tickimg').css({ display: "none" });
                   editclick="false";
						$('#deleteconfirmpopup').popup('close');
						}
				
					},        					
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$('#deleteconfirmpopup').popup('close');
				}			 			
			});
			
		});
	 
     $(document).on("touchstart",function(event){
   	  
 	    
    	 var a3 = Swiped.init({
    		    query: '#CustomerMeassage li',
    		    list: true,
    		    left: 185
    		    
    		});
    	 
    	 $('#CustomerMeassage li').addClass('dynamicclass');
    });
     
	
});

function getChatMessageCustomer(BrokerMessageId,CustomerMessageId,BrokerId,CustomerId,CustomerName,MsgDate)
	{
        var mainmsgtext=$('#mainmsgtext'+CustomerMessageId).val();
        
        deletemsgarray=[];
        var msgisread=document.getElementById('IsRead'+CustomerMessageId).innerHTML;
        
var getMegdetails='{"BrokerMessageId":"'+BrokerMessageId+'","CustomerMessageId":"'+CustomerMessageId+'","BrokerId":"'+BrokerId+'","CustomerId":"'+CustomerId+'" ,"CustomerName":"'+CustomerName+'","Message":"'+mainmsgtext+'","MsgDate":"'+MsgDate+'","IsRead":"'+msgisread+'"}';
       
        sessionStorage.setItem('getMegdetailsForChat',getMegdetails);
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "customerChatMessage.html",{transition: "slide",reverse: false});
}
function getDeletedItems(id){
    
    deletemsgarray.push(id);
    if(parseInt(deletemsgarray.length) >0)
    {
        if(deletemsgarray.indexOf(id) >=0)
        {
            $('#tick'+id).attr('src','../images/radioBtn_checked.png');
            $("#Customerdeletemultiplemsg").show();
            $("#Customerdeletemessages").hide();
            for (var i = 0; i < deletemsgarray.length; i++)
            {
                for (var j = 0; j < deletemsgarray.length; j++)
                {
                    if (i != j)
                    {
                        if (deletemsgarray[i] == deletemsgarray[j])
                        {
                            
                            removeTick(deletemsgarray[i]);
                            
                        }
                        
                        
                    }
                }
            }
            
        }
        
    }
    
}


function removeTick(removeid){
    $('#tick'+removeid).attr('src','../images/redioButton.png');
    deletemsgarray = jQuery.grep(deletemsgarray, function(value) {
                                 return value != removeid;
                                 });
    if(parseInt(deletemsgarray.length) <=0)
    {
        $("#Customerdeletemultiplemsg").hide();
        $("#Customerdeletemessages").show();
    }
}

