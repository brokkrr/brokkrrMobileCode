function BadgesCount(UserId){
    $.ajax({
           type: "POST",
           url: webserviceURL,
           data: {UserId:UserId,ActionName:"DoGetUnreadMsgCount"},
           success: function (data) {
          // alert('data '+data);
           var obj = JSON.parse(data);
           var issuccess = obj.IsSuccess;
           var ErrorMessage=obj.ErrorMessage;
          
           var badgescount='';
           var badgescnt=obj.UnreadMsgCnt;
                if(issuccess==true){
           $.each(badgescnt, function (i, res) {
                  badgescount=res.UnreadMsgCnt;
                  });
          // window.plugins.pushNotification.setApplicationIconBadgeNumber(noti.successHandler,noti.errorHandler, badgescount);
           app.push.setApplicationIconBadgeNumber(function() {},function() {},badgescount);
           }
           },
           error : function(XMLHttpRequest, textStatus, errorThrown) {
           
           }
           });
}

function getLatestmsgCount(UserId,UserType)
{
    
    $.ajax({
           type: "POST",
           url: webserviceURL,
           data: {UserId:UserId,ActionName:"DoGetUnreadMsgCount"},
           success: function (data) {
           //alert('data '+data);
           
           localStorage.setItem("LatestMessage",data);
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
          
           var totalunreadconver=0;
           
           if(parseInt(ContactedMessageList.length) > 0)
		       		{
           totalunreadconver=parseInt(ContactedMessageList.length);
           
           $.each(ContactedMessageList, function (i, res) {
                  
                  mainmsgarray.push(res.MessageId);
                  });
		       		}
           
           $.each(MessageDetails, function (i, res) {
                  if(mainmsgarray.indexOf(res.MessageId) <0)
                  {
                  if(parseInt(res.Cnt) >0)
                  {
                  totalunreadconver++;
                  }
                  }
                  
                  });
           
           if(totalunreadconver >0)
           {
           if(UserType=="Broker")
           {
          
           
           totalUnreadMsgGlobleBroker=totalunreadconver;
           
           if(totalUnreadMsgGlobleBroker >0)
           {
          
           $.each(badgescnt, function (i, res) {
                  badgescount=res.UnreadMsgCnt;
                  });
           totalUnreadMsgGlobleBroker=badgescount;
           //alert(totalUnreadMsgGlobleBroker);
         /*  jQuery('#totalunreadcountmenubroker').addClass('circlechatcountheader');
           $('#totalunreadcountmenubroker').text(totalUnreadMsgGlobleBroker);*/
           jQuery('#Brokertotalunreadcount').addClass('circlechatcountheader');
           $('#Brokertotalunreadcount').text(totalUnreadMsgGlobleBroker);
           jQuery('#Brokertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#Brokertotalunreadcountmenu').text(totalUnreadMsgGlobleBroker);
           jQuery('#ProfileBrokertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#ProfileBrokertotalunreadcountmenu').text(totalUnreadMsgGlobleBroker);
           jQuery('#EditProfileBrokertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#EditProfileBrokertotalunreadcountmenu').text(totalUnreadMsgGlobleBroker);
           
           
           }
           }
           else
           {
           
           
           totalUnreadMsgGlobleCust=totalunreadconver;
           if(totalUnreadMsgGlobleCust >0)
           {
           $.each(badgescnt, function (i, res) {
                  badgescount=res.UnreadMsgCnt;
                  });
           totalUnreadMsgGlobleCust=badgescount;
            //alert(totalUnreadMsgGlobleCust);
           /*jQuery('#totalunreadcountmenucust').addClass('circlechatcountheader');
           $('#totalunreadcountmenucust').text(totalUnreadMsgGlobleCust);*/
           jQuery('#Customertotalunreadcount').addClass('circlechatcountheader');
           $('#Customertotalunreadcount').text(totalUnreadMsgGlobleCust);
           jQuery('#autoInsCustomertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#autoInsCustomertotalunreadcountmenu').text(totalUnreadMsgGlobleCust);
           jQuery('#autoInsnextCustomertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#autoInsnextCustomertotalunreadcountmenu').text(totalUnreadMsgGlobleCust);
           jQuery('#benefitsCustomertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#benefitsCustomertotalunreadcountmenu').text(totalUnreadMsgGlobleCust);
           jQuery('#businessCustomertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#businessCustomertotalunreadcountmenu').text(totalUnreadMsgGlobleCust);
           jQuery('#contactbrokerCustomertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#contactbrokerCustomertotalunreadcountmenu').text(totalUnreadMsgGlobleCust);
           jQuery('#Customertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#Customertotalunreadcountmenu').text(totalUnreadMsgGlobleCust);
           jQuery('#EditProfileCustomertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#EditProfileCustomertotalunreadcountmenu').text(totalUnreadMsgGlobleCust);
           jQuery('#homeCustomertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#homeCustomertotalunreadcountmenu').text(totalUnreadMsgGlobleCust);
           jQuery('#homeInsCustomertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#homeInsCustomertotalunreadcountmenu').text(totalUnreadMsgGlobleCust);
           jQuery('#lifeInsCustomertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#lifeInsCustomertotalunreadcountmenu').text(totalUnreadMsgGlobleCust);
           jQuery('#profileCustomertotalunreadcountmenu').addClass('circlechatcountheader');
           $('#profileCustomertotalunreadcountmenu').text(totalUnreadMsgGlobleCust);
           
           }
           }
           }
           else{
           
           jQuery('#Brokertotalunreadcount').removeClass('circlechatcountheader');
           $('#Brokertotalunreadcount').text('');
           jQuery('#Brokertotalunreadcountmenu').removeClass('circlechatcountheader');
           $('#Brokertotalunreadcountmenu').text('');
           jQuery('#Customertotalunreadcount').removeClass('circlechatcountheader');
           $('#Customertotalunreadcount').text('');
           jQuery('#Customertotalunreadcountmenu').removeClass('circlechatcountheader');
           $('#Customertotalunreadcountmenu').text('');
           
           }
           //alert('global '+totalunreadconver);
           }
           
           },
           error : function(XMLHttpRequest, textStatus, errorThrown) {
           
           }
           });
}


