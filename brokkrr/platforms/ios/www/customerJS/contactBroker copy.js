
		var UserDetails="";
		var ExperienceDetails="";
		var EducationDetails="";
		var totalbrokercount=0;
		var globalcountcontact=0;
		var UserId;
		var cards=[];
		
	//alert('totalbrokercount '+ totalbrokercount);

$(document).on("pageshow","#ContactBrokerPage", function( event ) {
               CheckDeviceId(useridCust);
            //  alert("LineType:" +LineType);
           /*    var hbcontent=getcontentheight();
               $('.ui-content').css('height',hbcontent);*/
            
$('#ContactbrokerBackBtn').off("click").on("click", function() {
            $("#ContactbrokerBackBtn").attr('class','backbtnArrow');//17Mar17
            $("#ContactbrokerBackBtn").toggle( "highlight" );//17Mar17
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/meinekelines.html",{transition: "slide",reverse: false});
            //$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/home.html",{transition: "slide",reverse: true});
           
                                                                
});
               
	var user=sessionStorage.getItem('CustomerUser');
    if(user===null || user=='')
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
		
	}
	
    var EmailId, FirstName, LastName,registeredfor;
    
    var obj=JSON.parse(user);
	var issuccess = obj.IsSuccess;
	var ErrorMessage=obj.ErrorMessage;
	if(issuccess==true)
		{
		var UserDetails1=obj.UserDetails;
		$.each(UserDetails1, function (i, userobj) {
			
			UserId=userobj.UserId;
			EmailId=userobj.EmailId;
			FirstName=userobj.FirstName;
			LastName=userobj.LastName;
            registeredfor=userobj.RegisteredFor;            
		});
	}
	else
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
	}

  
 $.mobile.loading("show");
 
	var searchlist=sessionStorage.getItem('SearchList');
	var SearchListtype=sessionStorage.getItem('SearchListtype');

	var obj=JSON.parse(searchlist);
	var issuccess = obj.IsSuccess;
	var ErrorMessage=obj.ErrorMessage;
	
	if(issuccess==true)
		{
		UserDetails=obj.UserDetails;
		ExperienceDetails=obj.ExperienceDetails;
		EducationDetails=obj.EducationDetails;
		
		var htmlhead,experience,Education;
		
		totalbrokercount=UserDetails.length;
		
		
		 $("#foundinfo").text(UserDetails.length+ " Brokers are available for "+ SearchListtype + " Insurance");

		if(parseInt(UserDetails.length) > 0)
   		{

			$.each(UserDetails, function (i, userobj) {

				var profilepic,IsAvailable;

				var mainuserid=userobj.UserId;
                   //Comapny Info
                   var companylogo='',at='',title='',companyName='';
                   if(userobj.CompanyLogo!='')
                   {
                   companylogo=userobj.CompanyLogo+'?'+Math.random();
                   }
                   else
                   {
                   companylogo=dcompanyimg;//'../images/companydefaultlogo.jpg'
                   }
                   if(userobj.Title !='' && userobj.CompanyName!='')
                   {
                   at='at';
                   }
				if(userobj.ProfilePictureImg != '')
				{
					
					profilepic=userobj.ProfilePictureImg;
				
				}
				else
				{
                   profilepic=dcustomerimg;//'../images/customer.jpg';
					
				}
		
				htmlhead='<li class="buddy" id='+userobj.UserId+'  style="display: block;background-color:#f8f8f8;height:350px!important;">'
				+'<div  class="avatar" style="display: block; width:93% !important;padding-left:5%;background-color:#f8f8f8;height:320px!important;">'
				+'<div>'
				+'<div  class="row box1" align="center"  style="margin-right:0.5%;background-color:#f8f8f8;height:330px!important;">'
				+'<div  class="col-sm-12 col-xs-12" >'
				+'<img src='+profilepic+' class="circle img-circle" alt="" width="120" height="125" style="margin-top:-1%;">'
				+'<span class="cls20pxbold">'+userobj.FirstName + ' ' +userobj.LastName+ '</span><br/>';
				
				/*if(userobj.Title!=''){
					htmlhead+='<span style="font-size:14px;font-color:#9a9a9a;">'+userobj.Title+'</span><br/>';
				}*/
                   /*var title='';
                   var companyName='';
                   var at='';
                   if(userobj.Title !='' && userobj.CompanyName!=''){
                   at='at';
                   }*/
                   if(userobj.Title !='' || userobj.CompanyName!='')
                   {
                   if(userobj.Title !='')
                   {
                   title=userobj.Title;
                   }
                   if(userobj.CompanyName !='')
                   {
                   companyName=userobj.CompanyName;
                   }
				 htmlhead+='<span style="font-size:16px; font-weight:bold;font-color:#9a9a9a;">'+title+ ' '+at +' '+ companyName +'</span><br/>';
                   }
				htmlhead+='</div>'
				+'<div class="col-sm-12 col-xs-12">';
				
				htmlhead+='<div class="col-sm-12 col-xs-12" style="border:1px solid #17d1ff;margin-top:3px;;margin-bottom:3px;"></div>';
				
				if(userobj.City!=''){
					htmlhead+='<span style="font-size:14px;font-color:#9a9a9a;">'+userobj.City+ ' Area</span><br/>';
				}
				
                   htmlhead+='<br/><div class="col-sm-3 col-xs-3"></div><div class="col-sm-6 col-xs-6" align="center"><a href="#" id='+userobj.UserId+' onclick="ShowBrokerDetails(this.id)" style="text-decoration:none;font-size:12px;" data-transition="pop"><button type="button" class="btn btn-block detailsbtn">Details</button></a></div>'
                
				
		htmlhead+='</div></div>';
			
		htmlhead+='</div></div></li><div class="cleardiv"></div>';
                   var obj=new Tindercardsjs.card(userobj.UserId, htmlhead,userobj.DeviceId)
                   cards.push(obj);
				      cards.push(obj);             
				     
				  htmlhead='';
				  
			
			});
   		}
		else
		{
		/*	$('#container').append ("Broker not found!");
			$('ul').listview('refresh');*/
		}
			 
		}

    //alert('cards '+cards);
               
               // Render cards
               Tindercardsjs.render(cards, $('#main'), function (event) {
               //  alert('Swiped ' + event.direction + ', cardid is ' + event.cardid + ' and target is:');
                 //console.log(event.card);
            	   
            	   if(event.direction=='right')
            	   {
                                    //
                                    
                                    // var BrokerId=$(this).closest('li').attr('id');
                                    //playAudio('file///android_asset/www/sound/pop.m4a');
                                    var BrokerId=event.cardid;
                                    var DeviceID=''; //Notification 1Dec16
                                   
                                    $.ajax({
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
                                                  DeviceID=res.DeviceId;
                                                  var InsuranceType=sessionStorage.getItem('SearchListtype');
                                                  var nowdt = new Date();
                                                  var onlydate= ("0" + (nowdt.getMonth() + 1)).slice(-2) + '/' + nowdt.getDate() + '/' + nowdt.getFullYear();
                                                  var nowtime = nowdt.getHours() + ":" + nowdt.getMinutes() + ":" + nowdt.getSeconds();
                                                  
                                                  var sec='';
                                                  var hrs =nowdt.getHours();
                                                  if(hrs>=12){
                                                  hrs=hrs-12;
                                                  sec="PM";
                                                  }
                                                  else
                                                  {
                                                  sec="AM";
                                                  }
                                                  
                                                  var LocalDateTime=onlydate + ' '+  nowtime + ' '+ sec;
                                                 // alert(InsuranceType);
                                                //  alert("DoContactBroker :"+registeredfor);
                                                  $.ajax({
                                                         type: "POST",
                                                         url: webserviceURL,
                                                         data: {UserId:UserId,BrokerId:BrokerId,InsuranceType:InsuranceType,RegisteredFor:registeredfor,LineType:LineType,Note:"",LocalDateTime:LocalDateTime,ActionName:"DoContactBroker"},
                                                         success: function (data) {
                                                         //alert('data '+data);
                                                         var obj = JSON.parse(data);
                                                         var issuccess = obj.IsSuccess;
                                                         var ErrorMessage=obj.ErrorMessage;
                                                      
                                                         if(issuccess==true)
                                                         {
                                                         //notification 1Dec16
                                                         
                                                         /* Notification iOS to Android and vice versa*/
                                                        /* var ActionName='';
                                                         var NewDevice='';
                                                         //alert('DeviceID '+DeviceID);
                                                         
                                                         var indexid=DeviceID.indexOf('Android');
                                                         var indexid1=DeviceID.indexOf('iOS');
                                                         //alert(indexid1)
                                                         
                                                         if(parseInt(indexid) >= 0)
                                                         {
                                                         //alert('IF '+ DeviceID.indexOf('Android'));
                                                         ActionName='DoPushNotification';
                                                         NewDevice=DeviceID.replace('Android','');
                                                         }
                                                         else if(parseInt(indexid1) >= 0)
                                                         {
                                                         //alert('else IF '+ DeviceID.indexOf('iOS'));
                                                         ActionName='DoPushNotificationForiOS';
                                                         NewDevice=DeviceID.replace('iOS','');
                                                         }
                                                         // alert('NewDevice '+NewDevice);
                                                         //16DEc16 Send noti Android to IOS and vice versa
                                                         */
                                                         
                                                         
                                                         //if(DeviceID !=='' || DeviceID !== null)
                                                        // {
                                                         var title=FirstName+' '+ LastName;
                                                         var msgcnt=1;
                                                         
                                                         
                                                         var latestmessage=localStorage.getItem("LatestMessage");
                                                         //alert(latestmessage);
                                                         var message1='from '+registeredfor+' wants to get '+ InsuranceType + ' insurance';
                                                         var messagebrokkrr='Wants to get '+ InsuranceType + ' insurance';
                                                         var message='';
                                                         //var title='';
                                                         
                                                         var obj = JSON.parse(latestmessage);
                                                         var issuccess = obj.IsSuccess;
                                                         var ErrorMessage=obj.ErrorMessage;
                                                         var MessageDetails=obj.MessageDetails;
                                                         
                                                         var ContactedMessageList=obj.ContactedMessageList;
                                                         //var mainmsgarray=[];
                                                         
                                                         if(issuccess==true)
                                                         {
                                                         if(registeredfor=="Meineke"||registeredfor=="APSP")
                                                         {
                                                         message=title+' '+message1;
                                                         }
                                                         else{
                                                          message=title+' '+messagebrokkrr;
                                                         }
                                                         title=title;
                                                         
                                                         }
                                                         
                                                         $.ajax({
                                                                type: "POST",
                                                                url: webserviceURL,
                                                                data: {/*DeviceId:NewDevice,*/message:message,title:title,msgcnt:msgcnt,UserId:BrokerId,ActionName:"DoSendNotification"},
                                                                success: function (data) {
                                                                //alert("success:"+data);
                                                                //var obj = JSON.parse(data);
                                                                
                                                                },
                                                                error : function(XMLHttpRequest, textStatus, errorThrown) {
                                                                
                                                                }
                                                                });
                                                         
                                                         //}
                                                         
                                                         //alert("globalcountcontact :"+globalcountcontact);
                                                         }
                                                         
                                                         else if(issuccess==false)
                                                         {
                                                         $.mobile.loading("hide"); //1.4.5
                                                         jQuery("label[for='messagetext']").html(ErrorMessage);
                                                         $('#InfopopupContactBroker').popup('open');
                                                         
                                                         }
                                                         else
                                                         {
                                                         $.mobile.loading("hide"); //1.4.5
                                                         jQuery("label[for='messagetext']").html("Please try again.");
                                                         $('#InfopopupContactBroker').popup('open');
                                                         }
                                                         
                                                         },
                                                         
                                                         error : function(XMLHttpRequest, textStatus, errorThrown) {
                                                         if(errorThrown!=""){
                                                         $.mobile.loading("hide"); //1.4.5
                                                         jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
                                                         $('#InfopopupContactBroker').popup('open');
                                                         }
                                                         else{					
                                                         }	
                                                         }			 			
                                                         });
                                                  
                                                  
                                                  totalbrokercount--;
                                                  // $("#BrokerCount").text(totalbrokercount);
                                                  $("#foundinfo").text(totalbrokercount+ " Brokers are available for "+ SearchListtype + " Insurance");
                                                  
                                                  if(totalbrokercount<=0){
                                                  //alert("List empty");
                                                  $('#contactmsg').empty();
                                                  var contentAvailable="\"Thank you!! We have contacted your brokers and you should expect a response shortly.\"";
                                                  //alert('contentUnavailable :'+contentAvailable);
                                                  $('#contactmsg').append (contentAvailable);
                                                  }
                                                  
                                                  });
                                           }
                                           },        
                                           error : function(XMLHttpRequest, textStatus, errorThrown) {
                                           
                                           }			 			
                                           });
                                    
                                   
	              	 
	              	
            		   
            	   }
            	   else if(event.direction=='left')
            	   {
                                   
                                    totalbrokercount--;
                                    
                                    $("#foundinfo").text(totalbrokercount+ " Brokers are available for "+ SearchListtype + " Insurance");
                                    
                                    if(totalbrokercount<=0){
                                   
                                    $('#contactmsg').empty();
                                    var contentAvailable="\"Thank you!! We have contacted your brokers and you should expect a response shortly.\"";
                                   
                                    $('#contactmsg').append (contentAvailable);
                                    }
                                   
            	   }
               });
               
