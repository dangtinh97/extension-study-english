let extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
if (!location.ancestorOrigins.contains(extensionOrigin)) {
    const iframe = document.createElement('iframe');
    // Must be declared at web_accessible_resources in manifest.json
    iframe.src = chrome.runtime.getURL('iframe.html');
    // Some styles for a fancy sidebar
    iframe.style.cssText = 'position:fixed;bottom:10px;right:10px;display:block;' +
        'z-index:9999; border:none;height:-webkit-fill-available;max-width:30%;width:100%';
    iframe.className = 'iframe_extension'
    document.body.appendChild(iframe);
}
//position: fixed !important; max-width: 100% !important; max-height: 100% !important; background-color: transparent !important; z-index: 2147483647 !important; overflow: hidden !important; visibility: visible !important; border: none !important; display: block !important; color-scheme: normal !important; inset: 0px 15px 0px 0px !important; width: calc(100% - 15px) !important; height: 100% !important;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request, sender, sendResponse);
    sendResponse('我收到你的消息了：'+JSON.stringify("request"));
    const iframe = document.getElementsByClassName('iframe_extension')[0];
    if(request.action==='remove_iframe'){
        // document.getElementsByClassName('iframe_extension').html('')
        iframe.remove()
    }
    if(request.action==='set_width'){
        iframe.style.width = request.width+'px'
        iframe.style.height = request.height+'px'
    }
});
