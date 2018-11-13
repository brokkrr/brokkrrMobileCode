$(document).on("pagebeforecreate","#editSignupBroker_Page", function (event) {
        if (strDevice!="iPad"){
               $("#chkLanguage").attr("data-native-menu", "false");
        }
        editglobalIndCount=1;
});


$(document).on("pageshow","#editSignupBroker_Page", function( event ,ui) {
               CheckDeviceId(useridBroker);
               var heightpoppup="";
              var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }
               else{
                hbcontent=stopPageOverflow(hbcontent);
               }
               $('.ui-content').css('height',hbcontent);
               
editglobalPinCount=1;
var str=ui.prevPage.prop("id");
var n = str.indexOf("SubIndustryName");
var d = str.indexOf("dialog");
if(parseInt(d)>1){
    return false;
}
               
prv_Month="";
prv_Year="";
var nowY = new Date().getFullYear();
               
var options="";
    for(var Y=nowY; Y>=1950; Y--) {
        options += '<div id='+Y+' class="year">'+Y+'</div>';
    }
    options += '<div id="" class="year"></div>';
    $("#yearcontent").append(options);
               
               
$('#month').scroll(function(){
        selcetmonth();
});
$('#year').scroll(function(){
        selcetyear();
});
               

$(document).on('vmouseout', "#month", function (e) {
var timeout;
timeout=setInterval(function(){
    var selectedmonth=$('#selectedmonth').val();
    var pos=$('#monthcontent').offset().top - $('#monthtop').offset().top;
    var positive =  Math.abs(pos)
    var divided = positive / 50;
    var round = Math.round(divided);
    var po=(round-1)*50;
                                                  
                    
    $('#month').animate({
    scrollTop: po
    }, 'fast');
                    
    window.clearInterval(timeout);
    }, 1000);
               
});
                    
              
$(document).on('vmouseout', "#year", function (e) {
    var timeoutyear;
    timeoutyear=setInterval(function(){
        var selectedmonth=$('#selectedyear').val();
        var pos=$('#yearcontent').offset().top - $('#yeartop').offset().top;
        var positive =  Math.abs(pos)
        var divided = positive / 50;
        var round = Math.round(divided);
        var po=(round-1)*50;
                                       
        $('#year').animate({
        scrollTop: po
        }, 'fast');
                                       
        window.clearInterval(timeoutyear);
        }, 1000);
});
               
/*
$('#editaddPinDetails').off("click").on("click", function() {
var len=$('#editpincode').val().length;
     if(parseInt(len)>0){
         if(editglobalPinCount<=4){
               $('#editdivPinDetails').append('<div id="editdivpincode'+editcountPin+'" class="maindivpincode"><div class="col-sm-10 col-xs-10 multiplepin" style=""><input id="editpincode'+editcountPin+'" type="number" value="" data-wrapper-class="ui-custom" placeholder="Zipcode" onkeyup="editPinCode(\'' + editcountPin+ '\')"></div><div class="col-sm-2 col-xs-2 delimagePincode"><img id="editremovePincode" onclick="editremovePincode(\'' + editcountPin+ '\')" src="../images/deleteBtn.png"></div></div>');
               $("#editpincode"+editcountPin).textinput();
               $("#editpincode"+editcountPin).textinput();
               editcountPin++;
               editglobalPinCount++;
          }
          else{
                jQuery("label[for='messagetext']").html("Upto 5 zip code allowed.");
                $('#InfopopupEditBrokerProfile').popup('open');
          }
     }
     else{
          jQuery("label[for='messagetext']").html("Please enter zipcode.");
          $('#InfopopupEditBrokerProfile').popup('open');
    }
});*/
var SubIndustrydata='';

/* Add Industry and SIC CODE button click event ****************************************************/
$('#editIndustrySICcode').off("click").on("click", function() {
var arraysubind=[];
    if(editglobalIndCount<=3){
           if(strDevice!="iPad"){
                 $('#editdivIndustrySICcode').prepend('<div id="Industry'+editcountInd+'"> <div  class="col-sm-10 col-xs-10 rowalign"><label>Select Industry</label><select id="IndustryName'+editcountInd+'" name="IndustryName'+editcountInd+'" onchange="FilleditSicCode(\'' + editcountInd+ '\')"  ></select> </div><div class="col-sm-2 col-xs-2 rowalign indDelBtn" ><img id="removeIndustry"  onclick="removeIndustry(\'' + editcountInd+ '\')" src="../images/deleteBtn.png"  class="clsDeleteDetails"></div><div id="SICcodeSelect'+editcountInd+'" class="col-sm-10 col-xs-10 rowalign"><label>Select NAICS code <span style="font-size:12px;">(You can select max. 5 NAICS codes)</span></label><select id="SubIndustryName'+editcountInd+'" multiple="multiple" data-native-menu="false" onchange="CounteditSicCode(\'' + editcountInd+ '\')"></select> </div></div>');
           }
           else{
                 $('#editdivIndustrySICcode').prepend('<div id="Industry'+editcountInd+'"> <div  class="col-sm-10 col-xs-10 rowalign"><label>Select Industry</label><select id="IndustryName'+editcountInd+'" name="IndustryName'+editcountInd+'" onchange="FilleditSicCode(\'' + editcountInd+ '\')"  ></select> </div><div class="col-sm-2 col-xs-2 rowalign indDelBtn"  ><img id="removeIndustry"  onclick="removeIndustry(\'' + editcountInd+ '\')" src="../images/deleteBtn.png"  class="clsDeleteDetails"></div><div id="SICcodeSelect'+editcountInd+'" class="col-sm-10 col-xs-10 rowalign"><label>Select NAICS code <span style="font-size:12px;">(You can select max. 5 NAICS codes)</span></label><select id="SubIndustryName'+editcountInd+'" multiple="multiple" onchange="CounteditSicCode(\'' + editcountInd+ '\')"></select> </div></div>');
           }
    $('select').selectmenu();
    var optgrp='<optgroup label=""></optgroup>';
    $('<option  />', {value: "0", text: "Select"}).appendTo('#IndustryName'+editcountInd);
    $('<option />', {value: "0", text: "Select"}).appendTo('#SubIndustryName'+editcountInd);
    $('select').selectmenu('refresh', true);
    $('#SICcodeSelect'+editcountInd).hide();
    var Industrylist=sessionStorage.getItem('Industrylist');
    var obj=JSON.parse(Industrylist);
    var issuccess = obj.IsSuccess;
    var ErrorMessage=obj.ErrorMessage;
        if(issuccess==true){
             var industry=obj.IndustryMaster;
             $('#IndustryName'+editcountInd).append(optgrp);
             $.each(industry, function(i, ind) {
                  $('<option />', {value: ind.IndustryId, text: ind.IndustryName}).appendTo('#IndustryName'+editcountInd);
             });
         }
                                          
     $('select').selectmenu('refresh');
     editcountInd++;
     editglobalIndCount++;
    }
    else{
          jQuery("label[for='messagetext']").html('Sorry! Industry and NAICS Code limit exceeded.');
          $('#InfopopupEditBrokerProfile').popup('open');
    }
});
/*End of Add Industry and SIC CODE button click event **********************************************/
               
var lat="";
var lng="";
var PreviousZip="";
var Oldlat="";
var Oldlng="";
var NewZip="";
var HomeDetails="";
var AutoDetails="";
var BenefitsDetails="";
var BusinessDetails="";
var LifeDetails="";
var specarray=[];
DeletedEduList = [];
DeletedExpList= [];
var Closeclick='true';
$.mobile.loading("show");
sessionStorage.setItem('BrokerProfilephotoupdated','false');
var max_chars = 5;
               
$('#editpincode').keyup( function(e){
   if ($(this).val().length >= max_chars) {
       $(this).val($(this).val().substr(0, max_chars));
   }
   if ($(this).val().length>=5){
        var zip=$(this).val();
        NewZip=zip;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': zip }, function (results, status) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
        });
    }
});