$.mobile.loading("hide");

$('#OkbtnContactBroker').off("click").on("click", function() {
	//alert('clsose');
	$('#InfopopupContactBroker').popup('close');
});


});


 	     
function ShowBrokerDetails(userid)
    {
 	   	$('#brokerdetails').text('');

 	   	var userdet=UserDetails;
 	   	var expdet=ExperienceDetails;
 	   	var edudet=EducationDetails;

 	   	var htmlhead,experience='',Education='',Biodesc='',Company='';
 	   	
 	   	$.each(userdet, function (i, userobj) {
	
 	   	if(userid==userobj.UserId)	
 	   		{
 	   			var profilepic,IsAvailable;
               var companylogo='',at='',title='',companyName='';
               if(userobj.CompanyLogo!='')
               {
               companylogo=userobj.CompanyLogo+'?'+Math.random();
               }
               else
               {
               companylogo=dcompanyimg;
               }
               if(userobj.Title !='' && userobj.CompanyName!='')
               {
               at='at';
               }
 	   			if(userobj.ProfilePictureImg != '')
 	   			{
 	   				profilepic=userobj.ProfilePictureImg;
 	   			}
 	   			else
 	   			{
               profilepic=dcustomerimg;
 	   			
 	   			}		
               htmlhead = '<div class="row box2" align="center">'
 	   			+'<div class="col-sm-12 col-xs-12" >'
 	   				+'<img src='+profilepic+' class="circle img-circle" alt="" width="120" height="125" style="margin-top:5%;">'
 	   				+'<span class="imgright" style="margin-top:-26%;margin-right:-3%;">'
 	   				+'</span></div>'
 	   				+'<div class="col-sm-12 col-xs-12">'
 	   				+'<span class="cls20pxbold">'+userobj.FirstName+' '+userobj.LastName+'</span><br/>';
 	   		
 	   				if(userobj.City!=''){
 	   				htmlhead+='<span style="font-size:12px;font-color:#666666;">'+userobj.City+ ' Area</span><br/>';
 	   			}   	
 	   		
 	   			htmlhead+='</div></div>';
                htmlhead+='<div class="col-sm-12 col-xs-12 rowline"></div>';
               
                //Company
                Company+='<div><div class="row box2" align="left">'
                        +'<div class="col-sm-12 col-xs-12" style="font-size:16px;">Company</div>';
               if(userobj.Title !='' || userobj.CompanyName!='')
               {
               
               
               if(userobj.Title !='')
               {
               title=userobj.Title;
               }
               if(userobj.CompanyName !='')
               {
               companyName=userobj.CompanyName;
               }
               Company+='<div class="col-sm-4 col-xs-4" style="padding-right:0%;">'
               +'<span><img src='+companylogo+' class="profileimg imgClass"></span>'
               +'</div>'
               +'<div class="col-sm-8 col-xs-8" style="padding-bottom:3%;">'
               +'<div class="col-sm-12 col-xs-12"><span></span><br/>';
               Company+='<span style="font-size:12px;" class="profilefont">'+userobj.Title+' '+at+' '+userobj.CompanyName+'</span><br/>';
               //+'<span style="font-size:12px;">'+expobj.DurationFrom + durationsapatate + expobj.DurationTo+'</span><br/>'
               Company+='<br/></div></div>';
               
               }
               else{
               Company+='<div class="col-sm-12 col-xs-12 noadded profilefont">'
               +'<br>No Company added'
               +'</div>';
               
               }
               Company+='<div class="col-sm-12 col-xs-12 rowline" ></div>'
               +'</div>';
               
              
               //Experience
               experience+='<div class="row box2" style="margin-top:-3%;" align="left">'
               +'<div class="col-sm-12 col-xs-12" style="font-size:16px;">Prior Employment</div>';
               var expcnt=0;
               if(parseInt(expdet.length) > 0)
               {
               $.each(expdet, function (i, expobj) {
                      var durationsapatate='';
                      if(expobj.DurationFrom!='')
                      {
                      durationsapatate=' - ';
                      }
                      
                      if(userid==expobj.UserId)
                      {
                      
                      expcnt++;
                      if(expobj.Logo!='')
                      {
                      priorlogo=expobj.Logo+'?'+Math.random();
                      }
                      else
                      {
                      priorlogo=dcompanyimg;
                      
                      }
                      
                      
                      experience+='<div class="col-sm-4 col-xs-4" style="padding-right:0%;">'
                      +'<span><img src='+priorlogo+' class="profileimg imgClass"></span>'
                      +'</div>'
                      +'<div class="col-sm-8 col-xs-8" style="padding-bottom:3%;">'
                      +'<div class="col-sm-12 col-xs-12"><span></span>'
                      +'<span style="font-size:12px;" class="profilefont">'+expobj.CompanyName+'</span><br/>'
                      +'<span style="font-size:12px;" class="profilefont">'+expobj.Designation+'</span><br/>'
                      +'<span style="font-size:12px;" class="profilefont">'+expobj.DurationFrom + durationsapatate + expobj.DurationTo+'</span><br/>'
                      //  +'<span style="font-size:12px;">'+expobj.Bio+'</span><br/>'
                      +'<br/></div></div>';
                      }
                      });
               
               }
               if(parseInt(expcnt)<1)
               {
               
               experience+='<div class="col-sm-12 col-xs-12 noadded profilefont" >'
               +'<br>No experience added'
               +'</div>';
               }
               experience+='<div class="col-sm-12 col-xs-12 rowline"></div>';
               experience+='</div>';
               
               //Education
               Education+='<div class="row box2" style="margin-top:-3%;" align="left">'
               +'<div class="col-sm-12 col-xs-12" style="font-size:16px;">Education</div>';
               var educnt=0;
               if(parseInt(edudet.length) > 0)
               {
               $.each(edudet, function (i, eduobj) {
                      if(userid==eduobj.UserId)
                      {
                      educnt++;
                      var schoollogo='';
                      if(eduobj.EducationLogo!='')
                      {
                      schoollogo=eduobj.EducationLogo+'?'+Math.random();
                      }
                      else
                      {
                      schoollogo=deducationimg;
                      }
                      Education+='<div class="col-sm-4 col-xs-4" style="padding-right:0%;">'
                      +'<span><img src='+schoollogo+' class="profileimg imgClass"></span>'
                      +'</div>'
                      +'<div class="col-sm-8 col-xs-8"   style="padding-bottom:3%;">'
                      +'<div class="col-sm-12 col-xs-12" style="padding-right:0;" ><span class="profilefont">'+eduobj.UniversityName+'</span><br/>'
                      +'<span style="font-size:12px;" class="profilefont">'+eduobj.CourseName+'</span><br/>'
                      +'<span style="font-size:12px;" class="profilefont">'+eduobj.DurationFrom+'</span><br/>'
                      +'</div></div>';
                      }
                      });
               }
               if(parseInt(educnt)<1)
               {
               Education+='<div class="col-sm-12 col-xs-12 noadded" >'
               +'<br>No Education added'
               +'</div>';
               }

               Education+='</div>';
               //Bio
               Biodesc+='<div class="row box2" style="margin-top:-3%;" align="left">'
                       +'<div class="col-sm-12 col-xs-12" style="font-size:16px;">Bio</div>';
               
               if(userobj.Bio!='')
               {
               Biodesc+='<div class="col-sm-12 col-xs-12 profilefont" style="font-size:12px;padding-bottom:1%;">'+userobj.Bio+'</div>'
               
               }
               else
               {
               
               Biodesc+='<div class="col-sm-12 col-xs-12 noadded profilefont" >'
               +'<br>No Bio available'
               +'</div>';
               }
               Biodesc+='<div class="col-sm-12 col-xs-12 rowline"></div>';
               Biodesc+='</div>';

 	   	 $('#brokerdetails').append (htmlhead +Company+Biodesc + experience + Education);
 	   	   	 htmlhead='',experience='',Education='',Biodesc='';
 	   		}
 	   	});
 	   	$('#BrokerProfileDetailsOnSwipe').popup('open');	
 	    
 	   }
