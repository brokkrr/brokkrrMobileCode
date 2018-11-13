$(document).on("pagebeforecreate","#SignupBroker_Page", function (event) {
    if (strDevice!="iPad"){
        $("#chkLanguage").attr("data-native-menu", "false");
    }
    globalIndCount=1;
});

$(document).on("pageshow","#SignupBroker_Page", function( event ) {
               var heightpoppup="";

            var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }
               else{
                hbcontent=stopPageOverflow(hbcontent);
               }
               $('.ui-content').css('height',hbcontent);
$('#bsignupbckbtn').off("click").on("click", function() {
        $("#bsignupbckbtn").attr('class','backbtnArrow');
        $("#bsignupbckbtn" ).toggle( "highlight" );
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/brokerLogin.html",{transition: "slide",reverse: false});
});
               
$("#Biodesc").keyup(function() {
    var input = $(this);
    var text = input.val().replace(/[^a-zA-Z0-9-?@&!$%*().,_\s]/g, "");
    if(/|/.test(text)) {
        text = text.replace(/|/g, "");
    }
    input.val(text);
});
               
               
prv_Month="";
prv_Year="";
var nowY = new Date().getFullYear();
var options="";
               
for(var Y=nowY; Y>=1950; Y--) {
    options += '<div id='+Y+' class="year">'+Y+'</div>';
}
options += '<div id="" class="year"></div>';
$("#signupyearcontent").append(options);
               
$('#signupmonth').scroll(function(){
    signupselcetmonth();
});
               
$('#signupyear').scroll(function(){
       signupselcetyear();
});
               
$(document).on('vmouseout', "#signupmonth", function (e) {
    var timeout;
    timeout=setInterval(function(){
        var selectedmonth=$('#signupselectedmonth').val();
        var pos=$('#signupmonthcontent').offset().top - $('#signupmonthtop').offset().top;
        var positive =  Math.abs(pos)
        var divided = positive / 50;
        var round = Math.round(divided);
        var po=(round-1)*50;
                                                  
    $('#signupmonth').animate({
       scrollTop: po
    }, 'fast');
                                                  
    window.clearInterval(timeout);
   }, 1000);
});
               
$(document).on('vmouseout', "#signupyear", function (e) {
    var timeoutyear;
    timeoutyear=setInterval(function(){
        var selectedmonth=$('#signupselectedyear').val();
        var pos=$('#signupyearcontent').offset().top - $('#signupyeartop').offset().top;
        var positive =  Math.abs(pos)
        var divided = positive / 50;
        var round = Math.round(divided);
        var po=(round-1)*50;
        $('#signupyear').animate({
            scrollTop: po
        }, 'fast');
    window.clearInterval(timeoutyear);
    }, 1000);
});

var PinDetailsarray = [];
var PinDetails='';
$('#addPinDetails').off("click").on("click", function() {
    if($('#pincode').val()!=""){
        if(globalPinCount<=4){
            $('#divPinDetails').append('<div id="divpincode'+countPin+'" class="maindivpincode"><div class="col-sm-10 col-xs-10 multiplepin" style=""><input id="pincode'+countPin+'" type="number" value="" data-wrapper-class="ui-custom" placeholder="Zipcode" onkeyup="PinCode(\'' + countPin+ '\')"></div><div class="col-sm-2 col-xs-2 delimagePincode"><img id="removePincode" onclick="removePin(\'' + countPin+ '\')" src="../images/deleteBtn.png"></div></div>');
            $("#pincode"+countPin).textinput();
            countPin++;
            globalPinCount++;
        }
        else{
            jQuery("label[for='messagetext']").html("Upto 5 zip code allowed.");
            $('#InfopopupBrokerSignupNext').popup('open');
            return false;
        }
    }
    else{
        jQuery("label[for='messagetext']").html("Please enter zipcode.");
        $('#InfopopupBrokerSignupNext').popup('open');
        return false;
    }
});
$('#expiryDate').focus(function(){
    $(this).removeAttr('placeholder');
});

var lat="";
var lng="";
var HomeDetails="";
var AutoDetails="";
var BenefitsDetails="";
var BusinessDetails="";
var LifeDetails="";
var specarray=[];
DeletedEduList = [];
DeletedExpList= [];

var max_chars = 5;
$('#pincode').keyup( function(e){
    if ($(this).val().length >= max_chars) {
        $(this).val($(this).val().substr(0, max_chars));
    }
    if ($(this).val().length>=5){
        var zip=$(this).val();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': zip }, function (results, status) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
        });
    }
});
 