$('#txtspecialities_span').on('click', function() {
      $("div#divlblErrorMsg").hide();
      $('#InfopopupSpecialities').popup('open');
           		
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
                  // alert("click");
                   
    Closeclick='false';
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
        if($("#chkHome").is(":checked")){
             Spec=Spec+'Home';
             Spec=Spec+',';
             specarray.push('Home');
             flagSubCategoryHome='false';
             flagMainCategoryHome='true';
                 if($("#chkHome1").is(":checked")){
                    flagSubCategoryHome='true';
                 }
                 if($("#chkHome2").is(":checked")){
                    flagSubCategoryHome='true';
                 }
                 if($("#chkHome3").is(":checked")){
                    flagSubCategoryHome='true';
                 }
         }
                    
         if($("#chkAuto").is(":checked")){
             Spec=Spec+'Auto';
             Spec=Spec+',';
             specarray.push('Auto');
             flagMainCategoryAuto='true';
             flagSubCategoryAuto='false';
                  if($("#chkAuto1").is(":checked")){
                        flagSubCategoryAuto='true';
                  }
                  if($("#chkAuto2").is(":checked")){
                        flagSubCategoryAuto='true';
                  }
                  if($("#chkAuto3").is(":checked")){
                        flagSubCategoryAuto='true';
                  }
                  if($("#chkAuto4").is(":checked")){
                        flagSubCategoryAuto='true';
                  }
         }
                  
         if($("#chkBenefits").is(":checked")){
              Spec=Spec+'Benefits';
              Spec=Spec+',';
              specarray.push('Benefits');
              flagMainCategoryBenefits='true';
              flagSubCategoryBenefits='false';//12Oct1
                  if($("#chkBenefits1").is(":checked")){
                        flagSubCategoryBenefits='true';
                  }
                  if($("#chkBenefits2").is(":checked")){
                        flagSubCategoryBenefits='true';
                  }
                  if($("#chkBenefits3").is(":checked")){
                        flagSubCategoryBenefits='true';
                  }
                  if($("#chkBenefits4").is(":checked")){
                        flagSubCategoryBenefits='true';
                  }
          }
                    
          if($("#chkBusiness").is(":checked")){
               Spec=Spec+'Business';
               Spec=Spec+',';
               specarray.push('Business');
               flagMainCategoryBusiness='true';
               flagSubCategoryBusiness='false';
                    if($("#chkBusiness1").is(":checked")){
                        flagSubCategoryBusiness='true';
                    }
                    if($("#chkBusiness2").is(":checked")){
                        flagSubCategoryBusiness='true';
                    }
                    if($("#chkBusiness3").is(":checked")){
                        flagSubCategoryBusiness='true';
                    }
                    if($("#chkBusiness4").is(":checked")){
                        flagSubCategoryBusiness='true';
                    }
          }
                    
          if($("#chkLife").is(":checked")){
                Spec=Spec+'Life';
                specarray.push('Life');
                flagMainCategoryLife='true';
                flagSubCategoryLife='false';//12Oct16
                                   
                    if($("#chkLife1").is(":checked")){
                                   flagSubCategoryLife='true';
                    }
                    if($("#chkLife2").is(":checked")){
                                   flagSubCategoryLife='true';
                    }
                    if($("#chkLife3").is(":checked")){
                                   flagSubCategoryLife='true';
                    }
                    if($("#chkLife4").is(":checked")){
                                   flagSubCategoryLife='true';
                    }
           }
                                   
    var lastChar = Spec.slice(-1);
        if (lastChar == ','){
              Spec = Spec.slice(0, -1);
        }
                //    alert(Spec);
    $('#txtspecialities').val(Spec);
                    
/*Code for checking Conditions*/
                  //  alert(flagMainHome+' '+flagMainAuto+' '+flagMainBenefits+' '+flagMainBusiness+' '+flagMainLife);
        if(flagMainCategoryHome=='true'){
            if(flagSubCategoryHome=='false'){
                    jQuery("label[for='lblSpecErrorMsg']").html('Please Select atleast one sub category');
                    $("div#divlblErrorMsg").show();
                    flagMainHome='false';
            }
            else{
                    flagMainHome='true';
            }
        }
       
                                   
        if(flagMainCategoryAuto=='true'){
             if(flagSubCategoryAuto=='false'){
                    jQuery("label[for='lblSpecErrorMsg']").html('Please Select atleast one sub category');
                    $("div#divlblErrorMsg").show();
                    flagMainAuto='false';
            }
            else{
                    flagMainAuto='true';
            }
         }
       
                                   
         if(flagMainCategoryBenefits=='true'){
              if(flagSubCategoryBenefits=='false'){
                    jQuery("label[for='lblSpecErrorMsg']").html('Please Select atleast one sub category');
                    $("div#divlblErrorMsg").show();
                    flagMainBenefits='false';
              }
              else{
                    flagMainBenefits='true';
              }
          }
                    
          if(flagMainCategoryBusiness=='true'){
               if(flagSubCategoryBusiness=='false'){
                    jQuery("label[for='lblSpecErrorMsg']").html('Please Select atleast one sub category');
                    $("div#divlblErrorMsg").show();
                    flagMainBusiness='false';
                }
                else{
                    flagMainBusiness='true';
                }
           }
          
                                   
           if(flagMainCategoryLife=='true'){
                if(flagSubCategoryLife=='false'){
                    jQuery("label[for='lblSpecErrorMsg']").html('Please Select atleast one sub category');
                    $("div#divlblErrorMsg").show();
                    flagMainLife='false';
                }
                else{
                    flagMainLife='true';
                }
            }
          

           //alert(flagMainHome+' '+flagMainAuto+' '+flagMainBenefits+' '+flagMainBusiness+' '+flagMainLife)
                    
            if(flagMainHome=='true' && flagMainAuto=='true' && flagMainBenefits=='true' && flagMainBusiness=='true' && flagMainLife=='true'){
                    $("div#divlblErrorMsg").hide();
                    $('#InfopopupSpecialities').popup('close');
            }
            if(flagMainHome=='true' || flagMainAuto=='true' || flagMainBenefits=='true' || flagMainBusiness=='true' || flagMainLife=='true'){
                    $('#txtspecialities').prop('disabled', false);
            }
        
});
           	 
 
               
