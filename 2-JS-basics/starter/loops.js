for (var i = 0; i < 3; i++) {
    console.log(i);
}

var john = ['john', 'smith', 1990, 'designer'];
john.forEach(element => {
    console.log(element);
});

var counter = 0;
while (counter < 10) {
    if (counter++ === 5) continue;
    console.log(counter);
    if (counter === 8) break;
}
// js also has the continue and break keyword
// they has the same as  the same effect as JAVA

var codingChallenge5 = {
    originalPriceArr: [],
    tipCalc: function() {
        this.tipPriceArr = [];
        this.totalPriceArr = [];
        for (var i = 0; i < this.originalPriceArr.length; i++) {
            switch (this.originalPriceArr[i]) {
                case 0 <= i && i <= 20:
                    this.tipPriceArr.push(this.originalPriceArr[i] * 0.2);
                    break;
                case 20 < i && i <= 50:
                    this.tipPriceArr.push(this.originalPriceArr[i] * 0.15);
                    break;
                default:
                    this.tipPriceArr.push(this.originalPriceArr[i] * 0.1);
            }
            this.totalPriceArr.push(this.tipPriceArr[i] + this.originalPriceArr[i])
        }
    }  
};

codingChallenge5.originalPriceArr = [10, 21, 50, 100, 200];
codingChallenge5.tipCalc();
console.log(codingChallenge5.tipPriceArr);
console.log(codingChallenge5.totalPriceArr);