$('#signuptxtspecialities_span').on('click', function() {
    $("div#divlblErrorMsg").hide();
    $('#InfopopupSpecialitiesSignupNext').popup('open');
           		
    if($("#chkHome").is(":checked"))
        {
            $("div#divHome").show();
        }
    else
        {
            $("div#divHome").hide();
        }
           		
           		 if($("#chkAuto").is(":checked"))
           		 {
           			 $("div#divAuto").show();
           		 }
           		 else
           		 {
           			 $("div#divAuto").hide();
           		 }
           		
           		 if($("#chkBenefits").is(":checked"))
           		 {
           			 $("div#divBenefits").show();
           		 }
           		 else
           		 {
           			 $("div#divBenefits").hide();
           		 }
           		 
           		 if($("#chkBusiness").is(":checked"))
           		 {
           			 $("div#divBusiness").show();
           		 }
           		 else
           		 {
           			 $("div#divBusiness").hide();
           		 }
           		
           		 if($("#chkLife").is(":checked"))
           		 {
           			 $("div#divLife").show();
           		 }
           		 else
           		 {
           			 $("div#divLife").hide();
           		 }
           		
           		
               });
           	
               $("#btnDone").click(function(){
                                  
                                   //alert('button Done clicked');
                                   var Spec='';
                                   
                                   var flagMainHome='true';
                                   var flagMainAuto='true';
                                   var flagMainBenefits='true';
                                   var flagMainBusiness='true';
                                   var flagMainLife='true';
                                   
                                   var flagMainCategoryHome='false';
                                   var flagMainCategoryAuto='false';
                                   var flagMainCategoryBenefits='false';
                                   var flagMainCategoryBusiness='false';
                                   var flagMainCategoryLife='false';
                                   
                                   var flagSubCategoryHome='false';
                                   var flagSubCategoryAuto='false';
                                   var flagSubCategoryBenefits='false';
                                   var flagSubCategoryBusiness='false';
                                   var flagSubCategoryLife='false';
                                   
                                   var check = $("#chkHome").is(":checked");
                                   
                                   if($("#chkHome").is(":checked"))
                                   {
                                   Spec=Spec+'Home';
                                   Spec=Spec+',';
                                   specarray.push('Home');
                                   
                                   flagSubCategoryHome='false';//12Oct16
                                   
                                   flagMainCategoryHome='true';
                                   
                                   if($("#chkHome1").is(":checked"))
                                   {
                                   flagSubCategoryHome='true';
                                   }
                                   if($("#chkHome2").is(":checked"))
                                   {
                                   flagSubCategoryHome='true';
                                   }
                                   if($("#chkHome3").is(":checked"))
                                   {
                                   flagSubCategoryHome='true';
                                   }
                                   
                                   }
                                   if($("#chkAuto").is(":checked"))
                                   {
                                   Spec=Spec+'Auto';
                                   Spec=Spec+',';
                                   specarray.push('Auto');
                                   //alert('Auto :'+Spec);
                                   flagMainCategoryAuto='true';
                                   flagSubCategoryAuto='false';//12Oct16
                                   
                                   if($("#chkAuto1").is(":checked"))
                                   {
                                   flagSubCategoryAuto='true';
                                   }
                                   if($("#chkAuto2").is(":checked"))
                                   {
                                   flagSubCategoryAuto='true';
                                   }
                                   if($("#chkAuto3").is(":checked"))
                                   {
                                   flagSubCategoryAuto='true';
                                   }
                                   if($("#chkAuto4").is(":checked"))
                                   {
                                   flagSubCategoryAuto='true';
                                   }
                                   
                                   }
                                   if($("#chkBenefits").is(":checked"))
                                   {
                                   Spec=Spec+'Benefits';
                                   Spec=Spec+',';
                                   specarray.push('Benefits');
                                   //alert('Benefits :'+Spec);
                                   
                                   flagMainCategoryBenefits='true';
                                   flagSubCategoryBenefits='false';//12Oct16
                                   
                                   if($("#chkBenefits1").is(":checked"))
                                   {
                                   flagSubCategoryBenefits='true';
                                   }
                                   if($("#chkBenefits2").is(":checked"))
                                   {
                                   flagSubCategoryBenefits='true';
                                   }
                                   if($("#chkBenefits3").is(":checked"))
                                   {
                                   flagSubCategoryBenefits='true';
                                   }
                                   if($("#chkBenefits4").is(":checked"))
                                   {
                                   flagSubCategoryBenefits='true';
                                   }
                                   
                                   }
                                   if($("#chkBusiness").is(":checked"))
                                   {
                                   Spec=Spec+'Business';
                                   Spec=Spec+',';
                                   specarray.push('Business');
                                   //alert('Business :'+Spec);
                                   
                                   flagMainCategoryBusiness='true';
                                   flagSubCategoryBusiness='false';//12Oct16
                                   
                                   if($("#chkBusiness1").is(":checked"))
                                   {
                                   flagSubCategoryBusiness='true';
                                   }
                                   if($("#chkBusiness2").is(":checked"))
                                   {
                                   flagSubCategoryBusiness='true';
                                   }
                                   if($("#chkBusiness3").is(":checked"))
                                   {
                                   flagSubCategoryBusiness='true';
                                   }
                                   if($("#chkBusiness4").is(":checked"))
                                   {
                                   flagSubCategoryBusiness='true';
                                   }
                                   
                                   }
                                   if($("#chkLife").is(":checked"))
                                   {
                                   Spec=Spec+'Life';
                                   specarray.push('Life');
                                   
                                   
                                   flagMainCategoryLife='true';
                                   flagSubCategoryLife='false';//12Oct16
                                   
                                   if($("#chkLife1").is(":checked"))
                                   {
                                   flagSubCategoryLife='true';
                                   }
                                   if($("#chkLife2").is(":checked"))
                                   {
                                   flagSubCategoryLife='true';
                                   }
                                   if($("#chkLife3").is(":checked"))
                                   {
                                   flagSubCategoryLife='true';
                                   }
                                   if($("#chkLife4").is(":checked"))
                                   {
                                   flagSubCategoryLife='true';
                                   }
                                   
                                   }
                                   
                                   var lastChar = Spec.slice(-1);
                                   if (lastChar == ',') 
                                   {
                                   Spec = Spec.slice(0, -1);
                                   }		 
                                   $('#txtspecialities').val(Spec);
                                   
                                   /*Code for checking Conditions*/
                                   
                                   if(flagMainCategoryHome=='true')
                                   {
                                   if(flagSubCategoryHome=='false')
                                   {
                                   jQuery("label[for='lblSpecErrorMsg']").html('Please Select atleast one sub category');
                                   $("div#divlblErrorMsg").show();
                                   flagMainHome='false';
                                   }
                                   else
                                   {
                                   flagMainHome='true';
                                   }
                                   }
                                   else
                                   {
                                   
                                   }
                                   
                                   if(flagMainCategoryAuto=='true')
                                   {
                                   if(flagSubCategoryAuto=='false')
                                   {
                                   jQuery("label[for='lblSpecErrorMsg']").html('Please Select atleast one sub category');
                                   $("div#divlblErrorMsg").show();
                                   flagMainAuto='false';
                                   }
                                   else
                                   {
                                   flagMainAuto='true';
                                   }
                                   }
                                   else
                                   {
                                   
                                   }
                                   
                                   if(flagMainCategoryBenefits=='true')
                                   {
                                   if(flagSubCategoryBenefits=='false')
                                   {
                                   jQuery("label[for='lblSpecErrorMsg']").html('Please Select atleast one sub category');
                                   $("div#divlblErrorMsg").show();
                                   flagMainBenefits='false';
                                   }
                                   else
                                   {
                                   flagMainBenefits='true';
                                   }
                                   }
                                   else
                                   {
                                   
                                   }
                                   
                                   if(flagMainCategoryBusiness=='true')
                                   {
                                   if(flagSubCategoryBusiness=='false')
                                   {
                                   jQuery("label[for='lblSpecErrorMsg']").html('Please Select atleast one sub category');
                                   $("div#divlblErrorMsg").show();
                                   flagMainBusiness='false';
                                   }
                                   else
                                   {
                                   flagMainBusiness='true';
                                   }
                                   }
                                   else
                                   {
                                   
                                   }
                                   
                                   if(flagMainCategoryLife=='true')
                                   {
                                   if(flagSubCategoryLife=='false')
                                   {
                                   jQuery("label[for='lblSpecErrorMsg']").html('Please Select atleast one sub category');
                                   $("div#divlblErrorMsg").show();
                                   flagMainLife='false';
                                   }
                                   else
                                   {
                                   flagMainLife='true';
                                   }
                                   }
                                   else
                                   {
                                   
                                   }
                                   
                                   
                                   if(flagMainHome=='true' && flagMainAuto=='true' && flagMainBenefits=='true' && flagMainBusiness=='true' && flagMainLife=='true')
                                   {
                                   $("div#divlblErrorMsg").hide();
                                   $('#InfopopupSpecialitiesSignupNext').popup('close');
                                   }
                                   if(flagMainHome=='true' || flagMainAuto=='true' || flagMainBenefits=='true' || flagMainBusiness=='true' || flagMainLife=='true')
                                   {
                                        $('#txtspecialities').prop('disabled', false);
                                   }
                                   });
           	 
               
               
               
           	  
           	    
           
               $('#chkSelectAll').click(function() {
                                        if (!$(this).is(':checked')) {
                                        $("input[type='checkbox']").prop("checked",false).checkboxradio("refresh");
                                        $("div#divHome").hide();
                                        $("div#divAuto").hide();
                                        $("div#divBenefits").hide();
                                        $("div#divBusiness").hide();
                                        $("div#divLife").hide();
                                        }
                                        else{
                                        $("input[type='checkbox']").prop("checked",true).checkboxradio("refresh");
                                        $("div#divHome").show();
                                        $("div#divAuto").show();
                                        $("div#divBenefits").show();
                                        $("div#divBusiness").show();
                                        $("div#divLife").show();
                                        heightpoppup=$("#InfopopupSpecialitiesSignupNext").height();
                                        popupfix(hbcontent,heightpoppup);
                                        }
                                        });

	setInitialVariable();
	sessionStorage.setItem('BrokerProfilephotoupdated','false');
    sessionStorage.setItem('BrokerCompanyLogoupdated','false');

	
		var user=sessionStorage.getItem('BrokerUser');
	    if(user===null || user=='')
		{
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/brokerLogin.html",{transition: "slide",reverse: false});
			
		}

	    var UserId, EmailId, FirstName, LastName;
	    
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
			});
		}
		else
		{
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/brokerLogin.html",{transition: "slide",reverse: false});
		}
	
	var ExternalReg= sessionStorage.getItem('Provider');

	if(ExternalReg !== null)
	{
		var divcontent='Thank you for using '+ExternalReg+' . We have pulled up your information from '+ExternalReg+ '.You can edit and add more details.<hr>'
		$('#externalhead').append(divcontent);	
		sessionStorage.removeItem("Provider")
	}

	$('#email').val(EmailId)
	$('#firstname').val(FirstName)
	$('#lastname').val(LastName)
	$('#email').prop('disabled',true);
	 
               /* Add Industry and SIC CODE button click event ****************************************************/
               $('#IndustrySICcode').off("click").on("click", function() {
                                                     var optgrp='<optgroup label=""></optgroup>';
                                                 if(globalIndCount<=3)
                                                 {
                                                     if(strDevice!="iPad"){
                                                      $('#divIndustrySICcode').prepend('<div id="Industry'+countIndustry+'"> <div  class="col-sm-10 col-xs-10 rowalign"><select id="IndustryName'+countIndustry+'" name="IndustryName'+countIndustry+'" onchange="FillSicCode(\'' + countIndustry+ '\')"  class="clsDropdown"></select> </div><div class="col-sm-2 col-xs-2 rowalign indDelBtn"><img  id="removeIndustry"  onclick="removeInd(\'' + countIndustry+ '\')" src="../images/deleteBtn.png" class="clsDeleteDetails"></div><div id="SICcodeSelect'+countIndustry+'" class="col-sm-10 col-xs-10 rowalign"><select id="SubIndustryName'+countIndustry+'" data-native-menu="false" multiple="multiple" class="clsDropdown" onchange="CountSicCode(\'' + countIndustry+ '\')"></select> </div></div>');
                                                     
                                                     }
                                                     else{
                                                      $('#divIndustrySICcode').prepend('<div id="Industry'+countIndustry+'"> <div  class="col-sm-10 col-xs-10 rowalign"><select id="IndustryName'+countIndustry+'" name="IndustryName'+countIndustry+'" onchange="FillSicCode(\'' + countIndustry+ '\')"  class="clsDropdown"></select> </div><div class="col-sm-2 col-xs-2 rowalign indDelBtn"><img  id="removeIndustry"  onclick="removeInd(\'' + countIndustry+ '\')" src="../images/deleteBtn.png" class="clsDeleteDetails"></div><div id="SICcodeSelect'+countIndustry+'" class="col-sm-10 col-xs-10 rowalign"><select id="SubIndustryName'+countIndustry+'" multiple="multiple" class="clsDropdown" onchange="CountSicCode(\'' + countIndustry+ '\')"></select> </div></div>');
                                                     }
                                                
                                                 $('select').selectmenu();
                                                
                                                 $('<option  />', {value: "0", text: "Select"}).appendTo('#IndustryName'+countIndustry);
                                                 
                                                 
                                                 $('<option />', {value: "0", text: "Select"}).appendTo('#SubIndustryName'+countIndustry);
                                                 $('select').selectmenu('refresh', true);
                                                  $('#SICcodeSelect'+countIndustry).hide();
                                                 
                                                 var Industrylist=sessionStorage.getItem('Industrylist');
                                                 //alert(Industrylist);
                                                 var obj=JSON.parse(Industrylist);
                                                 var issuccess = obj.IsSuccess;
                                                 var ErrorMessage=obj.ErrorMessage;
                                                 
                                                 if(issuccess==true)
                                                 {
                                                 var industry=obj.IndustryMaster;
                                                   $('#IndustryName'+countIndustry).append(optgrp);
                                                 $.each(industry, function(i, ind) {  
                                                 
                                                        $('<option />', {value: ind.IndustryId, text: ind.IndustryName}).appendTo('#IndustryName'+countIndustry);
                                                        
                                                        });
                                                 }	
                                                 
                                                 $('select').selectmenu('refresh');
                                                
                                                 countIndustry++;
                                                 globalIndCount++;
                                                }
                                                 else
                                                 {
                                                 jQuery("label[for='messagetext']").html('Sorry! Industry and NAICS Code limit exceeded.');
                                                 $('#InfopopupBrokerSignupNext').popup('open');
                                                 }
                                                 
                                                 });
               
               /*End of Add Industry and SIC CODE button click event **********************************************/
	 
	/* Add Education Details button click event **********************************************/
