  String.prototype.toEnglishDigits = function () {
    var num_dic = {
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
    }
  
    return parseInt(this.replace(/[۰-۹]/g, function (w) {
        return num_dic[w]
    }));
  }