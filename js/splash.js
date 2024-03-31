
const splash = document.querySelector('#splash');
const header = document.querySelector('.splash-header');
const headerSpan = document.querySelectorAll('.splash-logo');

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    headerSpan.forEach((span, index) => {
      setTimeout(() => {
        span.classList.add('active');
      }, (index + 1) * 400)
    })


    setTimeout(() => {
      headerSpan.forEach((span, index) => {
        setTimeout(() => {
          span.classList.remove('active');
          span.classList.add('fade');
        }, (index + 1) * 50)
      })
    }, 4000);

    setTimeout(() => {
      splash.style.top = '-100vh';
    }, 4300)

  })
})