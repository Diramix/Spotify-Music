// Main setInterval
/*--------------------------------------------*/
setInterval(() => {
    yandexThemeUpdate();
    addSpotifyScreen();
    spotifyScreenUpdateCoverImage();
    checkForChanges();
    toggleGPTInfoContainer();
    contentMainSSHidding();
    changeCompleteGradientOnOurPages();
    disableDoubleClick();
    spotifyDownloadIconMove();
}, 100);
/*--------------------------------------------*/

// Автосмена темы Яндекс Музыки на тёмную
/*--------------------------------------------*/
function yandexThemeUpdate() {
    const body = document.body;
    if (!body.classList.contains('ym-dark-theme') && !body.classList.contains('ym-light-theme')) {
      body.classList.add('ym-dark-theme');
    } else if (body.classList.contains('ym-light-theme')) {
      body.classList.replace('ym-light-theme', 'ym-dark-theme');
    }
  };
/*--------------------------------------------*/

// Spotify Screen
/*--------------------------------------------*/
function addSpotifyScreen() {
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
        
        spotifyScreen.innerHTML = `
            <div class="All_Info_Container">
                <div class="Artist_Info_Container">
                    <div class="Info_Title">Сведения об исполнителе</div>
                    <div class="Search_Info"></div>
                </div>
                <div class="GPT_Info_Container">
                    <div class="GPT_Info_Title">Сведения о треке</div>
                    <div class="GPT_Search_Info"></div>
                </div>
                <div class="Achtung_Alert">В сведениях иногда бывают неправильные результаты. Проверяйте информацию подробнее, если изначально вам не всё равно!</div>
            </div>
            <div class="SM_Background"></div>
            <div class="SM_Title_Container">
                <div class="SM_Decorate_Buttons"></div>
                <div class="SM_First_Artist"></div>
            </div>
            <div class="SM_Cover"></div>
            <div class="SM_Decorate_AddToPlaylist_Button"></div>
            <div class="SM_Track_Name"></div>
            <div class="SM_Artist"></div>
        `;
    }

    spotifyScreen.style.display = playerCover ? 'block' : 'none';

    document.querySelector('.SM_First_Artist').textContent = firstArtist ? firstArtist.textContent : (fallbackArtist ? fallbackArtist.textContent : '');
    document.querySelector('.SM_Track_Name').textContent = trackNameElement ? trackNameElement.textContent : (fallbackTrackNameElement ? fallbackTrackNameElement.textContent : '');
    document.querySelector('.SM_Artist').textContent = artistElement ? artistElement.textContent : '';

    if (window.innerWidth < 1080) {
        spotifyScreen.style.display = 'none';
    }
};

function spotifyScreenUpdateCoverImage() {
    const imgElements = document.querySelectorAll('[class*="PlayerBarDesktop_cover__IYLwR"]');
    let imgBackground = "http://127.0.0.1:2007/Assets/no-cover-image.png";

    imgElements.forEach(img => {
        if (img.src && img.src.includes('/100x100')) {
            imgBackground = img.src.replace('/100x100', '/1000x1000');
        }
    });

    const targetElementCover = document.querySelector('.SM_Cover');
    if (targetElementCover) {
        targetElementCover.style.background = `url(${imgBackground}) center center / cover no-repeat`;
    }

    const targetElementBackground = document.querySelector('.SM_Background');
    if (targetElementBackground) {
        targetElementBackground.style.background = `url(${imgBackground}) center center / cover no-repeat`;
    }
};
/*--------------------------------------------*/

// Вики
/*--------------------------------------------*/
const targetElementSelector = 'body > div > div > div > section > div > div > div > div > div > div > a:nth-child(1) > span';
const fallbackElementSelector = 'body > div > div > div > section > div > div > div > div > div > div.SeparatedArtists_root_variant_breakAll__34YbW.SeparatedArtists_root_clamp__SyvjM.Meta_text__Y5uYH.Meta_artists__VnR52 > span';
const trackNameSelector = '.SM_Track_Name';
const Search_InfoSelector = '.Search_Info';
const GPT_Search_InfoSelector = '.GPT_Search_Info';
const AchtungAlertSelector = '.Achtung_Alert';
const GPT_InfoContainerSelector = '.GPT_Info_Container';

let lastArtist = '';
let lastTrack = '';
let lastText = '';

