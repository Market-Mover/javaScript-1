let users = [
// {
//     id: 1,
//     namn:'Jesper',
//     efternamn: 'Lindell',
//     email: 'jesper.lindell@hotmail.com'
// }
]

const button = document.getElementById('button')
const form = document.getElementById('form')
const namn = document.getElementById('namn')
const efternamn = document.getElementById('efternamn')
const email = document.getElementById('email')
const output = document.getElementById('users')

form.addEventListener(`submit`, (e => {
    e.preventDefault();
    checkInputs();
}))
   
function checkInputs() {
  
   const namnValue = namn.value.trim();
   const efternamnValue = efternamn.value.trim(); 
   const emailValue = email.value.trim();
   //---------------------------------    
   if(namnValue === '') {
       
        setErrorFor(namn, 'Du måste fylla i ett namn');
   } else {
         
       setSuccessFor(namn);
   }
   //---------------------------------
   if(efternamnValue === '') {
       
     setErrorFor(efternamn, 'Du måste fylla i ett efternamn');
   } else {
      
   setSuccessFor(efternamn);
   }
   //---------------------------------
   if(emailValue === '') {
   
    setErrorFor(email, 'Du måste ha en E-post');
    
   } else if (!isEmail(emailValue)) {
       setErrorFor(email, 'ogiltig mailadress')
   } else {
   
   setSuccessFor(email);
   }
   //---------------------------------
   let elementsArray = document.getElementsByClassName('success');
   if (elementsArray.length === 3) {
       addUser()
       namn.value = ''
       efternamn.value = ''
       email.value = ''
       console.log(users);
       namn.parentElement.className = 'form-control'
       efternamn.parentElement.className = 'form-control'
       email.parentElement.className = 'form-control'
   }
   
}
//---------------------------------
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error';
}
//---------------------------------
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    
}
//---------------------------------
// Det här fungerar fast den sista måsvingen är röd.. Jag vet än idag inte varför. 
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ .test(email)
}
//---------------------------------
function listUsers() {
    output.innerHTML = ''
    users.forEach(user => {
        output.innerHTML  += `<div class="user">
        <p>${user.namn} ${user.efternamn}</p>
        <a href="#">${user.email}</a>
        </div>`
    })
}
//---------------------------------
function addUser() {
    let user = {
        id: Date.now().toString(),
        namn: namn.value.trim(),
        efternamn: efternamn.value.trim(),
        email: email.value.trim()
     
    }
    users.push(user);
    listUsers();

}


