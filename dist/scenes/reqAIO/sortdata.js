export var sortEpisodesByCaption = function (data) {
    var extractEpisodeNumber = function (caption) {
        var cleanedCaption = caption.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
        var match = cleanedCaption.match(/\b(?:s\d{1,2}\s*e\d{1,2}|\b(?:ep|\be|\bepisode)\d{1,2}|\b\d{1,2})\b/);
        if (match) {
            var episode = match[0].replace(/\D/g, "");
            return parseInt(episode, 10);
        }
        return null;
    };
    return data.sort(function (a, b) {
        var episodeA = extractEpisodeNumber(a.caption);
        var episodeB = extractEpisodeNumber(b.caption);
        if (episodeA === null)
            return 1;
        if (episodeB === null)
            return -1;
        return episodeA - episodeB;
    });
};
