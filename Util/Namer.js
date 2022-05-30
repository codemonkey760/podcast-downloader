export const NamingMode = Object.freeze({
    TITLE_REGEX: Symbol('title_regex'),
    NONE: Symbol('none')
})

function getFileExtFromStreamUrl(streamUrl) {
    const ext = streamUrl.split('/').pop().split('?')[0].split('.').pop()

    return (ext) ? ext : 'mp3'
}

function getFallBackFileName(podcastId, ext) {
    return podcastId + '.' + ext
}

function getTitleRegexFileName(titleRegex, fileNamePattern, title, podcastId, ext) {
    if (!titleRegex || !fileNamePattern) {
        return getFallBackFileName(podcastId, ext)
    }

    if (title.match(titleRegex)) {
        return title.replace(titleRegex, fileNamePattern) + '.' + ext
    } else {
        return getFallBackFileName(podcastId, ext)
    }
}

export function getFileName(program, podcastId, title, streamUrl) {
    const mode = program.namingMode ?? NamingMode.NONE

    const ext = getFileExtFromStreamUrl(streamUrl)

    if (mode === NamingMode.NONE) {
        return getFallBackFileName(podcastId, ext)
    } else if (mode === NamingMode.TITLE_REGEX) {
        return getTitleRegexFileName(new RegExp(program.titleRegex), program.fileNamePattern, title, podcastId, ext)
    }
}
