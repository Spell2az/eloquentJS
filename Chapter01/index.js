function hash(num){
    
    for (let index = 0; index <= num; index++) {
        console.log('#'.repeat(index)+'\n')
        
    }
}

//hash(7)

function fizzBuzz(){
    for(let n = 1; n<=100; n++){
        if(n%3 === 0 && n%5===0){
            console.log("FizzBuzz")
        }else if(n%3===0){
            console.log("Fizz");
        }else if (n%5===0){
            console.log("Buzz");   
        }else{
            console.log(n)
        }
    }
}

//fizzBuzz();

function chessBoard(n){
    const row = [...new Array(n)].map((e,i)=>{ return i%2===0 ? " ":"#"})
    let res = '';
    for(let i = 0; i <=n; i++){
        if(i%2===0){
           res+=row.join("")+'\n';
        }else{
            res+=[...row].reverse().join("")+"\n"
        }
       
    }
    console.log(res)
}

chessBoard(8)