function SetIsReadFlag(listforread,UserId,MainMessageId)
	{
        //
      // alert("userid"+UserId);
        //,UserId,BrokerMessageId
       // alert("Brokermessageid"+MainMessageId);
		//alert('Called :'+ listforread);
		var list=listforread.toString();
		//alert('array :'+list);
		
		$.ajax({		
			type: "POST",
			url: webserviceURL,
			data: {MessageId:list,UserId:UserId,MainMessageId:MainMessageId,ActionName:"DoSetIsRead"},
			success: function (data) {	
				var obj = JSON.parse(data);
                //alert("data"+data);
				var issuccess = obj.IsSuccess;
				var ErrorMessage=obj.ErrorMessage;					
				if(issuccess==true)
				{
					//alert('success');
					GetChatFlag='Yes';
				}
			
				},        					
			error : function(XMLHttpRequest, textStatus, errorThrown) {
               //alert("error");
			}			 			
		});
	}
	
	
	function ScrollDown2(boxheight)
	{
       // if(boxheight>300){
		window.currentHeight = $(this).height();
		$(".keyboard").css("height", "0");// The height of your keyboard
		 // window.scrollTo(0, boxheight); // Scroll to the bottom of the page
		   $('div').animate({scrollTop: boxheight});
		 window.height = $(window).height();
		 $(window).resize(function(){
		  window.heightDiff = window.height - window.currentHeight;
                 //         alert(window.heightDiff);
			 if(window.heightDiff>100){
				 $(".keyboard").css("height", "0");// The height of your keyboard
				 //  window.scrollTo(0, boxheight); // Scroll to the bottom of the page
				   $('div').animate({scrollTop: boxheight});
                          }
	 });
      //  }
    }
function ScrollDown(boxheight)
{
    $('div').animate({scrollTop: boxheight});
  //  window.scrollTo(0, boxheight);
}
	
	function ScrollDownWithOpenkeyboard(boxheight)
	{
	
		// window.currentHeight = $(this).height();
		//alert('Scroll'+boxheight);
	$(".keyboard").css("height", "0");// The height of your keyboard
	  window.scrollTo(0, boxheight); // Scroll to the bottom of the page
	   $.mobile.silentScroll(boxheight);
	 window.height = $(window).height();
	 $(window).resize(function(){
	 
	  window.heightDiff = window.height - window.currentHeight;
		 if(window.heightDiff>100){
			 $(".keyboard").css("height", "0");// The height of your keyboard
			   window.scrollTo(0, boxheight); // Scroll to the bottom of the page
		 }
	 });

	}
	
	
	function removeEdu(countEdu){
		$('#edu'+countEdu).remove();
		globalEduCount--;
	}
	
	function removeExp(countExp){
		$('#exp'+countExp).remove();
		 globalExpCount--;
	}
	
	function editremoveEdu(countEdu){
		$('#editedu'+countEdu).remove();
		editglobalEduCount--;

	}
	
	function editremoveExp(countExp){
		$('#editexp'+countExp).remove();
		editglobalExpCount--;
		
	}


