
$(document).ready(function(){
    $('.go-to-timetables').click(function(){
        importTimetable();
    });

    $(document).on('submit','form#add-task', function(e){
        e.preventDefault();
        addTask($(this));
    });

    $(document).on('click', 'button.delete-task',  function(){
        deleteTask($(this).val());
    });
});

function showTimetable(lessons){
    var times = [
        {"start": "07:30", "end": "09:00"},
        {"start": "09:15", "end": "10:45"},
        {"start": "11:00", "end": "12:30"},
        {"start": "12:45", "end": "14:15"},
        {"start": "14:30", "end": "16:00"},
        {"start": "16:15", "end": "17:45"},
        {"start": "18:00", "end": "19:30"},
        {"start": "19:45", "end": "21:15"}
    ]

    var days = ["Po", "Út", "St", "Čt", "Pá"];
    
    var timetable = `<div class="table">
    <div class="t-row">
        <div class="t-head">Den</div>`;
        $.each(times, function(index, value) {
            timetable += `<div class="t-head">${value.start} - ${value.end}</div>`;
        });
    timetable += `</div>`;

    $.each(days, function(i, day) {
        timetable += `<div class="t-row">
            <div class="t-head">${day}</div>`;
            var dayLessons = lessons.filter(x => x.day == day);
            $.each(times, function(i, time) {
                var timeLessons = dayLessons.filter(x => x.start == time.start);
                timetable += `<div class="t-cell">`;
                if(timeLessons.length){
                    $.each(timeLessons, function(i, value) {
                        var type = value.type == "Přednáška" ? "lecture" : "seminar";
                        timetable += `<div class="timetable-lesson lesson-${type}">
                                ${value.name}
                                <span class="room">${value.room}</span>
                            </div>`;
                    });
                }
                timetable += `</div>`;
            });
        timetable += `</div>`;
    });
    timetable += `</div>`;
    return timetable;
}

function showActions(lessons){
    var actions = `<div class="table">
        <div class="t-row">
            <div class="t-head">Den</div>
            <div class="t-head">Výuka</div>
            <div class="t-head">Předmět</div>
            <div class="t-head">Akce</div>
            <div class="t-head">Místnost</div>
        </div>`;
    $.each(lessons, function(index, value) {
        actions += `<div class="t-row">
                <div class="t-cell">${value.day}</div>
                <div class="t-cell">${value.start} - ${value.end}</div>
                <div class="t-cell cell-name"><strong>${value.ident}</strong> ${value.name}</div>
                <div class="t-cell">${value.type}</div>
                <div class="t-cell">${value.room}</div>
            </div>`;
    });
    actions += '</div>';
    return actions;
}

function addTask(taskForm){
    $.ajax({
        url: 'http://chrome-app.vseved.eu/tasks/',
        headers: {"Token": token},
        type: 'post',
        dataType: 'json',
        data: taskForm.serialize(),
    }).done(function(data) {
        if(data.success){
            taskForm[0].reset();
            loadTasks();
        }
    });
}

function deleteTask(id){
    $.ajax({
        url: 'http://chrome-app.vseved.eu/tasks/',
        headers: {"Token": token},
        type: 'post',
        dataType: 'json',
        data: {
            'delete': true,
            'id': id
        }
    }).done(function(data){
        if(data.success){
            loadTasks();
        }
    });
}

function showTasks(tasks){
    var taskList = `<div class="table">
        <div class="t-row">
            <div class="t-head">Předmět</div>
            <div class="t-head">Název</div>
            <div class="t-head">Text</div>
            <div class="t-head">Akce</div>
        </div>`;
    $.each(tasks, function(index, value) {
        taskList += `<div class="t-row">
                <div class="t-cell">${value.subject}</div>
                <div class="t-cell">${value.name}</div>
                <div class="t-cell">${value.text}</div>
                <div class="t-cell"><button class="delete-task" value="${value.id}" name="delete">Dokončen</button></div>
            </div>`;
    });
    taskList += '</div>';
    return taskList;
}

