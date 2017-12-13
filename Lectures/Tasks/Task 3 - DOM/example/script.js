var calendar = document.getElementById('calendar'),
      daysField = document.getElementById('days'),
      nextMonth = document.getElementById('next-month'),
      prevMonth = document.getElementById('prev-month'),
      daysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], daysCells,
      now = new Date(),
      curCalendar = now,
      monthField = document.getElementById('month'),
      curDay = now.getDay(),
      curDate = now.getDate(),
      curMonth = now.getMonth(),
      curYear = now.getFullYear(),
      calCellsArray = [],
      clickedDate, size = 42;

    window.onload = function(){
          var i, j, arr;
          for(i=0; i<daysArr.length; i++){
                daysField.innerHTML+="<div class='day-cellule'></div>";
              }
          daysCells = daysField.childNodes;
          for(i=0; i<daysCells.length; i++){
                daysCells[i].innerHTML=daysArr[i];
              }
          for(i=0; i<size; i++){
                calendar.innerHTML+="<div class='cellule'></div>";
              }
          calCellsArray = calendar.children;
          for(i=0; i<size; i+=7){
                calCellsArray[i].classList.add('weekend-cellule');
              }
          fillDates(curCalendar);
        };

    function fillDates(date){
          var i, thisMonth, thisYear;
          thisMonth = date.getMonth();
          thisYear = date.getFullYear();
          monthField.innerHTML=monthsArr[thisMonth]+' '+thisYear;
          date.setDate(1);
          date.setDate(date.getDate()-date.getDay());
          clearClasses();
          for(i=0; i<size; i++){
                calCellsArray[i].textContent=date.getDate();
                if(date.getMonth()!=thisMonth)
                      calCellsArray[i].classList.add('other-month-cellule');
                date.setDate(date.getDate()+1);
              }
          if(thisMonth==curMonth && thisYear==curYear){
                i = curDate + curDay-1;
                calCellsArray[i].classList.add('cur-day');
              }
          date.setMonth(thisMonth);
          date.setYear(thisYear);
        }

    function clearClasses(){
          for(i=0; i<size; i++){
                calCellsArray[i].classList.remove('other-month-cellule');
                calCellsArray[i].classList.remove('cur-day');
              }
          if(clickedDate!=undefined)
                clickedDate.classList.remove('clicked-date');
        }

    prevMonth.addEventListener('click', function(){
          curCalendar.setMonth(curCalendar.getMonth()-1);
          fillDates(curCalendar);
        });

    nextMonth.addEventListener('click', function(){
          curCalendar.setMonth(curCalendar.getMonth()+1);
          fillDates(curCalendar);
        console.log('next');
        });

    calendar.addEventListener('click', function(event){
          console.log(event.target);
          if(clickedDate!==undefined){
                if(event.target==clickedDate){
                      clickedDate.classList.toggle('clicked-date');
                      return;
                    }
                clickedDate.classList.remove('clicked-date');
              }
          clickedDate=event.target;
          clickedDate.classList.add('clicked-date');
        });