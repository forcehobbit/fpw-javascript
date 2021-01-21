/**
 * @param {Element} element
 * @returns {function(string): void}
 */
export const setInnerText = (element) => (text) => {
    element.innerText = text;
}

/**
 * @param {Element} element
 * @returns {function(string): void}
 */
export const setInnerHtml = (element) => (html) => {
    element.innerHTML = html;
}

/**
 * @param {string} type
 * @returns {function(string[]): Element}
 */
export const createElement = (type) => (classes) => {
    const element = document.createElement(type);

    if (classes && classes.length) {
        element.classList.add(...classes);
    }

    return element;
}
