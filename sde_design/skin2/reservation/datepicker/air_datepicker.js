(function ($) {
  jQuery = $;
  $ = $;

  $("#air_datepicker_single").datepicker({
    language: "ko",
    inline: true,
    navTitles: {
      days: '<strong>yyyy.mm</strong>'
    },
    onRenderCell(date, cellType, datepicker) {
      if (cellType === "day") {
        const dayWeek = date.getDay();
        const halfYear = date.getFullYear().toString().slice(2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const optionDateStr = halfYear + '-' + month + '-' + day;
        const allTimeStamp = $('#product_option_id1').html();
        const classObj = {}

        const currentDate = new Date();
        const nextDayTimestamp = currentDate.getTime() - 86400000;

        if (allTimeStamp && allTimeStamp.includes(optionDateStr) === false) {
          classObj.disabled = true
        } else if (date < new Date(nextDayTimestamp)) {
          classObj.disabled = true
        } else if (dayWeek > 0 && dayWeek < 6){
          classObj.classes = '-work-'
        }
        if(dayWeek === 0){
          classObj.classes= classObj.disabled ? '-disabled-sun-' : '-sun-'
        }
        if(dayWeek === 6){
          classObj.classes= classObj.disabled ? '-disabled-sat-' : '-sat-'
        }
        debouncedRenderSingle();
        return classObj
      }
    },
    onSelect(date, formattedDate, datepicker) {
      let selectOptionValue = date.substring(2);
      optionValueList[1] = selectOptionValue;

      const optionValue = $('#product_option_id1 option:contains("' + selectOptionValue + '")').val();
      
      if(optionValue){
        $('.item-date').removeClass('select');
      }

      if (!optionValue) {
        const errMsg = "선택하신 날짜중에 이용하실 수 없는 날짜가 있습니다.\n" + date
        alert(errMsg)
        
        return;
      }

      const dayOfWeek = formattedDate.getDay();
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      $(".item-date .itemName .d-pc span").text(date + "(" + days[dayOfWeek] + ")");
      $(".item-date .itemName .d-pc span").css('font-weight','bold');
      $(".item-date .itemName .d-mobile .insertData").html(
          date +
          "(" +
          days[dayOfWeek] +
          ")" +
          `<img src="https://m-img.cafe24.com/images/reservation/ic_accArrow.svg" alt="">`
      );
      $(".item.item-date.ac").addClass("select");
      // $(".item.item-date.ac").removeClass("ac");
      // $(".item.item-time.ac").removeClass("ac");
      // $(".item.item-option1.ac").removeClass("ac");

      // 날짜 옵션이 마지막이면 품주추가 진행
      const timeDisplayStyle = $('.item-time').css('display');
      if ($('.item-option1 .add_option_1').length <= 0 && timeDisplayStyle === 'none') {
        generateSelectItem();
        return
      }

      $('.item-time .itemName').addClass('disabled');
      $('.item-option1 .itemName').addClass('disabled');

      const reservationType = $("#reservation_type").val();
      // 날짜+시간형에서 시간을 사용했을때 따로 처리
      if (reservationType === "usetime" && timeDisplayStyle !== 'none') {
        disableTimeOption(date);
      } else {
        disableAddOption(1, reservationType);
        // $('.item-option1 .add_option_1').removeClass('disabled');
        // $('.item-option1 .add_option_1').addClass('ac');
      }
      // 추가옵션 초기화
      initAddOption();
    },
  });

  $("#air_datepicker_multi").datepicker({
    language: "ko",
    inline: true,
    navTitles: {
      days: '<strong>yyyy.mm</strong>'
    },
    onRenderCell(date, cellType, datepicker) {
      if (cellType === "day") {
        const halfYear = date.getFullYear().toString().slice(2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const optionDateStr = halfYear + '-' + month + '-' + day;

        const previousDate = new Date(date - (24 * 60 * 60 * 1000));
        const prevHalfYear = previousDate.getFullYear().toString().slice(2);
        const prevMonth = ('0' + (previousDate.getMonth() + 1)).slice(-2);
        const prevDay = ('0' + previousDate.getDate()).slice(-2);
        const optionPrevDateStr = prevHalfYear + '-' + prevMonth + '-' + prevDay;

        const dayWeek = date.getDay();

        const allTimeStamp = $('#product_option_id1').html();
        const classObj = {}

        const currentDate = new Date();
        const nextDayTimestamp = currentDate.getTime() - 86400000;

        if (allTimeStamp && allTimeStamp.includes(optionDateStr) === false && allTimeStamp.includes(optionPrevDateStr) === false) {
          classObj.disabled = true
        } else if (date < new Date(nextDayTimestamp)) {
          classObj.disabled = true
        } else if (dayWeek > 0 && dayWeek < 6){
          classObj.classes = '-work-'
        }
        if(dayWeek === 0){
          classObj.classes= classObj.disabled ? '-disabled-sun-' : '-sun-'
        }
        if(dayWeek === 6){
          classObj.classes= classObj.disabled ? '-disabled-sat-' : '-sat-'
        }
        debouncedRenderMulti();
        return classObj
      }
    },
    onSelect(date, formattedDate, datepicker) {
      if (Array.isArray(formattedDate) && formattedDate.length === 2) {
        const startDate = formattedDate[0];
        const endDate = formattedDate[1];
        const starDayOfWeek = startDate.getDay();
        const endDayOfWeek = endDate.getDay();

        const currentDate = startDate;
        let selectDateList = "";
        let errDateList = "";

        // 선택한 기간내에 사용할수 없는 날짜가 있는지 판단한다
        let countErr = 0;
        while (currentDate < endDate) {
          const halfYear = currentDate.getFullYear().toString().slice(2);
          const fullYear = currentDate.getFullYear().toString();
          const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
          const day = ('0' + currentDate.getDate()).slice(-2);

          const optionDateStr = halfYear + '-' + month + '-' + day;
          const fullDate = fullYear + '-' + month + '-' + day;

          const optionValue = $('#product_option_id1 option:contains("' + optionDateStr + '")').val();
          if (!optionValue) {
            if (countErr === 4) {
              countErr = 0;
              errDateList += fullDate + " \n";
            } else {
              countErr++;
              errDateList += fullDate + ", ";
            }
          } else {
            const zeroQtyDate = $("#zero_qty_date_options").val();
            if (zeroQtyDate.includes(optionDateStr + ",")) {
              if (countErr === 4) {
                countErr = 0;
                errDateList += fullDate + " \n";
              } else {
                countErr++;
                errDateList += fullDate + ", ";
              }
            } else {
              selectDateList += optionDateStr + ",";
            }
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }

        if (errDateList) {
          const errMsg = "선택하신 날짜중에 이용하실 수 없는 날짜가 있습니다.\n" + errDateList
          alert(errMsg.slice(0, -2));
          return;
        } else {
          $('#date_str_list').val(selectDateList);
        }

        const dates = date.split("~");
        // 선택후 처리
        if (Array.isArray(dates) && dates.length === 2) {
          $('.item-option1 .itemName').addClass('disabled');
          const days = ["일", "월", "화", "수", "목", "금", "토"];
          let dateText = dates[0] + "(" + days[starDayOfWeek] + ")" + " ~ " + dates[1] + "(" + days[endDayOfWeek] + ")"
          $(".item-date .itemName .d-pc span").text(dateText);
          $(".item-date .itemName .d-pc span").css('font-weight','bold');
          $(".item-date .itemName .d-mobile .insertData").html(
              dateText +
              `<img src="https://m-img.cafe24.com/images/reservation/ic_accArrow.svg" alt="">`
          );
          // $(".item.item-date.ac").removeClass("ac");
          $(".item.item-date.ac").removeClass("select");
          if ($('.item-option1 .add_option_1').length <= 0) {
            
            generateMultiItems();
            return
          }else{
            $('.item-option1 .add_option_1').addClass("ac")
          }
          const flag = accomodationDisableAddOption(1);
          // false 이면 알럿문구 노출한다
          if (flag === false) {
            alert('선택하신 기간내에 사용가능한 옵션이 없습니다.');
            return
          }
          $('.item-option1 .add_option_1').removeClass('disabled');
          $('.item-option1 .add_option_1').addClass('ac');
          
        }
        // $(".item.item-option1.ac").removeClass("ac");
        $(".item.item-date.ac").removeClass("select");
        initAddOption();

      }
    },
  });

  function initAddOption() {
    // 추가옵션 초기화
    $('.item-option1').each(function(index, element) {
      const optionName = $(element).find(".itemName .d-pc .option_name").text();
      $(element).find(".itemName .d-pc span").text(optionName);
      $(element).find(".itemName .d-mobile .insertData").html(
          optionName + `<img src="https://m-img.cafe24.com/images/reservation/ic_accArrow.svg" alt="">`
      );
      $(element).find(".itemOption .option .optionItem").removeClass("ac");
    });
  }

})(jQuery1_12_4);
