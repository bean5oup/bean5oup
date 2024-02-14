let color = ['#ce0070', '#5a27eb']

$('.progress-bar')[0].style.background = color[parseInt(Math.random()*100/50)];

window.onscroll = () => {progressBar()};

function progressBar() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  $('.progress-bar')[0].style.width = scrolled + "%";
}