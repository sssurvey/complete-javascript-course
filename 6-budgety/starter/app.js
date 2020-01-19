var BudgetController = (function () {
    return {}
})();

var UIController = (function () {

    const ADD_TYPE = 'add__type';
    const ADD_VALUE = 'add__value';
    const ADD_DESCRIPTION = 'add__description';

    return {
        /**
         * Return UI Input types:
         * This function will return the 3 input values from DOMs: add__type,
         * add__description and add__value.
         * @access public
         * Returns UI element DOMs as an object.
         * @return {{ type, description, value }}
         */
        getAddInputValues: function() {
            /**
             * @var {HTMLElement} addTypeDOM type:
             * "+" operator for increase
             * "-" operator for decrease
             */
            var addTypeDOM = document.getElementsByClassName(ADD_TYPE)[0];
            var valueDOM = document.getElementsByClassName(ADD_VALUE)[0];
            var addDescriptionDOM = document.getElementsByClassName(ADD_DESCRIPTION)[0];
            
            return {
                type: addTypeDOM.value,
                description: addDescriptionDOM.value,
                value: valueDOM.value,
            }
        }
    };
})();

var Controller = (function (budgetController, uIController) {
    
    var addButtonDOM = document.getElementsByClassName('add__btn')[0];

    addButtonDOM.addEventListener('click', addButtonOnClickListener);
    registerKeyPressListener(document);

    function registerKeyPressListener(document) {
        document.addEventListener('keypress', (event) => {
            if (event.keyCode === 13 || event.which === 13) {
                // invoke the add button on click
                addButtonDOM.click();
            }
        });
    }

    /**
     * Add onclick listeners for add related operations
     * @access private
     */
    function addButtonOnClickListener() {
        //TODO: 
        // 1. get the input data
        var addInputValues = uIController.getAddInputValues();

        // 2. Add item to the buddget controller
        // 3. Add the item to the UI
        // 4. Calculate the budget
        // 5. Display the budget on the UI

        // test:
        console.log("TODO!");
        console.log(addInputValues);
    }

    return {}

})(BudgetController, UIController);






// top level


