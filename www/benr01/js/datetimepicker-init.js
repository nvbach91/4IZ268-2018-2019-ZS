var momentDate;

if(getUrlParam('event_start') === ""){
  momentDate = moment().startOf('hour').add(1, 'hour');
} else {
  momentDate = moment(getUrlParam('event_start')).format('D.M.YYYY HH:mm');
}

$('#event_start').daterangepicker({
    "singleDatePicker": true,
    "timePicker": true,
    "timePicker24Hour": true,
    "timePickerIncrement": 15,
    "autoApply": true,
    "startDate": momentDate,
    
    locale: {
      format: 'D.M.YYYY HH:mm'
    }
}, function(start, end, label) {
  element_event_start.value = start.format('D.M.YYYY HH:mm');
  check_event_start(true);
  get_price_if_possible();
});

if(getUrlParam('event_end') === ""){
  momentDate = moment().startOf('hour').add(9, 'hour');
} else {
  momentDate = moment(getUrlParam('event_end')).format('D.M.YYYY HH:mm');
}

$('#event_end').daterangepicker({
  "singleDatePicker": true,
  "timePicker": true,
  "timePicker24Hour": true,
  "timePickerIncrement": 15,
  "autoApply": true,
  "startDate": momentDate,
  
  locale: {
    format: 'D.M.YYYY HH:mm'
  }
}, function(start, end, label) {
  element_event_end.value = start.format('D.M.YYYY HH:mm');
  check_event_end(true);
  get_price_if_possible();
});