$('#addEducation').off("click").on("click", function() {
    if(globalEduCount<=5){
		
        $('#divEducation').prepend('<div id="edu'+countEdu+'"> <div class="col-sm-10 col-xs-10 rowalign"><input id="universityName'+countEdu+'"  type="text" value="" data-wrapper-class="ui-custom" placeholder="School" ></div><div class="col-sm-2 col-xs-2 rowalign"><img id="removeEducation"  onclick="removeEdu(\'' + countEdu+ '\')" src="../images/deleteBtn.png" class="clsDeleteDetails"></div><div class="col-sm-10 col-xs-10 rowalign"><input id="courseName'+countEdu+'" type="text" value="" data-wrapper-class="ui-custom" placeholder="Degree"><input id="durationFromEdu'+countEdu+'" type="text" value="" data-wrapper-class="ui-custom-duration" placeholder="Year" ></div><div class="col-sm-10 col-xs-10 rowalign mutipletxt"><input id="EduSchoolLogo'+countEdu+'" type="text" value="" data-wrapper-class="ui-custom" placeholder="School Logo" disabled><img id="SchoolLogoimg'+countEdu+'" onclick="schoolLogoUpload(\'' + countEdu+ '\')"  class="browseimg" src="../images/browse.png" ></div><textarea id="txtSchoollogo'+countEdu+'" style="display:none;"  rows="5" cols="10" ></textarea><input type="hidden" name="EduId" id="EduId'+countEdu+'" value=""><input type="hidden" name="IsUpdated" id="IsUpdated'+countEdu+'" value="false"></div>');
		
		$("#universityName"+countEdu).textinput();
		$("#courseName"+countEdu).textinput();
		$("#durationFromEdu"+countEdu).textinput();
        $("#EduSchoolLogo"+countEdu).textinput();
       
		countEdu++;
		globalEduCount++;

    }
    else{
        jQuery("label[for='messagetext']").html('Sorry! Education details record entry exceed its limit.');
	    $('#InfopopupBrokerSignupNext').popup('open');
    }
});
	/* End of Add Education Details button click event **********************************************/
	
	
	/* Add Experience Details button click event ****************************************************/	
