function register() {
    $.ajax('/users/register', {
        type: 'POST',  // http method
        datatype: 'json',
        async: false,
        data: {
            user: document.getElementById('username').value,
            pass: document.getElementById('password').value,
            rol: "perito"
        }
        ,
        success: function (response) {
            console.log(response);
        },
        error: function (response) {
            console.log("error");
        }
    });
}