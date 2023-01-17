const ALLOWED_KEYS = ['username', 'age', 'hobbies'];

/**
 * Validate user data provided as request body
 * POST requests data should contain all required keys
 * PUT requests data should contain at least one allowed key
 *
 * If data object contains not allowed key - data considered invalid
 * If key value has wrong type - data considered invalid
 */
export const validateUserData = (userData: any, reqType: 'POST' | 'PUT'): boolean => {
    let isValid = true;

    if (typeof userData === 'object') {
        const objectEntries = Object.entries(userData);

        if (reqType === 'POST' && objectEntries.length !== 3) {
            // POST request data have 3 required fields
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
                    } else if (key === 'hobbies' && Array.isArray(value)) {
                        const isEveryElementString = value.every((el) => typeof el === 'string');

                        if (!isEveryElementString) {
                            isValid = false;
                        }
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
