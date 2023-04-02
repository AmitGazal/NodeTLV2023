async function* generateAsyncData() {
    yield await new Promise((resolve) => setTimeout(() => resolve(1), 1000));
    yield await new Promise((resolve) => setTimeout(() => resolve(2), 1000));
    yield await new Promise((resolve) => setTimeout(() => resolve(3), 1000));
}

async function generateAsyncIterator() {
    let index = 0;
    return {
        next: async function() {
            if (index < myArray.length)
            {
                return {
                   value: await new Promise((resolve) => setTimeout(() => resolve(index++), 1000)),
                    done: false
                };
            } else {
                return {
                    done: true
                };
            }
        }
    }
}

const delayedResponses = {
    delays: [500, 1300, 3500],
  
    wait(delay) {
      return new Promise(resolve => {
        setTimeout(resolve, delay);
      });
    },
  
    async *[Symbol.asyncIterator]() {
      for (const delay of this.delays) {
        await this.wait(delay);
        yield `Delayed response for ${delay} milliseconds`;
      }
    },
  };
  
  async function processAsyncIterator() {
    const asyncIterator = delayedResponses;
    for await (const value of asyncIterator) {
      console.log(value);
    }
    console.log("Done processing async iterator");
  }
  
  async function processAsyncGenerator() {
    const asyncGenerator = generateAsyncData();
    for await (const value of asyncGenerator) {
      console.log(value);
    }
    console.log("Done processing async generator");
  }
  
  processAsyncIterator();
  processAsyncGenerator();