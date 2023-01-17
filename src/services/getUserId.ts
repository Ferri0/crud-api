/**
 * Retrieve user uuid from URL string
 * It is expected that string will have the following format - '/api/users/${uuid}'
 */
export const getUserId = (url: string): string | null => {
    let userId = null;

    const urlParts = url.split('/');

    if (urlParts.length === 4) {
        userId = urlParts[3];
    }

    return userId;
};
