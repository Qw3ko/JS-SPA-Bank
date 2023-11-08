const SITE_NAME = 'Qw3ko Bank - Vanilla JS'

export const getTitle = (title) => {
    return title ? `${title} | ${SITE_NAME}` : SITE_NAME
}