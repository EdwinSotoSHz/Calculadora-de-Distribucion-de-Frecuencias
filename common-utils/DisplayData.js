/* *********************************************************************
    * Métodos para hacer tablas HTML
********************************************************************* */
var printHTMLTable = function (headers, contents, HTMLcontainer) {
    if (headers.length !== contents.length) {
        console.log("Verificar longitud de headers y contents");
        return;
    }
    var table = document.createElement('table');
    table.classList.add('table-FD');
    var headerRow = table.insertRow();
    for (var _i = 0, headers_1 = headers; _i < headers_1.length; _i++) {
        var header = headers_1[_i];
        var th = document.createElement('th');
        th.innerHTML = header;
        headerRow.appendChild(th);
    }
    var rowsNum = contents[0].length;
    for (var row = 0; row < rowsNum; row++) {
        var tr = table.insertRow();
        for (var _a = 0, contents_1 = contents; _a < contents_1.length; _a++) {
            var col = contents_1[_a];
            var td = document.createElement('td');
            td.textContent = col[row];
            tr.appendChild(td);
        }
    }
    var centerDiv = document.createElement('div');
    centerDiv.style.textAlign = 'center';
    centerDiv.appendChild(table);
    HTMLcontainer.appendChild(centerDiv);
};