function removeIndustry(countInd){
    $('#Industry'+countInd).remove();
    editglobalIndCount--;
}

function removeInd(countInd){
    $('#Industry'+countInd).remove();
    globalIndCount--;
}

function removePincode(countPin){
    $('#divpincode'+countPin).remove();
    globalPinCount--;
}
function editremovePincode(countPin){
    $('#editdivpincode'+countPin).remove();
    editglobalPinCount--;
}
/*
function removePin(countPin){
    $('#divpincode'+countPin).remove();
    globalPinCount--;
}*/

function getIndustryList(RegisteredFor){
    var registerid='';

        
        if(RegisteredFor=="Meineke"){
            registerid='2';
        }
        else if(RegisteredFor=="APSP"){
          registerid='3';
        }
        else{
            registerid='1';
        }
  //  alert("getIndustryList"+registerid);
    $.ajax({
           type: "POST",
           url: webserviceURL,
           data: {CompanyId:registerid,ActionName:"DoGetIndustryMaster"},
           //data: {ActionName:"DoGetIndustryMaster"},
           success: function (data) {
          // alert('Success :'+data);
           sessionStorage.setItem('Industrylist',data);
           },
           error : function(XMLHttpRequest, textStatus, errorThrown) {
          // alert('Error');
           }
           });
}

function GetIndustrySICCodeList(IndustryId){
   
    $.ajax({
           type: "POST",
           url: webserviceURL,
           data: {IndustryId:IndustryId,ActionName:"DoGetSubIndustryMaster"},
           success: function (data) {
           //alert('Success :'+data);
           sessionStorage.setItem('subIndustrylist',data);
           },
           error : function(XMLHttpRequest, textStatus, errorThrown) {
          // alert('Error');
           }
           });
}

	
	function ClearAllSession()
	{
		 var i;
			for (i = 0; i < localStorage.length; i++)   {
				 // alert('key l' +key);
			    window.localStorage.removeItem(localStorage.key(i));
			  }
		    //alert('local storage '+localStorage.length)
			
		    var i = sessionStorage.length;
		   // alert('session storage '+sessionStorage.length)
		    while(i--) {
		    	
		        var key = sessionStorage.key(i);
		       // alert('key s' +key);
		        sessionStorage.removeItem(key);  
		    }
		
	}
/*
function ClearAllSessionWithoutlocation()
{
    var i;
    for (i = 0; i < localStorage.length; i++)   {
        // alert('key l' +key);
        window.localStorage.removeItem(localStorage.key(i));
    }
    //alert('local storage '+localStorage.length)
    
    var i = sessionStorage.length;
    // alert('session storage '+sessionStorage.length)
    while(i--) {
        
        var key = sessionStorage.key(i);
        // alert('key :' +key);
        // alert('key s' +key);
         if(key != 'latitude' && key != 'longitude' && key != 'zipcode')
        {
            //alert('if');
            sessionStorage.removeItem(key);
        }
        else
        {
            //alert('else');
        }
    }
    
}*/

function ClearAllSessionWithoutlocation()
{

    var i = localStorage.length;
    // alert('session storage '+sessionStorage.length)
    while(i--) {
			    	
        var key = localStorage.key(i);
        // alert('key :' +key);
        // alert('key s' +key);
        if(key != 'DeviceID')
        {
			        	//alert('if');
			        	localStorage.removeItem(key);
        }
        else
        {
			        	//alert('else');
        }
    }
    
		  
    
    var i = sessionStorage.length;
 
    while(i--) {
        
        var key = sessionStorage.key(i);
        // alert('key :' +key);
      
        if(key != 'latitude' && key != 'longitude' && key != 'zipcode')
        {
            //alert('if');
            sessionStorage.removeItem(key);
        }
        else
        {
            //alert('else');
        }
    }
    
}

