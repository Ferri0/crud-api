/**
 * Service function, retrieve user uuid from URL (if provided)
 *
 * @param {string} url - Request URL
 * @return {string|null} - User uuid
 */
export const getUserId = (url: string): string | null => {
    let userId = null;

    const urlParts = url.split('/');

    if (urlParts.length === 4) {
        userId = urlParts[3];
    }

    return userId;
};
