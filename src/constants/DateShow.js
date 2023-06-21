import moment from "moment";
import { engToPersian } from "./EnglishToPersian";

const takeTime = (val) => {
  const dateParams = val.split(" ")
  const timeParams = dateParams[1].split(":")
  function addZero(i) {
    if (i < 10) { i = "0" + i }
    return i;
  }
  let h = addZero(timeParams[0]);
  let m = addZero(timeParams[1]);
  let s = addZero(timeParams[2]);
  let t = h + ":" + m + ":" + s;
  return timeformat(t)
}
const timeformat = val => {
  var time = "";
  var hour = 0;
  var min = 0;
  var f = "am";
  if (val.substr(0, 2) > 12) {
    hour = parseInt(val.substr(0, 2)) - 12
    if (hour < 10) {
      hour = "0" + hour
    } else {
      hour = hour
    }
    min = val.substr(3, 2)
    time = hour.toString() + ":" + min.toString() + " "
  } else {
    hour = val.substr(0, 2)
    min = val.substr(3, 2)
    time = hour.toString() + ":" + min.toString() + " "
  }
  if (val.substr(0, 2) > 11) {
    f = "pm"
  } else {
    f = "am"
  }
  return time + f;
}
export const questionEnglishTimeShow = (val) => {
  const a = moment(val, "YYYY-MM-DD").format("DD/MM/YYYY")
  // const final_time = a + " " + "," + " " + takeTime(val)
  const final_time = a
  return final_time
}
export const englishTimeShow = (val) => {
  const a = moment(val, "YYYY-MM-DD").format("Do MMM YYYY")
  // const final_time = a + " " + "," + " " + takeTime(val)

  return a
}
export const questionPersianTimeShow1 = (val) => {
  const a = val.substr(0, 10)
  let test = moment(a, 'YYYY-MM-DD').locale('fa').format('DD-MM-YYYY');
  let testDateMonth = moment(a, 'DD-MM-YYYY').locale('fa').format('jMMMM');

  let testdateSplit = test.split("-")
  var b = val
  const today = new Date()
  var now = moment(b);
  var expiration = moment(today);
  var minsAverage = expiration.diff(now, "minutes");

  var min = parseInt(minsAverage % 60);
  var hours = parseInt(minsAverage / 60);
  var days = parseInt(hours / 24);

  hours = hours - 24 * days;
  var final_time = ""

  // final_time = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
  // return final_time

  var removeZero = testdateSplit[0]
  if (removeZero[0] == 0) {
    final_time = engToPersian(removeZero[1].toString()) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
    return final_time
  } else {
    final_time = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
    return final_time
  }
}
export const questionPersianTimeShow = (val) => {
  const a = val.substr(0, 10)
  let datemonthyear = moment(a, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/D');
  return engToPersian(datemonthyear)
}
const timeformatenglish = val => {
  var time = "";
  var hour = 0;
  var min = 0;
  var f = "am";
  if (val.substr(0, 2) > 12) {
    hour = parseInt(val.substr(0, 2)) - 12
    if (hour < 10) {
      hour = "0" + hour
    } else {
      hour = hour

    }
    min = val.substr(3, 2)
    time = hour.toString() + ":" + min.toString() + " "
  } else {
    hour = val.substr(0, 2)
    min = val.substr(3, 2)
    time = hour.toString() + ":" + min.toString() + " "
  }
  if (val.substr(0, 2) > 11) {
    f = "pm"
  } else {
    f = "am"
  }
  return time + f;

}
const timeformatpersian = val => {
  var time = "";
  var hour = 0;
  var min = 0;
  var f = "";
  if (val.substr(0, 2) > 12) {
    hour = parseInt(val.substr(0, 2)) - 12
    if (hour < 10) {
      hour = "0" + hour
    } else {
      hour = hour

    }
    min = val.substr(3, 2)
    time = hour.toString() + ":" + min.toString() + " "
  } else {
    hour = val.substr(0, 2)
    min = val.substr(3, 2)
    time = hour.toString() + ":" + min.toString() + " "
  }
  if (val.substr(0, 2) > 11) {
    f = "بعد از ظهر"
  } else {
    f = "صبح"
  }
  time = engToPersian(time);

  return time + " " + f;

}

export const persianTimeShow_With_Date1 = (val) => {
  const a = val.substr(0, 10)
  let test = moment(a, 'YYYY-MM-DD').locale('fa').format('DD-MM-YYYY');
  let testDateMonth = moment(a, 'DD-MM-YYYY').locale('fa').format('jMMMM');

  let testdateSplit = test.split("-")
  var b = val
  const today = new Date()
  var now = moment(b);
  var expiration = moment(today);
  var minsAverage = expiration.diff(now, "minutes");

  var min = parseInt(minsAverage % 60);
  var hours = parseInt(minsAverage / 60);
  var days = parseInt(hours / 24);

  hours = hours - 24 * days;
  var final_time = ""

  // final_time = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
  // return final_time

  var removeZero = testdateSplit[0]
  if (removeZero[0] == 0) {
    final_time = engToPersian(removeZero[1].toString()) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
    return final_time
  } else {
    final_time = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
    return final_time
  }
}
export const persianTimeShow_With_Date = (val) => {
  let datemonthyear = moment(val, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/D');
  return engToPersian(datemonthyear)
}

export const showDate_en = (val) => {
  if (val == "") {
    return ""
  } else {
    return moment(val, 'YYYY-MM-DD').format('Do MMM, YYYY')
  }
}





export const getdate_day_English = (val) => {
  var date = moment(val).format("Do")
  var month = moment(val).format("MMMM")
  var day = moment(val).format("dddd")
  var year = moment(val).format("YYYY")
  return [day, date, month, year]
}

export const getdate_day_Persian = (val) => {
  // console.log(val)
  var a = val
  let test = moment(a, 'YYYY-MM-DD').locale('fa').format('DD-MM-YYYY');
  let month = moment(a, 'YYYY-MM-DD').locale('fa').format('jMMMM');
  let date = moment(a, 'YYYY-MM-DD').locale('fa').format('D');
  let day = moment(a, 'YYYY-MM-DD').locale('fa').format("dddd");

  let testdateSplit = test.split("-")
  return [day, engToPersian(testdateSplit[0]), month, 2000]
}




export const timeFunc = (val) => {
  
  if(val!=""){

    const today = new Date()
    var now = moment(val);
    var expiration = moment(today);
    var seconds = expiration.diff(now, "seconds");
    var minutes = expiration.diff(now, "minutes");
    var hours = expiration.diff(now, "hours");
    var days = expiration.diff(now, "days");
    var weeks = expiration.diff(now, "weeks");
  
  
  
    if (seconds < 60) {
      return "now"
    } else {
      if (minutes < 60) {
        return minutes + " min"
      } else {
        if (hours < 24) {
          return hours + " h"
        } else {
          if (weeks < 1) {
            return days + " d"
          } else {
            return weeks + " w"
          }
        }
      }
    }
  }else{
    return "now";
  }
  


}