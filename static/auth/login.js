const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signUpFormButton = document.getElementById('SignUpForm');
const signInFormButton = document.getElementById('SignInForm');


// Code for Change Signup and SignIn form start
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
// Code for Change Signup and SignIn form end




// ajax call for signUp
signUpFormButton.addEventListener('click', function(){
	let nameData = document.getElementById('signUpFormName').value;
	let emailData = document.getElementById('signUpFormEmail').value;
	let passData = document.getElementById('signUpFormPass').value;
	const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
	const namePattern = /^[a-zA-Z]+ [a-zA-Z]+$/;
	const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if (nameData == '' || emailData == '' || passData == ''){
		document.getElementById('SignUpError').innerText = 'Please enter data in all the fields';
	}
	else if(!namePattern.test(nameData)){
		document.getElementById('SignUpError').innerText = 'Please enter correct name';
	}
	else if(!emailPattern.test(emailData)){
		document.getElementById('SignUpError').innerText = 'Please enter correct email id';
	}
	else{
		document.getElementById('SignUpError').innerText = '';
		sendingData = {
			'name': nameData,
			'email':emailData,
			'password':passData
		};
		$.ajax({
			url: signUpURL,
			headers: {'X-CSRFToken': csrftoken},
			type: 'post',
			data: sendingData,
			success: function( data, textStatus ){
				if (data['status'] == 'success' ){
					console.log(data)
				}
				else{
					document.getElementById('SignUpError').innerText = data['errorMsg'];
				}
			},
			error: function( textStatus, errorThrown ){
				
			}
		});
	}
});

// ajax call for signIn
signInFormButton.addEventListener('click', function(){
	let emailData = document.getElementById('signInFormEmail').value;
	let passData = document.getElementById('signInFormPass').value;
	const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
	const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if (emailData == '' || passData == ''){
		document.getElementById('SignInError').innerText = 'Please enter data in all the fields';
	}
	else if(!emailPattern.test(emailData)){
		document.getElementById('SignInError').innerText = 'Please enter correct email id';
	}
	else{
		document.getElementById('SignInError').innerText = '';
		sendingData = {
			'email':emailData,
			'password':passData
		};
		$.ajax({
			url: "",
			headers: {'X-CSRFToken': csrftoken},
			type: 'post',
			data: sendingData,
			success: function( data, textStatus ){
				if (data['status'] == 'success' ){
					console.log(data)
				}
				else{
					document.getElementById('SignInError').innerText = data['errorMsg'];
				}
			},
			error: function( textStatus, errorThrown ){
				console.log(textStatus)
				console.log(errorThrown)
			}
		});
	}
});
