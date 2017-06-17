# thenForEach

- ### Intro  
   **thenForEach** is a NodeJs module that extends global `Promise` variable to provide a method `.thenForEach()` which returns a Promise chain to loop through each element of an `Array`.

- ### Install  
   `npm install git+https://github.com/Vikasg7/thenForEach.git`  

- ### Usage (in TypeScript)  
   For detailed usage, please check `src/tests/test.ts`.  
   ````javascript
   // This will extend global Promise Variable to include an extra method named .thenForEach
   import "thenForEach"

   const arr = [1,2,3,4,5]
   const context = {a: 1} // (optional)

   Promise.resolve(arr)
      .thenForEach<number|void|{value: number, context:any}>(doFn, context)
      .then((v: number|void|{value: number, context:any}) => console.log(v))

   function doFn(item: number, i: number, context: any) {
      console.log(i, item)
      if (i === arr.length - 1) return item // returning last value just to show chaining works.
   }

   ````