
var noti = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	noti.receivedEvent('deviceready');
    },
tokenHandler:function(msg) {
  
    var Devicetoken=msg;
    //alert(Devicetoken);
    if(Devicetoken!=''||Devicetoken!=null){
    localStorage.setItem('DeviceID', msg);
    }
    else{
        alert("Please check your internet connection.You may have new messages coming up.");
    }
   
},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        var pushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android') {
            //alert("android");
            pushNotification.register(noti.successHandler, noti.errorHandler,{"senderID":"291168839100","ecb":"noti.onNotificationGCM"});
        }
        else {
            // alert("pushNotification ios");
            pushNotification.register(this.tokenHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"noti.onNotificationAPN"});
        }
        
        
    },
    successHandler: function(result) {
       //alert('success ' +result);
    },
    errorHandler:function(error) {
        //alert('error ' +error);
    },
    // iOS
onNotificationAPN: function(event) {
    var UserId='';
    var UserType='';
    var BrokerInfo=localStorage.getItem("BrokerUser");
    var customerInfo=localStorage.getItem("CustomerUser");
    var pushNotification = window.plugins.pushNotification;
    if(BrokerInfo!=null){
        var obj = JSON.parse(BrokerInfo);
        var UserDetails=obj.UserDetails;
        
        $.each(UserDetails, function (i, res) {
               UserType=res.UserType;
               UserId=res.UserId;
               });
    }
    
    if(customerInfo!=null){
        var obj = JSON.parse(customerInfo);
        var UserDetails=obj.UserDetails;
        $.each(UserDetails, function (i, res) {
               UserType=res.UserType;
               UserId=res.UserId;
               });
        
        
    }
    
    if (event.alert) {
    }
    if (event.badge) {
       var cnt=event.badge;
            setInterval(function() {
                        
                        $.ajax({
                               type: "POST",
                               url: webserviceURL,
                               data: {UserId:UserId,ActionName:"DoGetUnreadMsgCount"},
                               success: function (data) {
                               //alert("data"+data);
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
                                      if(parseInt(res.Cnt) >0){totalunreadconver++;}
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
                               cnt=badgescount;
                               pushNotification.setApplicationIconBadgeNumber(this.successHandler,this.errorHandler, cnt);
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
                               cnt=badgescount;
                               pushNotification.setApplicationIconBadgeNumber(this.successHandler,this.errorHandler, cnt);
                               }
                               }
                               }
                               
                               }//success=true
                               
                               }
                               });//ajax
                        
                        pushNotification.setApplicationIconBadgeNumber(this.successHandler,this.errorHandler, cnt);
                        }, 1000 * 60 * 1);
      //  }//else
    }
    if (event.sound) {
        var snd = new Media(event.sound);
        snd.play();
    }
},
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                	localStorage.setItem('DeviceID', e.regid);
                }
            break;
 
            case 'message':
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    }
};

noti.initialize();
