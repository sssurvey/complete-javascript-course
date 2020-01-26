var BudgetController = (function () {

    const TRANSACTION_TYPE = {
        income: 'INC',
        expense: 'EXP'
    }

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
        income: [],
        expense: [] 
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
            if (allTransactions.expense.length > 0) {
                allTransactions.expense.forEach((transaction) => {
                    if (transaction.transactionType === TRANSACTION_TYPE.expense) {
                        sumOfExpenses += transaction.amount;
                    }
                });
            }
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
            if (allTransactions.income.length > 0) {
                allTransactions.income.forEach((transaction) => {
                    if (transaction.transactionType === TRANSACTION_TYPE.income) {
                        sumOfIncome += transaction.amount;
                    }
                });
            }
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
            var incomeTotal = summary.getIncomeTotals();
            var expenseTotals = summary.getExpenseTotals();
            return incomeTotal - expenseTotals;
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
     * @param {String} description 
     * @param {Number} amount 
     * 
     * @returns {Object} transaction
     */
    var Transaction = function (transactionType, description, amount) {
        this.transactionType = transactionType;
        this.description = description;
        this.amount = Number(amount);
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
                (object.description.length) +
                (object.amount) +
                (date.getTime() + date.getMilliseconds()) +
                (Math.floor(Math.random() * 100)));
        }
    };

    return {
        /**
         * Add a income type transaction.
         * 
         * This function will create a new Transaction with type Income and store
         * it in the allTransactions.income field.
         * @name addExpense
         * @access public
         * 
         * @param {String} description 
         * @param {Number} amount 
         * 
         * @returns {Object} expense transaction object
         */
        addExpense: function (description, amount) {
            var expense = new Transaction(TRANSACTION_TYPE.expense,
                description,
                amount);
            allTransactions.expense.push(expense);
            return expense;
        },

        /**
         * Add a expense type transaction.
         * 
         * This function will create a new Transaction with type Expense and store
         * it in the allTransactions.income field.
         * @name addIncome
         * @access public
         * 
         * @param {String} description 
         * @param {String} amount 
         * 
         * @returns {Object} income transaction object
         */
        addIncome: function (description, amount) {
            var income = new Transaction(TRANSACTION_TYPE.income,
                description,
                amount);
            allTransactions.income.push(income);
            return income;
        },

        /**
         * Generate a sum of all transactions.
         * 
         * This function will return the sum of all transactions and return it as
         * a number.
         * 
         * @name getTotalsReport
         * @access public
         * 
         * @returns {Number} sum of all transactions' amounts
         */
        getTotalsReport: function () {
            return summary.getTotals();
        },

        /**
         * Generate a sum of all expenses.
         *
         * This function will return the sum of all expenses and return it as
         * a number.
         *
         * @name getExpenseTotals
         * @access public
         *
         * @returns {Number} sum of all expenses' amounts
         */
        getExpenseTotals: function () {
            return summary.getExpenseTotals();
        },

        /**
         * Generate a sum of all incomes.
         *
         * This function will return the sum of all incomes and return it as
         * a number.
         *
         * @name getIncomeTotals
         * @access public
         *
         * @returns {Number} sum of all incomes' amounts
         */
        getIncomeTotals: function () {
            return summary.getIncomeTotals();
        },

        /**
         * Check transaction is income or not
         * 
         * This function will return a boolean value representing if the transaction
         * is income or not
         * 
         * @name IsIncomeTransction
         * @access public
         * 
         * @param {String} TRANSACTION_TYPE
         * 
         * @returns {boolean} isIncome?
         */
        IsIncomeTransction: function (transactionType) { 
            return transactionType === TRANSACTION_TYPE.income;
        } 
    }
})();

