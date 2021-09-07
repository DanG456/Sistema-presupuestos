class rowContent {
  constructor(id, date, name, version, btnEdit, btnDelete, btnSend) {
    this.id = id;
    this.date = date;
    this.name = name;
    this.version = version;
    this.btnEdit = btnEdit;
    this.btnDelete = btnDelete;
    this.btnSend = btnSend;
  }
}

function checkUserSession() {
  console.log("Token", localStorage.getItem("token"));
  if (!localStorage.getItem("token")) {
    window.location.href = "http://localhost:5500/public/login.html";
  }
}

function signOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "http://localhost:5500/public/login.html";
}

async function getPresupuestos() {
  let res = await fetch("http://localhost:3000/api/presupuestos");
  let resultaData = await res.json();

  console.log(resultaData);
  for (let j = 0; j < resultaData.length; j++) {
    let idPresupuesto = document.createElement("div");
    let datePresupuesto = document.createElement("div");
    let rowBody = document.createElement("tr");
    let rowContentPresupuesto = document.getElementById("rowPresupuesto");

    // columna.className += "col-lg-4";
    // card.className += "card";
    // cardbody.className += "card-body";

    let Contenido = new rowContent(
      document.createElement("th"),
      document.createElement("td"),
      document.createElement("td"),
      document.createElement("td"),
      document.createElement("td"),
      document.createElement("td"),
      document.createElement("td")
    );

    Contenido.id.textContent = `${resultaData[j].idPresupuesto}`;
    Contenido.date.textContent = `${resultaData[j].createdAt.split("T")[0]}`;
    Contenido.name.textContent = `${resultaData[j].proyecto}`;
    Contenido.version.textContent = `${resultaData[j].version}`;

    let btnEditarPresupuesto = document.createElement("button");
    btnEditarPresupuesto.textContent = "Editar";
    btnEditarPresupuesto.setAttribute("data-id", resultaData[j].idPresupuesto);
    btnEditarPresupuesto.className += "btn btn-warning";

    let btnEliminarPresupuesto = document.createElement("button");
    btnEliminarPresupuesto.textContent = "Eliminar";
    btnEliminarPresupuesto.setAttribute(
      "data-id",
      resultaData[j].idPresupuesto
    );
    btnEliminarPresupuesto.className += "btn btn-danger";
    btnEliminarPresupuesto.setAttribute(
      "onclick",
      `deletePresupuesto(${resultaData[j].idPresupuesto})`
    );

    let btnEnviarPresupuesto = document.createElement("button");
    btnEnviarPresupuesto.textContent = "Enviar";
    btnEnviarPresupuesto.setAttribute("data-id", resultaData[j].idPresupuesto);
    btnEnviarPresupuesto.className += "btn btn-info";
    btnEnviarPresupuesto.setAttribute(
      "onclick",
      `sendPresupuesto()`
    );

    Contenido.btnEdit.appendChild(btnEditarPresupuesto);
    Contenido.btnDelete.appendChild(btnEliminarPresupuesto);
    Contenido.btnSend.appendChild(btnEnviarPresupuesto);

    rowBody.appendChild(Contenido.id);
    rowBody.appendChild(Contenido.date);
    rowBody.appendChild(Contenido.name);
    rowBody.appendChild(Contenido.version);
    rowBody.appendChild(Contenido.btnEdit);
    rowBody.appendChild(Contenido.btnDelete);
    rowBody.appendChild(Contenido.btnSend);

    rowContentPresupuesto.appendChild(rowBody);
  }
}

function newPresupuesto() {
  window.location.href = "http://localhost:5500/public/presupuesto.html";
}

function sendPresupuesto() {
  alert("Se envio el presupuesto a su correo");
}

async function deletePresupuesto(idElement) {
  console.log(idElement);
  if (confirm("¿Estas seguro que quieres eliminar el presupuesto?")) {
    const res = await fetch(`http://localhost:3000/api/presupuestos/${idElement}`, {
      method: "DELETE", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });

    const result = await res.json(); //extract JSON from the http response
    console.log(result);
    location.reload();
  } else {
  }
}

checkUserSession();
getPresupuestos();
