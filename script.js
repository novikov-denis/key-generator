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

    const reviewSLAKey = `reviewStatus.${professionSlug}.reviewSLA`;
    const reviewSLADescription = 'В танкере укажите кол-во часов для проверки работы';

    const reviewKeys = [
        `proficiency.review.status.${professionSlug}.taskWaitsReview`,
        `proficiency.review.status.${professionSlug}.reviewInProcess`,
        `proficiency.review.status.${professionSlug}.testsPassed`
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

    reviewKeys.forEach((key) => {
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

        keyRow.appendChild(keyField);
        keyRow.appendChild(copyButton);

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
