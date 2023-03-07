import get from "lodash.get";

/**
 *
 * @method getRequiredValidator
 * @summary check if a inputs value is undefined, null or empty string and creates an errors array
 * @param {String} requiredFields - name of required field you want to validate
 * @return {Object[]} errors - array of field error objects
 */
function getLabel(name) {
  let label = name;
  switch (name) {
    case "fullName": {
      label = "name";
      break;
    }
    case "postal": {
      label = "post code";
      break;

    }
    case "region": {
      label = "county";
      break;
    }
    case "address1": {
      label = "address";
      break;
    }
    default:
  }
  return label;
}
export default function getRequiredValidator(...requiredFields) {
  return async (obj) => {
    const errors = [];
    requiredFields.forEach((requiredField) => {
      const value = get(obj, requiredField);
      if (value === null || value === undefined || value === "") {
        errors.push({ name: requiredField, message: `${getLabel(requiredField)} is required` });
      }
    });
    return errors;
  };
}
