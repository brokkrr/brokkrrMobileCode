$(document).on("pageshow","#BrokerbriecasePage",function () {
               CheckDeviceId(useridBroker);
      $.mobile.loading("show");
               if (strDevice!="iPad"){
               var hbcontent=getcontentheight();
               hbcontent=stopPageOverflow(hbcontent);
               $('.ui-content').css('height',hbcontent);
               }
               
               if (strDevice=="iPad"){
               var hbcontent=getcontentheight();
               hbcontent=hbcontent-15;
               $('.ui-content').css('height',hbcontent);
               }
              
               var container = document.getElementById('embed_container');
               var video = document.getElementById('playvideo');
               var ratio = 9/16; //this is why the 56.25% padding hack exists
               
               function resizer() {
               var width = parseInt(window.getComputedStyle(container)['width'], 10);
               var height = (width * ratio);
               
               video.style.width = width + 'px';
               video.style.height = height + 'px';
               video.style.marginTop = '-3.278%'; //~732px wide, the video border is about 24px thick (24/732)
               
               container.style.height = (height * 0.88) + 'px'; //0.88 was the magic number that you needed to shrink the height of the outer container with.
               }
               
               //attach event on resize
               window.addEventListener('resize', resizer, false);
               
               //call function for initial sizing
               //no need for padding hack since we are setting the height based off of the width * aspect ratio
               resizer();
 
               
               getMenuDetailsBrokkrr(menuFirstname,menuLastname,menuProfilepic);//Hambergermenu
             
               var user=sessionStorage.getItem('BrokerUser');
               var UserId;
               var obj=JSON.parse(user);
               var issuccess = obj.IsSuccess;
               var ErrorMessage=obj.ErrorMessage;
               
               if(issuccess==true)
               {
               var UserDetails=obj.UserDetails;
               $.each(UserDetails, function (i, userobj) {
                      UserId=userobj.UserId;
                      });
               }
               
               $.ajax({
                      type: "POST",
                      url: webserviceURL,
                      data: {UserId:UserId,ActionName:"DoGetVideoList"},
                      success: function (data) {
                   //   alert('videolist: '+data);
                      var obj = JSON.parse(data);
                      
                      var issuccess = obj.IsSuccess;
                      var ErrorMessage=obj.ErrorMessage;
                     
                      if(issuccess==true)
                      {
                      var vdoDetails=obj.VideoDetails;
                      var newmsgdetail=obj.UnWachedVideoDetails;
                      
                      var vdolist='';
                      if(vdoDetails.length > 0){
                      $.mobile.loading("show");
                      $.each(vdoDetails, function (i, vdo) {
                             var url=vdo.Url;
                             var spliturl = url.split("/");
                             var youtubeid=spliturl[4];
                             var vdoimg='https://img.youtube.com/vi/'+youtubeid+'/hqdefault.jpg';//default,hqdefault,mqdefault,sddefault,maxresdefault
                             
                             
                             
                             vdolist='<li>'
                             
                             +'<div class="row" onclick="getvideo(\'' + vdo.Url+ '\',\''+vdo.Id+'\' ,\''+UserId+'\' )" >'
                             
                             +'<div class="col-sm-6 col-xs-6" id="'+vdo.Id+'" >'
                            // +'<iframe class="listiframevdo" src="'+vdo.Url+'" frameborder="0"></iframe>'
                             +'<img src="'+vdoimg+'" class="listiframevdo thumbnailimg">'
                             +'<img src="../images/play.png" class="playimg" >'
                             +'<div class="mask-youtube"></div>'
                             +'</div>'
                             
                             +'<div class="col-sm-5 col-xs-5 lititle ititle">'
                             //+'<p class="lititlep">'+vdo.Title+'</p>'
                             +'<div id="title'+vdo.Id+'" class="lititlep">'+vdo.Title+'</div>'
                             +'<div id="description'+vdo.Id+'" style="display:none;">'+vdo.Description+'</div>'
                             +'</div>'
                             
                             
                             +'<div id="limsgicon'+vdo.Id+'" class="col-sm-1 col-xs-1 ">'//linew
                             +'<div id="new'+vdo.Id+'" class="linewmsg unwatchvdo" style=""></div>'
                             
                             +'</div>'
                             
                             +'</div>'
                             
                             +'</li>'
                            
                             $('#videolist').append(vdolist);
                             if(i==0){
                             getvideo(vdo.Url,vdo.Id,UserId);
                             }
                             });
                      
                      }
                     else{
                      getvideo("","","");
                     /* vdolist='<li align="center">No video available</li>'
                      
                      $('#videolist').append(vdolist);*/
                      }
                    //  alert(newmsgdetail.length);
                      if(newmsgdetail.length > 0){
                      $.each(newmsgdetail, function (i, msg) {
                             if(msg.IsWatched=='True'){
                             $('#new'+msg.VideoId).hide();
                             
                             }
                             else{
                             //$('#limsgicon'+msg.VideoId).removeClass('linew');
                             //$('#limsgicon'+msg.VideoId).addClass('linewm');
                             }
                             });
                      
                      }
                      
                      $('ul#videolist').listview('refresh');
                      $.mobile.loading("hide");
                      }
                      },
                      error : function(XMLHttpRequest, textStatus, errorThrown) {
                        //alert("error occured");
                      }
                      });
          
               
               });
function getvideo(url,VideoId,UserId){
    var titlevdo=$('#title'+VideoId+'').text();
    var descvdo=$('#description'+VideoId+'').text();
    if(url!=''){
    var src=url+'?modestbranding=1;rel=0;cc_load_policy=1;fs=1;playsinline=1'
     $('#playvideo').attr("src",url);
     $('#vdotitle').html(titlevdo);
     $('#vdodesc').html(descvdo);
  
        $.ajax({
               type: "POST",
               url: webserviceURL,
               data: {VideoId:VideoId,UserId:UserId,ActionName:"DoSetVideoWatched"},
               success: function (data) {
               //alert('UnWatchedVideoCount: '+data);
               var obj = JSON.parse(data);
               var issuccess = obj.IsSuccess;
               var ErrorMessage=obj.ErrorMessage;
               var vdocnt='';
               
               if(issuccess==true)
               {
               //remove new image
               $('#new'+VideoId).hide();
               
               }
               },
               error : function(XMLHttpRequest, textStatus, errorThrown) {
               
               }
               });
    }
    else{
        $('#embed_container').text('No video available').css('text-align','center').css('margin-top','30px');
    }
}



