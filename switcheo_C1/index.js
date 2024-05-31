// # Task

// Provide 3 unique implementations of the following function in JavaScript.

// **Input**: `n` - any integer

// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.


var sum_to_n_a = function(n) {
    //using iteration
    let sum=0;
    //use for loop to iterate thru while adding each time
    //if its -5, -5-4-3-2-1=-15
    if (n<0)
        {
            for (let i=n; i<=0;i++){
                sum+=i;
            }
        }
        else{
            for (let i=0; i<=n;i++){
                sum+=i;
            }
        }
    return sum
};

var sum_to_n_b = function(n) {
    //using arithmetic progression
    //sum of arithmetic series=Sn=n/2(2a+(n-1)d
    // if (n<0){
    //     //-5((1-5)/2)
    //     first term become -1
    // 
    let sum=0;
    if (n<0){
        //d:1, a:-1
        sum=Math.abs(n)/2*(-1+n);
    }
    else{
        sum=n/2*(1+n);
    }
    return sum;
};

var sum_to_n_c = function(n) {
    //using recursion
    //1+2+3+4+5
    //base case
    //when n===0 -> function should stop here
    
    if (n===0){
        return 0;
    }
    if (n<0){
        // thru addition
        return n+sum_to_n_c(n+1);
    }
    //thru subtraction
    return n+sum_to_n_c(n-1);
};
console.log(`Sum 1 = ${sum_to_n_a(5)}`)
console.log(`Sum 2 = ${sum_to_n_b(5)}`)
console.log(`Sum 3 = ${sum_to_n_c(5)}`)
console.log(`Sum 1 = ${sum_to_n_a(-10)}`)
console.log(`Sum 2 = ${sum_to_n_b(-10)}`)
console.log(`Sum 3 = ${sum_to_n_c(-10)}`)
