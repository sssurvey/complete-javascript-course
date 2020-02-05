function Person(name) {
    this.name = name;
}

Person.prototype.myFriends = function (friends) {
    var arr = friends.map(function (item) {
        return this.name + ' is friends with ' + item;
    }.bind(this));
    console.log(arr);
}

var friends = ['bob', 'jane', 'jim'];
new Person('Haomin').myFriends(friends);