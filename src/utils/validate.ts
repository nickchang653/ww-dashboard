export const validateField = (
    value: number,
    onError: (str: string) => void
) => {
    if (!value) {
        onError("The field is required.");
        return false;
    }
    onError("");
    return true;
};

export const validateClientAge = (
    value: number,
    onError: (str: string) => void
) => {
    if (!value) {
        onError("Client age is required.");
        return false;
    }
    if (value < 20 || value > 100) {
        onError("The age should be between 20 and 100.");
        return false;
    }
    onError("");
    return true;
};

export const validateYears = (value: number, onError: (str: string) => void) => {
    if (!value) {
        onError("Years is required.");
        return false;
    }
    if (value < 0 || value > 100) {
        onError("Years should be between 0 and 100.");
        return false;
    }
    onError("");
    return true;
};

export const validateBeginningYear = (
    value: number,
    onError: (str: string) => void
) => {
    if (!value) {
        onError("Beginning year is required.");
        return false;
    }
    if (value > 2023 || value < 1970) {
        onError("Beginning year must be between 1970 and 2023.");
        return false;
    }
    onError("");
    return true;
};