//Obtenemos elementos html
const form = document.querySelector("form")
const nameForm= document.querySelector("#nombre")
const surnameForm= document.querySelector("#apellidos")
const ageForm = document.querySelector("#edad")
const matriculaForm = document.querySelector("#matricula")
const emailForm = document.querySelector("#email")
const passwordForm = document.querySelector("#password")
const passwordConfForm = document.querySelector("#passwordConf")
const dateForm = document.querySelector("#fechaM")
const provinciaForm = document.querySelector("#provincia")
const url ="http://localhost:3000/"
const oldUl = document.querySelector("ul")
const body = document.querySelector("body")
//Creamos requisitos
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&*])(?=.{8,})");
    return re.test(password);
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\].,;:\s@"]+(\.[()\[\\.,;:\s@"]+)*)|(".+"))@(([0-9]1,3\.[0-9]1,3\.[0-9]1,3\.[0-9]1,3)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const matriculaFormato = (matriculaCheck) => {
    const re = new RegExp("^[0-9]{4} [A-Z]{3}$");
    return re.test(matriculaCheck);
};

function calcularEdad(fecha_nacimiento) {
    let valid = false
    const hoy = new Date();
    const cumpleanos = new Date(fecha_nacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    if(edad>17){
        valid = true
    }
    return valid;
}

//Creamos el metodo de mostrar error
const showError = (input, message) => {
    // Obtener el elemento form-field
    const formField = input.parentElement;
    // Agregar la clase de error
    formField.classList.remove('success');
    formField.classList.add('error');
    // Mostrar el mensaje de error
    const error = formField.querySelector('span');
    error.textContent = message;
};

//Creamos el metodo para ocultar mensaje de error
const showSuccess = (input) => {
    // Obtener el elemento form-field
    const formField = input.parentElement;
    // Eliminar la clase de error
    formField.classList.remove('error');
    formField.classList.add('success');
    // Ocultar el mensaje de error
    const error = formField.querySelector('span');
    error.textContent = '';
};

//Creamos las comprobaciones
const checkName =()=>{
    let valid = false;
    const max =20,min=2;
    const name = nameForm.value.trim()
    
    if(!isRequired(name)){
        showError(nameForm,'El nombre es requerido')
    }else if(!isBetween(name.length,min,max)){
        showError(nameForm,`El nombre tiene que estar entre ${min} y ${max}` )
    }else{
        showSuccess(nameForm)
        valid = true
    }
    return valid;
}

const checkSurname =()=>{
    let valid = false;
    const max =30,min=2;
    const surname = surnameForm.value.trim()
    if(!isRequired(surname)){
        showError(surnameForm,'El apellido es requerido')
    }else if(!isBetween(surname.length,min,max)){
        showError(surnameForm,`El nombre tiene que estar entre ${min} y ${max}` )
    }else{
        showSuccess(surnameForm)
        valid = true
    }
    return valid
}

const checkEmail =()=>{
    let valid = false;
    const email = emailForm.value.trim()
    if(!isRequired(email)){
        showError(emailForm, 'El correo es requerido')
    }else if(!isEmailValid(email)){
        showError(emailForm, 'El formato no es el de un correo')
    }else{
        showSuccess(emailForm)
        valid = true
    }
    return valid
}

const checkPassword =()=>{
    let valid = false;
    const password = passwordForm.value.trim()
    if(!isRequired(password)){
        showError(passwordForm, 'La contraseña es requerido')
    }else if(!isPasswordSecure(password)){
        showError(passwordForm, 'La contraseña debe tener al menos 8 caracteres que incluyan al menos 1 carácter en minúsculas, 1 carácter en mayúsculas, 1 número y 1 carácter especial en (!@#\$%\^&*).');
    }else{
        showSuccess(passwordForm)
        valid = true
    }
    return valid
}

const checkPasswordConfirm =()=>{
    let valid = false;
    const password = passwordConfForm.value.trim()
    if(!isRequired(password)){
        showError(passwordConfForm, 'Tienes que confirmar la contraseña')
    }else if(passwordForm.value !=password){
        showError(passwordConfForm, 'No has repetido bien la contraseña');
    }else{
        showSuccess(passwordConfForm)
        valid = true
    }
    return valid
}

const checkAge =()=>{
    let valid = false;
    const age = ageForm.value
    if(!isRequired(age)){
        showError(ageForm, 'La edad es requerida')
    }else if(age<3){
        showError(ageForm, 'La edad tiene que ser mayor a 3')
    }else{
        showSuccess(ageForm)
        valid = true
    }
    return valid
} 
const checkMaticula =()=>{
    let valid = false;
    const matricula = matriculaForm.value
    if(!isRequired(matricula)){
        showError(matriculaForm, 'La matricula es requerida')
    }else if(!matriculaFormato(matricula)){
        showError(matriculaForm, 'La matricula no tiene el formato')
    }else{
        showSuccess(matriculaForm)
        valid = true
    }
    return valid
}

const checkFecha =()=>{
    let valid = false;
    const fecha = dateForm.value
    if(!isRequired(fecha)){
        showError(dateForm, 'La fecha es requerida')
    }else if(!calcularEdad(fecha)){
        showError(dateForm, 'Tienes que tener 18')
    }else{
        showSuccess(dateForm)
        valid = true
    }
    return valid
}

const checkProvincia =()=>{
    let valid = false;
    const provincia = provinciaForm.value;
    
    if(provincia==0){
        showError( provinciaForm, 'Debes de seleccionar alguna')
    }else{
        showSuccess(provinciaForm);
        valid=true
    }
    return valid
}

/** Formula basica 
 * form.addEventListener('input', (e)=>{
    switch(e.target.id){
        case'name':
        checkName();
        break
    }
})
 */
//Tiempo de espera
const debounce = (fn, delay = 1000) => {
    let timeoutId;
    return (...args) => {
      // Cancelar el temporizador anterior si existe
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Configurar un nuevo temporizador
      timeoutId = setTimeout(() => {
        fn.apply(null, args)
      }, delay);
    };
  };
  form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'nombre':
            checkName();
            break;
        case 'apellidos':
            checkSurname()
            break;
        case 'email':
            checkEmail()
        case 'password':
            checkPassword()
            break;
        case 'passwordConf':
            checkPasswordConfirm()
            break;
        case 'edad':
            checkAge()
            break
        case 'matricula':
            checkMaticula()
            break
        case'fechaM' :
            checkFecha()
            break
        case 'provincia':
            checkProvincia()
            break
    }
  }));


