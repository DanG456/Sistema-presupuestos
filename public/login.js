function signIn() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  try {
    const userAction = async () => {
      validarMail(user);
      console.log(user, pass);
      const res = await fetch(`http://localhost:3000/api/usuarios/login`, {
        method: "POST", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ email: user, password: pass }),
      });
      const result = await res.json(); //extract JSON from the http response
      console.log(result.usuario);
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("usuario", JSON.stringify(result.usuario));
        window.location.href = "http://localhost:5500/public/index.html";
      } else {
        window.location.reload();
      }
    };
    userAction();
  } catch (err) {
    console.log(err);
    alert(`Error: ${err.message}`);
  }
}
