//Tento JS soubor neni spojen primo s index.html. Pro aplikace jsem pouzil google tabulku (google sheets). 
//A taky googleForms, ktera automaticky uklada data(odpovedi) do GoogleSheets pro ktery jsem pouzil Script Editor
//a tam napsal tento JS kod, pomoci Google Apps Script. Kod pomaha zaznamenovat data z tabulky excel do kalendare
//Pridal jsem trigger a po kazdem vyplneni formulare(On form submit) bude aktualizovan i kalendar

var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];
var lastRow = sheet.getLastRow();
var lastColumn = sheet.getLastColumn();

var calendar = CalendarApp.getCalendarById('svfkoseeq0v28b7kuqrnvfn8gg@group.calendar.google.com');

function getSubmission() {
  this.timestamp = sheet.getRange(lastRow, 1).getValue();
  this.name = sheet.getRange(lastRow, 2).getValue();
  this.number = sheet.getRange(lastRow, 3).getValue();
  this.date = new Date(sheet.getRange(lastRow, 4).getValue());
  this.time = sheet.getRange(lastRow, 5).getValue();
  this.duration = sheet.getRange(lastRow, 6).getValue();
  this.date.setHours(this.time.getHours());
  this.date.setMinutes(this.time.getMinutes());
  return this;
}

function getEndTime(request){
  request.endTime = new Date(request.date);
  switch (request.duration){
    case "1 hodina":
      request.endTime.setMinutes(request.date.getMinutes() + 60);
      break;
    case "90 minut":
      request.endTime.setMinutes(request.date.getMinutes() + 90);
      break;
    case "2 hodiny":
      request.endTime.setMinutes(request.date.getMinutes() + 120);
      break;
    case "3 hodiny":
      request.endTime.setMinutes(request.date.getMinutes() + 180);
      break;
  }
}

function getConflicts(request){
  var conflicts = calendar.getEvents(request.date, request.endTime);
 // Logger.log(conflicts.length); length = 1 -> konflikt je, length = 0 -> konflikt neni (v mainFunction)
  return conflicts.length;
}

function updateCalendar(request) {
  var event = calendar.createEvent(
    request.name,
    request.date,
    request.endTime
  )
}

function mainFunction() {
   var request = getSubmission();
   getEndTime(request);
  if (getConflicts(request) == 0){
    updateCalendar(request);
  }
}