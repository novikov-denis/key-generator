function hideAllSections() {
    document.getElementById('assessment-fields').classList.add('hidden');
    document.getElementById('popup-fields').classList.add('hidden');
    document.getElementById('review-status-fields').classList.add('hidden');
    document.getElementById('characters-fields').classList.add('hidden');
    document.getElementById('test-results-fields').classList.add('hidden');
    document.getElementById('goshan-fields').classList.add('hidden');
}

function showAssessmentFields() {
    hideAllSections();
    document.getElementById('assessment-fields').classList.remove('hidden');
}

function showPopupFields() {
    hideAllSections();
    document.getElementById('popup-fields').classList.remove('hidden');
}

function showReviewStatusFields() {
    hideAllSections();
    document.getElementById('review-status-fields').classList.remove('hidden');
}

function showCharactersFields() {
    hideAllSections();
    document.getElementById('characters-fields').classList.remove('hidden');
}

function showTestResultsFields() {
    hideAllSections();
    document.getElementById('test-results-fields').classList.remove('hidden');
}

function showGoshanFields() {
    hideAllSections();
    document.getElementById('goshan-fields').classList.remove('hidden');
}

function transformCourseSlug(slug) {
    return slug.split('-').map((word, index) => {
        return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
}

// Генерация ключей для Попапа
function generatePopupKeys() {
    const courseSlugInput = document.getElementById('course-slug-popup').value;
    const errorMessage = 'Не заполнены все поля 👀';
    const keyContainer = document.getElementById('popup-generated-keys');
    const keysDiv = keyContainer.querySelector('.keys');
    keysDiv.innerHTML = '';

    if (!courseSlugInput) {
        showNotification(errorMessage, true);
        return;
    }

    const courseSlug = transformCourseSlug(courseSlugInput);

    const popupKeys = [
        { key: `commonGreetingPopup.${courseSlug}.title`, text: 'Заголовок' },
        { key: `commonGreetingPopup.${courseSlug}.description`, text: 'Описание' },
        { key: `commonGreetingPopup.${courseSlug}.closeButton`, text: 'Кнопка (В другой раз)' },
        { key: `commonGreetingPopup.${courseSlug}.mainButton`, text: 'Кнопка действия' }
    ];

    popupKeys.forEach(({ key, text }) => {
        const keyRow = document.createElement('div');
        keyRow.classList.add('key-row');

        const keyField = document.createElement('input');
        keyField.type = 'text';
        keyField.value = key;
        keyField.readOnly = true;

        const copyKeyButton = document.createElement('button');
        copyKeyButton.classList.add('copy-button');
        copyKeyButton.textContent = 'Скопировать ключ';
        copyKeyButton.onclick = () => copyToClipboard(key);

        const descriptionField = document.createElement('input');
        descriptionField.type = 'text';
        descriptionField.value = text;
        descriptionField.readOnly = true;

        const copyTextButton = document.createElement('button');
        copyTextButton.classList.add('copy-text-button');
        copyTextButton.textContent = 'Скопировать текст';
        copyTextButton.onclick = () => {
            copyToClipboard(text);
            showNotification('Текст успешно скопирован в буфер обмена');
        };

        keyRow.appendChild(keyField);
        keyRow.appendChild(copyKeyButton);
        keyRow.appendChild(descriptionField);
        keyRow.appendChild(copyTextButton);

        keysDiv.appendChild(keyRow);
    });

    keyContainer.classList.remove('hidden');
}

// Генерация ключей для Ассессментов
function generateKeys() {
    const courseSlug = document.getElementById('course-slug').value;
    const moduleCount = parseInt(document.getElementById('module-count').value);
    const courseLinks = document.getElementById('course-links').value.split('\n');
    const moduleNames = document.getElementById('module-names').value.split('\n');

    const keyContainer = document.getElementById('assessment-generated-keys');
    const keysDiv = keyContainer.querySelector('.keys');
    keysDiv.innerHTML = '';

    if (!courseSlug || !moduleCount || courseLinks.length === 0 || moduleNames.length === 0) {
        showNotification('Пожалуйста, заполните все поля.', true);
        return;
    }

    courseLinks.forEach((link, index) => {
        const lessonId = extractLessonId(link);

        // Добавляем подзаголовок с названием модуля
        const moduleTitle = document.createElement('h3');
        moduleTitle.textContent = `Модуль: ${moduleNames[index]}`;
        keysDiv.appendChild(moduleTitle);

        const keys = [
            `assessmentsFeedback.assessment.${lessonId}.grade.average.recommendationCard.1.link`,
            `assessmentsFeedback.assessment.${lessonId}.grade.low.recommendationCard.1.link`,
            `assessmentsFeedback.assessment.${lessonId}.grade.average.recommendationCard.1.title`,
            `assessmentsFeedback.assessment.${lessonId}.grade.low.recommendationCard.1.title`,
            `assessmentsFeedback.assessment.${lessonId}.grade.average.recommendationCard.1.pictureUrl`,
            `assessmentsFeedback.assessment.${lessonId}.grade.low.recommendationCard.1.pictureUrl`,
            `assessmentsFeedback.assessment.${lessonId}.grade.average.recommendationCards.count`,
            `assessmentsFeedback.assessment.${lessonId}.grade.low.recommendationCards.count`
        ];

        keys.forEach((key, keyIndex) => {
            const keyRow = document.createElement('div');
            keyRow.classList.add('key-row');

            const keyField = document.createElement('input');
            keyField.type = 'text';
            keyField.value = key;
            keyField.readOnly = true;

            const copyButton = document.createElement('button');
            copyButton.classList.add('copy-button');
            copyButton.textContent = 'Скопировать ключ';
            copyButton.onclick = () => copyToClipboard(key);

            const description = document.createElement('input');
            description.type = 'text';
            description.value = generateDescription(keyIndex, courseSlug, moduleNames[index], index + 1);
            description.readOnly = true;

            const copyTextButton = document.createElement('button');
            copyTextButton.classList.add('copy-text-button');
            copyTextButton.textContent = 'Скопировать текст ключа';
            copyTextButton.onclick = () => {
                copyToClipboard(description.value);
                showNotification('Текст ключа успешно скопирован в буфер обмена');
            };

            keyRow.appendChild(keyField);
            keyRow.appendChild(copyButton);
            keyRow.appendChild(description);
            keyRow.appendChild(copyTextButton);

            keysDiv.appendChild(keyRow);
        });
    });

    keyContainer.classList.remove('hidden');
}

// Генерация ключей для Статусов ревью
function generateReviewKeys() {
    const professionSlug = document.getElementById('profession-slug').value;
    const keyContainer = document.getElementById('review-generated-keys');
    const keysDiv = keyContainer.querySelector('.keys');
    keysDiv.innerHTML = '';

    if (!professionSlug) {
        showNotification('Пожалуйста, введите слаг профессии.', true);
        return;
    }

    const reviewKeys = [
        { key: `proficiency.review.status.${professionSlug}.taskWaitsReview`, description: 'Задание ожидает проверки.' },
        { key: `proficiency.review.status.${professionSlug}.reviewInProcess`, description: 'Задание на проверке.' },
        { key: `proficiency.review.status.${professionSlug}.testsPassed`, description: 'Тесты пройдены, ожидается ревью.' }
    ];

    reviewKeys.forEach(({ key, description }) => {
        const keyRow = document.createElement('div');
        keyRow.classList.add('key-row');

        const keyField = document.createElement('input');
        keyField.type = 'text';
        keyField.value = key;
        keyField.readOnly = true;

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Скопировать ключ';
        copyButton.onclick = () => copyToClipboard(key);

        const descriptionField = document.createElement('input');
        descriptionField.type = 'text';
        descriptionField.value = description;
        descriptionField.readOnly = true;

        const copyTextButton = document.createElement('button');
        copyTextButton.classList.add('copy-text-button');
        copyTextButton.textContent = 'Скопировать текст';
        copyTextButton.onclick = () => {
            copyToClipboard(description);
            showNotification('Текст успешно скопирован в буфер обмена');
        };

        keyRow.appendChild(keyField);
        keyRow.appendChild(copyButton);
        keyRow.appendChild(descriptionField);
        keyRow.appendChild(copyTextButton);

        keysDiv.appendChild(keyRow);
    });

    keyContainer.classList.remove('hidden');
}

// Генерация ключей для Персонажей
function generateCharacterKeys() {
    const characterTag = document.getElementById('character-tag').value;
    const characterName = document.getElementById('character-name').value;
    const characterAvatar = document.getElementById('character-avatar').value;

    const keyContainer = document.getElementById('characters-generated-keys');
    const keysDiv = keyContainer.querySelector('.keys');
    keysDiv.innerHTML = '';

    if (!characterTag || !characterName || !characterAvatar) {
        showNotification('Пожалуйста, заполните все поля.', true);
        return;
    }

    const characterKeys = [
        { key: `dialog.characters.${characterTag}.name`, description: characterName },
        { key: `dialog.characters.${characterTag}.avatar`, description: characterAvatar }
    ];

    characterKeys.forEach(({ key, description }) => {
        const keyRow = document.createElement('div');
        keyRow.classList.add('key-row');

        const keyField = document.createElement('input');
        keyField.type = 'text';
        keyField.value = key;
        keyField.readOnly = true;

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Скопировать ключ';
        copyButton.onclick = () => copyToClipboard(key);

        const descriptionField = document.createElement('input');
        descriptionField.type = 'text';
        descriptionField.value = description;
        descriptionField.readOnly = true;

        const copyTextButton = document.createElement('button');
        copyTextButton.classList.add('copy-text-button');
        copyTextButton.textContent = 'Скопировать текст';
        copyTextButton.onclick = () => {
            copyToClipboard(description);
            showNotification('Текст ключа успешно скопирован в буфер обмена');
        };

        keyRow.appendChild(keyField);
        keyRow.appendChild(copyButton);
        keyRow.appendChild(descriptionField);
        keyRow.appendChild(copyTextButton);

        keysDiv.appendChild(keyRow);
    });

    keyContainer.classList.remove('hidden');
}

// Генерация ключей для Результатов тестов
function showTestResultsOptions() {
    const selectedOption = document.getElementById('test-results-type').value;
    const testResultsImage = document.getElementById('test-results-image');
    document.getElementById('test-results-open-entrance-fields').classList.add('hidden');
    document.getElementById('test-results-open-exit-fields').classList.add('hidden');
    document.getElementById('test-results-display-entrance-fields').classList.add('hidden');
    document.getElementById('test-results-display-exit-fields').classList.add('hidden');
    testResultsImage.classList.add('hidden');

    if (selectedOption === 'open-entrance') {
        testResultsImage.src = 'test_enter.png';
        testResultsImage.classList.remove('hidden');
        document.getElementById('test-results-open-entrance-fields').classList.remove('hidden');
    } else if (selectedOption === 'open-exit') {
        testResultsImage.src = 'test_exit.png';
        testResultsImage.classList.remove('hidden');
        document.getElementById('test-results-open-exit-fields').classList.remove('hidden');
    } else if (selectedOption === 'display-entrance') {
        testResultsImage.src = 'enter.png';
        testResultsImage.classList.remove('hidden');
        document.getElementById('test-results-display-entrance-fields').classList.remove('hidden');
    } else if (selectedOption === 'display-exit') {
        testResultsImage.src = 'exit.png';
        testResultsImage.classList.remove('hidden');
        document.getElementById('test-results-display-exit-fields').classList.remove('hidden');
    }
}

function generateTestResultsOpenEntranceKeys() {
    const professionSlug = document.getElementById('test-results-open-entrance-profession-slug').value;
    const keyContainer = document.getElementById('test-results-generated-keys');
    const keysDiv = keyContainer.querySelector('.keys');
    keysDiv.innerHTML = '';

    if (!professionSlug) {
        showNotification('Пожалуйста, введите слаг профессии.', true);
        return;
    }

    const buttonKeys = [
        {
            key: `assessmentsFeedback.resultsCard.${professionSlug}.title`,
            description: `В начале курса мы дали вам рекомендации после теста`
        },
        {
            key: `assessmentsFeedback.resultsCard.${professionSlug}.text`,
            description: `Мы проанализировали их и составили рекомендации — так проще понять, где можно немного расслабиться, а какие навыки нужно подтянуть`
        },
        {
            key: `assessmentsFeedback.resultsCard.${professionSlug}.openFeedbackButtonText`,
            description: `Покажите, что там`
        },
        {
            key: `assessmentsFeedback.resultsCard.${professionSlug}.pictureUrl`,
            description: `https://code.s3.yandex.net/Assessments/entrance-assessments-feedback-card-picture.png`
        }
    ];

    keysDiv.appendChild(document.createTextNode('🔑 Сгенерированные ключи для открытия входного результата:'));

    buttonKeys.forEach(({ key, description }) => {
        const keyRow = document.createElement('div');
        keyRow.classList.add('key-row');

        const keyField = document.createElement('input');
        keyField.type = 'text';
        keyField.value = key;
        keyField.readOnly = true;

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Скопировать ключ';
        copyButton.onclick = () => copyToClipboard(key);

        const descriptionField = document.createElement('input');
        descriptionField.type = 'text';
        descriptionField.value = description;
        descriptionField.readOnly = true;

        const copyTextButton = document.createElement('button');
        copyTextButton.classList.add('copy-text-button');
        copyTextButton.textContent = 'Скопировать текст ключа';
        copyTextButton.onclick = () => {
            copyToClipboard(description);
            showNotification('Текст ключа успешно скопирован в буфер обмена');
        };

        keyRow.appendChild(keyField);
        keyRow.appendChild(copyButton);
        keyRow.appendChild(descriptionField);
        keyRow.appendChild(copyTextButton);

        keysDiv.appendChild(keyRow);
    });

    keyContainer.classList.remove('hidden');
}

function generateTestResultsOpenExitKeys() {
    const professionSlug = document.getElementById('test-results-open-exit-profession-slug').value;
    const keyContainer = document.getElementById('test-results-generated-keys');
    const keysDiv = keyContainer.querySelector('.keys');
    keysDiv.innerHTML = '';

    if (!professionSlug) {
        showNotification('Пожалуйста, введите слаг профессии.', true);
        return;
    }

    const buttonKeys = [
        {
            key: `exitAssessmentsFeedback.resultsCard.${professionSlug}.title`,
            description: `Результаты итогового теста`
        },
        {
            key: `exitAssessmentsFeedback.resultsCard.${professionSlug}.text`,
            description: `Выходной тест помогает узнать уровень ваших знаний по программе. По результатам теста мы вышлем вам сертификат о подтверждении владения навыком или предложим повторить модули.`
        },
        {
            key: `exitAssessmentsFeedback.resultsCard.${professionSlug}.openFeedbackButtonText`,
            description: `Узнать результаты`
        },
        {
            key: `exitAssessmentsFeedback.resultsCard.${professionSlug}.pictureUrl`,
            description: `https://code.s3.yandex.net/Assessments/results-card-picture.png`
        }
    ];

    keysDiv.appendChild(document.createTextNode('🔑 Сгенерированные ключи для открытия выходного результата:'));

    buttonKeys.forEach(({ key, description }) => {
        const keyRow = document.createElement('div');
        keyRow.classList.add('key-row');

        const keyField = document.createElement('input');
        keyField.type = 'text';
        keyField.value = key;
        keyField.readOnly = true;

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Скопировать ключ';
        copyButton.onclick = () => copyToClipboard(key);

        const descriptionField = document.createElement('input');
        descriptionField.type = 'text';
        descriptionField.value = description;
        descriptionField.readOnly = true;

        const copyTextButton = document.createElement('button');
        copyTextButton.classList.add('copy-text-button');
        copyTextButton.textContent = 'Скопировать текст ключа';
        copyTextButton.onclick = () => {
            copyToClipboard(description);
            showNotification('Текст ключа успешно скопирован в буфер обмена');
        };

        keyRow.appendChild(keyField);
        keyRow.appendChild(copyButton);
        keyRow.appendChild(descriptionField);
        keyRow.appendChild(copyTextButton);

        keysDiv.appendChild(keyRow);
    });

    keyContainer.classList.remove('hidden');
}

function generateTestResultsDisplayEntranceKeys() {
    const professionSlug = document.getElementById('test-results-display-entrance-profession-slug').value;
    const keyContainer = document.getElementById('test-results-generated-keys');
    const keysDiv = keyContainer.querySelector('.keys');
    keysDiv.innerHTML = '';

    if (!professionSlug) {
        showNotification('Пожалуйста, введите слаг профессии.', true);
        return;
    }

    const resultKeys = [
        {
            key: `assessmentsFeedback.averageResult.grade.low.${professionSlug}.content.md`,
            description: `Текст от авторов обязательно прогоните в [Типографе](https://www.artlebedev.ru/typograf/)`
        },
        {
            key: `assessmentsFeedback.averageResult.grade.average.${professionSlug}.content.md`,
            description: `Текст от авторов обязательно прогоните в [Типографе](https://www.artlebedev.ru/typograf/)`
        },
        {
            key: `assessmentsFeedback.averageResult.grade.high.${professionSlug}.content.md`,
            description: `Текст от авторов обязательно прогоните в [Типографе](https://www.artlebedev.ru/typograf/)`
        }
    ];

    keysDiv.appendChild(document.createTextNode('🔑 Сгенерированные ключи для вывода входного результата:'));

    resultKeys.forEach(({ key, description }) => {
        const keyRow = document.createElement('div');
        keyRow.classList.add('key-row');

        const keyField = document.createElement('input');
        keyField.type = 'text';
        keyField.value = key;
        keyField.readOnly = true;

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Скопировать ключ';
        copyButton.onclick = () => copyToClipboard(key);

        const descriptionField = document.createElement('input');
        descriptionField.type = 'text';
        descriptionField.value = description;
        descriptionField.readOnly = true;

        const copyTextButton = document.createElement('button');
        copyTextButton.classList.add('copy-text-button');
        copyTextButton.textContent = 'Скопировать текст ключа';
        copyTextButton.onclick = () => {
            copyToClipboard(description);
            showNotification('Текст ключа успешно скопирован в буфер обмена');
        };

        keyRow.appendChild(keyField);
        keyRow.appendChild(copyButton);
        keyRow.appendChild(descriptionField);
        keyRow.appendChild(copyTextButton);

        keysDiv.appendChild(keyRow);
    });

    keyContainer.classList.remove('hidden');
}

function generateTestResultsDisplayExitKeys() {
    const professionSlug = document.getElementById('test-results-display-exit-profession-slug').value;
    const keyContainer = document.getElementById('test-results-generated-keys');
    const keysDiv = keyContainer.querySelector('.keys');
    keysDiv.innerHTML = '';

    if (!professionSlug) {
        showNotification('Пожалуйста, введите слаг профессии.', true);
        return;
    }

    const resultKeys = [
        {
            key: `exitAssessmentsFeedback.averageResult.grade.pass.${professionSlug}.content.md`,
            description: `Текст от авторов обязательно прогоните в [Типографе](https://www.artlebedev.ru/typograf/)`
        },
        {
            key: `exitAssessmentsFeedback.averageResult.grade.no_pass.${professionSlug}.content.md`,
            description: `Текст от авторов обязательно прогоните в [Типографе](https://www.artlebedev.ru/typograf/)`
        }
    ];

    keysDiv.appendChild(document.createTextNode('🔑 Сгенерированные ключи для вывода выходного результата:'));

    resultKeys.forEach(({ key, description }) => {
        const keyRow = document.createElement('div');
        keyRow.classList.add('key-row');

        const keyField = document.createElement('input');
        keyField.type = 'text';
        keyField.value = key;
        keyField.readOnly = true;

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Скопировать ключ';
        copyButton.onclick = () => copyToClipboard(key);

        const descriptionField = document.createElement('input');
        descriptionField.type = 'text';
        descriptionField.value = description;
        descriptionField.readOnly = true;

        const copyTextButton = document.createElement('button');
        copyTextButton.classList.add('copy-text-button');
        copyTextButton.textContent = 'Скопировать текст ключа';
        copyTextButton.onclick = () => {
            copyToClipboard(description);
            showNotification('Текст ключа успешно скопирован в буфер обмена');
        };

        keyRow.appendChild(keyField);
        keyRow.appendChild(copyButton);
        keyRow.appendChild(descriptionField);
        keyRow.appendChild(copyTextButton);

        keysDiv.appendChild(keyRow);
    });

    keyContainer.classList.remove('hidden');
}

// Обновление конфига Гошана
function setGoshanStatus(message, isError = false) {
    const status = document.getElementById('goshan-status');
    status.value = message;
    status.classList.toggle('status-error', isError);
    status.classList.toggle('status-success', !isError);
}

function parseGoshanJson(raw, fieldName) {
    try {
        return { value: JSON.parse(raw) };
    } catch (error) {
        return { error: `Поле «${fieldName}» — не валидный JSON: ${error.message}` };
    }
}

function updateGoshan() {
    const newDataRaw = document.getElementById('goshan-new-data').value.trim();
    const slugsRaw = document.getElementById('goshan-slugs').value.trim();
    const oldConfigRaw = document.getElementById('goshan-old-config').value.trim();
    const newConfigField = document.getElementById('goshan-new-config');
    newConfigField.value = '';

    if (!newDataRaw || !slugsRaw || !oldConfigRaw) {
        setGoshanStatus('Заполни все поля: новые данные, слаги курсов и текущий конфиг Гошана 👀', true);
        return;
    }

    const newData = parseGoshanJson(newDataRaw, 'Новые данные для обновления Гошана');
    if (newData.error) {
        setGoshanStatus(newData.error, true);
        return;
    }

    const oldConfig = parseGoshanJson(oldConfigRaw, 'Старый конфиг Гошана');
    if (oldConfig.error) {
        setGoshanStatus(oldConfig.error, true);
        return;
    }

    if (!newData.value || typeof newData.value !== 'object' || Array.isArray(newData.value)) {
        setGoshanStatus('Новые данные должны быть объектом в формате как на изображении сверху.', true);
        return;
    }

    if (!oldConfig.value || typeof oldConfig.value !== 'object') {
        setGoshanStatus('Старый конфиг должен быть объектом или массивом.', true);
        return;
    }

    const slugs = slugsRaw.split(/\s+/).filter(Boolean);
    const config = oldConfig.value;
    const updated = [];
    const added = [];

    if (Array.isArray(config)) {
        // Конфиг-массив: ищем запись курса по slug / courseSlug / course
        slugs.forEach((slug) => {
            const index = config.findIndex((item) => item && typeof item === 'object' &&
                (item.slug === slug || item.courseSlug === slug || item.course === slug));

            if (index === -1) {
                config.push(Object.assign({ slug: slug }, newData.value));
                added.push(slug);
            } else {
                config[index] = Object.assign({}, config[index], newData.value);
                updated.push(slug);
            }
        });
    } else {
        // Конфиг-объект: слаг курса — это ключ верхнего уровня
        slugs.forEach((slug) => {
            const existing = config[slug];
            const isObject = existing && typeof existing === 'object' && !Array.isArray(existing);

            if (Object.prototype.hasOwnProperty.call(config, slug)) {
                updated.push(slug);
            } else {
                added.push(slug);
            }

            config[slug] = isObject
                ? Object.assign({}, existing, newData.value)
                : Object.assign({}, newData.value);
        });
    }

    newConfigField.value = JSON.stringify(config, null, 4);

    const report = [`Готово, Гошан обновлён для ${slugs.length} курс(ов).`];
    if (updated.length) {
        report.push(`Обновлены: ${updated.join(', ')}.`);
    }
    if (added.length) {
        report.push(`Добавлены: ${added.join(', ')}.`);
    }
    report.push('Забирай новый конфиг справа.');
    setGoshanStatus(report.join(' '));
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    showNotification('Ключ успешно скопирован в буфер обмена');
}

function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove('hidden');
    notification.classList.toggle('error', isError);
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 2000);
}

