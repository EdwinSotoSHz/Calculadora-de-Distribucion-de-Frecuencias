/* *****************************************************************************************************
            * Obtener datos del usuario
***************************************************************************************************** */
var inputElement = document.getElementById('inputData');
var getData = function () {
    var inputString = inputElement.value.trim();
    var dataArray = inputString.split(',').map(function (value) { return value.trim(); });
    return dataArray;
};
var getValueCheck = function (checkElement) {
    var isChecked = false;
    if (checkElement != null) {
        isChecked = checkElement.checked;
    }
    //console.log(isChecked)
    return isChecked;
};
var checkType = document.getElementById('type');
var checkOrder = document.getElementById('checkOrder');
var checkWay = document.getElementById('checkWay');
var tableContainer = document.getElementById('tableContainer');
var numClass = document.getElementById('numClass');
var content = [];
var titleChart = document.getElementById('titleChart');
var showData = function () {
    checkBarPlot.checked = true;
    checkPiePlot.checked = true;
    checkHistogram.checked = true;
    checkOgive.checked = true;
    checkFrequencyPolygon.checked = true;
    checkBarPlot.click();
    checkPiePlot.click();
    checkHistogram.click();
    checkOgive.click();
    checkFrequencyPolygon.click();
    titleChart.removeAttribute('disabled');
    var classNum = 0;
    var dataArray = getData();
    var headers = [];
    var isContinuosData = getValueCheck(checkType);
    if (isContinuosData == false) {
        checkOrder.removeAttribute('disabled');
        if (checkWay.checked == true) {
            checkWay.click();
        }
        checkWay.setAttribute('disabled', 'true');
        numClass.setAttribute('disabled', 'true');
        var sortByFreq = getValueCheck(checkOrder);
        headers = ["Clase", "F<sub>a</sub>", "F<sub>r</sub>", "F<sub>r</sub> Acum."];
        var class_fa_fr_frAc = generateDiscreteCuantitativeData(dataArray, sortByFreq);
        classNum = class_fa_fr_frAc[0].length;
        numClass.value = classNum.toString();
        content = class_fa_fr_frAc;
    }
    else {
        if (checkOrder.checked == true) {
            checkOrder.click();
        }
        checkOrder.setAttribute('disabled', 'true');
        checkWay.removeAttribute('disabled');
        numClass.removeAttribute('disabled');
        var way = getValueCheck(checkWay);
        headers = ["Clases", "Límites inferiores", "Límites superiores", "Marca de clase", "F<sub>a</sub>", "F<sub>r</sub>", "F<sub>r</sub> Acum."];
        var mkC_fa_fr_frAc_class_limsL_limsU = generateContinousCuantitativeData(dataArray, way, numClass.value);
        classNum = mkC_fa_fr_frAc_class_limsL_limsU[0].length;
        numClass.value = classNum.toString();
        content = mkC_fa_fr_frAc_class_limsL_limsU;
    }
    if (tableContainer != null) {
        //console.table(class_fa_faAc_fr_frAc)
        tableContainer.innerHTML = '';
        if (content.length == 4) {
            printHTMLTable(headers, content, tableContainer);
        }
        else {
            printHTMLTable(headers, [content[4], content[5], content[6], content[0], content[1], content[2], content[3]], tableContainer);
        }
    }
};
var btnData = document.getElementById('btnData');
if (btnData != null) {
    btnData.addEventListener('click', showData);
}
if (checkOrder != null) {
    checkOrder.addEventListener('click', showData);
}
if (checkWay != null) {
    checkWay.addEventListener('click', showData);
}
if (checkType != null) {
    checkType.addEventListener('change', function () { numClass.value = ''; });
}
inputElement.addEventListener('change', function () {
    var inputString = inputElement.value;
    inputElement.value = inputString.replace(/[^,\.\d]/g, '').replaceAll(',,', ',').replaceAll(',,,', ',');
    if (inputString.includes('.')) {
        checkType.checked = true;
    }
    else {
        checkType.checked = false;
    }
    numClass.value = '';
});
/*
    * Obtener datos del usuario (Gráficas)
*/
var graphics = document.getElementById("graphics");
var checkBarPlot = document.getElementById('checkBarPlot');
checkBarPlot.addEventListener('change', function () {
    var _a;
    var barPlot = document.createElement("div");
    barPlot.id = "barPlot";
    if (getValueCheck(checkBarPlot)) {
        graphics === null || graphics === void 0 ? void 0 : graphics.appendChild(barPlot);
        generateHorizontalBarChart(barPlot, content[1], content[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
    }
    else {
        (_a = document.getElementById("barPlot")) === null || _a === void 0 ? void 0 : _a.remove();
    }
});
var checkPiePlot = document.getElementById('checkPiePlot');
checkPiePlot.addEventListener('change', function () {
    var _a;
    var piePlot = document.createElement("div");
    piePlot.id = "piePlot";
    if (getValueCheck(checkPiePlot)) {
        graphics === null || graphics === void 0 ? void 0 : graphics.appendChild(piePlot);
        generatePieChart(piePlot, content[2], content[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
    }
    else {
        (_a = document.getElementById("piePlot")) === null || _a === void 0 ? void 0 : _a.remove();
    }
});
var checkHistogram = document.getElementById('checkHistogram');
checkHistogram.addEventListener('change', function () {
    var _a;
    var histogram = document.createElement("div");
    histogram.id = "histogram";
    if (getValueCheck(checkHistogram)) {
        graphics === null || graphics === void 0 ? void 0 : graphics.appendChild(histogram);
        generateHistogram(histogram, content[2], content[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
    }
    else {
        (_a = document.getElementById("histogram")) === null || _a === void 0 ? void 0 : _a.remove();
    }
});
var checkOgive = document.getElementById('checkOgive');
checkOgive.addEventListener('change', function () {
    var _a;
    var ogive = document.createElement("div");
    ogive.id = "ogive";
    if (getValueCheck(checkOgive)) {
        graphics === null || graphics === void 0 ? void 0 : graphics.appendChild(ogive);
        generateOgive(ogive, content[3], content[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
    }
    else {
        (_a = document.getElementById("ogive")) === null || _a === void 0 ? void 0 : _a.remove();
    }
});
var checkFrequencyPolygon = document.getElementById('checkFrequencyPolygon');
checkFrequencyPolygon.addEventListener('change', function () {
    var _a;
    var frequencyPolygon = document.createElement("div");
    frequencyPolygon.id = "frequencyPolygon";
    if (getValueCheck(checkFrequencyPolygon)) {
        graphics === null || graphics === void 0 ? void 0 : graphics.appendChild(frequencyPolygon);
        generateFrequencyPolygon(frequencyPolygon, content[2], content[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
    }
    else {
        (_a = document.getElementById("frequencyPolygon")) === null || _a === void 0 ? void 0 : _a.remove();
    }
});
