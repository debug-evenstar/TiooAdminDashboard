export const tryInt = (value : string) => {
    const newValue = parseInt(value);
    return isNaN(newValue) ? value : newValue;
}

export const truncate = (text: string, length: number) => {
    return text.length > length
    ? text.slice(0, length) + "..."
    : text
}