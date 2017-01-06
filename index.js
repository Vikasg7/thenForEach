(function (require, module) {

   var Promise = require("promise")

   Promise.prototype.thenForEach = function (doThis, onError) {
      if (doThis.doThis) { onError = doThis.onError; doThis = doThis.doThis} // Mapping arguments
      return this.then(function makeChainedPromise(array) {
         if (!Array.isArray(array)) { context = array.context;  array = array.array } // Mapping arguments
         return array.reduce(function iterator(Promise, item, index) {
            return Promise.then(doThis.bind(null, item, index)).catch(onError && onError.bind(null, item, index))
         }, Promise.resolve(context))
      })
   }

   module.exports = Promise

})(require, module)