const classPrefix = 'test'

const stringDecoration = (element) => {
    return typeof element === 'string'
        ? '"' + element + '"'
        : element
}

const Assert = () => {
    const ok = [];

    const identical = (actual, expected) => {
        const result = (actual === expected);
        ok.push({
            result,
            message: `${stringDecoration(actual)} === ${stringDecoration(expected)}: ${stringDecoration(result)}`
        });
    };

    const equals = (actual, expected) => {
        const result = (actual == expected);
        ok.push({
            result,
            message: `${stringDecoration(actual)} == ${stringDecoration(expected)}: ${stringDecoration(result)}`
        });
    }

    const isNan = (actual) => {
        const result = isNan(actual);
        ok.push({
            result,
            message: ''
        });
    }

    const typeOf = (actual, expected) => {
        identical(typeof actual, expected)
    }

    return {
        ok,
        identical,
        equals,
        isNan,
        typeOf
    }
};

const test = (root) => (origin) => (callback) => {
    const assert = Assert();
    callback(assert);
    report(root, origin, assert.ok);
};

const titleElem = (text) => {
    const title = document.createElement('DIV');
    title.innerText = text;
    title.classList.add(classPrefix + '-title')
    return title;
}

const summaryElem = (nSuccess, nFailing) => {
    const wrapper = document.createElement('DIV');
    wrapper.classList.add(classPrefix + '-summary');

    const success = document.createElement('DIV');
    success.innerText = `${nSuccess} successfull test${nSuccess > 1 ? 's' : ''}`

    const failing = document.createElement('DIV');
    failing.innerText = `${nFailing} failing test${nFailing > 1 ? 's' : ''}`

    wrapper.appendChild(success);
    wrapper.appendChild(failing);
    return wrapper;
}

const resultElem = (idx, ok) => {
    const result = document.createElement('DIV');
    result.classList.add(ok.result ? classPrefix + '-success' : classPrefix + '-fail')

    result.innerText = `Test #${idx}: ${ok.message}`;
    return result;
}

const report = (root, origin, oks) => {
    const nSuccess = oks.filter(success => success.result).length;
    const nFailing = oks.filter(success => !success.result).length;
    let resultWrapper;

    if (!root.children.length) {
        root.appendChild(titleElem(origin))
        root.appendChild(summaryElem(nSuccess, nFailing))
        resultWrapper = document.createElement('DIV');
        resultWrapper.classList.add(classPrefix + '-results')
    } else {
        resultWrapper = root.querySelector('.' + classPrefix + '-results')
    }

    oks.forEach((ok, idx) => {
        resultWrapper.appendChild(resultElem(idx, ok));
    })

    root.appendChild(resultWrapper);
}
