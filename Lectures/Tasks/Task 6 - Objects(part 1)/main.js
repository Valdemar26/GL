/**
 1. Traverse Tree
 *  Create a function that traverses all nodes of an object tree. Output should be formatted
 *
 */




/**
 2. Implementing Object.create
 *
 */



/**
 3. Extract Nested Object Reference
 * You are given a complex object that has many deeply nested variables.
 * You don't want to go the usual if obj.property == null route.
 * Create a prototype method that given a nested path, either return the value or undefined.
 *
 * let obj = {
 *           person: {
 *              name: 'joe',
 *               history: {
 *                   hometown: 'bratislava',
 *                   bio: {
 *                       funFact: 'I like fishing.'
 *                   }
 *              }
 *           }
 *       };
 *
 * obj.hash('person.name');                            // 'joe'
 * obj.hash('person.history.bio');                     // { funFact: 'I like fishing.' }
 * obj.hash('person.history.homeStreet');              // undefined
 * obj.hash('person.animal.pet.needNoseAntEater');     // undefined
 *
 */



/**
 4. Default configuration
 * A common pattern is for a function to take a configuration object as a parameter,
 * implementing defaults or throwing errors for any properties missing from the configuration.
 * One way to do this is like:
 *
 * function send(config) {
 *          if ( !config.url ) throw "No URL!";
 *
 *           config.method = config.method || "POST";
 *           config.data = config.data || {}
 *
 *           AJAX.send(config.url, config.data, config.method);
 *       }
 *
 * But the "||" operator doesn't work correctly for parameters that are allowed to be falsey.
 *
 * Your task is to create a defaults(obj, def) function which creates a new object with obj's properties, falling back on the properties of def when they aren't in obj.
 * You must also implement the mandatory(err) function. This will return an object that tells defaults to throw err if the property doesn't exist.
 * In other words, if mandatory("foo") is given as the default value for the key bar, and the user tries pass a config option that does not define bar,
 * then defaults should throw "foo" when called. This function would be used like so:
 *
 * function send(config) {
 *          config = defaults(config, {
 *               url: mandatory("No URL!"),
 *               method: "POST",
 *               data: {}
 *          });
 *
 *          Network.send(config.url, config.data, config.method);
 *      }
 *
 */



/**
 5. Mix Objects
 * Make a function that returns a new object, containing all of the properties of any objects passed in as parameters.
 * The returned object should include the first instance of each property seen on any parameter object,
 * and any other instance of that property should be ignored. Also, if any parameter is not an object, it should be ignored.
 *
 * mix( {a: 1, b: 2}, {c: 3} );                         // should === {a: 1, b: 2, c: 3}
 * mix( {a: 1, b: 2}, {c: 3}, {d: 4} );                 // should === {a: 1, b: 2, c: 3, d: 4}
 * mix( {a: 1, b: 2}, {a: 3, c: 3} );                   // should  === {a: 1, b: 2, c: 3}
 * mix( {a: false, b: null}, {a: true, b: 2, c: 3} );   // should  === {a: false, b: null, c: 3}
 */

/**
 6. Power .bind()
 * bind() returns a copy of the original function but this function will always be called in the specified context.
 * The problem is that you can't rebind another context any more. Your task is override the native
 * Function.prototype.bind method by a new one that will allow you to rebind context multiple times.
 *
 * let func = function () { return this.prop; };
 * let obj1 = { prop: 1 };
 * let obj2 = { prop: 2 };
 *
 * func = func.bind(obj1);
 * func();     // Will produce 1
 *
 * func = func.bind(obj2);
 * func();     // Will also produce 1
 */


