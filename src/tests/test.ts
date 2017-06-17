// this will extend the global Promise variable
import "../index"

const arr = [1,2,3,4,5]
test1().then(test2).then(test3).then(test4).then(test5)

function test1() {
   console.log("Test1: Looping through all the items.")
   return Promise.resolve(arr)
      .thenForEach<number, void>((item: number) => console.log(item))
      .then(() => console.log("------------------------------------------\n"))
}

function test2() {
   console.log("Test2: Throwing error while looping through and catching with single catch call at the end of the chain.")
   return Promise.resolve(arr)
      .thenForEach<number, void>((item: number, i) => {
         if (i === 4) throw "Some Error"
         console.log(item)
      })
      .catch((error) => console.log(error))
      .then(() => console.log("------------------------------------------\n"))
}

function test3() {
   console.log("Test3: Throwing error while looping through and catching it within the doFn, so that loop gets complete.")
   return Promise.resolve(arr)
      .thenForEach<number, void>(function doFn(item: number, i) {
         console.log(item)
         return Promise.resolve(() => {
               if (i === 4) throw "Some Error"
            })
            .catch((error) => console.log(error))
      })
      .then(() => console.log("------------------------------------------\n"))
}

function test4() {
   console.log("Test4: Passing context as second argument, using it inside doFn and then getting it back at the end of chain.")
   return Promise.resolve(arr)
      .thenForEach<string, number>((item: number, i, context) => i === arr.length - 1 ? item : null, {a:1})
      .then((obj: {value: number, context: any}) => console.log(obj))
      .then(() => console.log("------------------------------------------\n"))

}

function test5() {
   console.log("Test5: returning item in doFn when last index is reached and passing to next function in the chain.")
   return Promise.resolve(arr)
      .thenForEach<number, void>((item: number, i) => i === arr.length - 1 ? item : null)
      .then((value) => console.log(value))
}
