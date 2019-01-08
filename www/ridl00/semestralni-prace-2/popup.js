$(document).ready(function(){
    $('.go-to-timetables').click(function(){
        chrome.tabs.create({url: "https://insis.vse.cz/auth/katalog/rozvrhy_view.pl?format=list;zobraz=Zobrazit;osobni=1;activate_my_timetable=1"});
    });

    $.ajax({
        type: 'POST', url: "http://chrome-app.vseved.eu/",
        headers: {"Token": token},
        dataType: 'json'
    }).done(function(data) {
        
        if(data.success){
            var template = '';
            template += '<table>' +
                '<tr>' + 
                    '<th>Den</th>' +
                    '<th>Výuka</th>' +
                    '<th>Předmět</th>' +
                    '<th>Akce</th>' +
                    '<th>Místnost</th>' +
                '</tr>';
            $.each(data.lessons, function(index, value) {
                var row = '<tr>' + 
                        '<td>' +  value.day + '</td>' +
                        '<td>' +  value.start + ' - ' + value.end + '</td>' +
                        '<td class="name"><strong>' +  value.ident + '</strong> ' + value.name + '</td>' +
                        '<td>' +  value.type + '</td>' +
                        '<td>' +  value.room + '</td>' +
                    '</tr>';
                template += row;
            });
            template += '</table>';
            $('.timetable').html(template);
        } else {
            $('.timetable').html('Importuj rozvrh kliknutím na tlačítko importovat rozvrh. Po kliknutí se v InSISu otevře seznam rozvrhových akcí a pod ním tlačítko "Importovat rozvrh do rozšíření".');
        }
    });
});