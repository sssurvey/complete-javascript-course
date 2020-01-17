/**
 * Here is a demo of how to create a module pattern in JavaScript
 * 
 * What this pattern is based on is:
 * - IIFE pattern
 * 
 * Take a look at the code below.
 * Intro: We created a module called budgetController. And we kept all the data
 * private in the module and exposed publicAPI -> publicIncrease23()
 */
var BudgetController = (function () {

    var x = 23;

    var add = function (a) {
        return x + a;
    }

    return {
        publicIncrease23: function (b) {
            console.log(add(b));
        }
    }

})();

var UIController = (function () {
    // some code
    return {
        test: function() {
            console.log('UI controller called');
        }
    }
})();

/**
 * Notice this module is a bit different, here notice that we have 2 params.
 * The reason is that we want to use this Module to connect the UIController
 * and the BudgetController, therefore, you can understand it has this module
 * has dependency on the other two module. And though we can use the other 2 
 * modules directly in the IIFE here, it is a better practice to have those
 * module be passed in as params, to achieve DI, and less dependencies
 */
var Controller = (function (budgetController, uIController) {
    
    budgetController.publicIncrease23(23);
    uIController.test();

    return {
        test: function() {
            console.log('Controller called');
        }
    }

})(BudgetController, UIController);

// top level
BudgetController.publicIncrease23(3);
UIController.test();
Controller.test();


