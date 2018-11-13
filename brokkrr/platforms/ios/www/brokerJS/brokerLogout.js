$(document).on("pageshow","#brokerLogoutPage", function( event ) {
    ClearDeviceIdForiOS(useridBroker);
    if(BrokerBadgesInt>0){
        window.clearInterval(BrokerBadgesInt);}
        if(IntLatestmsgBroker>0){
            window.clearInterval(IntLatestmsgBroker);
        }
               
   // window.plugins.pushNotification.setApplicationIconBadgeNumber(noti.successHandler,noti.errorHandler, 0);
     app.push.setApplicationIconBadgeNumber(function() {},function() {},0);
    $.mobile.loading("show");
    var arr = [];
    // Iterate over localStorage and insert the keys that meet the condition into arr
    for (var i = 0; i < localStorage.length; i++){
        var strkey = localStorage.key(i);
               
        if(strkey != 'DeviceID'){
            arr.push(localStorage.key(i));
        }
    }
    // Iterate over arr and remove the items by key
    for (var i = 0; i < arr.length; i++) {
        localStorage.removeItem(arr[i]);
    }
    var i = sessionStorage.length;
    while(i--) {
        var key = sessionStorage.key(i);
        sessionStorage.removeItem(key);
    }
               
    $.mobile.loading("hide");
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "../broker/brokerLogin.html",{transition: "slide",reverse: false});
});
