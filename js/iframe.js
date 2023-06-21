document.addEventListener("DOMContentLoaded",function (){
    $.ajax({
        url:'../data1.json',
        type:"GET",
        success:(res)=>{
            const index = _.random(0,res.length-1)
            const data = res[index]
            $('#word').html(data.word)
            $('#mean').html(data.mean)
            console.log({
                action:'set_width',
                width:document.getElementsByClassName('content')[0].offsetWidth,
                height:document.getElementsByClassName('content')[0].offsetHeight,
                height2:document.getElementsByClassName('content')[0].clientHeight,
            })
            setTimeout(()=>{
                sendToContentScript({
                    action:'set_width',
                    width:document.getElementsByClassName('content')[0].offsetWidth+2,
                    height:document.getElementsByClassName('content')[0].clientHeight
                })
                setTimeout(()=>{

                    $('.content').css('opacity',1)
                },200)
            },1000)
        }

    })

    $('.content').on('click',()=>{
        sendToContentScript({
            action:'remove_iframe'
        })
    })

    async function sendToContentScript(request) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.tabs.sendMessage(tab.id, {...request}, function(response) {
            console.log(response)
        });
    }
})

// let result = []
// for(let i=9;i<20;i++){
//     const ul = document.querySelector(`#content > article > div.post-content > div.entry-content > ul:nth-child(${i})`)
//     if(ul!==null){
//         const li = ul.getElementsByTagName('li')
//         for(let i=0;i<li.length;i++){
//             let text = li[i].textContent;
//             result.push({
//                 word: text.split(': ')[0],
//                 mean: text.split(': ')[1]
//             })
//         }
//     }
// }
// console.log(JSON.stringify(result))
