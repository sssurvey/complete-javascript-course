var box5 = {
    color: 'Green',
    position: 1,
    onClick: function () {
        document.getElementsByClassName('green')[0]
            .addEventListener('click', function () {
                console.log('The color is ' + this.color);
            });
    }
}

box5.onClick();

var box7 = {
    color: 'Green',
    position: 1,
    onClick: function () {
        var objectThis = this;
        document.getElementsByClassName('green')[0]
            .addEventListener('click', function () {
                console.log('The color is ' + objectThis.color);
            });
    }
}

box7.onClick();


var box6 = {
    color: 'Green',
    position: 1,
    onClick: function () {
        document.getElementsByClassName('green')[0]
            .addEventListener('click', () => {
                console.log('The color is ' + this.color);
            });
    }
}

box6.onClick();