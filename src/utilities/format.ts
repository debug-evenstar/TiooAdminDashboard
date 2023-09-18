export const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

export const formatSize = (size:number) => {
    return Math.floor(size/1000) + 'KB'
}