// ThemeTitleText
/*--------------------------------------------*/
const newElement = document.createElement('div');
newElement.className = 'Spotify_Music_2';
document.body.appendChild(newElement);
/*--------------------------------------------*/

// Автосмена темы Яндекс Музыки на тёмную
/*--------------------------------------------*/
setInterval(() => {
  const body = document.body;
  if (!body.classList.contains('ym-dark-theme') && !body.classList.contains('ym-light-theme')) {
    body.classList.add('ym-dark-theme');
  } else if (body.classList.contains('ym-light-theme')) {
    body.classList.replace('ym-light-theme', 'ym-dark-theme');
  }
}, 0);
/*--------------------------------------------*/

// Spotify Screen
/*--------------------------------------------*/
setInterval(() => {
    const playerCover = document.querySelector('.PlayerBarDesktop_cover__IYLwR');
    const trackNameElement = document.querySelector('body > div > div > div > section > div > div > div > div > div > div > div > a > span.Meta_text__Y5uYH');
    const fallbackTrackNameElement = document.querySelector('body > div > div > div > section > div > div > div > div > div > div > div > span');
    const artistElement = document.querySelector('body > div > div > div > section > div > div > div > div > div > div.SeparatedArtists_root_clamp__SyvjM');
    const firstArtist = document.querySelector('body > div > div > div > section > div > div > div > div > div > div > a:nth-child(1) > span');
    const fallbackArtist = document.querySelector('body > div > div > div > section > div > div > div > div > div > div > span');
    let spotifyScreen = document.querySelector('.Spotify_Screen');

    if (!spotifyScreen) {
        spotifyScreen = document.createElement('div');
        spotifyScreen.classList.add('Spotify_Screen');
        document.body.appendChild(spotifyScreen);

        const wikiContainer = document.createElement('div');
        wikiContainer.classList.add('Wiki_Container');
        spotifyScreen.appendChild(wikiContainer);

        const infoTitle = document.createElement('div');
        infoTitle.classList.add('Info_Title');
        infoTitle.textContent = 'Сведения';
        wikiContainer.appendChild(infoTitle);

        const searchInfo = document.createElement('div');
        searchInfo.classList.add('Search_Info');
        wikiContainer.appendChild(searchInfo);

        const achtungAlert = document.createElement('div');
        achtungAlert.classList.add('Achtung_Alert');
        achtungAlert.textContent = 'В сведениях иногда бывают неправильные результаты. Проверяйте информацию подробнее, если изначально вам не всё равно!';
        wikiContainer.appendChild(achtungAlert);
    }

    spotifyScreen.style.display = playerCover ? 'block' : 'none';

    let smBackground = document.querySelector('.SM_Background');
    if (!smBackground) {
        smBackground = document.createElement('div');
        smBackground.classList.add('SM_Background');
        spotifyScreen.appendChild(smBackground);
    }

    let smTitleContainer = document.querySelector('.SM_Title_Container');
    if (!smTitleContainer) {
        smTitleContainer = document.createElement('div');
        smTitleContainer.classList.add('SM_Title_Container');
        spotifyScreen.appendChild(smTitleContainer);
    }

    let smDecorateButtons = document.querySelector('.SM_Decorate_Buttons');
    if (!smDecorateButtons) {
        smDecorateButtons = document.createElement('div');
        smDecorateButtons.classList.add('SM_Decorate_Buttons');
        smTitleContainer.appendChild(smDecorateButtons);
    }

    let smFirstArtist = document.querySelector('.SM_First_Artist');
    if (!smFirstArtist) {
        smFirstArtist = document.createElement('div');
        smFirstArtist.classList.add('SM_First_Artist');
        smTitleContainer.appendChild(smFirstArtist);
    }

    smFirstArtist.textContent = firstArtist ? firstArtist.textContent : (fallbackArtist ? fallbackArtist.textContent : '');

    let smCover = document.querySelector('.SM_Cover');
    if (!smCover) {
        smCover = document.createElement('div');
        smCover.classList.add('SM_Cover');
        spotifyScreen.appendChild(smCover);
    }

    let smDecorateAddToPlaylistButton = document.querySelector('.SM_Decorate_AddToPlaylist_Button');
    if (!smDecorateAddToPlaylistButton) {
        smDecorateAddToPlaylistButton = document.createElement('div');
        smDecorateAddToPlaylistButton.classList.add('SM_Decorate_AddToPlaylist_Button');
        spotifyScreen.appendChild(smDecorateAddToPlaylistButton);
    }

    let smTrackName = document.querySelector('.SM_Track_Name');
    if (!smTrackName) {
        smTrackName = document.createElement('div');
        smTrackName.classList.add('SM_Track_Name');
        spotifyScreen.appendChild(smTrackName);
    }

    smTrackName.textContent = trackNameElement ? trackNameElement.textContent : (fallbackTrackNameElement ? fallbackTrackNameElement.textContent : '');

    let smArtist = document.querySelector('.SM_Artist');
    if (!smArtist) {
        smArtist = document.createElement('div');
        smArtist.classList.add('SM_Artist');
        spotifyScreen.appendChild(smArtist);
    }

    if (artistElement) {
        smArtist.textContent = artistElement.textContent;
    }

    if (window.innerWidth < 1080) {
        spotifyScreen.style.display = 'none';
    }
}, 1000);

