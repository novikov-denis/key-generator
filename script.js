function showAssessmentFields() {
    document.getElementById('assessment-fields').classList.remove('hidden');
    document.getElementById('review-status-fields').classList.add('hidden');
    document.getElementById('characters-fields').classList.add('hidden');
    document.getElementById('test-results-fields').classList.add('hidden');
}

function showReviewStatusFields() {
    document.getElementById('review-status-fields').classList.remove('hidden');
    document.getElementById('assessment-fields').classList.add('hidden');
    document.getElementById('characters-fields').classList.add('hidden');
    document.getElementById('test-results-fields').classList.add('hidden');
}

function showCharactersFields() {
    document.getElementById('characters-fields').classList.remove('hidden');
    document.getElementById('assessment-fields').classList.add('hidden');
    document.getElementById('review-status-fields').classList.add('hidden');
    document.getElementById('test-results-fields').classList.add('hidden');
}

function showTestResultsFields() {
    document.getElementById('test-results-fields').classList.remove('hidden');
    document.getElementById('assessment-fields').classList.add('hidden');
    document.getElementById('review-status-fields').classList.add('hidden');
    document.getElementById('characters-fields').classList.add('hidden');
}

function showTestResultsOptions() {
    const selectedOption = document.getElementById('test-results-type').value;
    document.getElementById('test-results-open-entrance-fields').classList.add('hidden');
    document.getElementById('test-results-open-exit-fields').classList.add('hidden');
    document.getElementById('test-results-display-entrance-fields').classList.add('hidden');
    document.getElementById('test-results-display-exit-fields').classList.add('hidden');

    if (selectedOption === 'open-entrance') {
        document.getElementById('test-results-open-entrance-fields').classList.remove('hidden');
    } else if (selectedOption === 'open-exit') {
        document.getElementById('test-results-open-exit-fields').classList.remove('hidden');
    } else if (selectedOption === 'display-entrance') {
        document.getElementById('test-results-display-entrance-fields').classList.remove('hidden');
    } else if (selectedOption === 'display-exit') {
        document.getElementById('test-results-display-exit-fields').classList.remove('hidden');
    }
}

function showNotAvailable() {
    showNotification('Функция пока не доступна. В следующих обновлениях появится 😎', true);
}

function generateKeys() {
    const courseSlug = document.getElementById('course-slug').value;
    const moduleCount = parseInt(document.getElementById('module-count').value);
    const courseLinks = document.getElementById('course-links').value.split('\n');
    const moduleNames = document.getElementById('module-names').value.split('\n');

    const keyContainer = document.getElementById('generated-keys');
    const keysDiv = keyContainer.querySelector('.keys');
    keysDiv.innerHTML = '';

    if (!courseSlug || !moduleCount || courseLinks.length === 0 || moduleNames.length === 0) {
        showNotification('Пожалуйста, заполните все поля.', true);
        return;
    }

    courseLinks.forEach((link, index) => {
        const lessonId = extractLessonId(link);

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

function generateReviewKeys() {
    const professionSlug = document.getElementById('profession-slug').value;
    const keyContainer = document.getElementById('generated-keys');
    const keysDiv = keyContainer.querySelector('.keys');
    keysDiv.innerHTML = '';

    if (!professionSlug) {
        showNotification('Пожалуйста, введите слаг профессии.', true);
        return;
    }

    const reviewSLAKey = `reviewStatus.${professionSlug}.reviewSLA`;
    const reviewSLADescription = 'В танкере укажите кол-во часов для проверки работы';

    const reviewKeys = [
        {
            key: `proficiency.review.status.${professionSlug}.taskWaitsReview`,
            description: `Задание отправлено и ожидает проверки.<br>Обычно проверка задания занимает не более 24 часов.`
        },
        {
            key: `proficiency.review.status.${professionSlug}.reviewInProcess`,
            description: `Работа отправлена на ревью.<br>Проверка займёт не больше 24 часов. Если сутки прошли, а работа всё ещё не проверена, напишите куратору.`
        },
        {
            key: `proficiency.review.status.${professionSlug}.testsPassed`,
            description: `Тесты пройдены, и задание ожидает ревью.<br>Обычно проверка занимает не более 24 часов.`
        }
    ];

    // Create and append review SLA key and description
    const reviewSLARow = document.createElement('div');
    reviewSLARow.classList.add('key-row');

    const reviewSLAField = document.createElement('input');
    reviewSLAField.type = 'text';
    reviewSLAField.value = reviewSLAKey;
    reviewSLAField.readOnly = true;

    const copySLAButton = document.createElement('button');
    copySLAButton.classList.add('copy-button');
    copySLAButton.textContent = 'Скопировать ключ';
    copySLAButton.onclick = () => copyToClipboard(reviewSLAKey);

    const reviewSLADescriptionField = document.createElement('input');
    reviewSLADescriptionField.type = 'text';
    reviewSLADescriptionField.value = reviewSLADescription;
    reviewSLADescriptionField.readOnly = true;

    const copySLADescriptionButton = document.createElement('button');
    copySLADescriptionButton.classList.add('copy-text-button');
    copySLADescriptionButton.textContent = 'Скопировать текст ключа';
    copySLADescriptionButton.onclick = () => {
        copyToClipboard(reviewSLADescription);
        showNotification('Текст ключа успешно скопирован в буфер обмена');
    };

    reviewSLARow.appendChild(reviewSLAField);
    reviewSLARow.appendChild(copySLAButton);
    reviewSLARow.appendChild(reviewSLADescriptionField);
    reviewSLARow.appendChild(copySLADescriptionButton);

    keysDiv.appendChild(document.createTextNode('🔑 Ключ, который меняет только количество часов ревью:'));
    keysDiv.appendChild(reviewSLARow);

    // Create and append review text keys and descriptions
    keysDiv.appendChild(document.createTextNode('🔑 Ключи, которые меняют текст при ревью:'));
    keysDiv.appendChild(document.createTextNode('Если вам нужно настроить текст с SLA для всех работ профессии:'));

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

function generateCharacterKeys() {
    const characterTag = document.getElementById('character-tag').value;
    const characterName = document.getElementById('character-name').value;
    const characterAvatar = document.getElementById('character-avatar').value;

    const keyContainer = document.getElementById('generated-keys');
    const keysDiv = keyContainer.querySelector('.keys');
    keysDiv.innerHTML = '';

    if (!characterTag || !characterName || !characterAvatar) {
        showNotification('Пожалуйста, заполните все поля.', true);
        return;
    }

    const characterKeys = [
        {
            key: `dialog.characters.${characterTag}.name`,
            description: characterName
        },
        {
            key: `dialog.characters.${characterTag}.avatar`,
            description: characterAvatar
        }
    ];

    keysDiv.appendChild(document.createTextNode('🔑 Сгенерированные ключи персонажей:'));

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

function generateTestResultsOpenEntranceKeys() {
    const professionSlug = document.getElementById('test-results-open-entrance-profession-slug').value;
    const keyContainer = document.getElementById('generated-keys');
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
    const keyContainer = document.getElementById('generated-keys');
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
    const keyContainer = document.getElementById('generated-keys');
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
    const keyContainer = document.getElementById('generated-keys');
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
