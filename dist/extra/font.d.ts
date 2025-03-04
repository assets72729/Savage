declare const fontStyles: {
    tinyCaps: {
        normal: string;
        converted: string;
    };
    bold: {
        normal: string;
        converted: string;
    };
    italic: {
        normal: string;
        converted: string;
    };
    script: {
        normal: string;
        converted: string;
    };
    gothic: {
        normal: string;
        converted: string;
    };
    monospace: {
        normal: string;
        converted: string;
    };
};
export declare function convertFont(text: string, style: keyof typeof fontStyles): string;
export {};