$('#addExperience').off("click").on("click", function() {
	if(globalExpCount<=7){
                                    
		$('#divExperience').prepend('<div id="exp'+countExp+'"> <div  class="col-sm-10 col-xs-10 rowalign">'
                +'<input id="companyName'+countExp+'" type="text" value="" data-wrapper-class="ui-custom " placeholder="Company Name" >'
                // <select id="companyName'+countExp+'" class="clsDropdown"></select>
                +'</div><div class="col-sm-2 col-xs-2 rowalign">'
                +'<img  id="removeExperience"  onclick="removeExp(\'' + countExp+ '\')" src="../images/deleteBtn.png" class="clsDeleteDetails"></div>'
                                    
                +'<div class="col-sm-10 col-xs-10 rowalign mutipletxt"><input type="text" id="signupExpCompLogo'+countExp+'" value="" data-wrapper-class="ui-custom" placeholder="Company Logo" disabled><img id="signuppriorcompanyimg'+countExp+'" onclick="signuppriorcompanyLogoUpload(\'' + countExp+ '\')" class="browseimg" src="../images/browse.png" >'
                +'</div>'
                +'<textarea id="signuptxtpriorCompanylogo'+countExp+'" style="display:none;"  rows="5" cols="10" ></textarea>'
                +'<input type="hidden" name="signupExpId" id="signupExpId'+countExp+'" value=""><input type="hidden" name="signupIsUpdated" id="signupIsUpdated'+countExp+'" value="false">'
                +'<div class="col-sm-10 col-xs-10 rowalign"><input id="designation'+countExp+'" type="text" value="" data-wrapper-class="ui-custom-duration" placeholder="Title"></div>'
                                    
				+'<div class="col-sm-4 col-xs-4 rowalign"><input id="durationFromExp'+countExp+'" type="text" onclick="signuppickdate(\''+ countExp+ '\',\'durationFromExp\')" value="" data-wrapper-class="ui-custom " placeholder="Duration from" >'
				+'<input type="hidden" id="signupfromMonth'+countExp+'"/>'
				+'<input type="hidden" id="signupfromYear'+countExp+'"/>'
				+'</div>'
				+'<div class="col-sm-2 col-xs-2 rowalign"></div><div class="col-sm-4 col-xs-4 rowalign durationtoExp"><input id="durationToExp'+countExp+'" type="text" onclick="signuppickdate(\''+ countExp+ '\',\'durationToExp\')" value="" data-wrapper-class="ui-custom-duration" placeholder="Duration to" >'
				+'<input type="hidden" id="signuptoMonth'+countExp+'"/>'
				+'<input type="hidden" id="signuptoYear'+countExp+'"/>'
				+'</div>'
				+'<div class="col-sm-10 col-xs-10 rowalign"><label id="signupexpmsg'+countExp+'" class="experrormsg"></label></div></div>');
                                    
		$('input').textinput();
		
		countExp++;
		globalExpCount++;	
	}
	else{
		jQuery("label[for='messagetext']").html('Sorry! Experience details record entry exceed its limit.');
    	$('#InfopopupBrokerSignupNext').popup('open');
	}

	});
$('#profilepicprofile').attr("src",dcustomerimg);
	/*End of Add Experience Details button click event **********************************************/

var img = "";
$('#profilePhotoimg').on("click", function () {
    getImages("profilepicprofile","txtprofilepic","InfopopupBrokerSignupNext");
}); //end of input button
            
var img = "";
$('#CompanyLogoimg').on("click", function () {
    getImages("CompanyLogo","txtcompanylogo","InfopopupBrokerSignupNext");
}); //end of input button
        
/**************************Company Logo End**************************************/
	
/* Submit Button Click Event*************************************************************************************/
		 
