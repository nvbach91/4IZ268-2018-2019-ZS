/* global $, App, grecaptcha */

/*@license*/
/*!
 * Copyright (c) 2017-2018 Ethereals United <etherealcz@gmail.com>
 * All Rights Reserved
 * 
 * Application : Online Barcode Printer (Module of Online POS System GOKASA)
 * Written by  : Nguyen Viet Bach <nvbach91@outlook.com>
 * 
 */
var App = App || {};

App.renderApp = function () {
    var appDOM = 
    '<div class="menu-top">' +
        '<div id="logo">' +
            '<div class="logo"></div>' +
        '</div>' +
        '<div id="brand">GOKASA Barcode Printer</div>' + 
        '<div id="instructions"><a href="https://goo.gl/9nwyy3" target="_blank">Instructions</a></div>' + 
    '</div>' +
    '<div class="main">' +
        '<div class="side-bar">' +
            '<div class="control-group">' +
                '<form id="control-form-add">' +
                    '<div class="form-group">' +
                        '<label class="sb-label">Number of cell copies</label>' +
                        '<input id="cells-count" type="number" min="1" class="form-control" autocomplete="off">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<div class="sb-label">Label name</div>' +
                        '<input id="label-name" class="form-control" autocomplete="off" title="Free text">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<div class="sb-label">Barcode value</div>' +
                        '<input id="barcode-input" class="form-control" autocomplete="off" required pattern="(\\d+(-?\\d+)?)|(\\d+(;\\s?\\d+)+)" title="Only numbers allowed. You can also input a number range, e.g. 1-9 will add 9 cells with their values respectively, or a list of barcodes separated by semicolons (;)">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<button type="submit" id="add-cell" class="btn btn-primary">Add [ENTER]</button>' +
                    '</div>' +
                '</form>' +
                '<form id="more-settings">' +
                    '<div class="form-group">' +
                        '<button id="expand-more-settings" class="btn btn-primary">More Settings</button>' +
                    '</div>' +
                    '<div class="form-body">' +
                        '<div class="form-group">' +
                            '<label class="sb-label">Skip cells</label>' +
                            '<input id="skip-cells" type="number" min="0" class="form-control" autocomplete="off">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label class="sb-label">Row cells count</label>' +
                            '<input id="row-cells-count" type="number" min="1" class="form-control" autocomplete="off">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<div class="sb-label">Cell height (cm)</div>' +
                            '<input id="cell-height" class="form-control" autocomplete="off" required>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<button id="set-settings" class="btn btn-primary">Set</button>' +
                        '</div>' +
                    '</div>' +
                '</form>' +
            '</div>' +
            '<div class="control-group">' +
                '<form id="control-form-others">' +
                    '<div class="form-group">' +
                        '<button id="print" class="btn btn-primary">Print [CTRL+P]</button>' +
                    '<div class="form-group">' +
                    '</div>' +
                        '<button id="clear-all" class="btn btn-danger">Clear all</button>' +
                    '</div>' +
                '</form>' +
                '<div id="stats">' +
                    '<div id="active-cells-count">Number of active cells: <span>0</span></div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div id="preview">' +
            '<div id="paper"></div>' +
        '</div>' +
    '</div>';
    $("#app").html(appDOM);
};

App.showInCurtain = function (item) {
    var curtain = $('<div id="curtain"></div>');
    curtain.click(function () {
        curtain.remove();
    });
    curtain.append(item);
    $(document.body).append(curtain);
};

App.warn = function (msg) {
    var warning = $(
    '<div class="warning">' +
        '<div class="msg">' + msg + '</div>' +
        '<button class="btn btn-primary">OK</button>' +
    '</div>'
    );
    App.showInCurtain(warning);
    warning.find('button').click(function () {
        App.jBarcodeInput.focus();
    }).focus();
};
    
