/* ##################################################################
            * Métodos para hacer tablas HTML
################################################################## */
var generateHorizontalBarChart = function (parentElement, absoluteFrequency, classMark, colors, title) {
    var mkClass = [];
    classMark.forEach(function (classs) {
        var space = '';
        if (classs == classMark[parseInt((classMark.length) / 2)]) {
            space = '      ';
        }
        mkClass.push(space + classs + ' ');
    });
    var data = [{
            type: 'bar',
            x: absoluteFrequency,
            y: mkClass,
            orientation: 'h',
            marker: {
                color: colors,
                line: {
                    color: 'black',
                    width: 1
                }
            },
            text: absoluteFrequency,
            textposition: 'outside'
        }];
    var layout = {
        title: (title == '') ? 'Gráfico de Barras' : title,
        xaxis: {
            title: 'Frecuencia Absoluta',
            tickformat: ',d'
        },
        yaxis: {
            title: 'Marcas de Clase',
            automargin: true
        },
        margin: {
            l: 50,
            r: 30,
            t: 50,
            b: 50
        },
        bargap: 0.2,
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(255, 255, 255, 0.3)'
    };
    Plotly.newPlot(parentElement, data, layout);
};
/* #################################################################################################### */
var generatePieChart = function (parentElement, relativeFrequency, classMark, colors, title) {
    var frequency = [];
    relativeFrequency.forEach(function (number) {
        frequency.push(parseFloat(number.replace('%', '')));
    });
    var data = [{
            labels: classMark,
            values: frequency,
            type: 'pie',
            marker: {
                colors: colors
            },
            textinfo: 'label+percent',
            textposition: 'inside',
            insidetextorientation: 'radial'
            //        pull: [0.1, 0, 0, 0, 0] // TODO: Resaltar primera sección
        }];
    var layout = {
        title: (title == '') ? 'Gráfico Circular' : title,
        showlegend: true,
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(255, 255, 255, 0.3)'
    };
    Plotly.newPlot(parentElement, data, layout);
};
/* #################################################################################################### */
var generateHistogram = function (parentElement, relativeFrequency, classMark, colors, title) {
    // Datos del gráfico
    var data = [{
            type: 'bar',
            x: classMark,
            y: relativeFrequency,
            marker: {
                color: colors,
                line: {
                    color: 'black',
                    width: 1
                }
            },
            text: relativeFrequency,
            textposition: 'outside'
        }];
    var layout = {
        title: (title == '') ? 'Histograma' : title,
        xaxis: {
            title: 'Marcas de Clase',
            automargin: true
        },
        yaxis: {
            title: 'Frecuencia Relativa (%)',
            tickformat: ',d'
        },
        margin: {
            l: 50,
            r: 30,
            t: 50,
            b: 50
        },
        bargap: 0.01,
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(255, 255, 255, 0.3)'
    };
    Plotly.newPlot(parentElement, data, layout);
};
/* ######################################################################################################## */
var generateOgive = function (parentElement, relativeFrequencyAcum, classMark, colors, title) {
    var frequencyWhithLimits = ['0%'].concat(relativeFrequencyAcum);
    var classMarkWhithLimits = ['  '].concat(classMark);
    var data = [{
            x: classMarkWhithLimits,
            y: frequencyWhithLimits,
            type: 'scatter',
            mode: 'lines+markers',
            line: {
                color: 'black',
                width: 3,
                dash: 'dash'
            },
            marker: {
                color: '#6FBF73',
                size: 15,
                symbol: 'circle',
                line: {
                    color: 'black',
                    width: 2
                }
            },
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(255, 255, 255, 0.3)'
        }];
    var layout = {
        title: (title == '') ? 'Ojiva' : title,
        xaxis: {
            title: 'Marcas de Clase',
            automargin: true
        },
        yaxis: {
            title: 'Frecuencia Acumulativa (%)',
            range: [0, 100], // Asegurar que el eje y vaya de 0 a 100%
            tickformat: ',d' // Formato de números enteros en el eje y
        },
        margin: {
            l: 50,
            r: 20,
            t: 50,
            b: 100 // Aumentar el margen inferior para etiquetas largas
        },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(255, 255, 255, 0.3)'
    };
    Plotly.newPlot(parentElement, data, layout);
};
/* ######################################################################################################## */
var generateFrequencyPolygon = function (parentElement, relativeFrequency, classMark, colors, title) {
    var frequency = relativeFrequency.map(function (str) {
        return parseFloat(str.replace('%', '')) / 100;
    });
    var frequencyWhithLimits = [0].concat(frequency).concat([0]);
    var classMarkWhithLimits = ['  '].concat(classMark).concat(['']);
    var data = [{
            x: classMarkWhithLimits,
            y: frequencyWhithLimits,
            type: 'scatter',
            mode: 'lines+markers',
            line: {
                color: 'black',
                width: 3,
                dash: 'dash'
            },
            marker: {
                color: '#6FBF73',
                size: 15,
                symbol: 'circle',
                line: {
                    color: 'black',
                    width: 2
                }
            },
            text: frequencyWhithLimits.slice(1, -1).map(function (val) { return val.toFixed(2); }), // Mostrar frecuencias en decimales
            textposition: 'top'
        }];
    var layout = {
        title: (title == '') ? 'Polígono de Frecuencias' : title,
        xaxis: {
            title: 'Marcas de Clase',
            automargin: true
        },
        yaxis: {
            title: 'Frecuencia Relativa',
            range: [0, (Math.max.apply(Math, frequencyWhithLimits) + 0.05)],
            tickformat: ',.2f'
        },
        margin: {
            l: 50,
            r: 20,
            t: 50,
            b: 100 // Aumentar el margen inferior para etiquetas largas
        },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(255, 255, 255, 0.3)'
    };
    Plotly.newPlot(parentElement, data, layout);
};
