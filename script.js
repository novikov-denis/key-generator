function showAssessmentFields() {
    hideAllSections();
    const assessmentFields = document.getElementById('assessment-fields');
    assessmentFields.classList.remove('hidden');
    clearGeneratedKeys();
}

function showReviewStatusFields() {
    hideAllSections();
    const reviewStatusFields = document.getElementById('review-status-fields');
    reviewStatusFields.classList.remove('hidden');
    clearGeneratedKeys();
}

function showCharactersFields() {
    hideAllSections();
    const charactersFields = document.getElementById('characters-fields');
    charactersFields.classList.remove('hidden');
    clearGeneratedKeys();
}

function showTestResultsFields() {
    hideAllSections();
    const testResultsFields = document.getElementById('test-results-fields');
    testResultsFields.classList.remove('hidden');
    clearGeneratedKeys();
}

function showNotAvailable() {
    hideAllSections();
    const popupFields = document.getElementById('popup-fields');
    const popupImage = document.getElementById('popup-image');
    popupFields.classList.remove('hidden');
    popupImage.classList.remove('hidden');
    clearGeneratedKeys();
}

function hideAllSections() {
    const sections = document.querySelectorAll('.main > div:not(.buttons)');
    sections.forEach(section => section.classList.add('hidden'));
}

function clearGeneratedKeys() {
    const keysContainers = document.querySelectorAll('.keys');
    keysContainers.forEach(container => {
        container.innerHTML = '';  // Очищаем содержимое сгенерированных ключей
    });
    const generatedSections = document.querySelectorAll('#generated-keys, #generated-popup-keys');
    generatedSections.forEach(section => section.classList.add('hidden'));  // Скрываем блоки с сгенерированными ключами
}

function generateKeys() {
    const slug = document.getElementById('course-slug').value.trim();
    const formattedSlug = formatSlug(slug);
    const moduleCount = document.getElementById('module-count').value;
    const courseLinks = document.getElementById('course-links').value.split('\n').map(link => link.trim());
    const moduleNames = document.getElementById('module-names').value.split('\n').map(name => name.trim());

    let keysHtml = '';

    for (let i = 0; i < moduleCount; i++) {
        keysHtml += `
            <div class="key-row">
                <input type="text" readonly value="${formattedSlug}.${i + 1}.moduleTitle" />
                <input type="text" readonly value="${moduleNames[i] || 'Название модуля'}" />
                <button class="copy-button" onclick="copyToClipboard('${formattedSlug}.${i + 1}.moduleTitle')">Копировать ключ</button>
                <button class="copy-button" onclick="copyToClipboard('${moduleNames[i] || 'Название модуля'}')">Копировать текст</button>
            </div>
            <div class="key-row">
                <input type="text" readonly value="${formattedSlug}.${i + 1}.moduleLink" />
                <input type="text" readonly value="${courseLinks[i] || 'Ссылка на ассессмент'}" />
                <button class="copy-button" onclick="copyToClipboard('${formattedSlug}.${i + 1}.moduleLink')">Копировать ключ</button>
                <button class="copy-button" onclick="copyToClipboard('${courseLinks[i] || 'Ссылка на ассессмент'}')">Копировать текст</button>
            </div>
        `;
    }

    const keysContainer = document.getElementById('generated-keys');
    keysContainer.querySelector('.keys').innerHTML = keysHtml;
    keysContainer.classList.remove('hidden');
}

function generateReviewKeys() {
    const professionSlug = document.getElementById('profession-slug').value.trim();
    const formattedSlug = formatSlug(professionSlug);

    const keys = [
        { key: `reviewStatus.${formattedSlug}.title`, text: 'Статус ревью: Заголовок' },
        { key: `reviewStatus.${formattedSlug}.description`, text: 'Статус ревью: Описание' },
    ];

    const keysHtml = keys.map(item => `
        <div class="key-row">
            <input type="text" readonly value="${item.key}" />
            <input type="text" readonly value="${item.text}" />
            <button class="copy-button" onclick="copyToClipboard('${item.key}')">Копировать ключ</button>
            <button class="copy-button" onclick="copyToClipboard('${item.text}')">Копировать текст</button>
        </div>
    `).join('');

    const keysContainer = document.getElementById('generated-keys');
    keysContainer.querySelector('.keys').innerHTML = keysHtml;
    keysContainer.classList.remove('hidden');
}

function generateCharacterKeys() {
    const characterTag = document.getElementById('character-tag').value.trim();
    const characterName = document.getElementById('character-name').value.trim();
    const characterAvatar = document.getElementById('character-avatar').value.trim();

    const keys = [
        { key: `dialog.characters.${characterTag}.name`, text: characterName },
        { key: `dialog.characters.${characterTag}.avatar`, text: characterAvatar },
    ];

    const keysHtml = keys.map(item => `
        <div class="key-row">
            <input type="text" readonly value="${item.key}" />
            <input type="text" readonly value="${item.text}" />
            <button class="copy-button" onclick="copyToClipboard('${item.key}')">Копировать ключ</button>
            <button class="copy-button" onclick="copyToClipboard('${item.text}')">Копировать текст</button>
        </div>
    `).join('');

    const keysContainer = document.getElementById('generated-keys');
    keysContainer.querySelector('.keys').innerHTML = keysHtml;
    keysContainer.classList.remove('hidden');
}