App.bindControls = function () {
    App.jControlFormAdd.submit(function (e) {
        e.preventDefault();
        var nCellsToAdd = App.jCellsCountInput.val();
        if (/^\d+$/.test(nCellsToAdd)) {
            nCellsToAdd = parseInt(nCellsToAdd);
        } else {
            nCellsToAdd = 1;
        }
        var barcodeInput = App.jBarcodeInput.val().replace(/\s+/g, "");
        var labelNameInput = App.jLabelNameInput.val().trim().replace(/\s+/g, " ");
        if (/^\d+\-\d+$/.test(barcodeInput)) {
            var barcodes = barcodeInput.split("-"); 
            var barcodeFrom = parseInt(barcodes[0]);
            var barcodeTo = parseInt(barcodes[1]);
            if (barcodeFrom <= barcodeTo) {
                var totalCellsToBeAdded = (barcodeTo - barcodeFrom + 1) * nCellsToAdd;
                if (App.jPaper.children().size() + totalCellsToBeAdded + App.skipCells > App.maximumCellsCount) {
                    App.warn("Cannot create more than " + App.maximumCellsCount + " labels at once<br>You were trying to create " + (totalCellsToBeAdded + App.skipCells) + " cells");
                    return false;
                }
                App.jPaper.detach();
                for (var i = barcodeFrom; i <= barcodeTo; i++) {
                    App.addCells(labelNameInput, i.toString(), nCellsToAdd);
                }
                App.jPreview.append(App.jPaper);
            } else {
                App.warn("Barcode value interval must be ascending, e.g. 1-9, not 9-1");
            }
        } else if (/^\d+(;\d+)+$/.test(barcodeInput)) {
            var barcodeList = barcodeInput.split(";");
            App.jPaper.detach();
            for (var i = 0; i < barcodeList.length; i++) {
                App.addCells(labelNameInput, barcodeList[i], nCellsToAdd);
            }
            App.jPreview.append(App.jPaper);
        } else {
            if (App.jPaper.children().size() + nCellsToAdd + App.skipCells > App.maximumCellsCount) {
                App.warn("Cannot create more than " + App.maximumCellsCount + " labels at once<br>You were trying to create " + (nCellsToAdd + App.skipCells) + " cells");
                return false;
            }
            App.addCells(labelNameInput, barcodeInput, nCellsToAdd);
        }
    });
    App.jMoreSettingsForm.submit(function (e) {
        e.preventDefault();
    });
    App.jSetSettings.click(function (e) {
        var rowCellsCount = App.jRowCellsCount.val();
        var height = App.jCellHeight.val();
        if(!rowCellsCount || !height)
            return;

        var widthPercentage = 100 / rowCellsCount;
        App.rowCellsCount = rowCellsCount;
        App.cellHeight = height;
        App.cellWidthPercentage = widthPercentage;
        App.updateStats();
    });
    App.jControlFormOthers.submit(function (e) {
        e.preventDefault();
    }).hide();
    App.jCellsCountInput.on("focus click", function () {
        App.jCellsCountInput.select();
    });
    App.jBarcodeInput.on("focus click", function () {
        App.jBarcodeInput.select();
    });
    App.jLabelNameInput.on("focus click", function () {
        App.jLabelNameInput.select();
    });
    App.jCellAdder.click(function (e) {});
    App.jExpandMoreSettings.click(function (e) {
        $(this).parent().remove();
        App.jMoreSettingsForm.children().show();
    });
    var evaluateInputChange = function () {
        var val = App.jSkipCells.val();
        if (/^\d+$/.test(val)) {
            App.skipCells = parseInt(val);
        } else {
            App.skipCells = 0;
        }
    };
    App.jSkipCells.on("change keyup", evaluateInputChange).on("focus click", function () {
        App.jSkipCells.select();
    });
    App.jClearAll.click(function () {
        var t = $(this);
        var confirmTimeout = 0;
        if (!t.hasClass("confirm")) {
            t.text("Are you sure?");
            t.addClass("confirm");
            confirmTimeout = setTimeout(function () {
                t.text("Clear all");
                t.removeClass("confirm");
            }, 5000);
        } else {
            App.jPaper.empty();
            t.text("Clear all");
            t.removeClass("confirm");
            clearTimeout(confirmTimeout);
            App.jControlFormOthers.hide();
            App.updateStats();
        }
    });
    App.jPrintButton.click(function () {
        window.print();
    });
    $(document).scannerDetection(function (scannedValue) {
        var activeElement = $(document.activeElement);

        App.jBarcodeInput.val(scannedValue);
        App.jCellAdder.click();
    });
};

