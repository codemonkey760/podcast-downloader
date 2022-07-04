export const NamingMode = Object.freeze({
    TITLE_REGEX: Symbol('TITLE_REGEX'),
    NONE: Symbol('NONE')
})

function getFileExtFromStreamUrl(streamUrl) {
    const ext = streamUrl.split('/').pop().split('?')[0].split('.').pop()

    return (ext) ? ext : 'mp3'
}

function getFallBackFileName(podcastId) {
    return podcastId
}

function getTitleRegexFileName(titleRegex, fileNamePattern, title, podcastId) {
    if (!titleRegex || !fileNamePattern) {
        return getFallBackFileName(podcastId)
    }

    if (title.match(titleRegex)) {
        return title.replace(titleRegex, fileNamePattern)
    } else {
        return getFallBackFileName(podcastId)
    }
}

export function getFileName(program, podcastId, title, streamUrl) {
    const ext = getFileExtFromStreamUrl(streamUrl)

    const mode = program.namingMode ?? NamingMode.NONE

    if (mode === NamingMode.NONE) {
        return getFallBackFileName(podcastId) + '.' + ext
    } else if (mode === NamingMode.TITLE_REGEX) {
        return getTitleRegexFileName(new RegExp(program.titleRegex), program.fileNamePattern, title, podcastId) + '.' + ext
    }
}