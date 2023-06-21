document.addEventListener("DOMContentLoaded",function (){
    $.ajax({
        url:'https://youpip.net/api/login',
        type:"GET",
        success:(res)=>{
            console.log(res)
        }
    })
    async function sendToContentScript(action) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.tabs.sendMessage(tab.id, {action: action}, function(response) {
            console.log(response)
        });
    }
})


