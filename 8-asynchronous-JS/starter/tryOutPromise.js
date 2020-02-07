console.log(1);
// Note, setTimeout does not block!
setTimeout(() => console.log(2), 1000);
console.log(3);
// output = 1,3,,,,2


function damn() {
    return new Promise((onSuccess, onError) => {
        try {
            setTimeout(() => {
                onSuccess('damm');
            }, 3000);
        } catch (e) {
            onError('err regjected!!!!! -> ' + e);
        }
    });
}

var sf = undefined;

damn().then((s) => {
    return s + "mit";
}).then((sf) => {
    console.log(`--> ${sf}`);
    return sf;
}).catch((err) => {
    console.log('xxx');
    console.log(err);
});

console.log(`--> ${sf}`);