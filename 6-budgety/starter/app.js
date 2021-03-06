const EXCEPTIONS = {
    INPUT_EXCEPTION: "Invalid Input From User"
};

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
        },

        /**
         * This function provide a percentage calucation of expense/total
         * 
         * @name getExpensePercentage
         * @access private
         * 
         * @return {Float}
         */
        getExpensePercentage: () => {
            var incomeTotal = summary.getIncomeTotals();
            if (incomeTotal === 0) {
                return undefined;
            } else {
                var expenseTotals = summary.getExpenseTotals();
                var propotion = expenseTotals / incomeTotal;
                return propotion;
            }
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

    /**
     * Remove the transaction from all transaction based on id
     * 
     * This function will use the ID to loop through all transactions and then
     * remove the transaction that has the matching id.
     * 
     * @name removeTransactionFromList
     * @access public
     * 
     * @param {String} id 
     */
    function removeTransactionFromList(id) {
        allTransactions.expense.forEach((item) => {
            if (item.id === +id) removeItem(allTransactions.expense, item);
            return;
        });
        allTransactions.income.forEach((item) => {
            if (item.id === +id) removeItem(allTransactions.income, item);
            return;
        });

        function removeItem(transactionList, item) {
            var index = transactionList.indexOf(item);
            transactionList.splice(index, 1);
        }
    }

    /**
     * Returns a map of expense id, with percentage
     * 
     * Map <id: String, percentage: Float> is returned, the map is consist of each
     * expense transaction's id and their amount/totalIncome
     * 
     * @name calculateIndividuleExpensePercentageMap
     * @access public
     * 
     * @returns {Map<String, Float>}
     */
    function calculateIndividuleExpensePercentageMap() {
        var incomeTotal = summary.getIncomeTotals();
        var transactionIdPercentMap = new Map();
        allTransactions.expense.forEach((item) => {
            if (incomeTotal > 0) {
                var percentage = item.amount / incomeTotal;
                transactionIdPercentMap.set(item.id + "", percentage);
            } else {
                transactionIdPercentMap.set(item.id + "", undefined);
            }
        });
        return transactionIdPercentMap;
    }

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
         * Remove transaction with this id from all transactions
         * 
         * This function will call the private function to remove the transaction
         * that has the match id. This way it is excluded from the budget.
         * 
         * @name removeTransaction
         * @access public
         * 
         * @param {String} id 
         */
        removeTransaction: function (id) {
            removeTransactionFromList(id);
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
         * Return a percentage of the expense in String
         * 
         * @name getExpensePercentage
         * @access public
         * 
         * @returns {Float} expense percentage // can return undefined
         */
        getExpensePercentage: function () {
            return summary.getExpensePercentage();
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
        },

        /**
         * Return a map of all expense transactions and its percentage to income
         * 
         * This function will return a map of expense transaction id, and its
         * amount / totalIncome as a percentage representation
         * 
         * @name getCalculatedIndividuleExpensePercentageMap
         * @access public
         * 
         * @returns {Map<id: String, percent: Number>}
         */
        getCalculatedIndividuleExpensePercentageMap: function () {
            return calculateIndividuleExpensePercentageMap();
        },

        /**
         * Returns the percentage representation of value / totalIncome
         * 
         * @name calculateExpensePercentage
         * @access public
         * 
         * @param {Number} value 
         */
        calculateExpensePercentage: function (value) {
            return value / summary.getIncomeTotals();
        }
    }
})();