function extractLessonId(link) {
    const regex = /lessons\/([a-z0-9-]+)\//;
    const match = link.match(regex);
    return match ? match[1] : '';
}

function generateDescription(index, courseSlug, moduleName, moduleIndex) {
    const moduleImages = [
        'https://pictures.s3.yandex.net/resources/module_1_1703234174.svg',
        'https://pictures.s3.yandex.net/resources/module_2_1703234182.svg',
        'https://pictures.s3.yandex.net/resources/module_3_1703234324.svg',
        'https://pictures.s3.yandex.net/resources/module_4_1703173151.svg',
        'https://pictures.s3.yandex.net/resources/module_5_1712064865.svg',
        'https://pictures.s3.yandex.net/resources/module_6_1712065452.svg',
        'https://pictures.s3.yandex.net/resources/module_7_1712057230.svg'
    ];

    switch (index) {
        case 0:
        case 1:
            return 'Вручную возьми ссылку из преста на урок, на которую должна вести рекомендация';
        case 2:
            return `Лучше подтянуть: ${moduleName}`;
        case 3:
            return `Точно стоит подтянуть: ${moduleName}`;
        case 4:
        case 5:
            return moduleImages[moduleIndex - 1];
        case 6:
        case 7:
            return '1';
        default:
            return '';
    }
}
