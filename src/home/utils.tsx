class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
  	return `Hello ${this.greeting}`;
  }
}

interface person {
  name: string;
  age: number;
}

let tom: person = {
  name: 'Tom',
  age: 25
};

if (tom.age === 25) {
  console.log(tom.name + 'is 25 years old.');
}

export default Greeter;
