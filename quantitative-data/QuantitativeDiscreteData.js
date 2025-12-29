"use strict";
/* ******************************************************************************************************
                        * Metodos numericos
****************************************************************************************************** */
const highestToLowestFreu = function (classList, freqList) {
    const l = classList.length;
    for (let i = 0; i < l; i++) {
        let elemento = i;
        for (let j = i + 1; j < l; j++) {
            if (freqList[j] < freqList[elemento]) {
                elemento = j;
            }
        }
        [classList[i], classList[elemento]] = [classList[elemento], classList[i]];
        [freqList[i], freqList[elemento]] = [freqList[elemento], freqList[i]];
    }
    return [classList, freqList];
};
const formatData = function (dataArray) {
    let dataArraySorted = [];
    for (let element of dataArray) {
        if (element.includes('.')) {
            element = parseFloat(element).toFixed(3);
        }
        dataArraySorted.push(parseFloat(element));
    }
    return dataArraySorted;
};
const sum = function (array) {
    return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};
/* ******************************************************************************************************
    * Metodos para contruir las distribuciones de frequencias con datos DISCRETOS
****************************************************************************************************** */
const generateDiscreteCuantitativeData = function (lstData, sortByfrequency) {
    lstData = formatData(lstData);
    lstData = lstData.sort((a, b) => {
        // Si ambos son números, compara numéricamente
        if (!isNaN(a) && !isNaN(b)) {
            return a - b;
        }
        // Si ambos son cadenas, compara alfabéticamente
        if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b);
        }
    });
    let lstClass = [];
    let freqAbs = [];
    for (let element of lstData) {
        if (!lstClass.includes((element + '\u200B'))) {
            lstClass.push(element + '\u200B');
            freqAbs.push(1);
        }
        else {
            freqAbs[lstClass.indexOf((element + '\u200B'))] += 1;
        }
    }
    if (sortByfrequency) {
        [lstClass, freqAbs] = highestToLowestFreu(lstClass, freqAbs);
    }
    let freqRel = [];
    let freqRelAc = [];
    let freqAbsT = sum(freqAbs);
    let ultFa = 0;
    let ultFr = 0;
    for (let fa of freqAbs) {
        let fr = 100 / freqAbsT * fa;
        freqRel.push(parseFloat(fr.toFixed(3)) + '%');
        freqRelAc.push(parseFloat((fr + ultFr).toFixed(3)) + '%');
        ultFr += fr;
        ultFa += fa;
    }
    return [lstClass, freqAbs, freqRel, freqRelAc];
};
