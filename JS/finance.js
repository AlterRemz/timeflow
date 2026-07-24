function goToPage(page) {
  const slider = document.getElementById('pagesSlider');
  const buttons = document.querySelectorAll('.nav-btn');

  // Reset status aktif tombol navigasi
  buttons.forEach(btn => btn.classList.remove('active'));

  if (page === 'left') {
    slider.style.transform = 'translateX(0%)';
    buttons[0].classList.add('active');
  } else if (page === 'center') {
    slider.style.transform = 'translateX(-33.333%)';
    buttons[1].classList.add('active');
  } else if (page === 'right') {
    slider.style.transform = 'translateX(-66.666%)';
    buttons[2].classList.add('active');
  }
}