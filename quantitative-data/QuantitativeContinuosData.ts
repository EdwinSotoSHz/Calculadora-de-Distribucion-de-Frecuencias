/* ******************************************************************************************************
                                    * Metodos numericos
            ! Los métodos formatData() y sum() se encuentaran en CuantitativeDiscreteData.ts
****************************************************************************************************** */

/* ******************************************************************************************************
    * Metodos para contruir las distribuciones de frequencias con datos CONTINUOS
****************************************************************************************************** */
function clases_groped(dataArray: number[], numClass: number | null = null): [number[], number[], number[], string[]] {
    dataArray.sort((a, b) => a - b);
    let minValue = Math.min(...dataArray);
    let maxValue = Math.max(...dataArray);
    let range = maxValue - minValue;

    let numberClasses: number;
    if (numClass == null) {
        numberClasses = 1 + 3.3 * Math.log10(dataArray.length);
    }else{
        numberClasses = numClass;
    }
    numberClasses = Math.round(numberClasses);

    const classWidth = range / numberClasses;

    const limsLow: number[] = [];
    const limsUpp: number[] = [];
    const mrksClasses: string[] = [];
    let limLower = minValue;
    let limUpper = minValue + classWidth;
    
    for (let i = 1; i <= numberClasses; i++) {
        const mrkClase = (limUpper + limLower) / 2;
        limsUpp.push(parseFloat(limUpper.toFixed(3)));
        limsLow.push(parseFloat(limLower.toFixed(3)));
        mrksClasses.push(parseFloat(mrkClase.toFixed(3))+'\u200B');
        limLower = limUpper;
        limUpper = limLower + classWidth;
    }
    
    const clases = Array.from({ length: numberClasses }, (_, i) => i + 1);
    return [clases, limsLow, limsUpp, mrksClasses];
}

const freqAbs = function(limsLow: number[], limsUpp: number[], dataArray: number[], way: boolean): number[] {
    let fa: number[] = new Array(limsLow.length).fill(0);
    
    for (let value of dataArray) {
        for (let j = 0; j < limsLow.length; j++) {
            if (!way) {
                if (j === limsLow.length - 1) {
                    if (limsLow[j] <= value && value <= limsUpp[j]) {
                        fa[j]++;
                        break;
                    }
                } else {
                    if (limsLow[j] <= value && value < limsUpp[j]) {
                        fa[j]++;
                        break;
                    }
                }
            } else {
                if (j === 0) {
                    if (limsLow[j] <= value && value <= limsUpp[j]) {
                        fa[j]++;
                        break;
                    }
                } else {
                    if (limsLow[j] < value && value <= limsUpp[j]) {
                        fa[j]++;
                        break;
                    }
                }
            }
        }
    }
    
    return fa;
}

const freqRel = function(freqAbs: number[]): number[] {
    let freqRel: number[] = [];
    let freqAbsT = sum(freqAbs);
    for (let element of freqAbs) {
        let fr = (100 / freqAbsT) * element;
        freqRel.push(parseFloat(fr.toFixed(3)));
    }
    return freqRel;
}

const freqAc = function(freq: number[]): number[] {
    let freqAc: number[] = [];
    let ultVal = 0;
    for (let element of freq) {
        freqAc.push(parseFloat((element + ultVal).toFixed(3)));
        ultVal += element;
    }
    return freqAc;
}

function datPSymbol(fr: number[]): string[] {
    const frStr: string[] = [];
    for (let i = 0; i < fr.length; i++) {
        frStr.push(fr[i].toString() + "%");
    }
    return frStr;
}


const generateContinousCuantitativeData = function(dataArray: any[], way: boolean, numClasses: any = null): [string[], number[], string[], string[], number[], number[], number[]] {
    if(numClasses == ''){
        numClasses = null
    }else{
        numClasses = parseInt(numClasses)
    }
    let [clases, limsLower, limsUpper, mrksClass] = clases_groped(dataArray, numClasses);
    let fa = freqAbs(limsLower, limsUpper, dataArray, way);
    let fr = freqRel(fa);
    let frAc = freqAc(fr);
    let frStr = datPSymbol(fr);
    let frAcStr = datPSymbol(frAc);

    return [mrksClass, fa, frStr, frAcStr, clases, limsLower, limsUpper];
}