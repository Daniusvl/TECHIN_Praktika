export const dateToString = (date) => {
    if(!(date instanceof Date)){
        return null;
    }

    const yyyy = date.getFullYear();
    let MM = date.getMonth() + 1;
    let dd = date.getDate();

    let hh = date.getHours();
    let mm = date.getMinutes();
    if (dd < 10) dd = `0${ dd}`;
    if (MM < 10) MM = `0${ MM}`;
    if (hh < 10) hh = `0${hh}`;
    if (mm < 10) mm = `0${mm}`;

    return `${yyyy}-${MM}-${dd} ${hh}-${mm}`;
};