const axios = require("axios").default;
const { load } = require("cheerio").default;

module.exports = async (username, booleanOnly = false, parseProps = true) => {
    if (!username || typeof username !== "string") throw new Error(`Invalid username provided for getting twitch user information, type=${typeof username} val=${username}`);
    if (typeof booleanOnly !== "boolean") throw new Error(`Invalid boolean, type=${typeof booleanOnly} val=${booleanOnly}`);

    const { data } = await axios(`https://www.twitch.tv/${encodeURIComponent(username)}`);

    if (!data.includes("isLiveBroadcast")) return booleanOnly ? false : { success: false, error: null, live: false };

    if (booleanOnly) return true;

    try {
        const $ = load(data, { xmlMode: false });

        const { name, description, embedUrl, thumbnailUrl, uploadDate, publication: { startDate, endDate } } = JSON.parse($("script")[0].firstChild.data)[0];

        return parseProps ? {
            success: true,
            error: null,
            live: true,
            name,
            title: description,
            embedURL: embedUrl,
            thumbnails: thumbnailUrl,
            upload: new Date(uploadDate),
            start: new Date(startDate),
            _end: new Date(endDate),
            _isLiveBroadcast: true
        } : {
            success: true,
            error: null,
            live: true,
            ...JSON.parse($("script")[0].firstChild.data)[0]
        };
    } catch (_) {
        return booleanOnly ? false : { success: false, error: _, live: false };
    };
};