const fetchDataAndUpdateWiki = async (searchText) => {
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

const fetchDataAndUpdateNeuro = async (artistName, trackName) => {
    const Search_InfoElement = document.querySelector(Search_InfoSelector);
    const GPT_Search_InfoElement = document.querySelector(GPT_Search_InfoSelector);
    const AchtungAlertElement = document.querySelector(AchtungAlertSelector);

    try {
        const prompt = `
            Расскажи про артиста "${artistName}".
            Затем расскажи про трек "${trackName}" этого артиста.
            Раздели ответ следующим образом:
            "=== Артист ===
            [Артист] - [Информация об артисте]
            === Трек ===
            [Название трека] - [Информация о треке]"
            Не добавляй приветствий и дополнительных слов, кроме указанного разделения.
        `;

        const response = await fetch('http://api.onlysq.ru/ai/v1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([
                {
                    role: 'user',
                    content: prompt.trim(),
                },
            ]),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        const gptAnswer = data.answer || 'Нет информации';

        // Разделение ответа по ключевым разделителям
        const [artistInfo, trackInfo] = gptAnswer.split(/=== Трек ===/i);

        if (Search_InfoElement) {
            Search_InfoElement.innerText = artistInfo?.replace(/=== Артист ===/i, '').trim() || 'Нет информации об артисте';
        }
        if (GPT_Search_InfoElement) {
            GPT_Search_InfoElement.innerText = trackInfo?.trim() || 'Нет информации о треке';
        }

        AchtungAlertElement.style.display = 'block';
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        if (Search_InfoElement) {
            Search_InfoElement.innerText = 'Ошибка при получении информации об артисте';
        }
        if (GPT_Search_InfoElement) {
            GPT_Search_InfoElement.innerText = 'Ошибка при получении информации о треке';
        }
        if (AchtungAlertElement) {
            AchtungAlertElement.style.display = 'none';
        }
    }
};

const checkForChanges = () => {
    const artistElement = document.querySelector(targetElementSelector) || document.querySelector(fallbackElementSelector);
    const trackElement = document.querySelector(trackNameSelector);

    const currentArtist = artistElement ? artistElement.innerText.trim() : '';
    const currentTrack = trackElement ? trackElement.innerText.trim() : '';

    if (neuroSearch) {
        if (currentArtist !== lastArtist || currentTrack !== lastTrack) {
            lastArtist = currentArtist;
            lastTrack = currentTrack;

            if (currentArtist || currentTrack) {
                fetchDataAndUpdateNeuro(currentArtist || 'Неизвестный артист', currentTrack || 'Неизвестный трек');
            }
        }
    } else {
        if (currentArtist !== lastText) {
            lastText = currentArtist;

            if (currentArtist) {
                fetchDataAndUpdateWiki(currentArtist);
            }
        }
        // Скрыть элемент, если neuroSearch == false
        const GPT_InfoContainerElement = document.querySelector(GPT_InfoContainerSelector);
        if (GPT_InfoContainerElement) {
            GPT_InfoContainerElement.style.display = 'none';
        }
    }
};

// Показать элемент, если neuroSearch == true
const toggleGPTInfoContainer = () => {
    const GPT_InfoContainerElement = document.querySelector(GPT_InfoContainerSelector);
    if (GPT_InfoContainerElement) {
        GPT_InfoContainerElement.style.display = neuroSearch ? 'block' : 'none';
    }
};
/*--------------------------------------------*/

// Cкрытие Spotify Screen
/*--------------------------------------------*/
function contentMainSSHidding() {
    const spotifyScreen = document.querySelector('.Spotify_Screen');
    const contentMain = document.querySelector('.Content_main__8_wIa');

    if (spotifyScreen && contentMain) {
        if (spotifyScreen.style.display === 'block') {
            contentMain.style.marginRight = '283px';
        } else if (spotifyScreen.style.display === 'none') {
            contentMain.style.marginRight = '';
        }
    }
};
/*--------------------------------------------*/

