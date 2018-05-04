

function div(){
    console.log('---------------------');
}

class Matrix{
    constructor(width, height, element = (x, y) => undefined){
        this.width = width;
        this.height = height;
        this.content = [];

        for (let y = 0; y < height; y++){
            for (let x = 0; x < width; x++){
                this.content[y * width + x] = element(x, y);
            }
        }
    }

    get(x, y) {
        return this.content[y * this.width + x]
    }

    set(x, y, value) {
        this.content[y * this.width + x ] = value;
    }
}

class MatrixIterator {
    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }

    next() {
        if (this.y == this.matrix.height) return {done: true};

        let value = {   x: this.x,
                        y: this.y,
                        value: this.matrix.get(this.x, this.y)};

        this.x++;
        if (this.x == this.matrix.width) {
            this.x = 0;
            this.y++;
        }
        return {value, done: false};
    }
}

Matrix.prototype[Symbol.iterator] = function() {
    return new MatrixIterator(this);
}

let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for(let {x, y, value} of matrix){
    console.log(x, y, value);
    
}

let varyingSize = {
    get size() {
        return Math.floor(Math.random() * 100);
    }
}

console.log(varyingSize.size);
console.log(varyingSize.size);

class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }

    get fahrenheit() {
        return this.celsius * 1.8 + 32;
    }

    set fahrenheit(value) {
        this.celsius = (value - 32) / 1.8;
    }

    static fromFahrenheit(value) {
        return new Temperature((value - 32) / 1.8)
    }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);

temp.fahrenheit = 86;
console.log(temp.celsius);



class SymmetricMatrix extends Matrix {
    constructor(size, element = (x, y) => undefined) {
        super(size, size, (x, y) => {
            if (x < y) return element(y, x);
            else return element(x, y);
        });
    }

    set(x, y, value) {
        super.set(x, y, value);
        if (x != y) {
            super.set(y, x, value);
        }
    }
}

div();

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(vector) {
        return new Vec(this.x + vector.x, this.y + vector.y)
    }
    
    minus(vector) {
        return new Vec(this.x - vector.x, this.y - vector.y)
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

}

// Your code here.

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

class Group {
    constructor() {
       this.values = [] 
    }
    add(value) {
        if(!this.has(value)) this.values.push(value)
    }
    has(value) {
        if(this.values.indexOf(value) == -1) return false;
        
        return true;
    }
    delete(value) {
        if(this.has(value)){
            const idx = this.values.indexOf(value)
            this.values.splice(idx, 1)
        }
    }

    static from(iterable){
        if(typeof iterable[Symbol.iterator] === 'function'){
            const group = new Group();
            for(let item of iterable) {
                group.add(item)
            }
            return group;
        }
    }
}

class GroupIterator {
    constructor(group) {
        this.group = group
        this.idx = 0;
    }
    next() {
        if(this.idx === this.group.values.length) return {done: true}

        let value = this.group.values[this.idx];

        this.idx++;
        return {value, done: false};
    }
}

Group.prototype[Symbol.iterator] = function() {
    return new GroupIterator(this);
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
  // → a
  // → b
  // → c

 
  let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
console.log(map.hasOwnProperty.call(Object.prototype, "one"));
// → true
//console.log(Object.prototype.hasOwnProperty.call(map, "one"));