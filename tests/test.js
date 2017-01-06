(function (require, module) {

   var Promise = require("../index.js")

   // First way
   Promise.resolve({array: [1,2,3,4,5], context: {sum: 0}})
      .thenForEach({
         doThis: function (item, index, context) {
            context.sum += item
            return context
         },
         // Optional to pass onError
         onError: function (item, index, error) {
            console.log(error)
         }
      })
      .then(function (context) {
         console.log(context.sum)
      })

   // Second way
   Promise.resolve({array: [1,2,3,4,5], context: {sum: 0}})
      .thenForEach(
         function doThis(item, index, context) {
            context.sum += item
            return context
         }, 
         // Optional to pass onError
         function onError(item, index, error) {
            console.log(error)
         }
      )
      .then(function (context) {
         console.log(context.sum)
      })   

})(require, module)