// Спонсор
/*--------------------------------------------
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
/*--------------------------------------------
function darkenColor(color, factor) {
    return {
        r: Math.max(0, Math.floor(color.r * (1 - factor))),
        g: Math.max(0, Math.floor(color.g * (1 - factor))),
        b: Math.max(0, Math.floor(color.b * (1 - factor)))
    };
}

function interpolateColor(color1, color2, factor) {
    return {
        r: Math.round(color1.r + (color2.r - color1.r) * factor),
        g: Math.round(color1.g + (color2.g - color1.g) * factor),
        b: Math.round(color1.b + (color2.b - color1.b) * factor)
    };
}

function rgbString(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}

let currentColor = { r: 255, g: 255, b: 255 }; // Начальный цвет

setInterval(() => {
    const playerElement = document.querySelector('.PlayerBar_root__cXUnU');
    const targetElement = document.querySelector('.MainPage_content__kskSM');

    if (playerElement && targetElement) {
        const newColorHex = getComputedStyle(playerElement).getPropertyValue('--player-average-color-background').trim();
        if (/^#[0-9A-Fa-f]{6}$/.test(newColorHex)) {
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
                    targetElement.style.backgroundImage = `linear-gradient(to bottom, ${rgbString(interpolatedColor.r, interpolatedColor.g, interpolatedColor.b)}, rgba(0, 0, 0, 0) 100%)`;
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
function changeCompleteGradientOnOurPages() {
    const playerBar = document.querySelector('.PlayerBar_root__cXUnU');
    if (playerBar) {
        const playerAverageColor = getComputedStyle(playerBar).getPropertyValue('--player-average-color-background').trim();
        document.documentElement.style.setProperty('--average-color-background', playerAverageColor);
    }
};
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
/*--------------------------------------------*/

// Spotify DJ
/*--------------------------------------------*/
function addSpotifyDJX() {
    const PinsList = document.querySelector('.PinsList_content__9RG7s');
    const playButton = document.querySelector('.VibeBlock_playButton__6xU55');

    if (PinsList && playButton && !PinsList.querySelector('.SM_Yandex_DJ')) {
        const smYandexDJ = document.createElement('div');
        smYandexDJ.classList.add('SM_Yandex_DJ');
        
        smYandexDJ.innerHTML = `
            <div class="DJ_Cover"></div>
            <div class="DJ_Title">DJ</div>
            <div class="DJ_Description">Click to start listening</div>
            <div class="DJ_Buttons"></div>
        `;

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
};

setInterval(addSpotifyDJX, 100);
/*--------------------------------------------*/

// Скрипт который перемещает download icon по спотифаевски
/*--------------------------------------------*/
function spotifyDownloadIconMove() {
    const containers = document.querySelectorAll('[data-test-id="TRACK_PLAYLIST"]');
    containers.forEach(container => {
        const downloadIcon = container.querySelector('.ControlsBar_item__I_p99');
        const metaText = container.querySelector('.Meta_artists__VnR52');
        if (downloadIcon) {
            if (downloadIcon.innerHTML.trim() === '') {
                downloadIcon.style.display = 'none';
            } else {
                downloadIcon.style.display = '';
                if (metaText) {
                    metaText.insertBefore(downloadIcon, metaText.firstChild);
                }
            }
        }
    });
};
/*--------------------------------------------*/

// ThemeTitleText
/*--------------------------------------------*/
const newElement = document.createElement('div');
newElement.className = 'Spotify_Music_2';
document.body.appendChild(newElement);
/*--------------------------------------------*/

// Google Noto Sans Font
/*--------------------------------------------*/
const link1 = document.createElement('link');
link1.rel = 'preconnect';
link1.href = 'https://fonts.googleapis.com';
document.head.appendChild(link1);

const link2 = document.createElement('link');
link2.rel = 'preconnect';
link2.href = 'https://fonts.gstatic.com';
link2.crossOrigin = 'anonymous';
document.head.appendChild(link2);

const link3 = document.createElement('link');
link3.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap';
link3.rel = 'stylesheet';
document.head.appendChild(link3);
/*--------------------------------------------*/

// GPT Update Notification
/*--------------------------------------------*/
function createNotification() {
    if (localStorage.getItem('notificationShown') === 'true') {
        return;
    }

    const background = document.createElement('div');
    background.classList.add('notification_background');

    background.innerHTML = `
        <div class="notification">
        <div class="notification_title">Интеграция с ChatGPT!</div>
        <div class="notification_text">
            С версии Spotify Music! 2.1.0 вы можете использовать нейропоиск для получения информации об исполнителе и треке.<br><br>
            Эту функцию можно активировать в файле "script.js" в разделе "Быстрые настройки" в самом верху скрипта, который находится в папке с темой.<br><br>
            Отдельная благодарность chepuxcat за идею и API <3
        </div>
        <button class="notification_ok_button">OK</button>
        </div>
    `;

    background.querySelector('.notification_ok_button').onclick = function() {
        background.remove();
        localStorage.setItem('notificationShown', 'true');
    };

    document.body.appendChild(background);
}

createNotification();
/*--------------------------------------------*/

/*Управление handleEvents.json*/
/*--------------------------------------------*/
let settings = {};

let neuroSearch, updateInterval;
let settingsDelay = 1000;

function log(text) {
    console.log('[Customizable LOG]: ', text)
}

async function getSettings() {
    try {
        const response = await fetch("http://127.0.0.1:2007/get_handle");
        if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);
        const data = await response.json();
        if (!data?.data?.sections) {
            console.warn("Структура данных не соответствует ожидаемой.");
            return {};
        }
        return Object.fromEntries(data.data.sections.map(({ title, items }) => [
            title,
            Object.fromEntries(items.map(item => [
                item.id,
                item.bool ?? item.input ?? Object.fromEntries(item.buttons?.map(b => [b.name, b.text]) || [])
            ]))
        ]));
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return {};
    }
}

