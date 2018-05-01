function div(){
    console.log('---------------------');
}

function range(start, end, step=1){
    
    const result = [];
    if(step > 0 ){
        for(let i = start; i <= end; i+=step){
            result.push(i);
        }
    }else{
        for(let i = start; i >= end; i+=step){
            result.push(i);
        }
    }
    
    return result
}

function sum(arr){
    let result = 0;
    for(let num of arr){
        result += num;
    }
    return result;
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55

function reverseArray(arr){
    const result = []
    let k = arr.length-1
    while(k>=0){
        result[k] = arr.shift()
        k--
    }
    return result
}

function reverseArrayInPlace(arr){
   for(let i = 0; i <= Math.floor(arr.length/2); i++){
       const temp = arr[i];
       arr[i] = arr[arr.length - 1-i];
       arr[arr.length - 1-i] = temp;
   }
   return arr
}
console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

// Your code here.
function arrayToList(arr){
   
        if(arr.length==1) return { value: arr[0], rest : null}
        const val = arr.shift();
        const partialArr = arr
        
        return { value: val, rest: arrayToList(partialArr)}
}
function listToArray(list){
    
    function buildArray(list, arr = []){

        if(list.rest===null) return arr.concat(list.value)
        
        return buildArray(list.rest, arr.concat(list.value))
    }
        return buildArray(list)
}

function prepend(el, list){
    return { value: el, rest: list}
}

function nth(list, num){
    if(list===null) return undefined
    if(num===0) return list.value

    return nth(list.rest, num-1)

}
console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 2));
// → 20


//Your code here.
function deepEqual(first, second){
    if(first===second) return true;
    // if(first == null || second == null){
    //     return false;
    //   }
      
      //if(typeof first === 'object' && typeof second === 'object'){   
if(typeof first==='object' && first!==null && typeof second==='object' && second!==null) {
        const firstKeys = Object.keys(first);
        const secondKeys = Object.keys(second);
        if(firstKeys.length !== secondKeys.length) return false;
        
        for(let key in first){

            if(deepEqual(first[key], second[key])===false) 
            
            { return false}
            
        }
       return true
    }
    
    return false
}

deepEqual(4,4); //true
deepEqual(4, null); //false
deepEqual(0, undefined); //false
deepEqual(null, undefined); //false
deepEqual(null, null); //true

let obj = {here: {is: "an"}, object: 2, lala: { la : 1}};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2, lala: { la : 2}}));
// → true

for(let key in obj){
    console.log(key)
}

div()

for(let key in Object.keys(obj)){
    console.log(key)
}