function SetDeviceIdForiOS(UserId){
  //  var deviceuuid = device.uuid;
  //  var serialno = device.serial;
   // alert("serialno"+serialno);
  //  alert("deviceuuid"+deviceuuid);
    var DeviceID=localStorage.getItem('DeviceID');
    //alert("SetDeviceIdForiOS"+DeviceID);
    if(DeviceID !=''||DeviceID!=null)
    {
        DeviceID="iOS"+DeviceID;
        $.ajax({
               type: "POST",
               url: webserviceURL,
               data: {DeviceId:DeviceID,UserId:UserId,ActionName:"DoSetDeviceId"},
               success: function (data) {
               //alert('deviceid '+data);
               
               },
               error : function(XMLHttpRequest, textStatus, errorThrown) {
               
               }
               });
    }
    else{
        alert("Please check your internet connection.You may have new messages coming up.");
    }

}
function ClearDeviceIdForiOS(UserId){
    
    var DeviceID=localStorage.getItem('DeviceID');
    //alert("ClearDeviceIdForiOS"+DeviceID);
    if(DeviceID !=''||DeviceID!=null)
    {
        DeviceID="iOS"+DeviceID;
        $.ajax({
               type: "POST",
               url: webserviceURL,
               data: {DeviceId:DeviceID,UserId:UserId,ActionName:"DoClearDeviceId"},
               success: function (data) {
               //alert('deviceid '+data);
               //app.push.setApplicationIconBadgeNumber(function() {},function() {},0);
               },
               error : function(XMLHttpRequest, textStatus, errorThrown) {
               
               }
               });
    }
    else{
        alert("Please check your internet connection.You may have new messages coming up.");
    }
    
}




function getCompanyList()
{
    
    $.ajax({
           type: "POST",
           url: webserviceURL,
           data: {ActionName:"DoGetCompanyMaster"},
           success: function (data) {
           //alert('Success :'+data);
           sessionStorage.setItem('Companylist',data);
           },
           error : function(XMLHttpRequest, textStatus, errorThrown) {
           //alert('Error');
           }			 			
           });
}
function BindCompanyList(){
    var Companylist=sessionStorage.getItem('Companylist');
    var obj=JSON.parse(Companylist);
    var issuccess1 = obj.IsSuccess;
    var ErrorMessage=obj.ErrorMessage;
    var company1;
    
    if(issuccess1==true)
    {
        company1=obj.CompanyList;
        $.each(company1, function(i, cmp) {
            $('<option />', {value: cmp.CompanyId, text: cmp.CompanyName}).appendTo('#ddlCompanyName');
        });
        
    }
}


function getMenuDetailsBrokkrr(FirstName,LastName,profilepic){
    $("#name").text(FirstName + ' '+ LastName);
    $("#profilepic").attr("src", profilepic);
}

function getMenuDetailsCustomer(FirstName,LastName,profilepic){
    $("#txtCustomerName").text(FirstName + ' '+ LastName);
    $("#profilepicCustomer").attr("src", profilepic);
    $('#profilepicprofile').attr("src",profilepic);
}

function getmsg(UserId,msgid){
    $.ajax({
        type: "POST",
        url: webserviceURL,
        data: {UserId:UserId,TimeStamp:"",ActionName:"DoGetMessages"},
        success: function (data) {
        var obj = JSON.parse(data);
        var issuccess = obj.IsSuccess;
        var ErrorMessage=obj.ErrorMessage;
           
           if(issuccess==true){
                var ContactedMessageList=obj.ContactedMessageList;
                if(parseInt(ContactedMessageList.length) > 0){
                    $.each(ContactedMessageList, function (i, main) {
                            mainmsgid=main.MessageId;
                            if(msgid==mainmsgid){
                                    var text=main.Message;
                                    $('#LatestMsg'+res.MessageId).html(text);
                            }
                  
                       });
                }
           }//success
        }//ajax success
    });//ajax end
}


function getMsgdateTime(dt){
    var dt1=dt.split(' ');
    var datedb=dt1[0];
    var timedb=dt1[1];
    var ampmdb=dt1[2];
    var nowdt = new Date();
    var nowdate= (nowdt.getMonth() + 1) + '/' + nowdt.getDate() + '/' + nowdt.getFullYear();
    var msgdate='';
    if(datedb == nowdate)
    {
        msgdate=timedb;
        var timeconvert=timedb.split(':');
        var hrs=timeconvert[0];
        var min=timeconvert[1];
        var sec=timeconvert[2];
        if(hrs>12){
            hrs=hrs-12;
            //sec="AM";
        }
        else{
            //sec="PM";
        }
        sec=ampmdb;
        if(hrs<=9){hrs="0"+hrs;}
        if(min<=9){min="0"+min;}
        msgdate=hrs.slice(-2)+':'+min.slice(-2)+' '+sec;
    }
    else
    {
        msgdate=datedb;
    }
    return msgdate;
}



