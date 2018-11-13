$(document).on("pageshow","#brokerLoginPage,#brokerSignupPage,#customerLoginPage,#customerSignupPage", function( event ) {

	$('#BrokerLinkedinLoginBtn').off("click").on("click", function() {
            ClearAllSessionWithoutlocation();
		    $.mobile.loading("show");
		    sessionStorage.setItem('LinkedInLogin','BrokerLogin');
	    	SocialGap.Linkedin_PerformLogon(app.logonSuccess, app.logonFailure);
	});
	
	$('#BrokerLinkedinSignupBtn').off("click").on("click", function() {
            ClearAllSessionWithoutlocation();
		    $.mobile.loading("show"); 
		    sessionStorage.setItem('LinkedInLogin','BrokerSignup');
	    	SocialGap.Linkedin_PerformLogon(app.logonSuccess, app.logonFailure);
	    	
	});

	$('#CustomerLinkedinLoginBtn').off("click").on("click", function() {
            ClearAllSessionWithoutlocation();
		    $.mobile.loading("show"); 
		    sessionStorage.setItem('LinkedInLogin','CustomerLogin');
	    	SocialGap.Linkedin_PerformLogon(app.logonSuccess, app.logonFailure);
	});
	
	$('#CustomerLinkedinSignupBtn').off("click").on("click", function() {
            ClearAllSessionWithoutlocation();
		    $.mobile.loading("show"); 
		    sessionStorage.setItem('LinkedInLogin','CustomerSignup');
	    	SocialGap.Linkedin_PerformLogon(app.logonSuccess, app.logonFailure);
	    	
	});
});

