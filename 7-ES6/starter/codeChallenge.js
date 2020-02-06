const STREET_SIZE = {
    TINY: 'tiny',
    SMALL: 'small',
    NORMAL: 'normal',
    BIG: 'big',
    HUGE: 'huge'
};

class Project {
    /**
     * constructor for class project
     * @param {String} name 
     * @param {Number} buildYear 
     */
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }

    toString() {
        return `Name is: ${this.name}, builtin: ${this.buildYear}`;
    }
}

class Street extends Project {

    /**
     * constructor for class street
     * @param {String} streetName 
     * @param {Number} buildYear 
     * @param {Number} length 
     * @param {STREET_SIZE.string} streetSize 
     */
    constructor(streetName, buildYear, length, streetSize = STREET_SIZE.NORMAL) {
        super(streetName, buildYear);
        this.length = length;
        this.streetSize = streetSize;
    }

    /**
     * @returns {Number} builtYear
     */
    getBuiltYear() {
        return this.buildYear;
    }

    /**
     * @returns {Number} length
     */
    getLength() {
        return this.length;
    }

    toString() {
        return (`Street name is ${this.name}, was build in ${this.buildYear} `
            + `this is a ${this.streetSize} street.`);
    }
}

class Park extends Project {
    /**
     * constructor for the class tree
     * @param {String} parkName 
     * @param {Number} buildYear 
     * @param {Number} amountOfTrees 
     * @param {Number} area 
     */
    constructor(parkName, buildYear, amountOfTrees, area) {
        super(parkName, buildYear);
        this.amountOfTrees = amountOfTrees;
        this.area = area;
    }

    /**
     * @param {Number} currentYear 
     */
    getAge(currentYear) {
        return currentYear - this.buildYear;
    }

    /**
     * @returns {Number} amount of trees
     */
    getTreeCount() {
        return this.amountOfTrees;
    }

    /**
     * @returns {String} trees -> i.e: 123 trees per km^2
     */
    getTreeDensity() {
        return `${(this.amountOfTrees / this.area).toFixed(0)} trees per km^2`;
    }

    toString() {
        return (`${this.name} has a tree density of ${this.getTreeDensity()}`);
    }
}

const main = (function () {

    let streets = [];

    streets.push(new Street('Ocean Avenue', 1999, 10, STREET_SIZE.BIG));
    streets.push(new Street('Evergreen Street', 2008, 2, STREET_SIZE.SMALL));
    streets.push(new Street('4th Street', 2015, 7));
    streets.push(new Street('Sunset Boulevard', 1982, 22, STREET_SIZE.HUGE));

    let parks = [];

    parks.push(new Park('Green Park', 1999, 2000, 14));
    parks.push(new Park('National Park', 1980, 20300, 124));
    parks.push(new Park('Oak Park', 2009, 45, 1));

    function streetReports() {

        let totalStreetLength = 0;

        for (let street of streets) {
            totalStreetLength += street.getLength();
            console.log(street.toString());
        }
        console.log(`Our ${streets.length} streets have a total of ${totalStreetLength} km. `
            + `The average street length is ${(totalStreetLength / streets.length).toFixed(2)} km.`);
    }

    function parkReports() {

        let totalAge = 0;

        for (let park of parks) {
            totalAge += park.getAge(2020);
            if (park.getTreeCount() >= 1000) {
                console.log(`${park.name} has more than 1000 trees.`);
            }
            console.log(park.toString());
        }

        console.log(`Our ${parks.length} parks have an average age of ${(totalAge / parks.length).toFixed(2)} years.`)
    }

    return {
        init: function () {
            // init function;
            streetReports();
            parkReports();
        }
    };

})();

main.init();