$('#BrokerSignupNextBtn').off("click").on("click", function() {

    $.mobile.loading("show");
    
	var firstnameid = $('#firstname');
	var phoneid = $('#phone');
	var emailid = $('#email');
	var addressid = $('#area');
	var zipid = $('#pincode');
   
    //On key press
	firstnameid.keyup(validatefirstname);
	phoneid.keyup(validatephone);
	emailid.keyup(validateemail);
	addressid.keyup(validateaddress);
	zipid.keyup(validatepincode);
    
	
	function validatefirstname()
	{
		
		 if (globalvalidaterequired2(firstnameid)){
	        	return true;
	       }
	        else{
	        	return false;
	       	}
	}
	
	function validatepincode()
	{
		
		 if (globalvalidaterequired2(zipid)){
	        	return true;
	       }
	        else{
	        	return false;
	       	}
	}
	
	function validatephone()
	{
		 if (globalvalidaterequired2(phoneid)){
	        	return true;
	       }
	        else{
	        	return false;
	       	}
	}
	 
	function validateemail()
	{
		 if (globalvalidaterequired2(emailid)){
	        	return true;
	       }
	        else{
	        	return false;
	       	}
	}
	function validateaddress()
	{
		 if (globalvalidaterequired2(addressid)){
	        	return true;
	       }
	        else{
	        	return false;
	       	}
	}
	
	function validateFields(){
		if (GlobalValidatePinForLength(countPin) & globalvalidaterequired2(zipid) & globalvalidaterequired2(firstnameid) & globalvalidaterequired2(phoneid)& globalvalidaterequired2(emailid)& globalvalidaterequired2(addressid)){
        	return true;
       }
        else{
        	return false;
       	}	
	}

 if(validateFields())
	{
	 var expvalid=true;
	 var exparray = [];
	 for(i=1;i<=countExp;i++)
	 {
		 
		 $('#signupexpmsg'+i).text('');
			
			if($('#durationFromExp'+ i).val() !="")
			{
			if($('#durationToExp'+ i).val() =="")
				{
				expvalid=false;
					$('#signupexpmsg'+i).text('Please select to date');														
				}
			}
			
			
		 if($("#exp" + i).length > 0) {
			 
				    var obj = { 
                        ExpId:$('#signupExpId'+i).val(),
                        UserId: UserId,
                        Designation: $('#designation'+i).val(),
                        CompanyName: $('#companyName'+i).val(),
                        DurationFrom: $('#durationFromExp'+i).val(),
                        DurationTo:$('#durationToExp'+i).val(),
                        Bio:"",
                        IsUpdated:$('#signupIsUpdated'+i).val(),
                        ExpCompLogo: $('#signuptxtpriorCompanylogo'+i).val()
				    };
			 exparray.push(obj);
		 }
	}
	 
	 if(expvalid ==false)
		{
			
			$.mobile.loading("hide");
			jQuery("label[for='messagetext']").html("Please validate details.");
			$('#InfopopupBrokerSignupNext').popup('open');
			return false;
		}
	 
	 
	 var eduarray = [];
	 
	 for(i=1;i<=countEdu;i++)
	 {
		 if($("#edu" + i).length > 0) {
				    var obj = {
                            EduId:$('#EduId'+i).val(),
				    		UserId: UserId,
				    		UniversityName: $('#universityName'+i).val(),
				    		CourseName: $('#courseName'+i).val(),
				    		DurationFrom: $('#durationFromEdu'+i).val(),
				    		DurationTo: "",
                            IsUpdated:$('#IsUpdated'+i).val(),
                            EducationLogo:$('#txtSchoollogo'+i).val()
				    };
			 eduarray.push(obj);
                                         
		 }
	}
                                          
                                          
                                          var pinarray="";
                                          if($('#pincode').val()!="")
                                          {
                                          pinarray=$('#pincode').val();
                                          }
                                          
                                          for(i=1;i<countPin;i++)     {
                                          
                                          var existlen=$("#pincode" + i).length;
                                          if(existlen>0)
                                          {
                                          var len=$("#pincode" + i).val().length;
                                          if(parseInt(len) > 0) {
                                       
                                          pinarray+=','+ $('#pincode'+i).val();
                                          
                                          }
                                          }
                                          }
                                
                                          var industryarray = [];
                                          var selectedindustry=[];
                                          var industryID="";
                                          var SubIndustrydata='';
                                          var industrydata='';
                                          
                                          for(i=1;i<=globalIndCount;i++)
                                          {
                                          var subindcount=0;
                                          var selectedsubindustry=[];
                                          if($("#Industry" + i).length > 0) {
                                          var selectedcount = $("#SubIndustryName"+i).find(":selected").length;
                                          var indvalue=$('#IndustryName'+i).val();
                                          
                                          if(indvalue>0){
                                          industryID=$('#IndustryName'+i).val();
                                          
                                          $('#SubIndustryName'+i+' :selected').each(function(){
                                                                                    if(parseInt($(this).val())>0){
                                                                                    selectedsubindustry.push($(this).val());
                                                                                    }
                                                                                    });
                                          
                                          }
                                          
                                          if(parseInt(indvalue)!=0){
                                          
                                          if(selectedsubindustry==""){
                                          
                                          $.mobile.loading("hide");
                                          jQuery("label[for='messagetext']").html("Please select NAICS code.");
                                          $('#InfopopupBrokerSignupNext').popup('open');
                                          return false;
                                          }
                                          var selectedsubindustrylen=selectedsubindustry.length;
                                          if(selectedsubindustrylen>5){
                                          $.mobile.loading("hide");
                                          jQuery("label[for='messagetext']").html("Select max. 5 NAICS code.");
                                          $('#InfopopupBrokerSignupNext').popup('open');
                                          return false;
                                          }
                                          
                                          }
                                          
                                          
                                          if(industryID!="" && selectedsubindustry!=""){
                                          if(parseInt(indvalue)!=0){
                                          SubIndustrydata+=industryID+':'+selectedsubindustry+';';
                                          industrydata+=industryID+',';
                                          }
                                          }
                                          
                                          }
                                          
                                          }
                                          
                                          
                                          
                                          SubIndustrydata=SubIndustrydata.slice(0, -1);
                                          industrydata=industrydata.slice(0, -1);
            
	 var Languages="";
	 var Specialities="";
     var HomeValue="";
     var AutoType="";
     var Revenue="";
     var Employees="";
     var CoverageAmt="";
	 $('#chkLanguage option:selected').each(function() 
		{
		 Languages=Languages+$(this).text()+',';
		});
	 Languages=Languages.substring(0, Languages.length - 1);
	 
	 Specialities=$('#txtspecialities').val();
     if(Specialities!='')
      {
        $('#txtspecialities').prop('disabled', false);
      }
        var speciality=Specialities.split(',');
		 if(parseInt(speciality.length) >0)
		 {
			 HomeDetails="";
			 AutoDetails="";
			 BenefitsDetails="";
			 BusinessDetails="";
			 LifeDetails="";
			 
			 for(i=0; i<=speciality.length;i++)
			 {
				 if(speciality[i]=='Home')
				 {
					
					 if($("#chkHome1").is(":checked"))
					 {
						 HomeDetails=HomeDetails+$("#chkHome1").val();
						 HomeDetails=HomeDetails+';';
					 }
					 if($("#chkHome2").is(":checked"))
					 {
						 HomeDetails=HomeDetails+$("#chkHome2").val();
						 HomeDetails=HomeDetails+';';
					 }
					 if($("#chkHome3").is(":checked"))
					 {
						 HomeDetails=HomeDetails+$("#chkHome3").val();
						 HomeDetails=HomeDetails+';';
					 }
					 
				 }
				 
				 if(speciality[i]=='Auto')
				 {
					 
					 if($("#chkAuto1").is(":checked"))
					 {
						 AutoDetails=AutoDetails+$("#chkAuto1").val();
						 AutoDetails=AutoDetails+';';
					 }
					 if($("#chkAuto2").is(":checked"))
					 {
						 AutoDetails=AutoDetails+$("#chkAuto2").val();
						 AutoDetails=AutoDetails+';';
					 }
					 if($("#chkAuto3").is(":checked"))
					 {
						 AutoDetails=AutoDetails+$("#chkAuto3").val();
						 AutoDetails=AutoDetails+';';
					 }
					 if($("#chkAuto4").is(":checked"))
					 {
						 AutoDetails=AutoDetails+$("#chkAuto4").val();
						 AutoDetails=AutoDetails+';';
					 }
					 
				 }
				 
				 if(speciality[i]=='Benefits')
				 {
					 
					 if($("#chkBenefits1").is(":checked"))
					 {
						 BenefitsDetails=BenefitsDetails+$("#chkBenefits1").val();
						 BenefitsDetails=BenefitsDetails+';';
					 }
					 if($("#chkBenefits2").is(":checked"))
					 {
						 BenefitsDetails=BenefitsDetails+$("#chkBenefits2").val();
						 BenefitsDetails=BenefitsDetails+';';
					 }
					 if($("#chkBenefits3").is(":checked"))
					 {
						 BenefitsDetails=BenefitsDetails+$("#chkBenefits3").val();
						 BenefitsDetails=BenefitsDetails+';';
					 }
					 if($("#chkBenefits4").is(":checked"))
					 {
						 BenefitsDetails=BenefitsDetails+$("#chkBenefits4").val();
						 BenefitsDetails=BenefitsDetails+';';
					 }
					 
				 }
				 
				 if(speciality[i]=='Business')
				 {
					 
					 if($("#chkBusiness1").is(":checked"))
					 {
						 BusinessDetails=BusinessDetails+$("#chkBusiness1").val();
						 BusinessDetails=BusinessDetails+';';
					 }
					 if($("#chkBusiness2").is(":checked"))
					 {
						 BusinessDetails=BusinessDetails+$("#chkBusiness2").val();
						 BusinessDetails=BusinessDetails+';';
					 }
					 if($("#chkBusiness3").is(":checked"))
					 {
						 BusinessDetails=BusinessDetails+$("#chkBusiness3").val();
						 BusinessDetails=BusinessDetails+';';
					 }
					 if($("#chkBusiness4").is(":checked"))
					 {
						 BusinessDetails=BusinessDetails+$("#chkBusiness4").val();
						 BusinessDetails=BusinessDetails+';';
					 }
					 
				 }
				 
				 if(speciality[i]=='Life')
				 {
					 
					 if($("#chkLife1").is(":checked"))
					 {
						 LifeDetails=LifeDetails+$("#chkLife1").val();
						 LifeDetails=LifeDetails+';';
					 }
					 if($("#chkLife2").is(":checked"))
					 {
						 LifeDetails=LifeDetails+$("#chkLife2").val();
						 LifeDetails=LifeDetails+';';
					 }
					 if($("#chkLife3").is(":checked"))
					 {
						 LifeDetails=LifeDetails+$("#chkLife3").val();
						 LifeDetails=LifeDetails+';';
					 }
					 if($("#chkLife4").is(":checked"))
					 {
						 LifeDetails=LifeDetails+$("#chkLife4").val();
						 LifeDetails=LifeDetails+';';
					 }
					 
				 }
			 }
			 
			 if(HomeDetails!='')
			 {
				 var RHome = HomeDetails.slice(-1);
				 if (RHome == ';') 
				 {
					 HomeDetails = HomeDetails.slice(0, -1);
				 }
			 }
		     
			 if(AutoDetails!='')
			 {
				 var RAuto = AutoDetails.slice(-1);
				 if (RAuto == ';') 
				 {
					 AutoDetails = AutoDetails.slice(0, -1);
				 }
			 }
		     
			 if(BenefitsDetails!='')
			 {
				 var RBenefits = BenefitsDetails.slice(-1);
				 if (RBenefits == ';') 
				 {
					 BenefitsDetails = BenefitsDetails.slice(0, -1);
				 }
			 }
		     
		     if(BusinessDetails!='')
			 {
		    	var RBusiness = BusinessDetails.slice(-1);
		    	if (RBusiness == ';') 
		    	{
		    		BusinessDetails = BusinessDetails.slice(0, -1);
		    	}
			 }
		     
		     if(LifeDetails!='')
			 {
		    	var RLife = LifeDetails.slice(-1);
		    	if (RLife == ';') 
		    	{
		    		LifeDetails = LifeDetails.slice(0, -1);
		    	}
			 }
		 }
                               
	 var Result={
				"UserDetails":[  
		                {  
		                   "UserId":UserId,
		                   "FirstName":$('#firstname').val(),
		                   "LastName":$('#lastname').val(),
		                   "Address":"",
		                   "City":$('#area').val(),
		                   "State":"",
		                   "Country":"",
		                   "PinCode":$('#pincode').val(),
		                   "PhoneNo":$('#phone').val(),
		                   "MobNo":"",
		                   "DOB":"",
		                   "ProfilePicture":$('#txtprofilepic').val(),
		                   "CompanyName":$('#company').val(),
		                   "Title":$('#title').val(),
		                   "Designation":"",
		                   "Languages":Languages,
		                   "Specialities":Specialities,
		                   "Awards":"",
		                   "Skills":"",
		                   "Recommendations":"",
		                   "License":"",
		                   "ExpiryDate":"",
                           "Resume":"",
                           "longitude":lng,
                           "latitude":lat,
                           "HomeValue":HomeDetails,
		              	   "AutoType":AutoDetails,
		              	   "Revenue":BusinessDetails,
		              	   "Employees":BenefitsDetails,
		              	   "CoverageAmt":LifeDetails,
                           "CompanyLogo":$('#txtcompanylogo').val(),
                           "IndustryId":industrydata,
                           "SubIndustryId":SubIndustrydata,
                           "Bio":$('#Biodesc').val()
		                   
		                }
		             ],
		             "ExperienceDetails": exparray,
		             "EducationDetails": eduarray
		          };

	 var profileFlag=sessionStorage.getItem('BrokerProfilephotoupdated');
	 sessionStorage.removeItem('BrokerProfilephotoupdated');
     var companyLogoFlag=sessionStorage.getItem('BrokerCompanyLogoupdated');
     sessionStorage.removeItem('BrokerCompanyLogoupdated');
    var listToDeleteEdu=DeletedEduList.toString();
    var listToDeleteExp=DeletedExpList.toString();
                                          
	$.ajax({		
		type: "POST",
		url: webserviceURL,
		data: {Result:JSON.stringify(Result),ActionName:"DoUpdateProfileBroker",IsProfilePicUpdated:profileFlag,IsCompanyLogoUpdated:companyLogoFlag,DeletedEduList:listToDeleteEdu,DeletedExpList:listToDeleteExp},
		success: function (data) {
		   var obj = JSON.parse(data);
			var issuccess = obj.IsSuccess;
			var ErrorMessage=obj.ErrorMessage;
			
			if(issuccess==true)
				{
				$.mobile.loading("hide"); 
				var UserDetails=obj.UserDetails;
			
				$.each(UserDetails, function (i, res) {
					SetDeviceIdForiOS(res.UserId);
					sessionStorage.setItem('BrokerUser',data);
                    localStorage.setItem('BrokerUser',data);
					setInitialVariable();
					$( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/profileBroker.html",{transition: "slide",reverse: false});
				 });
				}
			else if(issuccess==false)
			{
				$.mobile.loading("hide");
				jQuery("label[for='messagetext']").html(ErrorMessage);
		    	$('#InfopopupBrokerSignupNext').popup('open');
				}
			else
				{
				$.mobile.loading("hide");
				jQuery("label[for='messagetext']").html("Error Occured,Please try again.");
		    	$('#InfopopupBrokerSignupNext').popup('open');
				}	

			},        					
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if(errorThrown!=""){	
				$.mobile.loading("hide"); //1.4.5
				jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
		    	$('#InfopopupBrokerSignupNext').popup('open');
		    	
			}
			else{					
			}	
		}			 			
	});
}
	else
    {
    	$.mobile.loading("hide"); //1.4.5
    	jQuery("label[for='messagetext']").html("Please validate details.");
    	$('#InfopopupBrokerSignupNext').popup('open');
    	
    }
	
});

