/* ##################################################################
            * Métodos para hacer tablas HTML
################################################################## */
const generateHorizontalBarChart  = function(parentElement: HTMLDivElement, absoluteFrequency: string[], classMark: string[], colors: string[], title: string): void {
    let mkClass: string[] = []; 
    classMark.forEach(classs => {
        let space: string = '';
        if(classs == classMark[parseInt((classMark.length)/2)]){
            space = '      '
        }
        mkClass.push(space+classs+' ');
        
    });

    let data = [{
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

    let layout = {
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
}

/* #################################################################################################### */

const generatePieChart  = function(parentElement: HTMLDivElement, relativeFrequency: string[], classMark: string[], colors: string[], title: string): void {
    let frequency: number[] = []
    relativeFrequency.forEach(number => {
        frequency.push(parseFloat(number.replace('%', '')))
    })
    let data = [{
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

    let layout = {
        title: (title == '') ? 'Gráfico Circular' : title,
        showlegend: true,
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(255, 255, 255, 0.3)'
    };

    Plotly.newPlot(parentElement, data, layout);
}

/* #################################################################################################### */

const generateHistogram  = function(parentElement: HTMLDivElement, relativeFrequency: string[], classMark: string[], colors: string[], title: string): void {
// Datos del gráfico
    let data = [{
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

    let layout = {
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
}

/* ######################################################################################################## */

const generateOgive  = function(parentElement: HTMLDivElement, relativeFrequencyAcum: string[], classMark: string[], colors: string[], title: string): void {
    let frequencyWhithLimits = ['0%'].concat(relativeFrequencyAcum);
    let classMarkWhithLimits = ['  '].concat(classMark);

    let data = [{
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

    let layout = {
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
}

/* ######################################################################################################## */

const generateFrequencyPolygon  = function(parentElement: HTMLDivElement, relativeFrequency: string[], classMark: string[], colors: string[], title: string): void {
    let frequency:number[] = relativeFrequency.map((str):number => {
        return  parseFloat(str.replace('%', ''))/100;
    });
    
    let frequencyWhithLimits = [0].concat(frequency).concat([0]);
    let classMarkWhithLimits = ['  '].concat(classMark).concat(['']);

    let data = [{
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
        text: frequencyWhithLimits.slice(1, -1).map(val => val.toFixed(2)), // Mostrar frecuencias en decimales
        textposition: 'top'
    }];

    let layout = {
    title: (title == '') ? 'Polígono de Frecuencias' : title,
    xaxis: {
        title: 'Marcas de Clase',
        automargin: true
    },
    yaxis: {
        title: 'Frecuencia Relativa',
        range: [0, (Math.max(...frequencyWhithLimits)+0.05)], 
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
}

