$(document).on("pagecreate","#meinekeLines_Page,#meinekeHome_Page,#personallineHome_Page,#apspHome_Page,#plinebrokkrrHome_Page,#brokkrrHome_Page", function( event ) {
              changeimg('cmplogo',RegisteredFor);
        });

$(document).on("pageshow","#meinekeLines_Page,#meinekeHome_Page,#personallineHome_Page,#apspHome_Page,#plinebrokkrrHome_Page,#brokkrrHome_Page", function( event ) {
               CheckDeviceId(useridCust);
               //alert(devicename);
                changeimg('cmplogo',RegisteredFor);
               var hbcontent=getcontentheight();
               if (strDevice=="iPad"){
                    hbcontent=hbcontent-15;
                }
               else{
                    hbcontent=stopPageOverflow(hbcontent);
               }
               
               $('.ui-content').css('height',hbcontent);

               if(RegisteredFor=="Brokkrr"){
              
               $('#addremovefooter').hide();
               }
               else{
               
               $('#addremovefooter').show();
               }
              
	//getCompanyList();
    getIndustryList(RegisteredFor);
    GetIndustrySICCodeList("");
	 var user=sessionStorage.getItem('CustomerUser');
	    if(user===null || user=='')
		{
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
		}
               var obj=JSON.parse(user);
               var issuccess = obj.IsSuccess;
               var ErrorMessage=obj.ErrorMessage;
               
               if(issuccess==true)
               {
               var UserDetails=obj.UserDetails;
               $.each(UserDetails, function (i, userobj) {
                      var profilepic,IsAvailable;
                      UserId=userobj.UserId;
                      
                      FirstName1=userobj.FirstName;
                      LastName1=userobj.LastName;
                      if(userobj.ProfilePictureImg != '')
                      {
                      profilepic=userobj.ProfilePictureImg+'?'+Math.random();
                      }
                      else
                      {
                      
                      profilepic=dcustomerimg;
                      
                      }
                      menuCustProfilepic=profilepic;
                      menuCustFirstname=FirstName1;
                      menuCustLastname=LastName1;
                      RegisteredFor=userobj.RegisteredFor;
                     
                      });
               
               $.mobile.loading("hide");
               }
               else
               {
               $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
               }
               
               
               $.mobile.loading("hide");
 
               
		if(menuCustFirstname!="")
        {
			$("#name").text(menuCustFirstname);
            getMenuDetailsCustomer(menuCustFirstname,menuCustLastname,menuCustProfilepic);
		}
		
        $('#personalline').off("click").on("click", function() {
            LineType="Personal";
            if(RegisteredFor=="Meineke"||RegisteredFor=="APSP"){
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/personallinehome.html",{transition: "slide",reverse: false});
            }
            else{
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/plinebrokkrrhome.html",{transition: "slide",reverse: false});
            }
        });
        $('#commercialline').off("click").on("click", function() {
            LineType="Commercial";
            if(RegisteredFor=="Meineke"){
                 $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/meinekehome.html",{transition: "slide",reverse: false});
            }
            else if(RegisteredFor=="APSP"){
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/apsphome.html",{transition: "slide",reverse: false});
            }
            else{
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/brokkrrhome.html",{transition: "slide",reverse: false});
            }
            
        });
        $('#foronekline').off("click").on("click", function() {
                LineType="401k";
            if(RegisteredFor=="Meineke"||RegisteredFor=="APSP"){
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/foronek.html",{transition: "slide",reverse: false});
            }
            else{
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/brokkrrforonek.html",{transition: "slide",reverse: false});
            }
        });
        
        $('#cmpprofile').off("click").on("click", function() {
        if(RegisteredFor=="Meineke"||RegisteredFor=="APSP"){
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/meinekeprofileCustomer.html",{transition: "slide",reverse: false});
        }
        else{
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/profileCustomer.html",{transition: "slide",reverse: false});
        }

        });
               $('#gotoprofile').off("click").on("click", function() {
                                                if(RegisteredFor=="Meineke"||RegisteredFor=="APSP"){
                                                $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/meinekeprofileCustomer.html",{transition: "slide",reverse: false});
                                                }
                                                else{
                                                $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/profileCustomer.html",{transition: "slide",reverse: false});
                                                }
                                                
                                                });
               
               
         
         changefooterlogo('footerlogo',RegisteredFor);
		
});