form.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(checkName()&&checkSurname()&&checkEmail()&&checkPassword()&&checkPasswordConfirm()&& checkAge()&&checkMaticula()&&checkFecha()&&checkProvincia()){
        alert("Formulado enviado")

        addUser(nameForm.value, surnameForm.value, emailForm.value, passwordForm.value, ageForm.value, matriculaForm.value, dateForm.value, provinciaForm.value)
        oldUl.replaceWith(buildList(getUsers()))
        
        
    }
})

async function addUser(name,surname,email,password,edad,matricula,date,provincia){
    const user={
      "name":name,
      "suraname":surname,
      "email":email,
      "password":password,
      "edad":edad,
      "matricula":matricula,
      "date":date,
      "provincia":provincia
    }
    try {
        const response = await fetch(`${url}users`,{
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json'
        }
       
        })
        
            if(response.ok){
                const post = await response.json()
                return post
        
        }
        } catch (error) {
            console.error(error);
        }  
}

async function getUsers(){
    
    try {
        const response = await fetch(`${url}users`,{
        method: 'GET',
       
        headers:{
            'Accept': 'application/json'
        }
       
        })
        
            if(response.ok){
                const post = await response.json()
                return post
        
        }
        } catch (error) {
            console.error(error);
        }  
}
async function buildList(getUsers){
    
    
    
    const allUser= await getUsers
    console.log(allUser);

    allUser.forEach( async element => {
        const user = await element
        const li= document.createElement("li")
        const button = document.createElement("button")
        button.setAttribute("id",  user.id)
        textButton = document.createTextNode("editar")
        button.appendChild(textButton)
        textli = document.createTextNode(  user.name)
        li.appendChild(textli)
        li.appendChild(button)
        oldUl.appendChild(li)
        
    });
    

}
buildList(getUsers())
