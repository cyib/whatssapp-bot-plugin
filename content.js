const url_links = chrome.runtime.getURL('links.json');

fetch(url_links)
    .then((response) => response.json())
    .then((json) => { start(json.links) });

if (!localStorage.getItem("botCurrentId")) localStorage.setItem("botCurrentId", 0);
function start(links) {
    if(links.length > 0){
        var botCurrentId = localStorage.getItem("botCurrentId");
        console.log(botCurrentId, links);
        if (window.location.host == "web.whatsapp.com") {
            var button;
            console.log("Bot inciado");
            var watchButton = setInterval(function () {
                try {
                    var button = document.getElementsByTagName("button")[5];
                    if (button) {
                        console.log("Mensagem enviada!");
                        button.click();
                        var nextBotId = parseInt(localStorage.getItem("botCurrentId")) + 1;
                        localStorage.setItem("botCurrentId", nextBotId);
                        clearInterval(watchButton);
                        if (nextBotId < links.length) {
                            window.location.href = links[nextBotId]
                        } else {
                            localStorage.setItem("botCurrentId", -1);
                        }
                    }
                } catch (error) {
                }
            }, 10)
        }else if(window.location.href == "https://doutorzaz.com/startbot"){
            window.location.href = links[0];
        }
    }else{
        console.log("Sua lista de links está vázia!");
    }
}