$('#OkbtnBrokerSignupNext').off("click").on("click", function() {
	$('#InfopopupBrokerSignupNext').popup('close');
});
	
               $("input[type='checkbox']").click(function() {
                                                 if(CheckForAllCheckbox())
                                                 {
                                                 $('#chkSelectAll').prop('checked', true).checkboxradio('refresh');
                                                 
                                                 }
                                                 else
                                                 {
                                                 $('#chkSelectAll').prop('checked', false).checkboxradio('refresh');
                                                 }
                                                 });
               $("#InfopopupSpecialitiesSignupNext").popup({
                                                 beforeposition: function () {
                                                 heightpoppup=$("#InfopopupSpecialitiesSignupNext").height();
                                                 popupfix(hbcontent,heightpoppup);
                                                 $(this).css({
                                                             width: window.innerWidth,
                                                             height: window.innerHeight,
                                                             overflow:'scroll'
                                                             });
                                                 },
                                                 x:0,
                                                 y:0
                                                 });
              
               $('#chkHome').click(function() {
                                   if (!$(this).is(':checked')) {
                                   
                                   $('#chkHome1').prop('checked', false).checkboxradio('refresh');
                                   $('#chkHome2').prop('checked', false).checkboxradio('refresh');
                                   $('#chkHome3').prop('checked', false).checkboxradio('refresh');
                                   
                                   $("div#divHome").hide();
                                   $("div#divlblErrorMsg").hide();
                                   }
                                   else
                                   {
                                   $("div#divHome").show();
                                   $("div#divlblErrorMsg").hide();
                                   heightpoppup=$("#InfopopupSpecialitiesSignupNext").height();
                                   popupfix(hbcontent,heightpoppup);
                                   }
                                   });
               $('#chkAuto').click(function() {
                                   if (!$(this).is(':checked')) {
                                   $('#chkAuto1').prop('checked', false).checkboxradio('refresh');
                                   $('#chkAuto2').prop('checked', false).checkboxradio('refresh');
                                   $('#chkAuto3').prop('checked', false).checkboxradio('refresh');
                                   $('#chkAuto4').prop('checked', false).checkboxradio('refresh');
                                   
                                   $("div#divAuto").hide();
                                   $("div#divlblErrorMsg").hide();
                                   }
                                   else
                                   {
                                   $("div#divAuto").show();
                                   $("div#divlblErrorMsg").hide();
                                   heightpoppup=$("#InfopopupSpecialitiesSignupNext").height();
                                   popupfix(hbcontent,heightpoppup);
                                   }
                                   });
               $('#chkBenefits').click(function() {
                                       if (!$(this).is(':checked')) {
                                       $('#chkBenefits1').prop('checked', false).checkboxradio('refresh');
                                       $('#chkBenefits2').prop('checked', false).checkboxradio('refresh');
                                       $('#chkBenefits3').prop('checked', false).checkboxradio('refresh');
                                       $('#chkBenefits4').prop('checked', false).checkboxradio('refresh');
                                       
                                       $("div#divBenefits").hide();
                                       $("div#divlblErrorMsg").hide();
                                       }
                                       else
                                       {
                                       $("div#divBenefits").show();
                                       $("div#divlblErrorMsg").hide();
                                       heightpoppup=$("#InfopopupSpecialitiesSignupNext").height();
                                       popupfix(hbcontent,heightpoppup);
                                       }
                                       });
               $('#chkBusiness').click(function() {
                                       if (!$(this).is(':checked')) {
                                       $('#chkBusiness1').prop('checked', false).checkboxradio('refresh');
                                       $('#chkBusiness2').prop('checked', false).checkboxradio('refresh');
                                       $('#chkBusiness3').prop('checked', false).checkboxradio('refresh');
                                       $('#chkBusiness4').prop('checked', false).checkboxradio('refresh');
                                       
                                       $("div#divBusiness").hide();
                                       $("div#divlblErrorMsg").hide();
                                       }
                                       else
                                       {
                                       $("div#divBusiness").show();
                                       $("div#divlblErrorMsg").hide();
                                       heightpoppup=$("#InfopopupSpecialitiesSignupNext").height();
                                       popupfix(hbcontent,heightpoppup);
                                       }
                                       });
               $('#chkLife').click(function() {
                                   if (!$(this).is(':checked')) {
                                   
                                   $('#chkLife1').prop('checked', false).checkboxradio('refresh');
                                   $('#chkLife2').prop('checked', false).checkboxradio('refresh');
                                   $('#chkLife3').prop('checked', false).checkboxradio('refresh');
                                   $('#chkLife4').prop('checked', false).checkboxradio('refresh');
                                   
                                   $("div#divLife").hide();
                                   $("div#divlblErrorMsg").hide();
                                   }
                                   else
                                   {
                                   $("div#divLife").show();
                                   $("div#divlblErrorMsg").hide();
                                   heightpoppup=$("#InfopopupSpecialitiesSignupNext").height();
                                   popupfix(hbcontent,heightpoppup);
                                   }
                                   });
               
               //End of 12Oct16
               $("#InfopopupSpecialitiesSignupNext").popup({
                    afteropen: function () {
                                                           //alert("after open");
                   
                                                   
                
                                                          /* if((globalEduCount<2)&&(strDevice!="iPad")){
                                                           $(".keyboard").css("height", "470");// The height of your keyboard
                                                           }
                                                           if((globalEduCount<2)&&(strDevice=="iPad")){
                                                           $(".keyboard").css("height", "330");// The height of your keyboard
                                                           }*/
                                                           
                                                           }
                                                           });
               $("#InfopopupSpecialitiesSignupNext").popup({
                                                           afterclose: function () {
                                                            $('.ui-content').css('height',hbcontent);
                                                           $(".keyboard").css("height", "0");// The height of your keyboard
                                                           }
                                                           });

               
});
function CheckForAllCheckbox()
{
    if($("#chkHome").is(':checked')&& $("#chkAuto").is(':checked')&& $("#chkBenefits").is(':checked')&& $("#chkBusiness").is(':checked')&& $("#chkLife").is(':checked')&& $("#chkHome1").is(':checked')&& $("#chkHome2").is(':checked')&& $("#chkHome3").is(':checked')&& $("#chkAuto1").is(':checked')&& $("#chkAuto2").is(':checked')&& $("#chkAuto3").is(':checked')&& $("#chkAuto4").is(':checked')&& $("#chkBenefits1").is(':checked')&& $("#chkBenefits2").is(':checked')&& $("#chkBenefits3").is(':checked')&& $("#chkBenefits4").is(':checked')&& $("#chkBusiness1").is(':checked')&& $("#chkBusiness2").is(':checked')&& $("#chkBusiness3").is(':checked')&& $("#chkBusiness4").is(':checked')&& $("#chkLife1").is(':checked')&& $("#chkLife2").is(':checked')&& $("#chkLife3").is(':checked')&& $("#chkLife4").is(':checked'))
    {
        return true
    }
    else
    {
        //alert('else');
        return false;
    }
    
}


