
const scripts = require('./scripts')
function div(){
    console.log('---------------------');
}

let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.

function flatten(arr){
    return arr.reduce((acc,curr)=> {
      return  acc.concat(curr)
    })
}
console.log(flatten(arrays))
// → [1, 2, 3, 4, 5, 6]
div()

function loop(val, test, update, body){
    for (val; test(val); val=update(val) )
    {
       body(val)
    }
}

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
div()

//loop

// function every(array, test) {
//     // Your code here.
//     for(let item of array){
//         if(!test(item)) return false
//     }
//     return true
//   }
  
//some

function every(array, test){

    return !array.some(item => !test(item))
}

  console.log(every([1, 3, 5], n => n < 10));
  // → true
  console.log(every([2, 4, 16], n => n < 10));
  // → false
  console.log(every([], n => n < 10));
  // → true

  function average(array){
      return array.reduce((a,b)=> a+b)/array.length
  }

  function characterScript(code){
      for(let script of scripts) {
          if(script.ranges.some(([from, to])=>{
              return code>=from && code < to;
          }))
          return script;
      }
      return null;
  }

// const horseShoe = "🐴👟";
// console.log(horseShoe.length);
// console.log(horseShoe[0]);
// console.log(horseShoe.charCodeAt(0));
// console.log(horseShoe.codePointAt(0));

function countBy(items, groupName){
    let counts = [];
    for(let item of items){
        let name = groupName(item);
        let known = counts.findIndex(c=> c.name == name);
        if(known == -1){
            counts.push({name, count: 1})
        }else{
            counts[known].count++;
        }
    }
    return counts;
}


function dominantDirection(text) {
    // Your code here.
    
    const charScript = text.split('')
                            .map(char => characterScript(char.codePointAt(0)))
                            .filter(a=> a!=null)
                            .map(item => item.direction)

    const scriptDirectionsCounts = countBy(charScript, a => a)

    return scriptDirectionsCounts.reduce((a,b)=>{ return a.count < b.count ? b : a}).name
  }
  console.log(dominantDirection("Hello!"));
  // → ltr
 console.log(dominantDirection("Hey, مساء الخير"));
  // → rtl