setInitialVariable();
               
    var user=sessionStorage.getItem('BrokerUser');
    if(user===null || user==''){
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/brokerLogin.html",{transition: "slide",reverse: false});
    }

    var UserId, EmailId;
    var obj=JSON.parse(user);
    var issuccess = obj.IsSuccess;
    var ErrorMessage=obj.ErrorMessage;
               
    if(issuccess==true){
        var UserDetails=obj.UserDetails;
        var ExperienceDetails=obj.ExperienceDetails;
		var EducationDetails=obj.EducationDetails;
        var htmlhead,experience,Education;
              //  alert(JSON.stringify(UserDetails));
			$.each(UserDetails, function (i, userobj) {
                var pincodevalues='';
                   
				if(userobj.ProfilePictureImg!=''){
					$('#profilePhoto').val(menuFirstname+'_'+menuLastname+'.png');
				}
				else{
					 $.mobile.loading("hide");
				}
				
				UserId=userobj.UserId;
				EmailId=userobj.EmailId;
				
				
				$('#firstname').val(menuFirstname);
				$('#lastname').val(menuLastname);
				$('#phone').val(userobj.PhoneNo);
				$('#email').val(userobj.EmailId);
				$('#email').prop('disabled',true);
				$('#area').val(userobj.City);
                $('#company').val(userobj.CompanyName);
                $('#title').val(userobj.Title);
                $('#editBiodesc').val(userobj.Bio);
                   if(userobj.PinCode!=''){
                    $('#editpincode').val(userobj.PinCode);
                       /* var PincodeArray=userobj.PinCode.split(',');
                        for(var i = 0; i < PincodeArray.length; i++){
                            pincodevalues=PincodeArray[i];
                
                            if($("#editpincode"+PincodeArray[i]).length <=0){
                   
                                if(i==0){
                                    $('#editpincode').val(PincodeArray[i]);
                                }
                                else{
                                    $('#editdivPinDetails').append('<div id="editdivpincode'+editcountPin+'" class="maindivpincode"><div class="col-sm-10 col-xs-10 multiplepin" style=""><input id="editpincode'+editcountPin+'" type="number" value="" data-wrapper-class="ui-custom" placeholder="Zipcode" onkeyup="editPinCode(\'' + editcountPin+ '\')"></div><div class="col-sm-2 col-xs-2 delimagePincode"><img id="editremovePincode" onclick="editremovePincode(\'' + editcountPin+ '\')" src="../images/deleteBtn.png"></div></div>');
                                    $("#editpincode"+editcountPin).textinput();
                                    $("#editpincode"+editcountPin).val(PincodeArray[i]);
                                    editcountPin++;
                                    editglobalPinCount++;
                               }
                            }
                        }*/
                    }
                PreviousZip=userobj.PinCode;
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'address': userobj.PinCode }, function (results, status) {
                     Oldlat = results[0].geometry.location.lat();
                     Oldlng = results[0].geometry.location.lng();
                });
                
				if(userobj.Languages!=''){
                    var Languages = userobj.Languages.split(',');
                        for (var i = 0; i < Languages.length; i++) {
							$("#chkLanguage option:contains(" + Languages[i] + ")").attr('selected', 'selected');
                        }
						$('#chkLanguage').change();
                }

                if(userobj.IndustryId!=''){
                   var Industrylist=sessionStorage.getItem('Industrylist');
                   var obj=JSON.parse(Industrylist);
                   var issuccess = obj.IsSuccess;
                   var ErrorMessage=obj.ErrorMessage;
                   var SubIndustryMasterlist=sessionStorage.getItem('subIndustrylist');
                   var obj1=JSON.parse(SubIndustryMasterlist);
                   var issuccess1 = obj1.IsSuccess;
                   var ErrorMessage1=obj1.ErrorMessage;
                   var SubIndustryMaster=obj1.SubIndustryMaster;
                   var IndustryIdArray=userobj.SubIndustryId.split(';');
                   
                        for(var i = 0; i < IndustryIdArray.length; i++){
                            var Industrysplitnew=IndustryIdArray[i].split(':');
                            var IndustryId=Industrysplitnew[0];
                            var subIndustryIdArray=Industrysplitnew[1];
                            var subIndustryArraynew=subIndustryIdArray.split(',');
                
                            if($("#IndCheck"+IndustryId[i]).length <=0){
                                if(strDevice!="iPad"){
                                    $('#editdivIndustrySICcode').prepend('<div id="IndCheck'+IndustryId[i]+'"><div id="Industry'+editcountInd+'"> <div  class="col-sm-10 col-xs-10 rowalign"><label>Select Industry</label><select data-icon="false" id="IndustryName'+editcountInd+'" name="IndustryName'+editcountInd+'" onchange="FilleditSicCode(\'' + editcountInd+ '\')"  ></select> </div><div class="col-sm-2 col-xs-2 rowalign indDelBtn"><img  id="removeIndustry"  onclick="removeIndustry(\'' + editcountInd+ '\')" src="../images/deleteBtn.png" class="clsDeleteDetails"></div><div id="SICcodeSelect'+editcountInd+'"  class="col-sm-10 col-xs-10 rowalign"><label>Select NAICS code <span style="font-size:12px;">(You can select max. 5 NAICS codes)</span></label><select id="SubIndustryName'+editcountInd+'" multiple="multiple" data-native-menu="false"  onchange="CounteditSicCode(\'' + editcountInd+ '\')"></select> </div></div></div>');
                                }
                                else{
                                    $('#editdivIndustrySICcode').prepend('<div id="IndCheck'+IndustryId[i]+'"><div id="Industry'+editcountInd+'"> <div  class="col-sm-10 col-xs-10 rowalign"><label>Select Industry</label><select data-icon="false" id="IndustryName'+editcountInd+'" name="IndustryName'+editcountInd+'" onchange="FilleditSicCode(\'' + editcountInd+ '\')"  ></select> </div><div class="col-sm-2 col-xs-2 rowalign indDelBtn" ><img  id="removeIndustry"  onclick="removeIndustry(\'' + editcountInd+ '\')" src="../images/deleteBtn.png" class="clsDeleteDetails"></div><div id="SICcodeSelect'+editcountInd+'"  class="col-sm-10 col-xs-10 rowalign"><label>Select NAICS code <span style="font-size:12px;">(You can select max. 5 NAICS codes)</span></label><select id="SubIndustryName'+editcountInd+'" multiple="multiple"  onchange="CounteditSicCode(\'' + editcountInd+ '\')"></select> </div></div></div>');
                   
                                }
                  
                                $('select').selectmenu();
                                var optgrp='<optgroup label=""></optgroup>';
                                $('<option  />', {value: "0", text: "Select"}).appendTo('#IndustryName'+editcountInd);
                                if(strDevice!="iPad"){
                                    $('<option  />', {text: "Select NAICS Code"}).appendTo('#SubIndustryName'+editcountInd);
                                }
                
                                if(subIndustryIdArray.length<=0){
                                    if(strDevice=="iPad"){
                                        $('#SubIndustryName'+editcountInd).append('<option value=0>Select NAICS Code</option>');
                                        $("#SubIndustryName"+editcountInd+" option[value=0]").attr('selected', 'selected');
                                    }
                                }
                                if(issuccess==true){
                                    var industry=obj.IndustryMaster;
                                    $('#IndustryName'+editcountInd).append(optgrp);
                                    $.each(industry, function(i, ind) {
                                           $('<option />', {value: ind.IndustryId, text: ind.IndustryName}).appendTo('#IndustryName'+editcountInd);
                                    });
                                    $("#IndustryName"+editcountInd+" option[value=" + IndustryId + "]").attr('selected', 'selected');
                                    $('#SubIndustryName'+editcountInd).append(optgrp);
                                    $.each(SubIndustryMaster, function(i, IndSubCat) {
                          
                                        if(IndustryId == IndSubCat.IndustryId){
                                            $('<option />', {value: IndSubCat.SubIndustryId, text: IndSubCat.SICCode+ '-'+ IndSubCat.SubIndustryName}).appendTo('#SubIndustryName'+editcountInd);
                                        }
                                    });

                                    for(b=0;b<subIndustryArraynew.length;b++){
                                        $("#SubIndustryName"+editcountInd+" option[value=" + subIndustryArraynew[b] + "]").attr('selected', 'selected');
                                    }
                                    $('select').selectmenu('refresh', true);
                                }
                            $('select').selectmenu('refresh', true);
                            editglobalIndCount++;
                            editcountInd++;
                        }//length
                    }
                }
                   
/***************************************************************************************/
				if(userobj.Specialities!=''){
					$('#txtspecialities').val(userobj.Specialities);
                   
					var UserSpecialities = userobj.Specialities.split(',');
                        for (var i = 0; i < UserSpecialities.length; i++){
                            if(UserSpecialities[i]=='Home'){
                                specarray.push('Home');
                                $("#chkHome").prop( "checked", true ).checkboxradio("refresh");
                                    if(userobj.HomeValue!=''){
                                        $("div#divHome").show();
                                        var HomeValue1 = userobj.HomeValue.split(';');
                   
                                            for (var j = 0; j < HomeValue1.length; j++){
                                                if(HomeValue1[j]=='$500,000 or less'){
                                                    $("#chkHome1").prop( "checked", true ).checkboxradio("refresh");
                                                }
                                                else if(HomeValue1[j]=='$501,000 - $1,000,000'){
                                                    $("#chkHome2").prop( "checked", true ).checkboxradio("refresh");
                                                }
                                                else if(HomeValue1[j]=='More than $1,000,000'){
                                                    $("#chkHome3").prop( "checked", true ).checkboxradio("refresh");
                                                }
                                            }
                                    }
                                    else{
                                        $("div#divHome").hide();
                                    }
                            }
                            else if(UserSpecialities[i]=='Auto'){
                                specarray.push('Auto');
							    $("#chkAuto").prop( "checked", true ).checkboxradio("refresh");
                                    if(userobj.AutoType!=''){
                                        $("div#divAuto").show();
                                        var AutoValue1 = userobj.AutoType.split(';');
                                        for (var j = 0; j < AutoValue1.length; j++){
                                            if(AutoValue1[j]=='Economy'){
                                                $("#chkAuto1").prop( "checked", true ).checkboxradio("refresh");
                                            }
                                            else if(AutoValue1[j]=='Standard'){
                                                $("#chkAuto2").prop( "checked", true ).checkboxradio("refresh");
                                            }
                                            else if(AutoValue1[j]=='Luxury'){
                                                $("#chkAuto3").prop( "checked", true ).checkboxradio("refresh");
                                            }
                                            else if(AutoValue1[j]=='Collectible'){
                                                $("#chkAuto4").prop( "checked", true ).checkboxradio("refresh");
                                            }
                                        }
                                    }
                                    else{
                                        $("div#divAuto").hide();
                                    }
                          }
						  else if(UserSpecialities[i]=='Benefits'){
                              specarray.push('Benefits');
							  $("#chkBenefits").prop( "checked", true ).checkboxradio("refresh");
							  if(userobj.Employees!=''){
								  $("div#divBenefits").show();
								  var BenefitsValue1 = userobj.Employees.split(';');
								  for (var j = 0; j < BenefitsValue1.length; j++) {
									    if(BenefitsValue1[j]=='1-25'){
											 $("#chkBenefits1").prop( "checked", true ).checkboxradio("refresh");
										}
										else if(BenefitsValue1[j]=='26-50'){
											 $("#chkBenefits2").prop( "checked", true ).checkboxradio("refresh");
										}
										else if(BenefitsValue1[j]=='51-100'){
											 $("#chkBenefits3").prop( "checked", true ).checkboxradio("refresh");
										}
										else if(BenefitsValue1[j]=='More than 100'){
											 $("#chkBenefits4").prop( "checked", true ).checkboxradio("refresh");
										}
								  }
							  }
							  else{
								  $("div#divBenefits").hide();
							  }
						  }
						  else if(UserSpecialities[i]=='Business'){
                              specarray.push('Business');
							  $("#chkBusiness").prop( "checked", true ).checkboxradio("refresh");
							  if(userobj.Revenue!=''){
								  $("div#divBusiness").show();
								  var BusinessValue1 = userobj.Revenue.split(';');
								  for (var j = 0; j < BusinessValue1.length; j++){
									    if(BusinessValue1[j]=='Up to $1,000,000'){
											 $("#chkBusiness1").prop( "checked", true ).checkboxradio("refresh");
										}
										else if(BusinessValue1[j]=='$1,000,001 and $5,000,000'){
											 $("#chkBusiness2").prop( "checked", true ).checkboxradio("refresh");
										}
										else if(BusinessValue1[j]=='$5,000,001 and $10,000,000'){
											 $("#chkBusiness3").prop( "checked", true ).checkboxradio("refresh");
										}
										else if(BusinessValue1[j]=='Over $10,000,001'){
											 $("#chkBusiness4").prop( "checked", true ).checkboxradio("refresh");
										}
								  }
							  }
							  else{
								  $("div#divBusiness").hide();
							  }
						  }
						  else if(UserSpecialities[i]=='Life'){
                              specarray.push('Life');
							  $("#chkLife").prop( "checked", true ).checkboxradio("refresh");
							  if(userobj.CoverageAmt!=''){
								  $("div#divLife").show();
								  var LifeValue1 = userobj.CoverageAmt.split(';');
								  for (var j = 0; j < LifeValue1.length; j++) {
									    if(LifeValue1[j]=='$250,000 or less'){
											 $("#chkLife1").prop( "checked", true ).checkboxradio("refresh");
										}
										else if(LifeValue1[j]=='$250,001 to $500,000'){
											 $("#chkLife2").prop( "checked", true ).checkboxradio("refresh");
										}
										else if(LifeValue1[j]=='$500,001 to $1,000,000'){
											 $("#chkLife3").prop( "checked", true ).checkboxradio("refresh");
										}
										else if(LifeValue1[j]=='More than $1,000,000'){
											 $("#chkLife4").prop( "checked", true ).checkboxradio("refresh");
										}
								  }
							  }
							  else{
								  $("div#divLife").hide();
							  }
                        }
                   }
                   if($("#chkHome").is(':checked')&&$("#chkAuto").is(':checked')&&$("#chkBenefits").is(':checked')&&$("#chkBusiness").is(':checked')&&$("#chkLife").is(':checked')&& $("#chkHome1").is(':checked')&&$("#chkHome2").is(':checked')&&$("#chkHome3").is(':checked')&& $("#chkAuto1").is(':checked')&&$("#chkAuto2").is(':checked')&&$("#chkAuto3").is(':checked')&&$("#chkAuto4").is(':checked')&&$("#chkBenefits1").is(':checked')&&$("#chkBenefits2").is(':checked')&&$("#chkBenefits3").is(':checked')&&$("#chkBenefits4").is(':checked')&&$("#chkBusiness1").is(':checked')&&$("#chkBusiness2").is(':checked')&&$("#chkBusiness3").is(':checked')&&$("#chkBusiness4").is(':checked')&&$("#chkLife1").is(':checked')&&$("#chkLife2").is(':checked')&&$("#chkLife3").is(':checked')&&$("#chkLife4").is(':checked')){
                   $("input[type='checkbox']").prop("checked",true).checkboxradio("refresh");
                   $("div#divHome").show();
                   $("div#divAuto").show();
                   $("div#divBenefits").show();
                   $("div#divBusiness").show();
                   $("div#divLife").show();
                   }
                   else {
                   // Code in the case checkbox is NOT checked.
                   }
                   $('#txtspecialities').prop('disabled', false);
					//End of 12Oct2016
                   }
        });

