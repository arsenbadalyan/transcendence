export const cn = (...classList) => classList.join(" ");

export const isArrayOfClass = (array, className) => {

    if (!Array.isArray(array) || typeof className !== "function")
        return (false);

    return (array.every(arrayItem => arrayItem instanceof className));

};