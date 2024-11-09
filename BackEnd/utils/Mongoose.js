module.exports = {
    arrayToObject: function (data) {
        return data.map(data => data.toObject());
    },
    elementToObject: function (element) {
        return element ? element.toObject() : element;
    }
};