function CountSicCode(Count)
{
    if(strDevice=="iPad"){
    var greaterthanfive=false;
    var count=0;
    var selectedcount = $("#SubIndustryName"+Count).find(":selected").length;
    
    if(selectedcount <=0)
    {
        //alert('length '+ selectedcount);
        $("#SubIndustryName"+Count+" option[value=0]").remove();
        
        $('#SubIndustryName'+Count).prepend('<option value=0>Select NAICS Code</option>');
        $("#SubIndustryName"+Count+" option[value=0]").attr('selected', 'selected');
    }
    
    
    $('#SubIndustryName'+Count+' :selected').each(function(){
                                                  
                                                  if(count <5)
                                                  {
                                                  if(parseInt($(this).val()) >0)
                                                  {
                                                  count++;
                                                  $("#SubIndustryName"+Count+" option[value=0]").remove();
                                                  }
                                                  }
                                                  else
                                                  {
                                                  greaterthanfive=true;
                                                  }
                                                  
                                                  });
    }
}

function FillSicCode(Count)
{
    
    var ddSiccode=$('#SubIndustryName'+Count);
    var ddIndustryName=$("#ddIndustryName"+Count);
    var IndId = $("select[name=IndustryName"+Count+"] option:selected").val();
    $('#SubIndustryName'+Count).empty();
    $('select').selectmenu('refresh', true);
    var optgrp='<optgroup label=""></optgroup>';
		  if(parseInt(IndId) >0)
          {
               $('#SICcodeSelect'+Count).show();
              
              $.ajax({
                     type: "POST",
                     url: webserviceURL,
                     data: {IndustryId:IndId,ActionName:"DoGetSubIndustryMaster"},
                     success: function (data) {
                        //alert('data '+data);
                     var obj=JSON.parse(data);
                     var issuccess = obj.IsSuccess;
                     var ErrorMessage=obj.ErrorMessage;
                     
                     if(issuccess==true)
                     {
                     var SubIndustryMaster=obj.SubIndustryMaster;
                     if(strDevice!="iPad"){
                     $('<option />', {text: "Select NAICS Code"}).appendTo('#SubIndustryName'+Count);
                     }
                     else{
                     $('#SubIndustryName'+Count).append('<option value=0>Select NAICS Code</option>');
                     $("#SubIndustryName"+Count+" option[value=0]").attr('selected', 'selected');
                     }
                     $('#SubIndustryName'+Count).append(optgrp);
                     $.each(SubIndustryMaster, function(i, IndSubCat) {
                            
                        $('<option />', {value: IndSubCat.SubIndustryId, text: IndSubCat.SICCode+ '-'+ IndSubCat.SubIndustryName}).appendTo('#SubIndustryName'+Count);
                            
                            });
                     $('select').selectmenu('refresh', true);
                     
                     
                     }
                     },
                     error : function(XMLHttpRequest, textStatus, errorThrown) {
                     
                     }
                     });
          }
          else
          {
              
              $('#SubIndustryName'+Count).empty();
              $('<option  />', {text: "Select NAICS Code"}).appendTo('#SubIndustryName'+Count);
              
              var ddSiccode=$('#SubIndustryName'+Count);
              var ddIndustryName=$("#IndustryName"+Count);
              $('#SICcodeSelect'+Count).hide();
              $('select').selectmenu('refresh', true);
          }
		  $('select').selectmenu('refresh', true);
}

