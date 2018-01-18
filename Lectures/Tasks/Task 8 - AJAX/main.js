document.getElementById('btn').addEventListener('click', loadUser);
let field = document.getElementById('users_content'),
    chat = document.getElementById('chat_content');

/* function for get user */
function loadUser() {
    const xhr = new XMLHttpRequest();
    let userContent = document.createElement('div');
    userContent.className = 'user_block';

    xhr.open('GET', 'https://randomuser.me/api/?inc=name,location,phone,picture,dob', true);

    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText),
                    user = response.results[0];

                userContent.innerHTML = `
                        <div class="col">
                            <img src="${(user.picture.medium)}" class="img_user" alt="Logo">
                        </div>
                        <div class="col">
                            <h4>${(FirstUpperCase(user.name.first))} ${(FirstUpperCase(user.name.last))}</h4>
                            <p>City: <span>${(FirstUpperCase(user.location.city))}</span></p>
                            <p>Phone: <span>${(user.phone)}</span></p>
                        </div>`;
                field.appendChild(userContent);
                randomMessages(user);
                console.log(user.dob);
            }
        }
    };

}

/* function for get messages */
function loadMessages(user) {
    const xhr = new XMLHttpRequest();
    let message = document.createElement("div");
    message.className = 'chat_block';

    xhr.open('GET', 'http://www.randomtext.me/api/gibberish/p-1/5-15', true);

    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(this.responseText);
                let response = JSON.parse(xhr.responseText),
                    msg = response.text_out;
                    message.innerHTML = `
                            <div class="col">
                                <img src="${(user.picture.medium)}" class="img_chat" alt="User Logo">
                            </div>
                            <div class="col">
                                <h4>${(user.name.first).toUpperCase()} ${(user.name.last).toUpperCase()} (${getAge(user)})</h4>
                                <p>${msg}</p>
                            </div>`;
                chat.appendChild(message);
            }
        }
    };
}

/* make first letter to uppercase */
function FirstUpperCase(input) {
    return input[0].toUpperCase()+input.substr(1);
}

/* random messages */
function randomMessages(user) {
    let minInterval = 5000,
        randomInterval = Math.round(Math.random() * 25000) + minInterval;
        setInterval(function () {
            loadMessages(user);
        }, randomInterval);
        clearInterval(120000);// stop chat messages after 2 min
}

/* get age */
function getAge(user) {
    //return today.getFullYear();
    //return today.getFullYear() - user.dob.substring(0, 4);
    // let year = today.getFullYear(); //2018
    // let yearOfBirth = user.dob.substr(3);
    // let age = year - yearOfBirth;
    // return age;
    let today = new Date();
    return today.getFullYear() - user.dob.substring(0, 4);
}
// "dob":"1973-09-20 03:56:02"

