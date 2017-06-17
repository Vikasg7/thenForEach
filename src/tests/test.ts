/// <reference path="../index.d.ts" />

import { myPromise as Promise} from "../index"

const arr = [1,2,3,4,5]

Promise.resolve(arr)
   .thenForEach((item: number) => console.log(item))
   .then(() => console.log("done!"))