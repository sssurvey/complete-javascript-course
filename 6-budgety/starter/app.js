var BudgetController = (function () {

    const TRANSACTION_TYPE = {
        income: 'INC',
        expense: 'EXP'
    };

    /**
     * The data structure of the budget controller on all transaction items.
     * 
     * Every transaction user created will be added to this object. With the
     * epenses pushed to the @field expenses array, and income at @field income
     * array.
     * 
     * @name allTransactions
     * @access private
     */
    var allTransactions = {
            expenses: [],
            income: []
    }

    /**
     * The data structure that provide helpful functions to report income/expense
     * and totals.
     * 
     * This object contains 3 functions that can provide netIncome, netExpense
     * and netTotals, calculated based on allTransactions
     * 
     * @name summary
     * @access private
     */
    var summary = {
        /**
         * This function provide a sum of all expenses.
         * 
         * @name summary.getExpenseTotals
         * @access private
         * @return {Number}
         */
        getExpenseTotals: () => {
            var sumOfExpenses = 0;
            allTransactions.expenses.forEach((transaction) => {
                if (transaction.transactionType === TRANSACTION_TYPE.expense) {
                    sumOfExpenses += transaction.amount;
                }
            });
            return sumOfExpenses;
         },

        /**
         * This function provide a sum of all income.
         *
         * @name summary.getIncomeTotals
         * @access private
         * @return {Number}
         */
        getIncomeTotals: () => {
            var sumOfIncome = 0;
            allTransactions.expenses.forEach((transaction) => {
                if (transaction.transactionType === TRANSACTION_TYPE.income) {
                    sumOfIncome += transaction.amount;
                }
            });
            return sumOfIncome;
         },

        /**
         * This function provide a sum of all transactions.
         *
         * @name summary.getTotals
         * @access private
         * @return {Number}
         */
        getTotals: () => {
            return this.getIncomeTotals() - this.getExpenseTotals();
        }
    }

    /**
     * This is the constructor for Transaction class.
     * 
     * The constructor will generate a Transaction instance. A transaction can 
     * represent both an Expense or a Income type. Which represented the spending
     * and income of a budget.
     * 
     * @class @name Transaction
     * @access private
     * 
     * @param {TRANSACTION_TYPE} transactionType 
     * @param {String} title 
     * @param {String} description 
     * @param {Number} amount 
     * 
     * @returns {Object} transaction
     */
    var Transaction = function (transactionType, title, description, amount) {
        this.transactionType = transactionType;
        this.title = title;
        this.description = description;
        this.amount = amount;
        this.id = this.getId();
    };
    
    /**
     * This is a method of @class Transaction.
     * 
     * A unique ID will be created for transaction object lazily when this method
     * is invoked. If the method is invoked before on a object in constructor, 
     * the old value will be returned as the id.
     * 
     * @name getId
     * @access private
     * @memberof Transaction
     * 
     * @returns {String} id
     */
    Transaction.prototype.getId = function () {
        if (this.id === undefined) {
            this.id = generateId(this);
            return this.id;
        }
        else return this.id;
        function generateId(object) {
            var date = new Date();
            return ((object.transactionType === TRANSACTION_TYPE.EXPENSE ? 1 : 0) +
                (object.title.length) +
                (object.description.length) +
                (object.amount) +
                (date.getTime() + date.getMilliseconds()) +
                (Math.floor(Math.random() * 100)));
        }
    };

    // var test = new Transaction(TRANSACTION_TYPE.income, 'JJ', 'haha', 50);
    // var test1 = new Transaction(TRANSACTION_TYPE.income, 'JJ', 'haha', 50);
    // var test2 = new Transaction(TRANSACTION_TYPE.income, 'JJ', 'haha', 50);
    // var test3 = new Transaction(TRANSACTION_TYPE.income, 'JJ', 'haha', 50);
    // console.log(test);
    // console.log(test1);
    // console.log(test.getId());
    // console.log(test1.getId());

    return {
        //TODO: Add API for add transaction
        addExpense: function () {

        },

        addIncome: function () {

        },

        getTotalsReport: function () {
            return summary.getTotals();
        },

        getExpenseTotals: function () {
            return summary.getExpenseTotals();
        },

        getIncomeTotals: function () {

        }
    }
})();

var UIController = (function () {

    const ADD_TYPE = 'add__type';
    const ADD_BUTTON = 'add__btn';
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
         *
         * Details:
         * @var {HTMLElement} addTypeDOM type:
         * "+" operator for increase
         * "-" operator for decrease
         */
        getAddInputValues: function() {
            var addTypeDOM = document.getElementsByClassName(ADD_TYPE)[0];
            var valueDOM = document.getElementsByClassName(ADD_VALUE)[0];
            var addDescriptionDOM = document.getElementsByClassName(ADD_DESCRIPTION)[0];
            
            return {
                type: addTypeDOM.value,
                description: addDescriptionDOM.value,
                value: valueDOM.value,
            }
        },
        /**
         * Set onclick listner callbacks for ADD button
         * This function will set the callback for the add button to the function
         * that we passed in as param
         * @access public
         * @param {function} listenerCallback
         */
        setAddButtonOnClickListener: function (listenerCallback) {
            var addButtonDOM = document.getElementsByClassName(ADD_BUTTON)[0];
            addButtonDOM.addEventListener('click', listenerCallback);
        },
        /**
         * Set on keypress callback for the ENTER key
         * This functrion will set the document on enter pressed callback to the
         * function we passed in as param
         * @access public
         * @param {function} enterKeyPressListenerCallback 
         */
        setDocumentEnterKeyPressEventListener: function (enterKeyPressListenerCallback) {
            document.addEventListener('keypress', (event) => {
                if (event.keyCode === 13 || event.which === 13) {
                    enterKeyPressListenerCallback();
                }
            });
        }
    };
})();

var Controller = (function (budgetController, uIController) {

    /**
     * Setup all the event listeners
     * @access private
     */
    function setUpEventListeners() {
        uIController.setAddButtonOnClickListener(handleAddExpense);
        UIController.setDocumentEnterKeyPressEventListener(handleAddExpense);
    }

    /**
     * Add onclick listeners for add related operations
     * @access private
     */
    function handleAddExpense() {
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
    
    return {
        /**
         * This is the init function of the Controller module
         * EventListeners will be set up here
         * @access public
         */
        init: function () {
            setUpEventListeners();
        }
    }

})(BudgetController, UIController);

// top level
Controller.init();
