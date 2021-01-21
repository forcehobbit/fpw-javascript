import {Student} from './student.js';
import {Observable, ObservableList} from '../../../util/observable.js';

/**
 * @returns SelectionController
 * @constructor
 */
const SelectionController = () => {
    const selectedModelObs = Observable(undefined);

    /**
     * @typedef {{
     *      setSelectedModel: @link Observable.setValue
     *      getSelectedModel: @link Observable.getValue
     *      onModelSelected: @link Observable.onChange
     * }} SelectionController
     */
    return {
        setSelectedModel: selectedModelObs.setValue,
        getSelectedModel: selectedModelObs.getValue,
        onModelSelected: selectedModelObs.onChange,
    }
};

const ListController = () => {
    const modelObsList = ObservableList([]);
    const isLoading = Observable(true);

    fetch('./js/students.json')
        .then(result => result.json())
        .then(json => {
            const handle = () => {
                json.forEach(student => modelObsList.add(Student(student)));
                isLoading.setValue(false);
            }
            setTimeout(handle, Math.random() * 1000)
        });

    /**
     * @typedef {{
     *     onStudentsAdd: @link ObservableList.onAdd
     *     onStudentsDel: @link ObservableList.onDel
     *     addStudent: @link ObservableList.add
     *     delStudent: @link ObservableList.del
     *     isLoading: @link Observable
     * }} ListController
     */
    return {
        onStudentsAdd: modelObsList.onAdd,
        onStudentsDel: modelObsList.onDel,
        addStudent: modelObsList.add,
        delStudent: modelObsList.del,
        isLoading: isLoading,
    }
};

export const listController = ListController();
export const selectionController = SelectionController();