function getImages(id,txtid,popupId){
    navigator.camera.getPicture(function (uri) {
        window.resolveLocalFileSystemURI(uri,
            function( fileEntry){
                fileEntry.file(function(file) {
                    var imageinkb= file.size/1024;
                    var imageinmb = (Math.round((imageinkb / 1024) * 100) / 100);
                    if(parseFloat(imageinmb) <= 1){
                        var showtemp = document.getElementById(txtid);
                        readDataUrlLogo(file,id,txtid,popupId);
                        var profileImage=fileEntry.name+"."+file.type;
                        //  var profileImage=file.name;
                         if(id=="profilepicprofile"){

                               $('#'+id).attr("src",uri + '?'+Math.random());
                        }
                        else if(id=="CompanyLogo"){
                               $('#'+id).val(profileImage);
                        }
                        else {
                               var imgid=id.split(' ');
                               var logoid=imgid[0]+imgid[1];
                               $('#'+logoid).val(profileImage);
                        }
                        
                    }
                    else{
                        var textAreaFileContents = document.getElementById(txtid);
                        textAreaFileContents.innerHTML = "";
                        if(id=="CompanyLogo"){
                            $('#'+id).val("");
                        }
                        else{
                            var imgid=id.split(' ');
                            var logoid=imgid[0]+imgid[1];
                            $('#'+logoid).val("");
                               
                        }
                        jQuery("label[for='messagetext']").html('Image size can not be greater than 1 MB.');
                        $('#'+popupId).popup('open');
                        return false;
                    }
                });
            },
            function (message) {
                jQuery("label[for='messagetext']").html('Image not selected');
                                         $('#'+popupId).popup('open');
                                         return false;
            });
        },
        function (message) {
            jQuery("label[for='messagetext']").html('Image not selected');
                                $('#'+popupId).popup('open');
                                return false;
        },
        {
            quality: 100,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            targetWidth:300,
            targetHeight:300,
            correctOrientation: true
    });
}


function getImagescamera(id,txtid,popupId){
    navigator.camera.getPicture(function (uri) {
        window.resolveLocalFileSystemURI(uri,
            function( fileEntry){
                fileEntry.file(function(file) {
                    var imageinkb= file.size/1024;
                    var imageinmb = (Math.round((imageinkb / 1024) * 100) / 100);
                    if(parseFloat(imageinmb) <= 1){
                        var showtemp = document.getElementById(txtid);
                        readDataUrlLogo(file,id,txtid,popupId);
                        var profileImage=fileEntry.name+"."+file.type;
                          //var profileImage=file.name;
                        if(id=="profilepicprofile"){
                            $('#'+id).attr("src",uri + '?'+Math.random());
                        }
                        else if(id=="CompanyLogo"){
                            $('#'+id).val(profileImage);
                        }
                        else {
                            var imgid=id.split(' ');
                            var logoid=imgid[0]+imgid[1];
                            $('#'+logoid).val(profileImage);
                        }
                    }
                    else{
                        var textAreaFileContents = document.getElementById(txtid);
                        textAreaFileContents.innerHTML = "";
                        if(id=="CompanyLogo"){
                            $('#'+id).val("");
                        }
                        else{
                            var imgid=id.split(' ');
                            var logoid=imgid[0]+imgid[1];
                            $('#'+logoid).val("");
                        }
                        jQuery("label[for='messagetext']").html('Image size can not be greater than 1 MB.');
                        $('#'+popupId).popup('open');
                        return false;
                    }
                });
            },
            function (message) {
                jQuery("label[for='messagetext']").html('Image not selected');
                                         $('#'+popupId).popup('open');
                                         return false;
            });
            },
            function (message) {
                jQuery("label[for='messagetext']").html('Image not selected');
                                $('#'+popupId).popup('open');
                                return false;
            },
        {
        quality: 100,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.CAMERA,
        //mediaType: navigator.camera.MediaType.ALLMEDIA,
        targetWidth:300,
        targetHeight:300,
        correctOrientation: true
    });
}


function readDataUrlLogo(file,id,txtid,popupId) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        var showtemp = document.getElementById(txtid);
        var txtArea = document.getElementById(id);
        if(id=="CompanyLogo"){
        if(this.result != ''&&this.result != null){
            sessionStorage.setItem('BrokerCompanyLogoupdated','true');
        }
            }
        else if(id=="profilepicprofile"){
            if(this.result != ''&&this.result != null){
                if(popupId.indexOf("Customer") >=0){
                    sessionStorage.setItem('CustomerProfilephotoupdated','true');
                }
                else{
                 sessionStorage.setItem('BrokerProfilephotoupdated','true');
                }
            }
        }
        else{
            
            var imgid=id.split(' ');
            var logoid=imgid[0]+imgid[1];
            txtArea = document.getElementById(logoid);
            if(imgid[0]=="EduSchoolLogo"){
                $('#IsUpdated'+imgid[1]).val(true);
            }
            if(imgid[0]=="editExpCompLogo"){
               $('#editIsUpdated'+imgid[1]).val(true);
            }
            if(imgid[0]=="signupExpCompLogo"){
                $('#signupIsUpdated'+imgid[1]).val(true);
            }
        }
        showtemp.value = this.result.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "").replace(/^data:;base64,/, "").replace(/^data:text\/html;base64,/, "");
        $.mobile.loading("hide");
        
    };
    reader.readAsDataURL(file);
}


