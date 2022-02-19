function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";

        if(hou >= 12){
          pe = "PM";
        }
        if(hou == 0){
          hou = 12;
        }
        if(hou > 12){
          hou = hou - 12;
        }

        Number.prototype.pad = function(digits){
          for(var n = this.toString(); n.length < digits; n = 0 + n);
          return n;
        }

        var months = ["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"];
        var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
        var values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];
        for(var i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).innerText = `${values[i]}`;
        // document.getElementById('heading').innerText = `Seems it's ${day} 🤗`;
  }

  function initClock(){
    updateClock();
    window.setInterval("updateClock()", 1);
  }


// const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const d = new Date();
// let day = weekday[d.getDay()];
// document.getElementById('heading').innerText = `Seems it's ${day} 🤗`;
// Add Item To Table 
function addItem() {
    const inputValue = document.getElementById('input-field');
    if (inputValue.value == '') {
        return Swal.fire({
            icon: "warning",
            // title: "Sir...",
            html: "Please add your to-do first!<br>It is super easy and fun 😀",
        });
    } else if (inputValue.value > 0) {
        inputValue.value = '';
        return Swal.fire({
            icon: "error",
            // title: "Sir...",
            html: "Hey! Only text is allowed 😀",
        });
    } else { 
        const tr = document.createElement('tr');
        tr.classList.add('single-item');
    tr.innerHTML = `<td class="item-name">${inputValue.value}</td>
    <td class="status">In Progress</td>
    <td class="actions"><button class="btn btn-success me-2 complete"><ion-icon name="checkmark-outline"></ion-icon></button><button class="btn btn-danger delete"><ion-icon name="trash-outline"></ion-icon></button></td>`;
    document.getElementById('table-body').appendChild(tr);

        inputValue.value = '';
        

    //Finish Task

    const completeButton = document.getElementsByClassName("complete");
    for (const button of completeButton) {
        button.addEventListener("click", function (e) {
            const trackTodoItem = e.target.parentNode.parentNode.parentNode.childNodes[0];
            trackTodoItem.style.textDecoration = 'line-through';
            trackTodoItem.style.color = 'rgb(25, 135, 83)';
            const trackStatus = e.target.parentNode.parentNode.parentNode.childNodes[2];
            trackStatus.innerText = 'Completed'; 
            trackStatus.style.color = '#198753';
        })
    }


    //Delete Task

    const deleteButton = document.getElementsByClassName("delete");
    for (const button of deleteButton) {
        button.addEventListener("click", function (e) {
            const trackTr = e.target.parentNode.parentNode.parentNode.parentNode;
            trackTr.removeChild(e.target.parentNode.parentNode.parentNode);
            console.log(e.target.parentNode.parentNode.parentNode);
        })
        }
    }
    
    
}

// Keyboard Enter Event in Input 

const enterPress = document.getElementById('input-field');
enterPress.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        addItem();
    }
})