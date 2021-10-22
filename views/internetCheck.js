
    var displayOnline = true;
    var displayOffline = true;
    var online = true;

    function retrieveLocalInfo(){
        Object.keys(localStorage).forEach(key => {
            console.log(localStorage[key])
            console.log(key)
            localStorage.removeItem(key);
        });
        window.localStorage.clear()
    }

    async function connRoutine(delay) {
        try {
            ping(delay);
        } catch (e) {
            console.clear();
        }

        setTimeout(() => connRoutine(delay), delay)
    }

    function ping(delay) {
        $.ajax({
            url: "/connStatus",
            type: "GET",
            dataType: "json",
            timeout: delay,
            success: function () {
               
                online = true;
                if(window.localStorage.length != 0 && online){
                    retrieveLocalInfo()
                }
                if (displayOnline) {
                    $("#status").html("Your current connection status is: Online");
                    console.log("Online");
                    displayOnline = false;
                    displayOffline = true;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                localStorage.setItem('prueba', 456);
                online = false;
                if (displayOffline) {
                    console.log("Offline");
                    displayOffline = false;
                    displayOnline = true;
                }
            }
        });
    }
    //connRoutine(5000);
