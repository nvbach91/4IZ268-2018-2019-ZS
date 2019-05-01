var parseHtmlReceiptToText = function () {
    var maxWidths = { '190': 120, '80': 50, '76': 44, '72': 40, '58': 32, '48': 28, '42': 22 };
    var receiptContainer = App.curtain.find('.receipt-container'); 
    var maxWidth = maxWidths[receiptContainer.attr('class').replace(/[^0-9]/g, '')];
    var horizontalLine = '-'.repeat(maxWidth);
    var receipt = receiptContainer.children('.receipt');
    var text = '';
    receipt.children('.receipt-header').children().each(function () {
        $(this).children(':not(.preview)').each(function () {
            if ($(this).text()) {
                text += '\t' + $(this).text() + '\t\n';
            }
        });
    });
    receipt.children('.receipt-body').children().each(function () {
        var item = $(this);
        if (item.is(':visible')) {
            
            text += item.find('.ri-n').text() + '\n';
            text += 
                ' ' + 
                item.find('.ri-q').text() + ' x\t' + 
                item.find('.ri-p').text() + '\t' + 
                item.find('.ri-tt').text() + ' ' +
                item.find('.ri-tm').text() + '\n';
        }
    });
    text += horizontalLine + '\n';
    receipt.find('#receipt-summary .rs-col:nth-child(1)').children().each(function () {
        var t = $(this);
        var line = t.children().eq(0).text() + '\t' + t.children().eq(1).text();
        if (t.attr('id') === 'rs-total') {
            text += App.ESCPOS.bigFont(line) + '\n';
        } else {
            text += line + '\n';
        }
    });
    text += '\t' + receipt.find('#taxes-label').text() + '\t\n';
    receipt.find('#receipt-summary .rs-col:nth-child(2)').children().each(function () {
        var divs = $(this).children();
        if (divs.size()) {
            text += divs.eq(0).text() + '\t' + divs.eq(1).text() + '\t' + divs.eq(2).text().trim();
            if (maxWidth > 32) {
                text += + '\t' + divs.eq(3).text() + '\n';
            } else {
                text += '\n';
            }
        }
    });
    var orsLines = receipt.find('.receipt-ors');
    if (orsLines.size()) {
        text += horizontalLine + '\n';
        orsLines.each(function () {
            text += $(this).text() + '\n';
        });
    }
    text += horizontalLine + '\n';
    text += receipt.find('.receipt-clerk').text() + '\n';
    text += receipt.find('#receipt-time').text() + '\n';
    text += receipt.children('.receipt-footer').text().trim() + '\n';
    receipt.find('.receipt-end').remove();
    text += '\t' + receipt.children('.receipt-brand').text().trim().replace('©', '(c)') + '\t\n';
    text = formatText(text, maxWidth);
    console.log(text);
};

var parseHtmlOrderToText = function () {
    var maxWidths = { '190': 120, '80': 50, '76': 44, '72': 40, '58': 32, '48': 28, '42': 22 };
    var receiptContainer = App.curtain.find('.receipt-container'); 
    var maxWidth = maxWidths[receiptContainer.attr('class').replace(/[^0-9]/g, '')];
    var horizontalLine = '-'.repeat(maxWidth);
    var receipt = receiptContainer.children('.receipt.order');
    var text = '';
    receipt.children('.receipt-order-header').each(function() {
        text += '\t';
        $(this).children().each(function () {
            if ($(this).text()) {
                text += $(this).text() + ' ';
            }
        });
        text += '\t\n'
    });
    text += horizontalLine + '\n';
    receipt.children('.receipt-body').children().each(function () {
        var item = $(this);
        if (item.is(':visible')) {
            
            text += item.find('.ri-n').text() + '\n';
            text += 
                ' ' + 
                item.find('.ri-q').text() + ' x\n';
        }
    });
    text = formatText(text, maxWidth);
    console.log(text);
}

var formatText = function (text, maxWidth) {
    return text.split('\n').map(function (line) {
        var tabs = line.match(/\t/g);
        if (tabs) {
            var lineLength = line.length;
            if (line.includes('\x1b\x21\x10') && line.includes('\x1b\x21\x00')) {
                lineLength -= 6;
            }
            var spaceCount = Math.floor((maxWidth - lineLength) / tabs.length) + 1;
            if (spaceCount > 0) {
                line = line.replace(/\t/g, ' '.repeat(spaceCount));
            } else {
                line = line.replace(/\t/g, '');
            }
        }
        if (maxWidth - line.length === 1) {
            line = line.replace(' ', '  ');
        }
        line = line.replace('€', 'E');
        return App.removeDiacritics(line);
    }).join('\n');
}