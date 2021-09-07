const validarMail = (data) => {
    if ((/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data))) {
        return 'ok'
    } else {
        throw new Error ('alguno de los valores ingresados no es correcto')  
    }
  }

  const validarPass = (data) => {
      console.log((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(data)))
    if ((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(data))) {
        return 'ok'
    } else {
      
      throw new Error ('alguno de los valores ingresados no es correcto')  
    }
  }