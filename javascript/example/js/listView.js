import {createElement, setInnerText} from './utils.js';
import {listController, selectionController} from './controller.js';
import {SPAN, UL} from './elementTypes.js';
import {ADD, DELETE} from './actions.js';

/**
 * @returns UnorderedList
 * @constructor
 */
const UnorderedList = () => {
    let hasList = false;
    const ul = createElement(UL)(['list-group']);

    const deselectChildren = () => {
        Array.from(ul.children).forEach(li => {
            li.classList.remove('active');
            li.removeAttribute('aria-current');
        });
    }

    const removeElementById = (id) => {
        const li = Array.from(ul.children).find(li => li.id === id);
        ul.removeChild(li);
    }

    /**
     * @typedef {{
     *     ul: Element,
     *     hasList: boolean,
     *     deselectChildren: (function(): void)
     *     removeElementById: (function(string): void)
     * }} UnorderedList
     */
    return {
        ul,
        hasList,
        deselectChildren,
        removeElementById
    }
}
const unorderedList = UnorderedList();

/**
 * @param {Element} li
 * @param {Student} model
 * @returns {function(): void}
 */
const selectModel = (li, model) => () => {
    selectionController.setSelectedModel(model);
    unorderedList.deselectChildren();
    li.classList.add('active');
    li.setAttribute('aria-current', 'true');
}

/**
 * @param {Element} root
 * @param {Student} model
 */
const handleAdd = (root, model) => {
    if (!unorderedList.hasList) {
        root.appendChild(unorderedList.ul);
        unorderedList.hasList = true;
    }

    const li = createElement(SPAN)(['list-group-item']);

    const firstNameSpan = createElement(SPAN)();
    const lastNameSpan = createElement(SPAN)();
    model.firstname.onChange(firstname => setInnerText(firstNameSpan)(firstname + ' '));
    model.lastname.onChange(setInnerText(lastNameSpan));
    li.id = model.id;
    li.appendChild(firstNameSpan);
    li.appendChild(lastNameSpan);
    li.onclick = selectModel(li, model);

    unorderedList.ul.appendChild(li);
}

/**
 * @param {Student} model
 */
const handleDelete = (model) => {
    unorderedList.removeElementById(model.id);
}

/**
 * @param {string} action
 * @param {Element} root
 * @param {Student} model
 */
const listProjector = (action, root, model) => {
    switch (action) {
        case ADD:
            handleAdd(root, model);
            break;
        case DELETE:
            handleDelete(model);
            break;
    }
}

/**
 * @param {Element} root
 * @constructor
 */
const ListView = (root) => {
    const render = (action) => (model) => listProjector(action, root, model);
    listController.onStudentsAdd(render(ADD));
    listController.onStudentsDel(render(DELETE));
}

export default ListView;
