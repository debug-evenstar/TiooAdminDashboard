export type TextbookItem = {
    id: number;
    name: string;
    description: string;
    age: number;
    library: boolean;
    SchoolManagementId: number;
    lessonCount: number;
    tab: number;
    published : boolean;
    classes?: any;
};


export type SubjectItem = {
    id: number;
    name : string;
    description : string;
    cover : string;
};
