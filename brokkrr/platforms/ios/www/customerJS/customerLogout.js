$(document).on("pageshow","#customerLogoutPage", function( event ) {
             //  alert(IntLatestmsgCustomer);
               ClearDeviceIdForiOS(useridCust);
              if(CustomerBadgesInt>0){
               window.clearInterval(CustomerBadgesInt);
               }
               if(IntLatestmsgCustomer>0){
               window.clearInterval(IntLatestmsgCustomer);
               totalUnreadMsgGlobleBroker="";
               totalUnreadMsgGlobleCust="";
               }
//window.plugins.pushNotification.setApplicationIconBadgeNumber(noti.successHandler,noti.errorHandler, 0);
          app.push.setApplicationIconBadgeNumber(function() {},function() {},0);
    $.mobile.loading("show");
               var arr = []; // Array to hold the keys
               // Iterate over localStorage and insert the keys that meet the condition into arr
               
               for (var i = 0; i < localStorage.length; i++){
               var str = localStorage.key(i);
               if(str != 'DeviceID'){
                arr.push(localStorage.key(i));
               }
              
               }
               
               // Iterate over arr and remove the items by key
               for (var i = 0; i < arr.length; i++) {
               localStorage.removeItem(arr[i]);
               }
 
    var j = sessionStorage.length;
    while(j--) {
      var keysession = sessionStorage.key(j);
        sessionStorage.removeItem(keysession);
    }
    $.mobile.loading("hide");
    
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "../customer/customerLogin.html",{transition: "slide",reverse: false});
	
});
