import ListView from "./list-view.js";
import DetailView from "./detail-view.js";

const masterRoot = document.querySelector('#master');
const detailRoot = document.querySelector('#detail');

ListView(masterRoot);
DetailView(detailRoot);
