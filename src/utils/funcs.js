export const updateByPropertyName = (propertyName, value) => () => ({ [propertyName]: value });

export const is_number = s => /\d/.test(s);
