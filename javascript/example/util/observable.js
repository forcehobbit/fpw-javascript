/**
 * @param {*} value
 * @returns Observable
 */
export const Observable = (value) => {
    const listeners = [];

    /**
     * @typedef {{
     *   getValue: (function(): *),
     *   onChange: (function(function(*,*))),
     *   setValue: (function(*): undefined)
     * }} Observable
     */
    return {
        onChange: (observer) => {
            listeners.push(observer)
            listeners.forEach(observer => {
                observer(value, undefined);
            })
        },
        setValue: (newValue) => {
            const oldValue = value;
            value = newValue;
            listeners.forEach(observer => {
                observer(newValue, oldValue);
            })
        },
        getValue: () => {
            return value;
        }
    }
}

/**
 * @param {[]} list
 * @returns ObservableList
 */
export const ObservableList = (list) => {
    const addListeners = [];
    const delListeners = [];

    const removeAt = (array) => (index) => array.splice(index, 1);
    const removeItem = (array) => (item) => {
        const i = array.indexOf(item);
        if (i >= 0) removeAt(array)(i);
    };
    const listRemoveItem = removeItem(list);
    const delListenersRemove = removeAt(delListeners);

    const add = (item) => {
        list.push(item);
        addListeners.forEach(listener => listener(item));
        return item;
    };

    const del = (item) => {
        listRemoveItem(item);
        const safeIterate = [...delListeners]; // shallow copy as we might change listeners array while iterating
        safeIterate.forEach((listener, index) => listener(item, () => delListenersRemove(index)));
    };

    /**
     * @typedef {{
     *   onAdd: function(*): number,
     *   onDel: function(*): number,
     *   add: function(*): *,
     *   del: function(*),
     * }} ObservableList
     */
    return {
        onAdd: (listener) => addListeners.push(listener),
        onDel: (listener) => delListeners.push(listener),
        add: add,
        del: del,
        removeAddListener: removeItem(addListeners),
        removeDeleteListener: removeItem(delListeners),
    }
};