$.each(ExperienceDetails, function (i, expobj) {
       $('#editdivExperience').append('<div id="Experience'+expobj.CompanyId+'"><div id="editexp'+editcountExp+'"> <div  class="col-sm-10 col-xs-10 rowalign">'
            +'<input id="editcompanyName'+editcountExp+'" type="text" value="" data-wrapper-class="ui-custom " placeholder="Company Name" >'
            +'</div>'
            +'<div class="col-sm-2 col-xs-2 rowalign"><img onclick="editremoveExpArray(\'' + editcountExp+ '\',\''+expobj.ExpId+'\')"  id="editremoveExperience" src="../images/deleteBtn.png" class="clsDeleteDetails"></div>'
            +'<div class="col-sm-10 col-xs-10 rowalign mutipletxt"><input type="text" id="editExpCompLogo'+editcountExp+'" value="" data-wrapper-class="ui-custom" placeholder="Company Logo" disabled><img id="priorcompanyimg'+editcountExp+'" onclick="priorcompanyLogoUpload(\'' + editcountExp+ '\')" class="browseimg" src="../images/browse.png" >'
            +'</div>'
            +'<textarea id="txtpriorCompanylogo'+editcountExp+'" style="display:none;"  rows="5" cols="10" ></textarea>'
            +'<input type="hidden" name="ExpId" id="ExpId'+editcountExp+'" value=""><input type="hidden" name="editIsUpdated" id="editIsUpdated'+editcountExp+'" value="false">'
            +'<div class="col-sm-10 col-xs-10 rowalign"><input id="editdesignation'+editcountExp+'" type="text" value="" data-wrapper-class="ui-custom-duration" placeholder="Title"></div>'
            +'<div class="col-sm-4 col-xs-4 rowalign"><input id="editdurationFromExp'+editcountExp+'" type="text" onclick="pickdate(\''+ editcountExp+ '\',\'editdurationFromExp\')" value="" data-wrapper-class="ui-custom " placeholder="Duration from" >'
            +'<input type="hidden" id="fromMonth'+editcountExp+'"/>'
            +'<input type="hidden" id="fromYear'+editcountExp+'"/>'
            +'</div>'
            +'<div class="col-sm-2 col-xs-2 rowalign"></div><div class="col-sm-4 col-xs-4 rowalign durationtoExp"><input id="editdurationToExp'+editcountExp+'" type="text" onclick="pickdate(\''+ editcountExp+ '\',\'editdurationToExp\')" value="" data-wrapper-class="ui-custom-duration" placeholder="Duration to" >'
            +'<input type="hidden" id="toMonth'+editcountExp+'"/>'
            +'<input type="hidden" id="toYear'+editcountExp+'"/>'
            +'</div>'
            +'<div class="col-sm-10 col-xs-10 rowalign"><label id="expmsg'+editcountExp+'" class="experrormsg"></label></div>'
            +'</div>');
       
            if(expobj.DurationFrom !=''){
                var date=expobj.DurationFrom.split('-');
                var month=getmonthid(date[0])
                $('#fromMonth'+editcountExp).val(month);
                $('#fromYear'+editcountExp).val(date[1]);
            }
			
			if(expobj.DurationTo !=''){
				var date=expobj.DurationTo.split('-');
				var month=getmonthid(date[0])
				$('#toMonth'+editcountExp).val(month);
				$('#toYear'+editcountExp).val(date[1]);
			}
            $('input').textinput();
            $('#editdesignation'+editcountExp).val(expobj.Designation);
            $('#editcompanyName'+editcountExp).val(expobj.CompanyName);
            $('#editdurationFromExp'+editcountExp).val(expobj.DurationFrom);
            $('#editdurationToExp'+editcountExp).val(expobj.DurationTo);
            var priorcompanyLogoname='';
            if(expobj.ExpCompLogo!=''){
                if(expobj.CompanyName!=''){
                    priorcompanyLogoname=expobj.CompanyName+' '+editcountExp+'.png';///
                }
                else{
                    priorcompanyLogoname='ExperienceLogo'+editcountExp+'.png';
                    }
            }

            $('#editExpCompLogo'+editcountExp).val(priorcompanyLogoname);
            $('#ExpId'+editcountExp).val(expobj.ExpId);
            editcountExp++;
            editglobalExpCount++;
});

