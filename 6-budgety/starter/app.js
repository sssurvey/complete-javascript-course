var BudgetController = (function () {
    return {}
})();

var UIController = (function () {
    return {}
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

    function addButtonOnClickListener() {
        console.log("TODO!")
        //TODO: 
        // 1. get the input data
        // 2. Add item to the buddget controller
        // 3. Add the item to the UI
        // 4. Calculate the budget
        // 4. Display the budget on the UI
    }

    return {}
    
})(BudgetController, UIController);






// top level


