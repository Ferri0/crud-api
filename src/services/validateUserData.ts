const ALLOWED_KEYS = ['username', 'age', 'hobbies'];

/**
 * Service function, validate user data provided as request body
 * POST requests data should contain all required fields
 * PUT requests data should contain at least one allowed field
 * Not allowed fields are rejected
 */
export const validateUserData = (userData: any, reqType: 'POST' | 'PUT'): boolean => {
    let isValid = true;

    if (typeof userData === 'object') {
        const objectEntries = Object.entries(userData);

        if (reqType === 'POST' && objectEntries.length !== 3) {
            isValid = false;
        } else {
            objectEntries.forEach(([key, value]) => {
                if (isValid && ALLOWED_KEYS.some((allowedKey) => allowedKey === key)) {
                    if (!value) {
                        isValid = false;
                    } else if (key === 'username' && typeof value !== 'string') {
                        isValid = false;
                    } else if (key === 'age' && typeof +value !== 'number') {
                        isValid = false;
                    } else if (key === 'hobbies' && !Array.isArray(value)) {
                        isValid = false;
                    }
                } else {
                    isValid = false;
                }
            });
        }
    } else {
        isValid = false;
    }

    return isValid;
};
