import { FormHandler } from "./FormHandler.js";
import { Validator } from "./validator.js";

$(document).ready(() => {
  const validator = new Validator();
  const formHandler = new FormHandler("#myForm", validator);

  $("#submitButton").on("click", () => {
    formHandler.handleFormSubmission();
  });
});
