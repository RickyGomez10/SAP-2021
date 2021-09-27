$("#loginForm").on("submit", function (e) {
    e.preventDefault();
    $.ajax('/login/verificar', {
        type: 'POST',  // http method
        datatype: 'json',
        async: true,
        data: { user: document.getElementById('usuario').value, pass: document.getElementById('contra').value },  // data to submit
        success: function (response) {
            console.log(response);
        },
        error: function (response) {
            console.log("error");
        }
    });
});
