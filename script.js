function showAssessmentFields() {
    document.getElementById('assessment-fields').classList.remove('hidden');
    document.getElementById('review-status-fields').classList.add('hidden');
}

function showReviewStatusFields() {
    document.getElementById('review-status-fields').classList.remove('hidden');
    document.getElementById('assessment-fields').classList.add('hidden');
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

    const key = `reviewStatus.${professionSlug}.reviewSLA`;
    const description = 'В танкере укажите кол-во часов для проверки работы';

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
