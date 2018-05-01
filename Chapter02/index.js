function findMin(x,y){
    return x<y ? x : y
}

console.log(findMin(-1,-10))

function isEven(n){
    if(n <= 1) return n===0 ? true : false

    return isEven(n-2)
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false

// Your code here.
function countBs(word){
    return word.split('').filter(l => l==='B').length
}

function countChar(word, char){
    return word.split('').filter(l => l===char).length
}
console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4