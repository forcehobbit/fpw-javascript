export const setInnerText = (element) => (text) => {
    element.innerText = text;
}

export const setInnerHtml = (element) => (html) => {
    element.innerHTML = html;
}

export const createElement = (type) => (classes) => {
    const element = document.createElement(type);

    if (classes && classes.length) {
        element.classList.add(classes);
    }

    return element;
}
