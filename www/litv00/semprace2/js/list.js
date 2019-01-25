var informace;
 informace = $("#info");

$(document).ready(function(){
    var array = [];
    var api_key = "AIzaSyAygWYH5mFq67wZCqq5T4azq1Ou19b8sIs";
    var url = "https://sheets.googleapis.com/v4/spreadsheets/1ljylIgtdyRwP4ueEq4mz29Ap1U4WJsA1LHJh3oc8fw0/values/Form%20responses%201?key=";

    array = make_table(url,api_key,array);


    setInterval(function(){
      array = make_table(url,api_key,array)
    },7000);

    informace.on("click", "div.klient",function(){
      var position = $(this).data("id");
      $("#info-modal .modal-body").empty();
      var element = "<p> Name : " + array[position].name + "</p>";
      element += "<p> Phone : " + array[position].phone + "</p>";
      $("#info-modal .modal-body").append(element);
      $("#info-modal").modal("show");
    });

});


function endtime(hours,minutes,seconds) {
  var time = "";
  if (hours < 10) {
    time += "0" + hours;
  }else{
    time += hours;
  }
  if (minutes < 10) {
    time += ":0" + minutes;
  }else{
    time += ":" + minutes;
  }
  if (seconds < 10) {
    time += ":0" + seconds;
  }else{
    time += ":" + seconds;
  }
  return time;
}

function make_table(url,api_key,array) {
  array = [];
  $.get(url+api_key,function(response){
    var data = response.values;
    for(var i = 1; i < data.length ; i++){
      var temp_date = data[i][3].split("/");
      temp_date = temp_date[1] + "/" + temp_date[0] + "/" + temp_date[2];
      temp_date = new Date(temp_date + " " + data[i][4]);
      var temp = {
        name : data[i][1],
        phone : data[i][2],
        date : data[i][3],
        date_format : temp_date,
        start : data[i][4],
        end : data[i][5]
      };
      array.push(temp);
    }
    informace.empty();
    array.sort(function(a,b){
      if (a.date_format.valueOf() > b.date_format.valueOf() ) {
        return 1;
        }
      if (a.date_format.valueOf() < b.date_format.valueOf() ) {
        return -1;
      }

      return 0;
    });
    for(var i = 0; i< array.length; i++){

      var now = new Date();
      var today = new Date(now.getFullYear(),now.getMonth(),now.getDate()).valueOf();
      var date = array[i].date_format.valueOf();
      if (date - today >= 0 ) {
        var end = "";
        var time;
        switch (array[i].end) {
          case "1 hodina":
            end = new Date(+array[i].date_format + 60 * 6e4);
            end = endtime(end.getHours(),end.getMinutes(),end.getSeconds());
            break;
          case "90 minut":
            end = new Date(+array[i].date_format + 90 * 6e4);
            end = endtime(end.getHours(),end.getMinutes(),end.getSeconds());
            break;
          case "2 hodiny":
            end = new Date(+array[i].date_format + 120 * 6e4);
            end = endtime(end.getHours(),end.getMinutes(),end.getSeconds());
            break;
          case "3 hodiny":
            end = new Date(+array[i].date_format + 180 * 6e4);
            end = endtime(end.getHours(),end.getMinutes(),end.getSeconds());
            break;
        }
        var element1 = "<div class='inline sp'> <div class='klient klient1 sp' data-id='" + i + "''>";
        element1 += array[i].name;
        element1 += "</div>";
        
        var element2 = "<div class='klient klient2' data-id='" + i + "''>";
        element2 += array[i].date;
        element2 += "</div>";
        
        var element3 = "<div class='klient klient3' data-id='" + i + "''>";
        element3 += array[i].start;
        element3 += "</div>";

        var element4 = "<div class='klient klient3' data-id='" + i + "''>";
        element4 += end;
        element4 += "</div>";

        var element5 = "<div class='klient klient3' data-id='" + i + "''>";
        element5 += array[i].end;
        element5 += "</div></div>";
        
        informace.append(
        	element1,
        	element2,
        	element3,
        	element4,
        	element5
        	);

      }

    }
  });
  return array;
}