$.each(EducationDetails, function (i, eduobj) {
    if($("#education"+eduobj.EduId).length <=0)
        {
            $('#editdivEducation').append('<div id="education'+eduobj.EduId+'"><div id="editedu'+editcountEdu+'"> <div class="col-sm-10 col-xs-10 rowalign"><input id="edituniversityName'+editcountEdu+'"  type="text" value="" data-wrapper-class="ui-custom" placeholder="School" ></div><div class="col-sm-2 col-xs-2 rowalign"><img id="editremoveEducation"  onclick="editremoveEduArray(\'' + editcountEdu+ '\',\''+eduobj.EduId+'\')" src="../images/deleteBtn.png" class="clsDeleteDetails" ></div><div class="col-sm-10 col-xs-10 rowalign"><input id="editcourseName'+editcountEdu+'" type="text" value="" data-wrapper-class="ui-custom" placeholder="Degree"></div><div class="col-sm-10 col-xs-10 rowalign durationto"><input id="editdurationFromEdu'+editcountEdu+'" type="text" value="" data-wrapper-class="ui-custom-duration" placeholder="Year"></div><div class="col-sm-10 col-xs-10 rowalign mutipletxt"><input id="EduSchoolLogo'+editcountEdu+'" type="text" value="" data-wrapper-class="ui-custom" placeholder="School Logo" disabled><img id="SchoolLogoimg'+editcountEdu+'" onclick="schoolLogoUpload(\'' + editcountEdu+ '\')"  class="browseimg" src="../images/browse.png" ></div><textarea id="txtSchoollogo'+editcountEdu+'" style="display:none;"  rows="5" cols="10" ></textarea><input type="hidden" name="EduId" id="EduId'+editcountEdu+'" value=""><input type="hidden" name="IsUpdated" id="IsUpdated'+editcountEdu+'" value="false"></div></div>');
       
            $("#edituniversityName"+editcountEdu).textinput();
            $("#editcourseName"+editcountEdu).textinput();
            $("#editdurationFromEdu"+editcountEdu).textinput();
            $("#EduSchoolLogo"+editcountEdu).textinput();
            var schoolLogoname='';
            if(eduobj.EducationLogo!=''){
                if(eduobj.UniversityName!='' || eduobj.CourseName!='' || eduobj.DurationFrom!=''){
                         schoolLogoname=eduobj.UniversityName+' '+eduobj.CourseName+' '+eduobj.DurationFrom+' '+editcountEdu+'.png';
                }
                else{
                        schoolLogoname='EducationLogo'+editcountEdu+'.png';
       
                }
            }
            $('#edituniversityName'+editcountEdu).val(eduobj.UniversityName);
            $('#editcourseName'+editcountEdu).val(eduobj.CourseName);
            $('#editdurationFromEdu'+editcountEdu).val(eduobj.DurationFrom);
            $('#EduSchoolLogo'+editcountEdu).val(schoolLogoname);
            $('#EduId'+editcountEdu).val(eduobj.EduId);
       
            editcountEdu++;
            editglobalEduCount++;
        }
});
        $.mobile.loading("hide");
    }
		
    $.mobile.loading("hide");

$('#profilepicprofile').attr("src",menuProfilepic);
getMenuDetailsBrokkrr(menuFirstname,menuLastname,menuProfilepic);
	
var html = '';
               
$('#editaddEducation').off("click").on("click", function() {
    if(editglobalEduCount<=5){
		$('#editdivEducation').prepend('<div id="editedu'+editcountEdu+'"> <div class="col-sm-10 col-xs-10 rowalign"><input id="edituniversityName'+editcountEdu+'"  type="text" value="" data-wrapper-class="ui-custom" placeholder="School" ></div><div class="col-sm-2 col-xs-2 rowalign"><img id="editremoveEducation"  onclick="editremoveEdu(\'' + editcountEdu+ '\')" src="../images/deleteBtn.png" class="clsDeleteDetails"></div><div class="col-sm-10 col-xs-10 rowalign"><input id="editcourseName'+editcountEdu+'" type="text" value="" data-wrapper-class="ui-custom" placeholder="Degree"><input id="editdurationFromEdu'+editcountEdu+'" type="text" value="" data-wrapper-class="ui-custom-duration" placeholder="Year"></div><div class="col-sm-10 col-xs-10 rowalign mutipletxt"><input id="EduSchoolLogo'+editcountEdu+'" type="text" value="" data-wrapper-class="ui-custom" placeholder="School Logo" disabled><img id="SchoolLogoimg'+editcountEdu+'" onclick="schoolLogoUpload(\'' + editcountEdu+ '\')"  class="browseimg" src="../images/browse.png" ></div><textarea id="txtSchoollogo'+editcountEdu+'" style="display:none;"  rows="5" cols="10" ></textarea><input type="hidden" name="EduId" id="EduId'+editcountEdu+'" value=""><input type="hidden" name="IsUpdated" id="IsUpdated'+editcountEdu+'" value="false"></div>');
		$("#edituniversityName"+editcountEdu).textinput();
		$("#editcourseName"+editcountEdu).textinput();
		$("#editdurationFromEdu"+editcountEdu).textinput();
        $("#EduSchoolLogo"+editcountEdu).textinput(); //3nov
                                           
		editcountEdu++;
		editglobalEduCount++;
    }
    else{
        jQuery("label[for='messagetext']").html('Sorry! Education details record entry exceed its limit.');
        $('#InfopopupEditBrokerProfile').popup('open');
	}
});
	
$('#editaddExperience').off("click").on("click", function() {
	if(editglobalExpCount<=7){
		$('#editdivExperience').prepend('<div id="editexp'+editcountExp+'"> <div  class="col-sm-10 col-xs-10 rowalign">'
            +'<input id="editcompanyName'+editcountExp+'" type="text" value="" data-wrapper-class="ui-custom " placeholder="Company Name" >'
            +'</div>'
            +'<div class="col-sm-2 col-xs-2 rowalign"><img  id="editremoveExperience"  onclick="editremoveExp(\'' + editcountExp+ '\')" src="../images/deleteBtn.png" class="clsDeleteDetails">'
            +'</div>'
            +'<div class="col-sm-10 col-xs-10 rowalign mutipletxt"><input type="text" id="editExpCompLogo'+editcountExp+'"  value="" data-wrapper-class="ui-custom" placeholder="Company Logo" disabled><img id="priorcompanyimg'+editcountExp+'" onclick="priorcompanyLogoUpload(\'' + editcountExp+ '\')" class="browseimg" src="../images/browse.png" ></div>'
            +'<textarea id="txtpriorCompanylogo'+editcountExp+'" style="display:none;"  rows="5" cols="10" ></textarea>'
            +'<input type="hidden" name="ExpId" id="ExpId'+editcountExp+'" value=""><input type="hidden" name="editIsUpdated" id="editIsUpdated'+editcountExp+'" value="false">'
            +'<div class="col-sm-10 col-xs-10 rowalign"><input id="editdesignation'+editcountExp+'" type="text" value="" data-wrapper-class="ui-custom-duration" placeholder="Title"></div>'
            +'<div class="col-sm-4 col-xs-4 rowalign"><input id="editdurationFromExp'+editcountExp+'" onclick="pickdate(\''+ editcountExp+ '\',\'editdurationFromExp\')" type="text" value="" data-wrapper-class="ui-custom" placeholder="Duration from" >'
				+'<input type="hidden" id="fromMonth'+editcountExp+'"/>'
				+'<input type="hidden" id="fromYear'+editcountExp+'"/>'
				+'</div>'
				+'<div class="col-sm-2 col-xs-2 rowalign"></div><div class="col-sm-4 col-xs-4 rowalign durationtoExp"><input id="editdurationToExp'+editcountExp+'" type="text" onclick="pickdate(\''+ editcountExp+ '\',\'editdurationToExp\')" value="" data-wrapper-class="ui-custom-duration" placeholder="Duration to" >'
				+'<input type="hidden" id="toMonth'+editcountExp+'"/>'
				+'<input type="hidden" id="toYear'+editcountExp+'"/>'
				+'</div>'
				+'<div class="col-sm-10 col-xs-10 rowalign"><label id="expmsg'+editcountExp+'" class="experrormsg"></label></div></div>');
		$('input').textinput();
		editcountExp++;
		editglobalExpCount++;	
    }
	else{
		jQuery("label[for='messagetext']").html('Sorry! Experience details record entry exceed its limit.');
    	$('#InfopopupEditBrokerProfile').popup('open');
    }
});
               
