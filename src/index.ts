export class myPromise<T> extends Promise<T> {
   thenForEach<R>(doFn: (item?: any, index?: number, context?: any) => R, context?: any): Promise<R> {
      return this.then((arr: T): Promise<R> => {
         if (!Array.isArray(arr)) throw "Error: thenForEach must receive an array."
         return arr.reduce((Promise: Promise<R>, item: any, index: number) => {
            return Promise.then(doFn.bind(null, item, index, context))
         }, this)
      })
   }
}