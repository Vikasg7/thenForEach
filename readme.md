<h3>thenForEach</h3>
<hr>
<h4>Description</h4>
<p>
   * A prototype function for promise library to iterate over elements of resolved array, by chaining them one and after other with a `doThis` and `onError` function.
   * Syntax :-  
      ````javascript
         var Promise = require("thenForEach")
         Promise.resolve({array: [1,2,3,4], context: {}})
            .thenForEach(doThis, onError) 
      // OR .thenForEach({doThis: function () {}, onError: function () {}})
            .then(function (context) {})
      ````
   * `doThis` is resolved with `(item, index, context)`
   * `onError` is resolved with `(item, index, error)`
</p>

<p>Please check tests folder to know more about the usage.</p>