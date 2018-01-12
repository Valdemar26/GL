document.getElementById('users').addEventListener('click', loadUser);

document.getElementById('messages').addEventListener('click', loadMessages);

function loadUser(e) {
    const xhr = new XMLHttpRequest();
    let message = document.createElement("p"),
    field = document.querySelector(".field");

    xhr.open('GET', 'https://randomuser.me/api/?inc=name,location,phone,picture', true);

    /* xhr.onload doesn't needed */
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(this.responseText);
            let response = JSON.parse(xhr.responseText),
               user = response.results[0];

            message.innerHTML = `<span>User Name: ${(user.name.first)} 
                                        ${(user.name.last)} 
                                        from ${(user.location.city)} </span>
<img src="${(user.picture.medium)}" alt="">`;
            field.appendChild(message);
        }
    };

    xhr.send();
}

function loadMessages(e) {
    const xhr = new XMLHttpRequest();
    let message = document.createElement("p"),
        mes = document.querySelector(".mes");

    xhr.open('GET', 'http://www.randomtext.me/api/gibberish/p-1/5-15', true);

    /* xhr.onload doesn't needed */
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(this.responseText);
            let response = JSON.parse(xhr.responseText),
                msg = response.text_out;

            message.innerHTML = `<span>Message: ${(msg)}</span>`;
            mes.appendChild(message);
        }
    };

    xhr.send();
}
