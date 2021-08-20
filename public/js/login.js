function signIn() {
    let usermail = document.getElementById("inputEmail").value;
    let pass = document.getElementById("inputPassword").value;
    try {
      const userAction = async () => {
        mailValidation(usermail);
        console.log(usermail, pass);
        const res = await fetch(`http://localhost:3000/api/usuarios/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({ email: usermail, password: pass }),
        });
        //Obtiene el JSON de la respuesta http 
        const result = await res.json(); 
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

  const mailValidation = (data) => {
    if ((/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data))) {
        return 'Validación correcta'
    } else {
        throw new Error ('Alguno de los valores ingresados no es correcto')  
    }
  }

  const passValidation = (data) => {
      console.log((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(data)))
    if ((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(data))) {
        return 'Validación correcta'
    } else {
      
      throw new Error ('Alguno de los valores ingresados no es correcto')  
    }
  }