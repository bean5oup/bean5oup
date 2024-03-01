window.onload = () => {
    if(!!document.location.hash)
        moveScroll();
};

$(document).ready(() => {
    let html = ``;
    let flag_open_h3 = false;
    let pos = 0; // To differentiate between items with the same name.

    $('.entry-content h1, .entry-content h2:not(.screen_out), .entry-content h3, .entry-content .tt_article_useless_p_margin.contents_style h4').map((idx, e) => {
        if(e.tagName == 'H1') {
            if(flag_open_h3) {
                html += '</ul>';
                flag_open_h3 = false;
            }
            const encoded = encodeURI(e.innerText);
            html += `
                <a id=pos_${pos++} href='#${encoded}'>${e.innerText}</a>
            `;
        }
        else if(e.tagName == 'H2') {
            if(flag_open_h3) {
                html += '</ul>';
                flag_open_h3 = false;
            }
            const encoded = encodeURI(e.innerText);
            html += `
                <li>
                    <a id=pos_${pos++} href='#${encoded}'>${e.innerText}</a>
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
                    <a id=pos_${pos++} href='#${encoded}'>${e.innerText}</a>
                </li>
            `;
        }

        // add header hash
        let aTag = document.createElement('a');
        aTag.className = 'h';
        aTag.href = `#${encodeURI(e.innerText)}`;
        aTag.innerHTML = `
            <span></span>
        `;
        e.prepend(aTag);
    });

    let toc = `
        <div class='toc'>
            <div class='toc_btn'></div>
            <div class='content'>
                <ul>
                    ${html}
                </ul>
            </div>
        </div>
    `;
    if(!!html)
        $('.toc_container').prepend(toc);
    //$('#content').prepend(toc);

    document.querySelectorAll('.toc a').forEach((e) => {
        e.addEventListener('click', moveScrollByClick);
    });

    
    const backupWidth = document.querySelector('.toc').clientWidth;
    const backupHeight = document.querySelector('.toc').clientHeight;
    //document.querySelector('.toc').style.height = `${backupHeight}px`; // set first init value explicitly

    document.querySelector('.toc_btn').addEventListener('click', (e) => {
        //toc hide and show
        let toc = document.querySelector('.toc').style;

        if(toc.width !== `${e.target.clientWidth}px`) {
            toc.height = `${backupHeight}px`; // set first init value explicitly
            toc.width = `${e.target.clientWidth}px`;
            toc.height = `${e.target.clientWidth}px`;
            toc.opacity = '0.7';
            toc.overflowX = 'hidden';
        }
        else {
            toc.opacity = '0.9';
            toc.width = `${backupWidth}px`;
            toc.height = `${backupHeight}px`;
            toc.overflowX = '';
        }
    })
});

/*
window.addEventListener("hashchange", (e) => {
    moveScroll();    
});
*/

function moveScrollByClick(e) {
    let target = [...$('.entry-content h1, .entry-content h2:not(.screen_out), .entry-content h3')][parseInt(e.target.id.slice(4))];
    if(target) {
        if(e.target.innerText == target.innerText) {
            target.scrollIntoView({behavior: "smooth"});
            return;
        }
    }
}

function moveScroll() {
    for(const h of [...$('.entry-content h1, .entry-content h2:not(.screen_out), .entry-content h3')]) {
        if(decodeURI(document.location.hash) == `#${h.innerText}`) {
            h.scrollIntoView({behavior: "smooth"});
            return;
        }
    }
}
