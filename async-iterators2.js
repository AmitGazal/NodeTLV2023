let range = {
    from: 1,
    to: 5,
  
    [Symbol.asyncIterator]() { // (1)
      return {
        current: this.from,
        last: this.to,
  
        async next() { // (2)
  
          // note: we can use "await" inside the async next:
          await new Promise(resolve => setTimeout(resolve, 1000)) // (3)
  
          if (this.current <= this.last) {
            return { done: false, value: this.current++ }
          } else {
            return { done: true }
          }
        }
      }
    }
  }

async function* generateSequence(start, end) {

for (let i = start; i <= end; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i;
}

}

(async () => {

let generator = generateSequence(1, 5);
for await (let value of generator) {
    console.log(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
}

})();

  
// const runRange = async () => {
//     for await (let value of range) {
//     console.log(value)
//     }
// }

// await runRange()

// async function* fetchCommits(repo) {
//     let url = `https://api.github.com/repos/${repo}/commits`
  
//     while (url) {
//       const response = await fetch(url, { // (1)
//         headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
//       })
  
//       const body = await response.json() // (2) response is JSON (array of commits)
  
//       // (3) the URL of the next page is in the headers, extract it
//       let nextPage = response.headers.get('Link').match(/<(.*?)> rel="next"/)
//       nextPage = nextPage?.[1]
  
//       url = nextPage
  
//       for(let commit of body) { // (4) yield commits one by one, until the page ends
//         yield commit
//       }
//     }
//   }

// (async () => {

//     let count = 0
  
//     for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
  
//       console.log(commit.author.login)
  
//       if (++count == 100) { // let's stop at 100 commits
//         break
//       }
//     }
  
//   })()