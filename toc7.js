window.onload = () => {
    if(!!document.location.hash)
        moveScroll();
};

$(document).ready(() => {
    let html = ``;
    let flag_open_h3 = false;

    $('.entry-content h2:not(.screen_out), .entry-content h3').map((idx, e) => {
        if(e.tagName == 'H2') {
            if(flag_open_h3) {
                html += '</ul>';
                flag_open_h3 = false;
            }
            const encoded = encodeURI(e.innerText);
            html += `
                <li>
                    <a href='#${encoded}'>${e.innerText}</a>
                </li>
            `;
        }
        else if(e.tagName == 'H3') {
            if(!flag_open_h3) {
                html += '<ul>'
                flag_open_h3 = true;
            }
            const encoded = encodeURI(e.innerText);
            html += `
                <li>
                    <a href='#${encoded}'>${e.innerText}</a>
                </li>
            `;
        }
    });

    let toc = `
        <div class='toc'>
        <ul>
            ${html}
        </ul>
        </div>
    `;
    if(!!html)
        $('#content').prepend(toc);

    document.querySelectorAll('.toc a').forEach((e) => {
        e.addEventListener('click', moveScrollByClick);
    });
});

window.addEventListener("hashchange", (e) => {
    moveScroll();    
});

function moveScrollByClick(e) {
    for(const h of [...$('.entry-content h2:not(.screen_out), .entry-content h3')]) {
        if(e.target.innerText == h.innerText) {
            h.scrollIntoView({behavior: "smooth"});
            return;
        }
    }
}

function moveScroll() {
    for(const h of [...$('.entry-content h2:not(.screen_out), .entry-content h3')]) {
        if(decodeURI(document.location.hash) == `#${h.innerText}`) {
            h.scrollIntoView({behavior: "smooth"});
            return;
        }
    }
}