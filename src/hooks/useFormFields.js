import { useState } from 'react';

export const useFormFields = (initialFields) => {
    const [fields, setFields] = useState(initialFields);

    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setFields((currentFields) => ({ ...currentFields, [name]: value }));
    };

    return [fields, handleFieldChange];
};
