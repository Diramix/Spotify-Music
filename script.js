setInterval(() => {
    const imgElements = document.querySelectorAll('[class*="FullscreenPoster_cover"]');
    let imgBackground = "";

    imgElements.forEach(img => {
        if (img.src && img.src.includes('/400x400')) {
            imgBackground = img.src.replace('/400x400', '/1000x1000');
            console.log(imgBackground)
        }
    });

    if (imgBackground) {
        const targetElement = document.querySelector('.FullscreenPlayerDesktop_content__bl_7V');
        if (targetElement) {
            targetElement.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.95) 100%), url(${imgBackground}) center center / cover no-repeat`;
            console.log(targetElement)
        }
    }
}, 1000);
