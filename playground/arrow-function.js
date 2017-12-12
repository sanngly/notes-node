var square = x => x*x;

console.log(square(3));

var user = {
	name: 'Sanjoy',
	sayHello: () => {
		console.log(arguments);
		console.log(`Hello I am ${this.name}`);
	},
	sayHelloAlt() {
		console.log(arguments);
		console.log(`Hello I am ${this.name}`);
	}
}

console.log(user.sayHello(1,2,3,4));
console.log(user.sayHelloAlt(1,2,3,4));