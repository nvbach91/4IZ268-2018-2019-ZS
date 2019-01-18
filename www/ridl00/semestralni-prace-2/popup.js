$(document).ready(function(){
    $('.timetable-page').click(function(){
        chrome.tabs.create({url: chrome.extension.getURL('timetable.html')}, function(tab) {});
    });
    $.ajax({
        type: 'POST', url: "http://chrome-app.vseved.eu/",
        headers: {"Token": token},
        dataType: 'json'
    }).done(function(data) {
        if(data.success){
            loadTasks();
        } else {
            $('.tasks-wrapper').html('Importuj rozvrh kliknutím na tlačítko importovat rozvrh!');
        }
    });
});