/* *****************************************************************************************************
            * Obtener datos del usuario
***************************************************************************************************** */
const inputElement = document.getElementById('inputData') as HTMLTextAreaElement;
const getData = function(): string[] {
    let inputString = inputElement.value.trim(); 
    let dataArray = inputString.split(',').map(value => value.trim());    
    return dataArray;
}
const getValueCheck = function(checkElement: HTMLInputElement): boolean {
    let isChecked: boolean = false; 
    if (checkElement != null) {
        isChecked = checkElement.checked;
    }
    //console.log(isChecked)
    return isChecked;
}

const checkType = document.getElementById('type') as HTMLInputElement;
const checkOrder = document.getElementById('checkOrder') as HTMLInputElement;
const checkWay = document.getElementById('checkWay') as HTMLInputElement;
const tableContainer = document.getElementById('tableContainer') as HTMLDivElement;
const numClass = document.getElementById('numClass') as HTMLInputElement;
var content: any[] = [];
const titleChart = document.getElementById('titleChart') as HTMLInputElement;
const showData = function(){
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
    titleChart.removeAttribute('disabled')
    let classNum: number = 0;
    let dataArray: string[] = getData();
    let headers: string[] = [];
    let isContinuosData = getValueCheck(checkType);
    if (isContinuosData == false) {
        checkOrder.removeAttribute('disabled');
        if (checkWay.checked == true) {
            checkWay.click();
        }
        checkWay.setAttribute('disabled', 'true');
        numClass.setAttribute('disabled', 'true');

        let sortByFreq = getValueCheck(checkOrder);
        headers = ["Clase", "F<sub>a</sub>", "F<sub>r</sub>", "F<sub>r</sub> Acum."]
        let class_fa_fr_frAc: any[] = generateDiscreteCuantitativeData(dataArray, sortByFreq);
        classNum = class_fa_fr_frAc[0].length;
        numClass.value = classNum.toString();
        content = class_fa_fr_frAc;
    }else{
        if (checkOrder.checked == true) {
            checkOrder.click();
        }
        checkOrder.setAttribute('disabled', 'true');
        checkWay.removeAttribute('disabled');
        numClass.removeAttribute('disabled');

        let way = getValueCheck(checkWay);
        headers = ["Clases", "Límites inferiores", "Límites superiores", "Marca de clase", "F<sub>a</sub>", "F<sub>r</sub>", "F<sub>r</sub> Acum."]
        let mkC_fa_fr_frAc_class_limsL_limsU: any[] = generateContinousCuantitativeData(dataArray, way, numClass.value);
        classNum = mkC_fa_fr_frAc_class_limsL_limsU[0].length;
        numClass.value = classNum.toString();
        content = mkC_fa_fr_frAc_class_limsL_limsU;
    }
    
    if (tableContainer != null){
        //console.table(class_fa_faAc_fr_frAc)
        tableContainer.innerHTML = '';
        if(content.length == 4){
            printHTMLTable(headers, content, tableContainer)            
        }else{
            printHTMLTable(headers, [content[4], content[5], content[6], content[0], content[1], content[2], content[3]], tableContainer)
        }
    }
}

const btnData = document.getElementById('btnData') as HTMLButtonElement;
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
    checkType.addEventListener('change', ()=>{numClass.value = '';});
}

inputElement.addEventListener('change',()=>{
    let inputString = inputElement.value; 
    inputElement.value = inputString.replace(/[^,\.\d]/g, '').replaceAll(',,',',').replaceAll(',,,',',');
    if (inputString.includes('.')) {
        checkType.checked = true;
    }else{
        checkType.checked = false;
    }
    numClass.value = ''
});


/*
    * Obtener datos del usuario (Gráficas)
*/
const graphics = document.getElementById("graphics");
const checkBarPlot = document.getElementById('checkBarPlot') as HTMLInputElement;
checkBarPlot.addEventListener('change',()=>{
    let barPlot = document.createElement("div") as HTMLDivElement;
    barPlot.id = "barPlot";
    if (getValueCheck(checkBarPlot)) {
        graphics?.appendChild(barPlot);
        generateHorizontalBarChart(barPlot, content[1], content[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
    }else{
        document.getElementById("barPlot")?.remove();
    }
});
const checkPiePlot = document.getElementById('checkPiePlot') as HTMLInputElement;
checkPiePlot.addEventListener('change',()=>{
    let piePlot = document.createElement("div") as HTMLDivElement;
    piePlot.id = "piePlot";
    if (getValueCheck(checkPiePlot)) {
        graphics?.appendChild(piePlot);
        generatePieChart(piePlot, content[2], content[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
    }else{
        document.getElementById("piePlot")?.remove();
    }
});
const checkHistogram = document.getElementById('checkHistogram') as HTMLInputElement;
checkHistogram.addEventListener('change',()=>{
    let histogram = document.createElement("div") as HTMLDivElement;
    histogram.id = "histogram";
    if (getValueCheck(checkHistogram)) {
        graphics?.appendChild(histogram);
        generateHistogram(histogram, content[2], content[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
    }else{
        document.getElementById("histogram")?.remove();
    }
});
const checkOgive = document.getElementById('checkOgive') as HTMLInputElement;
checkOgive.addEventListener('change',()=>{
    let ogive = document.createElement("div") as HTMLDivElement;
    ogive.id = "ogive";
    if (getValueCheck(checkOgive)) {
        graphics?.appendChild(ogive);
        generateOgive(ogive, content[3], content[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
    }else{
        document.getElementById("ogive")?.remove();
    }
});
const checkFrequencyPolygon = document.getElementById('checkFrequencyPolygon') as HTMLInputElement;
checkFrequencyPolygon.addEventListener('change',()=>{
    let frequencyPolygon = document.createElement("div") as HTMLDivElement;
    frequencyPolygon.id = "frequencyPolygon";
    if (getValueCheck(checkFrequencyPolygon)) {
        graphics?.appendChild(frequencyPolygon);
        generateFrequencyPolygon(frequencyPolygon, content[2], content[0], ["#1E2F5B", "#296F1A", "#6FBF73", "#8FA6B8", "#FFFFFF"], titleChart.value);
    }else{
        document.getElementById("frequencyPolygon")?.remove();
    }
});