$('#profilePhotoimg').on("click", function (){
    $('#ConfirmPictureInfopopup').popup('open');
});

var img = "";
$('#OpenGallery').on("click", function () {
    $('#ConfirmPictureInfopopup').popup('close');
        getImages("profilepicprofile","txtprofilepic","InfopopupEditBrokerProfile");
        
});

/*Open Camera*/

$('#OpenCamera').on("click", function () {
    $('#ConfirmPictureInfopopup').popup('close');
        getImagescamera("profilepicprofile","txtprofilepic","InfopopupEditBrokerProfile");
});


               
var img = "";
$('#CompanyLogoimg').on("click", function () {
    getImages("CompanyLogo","txtcompanylogo","Infopopup");
});
               
               

 
$("#editBiodesc").keyup(function() {
    var input = $(this);
    var text = input.val().replace(/[^a-zA-Z0-9-?@&!$%*().,_\s]/g, "");
    if(/|/.test(text)) {
        text = text.replace(/|/g, "");
    }
    input.val(text);
});

$('#BrokerSignupNextBtn').off("click").on("click", function() {
    $.mobile.loading("show");
	var firstnameid = $('#firstname');
	var phoneid = $('#phone');
	var emailid = $('#email');
	var addressid = $('#area');
	var zipid = $('#editpincode');
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
		if (GlobalValidatePinForLength(editcountPin) & globalvalidaterequired2(zipid) & globalvalidaterequired2(firstnameid) & globalvalidaterequired2(phoneid)& globalvalidaterequired2(emailid)& globalvalidaterequired2(addressid)){
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
     var eduarray = [];
     var industryarray = [];
     var selectedindustry=[];
     var industryID="";
     var SubIndustrydata='';
     var industrydata='';
     var pinarray="";
                                          
	 for(i=1;i<=editcountExp;i++)
	 {
		 $('#expmsg'+i).text('');
			
			if($('#editdurationFromExp'+ i).val() !=""){
                if($('#editdurationToExp'+ i).val() ==""){
					expvalid=false;
					$('#expmsg'+i).text('Please select to date');														
				}
			}
                                          
            if($("#editexp" + i).length > 0) {
               var obj = {
                            ExpId:$('#ExpId'+i).val(),
				    		UserId: UserId,
				        	Designation:$('#editdesignation'+i).val(),
				        	CompanyName: $('#editcompanyName'+i).val(),
				        	DurationFrom: $('#editdurationFromExp'+i).val(),
				        	DurationTo: $('#editdurationToExp'+i).val(),
                            Bio:"",
                            IsUpdated:$('#editIsUpdated'+i).val(),
                            ExpCompLogo: $('#txtpriorCompanylogo'+i).val()
				    };
			 exparray.push(obj);
                                          
            }
     }
                                         
	 if(expvalid ==false){
            $('div').animate({scrollTop: 0});
			$.mobile.loading("hide");
			jQuery("label[for='messagetext']").html("Please validate details.");
			$('#InfopopupEditBrokerProfile').popup('open');
			return false;
		}
                                
	 
	 for(i=1;i<=editcountEdu;i++)
	 {
		 if($("#editedu" + i).length > 0) {
				    var obj = {
                            EduId:$('#EduId'+i).val(),
				    		UserId: UserId,
				    		UniversityName: $('#edituniversityName'+i).val(),
				    		CourseName: $('#editcourseName'+i).val(),
				    		DurationFrom: $('#editdurationFromEdu'+i).val(),
				    		DurationTo: "",
                            IsUpdated:$('#IsUpdated'+i).val(),
                            EducationLogo:$('#txtSchoollogo'+i).val()
				    };
			 eduarray.push(obj);
		 }
	}
//   alert("eduarray::"+JSON.stringify(eduarray));
    
    if($('#editpincode').val()!=""){
         pinarray=$('#editpincode').val();
    }
    
    for(i=1;i<editcountPin;i++){
                                          
        var existlen=$("#pincode" + i).length;
        if(existlen>0){
            var len=$("#pincode" + i).val().length;
            if(parseInt(len) > 0) {
                pinarray+=','+ $('#pincode'+i).val();
            }
        }
    }
 
    for(i=1;i<=editcountInd;i++){
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
                var selectedsubindustrylen=selectedsubindustry.length;
                if(selectedsubindustry==""){
                     $.mobile.loading("hide");
                     jQuery("label[for='messagetext']").html("Please select NAICS code.");
                     $('#InfopopupEditBrokerProfile').popup('open');
                     return false;
                }
                if(selectedsubindustrylen>5){
                    $.mobile.loading("hide");
                    jQuery("label[for='messagetext']").html("Select max. 5 NAICS code.");
                    $('#InfopopupEditBrokerProfile').popup('open');
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
                                          
$('#chkLanguage option:selected').each(function(){
    Languages=Languages+$(this).text()+',';
});
    Languages=Languages.substring(0, Languages.length - 1);
    Specialities=$('#txtspecialities').val();

   if(Specialities!=''){
        $('#txtspecialities').prop('disabled', false);
    }
    var speciality=Specialities.split(',');
                                          
                                        
  	if(parseInt(speciality.length) >0){
        HomeDetails="";
        AutoDetails="";
        BenefitsDetails="";
        BusinessDetails="";
        LifeDetails="";
                                         
                                         
        for(i=0; i<=speciality.length;i++){
            if(speciality[i]=='Home'){
				if($("#chkHome1").is(":checked")){
					 HomeDetails=HomeDetails+$("#chkHome1").val();
					 HomeDetails=HomeDetails+';';
				 }
				 if($("#chkHome2").is(":checked")){
					 HomeDetails=HomeDetails+$("#chkHome2").val();
					 HomeDetails=HomeDetails+';';
				 }
				 if($("#chkHome3").is(":checked")){
					 HomeDetails=HomeDetails+$("#chkHome3").val();
					 HomeDetails=HomeDetails+';';
				 }
				 
			 }
			 
			 if(speciality[i]=='Auto'){
				 if($("#chkAuto1").is(":checked")){
					 AutoDetails=AutoDetails+$("#chkAuto1").val();
					 AutoDetails=AutoDetails+';';
				 }
				 if($("#chkAuto2").is(":checked")){
					 AutoDetails=AutoDetails+$("#chkAuto2").val();
					 AutoDetails=AutoDetails+';';
				 }
				 if($("#chkAuto3").is(":checked")){
					 AutoDetails=AutoDetails+$("#chkAuto3").val();
					 AutoDetails=AutoDetails+';';
				 }
				 if($("#chkAuto4").is(":checked")){
					 AutoDetails=AutoDetails+$("#chkAuto4").val();
					 AutoDetails=AutoDetails+';';
				 }
			 }
			 
			 if(speciality[i]=='Benefits'){
				 if($("#chkBenefits1").is(":checked")){
					 BenefitsDetails=BenefitsDetails+$("#chkBenefits1").val();
					 BenefitsDetails=BenefitsDetails+';';
				 }
				 if($("#chkBenefits2").is(":checked")){
					 BenefitsDetails=BenefitsDetails+$("#chkBenefits2").val();
					 BenefitsDetails=BenefitsDetails+';';
				 }
				 if($("#chkBenefits3").is(":checked")){
					 BenefitsDetails=BenefitsDetails+$("#chkBenefits3").val();
					 BenefitsDetails=BenefitsDetails+';';
				 }
				 if($("#chkBenefits4").is(":checked")){
					 BenefitsDetails=BenefitsDetails+$("#chkBenefits4").val();
					 BenefitsDetails=BenefitsDetails+';';
				 }
			 }
			 
			 if(speciality[i]=='Business'){
				 if($("#chkBusiness1").is(":checked")){
					 BusinessDetails=BusinessDetails+$("#chkBusiness1").val();
					 BusinessDetails=BusinessDetails+';';
				 }
				 if($("#chkBusiness2").is(":checked")){
					 BusinessDetails=BusinessDetails+$("#chkBusiness2").val();
					 BusinessDetails=BusinessDetails+';';
				 }
				 if($("#chkBusiness3").is(":checked")){
					 BusinessDetails=BusinessDetails+$("#chkBusiness3").val();
					 BusinessDetails=BusinessDetails+';';
				 }
				 if($("#chkBusiness4").is(":checked")){
					 BusinessDetails=BusinessDetails+$("#chkBusiness4").val();
					 BusinessDetails=BusinessDetails+';';
				 }
			 }
			 
			 if(speciality[i]=='Life'){
				 if($("#chkLife1").is(":checked")){
					 LifeDetails=LifeDetails+$("#chkLife1").val();
					 LifeDetails=LifeDetails+';';
				 }
				 if($("#chkLife2").is(":checked")){
					 LifeDetails=LifeDetails+$("#chkLife2").val();
					 LifeDetails=LifeDetails+';';
				 }
				 if($("#chkLife3").is(":checked")){
					 LifeDetails=LifeDetails+$("#chkLife3").val();
					 LifeDetails=LifeDetails+';';
				 }
				 if($("#chkLife4").is(":checked")){
					 LifeDetails=LifeDetails+$("#chkLife4").val();
					 LifeDetails=LifeDetails+';';
				 }
			 }
		 }

		 if(HomeDetails!=''){
			 var RHome = HomeDetails.slice(-1);
			 if (RHome == ';'){
				 HomeDetails = HomeDetails.slice(0, -1);
			 }
		 }
	     
		 if(AutoDetails!=''){
			 var RAuto = AutoDetails.slice(-1);
			 if (RAuto == ';'){
				 AutoDetails = AutoDetails.slice(0, -1);
			 }
		 }
	     
		 if(BenefitsDetails!=''){
			 var RBenefits = BenefitsDetails.slice(-1);
			 if (RBenefits == ';'){
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
	     
	     if(LifeDetails!=''){
	    	var RLife = LifeDetails.slice(-1);
	    	if (RLife == ';'){
	    		LifeDetails = LifeDetails.slice(0, -1);
	    	}
		 }
	 }

    if(lng==='' || lat===''){
        lng=Oldlng;
        lat=Oldlat;
        Zip=PreviousZip;
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
		                   "PinCode":$('#editpincode').val(),
                        // "PinCode":NewZip,
                        // "PinCode":pinarray,
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
                           "Bio":$('#editBiodesc').val()
		                }
		             ],
                           "ExperienceDetails":exparray,
		                   "EducationDetails":eduarray
		          };
	 
	// alert(JSON.stringify(Result));
var profileFlag=sessionStorage.getItem('BrokerProfilephotoupdated');
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
        if(issuccess==true){
			$.mobile.loading("hide");
            var UserDetails=obj.UserDetails;
            $.each(UserDetails, function (i, res) {
                var name=res.FirstName+' '+res.LastName;
                sessionStorage.setItem('BrokerUser',data);
                localStorage.setItem('BrokerUser',data);
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/profileBroker.html",{transition: "slide",reverse: false});
            });
        }
        else if(issuccess==false){
            $.mobile.loading("hide"); //1.4.5
            jQuery("label[for='messagetext']").html("Error Occured,Please try again.");
            $('#InfopopupEditBrokerProfile').popup('open');
        }
        else{
            $.mobile.loading("hide"); //1.4.5
            jQuery("label[for='messagetext']").html("Error Occured,Please try again.");
            $('#InfopopupEditBrokerProfile').popup('open');
        }

    },
    error : function(XMLHttpRequest, textStatus, errorThrown) {
        if(errorThrown!=""){
            $.mobile.loading("hide"); //1.4.5
            jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
            $('#InfopopupEditBrokerProfile').popup('open');
        }
        else{
        }
    }
});
                                          
    }//VALIDATE
	else
    {
        //$("body").scrollTop(0);
        $('div').animate({scrollTop: 0});
    	$.mobile.loading("hide"); //1.4.5
    	jQuery("label[for='messagetext']").html("Please validate details.");
    	$('#InfopopupEditBrokerProfile').popup('open');
    	
    }
	
});//SUBMIT

