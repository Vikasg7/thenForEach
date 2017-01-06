(function (require, module) {

   function thenForEach (doThis, onError) {
      if (doThis.doThis) { onError = doThis.onError; doThis = doThis.doThis} // Mapping arguments
      var Promise = this.constructor
      return this.then(function makeChainedPromise(array) {
         var resolve = Promise.resolve || Promise.when
         if (!Array.isArray(array)) { context = array.context;  array = array.array } // Mapping arguments
         return array.reduce(function iterator(Promise, item, index) {
            return Promise.then(doThis.bind(null, item, index)).catch(onError && onError.bind(null, item, index))
         }, resolve(context))
      })
   }

   module.exports = {
      thenForEach: thenForEach,
      extends: function (Promise) {
         Promise.prototype.thenForEach = thenForEach
         return Promise
      }
   }

})(require, module)