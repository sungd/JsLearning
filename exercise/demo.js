window.addEventListener("load", prepareGreet("greet"), false);


function prepareGreet(id) {
    var contain = document.getElementById(id);
    if(!contain) return;
    contain.innerHTML = initDate();
}

/**
 * [initDate 根据时间显示问候语]
 */
function  initDate () {
    var now = new Date();
    return timeString(now.getHours());

    function timeString(theHour) {
        if(theHour < 5) return "so late?";
        if(theHour < 9) return "good morning";
        if(theHour < 17) return "keep relax";
        return "good evening";
    }
}

/**
 * [showTime 24小时制转换 ]
 * @param  {[type]} flag ［true，24小时制]
 * @param {[type]} [theHour] [小时]
 */
function showTime(flag) {
    var now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();

    return showTheHours(hour) + showZeroFilled(minute) + showZeroFilled(second) + shouAmPM();

    function showTheHours(theHour) {
        if(flag || (theHour > 0 && theHour < 13)) {
            return theHour;
        }
        if(theHour == 0) return 12;
        return theHour - 12;
    }

    function showZeroFilled(inValue) {
        return inValue > 9 ? (":" + inValue) : (":0" + inValue);
    }

    function shouAmPM() {
        if(flag) return "";
        if(hour < 12) return " AM";
        return " PM";
    }
}

function daysTill(mm, dd) {
    var now = new Date();
    var inDate = new Date(now.getFullYear(), mm - 1, dd);

    if(inDate.getTime() < now.getTime()) {
        inDate.setYear(now.getFullYear() + 1);
    }

    return Math.ceil(dayToDays(inDate) - dayToDays(now));

    function dayToDays(inTime) {
        return inTime.getTime() / (1000 * 60 * 60 * 24);
    }
}