async function setSettings(newSettings) {
    // Проверка и обновление значения neuroSearch
    if (Object.keys(settings).length === 0 || settings['Действия'].gptSearch !== newSettings['Действия'].gptSearch) {
        if (newSettings['Действия'].gptSearch) {
            neuroSearch = true;
        } else {
            neuroSearch = false;
        }
    }

    // Включение/отключение All_Info_Container
    const allInfoContainer = document.querySelector('.All_Info_Container');

    if (Object.keys(settings).length === 0 || settings['Действия'].allInfoContainerToggle !== newSettings['Действия'].allInfoContainerToggle) {
        if (newSettings['Действия'].allInfoContainerToggle) {
            allInfoContainer.style.display = 'block';
        } else {
            allInfoContainer.style.display = 'none';
        }
    }

    // Colorful II Downloader
    if (Object.keys(settings).length === 0 || settings['Colorful'].toggleColorfulII !== newSettings['Colorful'].toggleColorfulII) {
        const cssId = "custom-css"; 
        const existingLink = document.getElementById(cssId);
    
        if (newSettings['Colorful'].toggleColorfulII) {
            if (!existingLink) {
                fetch("https://raw.githubusercontent.com/Diramix/Colorful/Colorful-II/Colorful%20II/style.css")
                    .then(response => response.text())
                    .then(css => {
                        const style = document.createElement("style");
                        style.id = cssId;
                        style.textContent = css;
                        document.head.appendChild(style);
                    })
                    .catch(error => console.error("Ошибка загрузки CSS:", error));
            }
        } else {
            if (existingLink) {
                existingLink.remove();
            }
        }
    }

    // Open Blocker
    const modules = [
        "donations",
        "concerts",
        "trailers",
        "relevantnow"
    ];
    
    modules.forEach(module => {
        const settingKey = `OB${module.charAt(0) + module.slice(1)}`;
        const cssId = `openblocker-${module}`;
        const existingLink = document.getElementById(cssId);
        
        if (Object.keys(settings).length === 0 || settings['Open-Blocker'][settingKey] !== newSettings['Open-Blocker'][settingKey]) {
            if (newSettings['Open-Blocker'][settingKey]) {
                if (existingLink) {
                    existingLink.remove();
                }
            } else {
                if (!existingLink) {
                    fetch(`https://raw.githubusercontent.com/Open-Blocker-FYM/Open-Blocker/refs/heads/main/blocker-css/${module}.css`)
                        .then(response => response.text())
                        .then(css => {
                            const style = document.createElement("style");
                            style.id = cssId;
                            style.textContent = css;
                            document.head.appendChild(style);
                        })
                        .catch(error => console.error(`Ошибка загрузки CSS: ${module}`, error));
                }
            }
        }
    });

    // Auto Play
    if (newSettings['Developer'].devAutoPlayOnStart && !window.hasRun) {
        document.querySelector(`section.PlayerBar_root__cXUnU * [data-test-id="PLAY_BUTTON"]`)
        ?.click();
        window.hasRun = true;
    }
    
    // Update theme settings delay
    if (Object.keys(settings).length === 0 || settings['Особое'].setInterval.text !== newSettings['Особое'].setInterval.text) {
        const newDelay = parseInt(newSettings['Особое'].setInterval.text, 10) || 1000;
        if (settingsDelay !== newDelay) {
            settingsDelay = newDelay;

            // Обновление интервала
            clearInterval(updateInterval);
            updateInterval = setInterval(update, settingsDelay);
        }
    }
}

async function update() {
    const newSettings = await getSettings();
    await setSettings(newSettings);
    settings = newSettings;
}

function init() {
    update();
    updateInterval = setInterval(update, settingsDelay);
}

init();
/*--------------------------------------------*/