function generateTestResultsOpenEntranceKeys() {
    const professionSlug = document.getElementById('test-results-open-entrance-profession-slug').value.trim();
    const formattedSlug = formatSlug(professionSlug);

    const keys = [
        { key: `testResults.${formattedSlug}.openEntrance`, text: 'Ключ для открытия входного результата' }
    ];

    const keysHtml = keys.map(item => `
        <div class="key-row">
            <input type="text" readonly value="${item.key}" />
            <input type="text" readonly value="${item.text}" />
            <button class="copy-button" onclick="copyToClipboard('${item.key}')">Копировать ключ</button>
            <button class="copy-button" onclick="copyToClipboard('${item.text}')">Копировать текст</button>
        </div>
    `).join('');

    const keysContainer = document.getElementById('generated-keys');
    keysContainer.querySelector('.keys').innerHTML = keysHtml;
    keysContainer.classList.remove('hidden');
}

function generateTestResultsOpenExitKeys() {
    const professionSlug = document.getElementById('test-results-open-exit-profession-slug').value.trim();
    const formattedSlug = formatSlug(professionSlug);

    const keys = [
        { key: `testResults.${formattedSlug}.openExit`, text: 'Ключ для открытия выходного результата' }
    ];

    const keysHtml = keys.map(item => `
        <div class="key-row">
            <input type="text" readonly value="${item.key}" />
            <input type="text" readonly value="${item.text}" />
            <button class="copy-button" onclick="copyToClipboard('${item.key}')">Копировать ключ</button>
            <button class="copy-button" onclick="copyToClipboard('${item.text}')">Копировать текст</button>
        </div>
    `).join('');

    const keysContainer = document.getElementById('generated-keys');
    keysContainer.querySelector('.keys').innerHTML = keysHtml;
    keysContainer.classList.remove('hidden');
}

function generateTestResultsDisplayEntranceKeys() {
    const professionSlug = document.getElementById('test-results-display-entrance-profession-slug').value.trim();
    const formattedSlug = formatSlug(professionSlug);

    const keys = [
        { key: `testResults.${formattedSlug}.displayEntrance`, text: 'Ключ для вывода входного результата' }
    ];

    const keysHtml = keys.map(item => `
        <div class="key-row">
            <input type="text" readonly value="${item.key}" />
            <input type="text" readonly value="${item.text}" />
            <button class="copy-button" onclick="copyToClipboard('${item.key}')">Копировать ключ</button>
            <button class="copy-button" onclick="copyToClipboard('${item.text}')">Копировать текст</button>
        </div>
    `).join('');

    const keysContainer = document.getElementById('generated-keys');
    keysContainer.querySelector('.keys').innerHTML = keysHtml;
    keysContainer.classList.remove('hidden');
}

function generateTestResultsDisplayExitKeys() {
    const professionSlug = document.getElementById('test-results-display-exit-profession-slug').value.trim();
    const formattedSlug = formatSlug(professionSlug);

    const keys = [
        { key: `testResults.${formattedSlug}.displayExit`, text: 'Ключ для вывода выходного результата' }
    ];

    const keysHtml = keys.map(item => `
        <div class="key-row">
            <input type="text" readonly value="${item.key}" />
            <input type="text" readonly value="${item.text}" />
            <button class="copy-button" onclick="copyToClipboard('${item.key}')">Копировать ключ</button>
            <button class="copy-button" onclick="copyToClipboard('${item.text}')">Копировать текст</button>
        </div>
    `).join('');

    const keysContainer = document.getElementById('generated-keys');
    keysContainer.querySelector('.keys').innerHTML = keysHtml;
    keysContainer.classList.remove('hidden');
}

function generatePopupKeys() {
    const slugInput = document.getElementById('popup-course-slug').value.trim();
    const formattedSlug = formatSlug(slugInput);
    
    const keysContainer = document.getElementById('generated-popup-keys');
    keysContainer.classList.remove('hidden');

    const keys = [
        { key: `commonGreetingPopup.${formattedSlug}.title`, text: 'Заголовок' },
        { key: `commonGreetingPopup.${formattedSlug}.description`, text: 'Описание' },
        { key: `commonGreetingPopup.${formattedSlug}.closeButton`, text: 'Закрывающая кнопка' },
        { key: `commonGreetingPopup.${formattedSlug}.mainButton`, text: 'Кнопка для перехода' }
    ];

    const keysHtml = keys.map(item => `
        <div class="key-row">
            <input type="text" readonly value="${item.key}" />
            <input type="text" readonly value="${item.text}" />
            <button class="copy-button" onclick="copyToClipboard('${item.key}')">Копировать ключ</button>
            <button class="copy-button" onclick="copyToClipboard('${item.text}')">Копировать текст</button>
        </div>
    `).join('');

    keysContainer.querySelector('.keys').innerHTML = keysHtml;
}

function formatSlug(slug) {
    return slug.split('-').map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Скопировано в буфер обмена');
    });
}
