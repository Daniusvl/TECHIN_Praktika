export const classNames = (...classes) => {
    let complete = "";

    for (let index = 0; index < classes.length; index++) {
        complete += `${classes[index]} `;
    }

    return complete.trim();
};