var UIController = (function () {

    const MONETARY_FORMAT_INFO = {
        DECIMAL: 2,
        LOCALE: 'en-US',
        UNIT: 'USD'
    };

    const EXPENSE = 'exp';

    const ADD_TYPE = 'add__type';
    const ADD_BUTTON = 'add__btn';
    const ADD_VALUE = 'add__value';
    const ADD_DESCRIPTION = 'add__description';

    const BUDGET_VALUE_TITLE = 'budget__value';
    const BUDGET_INCOME_VALUE = 'budget__income--value';
    const BUDGET_EXPENSE_VALUE = 'budget__expenses--value';
    const BUDGET_EXPENSE_PERCENT = 'budget__expenses--percentage';
    const BUDGET_CURRENT_MONTH = 'budget__title--month';

    const EXPENSES_LIST = 'expenses__list';
    const INCOME_LIST = 'income__list';

    const ID_PLACE_HOLDER = "%id%";
    const DESCRIPTION_PLACE_HOLDER = "%description%";
    const AMOUNT_PLACE_HOLDER = "%amount%";
    const TRANSACTION_EXPENSE_PERCENTAGE = "%expense_percentage%";

    const INCOME_LINE_ITEM_HTML = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%amount%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    const EXPENSE_LINE_ITEM_HTML = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%amount%</div><div class="item__percentage">%expense_percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

    /**
     * This function will validate the transaction fields we passed in
     * 
     * If the transaction object has isIncome that is true or false and description
     * not equals to empty or null or undefined etc and if the amount is not equal
     * to zero and is a number than the object passed the validation
     * 
     * @name isTranasctionItemValidate
     * @access private
     * 
     * @param {Boolean} isIncome
     * @param {String} description
     * @param {Number} value
     * 
     * @returns {Boolean} isValid
     */
    function isTranasctionItemValidate(isIncome, description, value) {

        var transactionItem = {
            isIncome: isIncome,
            description: description,
            value: value
        }

        if (transactionItem.isIncome === true
            || transactionItem.isIncome === false) {
            // no-op
        } else return false;

        if (transactionItem.description) {
            // no-op
        }
        else return false;

        if (transactionItem.value === transactionItem.value
            && transactionItem.value > 0) {
            // no-op
        } else {
            return false;
        }

        return true;
    }

    /**
     * This function formats number to monetary string
     * 
     * Takes the raw representation of amount of money in Number returns a string
     * representation of the amount with specified unit and decimal points.
     * 
     * @name monetaryformat
     * @access private
     * 
     * @param {Number} amount 
     * 
     * @return {String} money amount $XX
     */
    function monetaryformat(amount) {
        var numberFormatter = new Intl.NumberFormat(MONETARY_FORMAT_INFO.LOCALE,
            {
                style: 'currency',
                currency: MONETARY_FORMAT_INFO.UNIT,
                minimumFractionDigits: MONETARY_FORMAT_INFO.DECIMAL
            });
        return numberFormatter.format(amount);
    }

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
    * @param {Float} rawPercentage
    */
    function addExpenseLineItem(description, amount, id, rawPercentage) {
        var html = EXPENSE_LINE_ITEM_HTML;
        html = html
            .replace(ID_PLACE_HOLDER, id)
            .replace(DESCRIPTION_PLACE_HOLDER, description)
            .replace(AMOUNT_PLACE_HOLDER, monetaryformat(amount))
            .replace(TRANSACTION_EXPENSE_PERCENTAGE, floatPercentageFormatter(rawPercentage));

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
            .replace(AMOUNT_PLACE_HOLDER, monetaryformat(amount));
        var incomeListDom = document.getElementsByClassName(INCOME_LIST)[0];
        incomeListDom.insertAdjacentHTML('afterbegin', html);
    }

    /**
     * Updates the percentage UI of expesnse in total budget
     * 
     * @param {String} expensePercentage 
     */
    function handleExpenseSummaryPercentage(expensePercentage) {
        var budgetExpensePercentDOM = document
            .getElementsByClassName(BUDGET_EXPENSE_PERCENT)[0];
        if (expensePercentage === undefined) {
            budgetExpensePercentDOM.style.visibility = "hidden";
        } else {
            budgetExpensePercentDOM.style.visibility = "visible";
            budgetExpensePercentDOM.textContent = expensePercentage;
        }
    }

    /**
     * Format raw float percentage representation to string representation
     * 
     * Takes 2 params, one is the raw float percentage, the other the fixedRange.
     * The fixedRange param will determine the decimal points of the formatted
     * percentage:
     * 
     * i.e: floatPercentage = 18.030001, fixedRange = 2 will return 18.03%
     * i.e: floatPercentage = 18.030001, fixedRange = 1 will return 18.0%
     * i.e: floatPercentage = 18.030001, fixedRange = 0 will return 18%
     * 
     * @param {Float} floatPercentage 
     * @param {Number} fixedRange 
     */
    function floatPercentageFormatter(floatPercentage, fixedRange) {
        if (fixedRange === undefined) {
            return (floatPercentage * 100).toFixed(1) + '%';
        } else {
            return (floatPercentage * 100).toFixed(fixedRange) + '%';
        }
    }

    /**
     * Update the percentage for each individule expense transactions
     * 
     * Takes in an ID and formatted  percentage string then use the ID to locate
     * the DOM of expense transaction then update them individuly to have the
     * percentage displayed, if the percentage string is undefined, then hide the
     * percentage tag.
     * 
     * @name refreshIndividuleExpensePercentageById
     * @access private
     * 
     * @param {String} id 
     * @param {String} formattedPercentage
     */
    function refreshIndividuleExpensePercentageById(id, formattedPercentage) {
        var transactionDOM = document.getElementById(id);
        var node = transactionDOM.childNodes[1].childNodes[1];
        if (formattedPercentage !== undefined) {
            node.style.display = 'block';
            node.textContent = formattedPercentage;
        } else {
            node.style.display = 'none';
        }
    }

    return {
        /**
         * Return UI Input types:
         * 
         * This function will return the 3 input values from DOMs: add__type,
         * add__description and add__value. If the transaction object from user
         * input does not pass validation, then we throw an error ''
         * @access public
         * Returns UI element DOMs as an object.
         * @return {{ type, description, value }}
         * @throws {EXCEPTIONS.INPUT_EXCEPTION}
         *
         * Details:
         * @var {HTMLElement} addTypeDOM type:
         * @var {boolean} true for income
         * @var {boolean} false for expense
         */
        getAddInputValues: function () {
            var addTypeDOM = document.getElementsByClassName(ADD_TYPE)[0];
            var valueDOM = document.getElementsByClassName(ADD_VALUE)[0];
            var addDescriptionDOM = document.getElementsByClassName(ADD_DESCRIPTION)[0];
            var transaction = {
                isIncome: (addTypeDOM.value === 'inc'),
                description: addDescriptionDOM.value,
                value: parseFloat(valueDOM.value),
            };
            if (isTranasctionItemValidate(
                transaction.isIncome,
                transaction.description,
                transaction.value
            )) return transaction;
            else throw EXCEPTIONS.INPUT_EXCEPTION;
        },

        /**
         * Adds a on change listener to the add type button
         * 
         * When it is adding expense transaction the add button will be red, when
         * it is adding income transactions the add button would be green.
         * 
         * @name registerAddTransactionColorChangeHandler
         * @access public
         */
        registerAddTransactionColorChangeHandler: function () {
            var addDescriptionDOM = document.getElementsByClassName(ADD_DESCRIPTION)[0];
            var addValueDOM = document.getElementsByClassName(ADD_VALUE)[0];
            var addTypeDOM = document.getElementsByClassName(ADD_TYPE)[0];
            var addButtonDOM = document.getElementsByClassName(ADD_BUTTON)[0];
            addTypeDOM.addEventListener('change', (event) => {
                if (event.target.value === EXPENSE) {
                    addButtonDOM.classList.add('red')
                    addDescriptionDOM.classList.add('red-focus');
                    addValueDOM.classList.add('red-focus');
                    addTypeDOM.classList.add('red-focus');
                } else {
                    addButtonDOM.classList.remove('red');
                    addDescriptionDOM.classList.remove('red-focus');
                    addValueDOM.classList.remove('red-focus');
                    addTypeDOM.classList.remove('red-focus');
                }
            });
        },
        /**
         * Set onclick listner callbacks for ADD button
         * 
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
         * Set onclick listner callbacks for Delete button in line item
         * 
         * @name setAddButtonOnClickListener
         * @access public
         * 
         * @param {function} listenerCallback
         */
        setItemDeleteButtonListener: function (listenerCallback) {
            var incomeListDOM = document.getElementsByClassName(INCOME_LIST)[0];
            var expenseListDOM = document.getElementsByClassName(EXPENSES_LIST)[0];
            incomeListDOM.addEventListener('click', listenerCallback);
            expenseListDOM.addEventListener('click', listenerCallback);
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
         * 
         * @param {Boolean} isIncome
         * @param {String} description
         * @param {Number} amount
         * @param {Number} id
         * @param {Float} rawPercentage
         */
        addTransactionLineItem: function (isIncome, description, amount, id, rawPercentage) {
            switch (isIncome) {
                case true:
                    addIncomeLineItem(description, amount, id);
                    break;
                case false:
                    addExpenseLineItem(description, amount, id, rawPercentage);
                    break;
                default:
                    console.log("ERROR")
            }
        },

        /**
         * This function will take an id that represent the line item DOM ID
         * then we will remove all the HTML code for that HTML element
         * 
         * @name removeTransactionLineItem
         * @access public
         * 
         * @param {String} id 
         */
        removeTransactionLineItem: function (id) {
            var transactionLineDOM = document.getElementById(id);
            var parentNode = transactionLineDOM.parentNode;
            parentNode.removeChild(transactionLineDOM);
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
        },

        /**
         * Refresh the budget descriptions based on passed in values
         * 
         * This function will takes refresh the values for the total budget, income
         * budget, expenseBudget and the expense percentage and update the UI.
         * 
         * @name refreshBudget
         * @access
         * 
         * @param {Number} totalBudget 
         * @param {Number} incomeBudget 
         * @param {Number} expenseBudget 
         * @param {Float} expensePercentage // Or undefined
         */
        refreshBudget: function (totalBudget, incomeBudget, expenseBudget,
            expensePercentage) {
            var budgetValueTitleDOM = document
                .getElementsByClassName(BUDGET_VALUE_TITLE)[0];
            var budgetIncomeValueDOM = document
                .getElementsByClassName(BUDGET_INCOME_VALUE)[0];
            var budgetExpenseValueDOM = document
                .getElementsByClassName(BUDGET_EXPENSE_VALUE)[0];

            budgetValueTitleDOM.textContent = monetaryformat(totalBudget);
            budgetIncomeValueDOM.textContent = monetaryformat(incomeBudget);
            budgetExpenseValueDOM.textContent = monetaryformat(expenseBudget);

            handleExpenseSummaryPercentage(
                expensePercentage === undefined ? undefined : floatPercentageFormatter(expensePercentage, 0));
        },

        /**
         * This function will update all expense line items percentage
         * 
         * Takes a transaction <id, percent> map, calculated from BudgetController
         * then use the id to find all expense transaction and update its percentage
         * using the percentage provided from the map. If the percentage is undefined
         * then hides all the expense line item percentages.
         * 
         * @name refreshExpenseItemPercentageById
         * @access public
         * 
         * @param {Map<id: String, percentage: Number>} transactionIdPercentageMap 
         */
        refreshExpenseItemPercentageById: function (transactionIdPercentageMap) {
            transactionIdPercentageMap.forEach((percentage, id) => {
                refreshIndividuleExpensePercentageById(id, 
                    percentage === undefined ? undefined : floatPercentageFormatter(percentage, 0));
            });
        },

        /**
         * Set the current month as the current month for aviliable budget month
         * 
         * @name setCurrentDateForDisplay
         * @access public
         */
        setCurrentDateForDisplay: function () {
            var date = new Date();
            var monthArr = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            document.getElementsByClassName(BUDGET_CURRENT_MONTH)[0]
                .textContent = monthArr[date.getMonth()];
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
        uIController.setDocumentEnterKeyPressEventListener(handleAddExpense);
        uIController.setItemDeleteButtonListener(handleTransactionDeleteButtonClick);
        uIController.registerAddTransactionColorChangeHandler();
    }

    /**
     * Callback function for the line transaction item delete button press
     * 
     * Will traverse the DOM and delete the line transaction based on the id.
     * 
     * @name handleTransactionDeleteButtonClick
     * @access private
     * 
     * @param {click} event 
     */
    function handleTransactionDeleteButtonClick(event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        uIController.removeTransactionLineItem(id);
        budgetController.removeTransaction(id);
        refreshBudget();
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
     * @var {Float} inputObject.value
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
     * Refresh all budget related UI
     * 
     * This function will refresh all budget related UIs
     * 1. Budget reports at the top of the page
     * 2. each individule expense transaction percentages
     * 
     * @name refreshBudget
     * @access private
     */
    function refreshBudget() {
        uIController.refreshBudget(
            budgetController.getTotalsReport(),
            budgetController.getIncomeTotals(),
            budgetController.getExpenseTotals(),
            budgetController.getExpensePercentage()
        )
        uIController.refreshExpenseItemPercentageById(
            budgetController.getCalculatedIndividuleExpensePercentageMap()
        );
    }

    /**
     * Add onclick listeners for add related operations
     * @name handleAddExpense
     * @access private
     */
    function handleAddExpense() {
        try {
            var addInputValues = uIController.getAddInputValues();
            var savedTransaction = saveInputAsTransaction(addInputValues);
            uIController.addTransactionLineItem(
                budgetController.IsIncomeTransction(savedTransaction.transactionType),
                savedTransaction.description,
                savedTransaction.amount,
                savedTransaction.id,
                budgetController.calculateExpensePercentage(savedTransaction.amount));
        } catch (error) {
            console.log(error);
        }
        uIController.clearInputFields();
        refreshBudget();
    }

    /**
     * Handle date related operations
     * 
     * @name handleDates
     * @access public
     */
    function handleDates() {
        uIController.setCurrentDateForDisplay();
    }

    return {
        /**
         * This is the init function of the Controller module
         * EventListeners will be set up here
         * @access public
         */
        init: function () {
            setUpEventListeners();
            refreshBudget();
            handleDates();
        }
    }

})(BudgetController, UIController);

// top level
Controller.init();
