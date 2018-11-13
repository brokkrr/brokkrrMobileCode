
$(document).on("pageshow","#ProfileBrokerPage", function(event,ui) {
          
    BrokerBadgesInt=setInterval(function(){BadgesCount(UserId);}, 2000);
    IntLatestmsgBroker=setInterval(function(){
        getLatestmsgCount(UserId,"Broker");
                                                       
    }, 2000);
   
    checkConnection('InfoLocationpopup');
    getIndustryList(RegisteredFor);
    GetIndustrySICCodeList("");
               
    $.mobile.loading("show");
    
    document.addEventListener("deviceready", onDeviceReady, false);
               
    function onDeviceReady() {
            getGeolocation();
        }
    
    var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }
               else{
                hbcontent=stopPageOverflow(hbcontent);
               }
    $('.ui-content').css('height',hbcontent);
   // $('#menuSidebar').addClass('animated');
      // width:58%;
   /* $("#menuSidebar").on("panelbeforeclose",function(){
    
    });*/
    var user=sessionStorage.getItem('BrokerUser'); 
    if(user===null || user=='')
	{
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/brokerLogin.html",{transition: "slide",reverse: false});
	}
	else
	{
		user=sessionStorage.getItem('BrokerUser');
	}

	var obj=JSON.parse(user);
	var issuccess = obj.IsSuccess;
	var ErrorMessage=obj.ErrorMessage;
	var UserId;
	if(issuccess==true)
		{
		var UserDetails=obj.UserDetails;
           //    alert(JSON.stringify(UserDetails));
		var ExperienceDetails=obj.ExperienceDetails;
		var EducationDetails=obj.EducationDetails;
		var updateflag='';
           //    alert(JSON.stringify(EducationDetails))
		var htmlhead,experience,Education,Company='',Biodesc='';
		$.each(UserDetails, function (i, userobj) {
               
			var profilepic,IsAvailable;
			UserId=userobj.UserId;
           useridBroker=userobj.UserId;
               
               var companylogo='',at='',title='',companyName='';
               if(userobj.CompanyLogo!=''){
                    companylogo=userobj.CompanyLogo+'?'+Math.random();
               }
               else{
                    companylogo=dcompanyimg;
               }
               if(userobj.Title !='' && userobj.CompanyName!=''){
                    at='at';
               }
			if(userobj.ProfilePictureImg != ''){
				profilepic=userobj.ProfilePictureImg+'?'+Math.random();
				//$('#profilepic').attr('src',profilepic);
			}
			else{
                profilepic=dcustomerimg;
				//$('#profilepic').attr("src",profilepic);
			}
                menuProfilepic=profilepic;
                menuFirstname=userobj.FirstName;
                menuLastname=userobj.LastName;
               getMenuDetailsBrokkrr(menuFirstname,menuLastname,menuProfilepic);
			
			if(sessionStorage.getItem('IsAvailable')){
				IsAvailable=sessionStorage.getItem('IsAvailable');
			}
			else{
				sessionStorage.setItem("IsAvailable",userobj.IsAvailable);
				IsAvailable=userobj.IsAvailable;
			}

		htmlhead = '<div class="row box1" align="center" style="margin-top:13%;">'
			+'<div class="col-sm-12 col-xs-12" >'
   			+'<img src='+profilepic+' class="circle img-circle imagemargin" alt="" width="120" height="125" style="margin-top:-20%;">'
   			+'<span class="imgright toggleBtn" style="margin-top:-26%;margin-right:-3%;" id="setavailability">';
			
			if(IsAvailable == 'True'){
				htmlhead +='<a href="#" class="Unavailable" data-transition="slide"><img src="../images/available.png" alt=""></a>';
			}
			else{
				htmlhead +='<a href="#" class="Availability" data-transition="slide"><img src="../images/unavailable.png" alt=""></a>';
			}
			htmlhead +='</span></div>'
               +'<div class="col-sm-12 col-xs-12">'
               +'<span class="cls20pxbold capitalText" style="margin-right:2%!important;word-wrap: break-word!important;">'+userobj.FirstName+' '+userobj.LastName+'</span><br/>';
			htmlhead+='<div class="col-sm-12 col-xs-12" style="border:1px solid #17d1ff;margin-top:3px;;margin-bottom:3px;"></div>';
			
   			if(userobj.City!=''){
				htmlhead+='<span class="capitalText" style="font-size:12px;font-color:#666666;">'+userobj.City+ ' Area</span><br/>';
			}  
   			
			htmlhead+='</div></div>';
            htmlhead+='<div class="row box1">';
               
        Company='<div class="col-sm-12 col-xs-12" style="font-size:16px;">Company</div><br/>';
               if(userobj.Title !='' || userobj.CompanyName!=''){
              
                    if(userobj.Title !=''){
                        title=userobj.Title;
                    }
                    if(userobj.CompanyName !=''){
                        companyName=userobj.CompanyName;
                    }
               
                    Company+='<div class="col-sm-4 col-xs-4" style="padding-right:0%;">'
                    +'<span><img src='+companylogo+' class="profileimg imgClass"></span>'
                    +'</div>'
                    +'<div class="col-sm-8 col-xs-8" style="padding-bottom:3%;">'
                    +'<div class="col-sm-12 col-xs-12"><span style="font-size:12px;" class="profilefont">'+title+ ' '+at +' '+ companyName +'</span><br/>'
                    +'<span style="font-size:12px;"></span><br/>'
                    //+'<span style="font-size:12px;">'+expobj.DurationFrom + durationsapatate + expobj.DurationTo+'</span><br/>'
                    +'<br/></div></div>';
               }
               else{
                    Company+='<div class="col-sm-12 col-xs-12 noadded" >'
                    +'<br>No Company added'
                    +'</div>';
               }
               
               Company+='<div class="col-sm-12 col-xs-12" style="border-top: 1px solid #ccc;width:95%;margin-left: 2%;margin-right: 4%;margin-bottom:5px;"></div>';
               
        experience='<div class="col-sm-12 col-xs-12" style="font-size:16px;">Prior Employment</div>';
              
   			if(parseInt(ExperienceDetails.length) > 0)
       		{
       			$.each(ExperienceDetails, function (i, expobj) {
       				var durationsapatate='';
    				if(expobj.DurationFrom!='')
    				{
    					durationsapatate=' - ';
    				}
                    var priorlogo='';
    				
                    if(expobj.Logo!=''){
                       priorlogo=expobj.Logo+'?'+Math.random();
                    }
                    else{
                       priorlogo=dcompanyimg;
                    }
                       
       				experience+='<div class="col-sm-4 col-xs-4" style="padding-right:0%;">'
       					+'<span><img src='+priorlogo+' class="profileimg imgClass"></span>'
       					+'</div>'
       					+'<div class="col-sm-8 col-xs-8" style="padding-bottom:3%;">'
       				    +'<div class="col-sm-12 col-xs-12"><span></span>'
       					+'<span style="font-size:12px;" class="profilefont">'+expobj.CompanyName+'</span><br/>'
                        +'<span style="font-size:12px;" class="profilefont">'+expobj.Designation+'</span><br/>'
       					+'<span style="font-size:12px;" class="profilefont">'+expobj.DurationFrom + durationsapatate + expobj.DurationTo+'</span><br/>'//comment year
       					//+'<br/>
                       //+'<span style="font-size:12px;">'+expobj.Bio+'</span><br/>'
                       +'<br/></div></div>';
       			      			
       			});
       		}
       		else{
       			experience+='<div class="col-sm-12 col-xs-12 noadded profilefont" >'
       						+'<br>No experience added'	
       						+'</div>';
       		}
       		//experience+='</div>';
       		experience+='<div class="col-sm-12 col-xs-12" style="border-top: 1px solid #ccc;width:95%;margin-left: 2%;margin-right: 4%;margin-bottom:5px;"></div>';

        Education='<div class="col-sm-12 col-xs-12"><font style="font-size:16px;;">Education</font></div>';
       		
			if(parseInt(EducationDetails.length) > 0)
       		{
				$.each(EducationDetails, function (i, eduobj) {
       	       		
       				var durationsapatate='',schoollogo='';
    				if(eduobj.DurationFrom!='')
    				{
    					durationsapatate=' - ';
    				}
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
       					+'<div class="col-sm-12 col-xs-12" style="padding-right:0;" ><span></span><br/>'
       					+'<span  style="font-size:12px;" class="profilefont">'+eduobj.UniversityName+' '+eduobj.CourseName+' '+eduobj.DurationFrom+'</span><br/>'
       					+'<span style="font-size:12px;" class="profilefont"></span><br/>'
       					+'</div></div>';
       		
       			});

       		}
       		else
       		{
       			Education+='<div class="col-sm-12 col-xs-12 noadded profilefont" >'
       						+'<br>No Education added'	
       						+'</div>';
       		}
        
			Education+='</div>';
               
        Biodesc='<div class="col-sm-12 col-xs-12" style="font-size:16px;">Bio</div>';
               
               if(userobj.Bio!=''){
                    Biodesc+='<div class="col-sm-12 col-xs-12 profilefont" style="font-size:12px;padding-bottom:1%;" >'+userobj.Bio+'</div>'
               }
               else{
                    Biodesc+='<div class="col-sm-12 col-xs-12 noadded profilefont" >'
                    +'<br>No Bio added'
                    +'</div>';
               }
               
               Biodesc+='<div class="col-sm-12 col-xs-12" style="border-top: 1px solid #ccc;width:95%;margin-left: 2%;margin-right: 4%;margin-bottom:5px;"></div>';
               
       		$('#Borkerprofile').append (htmlhead  + Company + Biodesc + experience +  Education);
		});
			 
		}
	$.mobile.loading("hide"); 
	CheckDeviceId(useridBroker);
$('#BrokerAvailableBtn').off("click").on("click", function() {
    $.mobile.loading("show");
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/brokerAvailable.html",{transition: "slide",reverse: false});
});
	

$('#setavailability').on('click', '.Availability', function() {
    $.mobile.loading("show");
    var vlat,vlang,ZipCode;
    var valid=false;
    vlat=sessionStorage.getItem('latitude');
    vlang=sessionStorage.getItem('longitude');
    ZipCode=sessionStorage.getItem('zipcode');
                       // alert(ZipCode);
    if(vlat === null || vlang === null || ZipCode ===null){
        valid=false;
    }
    else{
        valid=true;
    }
                         //alert(ZipCode);
    $.ajax({
        type: "POST",
        url: webserviceURL,
        data: {UserId:UserId,Availability:true,longitude:vlang,latitude:vlat,ZipCode:ZipCode,ActionName:"DoSetBrokerAvailabilityWithZipCode"},
        success: function (data) {
            var obj = JSON.parse(data);
            var issuccess = obj.IsSuccess;
            $.mobile.loading("hide");
            if(issuccess==true){
                sessionStorage.setItem("IsAvailable",'True');
                sessionStorage.setItem('BrokerUser',data);
                var contentAvailable='<a href="#" class="Unavailable" data-transition="slide"><img src="../images/available.png" alt=""></a>';
	    		$('#setavailability').empty();
                $('#setavailability').append (contentAvailable);
	    		jQuery("label[for='messagetext']").html("You are available now.<br>(Now customer can contact you.)");
	    		$('#InfoLocationpopup').popup('open');
	    	}
	    	else{
                jQuery("label[for='messagetext']").append("Error occured,Please try again.");
                $('#InfoLocationpopup').popup('open');
            }

        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown!=""){
                $.mobile.loading("hide");
                jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
                $('#InfoLocationpopup').popup('open');
            }
            else{
            }
        }
    });
                         
    $.mobile.loading("hide");
});
	
	
$('#setavailability').on('click', '.Unavailable', function() {
    $.mobile.loading("show");
    $.ajax({
        type: "POST",
        url: webserviceURL,
        data: {UserId:UserId,Availability:false,ActionName:"DoSetBrokerAvailabilityStatus"},
        success: function (data) {
            var obj = JSON.parse(data);
            var issuccess = obj.IsSuccess;
            $.mobile.loading("hide");
            if(issuccess==true){
                sessionStorage.setItem("IsAvailable",'False');
                var contentUnavailable='<a href="#" class="Availability" data-transition="slide"><img src="../images/unavailable.png"  alt=""></a>';
                $('#setavailability').empty();
                $('#setavailability').append (contentUnavailable);
	    	    jQuery("label[for='messagetext']").html("You are unavailable now.<br>(You are no longer visible to customers<br> who are looking for brokers like you.)");
                $('#InfoLocationpopup').popup('open');
            }
            else{
                jQuery("label[for='messagetext']").html("Error occured,Please try again.");
	    		$('#InfoLocationpopup').popup('open');
	    	}
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown!=""){
                $.mobile.loading("hide");
                jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
                $('#InfoLocationpopup').popup('open');
            }
            else{
            }
        }
    });
                         
    $.mobile.loading("hide");
});

$('#OkLocationbtn').off("click").on("click", function() {
    $('#InfoLocationpopup').popup('close');
});
	
function refreshPage() {
    $.mobile.changePage(window.location.href,{
            allowSamePageTransition : true,
            transition              : 'none',
            showLoadMsg             : false,
            reloadPage              : true
        });
}
              
});
