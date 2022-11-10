export function changePageTitle(page_title) {
    document.getElementById('page-title').textContent = page_title;
    document.title = page_title;
}

export function addCSRF(objectData) {
    let CSRF = document.getElementsByName('csrf-token')[0].getAttribute('content');
    if (CSRF !== undefined && CSRF !== "") {
        objectData._token = CSRF;
        return objectData;
    }
}

function isIE11() {
    let ua = window.navigator.userAgent;
    return ua.indexOf('Trident/') > 0;
}

export let isIE11browser = isIE11();


