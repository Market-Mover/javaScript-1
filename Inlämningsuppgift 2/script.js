const form = document.querySelector('#todo')
const input = document.querySelector('#inputList')
const output = document.querySelector('#output')
const err = document.querySelector('#error')

let todos = []

//funktion som visar klockan i navbaren 
function currentTime() {
    let date = new Date(); 
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.getElementById("clock").innerText = hour + " : " + min + " : " + sec; 
    let t = setTimeout(function(){ currentTime() }, 1000); 
}
function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
}
  currentTime();

  //hämtar hem todos från ett fake API
  const fetchTodos = async () => {
    let url = "http://jsonplaceholder.typicode.com/todos?_start=0&_limit=10";
    const results = await fetch(url).catch(catchError);
    const data = await results.json();
       
    todos = data;
    listTodos();
}
  fetchTodos();

  //funktion för att fånga upp ett ev fel
function catchError(Error) {
    console.warn(Error)
    let resp = new Response(
      JSON.stringify({
        code: 404,
        message: 'Not Found'
      })
    )
    return resp;
}

  //funktion för att lista upp todos och plocka ut dom som HTML
function listTodos() {
    output.innerHTML = '';
  
    todos.forEach(todo => {
      output.innerHTML += newTodo(todo);
    }) 
}
//funktion för att skapa en ny/lägga till egen todo
function newTodo(todo) {
    let createHTML;
    //if-sats som skapar HTML 
    if(todo.completed) {
      createHTML = `
      <div  class="container todo completed">
          <div id="${todo.id}" class="container bg-secondary mb-1 col-10 p-3 d-flex justify-content-between ">
              <h4 class="title ">${todo.title}</h4>
              <button class="btn btn-info">∆</button>
          </div>
      </div>`
    } else {
      createHTML = `
      <div  class="container todo">
          <div id="${todo.id}" class="container bg-secondary mb-1 col-10 p-3 d-flex justify-content-between">
              <h4 class="title ">${todo.title}</h4>
          </div>
      </div>`
    }
    return createHTML
}
  //async funktion 
  const createTodo = async title => {
    let url = 'http://jsonplaceholder.typicode.com/todos?_start=0&_limit=10';
    const data = {
      title,
      completed: false
    }
    const results = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data)
    }).catch(catchError);
    console.warn(Error)
        
    const todo = await results.json()
    todo.id = Date.now();
    todos.unshift(todo)
    listTodos();
}
//Eventlistner som lyssnar efter en submit på knappen add
form.addEventListener('submit', e => {
    e.preventDefault();
    //If-sats som påtalar att man inte kan kan lägga till en tom todo
    if (input.value === '') {
      err.innerHTML = 'OBS! Du måste ange en titel!'
    } else {
      createTodo(input.value);
    input.value = '';
    err.innerHTML = ''
    } 
})
//Eventlistener som lyssnar efter click och gör så man kan toggla mellan klar/ej klar
output.addEventListener('click', e => {
todos.forEach(todo => {
    if(e.target.id == todo.id) {
      if(todo.completed === false) {   // antal === spökade. Tog ett tag att inse varför
      todo.completed = true
    }else{
      todo.completed = false
    }
    }
    // if-sats för att tabort en klarmarkerad todo
    if(e.target.classList.contains('btn-info'))
      deleteTodo(e.target.parentNode.id);

     listTodos()
  })
})
//filterfunktion. Lite klurig att förstå sig på men jag tror min polett har trillat ner
const deleteTodo = id => {
    todos = todos.filter(todo => todo.id != id);
    listTodos(todos);
}




console.log('ゑ')