export declare function oneTimeGenreKeyboard(): any;
export declare function oneTimeSeasonKeyboard(): any;
export declare function oneTimeLangKeyboard(): any;
export declare function oneTimeSubKeyboard(): any;
export declare function oneTimeRatingKeyboard(): any;
export declare function oneTimeQualityKeyboard(): any;
export declare function oneTimeDoneKeyboard(): any;
export declare const makeButtons: (item: {
    caption: string;
    shareId: string;
    messageIds: number;
}[], next: string, prev: string, sendAll: string, type: string, totalPage: number, currentPage: number) => {
    inline_keyboard: any[][];
};
export declare const makeCollectionButton: (link: string) => {
    inline_keyboard: {
        text: string;
        url: string;
    }[][];
};
export declare const makeAdminButtons: (link: string, next: string, prev: string) => {
    inline_keyboard: ({
        text: string;
        callback_data: string;
        url?: undefined;
    } | {
        text: string;
        url: string;
        callback_data?: undefined;
    })[][];
};
export declare const editAnimeButtons: () => {
    inline_keyboard: {
        text: string;
        callback_data: string;
    }[][];
};
export declare const editMovieButton: () => {
    inline_keyboard: {
        text: string;
        callback_data: string;
    }[][];
};
export declare const editAIOButtons: () => {
    inline_keyboard: {
        text: string;
        callback_data: string;
    }[][];
};
export declare const editDramaButtons: () => {
    inline_keyboard: {
        text: string;
        callback_data: string;
    }[][];
};
export declare function customButtonsKeyboard(): any;
export declare function specialButtonsKeyboard(): any;
export declare function pyramidKeyboard(): any;
export declare function simpleHTMLKeyboard(): any;
export declare function inlineHTMLKeyboard(): any;
export declare function randomInlineKeyboard(): any;
export declare function captionInlineKeyboard(): any;
export declare function wrapKeyboard(columns: number): any;
