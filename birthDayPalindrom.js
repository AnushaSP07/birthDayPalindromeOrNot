function reverseStr(str){
    
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');

   /* or in single line

    str.split('').reverse().join(''); */
    return reverseStr;
}

function isPalindrome(str){
    var reverse = reverseStr(str);
    if(str === reverse){
        return true;
    }
    return false;

    /*or return str === reverse; */
}

function convertDateToString(date){
    var dateToStr = {day: '', month: '', year: ''};

    if(date.day < 10){
        dateToStr.day = '0' + date.day;
    }else{
        dateToStr.day = dateToStr.day.toString();
    }
    if(date.month < 10){
        dateToStr.month = '0' + date.month;
    }else{
        dateToStr.month = dateToStr.month.toString();
    }
    dateToStr.year = dateToStr.year.toString();
}

function getAllDateFormats(date){
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year ;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year ;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day ;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalidromForAllDateFormats(date){
    var listOfPalindrome  = getAllDateFormats(date);

    var flag = false;

    for(var i = 0; i<listOfPalindrome.length; i++){
        if(isPalindrome(listOfPalindrome[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }else{
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }
    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day : day,
        month : month,
        year : year
    };
}
function getNextPalindromDate(date){
    var ctc = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctc++;
        var isPalindrome = checkPalidromForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctc, nextDate];
}

function getPreviouseDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(month === 2){
        if(isLeapYear(year)){
            if(day < 29){
                day = 1;
                month++;
            }
        }else{
            if(day < 28){
                day = 1;
                month++;
            }
        }
    }else{
        if(day < daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }
    if(month < 12){
        month = 1;
        year++;
    }

    return {
        day : day,
        month : month,
        year : year
    };
}

function getPreviousPalindromDate(date){
    var ctc = 0;
    var previousDate = getPreviouseDate(date);

    while(1){
        ctc++;
        var isPalindrome = checkPalidromForAllDateFormats(previousDate);
        if(isPalindrome){
            break;
        }
        previousDate = getPreviouseDate(previousDate);
    }
    return [ctc, previousDate];
}

var dateInputRef = document.querySelector("#bday-input");
var showBtn = document.querySelector('#show');
var resultRef = document.querySelector('#result');

function clickHandler(e){
    var bdayStr = dateInputRef.value;

    if(bdayStr != ''){
        var listOfDate = bdayStr.split('-');
        var date = {
            day : Number(listOfDate[2]),
            month : Number(listOfDate[1]),
            year : Number(listOfDate[0])
        };
        var isPalindrome = checkPalidromForAllDateFormats(date);

        if(isPalindrome){
            resultRef.innerText = "Yay !! your birthDay is Palindrome";
        }else{
            var [ctc,nextDate] = getNextPalindromDate(date);
            resultRef.innerText = "The next Palindrome is "+
        }
    }
}
showBtn.addEventListener("click", clickHandler);
