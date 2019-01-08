
$('<p class="import-timetable"><button onclick="importTimetable()">Importovat rozvrh do rozšíření</button></p>').insertAfter('table#tmtab_1');
$('p.import-timetable').find('button').css('cursor', 'pointer');

function importTimetable(){
    if (confirm('Opravdu chceš importovat rozvrh? Předchozí rozvrh bude smazán!')) {
        var lessons = [];
        var regexIdent = /([1-6][a-zA-Z]{2}[0-9]{3})|(TVS[0-9a-zA-Z]{3})/;
        var regexName = /((?<=[1-6][a-zA-Z]{2}[0-9]{3} )|(?<=TVS[0-9a-zA-Z]{3} ))(.+)/;
        var regexSyllabus = /(?<=predmet=)\d+(?=;)/;
        var regexTeacher = /(?<=id=)\d+(?=;)/;
        $('table#tmtab_1 > tbody  > tr').each(function() {
            var identName = $(this).children('td:nth-child(5)').find('a').html();
            var ident = regexIdent.exec(identName);
            var name = regexName.exec(identName);
            name = name[0].replace(/&nbsp;/, ' ');
            var day = $(this).children('td:nth-child(2)').find('small').html();
            var start = $(this).children('td:nth-child(3)').find('small').html();
            var end = $(this).children('td:nth-child(4)').find('small').html();
            var type = $(this).children('td:nth-child(6)').find('small').html();
            var room = $(this).children('td:nth-child(7)').find('a').html();
            var teacher = $(this).children('td:nth-child(8)').find('a').html();
            var syllabus = regexSyllabus.exec($(this).children('td:nth-child(5)').find('a').attr('href'));
            var teacher_link = regexTeacher.exec($(this).children('td:nth-child(8)').find('a').attr('href'));
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
        }).done(function(data) { 
            console.log(data);
            if(data.success) {
                $('p.import-timetable').css('color', '#74b567');
                $('p.import-timetable').html('Rozvrh byl úspěšně importován.');
            } else {
                $('p.import-timetable').css('color', '#ca5c54');
                $('p.import-timetable').html('Něco se pokazilo :(');
            }
        });
    }
}