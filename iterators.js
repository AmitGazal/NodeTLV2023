function* infinite() {
    let index = 0;

    while (true) {
        if (index === 100000000)
            return;
        yield index++;
    }
}
  
const generator = infinite(); // "Generator { }"

for (const value of generator) {
    console.log(value);
}

// const iterator = [...Array(100000000).keys()];
    
// for (const value of iterator) {
//     console.log(value);
// }

/**
 * Readability: The generator code is more readable and concise than the iterator code. The generator function clearly communicates the intent of the code, which is to generate a sequence of numbers from an array.
 * Memory efficiency: The generator function does not create a new array or data structure in memory. Instead, it generates values on-the-fly as they are needed. This can be especially useful when working with large datasets or when memory is limited.
 * Lazy evaluation: The generator function only evaluates the values that are needed at each iteration. This can improve performance by reducing unnecessary computations.
 */