function getCityZipcode(zip){
    var localCity="";
    var cityNameGeo = "";
    var state = "";
    var lat="";
    var lng="";
    
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': zip }, function (results, status) {
        var state = "N/A";
        var city = "N/A";
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();

        $('#txtlat').val(lat);
        $('#txtlang').val(lng);

        for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {
                if (results[0].address_components[i].types[b] == "postal_code") {
                     cityNameGeo = results[0].address_components[i].long_name;
                }
                if (results[0].address_components[i].types[b] == "locality") {
                     localCity = results[0].address_components[i].long_name;
                     $('#txtcity').val(localCity);
                     var cityid = $('#txtcity');
                     cityid.removeClass("errorcity");
                }
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                     state = results[0].address_components[i].long_name;
                }
            }
        }
   
    });
     return localCity;
}

function getUnreadChatMsg(id,useridBroker,BrokerMessageId,type){

    $.ajax({
           type: "POST",
           url: webserviceURL,
           data: {UserId:useridBroker,MessageId:BrokerMessageId,ActionName:"DoGetUnreadChatMessages"},
           success: function (data) {
           var obj = JSON.parse(data);
           var issuccess = obj.IsSuccess;
           var ErrorMessage=obj.ErrorMessage;
           
           if(issuccess==true){
           var IsMessageDeleted=obj.IsMessageDeleted;
           $.each(IsMessageDeleted, function (i, res) {
                  IsDeletedonBroker2=res.IsDeleted;
                  if(res.IsDeleted=='True'){
                  $("#"+id).val('You can not send message because '+type+' is no longer available for this chat.');
                  $("div#divMessage").hide();
                  $("#"+id).css("font-weight", "bold");
                  $("div#divError").show();
                  $("#"+id).attr("disabled", "disabled");
                  }
                  else{
                  $("div#divMessage").show();
                  $("div#divError").hide();
                  }
                  });
           }
           else{
           GetChatFlag='Yes';
           }
           
           },
           error : function(XMLHttpRequest, textStatus, errorThrown) {
           }
           });
}

function showmenulink(registeredfor){
    
    if(registeredfor=='Meineke' || registeredfor=='APSP'){
        //$('#meinekemenu').css('display','block');
        $('#mprofile').css('display','block');
       // $('#brokkrrmenu').css('display','none');
        $('#bprofile').css('display','none');
       // $('#mhome').css('display','block');
      //  $('#bhome').css('display','none');
    }
    else{
      //  $('#brokkrrmenu').css('display','block');
        $('#bprofile').css('display','block');
     //   $('#meinekemenu').css('display','none');
        $('#mprofile').css('display','none');
      //  $('#bhome').css('display','block');
      //  $('#mhome').css('display','none');
    }
}
/*
function companydesign(pageid,company){
 
    var rmclass='',addclass='';
    if(company=="Meineke"){
        rmclass='aprofilebg';
        addclass='mprofilebg';
    }
    else if(company=="APSP"){
        rmclass='mprofilebg';
        addclass='aprofilebg';
    }
    else imgpath='';
    $('#'+pageid).removeClass(rmclass);
    $('#'+pageid).addClass(addclass)
}*/

function changeimg(imgid,company){
    var imgpath='';
    if(company=="Meineke"){
        imgpath='../images/preferred-logo.png';
    }
    else if(company=="APSP"){
        imgpath='../images/aqualine-logo.png';
    }
    
    else imgpath='../images/icon.png';
   
    $('#'+imgid).attr("src",imgpath);
}

function changefooterlogo(imgid,company){
    var imgpath='';
    if(company=="Meineke"){
        imgpath='../images/meineke-logo.png';
    }
    else if(company=="APSP"){
        imgpath='../images/apsp-logo.png';
    }
    else imgpath='';
    $('#'+imgid).attr("src",imgpath);
}