function loadTasks(){
    $.ajax({
        type: 'post',
        url: "http://chrome-app.vseved.eu/tasks/",
        headers: {"Token": token},
        dataType: 'json'
    }).done(function(data) {
        var tasks = $('.tasks');
        if(data.success){
            tasks.html(showTasks(data.tasks));
        } else {
            tasks.html('Zatím nemáš přidané žádné úkoly');
        }
    });
}

function loadTaskForm(lessons){
    var taskForm = `<form id='add-task'>
        <input type='hidden' name='add' value='true'/>
        <label for='name'>Název</label>
        <input type='text' name='name' required />
        <label for='subject'>Předmět</label>
        <select class='subject-select' name='subject'></select>
        <label for='text'>Text</label>
        <textarea name='text' rows='5' required></textarea>
        <button class='submit-task'>Přidat úkol</button>
    </form>`;
    $('.add-task').html(taskForm);
    var select ='';
    $.each(lessons, function(index, value) {
        if(select.indexOf(value.ident) <= 0){
            select += `<option value="${value.ident} ${value.name}">${value.ident} - ${value.name}</option>`;
        }
    });
    $('select.subject-select').html(select);
}

function importTimetable(){
    if (confirm('Opravdu chceš importovat rozvrh? Předchozí rozvrh bude smazán!')) {
        var lessons = [];
        var regexIdent = /([1-6][a-zA-Z]{2}[0-9]{3})|(TVS[0-9a-zA-Z]{3})/;
        var regexName = /((?<=[1-6][a-zA-Z]{2}[0-9]{3} )|(?<=TVS[0-9a-zA-Z]{3} ))(.+)/;
        var regexSyllabus = /(?<=predmet=)\d+(?=;)/;
        var regexTeacher = /(?<=id=)\d+(?=;)/;

        $.ajax({
            url: 'https://insis.vse.cz/auth/katalog/rozvrhy_view.pl?format=list;zobraz=Zobrazit;osobni=1;',
            type: 'get',
            dataType: 'html',
            statusCode: {
                403: function() { 
                    alert('Pro import rozvrhu se musíš přihlásit do InSISu!');
                }
            }
        }).done(function(insisHtml){
            var html = $(insisHtml);
            $('img',html).attr('src','');
            html.find('table#tmtab_1 > tbody  > tr').each(function() {
                var getRow = $(this);
                var identName = getRow.children('td:nth-child(4)').text();
                var ident = regexIdent.exec(identName);
                var name = regexName.exec(identName);
                name = name[0].replace(/&nbsp;/, ' ');
                name = name.replace(/\([\d,]+\)/, '');
                var day = getRow.children('td:nth-child(1)').text();
                var start = getRow.children('td:nth-child(2)').text();
                var end = getRow.children('td:nth-child(3)').text();
                var type = getRow.children('td:nth-child(5)').text();
                var room = getRow.children('td:nth-child(6)').text();
                var teacher = getRow.children('td:nth-child(7)').text();
                var syllabus = regexSyllabus.exec(getRow.children('td:nth-child(4)').find('a').attr('href'));
                var teacher_link = regexTeacher.exec(getRow.children('td:nth-child(7)').find('a').attr('href'));
                var row = {
                    'ident': ident[0],
                    'name': name,
                    'day': day,
                    'start': start,
                    'end': end,
                    'type':	type,
                    'room':	room,
                    'teacher': teacher, 
                    'syllabus': syllabus[0],
                    'teacher_link': teacher_link[0]
                }
                lessons.push(row);
            });
            $.ajax({
                type: 'post', url: 'https://chrome-app.vseved.eu/add/',
                headers: {'Token': token},
                contentType : 'application/json',
                data: JSON.stringify(lessons),
                dataType: 'json'
            }).done(function() {
                location.reload();
            });
        });
        
    }
}