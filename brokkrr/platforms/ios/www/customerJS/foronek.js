
$(document).on("pageshow","#foronek_page,#bforonek_page", function( event ) {
               CheckDeviceId(useridCust);
changeimg('cmplogo',RegisteredFor);
changefooterlogo('footerlogo',RegisteredFor);
              
    var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
               hbcontent=hbcontent-15;
               }else{
                hbcontent=stopPageOverflow(hbcontent);             
               }
    $('.ui-content').css('height',hbcontent);
		
	var max_chars = 5;
	$('#zipcode').keyup( function(e){
		//alert('called');
	    if ($(this).val().length >= max_chars) { 
	        $(this).val($(this).val().substr(0, max_chars));
	    }
	    if ($(this).val().length>=5)
	    {
	    	var zip=$(this).val();
	    	localCity=getCityZipcode(zip);
			$('#txtcity').val(localCity);
			
	    }
	    else
	    {
	    	$('#txtcity').val('');
	    	$('#txtlat').val('');
	        $('#txtlang').val('');
	    }
	});

	 var user=sessionStorage.getItem('CustomerUser');
	    if(user===null || user=='')
		{
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
			
		}
		
	    var UserId, EmailId;
	    
	    var obj=JSON.parse(user);
		var issuccess = obj.IsSuccess;
		var ErrorMessage=obj.ErrorMessage;
		if(issuccess==true)
			{
			var UserDetails=obj.UserDetails;
			$.each(UserDetails, function (i, userobj) {
				
				UserId=userobj.UserId;
				EmailId=userobj.EmailId;
				ZipCode=userobj.PinCode;
				
				if(ZipCode!='')
				{
					$('#zipcode').val(ZipCode);
					$('#zipcode').keyup();
				}
				getMenuDetailsCustomer(menuCustFirstname,menuCustLastname,menuCustProfilepic);
			});
		}
		else
		{
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
		}
               var DocName='';
               var DeclarationDoc='';
             
               
        /*       $('#fileInput').on('change', function () {
                $('#errordiv').text("");
                    var fileobj=$('#fileInput').prop('files')[0];
                    var filename=$('#fileInput').prop('files')[0].name;
                    var filetype=$('#fileInput').prop('files')[0].type;
                    var filesize=$('#fileInput').prop('files')[0].size;
                    DocName=filename;
                                  var imageinkb= filesize/1024;
                                  var imageinmb = (Math.round((imageinkb / 1024) * 100) / 100);
                                  var extension=filename.split(".");
                                  var ext=extension[1];
                                  if(ext=="doc"||ext=="docx"||ext=="pdf"||ext=="png"||ext=="jpg"||ext=="jpeg"||ext =="gif"){
                                  if(parseFloat(imageinmb) <= 4){
                                  var fileReader = new FileReader();
                                  fileReader.onload = function () {
                                  var data = fileReader.result;  // data <-- in this var you have the file data in Base64 format
                                  
                                  var fileconvert=data.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "").replace(/^data:;base64,/, "").replace(/^data:text\/html;base64,/, "").replace(/^data:text\/plain;base64,/, "").replace(/^data:application\/pdf;base64,/, "").replace(/^data:application\/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,/, "").replace(/^data:application\/msword;base64,/, "");
                                  $('#getfileconversion').val(fileconvert);
                                  };
                                  fileReader.readAsDataURL(fileobj);
                                  }
                                  else{
                                  //alert("file size cannot be greater than 4 mb");
                                  
                                  }
                                  
                                  }
                                  else{
                                  $('#fileInput').val('');
                                  $('#getfileconversion').val('');
                                  $('#errordiv').text("File format not supported");
                                  //alert("File format not supported");
                                  }
                    
                                  
                });*/

	$('#saveLine').off("click").on("click", function() {	
        
	    $.mobile.loading("show");
	    
		var zipid = $('#zipcode');
		var cityid = $('#txtcity');
	
		zipid.keyup(validatezip);

		function validatezip()
	 	{
			
	 		 if (globalvalidaterequired3(zipid,"errorzip") & globalvalidaterequired3(cityid,"errorcity")){
	 	        	return true;
	 	       }
	 	        else{
	 	        	return false;
	 	       	}
	 	}
	
		
	 	function validateFields(){
	 		
	 		if (globalvalidaterequired3(zipid,"errorzip") & globalvalidaterequired3(cityid,"errorcity"))
	 		{
	         	return true;
	        }
	        else
	        {
	        	
	         	return false;
	        }
	 	} 	
	 	 if(validateFields())
		 {	 
                                            
	 		var ZipCode=$('#zipcode').val();
	 		var City=$('#txtcity').val();
	 	//	var NoOfEmployees=$('#NoofEmployees').val();//$("#Noofemployee option:selected").text();
	 		var cntplan=$("#ddlcntplan option:selected").text();
           
            if(cntplan=="Select"){
                cntplan="";
            }
            var plansize=$("#ddlplansize option:selected").text();
                                   
            if(plansize=="Select"){
                plansize="";
            }
            var NoOfEmployees=$("#NoofEmployees option:selected").text();
                                   
            if(NoOfEmployees=="Select"){
                NoOfEmployees="";
            }
        
	 		var Latitude=$('#txtlat').val();
	 		var Longitude=$('#txtlang').val();

            DeclarationDoc=$('#getfileconversion').val();
            DocName= $('#fileInput').val();
                                   
	 		$.ajax({
				type: "POST",
				url: webserviceURL,
                   data: {UserId:UserId,ZipCode:ZipCode,City:City,NoOfEmp:NoOfEmployees,DeclarationDoc:DeclarationDoc,DocName:DocName,PlanSize:plansize,CurrentPlan:cntplan,Longitude:Longitude,Latitude:Latitude,ActionName:"DoSave401kInsuranceDetails"},
				success: function (data) {	
					var obj = JSON.parse(data);
					//alert('data '+ data);
					var issuccess = obj.IsSuccess;
					var ErrorMessage=obj.ErrorMessage;
				
					if(issuccess==true)
					{
						sessionStorage.setItem('SearchList',data);
						sessionStorage.setItem('SearchListtype',"401k");
						globalcountcontact=0;
						cards=[];
						$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/contactBroker.html",{transition: "none",reverse: false});
						//alert('issuccess' + issuccess)
					}
					else if(issuccess==false)
					{
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html(ErrorMessage);
				    	$('#InfopopupLifeInsurance').popup('open');
							
						}
					else
						{
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html("Please try again.");
				    	$('#InfopopupLifeInsurance').popup('open');
						}	

					},        					
				
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					if(errorThrown!=""){	
						$.mobile.loading("hide");
						jQuery("label[for='messagetext']").html("We are unable to connect the server. Please try again later.");
				    	$('#InfopopupLifeInsurance').popup('open');
					}
					else{					
					}	
				}			 			
			});
	 		
		 }
	 	 else
	 	 {
	 		 $.mobile.loading("hide");
	 		 jQuery("label[for='messagetext']").html("Please validate details.");
	 		 $('#InfopopupLifeInsurance').popup('open');
    	
	 	 }
		 	
	});
	
    $('#labelfileInput').on("click", function (){
        $('#errordiv').text("");
        $('#ConfirmPictureInfopopup').popup('open');
    });
               
    $('#OpenGallery').on("click", function () {
        $('#ConfirmPictureInfopopup').popup('close');
        getdocImages("fileInput","getfileconversion","InfopopupLifeInsurance");
    });
               
    $('#OpenCamera').on("click", function () {
        $('#ConfirmPictureInfopopup').popup('close');
        getdocImagescamera("fileInput","getfileconversion","InfopopupLifeInsurance");
    });

	$('#OkbtnLifeInsurance').off("click").on("click", function() {
		$('#InfopopupLifeInsurance').popup('close');
	});
});

