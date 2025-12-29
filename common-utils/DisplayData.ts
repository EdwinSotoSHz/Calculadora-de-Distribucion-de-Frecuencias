/* *********************************************************************
    * Métodos para hacer tablas HTML
********************************************************************* */
const printHTMLTable = function(headers: string[], contents: any[][], HTMLcontainer: HTMLElement): void {
    if (headers.length !== contents.length) {
        console.log("Verificar longitud de headers y contents");
        return;
    }

    let table = document.createElement('table');
    table.classList.add('table-FD');

    let headerRow = table.insertRow();
    for (let header of headers) {
        let th = document.createElement('th');
        th.innerHTML = header;
        headerRow.appendChild(th);
    }

    let rowsNum = contents[0].length;
    for (let row = 0; row < rowsNum; row++) {
        let tr = table.insertRow();
        for (let col of contents) {
            let td = document.createElement('td');
            td.textContent = col[row];
            tr.appendChild(td);
        }
    }

    let centerDiv = document.createElement('div');
    centerDiv.style.textAlign = 'center';
    centerDiv.appendChild(table);

    HTMLcontainer.appendChild(centerDiv);
}