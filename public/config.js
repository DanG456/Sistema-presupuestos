function checkUserSession() {
    //console.log("Token", localStorage.getItem("token"));
    if (!localStorage.getItem("token")) {
      window.location.href = "http://localhost:5500/public/login.html";
    }
  }
  
function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "http://localhost:5500/public/login.html";
}

async function changePass() {
  let pass = document.getElementById('newPass').value;
  let confirmPass = document.getElementById('confirmPass').value;
  let user = JSON.parse(localStorage.getItem('usuario'));
  console.log(user.email)
  try {
    validarPass(pass);
    if(pass !== confirmPass){
      alert('Las contraseñas no coinciden')
    }else{
      const res = await fetch(`http://localhost:3000/api/usuarios/changePass`, {
          method: "PUT", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          body: JSON.stringify({email: user.email, password: pass})
        });
        const result = await res.json(); //extract JSON from the http response
        console.log(result);
        window.location.href = 'http://localhost:5500/public/index.html';
    }
  } catch (err) {
    console.log(err)
    alert(`Error: ${err.message}`)
  }
  

  
  
  
}


checkUserSession();