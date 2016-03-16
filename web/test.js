var obj1 = {"a" : 1};
obj1.b = 2;

var obj2 = Object.create(obj1);
console.log(obj2.a);
console.log(obj2.b);