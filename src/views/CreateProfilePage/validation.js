import passwordValidator from "password-validator";
const badPasswords = ["Passw0rd", "Password123", "aaAA11!!"];
export const validatePassword = (password) => {
  var schema = new passwordValidator();
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .symbols() // Must have digits
    .has()
    .letters() // Must have digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(badPasswords); // Blacklist these values
  return schema.validate(password, { list: true });
};
export const handlePasswordErrors = (password, setPasswordErrors) => {
  let errorArray = validatePassword(password);
  let tooltipText = [];
  errorArray.forEach((error) => {
    switch (error) {
      case "max":
        tooltipText.push("Password is too long.");
        break;
      case "min":
        tooltipText.push("Password is too short.");
        break;
      case "uppercase":
        tooltipText.push("No uppercase letter.");
        break;
      case "lowercase":
        tooltipText.push("No lowercase letter.");
        break;
      case "digits":
        tooltipText.push("No digits.");
        break;
      case "numbers":
        tooltipText.push("No numbers.");
        break;
      case "symbols":
        tooltipText.push("No symbols.");
        break;
      case "letters":
        tooltipText.push("No letters.");
        break;
      default:
        console.log(error);
        break;
    }
  });
  setPasswordErrors(tooltipText);
};
