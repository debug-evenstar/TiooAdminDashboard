export const isDomain = (domain: string) => {
    const fullPath = window.location.href;
    return fullPath.toLowerCase().includes(domain);
};
