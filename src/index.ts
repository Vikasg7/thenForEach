// The pattern of extending global or third party class has been copied from rxjs/add/operator in angular2

function thenForEach<R>(doFn: (item?: any, index?: number, context?: any) => R, context?: any): Promise<R|{value: R, context: any}> {
   return this.then((arr: Array<any>): Promise<R> => {
      if (!Array.isArray(arr)) throw "Error: thenForEach must receive an array."
      return arr.reduce((Promise: Promise<R>, item: any, index: number) => {
         return Promise.then(doFn.bind(null, item, index, context))
      }, this).then((value: R) => { return context ? {value, context} : value })
   })
}

Promise.prototype.thenForEach = thenForEach

// Extending interface to let Typescript compiler help us.
interface Promise<T> {
   thenForEach: typeof thenForEach
}