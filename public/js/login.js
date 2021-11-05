$( document ).ready(function() {
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();
        $.ajax('/login/verificar', {
            type: 'POST',  // http method
            datatype: 'json',
            async: true,
            data: { username: document.getElementById('username').value, password: document.getElementById('password').value },  // data to submit
            success: function (response) {
                location.href = '/perito';
            },
            error: function (response) {
                Swal.fire(
                    'Fallo al iniciar sesión',
                    'Verifique que su usuario y contraseña sean correctos.',
                    'error'
                );
            }
        });
    });
});