setInterval(() => {
    const imgElements = document.querySelectorAll('[class*="PlayerBarDesktop_cover__IYLwR"]');
    let imgBackground = "";

    imgElements.forEach(img => {
        if (img.src && img.src.includes('/1000x1000')) {
            imgBackground = img.src.replace('/1000x1000', '/1000x1000');
            console.log(imgBackground);
        }
    });

    if (imgBackground) {
        const targetElement = document.querySelector('.SM_Cover');
        if (targetElement) {
            targetElement.style.background = `url(${imgBackground}) center center / cover no-repeat`;
            console.log(targetElement);
        }
    }

    if (imgBackground) {
        const targetElement = document.querySelector('.SM_Background');
        if (targetElement) {
            targetElement.style.background = `url(${imgBackground}) center center / cover no-repeat`;
            console.log(targetElement);
        }
    }
}, 1000);
/*--------------------------------------------*/

// Вики
/*--------------------------------------------*/
const targetElementSelector = 'body > div > div > div > section > div > div > div > div > div > div > a:nth-child(1) > span';
const fallbackElementSelector = 'body > div > div > div > section > div > div > div > div > div > div.SeparatedArtists_root_variant_breakAll__34YbW.SeparatedArtists_root_clamp__SyvjM.Meta_text__Y5uYH.Meta_artists__VnR52 > span';
const Search_InfoSelector = '.Search_Info';
const AchtungAlertSelector = '.Achtung_Alert';

let lastText = '';

