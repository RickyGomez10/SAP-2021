document.querySelector("#loginForm").addEventListener('submit', e=>{
    console.log("Buenas");
    let loginData = {
        username : document.forms.formLogin.username.value,
        password : document.forms.formLogin.password.value,
    }
    fetch('/perito/verificar', {
        method :'POST',
        body: JSON.stringify(loginData),
        headers:{
            'Content-type' : 'application/json'
        }
    }).then(res => res)
    .then( response =>{
        console.log(response);
    }).catch(err=>{
        console.log(err);
    })
})
