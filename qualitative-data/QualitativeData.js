/*
    * Metodos para contruir las distribuciones de frecuencia
*/
var highestToLowestFreu = function (classList, freqList) {
    var _a, _b;
    var l = classList.length;
    for (var i = 0; i < l; i++) {
        var elemento = i;
        for (var j = i + 1; j < l; j++) {
            if (freqList[j] < freqList[elemento]) {
                elemento = j;
            }
        }
        _a = [classList[elemento], classList[i]], classList[i] = _a[0], classList[elemento] = _a[1];
        _b = [freqList[elemento], freqList[i]], freqList[i] = _b[0], freqList[elemento] = _b[1];
    }
    return [classList, freqList];
};
var formatData = function (dataArray) {
    var dataArraySorted = [];
    for (var _i = 0, dataArray_1 = dataArray; _i < dataArray_1.length; _i++) {
        var element = dataArray_1[_i];
        if (typeof element === 'string') {
            element = (element.trim().toLowerCase()).replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u');
            dataArraySorted.push(element);
        }
        else {
            element = parseFloat(element.toFixed(3));
            dataArraySorted.push(element);
        }
    }
    return dataArraySorted;
};
var sum = function (array) {
    return array.reduce(function (accumulator, currentValue) { return accumulator + currentValue; }, 0);
};
var generateQualitativeData = function (lstData, sortByfrequency) {
    var _a;
    lstData = formatData(lstData);
    lstData.sort();
    var lstClass = [];
    var freqAbs = [];
    for (var _i = 0, lstData_1 = lstData; _i < lstData_1.length; _i++) {
        var element = lstData_1[_i];
        if (!lstClass.includes(element)) {
            lstClass.push(element);
            freqAbs.push(1);
        }
        else {
            freqAbs[lstClass.indexOf(element)] += 1;
        }
    }
    if (sortByfrequency) {
        _a = highestToLowestFreu(lstClass, freqAbs), lstClass = _a[0], freqAbs = _a[1];
    }
    var frecRel = [];
    var frecRelAc = [];
    var freqAbsT = sum(freqAbs);
    var ultFa = 0, ultFr = 0;
    for (var _b = 0, freqAbs_1 = freqAbs; _b < freqAbs_1.length; _b++) {
        var fa = freqAbs_1[_b];
        var fr = 100 / freqAbsT * fa;
        frecRel.push(parseFloat(fr.toFixed(3)) + '%');
        frecRelAc.push(parseFloat((fr + ultFr).toFixed(3)) + '%');
        ultFr += fr;
        ultFa += fa;
    }
    return [lstClass, freqAbs, frecRel, frecRelAc];
};
/*
    * Obtener datos del usuario (Tabla)
*/
var getData = function () {
    var inputElement = document.getElementById('inputData');
    var inputString = (inputElement.value).trim();
    var dataArray = inputString.split(',').map(function (value) { return value.trim(); });
    return dataArray;
};
var checkOrder = document.getElementById('checkOrder');
var getOrderCheck = function () {
    var isChecked = false;
    if (checkOrder != null) {
        isChecked = checkOrder.checked;
    }
    //console.log(isChecked)
    return isChecked;
};
var class_fa_fr_frAc;
var tableContainer = document.getElementById('tableContainer');
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
    var dataArray = getData();
    var orderCheck = getOrderCheck();
    class_fa_fr_frAc = generateQualitativeData(dataArray, orderCheck);
    console.log(class_fa_fr_frAc);
    var headers = ["Clases", "F<sub>a</sub>", "F<sub>r</sub>", "F<sub>r</sub> Acum."];
    if (tableContainer != null) {
        //console.table(class_fa_faAc_fr_frAc)
        tableContainer.innerHTML = '';
        printHTMLTable(headers, class_fa_fr_frAc, tableContainer);
    }
};
var btnData = document.getElementById('btnData');
if (btnData != null) {
    btnData.addEventListener('click', showData);
}
if (checkOrder != null) {
    checkOrder.addEventListener('click', showData);
}
/*
    * Obtener datos del usuario (Gráficas)
*/
var getValueCheck = function (checkElement) {
    var isChecked = false;
    if (checkElement != null) {
        isChecked = checkElement.checked;
    }
    //console.log(isChecked)
    return isChecked;
};
var graphics = document.getElementById("graphics");
var checkBarPlot = document.getElementById('checkBarPlot');
checkBarPlot.addEventListener('change', function () {
    var _a;
    var barPlot = document.createElement("div");
    barPlot.id = "barPlot";
    if (getValueCheck(checkBarPlot)) {
        graphics === null || graphics === void 0 ? void 0 : graphics.appendChild(barPlot);
        generateHorizontalBarChart(barPlot, class_fa_fr_frAc[1], class_fa_fr_frAc[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
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
        generatePieChart(piePlot, class_fa_fr_frAc[2], class_fa_fr_frAc[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
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
        generateHistogram(histogram, class_fa_fr_frAc[2], class_fa_fr_frAc[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
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
        generateOgive(ogive, class_fa_fr_frAc[3], class_fa_fr_frAc[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
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
        generateFrequencyPolygon(frequencyPolygon, class_fa_fr_frAc[2], class_fa_fr_frAc[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
    }
    else {
        (_a = document.getElementById("frequencyPolygon")) === null || _a === void 0 ? void 0 : _a.remove();
    }
});
