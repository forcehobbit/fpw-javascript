import studentController from "./students.js";
import {createElement, setInnerText} from "./utils.js";
import {SPAN, UL} from "./element-types.js";

const ListController = () => {
    const listElements = [];

    const deselectElement = (entry) => {
        entry.classList.remove('active');
        entry.removeAttribute('aria-current');
    }

    return Object.freeze({
        listElements,
        deselectElements: () => listElements.forEach(deselectElement)
    })
}
const listController = ListController();

const selectLi = (li) => () => {
    listController.deselectElements()
    li.classList.add('active');
    li.setAttribute('aria-current', 'true');
}

const addStudentHandler = (ul) => (student) => {
    const li = createElement(SPAN)(['list-group-item']);

    const firstNameSpan = createElement(SPAN)();
    const lastNameSpan = createElement(SPAN)();
    student.firstname.onChange(firstname => setInnerText(firstNameSpan)(firstname + ' '));
    student.lastname.onChange(setInnerText(lastNameSpan));
    li.appendChild(firstNameSpan);
    li.appendChild(lastNameSpan);
    li.onclick = selectLi(li);

    ul.appendChild(li);
    listController.listElements.push(li);
}

/**
 * @param {Element} root
 */
const ListView = (root) => {
    const ul = createElement(UL)(['list-group']);
    studentController.students.onAdd(addStudentHandler(ul))

    root.appendChild(ul);
}

export default ListView;