function PinCode(Count)
{
    var max_chars=5;
    var pincodevalue=$('#pincode'+Count).val();
    if ($('#pincode'+Count).val().length >= max_chars) {
        $('#pincode'+Count).val($('#pincode'+Count).val().substr(0, max_chars));
    }
}
function signuppickdate(count,id)
{
    
	$('#signuptxtSelectedTextBoxId').val(id);
	$('#signuptxtSelectedTextBoxCount').val(count);
	
	$('#signupfromToDate').popup('open');
	signupselcetmonth();
	signupselcetyear();
}

function signupSetDuration()
{
	
	var month='',year='',selectedtxt='';
	month=$('#signupselectedmonth').val();
	year=$('#signupselectedyear').val();
	
	var id,count;
	id=$('#signuptxtSelectedTextBoxId').val();
	count=$('#signuptxtSelectedTextBoxCount').val();
	selectedtxt=id+count;
	$('#signupexpmsg'+count).text('');
	
	if(month!='' && year!='')
		{
		var montharray=month.split('_');
		if(id=="durationToExp")
			{
			$('#signuptoMonth'+count).val(montharray[1]);
			$('#signuptoYear'+count).val(year);
				if($("#durationFromExp"+count).val() !='')
					{
						var frommonth='',fromyear='',tomonth='',toyear='';
						frommonth=$('#signupfromMonth'+count).val();
						fromyear=$('#signupfromYear'+count).val()
						
						tomonth=$('#signuptoMonth'+count).val();
						toyear=$('#signuptoYear'+count).val();
						
						if(parseInt(toyear) >=parseInt(fromyear))
						{
							if(parseInt(toyear) ==parseInt(fromyear))
							{
								if(parseInt(tomonth)>=parseInt(frommonth))
									{
									$('#'+selectedtxt).val(montharray[0]+'-'+year);
									$('.month').removeClass('activemonth');
									$('.year').removeClass('activeyear');
									$('#signupfromToDate').popup('close');
									}
								else
									{
									$('#'+selectedtxt).val('');
									$('#signupexpmsg'+count).text("Your to date can't be earlier than your from date.");
									$('#signupfromToDate').popup('close');
									}
							}
							else
							{
								$('#'+selectedtxt).val(montharray[0]+'-'+year);
								$('.month').removeClass('activemonth');
								$('.year').removeClass('activeyear');
								$('#signupfromToDate').popup('close');
							}
							
						}
						else
						{
							$('#'+selectedtxt).val('');
							$('#signupexpmsg'+count).text("Your to date can't be earlier than your from date.");
							$('#signupfromToDate').popup('close');
						}
					

					}
				else
					{
						$('#signupexpmsg'+count).text('Please select from date.');
						$('#signupfromToDate').popup('close');
					}
			}
		else
			{
			$('#signupfromMonth'+count).val(montharray[1]);
			$('#signupfromYear'+count).val(year);
			
			if($("#durationToExp"+count).val() !='')
			{
				var frommonth='',fromyear='',tomonth='',toyear='';
				frommonth=$('#signupfromMonth'+count).val();
				fromyear=$('#signupfromYear'+count).val()
				
				tomonth=$('#signuptoMonth'+count).val();
				toyear=$('#signuptoYear'+count).val();
				
				if(parseInt(toyear) >=parseInt(fromyear))
				{
					if(parseInt(toyear) ==parseInt(fromyear))
					{
						if(parseInt(tomonth)>=parseInt(frommonth))
							{
								$('#'+selectedtxt).val(montharray[0]+'-'+year);
								$('.month').removeClass('activemonth');
								$('.year').removeClass('activeyear');
								$('#signupfromToDate').popup('close');
							}
						else
							{
							$("#durationToExp"+count).val('');
							$('#'+selectedtxt).val(montharray[0]+'-'+year);
							$('.month').removeClass('activemonth');
							$('.year').removeClass('activeyear');
							$('#signupexpmsg'+count).text("Your to date can't be earlier than your from date.");
							$('#signupfromToDate').popup('close');
							}
					}
					else
					{
						$('#'+selectedtxt).val(montharray[0]+'-'+year);
						$('.month').removeClass('activemonth');
						$('.year').removeClass('activeyear');
						$('#signupfromToDate').popup('close');
					}
					
				}
				else
				{
					$("#durationToExp"+count).val('');
					$('#'+selectedtxt).val(montharray[0]+'-'+year);
					$('.month').removeClass('activemonth');
					$('.year').removeClass('activeyear');
					$('#signupexpmsg'+count).text("Your to date can't be earlier than your from date.");
					$('#signupfromToDate').popup('close');
				}
			

			}
			else
				{
					$('#'+selectedtxt).val(montharray[0]+'-'+year);
					$('.month').removeClass('activemonth');
					$('.year').removeClass('activeyear');
					$('#signupfromToDate').popup('close');
				}
			}
			
		}
	}




function signupCancel()
{
    
    $('.month').removeClass('activemonth');
    $('.year').removeClass('activeyear');
    $('#signupfromToDate').popup('close');
}

function signupselcetmonth()
{
    var element_width = 50;
    var pos=$('#signupmonthcontent').offset().top - $('#signupmonthtop').offset().top;
    
    var positive =  Math.abs(pos)
    var divided = positive / element_width;
    var round = Math.round(divided);
    
    var current_element = $('#signupmonthcontent').children().eq(round);
    var id = current_element.attr('id');
    
    
    if(id != prv_Month){
        prv_Month = id;
        $('.month').removeClass("active");
        $('#'+id).addClass("active");
        
        $('#signupselectedmonth').val(id);
    }
}


function signupselcetyear()
{
    var element_width = 50;
    var pos=$('#signupyearcontent').offset().top - $('#signupyeartop').offset().top;
    
    var positive =  Math.abs(pos)
    var divided = positive / element_width;
    var round = Math.round(divided);
    
    var current_element = $('#signupyearcontent').children().eq(round);
    var id = current_element.attr('id');
    
    if(id != prv_Year){
        prv_Year = id;
        
        $('.year').removeClass("active");
        $('#'+id).addClass("active");
        
        $('#signupselectedyear').val(id);
    }
}

function signuppriorcompanyLogoUpload(editcountExp)
{
    var imageid='signupExpCompLogo'+' '+editcountExp;
    var txtimageid='signuptxtpriorCompanylogo'+editcountExp;
    var popupid='InfopopupBrokerSignupNext';
    getImages(imageid,txtimageid,popupid);    
    
}

function schoolLogoUpload(editcountEdu)
{
    var imageid='EduSchoolLogo'+' '+editcountEdu;
    var txtimageid='txtSchoollogo'+editcountEdu;
    var popupid='InfopopupBrokerSignupNext';
    getImages(imageid,txtimageid,popupid);
    
}


