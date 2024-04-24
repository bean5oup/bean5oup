$(document).ready(() => {
    if(document.location.pathname == '/')
        return;

    $('#content>.inner').css('padding', '0');
    $('#content>.inner').css('max-width', '100%');

    let excerpt = $('.entry-content p')[0].innerText.trim();
    $('.entry-content p')[0].remove();
    $('.entry-excerpt b').text(excerpt);

    let image = $('.entry-content figure.imageblock')[0];
    if(image) {
        $('.entry-header-thumb').css('background-image', `url(${image.querySelector('span img').src})`);
        image.remove();
    }
    $('.post-tags')[0].innerHTML = $('.post-tags')[0].innerHTML.replaceAll('</a>, <a', '</a> <a');
});