(function (require, module) {

   var Promise = require("promise")
   var forEach = require("../index.js")

   var length = 10000
   var arr = []
   // array.forEach(function (item) { arr.push(1) })
   var i
   for (i = 0; i < 1000000; i++) {
      arr.push(i)
   }

   // console.log(arr)

   var startTime = process.uptime()
   Promise.resolve({array: arr, context: 0})
      .then(forEach(function doThis(item, index, context) {
         if (index % 5 === 0) return Promise.reject(context)
         return context + 1
      }, function onCatch(context) {
         return context
      })).then(function (context) {
         console.log(context)
         console.log(process.uptime() - startTime)
      })

})(require, module)