const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");
messageOne.textContent = "";


weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    messageOne.textContent = "Loading Weather....";
    messageTwo.textContent = "";
    let location = search.value;
    fetch("/weather?address="+location).then( (response) => {
    response.json().then( (data)=> {
        if(data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
        
    });
    
    }).catch( (error) => {
        error.json().then( (data) => {
            console.log(data);
        })
    });
});