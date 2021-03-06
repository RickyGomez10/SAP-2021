
    var displayOnline = true;
    var displayOffline = true;
    var online = true;

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
                if (displayOnline) {
                    $("#status").html("Your current connection status is: Online");
                    console.log("Online");
                    displayOnline = false;
                    displayOffline = true;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
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
