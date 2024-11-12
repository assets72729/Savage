export function processCaption(oldCaption, join) {
    var newCaption = "";
    newCaption = oldCaption
        .replace(/\./g, " ")
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/\[/g, " ")
        .replace(/\]/g, " ")
        .replace(/\{/g, " ")
        .replace(/\}/g, " ")
        .replace(/\(/g, " ")
        .replace(/\)/g, " ")
        .trim()
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
    newCaption = newCaption.replace(/@\w+\s?/g, "");
    var indexOfSize = newCaption.indexOf("🔘 SIZE");
    if (indexOfSize !== -1) {
        newCaption = newCaption.substring(0, indexOfSize);
    }
    else {
        newCaption = newCaption;
    }
    var mkv = newCaption.indexOf("mkv");
    if (mkv !== -1) {
        newCaption = newCaption.substring(0, mkv + 3);
    }
    newCaption += "\n JOIN: @".concat(join, "\n for more drama movies!!");
    return newCaption.trim();
}
export function editButtonTitle(oldCaption) {
    var newCaption = "";
    newCaption = oldCaption.replace("(", " ").replace(")", " ");
    return newCaption.trim();
}
export function processCaptionForStore(oldCaption) {
    var newCaption = "";
    newCaption = oldCaption
        .replace(/\./g, " ")
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/\[/g, " ")
        .replace(/\]/g, " ")
        .replace(/\{/g, " ")
        .replace(/\}/g, " ")
        .replace(/\(/g, " ")
        .replace(/\)/g, " ")
        .replace("[KR HD]", " ")
        .trim()
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
    newCaption = newCaption.replace(/@\w+\s?/g, "");
    var mkv = newCaption.indexOf("mkv");
    if (mkv !== -1) {
        newCaption = newCaption.substring(0, mkv + 3);
    }
    return newCaption.trim();
}
