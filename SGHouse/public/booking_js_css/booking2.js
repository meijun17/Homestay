/* 日期 */
$(function () {
    var dateFormat = "yy/mm/dd",
        from = $("#from")
            .datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,

                changeYear: true,        //年份改為下拉清單
                yearRange: "c-0:c+1",    //設定年份是 系統年-1 ~ 系統年+2 
                dateFormat: dateFormat,  //設定日期格式 (左邊是jQ UI提供的關鍵字, 右邊是31行設定的)

                minDate: 1,
                maxDate: "3M"
            })
            .on("change", function (e) {
                to.datepicker("option", "minDate", getDate(this));
            }),
        to = $("#to").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,

            changeYear: true,        //年份改為下拉清單
            yearRange: "c-0:c+1",    //設定年份是 系統年-1 ~ 系統年+2 
            dateFormat: dateFormat,  //設定日期格式

            minDate: 1,
            maxDate: "3M"
        })
            .on("change", function (e) {
                from.datepicker("option", "maxDate", getDate(this));
            });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }

        return date;
    }

    // 訂房資訊取得

    checkItem.onclick = function () {
        // 取得日期 => 
        var dateStart = document.getElementById("from").value;
        var dateEnd = document.getElementById("to").value;
        document.getElementById("choseDate").innerText = `${dateStart}~${dateEnd}`
        // 取得天數 =>
        var d1 = new Date(dateStart);
        var d2 = new Date(dateEnd);

        var tempTime = Math.abs(d2 - d1);
        var planDays = tempTime / (1000 * 3600 * 24);
        document.getElementById("planDays").innerText = `${planDays} 天`;

        // 人數 =>

        var adult = document.getElementById("adult").value;
        var child = document.getElementById("child").value;
        document.getElementById("peopleNumber").innerText = `${parseInt(adult)}位成人、${parseInt(child)}位孩童`;

        // 總計 = 房價 * 天數 * 成人

        if( parseInt(adult) < 3){
            document.getElementById("totalPrice").innerText = 2580 * parseInt(planDays)  + '元';
        }else{
            document.getElementById("totalPrice").innerText = 2580 * parseInt(planDays) + 500 * parseInt(planDays) + '元';
        }
    }


});
