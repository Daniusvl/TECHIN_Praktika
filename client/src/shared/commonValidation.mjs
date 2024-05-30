export const emailValidation = 
{
    pattern: {
        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Please enter a valid email",
    }
};

export const passwordValidation = 
{
    minLength: {
        value: 8,
        message: "Password must be in between 8 and 20 characters"
    },
    maxLength: {
        value: 20,
        message: "Password must be in between 8 and 20 characters"
    },
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^_+=\-';,./|":<>?])[A-Za-z\d@$!%*?&~#^_+=\-';,./|":<>?]{8,20}$/,
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }
};