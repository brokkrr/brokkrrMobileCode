/*   Login page  */
function globalvalidaterequired(field)
{
	if(field.val()=="")
	{
		field.addClass("error");
		return false;
	}
	else{
		field.removeClass("error");
		return true;
	}
}

function globalvalidaterequired2(field)
{
	if(field.val()=="")
	{
		field.addClass("error1");
		return false;
	}
	else{
		field.removeClass("error1");
		return true;
	}
}
    
function globalvalidaterequired3(field,classnm)
{
	if(field.val()=="")
	{
		field.addClass(classnm);
		return false;
	}
	else{
		field.removeClass(classnm);
		return true;
	}
}

function globalvalidateEmail(email)
{
	var pattern=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if(email.val().trim()=="")
	{
		email.addClass("error");
		return false;
	}
	else
	{
		var EmailId=email.val();
		EmailId=jQuery.trim(EmailId);
		
		if((pattern.test(EmailId))){
			email.removeClass("error");
			return true;
		}
		//if it's NOT valid
		else{
			//alert('invalid');
			email.addClass("error");
			return false;
		}
	}
}

function globalvalidatePassword(pass)
{
	var pattern=/^[^-\s]{8,15}$/;

	if(pass.val().trim()=="")
	{ 
		pass.addClass("error");
		return false;
	}
	else
	{
		if((pattern.test(pass.val()))){
			//alert('valid');
			pass.removeClass("error");
			return true;
		}
		//if it's NOT valid
		else{
			//alert('invalid');
			pass.addClass("error");
			return false;
		}
	}
}



function globalvalidaterequired4(field,field1,divfield)
{
	if(field.val()=="0")
	{
		//divfield.addClass('ui-select');
		return false;
	}
	else if(field.val()=="1")
	{
		if(field1.val()=="0")
		{
			//divfield.addClass('ui-btn');
			//field1.addClass("error");
			return false;
		}
		else
		{
			//divfield.addClass('ui-btn');
			//field1.removeClass("error");
			return true;
		}
		//return true;
	}
	else if(field.val()=="2")
	{
		//divfield.addClass('ui-btn');
		return true;
	}	
}

function globalvalidaterequired5(field,divfield)
{
	if(field.val()=="0")
	{
		//divfield.addClass('ui-select');
		return false;
	}
	else 
	{
		//divfield.addClass('ui-btn');
		return true;
	}	
}

function globalvalidaterequired6(field,divfield)
{
	
	if(field.val()=="0")
	{
		//alert('Called If');
		//divfield.addClass('ui-select');
		return false;
	}
	else 
	{
		//alert('Called Else');
		//divfield.removeClass('ui-btn');
		//divfield.addClass('ui-btn');
		return true;
	}	
}

function globalvalidaterequired7(field,field1,divfield)
{
	if(field.val()=="0")
	{
		//divfield.addClass('ui-select');
		return false;
	}
	else if(field.val()=="2")
	{
		if(field1.val()=="0")
		{
			//divfield.addClass('ui-btn');
			//field1.addClass("error");
			return false;
		}
		else
		{
			//divfield.addClass('ui-btn');
			//field1.removeClass("error");
			return true;
		}
		//return true;
	}
	else if(field.val()=="1")
	{
		//divfield.addClass('ui-btn');
		return true;
	}	
}

function GlobalValidatePinForLength(editcountPin)
{
    var validate=true;
    for(i=1;i<editcountPin;i++)     {
        
        var existlen=$("#pincode" + i).length;
        if(existlen>0)
        {
            var field=$("#pincode" + i);
            var len=$("#pincode" + i).val().length;
            if(parseInt(len) < 5) {
                
                field.addClass("error1");
                validate=false;
                //return false;
                
            }
            else{
                
                field.removeClass("error1");
                //return true;
            }
        }
    }
    return validate;
}

function globalvalidatefordate(field)
{
   
    if(field.val()=="")
    {
        field.addClass("error1");
        return false;
    }
    else{
        
        field.removeClass("error1");
        return true;
    }
}

