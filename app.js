function strReverse(str) {
    var listOfChars = str.split("");
    var reverseListOfChars = listOfChars.reverse();
  
    var strReverse = reverseListOfChars.join("");
  
    return strReverse;
  }
  
  function isitpalindrome(str) {
    var reverse = strReverse(str);
  
    if (str === reverse) {
      return true;
    }
    return false;
  }
  
  function convertDateToStr(date) {
    var dateStr = { day: "", month: "", year: "" };
  
    if (date.day < 10) {
      dateStr.day = "0" + date.day;
    } else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = "0" + date.month;
    } else {
      dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
  
    return dateStr;
  }
  
  function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  function palindromeCheckForAllDateFormates(date) {
    var listOfPalindromes = getAllDateFormats(date);
    var flag = false;
    for (var i = 0; i < listOfPalindromes.length; i++) {
      if (isitpalindrome(listOfPalindromes[i])) {
        flag = true;
        break;
      }
    }
    return flag;
  }
  
  function isLeapYear(year) {
    if (year % 400 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
    if (year % 4 === 0) {
      return true;
    }
    return false;
  }
  
  function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year,
    };
  }
  
  function getNextPalindromeDate(date) {
    var x = 0;
    var nextDate = getNextDate(date);
  
    while (1) {
      x++;
      var isitpalindrome = palindromeCheckForAllDateFormates(nextDate);
      if (isitpalindrome) {
        break;
      }
      nextDate = getNextDate(nextDate);
    }
  
    return [x, nextDate];
  }
  
  var inputRef = document.querySelector("#bday");
  var btnRef = document.querySelector("#btn");
  var outputBox = document.querySelector("#output");
  
  function clickHandler() {
    var bdayStr = inputRef.value;
  
    if (bdayStr !== "") {
      var listOfDate = bdayStr.split("-");
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0]),
      };
  
      var isitpalindrome = palindromeCheckForAllDateFormates(date);
  
      if (isitpalindrome) {
        outputBox.innerText = "Yeyyy ! your birthday is a palindrome! 🥳";
      } else {
        var [x, nextDate] = getNextPalindromeDate(date);
  
        outputBox.innerText =
          "The next palindrome date is " +
          nextDate.day +
          "-" +
          nextDate.month +
          "-" +
          nextDate.year +
          ", you missed it by " +
          x +
          " days ! 😔";
      }
    }
  }
  
  btnRef.addEventListener("click", clickHandler);