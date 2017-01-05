(function (require, module) {

   var Promise = require("promise")

   module.exports = function (then, onCatch) {
      return function (array) {
         if (!Array.isArray(array)) { context = array.context;  array = array.array }
         return array.reduce(function (Promise, item, index) {
            return Promise.then(then.bind(null, item, index)).catch(onCatch)
         }, Promise.resolve(context))
      }
   }

})(require, module)