window.onload = function () {
    var yt = "https://youtube.com/results?search_query="
    document.querySelector('input').focus();
    document.querySelector('input').addEventListener('keydown', (e) => {
        const CC = document.querySelector('#CC').checked
        const LC = document.querySelector('#LC').checked
        const CF = document.querySelector('#CF').checked
        // const ML = document.querySelector('#ML').checked
        // const WD = document.querySelector('#WD').checked
        var tick = "";

        // if (ML) {
        //     tick = "machine learning "
        // }
        // if (WD) {
        //     tick = "web development "
        // }
        if (e.key === 'Enter' && document.querySelector('input').value !== '') {
            if (CF) {
                tick += "codeforces solution "
            }
            if (CC) {
                tick += "codechef solution "
            }
            if (LC) {
                tick += "leetcode solution "
            }

            chrome.tabs.create({ url: yt + tick + document.querySelector('input').value });
            document.querySelector('input').value = ''
        }
    })
    let youtubers = JSON.parse(localStorage.getItem('youtubers')) || []
    const youtubebuttons = document.createElement("div")
    youtubebuttons.setAttribute('class', 'youtubebuttons')

    const ytbuttonnames = ["history", "liked videos", "watch later", "songs"]
    ytbuttonnames.map(ele => {
        let button1 = document.createElement("button")
        button1.setAttribute('class', 'youtubebtn')
        button1.innerHTML = ele
        youtubebuttons.appendChild(button1);
    })
    document.body.appendChild(youtubebuttons)

    // const ytbuttons1 = setbuttons(youtubers)
    const ytbuttons = document.createElement("div")
    ytbuttons.setAttribute('class', 'ytbuttons')
    youtubers.map(ele => {
        let button1 = document.createElement("button")
        button1.setAttribute('class', 'youtubers')
        button1.innerHTML = ele
        ytbuttons.appendChild(button1);
    })
    let button1 = document.createElement("button")
    button1.setAttribute('class', 'youtubers editbutton')
    button1.innerHTML = 'Edit'
    ytbuttons.appendChild(button1);
    document.body.appendChild(ytbuttons)

    document.querySelector('.youtubebuttons').addEventListener('click', (e) => {
        if (e.target.className !== 'youtubebtn') return
        if (e.target.innerHTML === 'history')
            chrome.tabs.create({ url: "https://www.youtube.com/feed/history" });
        else {

            let url = "https://www.youtube.com/playlist?list="
            if (e.target.innerHTML === 'liked videos')
                url += "LL"
            if (e.target.innerHTML === 'watch later')
                url += "WL"
            if (e.target.innerHTML === 'songs')
                url += "PLVhKPW2DjEmmwytzAm9k6Ac4JF-BxPCwi";
            // setTimeout(() => {
            chrome.tabs.create({ url: url })
            // }, 1000)
        }
    })

    document.querySelector('.ytbuttons').addEventListener('click', (e) => {
        if (e.target.innerHTML === 'Edit' || e.target.innerHTML === 'Done' || e.target.className !== 'youtubers') return
        chrome.tabs.create({ url: yt + e.target.innerHTML });
    })
    let editopen = false
    document.querySelector('.editbutton').addEventListener('click', (e) => {
        editopen = !editopen
        if (editopen) {
            document.querySelector('.editbutton').innerHTML = "Done"
            const textarea = document.createElement("textarea")
            textarea.setAttribute('class', 'namesofyoutubers')
            textarea.style.width = "100%"
            textarea.style.height = "100px"
            textarea.value = youtubers.join('\n')
            document.body.appendChild(textarea)
            // removebuttons()
        } else {
            const newvaluearray = document.querySelector('textarea.namesofyoutubers').value.split('\n')
            youtubers = newvaluearray
            // setbuttons(newvaluearray)
            localStorage.setItem('youtubers', JSON.stringify(newvaluearray))
            document.querySelector('.editbutton').innerHTML = "Edit"
            document.body.removeChild(document.querySelector('textarea.namesofyoutubers'))
        }
    })
};
