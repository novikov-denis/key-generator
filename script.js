function showAssessmentFields() {
    document.getElementById('assessment-fields').classList.remove('hidden');
}

function generateKeys() {
    const courseSlug = document.getElementById('course-slug').value;
    const moduleCount = parseInt(document.getElementById('module-count').value);
    const courseLinks = document.getElementById('course-links').value.split('\n');
    const moduleNames = document.getElementById('module-names').value.split('\n');

    const keyContainer = document.getElementById('generated-keys');
    const keysDiv = keyContainer.querySelector('.keys');
    keysDiv.innerHTML = '';

    courseLinks.forEach(link => {
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

        keys.forEach((key, index) => {
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

            const description = document.createElement('div');
            description.textContent = generateDescription(index, courseSlug, lessonId, moduleNames);

            keyRow.appendChild(description);
            keysDiv.appendChild(keyRow);
        });
    });

    keyContainer.classList.remove('hidden');
}

function extractLessonId(link) {
    const regex = /lessons\/([a-z0-9-]+)\//;
    const match = link.match(regex);
    return match ? match[1] : '';
}

function generateDescription(index, courseSlug, lessonId, moduleNames) {
    switch (index) {
        case 0:
        case 1:
            return `https://practicum.yandex.ru/trainer/${courseSlug}/lesson/${lessonId}`;
        case 2:
            return `Лучше подтянуть: ${moduleNames[0]}`;
        case 3:
            return `Точно стоит подтянуть: ${moduleNames[0]}`;
        case 4:
        case 5:
            return `https://pictures.s3.yandex.net/resources/module_1_1703234174.svg`;
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

    showNotification();
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 2000);
}