App.updateStats = function () {
    console.log("log> updating")
    $(".cell").css("width", App.cellWidthPercentage + "%");
    $(".cell").css("height", App.cellHeight + "cm");
    App.jActiveCellsCount.find("span").text(App.jPaper.children().size());
};

App.init = function () {
    App.renderApp();
    App.maximumCellsCount = 260;
    App.rowCellsCount = 5;
    App.skipCells = 0;
    App.cellHeight = $(".cell").css("height");;
    App.cellWidthPercentage = $(".cell").css("width");

    App.jPreview = $("#preview");
    App.jPaper = $("#paper");
    App.jControlFormAdd = $("#control-form-add");
    App.jMoreSettingsForm = $("#more-settings");
    App.jExpandMoreSettings = $("#expand-more-settings");
    App.jSkipCells = $("#skip-cells").val(App.skipCells);
    App.jRowCellsCount = $("#row-cells-count").val(App.rowCellsCount); //App.jRowCellsCount.parent().hide();
    App.jCellHeight = $("#cell-height"); //App.jCellHeight.parent().hide();
    App.jSetSettings = $("#set-settings");   
    App.jControlFormOthers = $("#control-form-others");

    App.jCellsCountInput = $("#cells-count").val(1);
    App.jBarcodeInput = $("#barcode-input");
    App.jLabelNameInput = $("#label-name");
    App.jCellAdder = $("#add-cell");
    App.jClearAll = $("#clear-all");
    App.jPrintButton = $("#print");

    App.jActiveCellsCount = $("#active-cells-count");

    App.bindControls();
};

App.addCells = function (name, barcode, count) {
    if (!barcode || !count) {
        return false;
    }
    var cells = $('<div></div>');
    for (var i = 0; i < App.skipCells; i++) {
        var cell = $('<div class="cell"></div>');
        var remover = $('<div class="remover"></div>').click(function () {
            $(this).parent().addClass('removing');
            $(".removing").css("width", 0);
        });
        cell.append(remover);
        cell.on('transitionend', function () {
            if(this.classList.contains('removing')) {
                this.remove();
                if (!App.jPaper.children().size()) {
                    App.jControlFormOthers.hide();
                }
                App.updateStats();
            }
        });
        cells.append(cell);
        App.updateStats();
    }
    for (var i = 0; i < count; i++) {
        var cell = $('<div class="cell"></div>');
        var canvas = $('<svg class="ean-canvas"></svg>');
        canvas.JsBarcode(barcode, {
            height: 20,
            width: 1,
            displayValue: true,
            fontSize: 10,
            font: "Arial",
            background: "rgba(0,0,0,0)",
            margin: 0
        });
        var remover = $('<div class="remover"></div>').click(function () {
            $(this).parent().addClass('removing');
            $(".removing").css("width", 0);
        });
        var labelName = $('<div class="label-name">' + name + '</div>');
        cell.append(remover);
        cell.append(labelName);
        cell.append(canvas);
        cell.on('transitionend', function () {
            if(this.classList.contains('removing')) {
                this.remove();
                if (!App.jPaper.children().size()) {
                    App.jControlFormOthers.hide();
                }
                App.updateStats();
            }
        });
        cells.append(cell);
    }
    App.jPaper.append(cells.children());
    App.updateStats();
    App.jControlFormOthers.show();
};

$(document).ready(function () {
    App.init();
});