/**
 * Created by valdemar on 25.01.18.
 */

/*
 * Mediator (посередник) - визначає об'єкт, що інкапсулює спосіб взаємодії множини об'єктів.
 * Посередник забезпечує слабку зв'язаність системи, звільняючи об'єкти від необхідності
 * явно посилатися один на одного, і дозволяючи тим самим незалежно змінювати
 * взаємодії між ними.
 *
 * Приклад з життя - контроль трафіку в аеропорту. Всі рішення по зліт/посадку літаків
 * приймає диспетчер. Всі повідомлення від літаків потрапляють напряму в вежу керування,
 * замість того щоб пересилатися між усіми літаками. Такий централізований контроллер
 * (диспетчер) - це і є Mediator.
 *
 *
* */

const User = function(name) {
    this.name = name;
    this.chatroom = null;
};

User.prototype = {
    send: function(message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function(message, from) {
        console.log(`${from.name} to ${this.name}: ${message}`);
    }
};

const Chatroom = function() {
    let users = {}; // list of users

    return {
        register: function(user) {
            users[user.name] = user;
            user.chatroom = this; // return Chatroom Object
        },
        send: function(message, from, to) {
            if(to) {
                // Single user message
                to.receive(message, from);
            } else {
                // Mass message
                for(key in users) {
                    if(users[key] !== from) {
                        users[key].receive(message, from);
                    }
                }
            }
        }
    }
};

const brad = new User('Brad');
const jeff = new User('Jeff');
const sara = new User('Sara');

const chatroom = new Chatroom();

chatroom.register(brad);
chatroom.register(jeff);
chatroom.register(sara);

brad.send('Hello Jeff', jeff);
sara.send('Hello Brad, you are the best friend!', brad);
jeff.send('Hello Everyone!!!');