// The pattern of extending global or third party class has been copied from rxjs/add/operator in angular2

/*
function thenForEach<R>(doFn: (item?: any, index?: number, context?: any) => Promise<R>|R, context?: any): Promise<R|{value: R, context: any}> {
   return this.then((arr: Array<any>): Promise<R> => {
      if (!Array.isArray(arr)) throw "Error: thenForEach must receive an array."
      return arr.reduce((Promise: Promise<R>, item: any, index: number) => {
         return Promise.then(doFn.bind(null, item, index, context))
      }, this).then((value: R) => { return context ? {value, context} : value })
   })
}
*/

function thenForEach<T>(doFn: (item?: T, index?: number, context?: any) => void|Promise<void>, context?: any): Promise<any> {
   return this.then(validate).then(() => context)
   function validate(arrOrIterable: Array<any>|IterableIterator<any>): Promise<void> {
      let i = -1
      if (Array.isArray(arrOrIterable)) {
         return iterateArr<T>(arrOrIterable, i, context, doFn)
      } else if (typeof arrOrIterable[Symbol.iterator] === 'function') {
         return iterateIterable<T>(arrOrIterable, i, context, doFn)
      } else  {
         throw `Error: thenForEach must receive an array or iterable but ${typeof arrOrIterable} received.`
      }
   }
}

function iterateArr<T>(arr: Array<any>, i: number, context: any, doFn: (item?: T, index?: number, context?: any) => void|Promise<void>): Promise<void> {
   if (!arr.length) return
   const item = arr.shift()
   return Promise.resolve(<T>item)
      .then((item: T) => doFn(item, i+=1, context))
      .then(() => arguments.callee(arr, i, context, doFn))
}

function iterateIterable<T>(iterable: IterableIterator<T>, i: number, context: any, doFn: (item?: T, index?: number, context?: any) => void|Promise<void>): Promise<void> {
   const item = iterable.next()
   if (item.done) return
   return Promise.resolve(<T>item.value)
      .then((item: T) => doFn(item, i+=1, context))
      .then(() => arguments.callee(iterable, i, context, doFn))
}

Promise.prototype.thenForEach = thenForEach

// Extending interface to let Typescript compiler help us.
interface Promise<T> {
   thenForEach: typeof thenForEach
}