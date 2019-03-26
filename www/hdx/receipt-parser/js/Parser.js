var RECEIPT_STR_WIDTH = 33;
var htmlReceiptFile = "uctenka_objednavka.html";
var receipt = {
    type: null,
    receiptItems: []
}

function parseHTML(file) {
    $.ajax({
        type: "GET",
        url: file,
        dataType: "text",
        async: true,
        success: function(data) {
            $("#app").html(
                '<table style="border: 1px solid black;">' + 
                    '<tr>' +
                        '<th> Status </th>' +
                        '<th> FileName </th>' +
                    '</tr>' +
                    '<tr>' +
                        '<td> Reading Finished </td>' +
                        '<td>' + htmlReceiptFile + '</td>' +
                    '<tr>' +
                '</table>' +
                data
                );

            var parser = new DOMParser();
            var parsedHtml = parser.parseFromString(data, 'text/html');
            var receiptItems = parsedHtml.getElementsByClassName('receipt-item');

            /** receipt */
            if(parsedHtml.getElementsByClassName('receipt-header').length > 0) {
                receipt.type = 'receipt';
                receipt.companyName = parsedHtml.getElementsByClassName('company-name')[0].textContent;
                receipt.address = parsedHtml.getElementsByClassName('address-1')[0].textContent + ', ' + parsedHtml.getElementsByClassName('address-2')[0].textContent;
                receipt.tin = parsedHtml.getElementsByClassName('tin')[0].textContent.substring(4);
                receipt.receiptNumber = parsedHtml.getElementById('receipt-number').textContent.substring(17);
                for(var i = 1; i < receiptItems.length; i++) {
                    var receiptItem = {};
                    receiptItem.itemName = receiptItems[i].getElementsByClassName("ri-n")[0].textContent;
                    receiptItem.itemCount = receiptItems[i].getElementsByClassName("ri-v")[0].getElementsByClassName("ri-q")[0].textContent;
                    receiptItem.itemPrice = receiptItems[i].getElementsByClassName("ri-v")[0].getElementsByClassName("ri-tt")[0].textContent;
                    
                    receipt.receiptItems.push(receiptItem);
                }
                receipt.subtotal = parsedHtml.getElementById('rs-subtotal').children[1].textContent;
            }
            /** order */
            else if(parsedHtml.getElementsByClassName('receipt-order-header').length > 0) {
                receipt.type = 'order';
                receipt.orderNumber = parsedHtml.getElementsByClassName('receipt-order-number')[0].textContent;
                receipt.date = parsedHtml.getElementsByClassName('receipt-order-header')[1].children[0].textContent + parsedHtml.getElementsByClassName('receipt-order-header')[1].children[1].textContent;
                for(var i = 0; i < receiptItems.length; i++) {
                    var receiptItem = {};
                    receiptItem.itemName = receiptItems[i].getElementsByClassName("ri-n")[0].textContent;
                    receiptItem.itemCount = receiptItems[i].getElementsByClassName("ri-v")[0].getElementsByClassName("ri-q")[0].textContent;
                    
                    receipt.receiptItems.push(receiptItem);
                }
            }

            buildReceiptString();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#app").html(
                '<table style="border: 1px solid black;">' + 
                    '<tr>' +
                        '<th> Status </th>' +
                        '<th> ThrownError </th>' +
                        '<th> FileName </th>' +
                    '</tr>' +
                    '<tr>' +
                        '<td>' + xhr.status + '</td>' +
                        '<td>' + thrownError + '</td>' +
                        '<td>' + htmlReceiptFile + '</td>' +
                    '<tr>' +
                '</table>');
        }
    });
}

function buildReceiptString() {
    var str = getReceiptString();
    console.log(str);

    var blob = new Blob([str], {type:"text/plain;charset=utf-8"});
    saveAs(blob, htmlReceiptFile.slice(0, htmlReceiptFile.length - 5) + '.txt');
}

function getReceiptString() {
    var str = '';
    switch(receipt.type) {
        case 'receipt':
            str += getCenterStr(receipt.companyName) +
                getCenterStr(receipt.address) +
                getElementValueStr('ICO:', receipt.tin) +
                getElementValueStr('Provozovna:', receipt.address) + 
                getElementValueStr('Doklad c.:', receipt.receiptNumber) +
                getLine();
            receipt.receiptItems.forEach(function(receiptItem) {
                str += receiptItem.itemName + '\n' +
                    getElementValueStr('    ' + receiptItem.itemCount + ' x', receiptItem.itemPrice + ' Kč');
            });
            str += getLine() +
                getElementValueStr('Počet položek:', receipt.receiptItems.length.toString()) +
                getElementValueStr('Mezisoučet:', receipt.subtotal + ' Kč') +
                getLine();
            break;
        case 'order':
            str += getCenterStr('Objednávka' + receipt.orderNumber) +
                getCenterStr(receipt.date) + 
                getLine();
            receipt.receiptItems.forEach(function(receiptItem) {
                str += receiptItem.itemName + '\n' +
                    '    ' + receiptItem.itemCount + '\n';
            });
            break;
        default:
            break;
    }
    
    return str;
}

function getLine() {
    return '-'.repeat(RECEIPT_STR_WIDTH) + '\n';
}

function getCenterStr(str) {
    return str.padStart(RECEIPT_STR_WIDTH - ((RECEIPT_STR_WIDTH - str.length)/2), ' ') + '\n';
}

function getElementValueStr(element, value) {
    if (element.length + value.length + 1 <= RECEIPT_STR_WIDTH) {
        return element + value.padStart(RECEIPT_STR_WIDTH-element.length) + '\n';
    } else {
        return element + '\n' + value.padStart(RECEIPT_STR_WIDTH) + '\n';
    }
}

parseHTML(htmlReceiptFile);
