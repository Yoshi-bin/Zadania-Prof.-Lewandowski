export class FormHandler {
  constructor(formElement, validator) {
    this.$formElement = $(formElement);
    this.validator = validator;
  }

  handleFormSubmission() {
    const name = this.$formElement.find('input[name="name"]').val().trim();
    const age = this.$formElement.find('input[name="age"]').val().trim();

    if (this.validator.validateName(name) && this.validator.validateAge(age)) {
      this.displayMessage(`Witaj, ${name}! Masz ${age} lat.`, false);
    } else {
      this.displayMessage("Wprowadź poprawne dane!", true);
    }
  }

  displayMessage(message, isError = false) {
    const $output = $("#output");
    $output.text(message);
    $output.removeClass("error success");
    $output.addClass(isError ? "error" : "success");
  }
}
