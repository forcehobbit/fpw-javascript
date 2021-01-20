import {Observable} from "../../../util/observable.js";

export const Student = ({firstname, lastname}) => {
    return {
        firstname: Observable(firstname),
        lastname: Observable(lastname)
    }
}
