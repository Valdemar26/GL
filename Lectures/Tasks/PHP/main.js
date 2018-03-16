document.getElementById('btn').addEventListener('click', loadUser);
let field = document.getElementById('users_content'),
    chat = document.getElementById('chat_content'),
    reset = document.getElementById('btn-reset');

window.onload = getData();

/*
* getData() - show data from the server after page was reload
*
* */

function getData() {
    const xhr = new XMLHttpRequest(),
          users = [];

    xhr.open('GET', 'getusers.php', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText),
                    i = 0;
                if(response == null) {
                    return;
                } else {
                    response.forEach(function(obj) {
                        obj.firstName = obj.name.split(' ')[0];
                        obj.lastName = obj.name.split(' ')[1];
                        users[i++] = obj;
                        createUserBlock(obj);
                    });
                }
            }
        }
    };

    const xhr_mess = new XMLHttpRequest();
    xhr_mess.open('GET', 'getmessages.php', true);
    xhr_mess.send();
    xhr_mess.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr_mess.responseText);
                i = 0;
                if(response === null) {
                    return;
                } else {
                    response.forEach(function(obj) {
                        for(i; i<users.length; i++) {
                            if(users[i].id == obj.user_id) {
                                createMessageBlock(users[i], obj.message);
                            }
                        }
                    });
                }
            }
        }
    };

}


/**
 * function loadUser()
 * make AJAX request and call getUserInfo with obtained data
 */

function loadUser(user) {
    const xhr = new XMLHttpRequest();
    let userContent = document.createElement('div');
    userContent.className = 'user_block';

    xhr.open('GET', 'https://randomuser.me/api/?inc=name,location,phone,picture,dob', true);

    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);

                // userContent.innerHTML = `
                //         <div class="col">
                //             <img src="${(user.picture.medium)}" class="img_user" alt="Logo">
                //         </div>
                //         <div class="col">
                //             <h4>${(FirstUpperCase(user.name.first))} ${(FirstUpperCase(user.name.last))}</h4>
                //             <p>City: <span>${(FirstUpperCase(user.location.city))}</span></p>
                //             <p>Phone: <span>${(user.phone)}</span></p>
                //         </div>`;
                // field.appendChild(userContent);
                // randomMessages(user);
            }
        }
    };

}

/**
 * function loadMessages
 * make AJAX request and call createMessageBlock with obtained data
 */

function loadMessages(user) {
    const xhr = new XMLHttpRequest();
    let message = document.createElement("div");
    message.className = 'chat_block';

    xhr.open('GET', 'http://www.randomtext.me/api/gibberish/p-1/5-15', true);

    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText),
                    msg = response.text_out;
                messageToDB(user.id, msg);
                createMessageBlock(user, msg);
                // message.innerHTML = `
                //             <div class="col">
                //                 <img src="${(user.picture.medium)}" class="img_chat" alt="User Logo">
                //             </div>
                //             <div class="col">
                //                 <h4>${(user.name.first).toUpperCase()} ${(user.name.last).toUpperCase()} (${getAge(user)})</h4>
                //                 <p>${msg}</p>
                //             </div>`;
                // chat.appendChild(message);
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
    let today = new Date();
    return today.getFullYear() - user.dob.substring(0, 4); // return age
}

/**
 * function writeToDataBase()
 * send user data to server
 *
*/
 function writeToDataBase(user) {
     const data = JSON.stringify(user),
           xhr = new XMLHttpRequest();
     xhr.open('POST', 'writetodb.php', true);
     xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
     xhr.onload = function() {
         const resp = JSON.parse(xhr.responseText);
         user.id = resp;
         createUserBlock(user);
         createMessage(user);
     };
     xhr.send(data);
}

/**
 * function messageToDB()
 * send user.id and message to the server
 */
function messageToDB(id, mess) {
    const data = JSON.stringify({id: id, message: mess}),
          xhr = new XMLHttpRequest();
    xhr.open('POST', 'writemesstodb.php', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function() {
        const resp = JSON.parse(xhr.responseText);
        console.log(resp);
    };
    xhr.send(data);
}

/**
 * reset method
 * clear data from DataBase and web UI
 *
 */
reset.addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'resetdata.php', true);
    xhr.onload = function() {
        const resp = JSON.parse(xhr.responseText);
        console.log(resp);

        while(field.firstChild) {
            field.removeChild(field.firstChild);
        }
        while(chat.firstChild) {
            chat.removeChild(chat.firstChild);
        }
    };
    xhr.send();
});

/**
 * function getUserInfo
 * create user object
 *
 */
function getUserInfo(userInfo) {
    let minInterval = 5000,
        randomInterval = Math.round(Math.random() * 25000) + minInterval,
        user = {
            firstName: userInfo.results[0].name.first,
            lastName: userInfo.results[0].name.last,
            city: userInfo.results[0].location.city,
            phone: userInfo.results[0].phone,
            img: userInfo.results[0].picture.medium,
            username: userInfo.results[0].login.username,
            time: randomInterval
        };
        user.name = FirstUpperCase(user.firstName) + ' ' + FirstUpperCase(user.lastName);
    writeToDataBase(user);
}

/**
 * function createUserBlock()
 * paste user info into a web-page
 *
 */
function createUserBlock(user) {
    let userContent = document.createElement('div');
    userContent.className = 'user_block';

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
}

/**
 * function createMessageBlock paste messages into a web UI
 */
function createMessageBlock(user, mess) {
    let message = document.createElement("div");
    message.className = 'chat_block';

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