$('#OkbtnEditBrokerProfile').off("click").on("click", function() {
	$('#InfopopupEditBrokerProfile').popup('close');
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
                                        heightpoppup=$("#InfopopupSpecialities").height();
                                        popupfix(hbcontent,heightpoppup);
                                        }
                                        });
                        
$("input[type='checkbox']").click(function() {
    if(CheckForAllCheckbox()){
        $('#chkSelectAll').prop('checked', true).checkboxradio('refresh');
    }
   else{
        $('#chkSelectAll').prop('checked', false).checkboxradio('refresh');
    }
});
               
$("#InfopopupSpecialities").popup({
     beforeposition: function () {
                                  heightpoppup=$("#InfopopupSpecialities").height();
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

$("#InfopopupSpecialities").popup({
     afteropen: function () {
                                  
                                  
                                  $('#chkHome').click(function() {
                                                      
                                                      
                                                      if (!$(this).is(':checked')) {
                                                      $('#chkHome1').prop('checked', false).checkboxradio('refresh');
                                                      $('#chkHome2').prop('checked', false).checkboxradio('refresh');
                                                      $('#chkHome3').prop('checked', false).checkboxradio('refresh');
                                                      $("div#divHome").hide();
                                                      $("div#divlblErrorMsg").hide();
                                                      
                                                      }
                                                      else{
                                                      $("div#divHome").show();
                                                      $("div#divlblErrorMsg").hide();
                                                      heightpoppup=$("#InfopopupSpecialities").height();
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
                                                      else{
                                                      $("div#divAuto").show();
                                                      $("div#divlblErrorMsg").hide();
                                                      heightpoppup=$("#InfopopupSpecialities").height();
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
                                                          else{
                                                          $("div#divBenefits").show();
                                                          $("div#divlblErrorMsg").hide();
                                                          heightpoppup=$("#InfopopupSpecialities").height();
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
                                                          else{
                                                          $("div#divBusiness").show();
                                                          $("div#divlblErrorMsg").hide();
                                                          heightpoppup=$("#InfopopupSpecialities").height();
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
                                                      else{
                                                      $("div#divLife").show();
                                                      $("div#divlblErrorMsg").hide();
                                                      heightpoppup=$("#InfopopupSpecialities").height();
                                                      popupfix(hbcontent,heightpoppup);
                                                      }
                                                      });
                                  
                                 
       
         
        /*
          if((editglobalEduCount<2)&&(strDevice!="iPad")){
                $(".keyboard").css("height", "470");// The height of your keyboard 360
          }
          if((editglobalEduCount<2)&&(strDevice=="iPad")){
                 $(".keyboard").css("height", "330");// The height of your keyboard 220
                             //     $(".keyboard").css("height", window.innerHeight);// The height of your keyboard
          }
      */
     }
});
               
$("#InfopopupSpecialities").popup({
      afterclose: function () {
     
       }//afterclose end
});//popup afterclose end


});//PAGE SHOW END

function CheckForAllCheckbox()
{
    if($("#chkHome").is(':checked')&& $("#chkAuto").is(':checked')&& $("#chkBenefits").is(':checked')&& $("#chkBusiness").is(':checked')&& $("#chkLife").is(':checked')&& $("#chkHome1").is(':checked')&& $("#chkHome2").is(':checked')&& $("#chkHome3").is(':checked')&& $("#chkAuto1").is(':checked')&& $("#chkAuto2").is(':checked')&& $("#chkAuto3").is(':checked')&& $("#chkAuto4").is(':checked')&& $("#chkBenefits1").is(':checked')&& $("#chkBenefits2").is(':checked')&& $("#chkBenefits3").is(':checked')&& $("#chkBenefits4").is(':checked')&& $("#chkBusiness1").is(':checked')&& $("#chkBusiness2").is(':checked')&& $("#chkBusiness3").is(':checked')&& $("#chkBusiness4").is(':checked')&& $("#chkLife1").is(':checked')&& $("#chkLife2").is(':checked')&& $("#chkLife3").is(':checked')&& $("#chkLife4").is(':checked'))
    {
        return true
    }
    else
    {
        return false;
    }
    
}

function schoolLogoUpload(editcountEdu)
{
    var imageid='EduSchoolLogo'+' '+editcountEdu;
    var txtimageid='txtSchoollogo'+editcountEdu;
    var popupid='InfopopupEditBrokerProfile';
    getImages(imageid,txtimageid,popupid);
  
}

function priorcompanyLogoUpload(editcountExp)
{
    var imageid='editExpCompLogo'+' '+editcountExp;
    var txtimageid='txtpriorCompanylogo'+editcountExp;
    var popupid='InfopopupEditBrokerProfile';
    getImages(imageid,txtimageid,popupid);
    
    
}

function editremoveEduArray(countEdu,EduId){
    DeletedEduList.push(parseInt(EduId));
    $('#editedu'+countEdu).remove();
    editglobalEduCount--;
}
function editremoveExpArray(countExp,ExpId){
    DeletedExpList.push(parseInt(ExpId));
    $('#editexp'+countExp).remove();
    editglobalExpCount--;
}

function CounteditSicCode(Count)
{

if(strDevice=="iPad"){
    var greaterthanfive=false;
    var count=0;
    var selectedcount = $("#SubIndustryName"+Count).find(":selected").length;
    if(selectedcount <=0)
    {
        $("#SubIndustryName"+Count+" option[value=0]").remove();
        $('#SubIndustryName'+Count).prepend('<option value=0>Select NAICS Code</option>');
        $("#SubIndustryName"+Count+" option[value=0]").attr('selected', 'selected');
    }
    
    $('#SubIndustryName'+Count+' :selected').each(function(){
         if(count <5){
             if(parseInt($(this).val()) >0){
                  count++;
                  $("#SubIndustryName"+Count+" option[value=0]").remove();
             }
         }
         else{
              greaterthanfive=true;
         }
    });
}
    
}

function FilleditSicCode(Count)
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
    else{
            $('#SubIndustryName'+Count).empty();
            $('<option  />', {text: "Select NAICS Code"}).appendTo('#SubIndustryName'+Count);
            var ddSiccode=$('#SubIndustryName'+Count);
            var ddIndustryName=$("#IndustryName"+Count);
            $('#SICcodeSelect'+Count).hide();
            $('select').selectmenu('refresh', true);
    }
		  
    $('select').selectmenu('refresh', true);
}

function editPinCode(Count)
{
    var max_chars=5;
    var pincodevalue=$('#editpincode'+Count).val();
    if ($('#editpincode'+Count).val().length >= max_chars) {
        $('#editpincode'+Count).val($('#editpincode'+Count).val().substr(0, max_chars));
    }
}

function pickdate(count,id)
{
	$('#txtSelectedTextBoxId').val(id);
	$('#txtSelectedTextBoxCount').val(count);
	$('#fromToDate').popup('open');
	selcetmonth();
	selcetyear();
}

function SetDuration()
{
	var month='',year='',selectedtxt='';
	month=$('#selectedmonth').val();
	year=$('#selectedyear').val();
	
	var id,count;
	id=$('#txtSelectedTextBoxId').val();
	count=$('#txtSelectedTextBoxCount').val();
	selectedtxt=id+count;
	$('#expmsg'+count).text('');
	
	if(month!='' && year!='')
		{
		var montharray=month.split('_');
		if(id=="editdurationToExp")
			{
			$('#toMonth'+count).val(montharray[1]);
			$('#toYear'+count).val(year);
				if($("#editdurationFromExp"+count).val() !='')
					{
						var frommonth='',fromyear='',tomonth='',toyear='';
						frommonth=$('#fromMonth'+count).val();
						fromyear=$('#fromYear'+count).val()
						
						tomonth=$('#toMonth'+count).val();
						toyear=$('#toYear'+count).val();
						
						if(parseInt(toyear) >=parseInt(fromyear))
						{
							if(parseInt(toyear) ==parseInt(fromyear))
							{
								if(parseInt(tomonth)>=parseInt(frommonth))
									{
									$('#'+selectedtxt).val(montharray[0]+'-'+year);
									$('.month').removeClass('activemonth');
									$('.year').removeClass('activeyear');
									$('#fromToDate').popup('close');
									}
								else
									{
									$('#'+selectedtxt).val('');
									$('#expmsg'+count).text("Your to date can't be earlier than your from date.");
									$('#fromToDate').popup('close');
									}
							}
							else
							{
								$('#'+selectedtxt).val(montharray[0]+'-'+year);
								$('.month').removeClass('activemonth');
								$('.year').removeClass('activeyear');
								$('#fromToDate').popup('close');
							}
							
						}
						else
						{
							$('#'+selectedtxt).val('');
							$('#expmsg'+count).text("Your to date can't be earlier than your from date.");
							$('#fromToDate').popup('close');
						}
					

					}
				else
					{
						$('#expmsg'+count).text('Please select from date.');
						$('#fromToDate').popup('close');
					}
			}
		else
			{
			$('#fromMonth'+count).val(montharray[1]);
			$('#fromYear'+count).val(year);
			
			if($("#editdurationToExp"+count).val() !='')
			{
				var frommonth='',fromyear='',tomonth='',toyear='';
				frommonth=$('#fromMonth'+count).val();
				fromyear=$('#fromYear'+count).val()
				
				tomonth=$('#toMonth'+count).val();
				toyear=$('#toYear'+count).val();
				
				if(parseInt(toyear) >=parseInt(fromyear))
				{
					if(parseInt(toyear) ==parseInt(fromyear))
					{
						if(parseInt(tomonth)>=parseInt(frommonth))
							{
								$('#'+selectedtxt).val(montharray[0]+'-'+year);
								$('.month').removeClass('activemonth');
								$('.year').removeClass('activeyear');
								$('#fromToDate').popup('close');
							}
						else
							{
							$("#editdurationToExp"+count).val('');
							$('#'+selectedtxt).val(montharray[0]+'-'+year);
							$('.month').removeClass('activemonth');
							$('.year').removeClass('activeyear');
							$('#expmsg'+count).text("Your to date can't be earlier than your from date.");
							$('#fromToDate').popup('close');
							}
					}
					else
					{
						$('#'+selectedtxt).val(montharray[0]+'-'+year);
						$('.month').removeClass('activemonth');
						$('.year').removeClass('activeyear');
						$('#fromToDate').popup('close');
					}
					
				}
				else
				{
					$("#editdurationToExp"+count).val('');
					$('#'+selectedtxt).val(montharray[0]+'-'+year);
					$('.month').removeClass('activemonth');
					$('.year').removeClass('activeyear');
					$('#expmsg'+count).text("Your to date can't be earlier than your from date.");
					$('#fromToDate').popup('close');
				}
			

			}
			else
				{
					$('#'+selectedtxt).val(montharray[0]+'-'+year);
					$('.month').removeClass('activemonth');
					$('.year').removeClass('activeyear');
					$('#fromToDate').popup('close');
				}
			}
			
		}
	}


function getmonthid(month)
{
	switch(month) {
    case "Jan":
        return "1";
        break;
    case "Feb":
    	return "2";
        break;
    case "Mar":
    	return "3";
        break;
    case "April":
    	return "4";
        break;
    case "May":
    	return "5";
        break;
    case "June":
    	return "6";
        break;
    case "July":
    	return "7";
        break;
    case "Aug":
    	return "8";
        break;
    case "Sept":
    	return "9";
        break;
    case "Oct":
    	return "10";
        break;
    case "Nov":
    	return "11";
        break;
    case "Dec":
    	return "12";
        break;
    default:
    	return "0";
} 
}

function Cancel()
{
    $('.month').removeClass('activemonth');
    $('.year').removeClass('activeyear');
    $('#fromToDate').popup('close');
}

function selcetmonth()
{
    var element_width = 50;
    var pos=$('#monthcontent').offset().top - $('#monthtop').offset().top;
    var positive =  Math.abs(pos)
    var divided = positive / element_width;
    var round = Math.round(divided);
    var current_element = $('#monthcontent').children().eq(round);
    var id = current_element.attr('id');
    
    if(id != prv_Month){
        prv_Month = id;
        $('.month').removeClass("active");
        $('#'+id).addClass("active");
        $('#selectedmonth').val(id);
    }
}


function selcetyear()
{
    var element_width = 50;
    var pos=$('#yearcontent').offset().top - $('#yeartop').offset().top;
    var positive =  Math.abs(pos)
    var divided = positive / element_width;
    var round = Math.round(divided);
    var current_element = $('#yearcontent').children().eq(round);
    var id = current_element.attr('id');
    
    if(id != prv_Year){
        prv_Year = id;
        $('.year').removeClass("active");
        $('#'+id).addClass("active");
        $('#selectedyear').val(id);
    }
}


