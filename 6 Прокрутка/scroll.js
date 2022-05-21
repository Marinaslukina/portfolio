(() => {

    function backToTop() {
        if (window.pageYOffset > 0) {
          window.scrollBy(0, -80);
        //   window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(backToTop, 0);
        }
    }

    const btn = document.querySelector('.btn');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const coords = document.documentElement.clientHeight;
        if (scrolled > coords) {
            btn.style.display = 'block';
        }

        if (scrolled < coords) {
            btn.style.display = 'none';
        }
    })

    btn.addEventListener('click', backToTop);

}) ();