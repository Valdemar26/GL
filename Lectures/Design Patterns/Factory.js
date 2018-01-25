/**
 * Created by valdemar on 24.01.18.
 */
let fact = document.getElementById('factory');

function MemberFactory() {
    this.createMember = function(name, type) {
        let member;

        if(type === 'simple') {
            member = new SimpleMembership(name);
        } else if(type === 'standart') {
            member = new StandartMembership(name);
        } else if(type === 'super') {
            member = new SuperMembership(name);
        }

        member.type = type;

        member.define = function() {
            // fact.innerHTML = `
            //     <h3>Factory Design Pattern</h3>
            //     <p>${this.name} is member of '${this.type}' type with cost of ${this.cost}</p>`;
            console.log(`${this.name} is member of '${this.type}' type with cost of ${this.cost}`);
        };

        return member;

    }
}

const SimpleMembership = function(name) {
    this.name = name;
    this.cost = '$5';
};

const StandartMembership = function(name) {
    this.name = name;
    this.cost = '$15';
};

const SuperMembership = function(name) {
    this.name = name;
    this.cost = '$25';
};

const members = [];
const factory = new MemberFactory();

members.push(factory.createMember('John Doe', 'simple'));
members.push(factory.createMember('July Gohnson', 'standart'));
members.push(factory.createMember('Iov Lester', 'super'));
members.push(factory.createMember('Zuck Gonsalez', 'simple'));
members.push(factory.createMember('Rob Wilson', 'standart'));

members.forEach(function(member) {
    member.define();
});