const fetchDataAndUpdate = async (searchText) => {
    const Search_InfoElement = document.querySelector(Search_InfoSelector);
    const AchtungAlertElement = document.querySelector(AchtungAlertSelector);

    try {
        const response = await fetch(`https://ru.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${encodeURIComponent(searchText)}&prop=extracts&exintro&explaintext`);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const page = Object.values(data.query.pages)[0];

        if (page.extract) {
            Search_InfoElement.innerText = page.extract || 'Нет информации';
            AchtungAlertElement.style.display = 'block';
        } else {
            Search_InfoElement.innerText = 'Нет информации';
            AchtungAlertElement.style.display = 'none';
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        if (Search_InfoElement) {
            Search_InfoElement.innerText = 'Ошибка при получении информации';
        }
        if (AchtungAlertElement) {
            AchtungAlertElement.style.display = 'none';
        }
    }
};

const checkForChanges = () => {
    const targetElement = document.querySelector(targetElementSelector) || document.querySelector(fallbackElementSelector);
    if (targetElement) {
        const currentText = targetElement.innerText.trim();

        if (currentText && currentText !== lastText) {
            lastText = currentText; 
            fetchDataAndUpdate(currentText);
        }
    }
};

setInterval(checkForChanges, 1000);
/*--------------------------------------------*/

// Cкрытие Spotify Screen
/*--------------------------------------------*/
setInterval(() => {
    const spotifyScreen = document.querySelector('.Spotify_Screen');
    const contentMain = document.querySelector('.Content_main__8_wIa');

    if (spotifyScreen && contentMain) {
        if (spotifyScreen.style.display === 'block') {
            contentMain.style.marginRight = '273px';
        } else if (spotifyScreen.style.display === 'none') {
            contentMain.style.marginRight = '';
        }
    }
}, 1000);
/*--------------------------------------------*/

// Изменение размера навбара
/*--------------------------------------------*/
setInterval(() => {
    const navbar = document.querySelector('.NavbarDesktop_root__scYzp');
    const content = document.querySelector('.Content_main__8_wIa');

    if (window.innerWidth < 1080) {
        navbar.style.width = '200px';
        content.style.left = '217px';
    } else {
        navbar.style.width = '300px';
        content.style.left = '317px';
    }
}, 1000);
/*--------------------------------------------*/

// Спонсор
/*--------------------------------------------*/
setInterval(() => {
    const container = document.querySelector('.VibeBlock_root__z7LtR');
    const spotifyAdError = container.querySelector('.rf_Spotify_Sponsor');

    if (!spotifyAdError) {
        const newElement = document.createElement('div');
        newElement.className = 'rf_Spotify_Sponsor';
        container.appendChild(newElement);
        newElement.textContent = 'При поддержке спонсора';
    }
}, 1000);

let currentColor = { r: 0, g: 0, b: 0 };

function rgbString(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor(color, factor) {
    return {
        r: Math.round(color.r * (1 - factor)),
        g: Math.round(color.g * (1 - factor)),
        b: Math.round(color.b * (1 - factor))
    };
}

function interpolateColor(color1, color2, factor) {
    const result = {
        r: Math.round(color1.r + (color2.r - color1.r) * factor),
        g: Math.round(color1.g + (color2.g - color1.g) * factor),
        b: Math.round(color1.b + (color2.b - color1.b) * factor)
    };
    return result;
}
/*--------------------------------------------*/

// Градиент на главной
/*--------------------------------------------*/
setInterval(() => {
    const playerElement = document.querySelector('.PlayerBar_root__cXUnU');
    const targetElement = document.querySelector('.MainPage_content__kskSM');
    
    if (playerElement && targetElement) {
        const newColorHex = playerElement.style.getPropertyValue('--player-average-color-background').trim();
        if (newColorHex) {
            const newColor = {
                r: parseInt(newColorHex.slice(1, 3), 16),
                g: parseInt(newColorHex.slice(3, 5), 16),
                b: parseInt(newColorHex.slice(5, 7), 16)
            };

            const darkenedColor = darkenColor(newColor, 0.5);

            const steps = 10;
            let step = 0;

            const interval = setInterval(() => {
                if (step <= steps) {
                    const factor = step / steps;
                    const interpolatedColor = interpolateColor(currentColor, darkenedColor, factor);
                    targetElement.style.backgroundImage = `linear-gradient(${rgbString(interpolatedColor.r, interpolatedColor.g, interpolatedColor.b)}, rgba(0, 0, 0, 0) 100%)`;
                    step++;
                } else {
                    clearInterval(interval);
                    currentColor = darkenedColor;
                }
            }, 50);
        }
    }
}, 1000);
/*--------------------------------------------*/

// Изменение цвета готового градиента на других страницах
/*--------------------------------------------*/
setInterval(() => {
    const playerBar = document.querySelector('.PlayerBar_root__cXUnU');
    if (playerBar) {
        const playerAverageColor = getComputedStyle(playerBar).getPropertyValue('--player-average-color-background').trim();
        document.documentElement.style.setProperty('--average-color-background', playerAverageColor);
    }
}, 1000);
/*--------------------------------------------*/

// Отключение тупого даблклика
/*--------------------------------------------*/
function disableDoubleClick() {
    const elements = document.querySelectorAll('.PlayerBar_root__cXUnU');

    elements.forEach(element => {
        element.addEventListener('dblclick', function(event) {
            event.preventDefault();
            event.stopPropagation();
        }, true);
    });
}

setInterval(disableDoubleClick, 1000);
/*--------------------------------------------*/

// Spotify DJ
/*--------------------------------------------*/
setInterval(() => {
    const PinsList = document.querySelector('.PinsList_content__9RG7s');
    const playButton = document.querySelector('.VibeBlock_playButton__6xU55');

    if (PinsList && playButton && !PinsList.querySelector('.SM_Yandex_DJ')) {
        const smYandexDJ = document.createElement('div');
        smYandexDJ.classList.add('SM_Yandex_DJ');

        const djCover = document.createElement('div');
        djCover.classList.add('DJ_Cover');

        const djTitle = document.createElement('div');
        djTitle.classList.add('DJ_Title');
        djTitle.textContent = 'DJ';

        const djDescription = document.createElement('div');
        djDescription.classList.add('DJ_Description');
        djDescription.textContent = 'Click to start listening';

        smYandexDJ.appendChild(djCover);
        smYandexDJ.appendChild(djTitle);
        smYandexDJ.appendChild(djDescription);

        smYandexDJ.addEventListener('click', () => {
            if (playButton) {
                playButton.click();
            }
            const resetButton = document.querySelector('[data-test-id="RESET_VIBE_CONTEXT_BUTTON"]');
            if (resetButton) {
                resetButton.click();
            }
        });

        PinsList.insertBefore(smYandexDJ, PinsList.firstChild);
    }
}, 1000);
/*--------------------------------------------*/