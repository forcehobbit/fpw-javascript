import {ObservableList, Observable} from "../../../util/observable.js";
import {Student} from "./student.js";

const StudentController = () => {
    const students = ObservableList([]);

    fetch('./js/students.json')
        .then(result => result.json())
        .then(json => {
            json.forEach(student => students.add(Student(student)))
        })

    /**
     * @typedef {{
     *     students: ObservableList
     * }}
     */
    return Object.freeze({
        students: students,
    })
}

const studentController = StudentController();
export default studentController;
