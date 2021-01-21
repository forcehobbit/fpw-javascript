import {listController, selectionController} from './controller.js';

/**
 * @param {Student} model
 * @returns Card
 */
const Card = (model) => {
    const template = document.createElement('DIV');
    const fullName = `${model.firstname.getValue()} ${model.lastname.getValue()}`;

    template.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${model.imageUrl}" class="card-img-top" alt="${fullName}">
        <div class="card-body">
            <h5 class="card-title">${fullName}</h5>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi enim esse ipsa optio sunt voluptatum.</p>
            <a href="#" class="btn btn-primary">Delete</a>
        </div>
    </div>
    `

    const [cardWrapper] = template.children;
    const [image, cardBody] = cardWrapper.children;
    const [title, cardText, deleteButton] = cardBody.children;

    /**
     * @typedef {{
     *     cardWrapper: Element
     *     image: Element
     *     cardBody: Element
     *     title: Element
     *     cardText: Element
     *     deleteButton: Element
     * }} Card
     */
    return {
        cardWrapper,
        image,
        cardBody,
        title,
        cardText,
        deleteButton,
    }
}

/**
 * @param {Element} root
 * @param {Student} model
 */
const detailProjector = (root, model) => {
    root.innerHTML = '';

    if (model) {
        const card = Card(model);
        root.appendChild(card.cardWrapper);

        card.deleteButton.onclick = () => {
            listController.delStudent(model);
        }
    }
}

/**
 * @param {Element} root
 * @constructor
 */
const DetailView = (root) => {
    const render = model => detailProjector(root, model);
    selectionController.onModelSelected(render);
    listController.onStudentsDel(() => {
        selectionController.setSelectedModel(undefined);
    })
}

export default DetailView;