var UIController = (function () {

    const ADD_TYPE = 'add__type';
    const ADD_BUTTON = 'add__btn';
    const ADD_VALUE = 'add__value';
    const ADD_DESCRIPTION = 'add__description';

    const EXPENSES_LIST = 'expenses__list';
    const INCOME_LIST = 'income__list';

    const ID_PLACE_HOLDER = "%id%";
    const DESCRIPTION_PLACE_HOLDER = "%description%";
    const AMOUNT_PLACE_HOLDER = "%amount%";

    const INCOME_LINE_ITEM_HTML = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%amount%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    const EXPENSE_LINE_ITEM_HTML = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%amount%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

    /**
     * Add a expense transaction to UI
     * 
     * This function will expend the expense list on ui
     * 
     * @name addExpenseLineItem
     * @access private
     * 
     * @param {String} description 
     * @param {String} amount 
     * @param {Number} id 
     */
    function addExpenseLineItem(description, amount, id) {
        var html = EXPENSE_LINE_ITEM_HTML;
        html = html
            .replace(ID_PLACE_HOLDER, id)
            .replace(DESCRIPTION_PLACE_HOLDER, description)
            .replace(AMOUNT_PLACE_HOLDER, amount);
        var expensesListDom = document.getElementsByClassName(EXPENSES_LIST)[0];
        expensesListDom.insertAdjacentHTML('afterbegin', html);
    }

    /**
     * Add an income transaction to UI
     * 
     * This function will expend the income list on ui
     * 
     * @name addIncomeLineItem
     * @access private
     * 
     * @param {String} description 
     * @param {String} amount 
     * @param {Number} id 
     */
    function addIncomeLineItem(description, amount, id) {
        var html = INCOME_LINE_ITEM_HTML;
        html = html
            .replace(ID_PLACE_HOLDER, id)
            .replace(DESCRIPTION_PLACE_HOLDER, description)
            .replace(AMOUNT_PLACE_HOLDER, amount);
        var incomeListDom = document.getElementsByClassName(INCOME_LIST)[0];
        incomeListDom.insertAdjacentHTML('afterbegin', html);
    }
    
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
         * @var {boolean} true for income
         * @var {boolean} false for expense
         */
        getAddInputValues: function() {
            var addTypeDOM = document.getElementsByClassName(ADD_TYPE)[0];
            var valueDOM = document.getElementsByClassName(ADD_VALUE)[0];
            var addDescriptionDOM = document.getElementsByClassName(ADD_DESCRIPTION)[0];
            
            return {
                isIncome: (addTypeDOM.value === 'inc'),
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
        },
        /**
         * Add a transaction to the Expense column
         * 
         * This function will manipulate the dom to update the expense column to
         * display expense transactions
         * 
         * @name addNewExpenseLineItem
         * @access public
         */
        addTransactionLineItem: function (isIncome, description, amount, id) {
            switch (isIncome) {
                case true:
                    addIncomeLineItem(description, amount, id);
                    break;
                case false:
                    addExpenseLineItem(description, amount, id);
                    break;
                default:
                    console.log("ERROR")
            }
        },

        /**
         * Clears the input fileds after the user added a transaction
         * 
         * @name clearInputFields
         * @access public
         */
        clearInputFields: function() {
            var fields = document.querySelectorAll('.' + ADD_DESCRIPTION + ', ' 
            + '.' + ADD_VALUE);
            // convert list to array;
            var fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach((item) => { 
                item.value = ''; 
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
     * Save transaction to budget controller based on the transaction type
     * 
     * Save transaction as Income or Expense based on isIncome field of the 
     * inputObject
     * 
     * @name saveInputAsTransaction
     * @access private
     * 
     * @param {Object} inputObject 
     * @var {boolean} inputObject.isIncome true for income, false for expense
     * @var {String} inputObject.description
     * @var {Number} inputObject.value
     * 
     * @returns {Object} transaction object income/expense
     */
    function saveInputAsTransaction(inputObject) {
        if (inputObject.isIncome) {
            return budgetController
                .addIncome(inputObject.description, inputObject.value);
        } else {
            return budgetController
                .addExpense(inputObject.description, inputObject.value);
        }
    }

    /**
     * Add onclick listeners for add related operations
     * @name handleAddExpense
     * @access private
     */
    function handleAddExpense() {
        //TODO: 
        // 1. get the input data
        var addInputValues = uIController.getAddInputValues();
        // 2. Add item to the buddget controller
        var savedTransaction = saveInputAsTransaction(addInputValues);
        // 3. Add the item to the UI
        uIController.addTransactionLineItem(
            budgetController.IsIncomeTransction(savedTransaction.transactionType),
            savedTransaction.description,
            savedTransaction.amount,
            saveInputAsTransaction.id);
        // 4. Clear the fields
        uIController.clearInputFields();
        // 5. Calculate the budget
        // 6. Display the budget on the UI

        // test:
        console.log("TODO!");
        // console.log("total = " + budgetController.getTotalsReport());
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
