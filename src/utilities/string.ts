export const tryInt = (value : string) => {
    const newValue = parseInt(value);
    return isNaN(newValue) ? value : newValue;
}