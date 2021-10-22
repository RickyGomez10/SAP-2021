
    function retrieveLocalInfo(){       
        Object.keys(localStorage).forEach(key => console.log(localStorage[key]));     
    }


    function insertInfo(){
        localStorage.setItem("precios", JSON.stringify({text:"1234"}));
    }