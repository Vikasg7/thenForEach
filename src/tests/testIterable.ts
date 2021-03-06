// this will extend the global Promise variable
import "../index"

test1().then(test2).then(test3).then(test4)

function test1() {
   const arr = [1,2,3,4,5]
   const iterable = arr.entries()
   console.log("Test1: Throwing error while looping through and catching with single catch call at the end of the chain.")
   return Promise.resolve(iterable)
      .thenForEach<number>((item: number, i) => {
         if (i === 4) throw "Some Error"
         console.log(i, item)
      })
      .catch((error: any) => console.log(error))
      .then(() => console.log("\n------------------------------------------\n"))
}

function test2() {
   const arr = [1,2,3,4,5]
   const iterable = arr.entries()
   console.log("Test2: a more complete test")
   const context = {a: 1}
   return Promise.resolve(iterable)
      .thenForEach<number>(doFn, context)
      .then((v: any) => console.log(v))
      .then(() => console.log("\n------------------------------------------\n"))
}

function doFn(item: number, i: number, context: any) {
   console.log(i, item)
}

function test3() {
   const arr = [1,2,3,4,5]
   const iterable = arr.entries()   
   console.log("Test3: resolving an object having arrOrIterable and context")
   const context = {a: 1}
   return Promise.resolve({arrOrIterable: iterable, context})
      .thenForEach<number>(doFn, context)
      .then((v: any) => console.log(v))
      .then(() => console.log("\n------------------------------------------\n"))
}

function test4() {
   const arr = [1,2,3,4,5]
   const iterable = arr.entries()
   console.log("Test4: returning false to break out of the loop.")
   return Promise.resolve(iterable)
      .thenForEach<number>((item: number, i) => {
         if (i === 2) return false
         console.log(i, item)
      })
      .catch((error: any) => console.log(error))
      .then(() => console.log("\n------------------------------------------\n"))
}