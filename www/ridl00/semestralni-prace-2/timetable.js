$(document).ready(function(){
    var timetableWrap = $('#timetable');
    var actionsWrap = $('#actions');
    var viewSettings = '';
    setTimeout(function(){
        $.ajax({
            type: 'post',
            url: "http://chrome-app.vseved.eu/",
            headers: {"Token": token},
            dataType: 'json'
        }).done(function(data) {
            if(data.success){
                chrome.storage.sync.get('view', function(sync){
                    viewSettings = sync.view;
                    if(viewSettings == "timetable"){
                        actionsWrap.hide();
                    } else {
                        timetableWrap.hide();
                    }
                    timetableWrap.html(showTimetable(data.lessons));
                    actionsWrap.html(showActions(data.lessons));
                    
                    loadTaskForm(data.lessons);
                    loadTasks();
                });
            } else {
                timetableWrap.html('Importuj rozvrh kliknutím na tlačítko importovat rozvrh!');
            }
        });
    }, 50);

    $('.change-view').click(function(){
        actionsWrap.toggle();
        timetableWrap.toggle();
        var setSettings = 'timetable';
        if(typeof viewSettings !== 'undefined' && viewSettings == 'timetable'){
            setSettings = 'actions';
        }
        chrome.storage.sync.set({'view': setSettings});
    });
});