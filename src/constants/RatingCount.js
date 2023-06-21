import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';

export const reviewShowinStar = (rate) => {
  rate = (parseFloat(rate)).toFixed(2)


  
  // console.log(rate)
  if (typeof (rate) == "String") {
    var val = rate
  } else {
    var val = rate.toString()
  }
  if (val == 0) {
    var showRating = []
    showRating.push(0)
    return showRating
  } else {
    if (isInt(val) == true) {
      var showRating = []
      for (var i = 1; i <= val; i++) {
        showRating.push(i)
      }
      // console.log("showRating", showRating)
      return showRating
    } else {
      var result = val.split(".")
      var rating = parseInt(result[1])
      if (rating > 0 && rating < 25) {
        var a = []
        a.push(result[0])
        a.push((5).toString())

        var b = parseInt(a.join('.'))
        // console.log(b)
        var showRating = []
        for (var i = 1; i <= b; i++) {
          showRating.push(i)
        }
        showRating.push(showRating.length + .01)
        // console.log("showRating", showRating)
        return showRating
      } else if (rating >= 25 && rating < 50) {
        var a = []
        a.push(result[0])
        a.push((5).toString())

        var b = parseInt(a.join('.'))
        // console.log(b)
        var showRating = []
        for (var i = 1; i <= b; i++) {
          showRating.push(i)
        }
        showRating.push(showRating.length + .25)
        // console.log("showRating", showRating)
        return showRating
      } else if (rating >= 50 && rating < 75) {
        var a = []
        a.push(result[0])
        a.push((5).toString())

        var b = parseInt(a.join('.'))
        // console.log(b)
        var showRating = []
        for (var i = 1; i <= b; i++) {
          showRating.push(i)
        }
        showRating.push(showRating.length + .51)
        // console.log("showRating", showRating)
        return showRating
      } else if (rating >= 75 && rating < 99) {
        var a = []
        a.push(result[0])
        a.push((5).toString())

        var b = parseInt(a.join('.'))
        // console.log(b)
        var showRating = []
        for (var i = 1; i <= b; i++) {
          showRating.push(i)
        }
        showRating.push(showRating.length + .75)
        // console.log("showRating", showRating)
        return showRating
      }
      //  else if (rating == 100) {
      //   var a = parseInt(result[0]) + 1
      //   var showRating = []
      //   for (var i = 1; i <= a; i++) {
      //     showRating.push(i)
      //   }
      //   return showRating
      // }
    }
  }
}
export const reviewShowinGraystar = (val) => {
  var graystar = []
  // console.log(5 - val.length)
  // console.log("5 - ", val)
  if (val[0] == 0) {
    return graystar
  } else {
    if ((5 - val.length) != 0) {
      if (5 - val.length != 5) {
        for (var i = 1; i <= (5 - (val.length)); i++) {
          graystar.push(i)
        }
        return graystar
      } else {
        return graystar
      }
    } else {
      return graystar
    }
  }
}

export const isInt = (n) => {
  return n % 1 === 0;
}


export const lastStar = (val, lang) => {
  // const {language } = useRtlContext()
  // console.log(val)


  // val.toFixed(2)

  // var val2 = (val.toFixed(2)).toString() 
  var val2 = val.toString()
  // console.log(val2)

  var valSlpit = val2.split(".")

  var findAftrDigit = valSlpit[1]

  if (findAftrDigit == "01") {
    return images.zeroforth
  } else if (findAftrDigit == "25") {
    if (lang == "en") {
      return images.onebyfourEn
    } else {
      return images.onebyfourPr
    }
  } else if (findAftrDigit == "51") {
    if (lang == "en") {
      return images.twobyfourEn
    } else {
      return images.twobyfourPr
    }
  } else if (findAftrDigit == "75") {
    if (lang == "en") {
      return images.threebyfourEn
    } else {
      return images.threebyfourPr
    }
  }

}