function getLatestvdocnt(UserId){
    
    $.ajax({
           type: "POST",
           url: webserviceURL,
           data: {UserId:UserId,ActionName:"DoGetUnWatchedVideoCount"},
           success: function (data) {
           //alert('UnWatchedVideoCount: '+data);
           var obj = JSON.parse(data);
           var issuccess = obj.IsSuccess;
           var ErrorMessage=obj.ErrorMessage;
           var vdocnt='';
           
           if(issuccess==true)
           {
           var vdoDetails=obj.VideoDetails;
           var vdolist='';
           if(vdoDetails.length > 0){
           $.each(vdoDetails, function (i, vdo) {
                  vdocnt=vdo.Cnt;
                  //alert(vdocnt);
                  if(vdocnt<1){
                  $('#briefcasecntmenu').removeClass('circlemenucnt');
                  $('#briefcasecntmenu').text('');
                  
                  }
                  else{
                  jQuery('#briefcasecntmenu').addClass('circlemenucnt');
                  $('#briefcasecntmenu').text("New");
                  }
                  });
           
           }
           else{
           $('#briefcasecntmenu').removeClass('circlemenucnt')
           $('#briefcasecntmenu').text('');
           }
           
           
           }
           },
           error : function(XMLHttpRequest, textStatus, errorThrown) {
           
           }
           });
    
}


function getdocImages(id,txtid,popupId){
    //alert("called");
    navigator.camera.getPicture(function (uri) {
                                window.resolveLocalFileSystemURI(uri,
                                                                 function( fileEntry){
                                                                 fileEntry.file(function(file) {
                                                                                var imageinkb= file.size/1024;
                                                                                var imageinmb = (Math.round((imageinkb / 1024) * 100) / 100);

                                                                                if(parseFloat(imageinmb) <= 10){
                                                                                var showtemp = document.getElementById(txtid);
                                                                                var profileImage=fileEntry.name;
                                                                                $('#'+id).val(profileImage);
                                                                                readDataUrldoc(file,id,txtid);
                                                                                }
                                                                                else{
                                                                                var textAreaFileContents = document.getElementById(txtid);
                                                                                textAreaFileContents.innerHTML = "";
                                                                                $('#'+id).val("");
                                                                                $('#getfileconversion').val("");
                                                                                
                                                                                jQuery("label[for='messagetext']").html('Image size can not be greater than 10 MB.');
                                                                                $('#'+popupId).popup('open');
                                                                                return false;
                                                                                }
                                                                            });
                                                                 },
                                                                 function (message) {
                                                               //  jQuery("label[for='messagetext']").html('Image not selected');
                                                                 });
                                },
                                function (message) {
                                //jQuery("label[for='messagetext']").html('Image not selected');
                                },
                                {
                                quality: 100,
                                destinationType: navigator.camera.DestinationType.FILE_URI,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                                //targetWidth:300,
                                //targetHeight:300,
                                correctOrientation: true
                                });
}
function getdocImagescamera(id,txtid,popupId){
  
    navigator.camera.getPicture(function (uri) {
                                window.resolveLocalFileSystemURI(uri,
                                                                 function( fileEntry){
                                                                 fileEntry.file(function(file) {
                                                                                var imageinkb= file.size/1024;
                                                                                var imageinmb = (Math.round((imageinkb / 1024) * 100) / 100);
                                                                                if(parseFloat(imageinmb) <= 10){
                                                                                var showtemp = document.getElementById(txtid);
                                                                                readDataUrldoc(file,id,txtid);
                                                                                
                                                                                var profileImage=fileEntry.name;
                                                                              //  alert(profileImage);
                                                                                //var profileImage=file.name;
                                                                               /// $('#labelfileInput').text(profileImage);
                                                                                $('#'+id).val(profileImage);
                                                                               
                                                                                
                                                                                }
                                                                                else{
                                                                                var textAreaFileContents = document.getElementById(txtid);
                                                                                textAreaFileContents.innerHTML = "";
                                                                               /// $('#labelfileInput').text("");
                                                                                $('#'+id).val("");
                                                                                $('#getfileconversion').val("");
                                                                                jQuery("label[for='messagetext']").html('Image size can not be greater than 10 MB.');                                                                                 $('#'+popupId).popup('open');
                                                                                return false;
                                                                                }
                                                                                });
                                                                 },
                                                                 function (message) {
                                                                // jQuery("label[for='messagetext']").html('Image not selected');
                                                                 });
                                },
                                function (message) {
                               // jQuery("label[for='messagetext']").html('Image not selected');
                                },
                                {
                                quality: 100,
                                destinationType: navigator.camera.DestinationType.FILE_URI,
                                sourceType: navigator.camera.PictureSourceType.CAMERA,
                                //targetWidth:300,
                                //targetHeight:300,
                                correctOrientation: true
                                });
}


