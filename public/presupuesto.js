function appendRow() {
    let tbl = document.getElementById('my-table'), // table reference
        row = tbl.insertRow(tbl.rows.length),      // append table row
        i;
    // insert table cells to the new row
    for (i = 0; i < tbl.rows[0].cells.length; i++) {
        createCell(row.insertCell(i), i, 'row');
    }
}

function createCell(cell, text, style) {
    let div = document.createElement('div'),
        txt = document.createTextNode(text); 
    div.appendChild(txt);                   
    div.setAttribute('class', style);        
    div.setAttribute('className', style);   
    cell.appendChild(div);                   
}

function appendColumn(idELement) {
    let tbl = document.getElementById(idELement), 
        i;

    for (i = 0; i < tbl.rows.length -1; i++) {
        createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), i, 'col');
    }
}

function deleteRows(idELement) {
    let tbl = document.getElementById(idELement), 
        lastRow = tbl.rows.length - 1,             
        i;

    for (i = lastRow; i > 0; i--) {
        tbl.deleteRow(i);
    }
}

function deleteColumns(idELement) {
    let tbl = document.getElementById(idELement), 
        lastCol = tbl.rows[0].cells.length - 1,    
        i, j;

    for (i = 0; i < tbl.rows.length; i++) {
        for (j = lastCol; j > 0; j--) {
            tbl.rows[i].deleteCell(j);
        }
    }
}

function checkUserSession() {
    console.log("Token",localStorage.getItem('token'))
    if(!localStorage.getItem('token')){
        window.location.href = "http://localhost:5500/public/login.html";
    }
}

async function savePresupuesto() {

    let name = document.getElementById('nameProject').value;
    let version = document.getElementById('versionProject').value;
    const res = await fetch(`http://localhost:3000/api/presupuestos`, {
        method: "POST", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({proyecto: name, version: version})
      });

    const result = await res.json(); //extract JSON from the http response
    console.log(result);
    alert('Presupuesto guardado con exito')
    window.location.href = "http://localhost:5500/public/index.html";
}

function cancelPresupuesto() {
    window.location.href = "http://localhost:5500/public/index.html"
}


checkUserSession();