function readDataUrldoc(file,id,txtid) {
      $.mobile.loading("show");
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        var showtemp = document.getElementById(txtid);
        var txtArea = document.getElementById(id);    
            var imgid=id.split(' ');
            var logoid=imgid[0]+imgid[1];
            txtArea = document.getElementById(logoid);

        showtemp.value = this.result.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "").replace(/^data:;base64,/, "").replace(/^data:text\/html;base64,/, "");
        $.mobile.loading("hide");
        
    };
    reader.readAsDataURL(file);
}

/*
function getImagesfile(id,txtid,popupId){
    navigator.camera.getPicture(function (uri) {
                                window.resolveLocalFileSystemURI(uri,
                                                                 function( fileEntry){
                                                                 fileEntry.file(function(file) {
                                                                                var imageinkb= file.size/1024;
                                                                                var imageinmb = (Math.round((imageinkb / 1024) * 100) / 100);
                                                                                if(parseFloat(imageinmb) <= 1){
                                                                                var showtemp = document.getElementById(txtid);
                                                                                readDataUrlLogo(file,id,txtid,popupId);
                                                                                var Imagename=fileEntry.name+"."+file.type;
                                                                                
                                                                                if(id=="profilepicprofile"){
                                                                                
                                                                                $('#'+id).attr("src",uri + '?'+Math.random());
                                                                                }
                                                                                else if(id=="CompanyLogo"){
                                                                                $('#'+id).val(profileImage);
                                                                                }
                                                                                else {
                                                                                var imgid=id.split(' ');
                                                                                var logoid=imgid[0]+imgid[1];
                                                                                $('#'+logoid).val(profileImage);
                                                                                }
                                                                                
                                                                                }
                                                                                else{
                                                                                var textAreaFileContents = document.getElementById(txtid);
                                                                                textAreaFileContents.innerHTML = "";
                                                                                if(id=="CompanyLogo"){
                                                                                $('#'+id).val("");
                                                                                }
                                                                                else{
                                                                                var imgid=id.split(' ');
                                                                                var logoid=imgid[0]+imgid[1];
                                                                                $('#'+logoid).val("");
                                                                                
                                                                                }
                                                                                jQuery("label[for='messagetext']").html('Image size can not be greater than 1 MB.');
                                                                                $('#'+popupId).popup('open');
                                                                                return false;
                                                                                }
                                                                                });
                                                                 },
                                                                 function (message) {
                                                                 messageBox('Image not selected');
                                                                 });
                                },
                                function (message) {
                                messageBox('Image not selected');
                                },
                                {
                                quality: 100,
                                destinationType: navigator.camera.DestinationType.FILE_URI,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                                targetWidth:300,
                                targetHeight:300,
                                correctOrientation: true
                                });
}
*/

function CheckDeviceId(UserId){
    //alert(UserId);
   var DeviceID=localStorage.getItem('DeviceID');
  // if(DeviceID ==''||DeviceID==null || DeviceID=='iOSnull'||DeviceID=='iOS')
   // {
        app.push = PushNotification.init({
                                         "android": {},
                                         "ios": {
                                         "sound": "true",
                                         "vibration": "true",
                                         "alert": "true",
                                         "badge": "true"//,
                                         //"clearBadge": "true"
                                         },
                                         "windows": {}
                                         });
        
        //store registration id
        app.push.on('registration', function(data) {
                    
                    //
                    //  document.getElementById("regId").innerHTML = data.registrationId;
                    // alert(data.registrationId);
                    var oldRegId = localStorage.getItem('DeviceID');
                    if (oldRegId !== data.registrationId) {
                    // Save new registration ID
                    if(data.registrationId!='' && data.registrationId!=null){
                   // alert("registration event: " + data.registrationId);
                     ClearDeviceIdForiOS(UserId);
                     localStorage.setItem('DeviceID', data.registrationId);
                     SetDeviceIdForiOS(UserId);
                    }
                    // localStorage.setItem('DeviceID', data.registrationId);
                    // Post registrationId to your app server as the value has changed
                    
                    }
                });
       
        
       // jQuery("label[for='notifytext']").html("We are unable to send notifications. Please reinstall the app or press continue");
        //$('#notifyPopup').popup('open');
       // $( ":mobile-pagecontainer" ).pagecontainer( "change", "../main.html",{transition: "slide",reverse: false});
   // }

}

function popupfix(hbcontent,heightpoppup){
    if(hbcontent<heightpoppup){
        $('.ui-content').css('height',heightpoppup);
    }
    else{
        $('.ui-content').css('height',hbcontent);
    }
}

function chatmsgfix(hbcontent,heightpoppup){
    if(hbcontent<heightpoppup){
        $('.ui-content').css('height',heightpoppup);
    }
    else{
        $('.ui-content').css('height',hbcontent);
    }
}

