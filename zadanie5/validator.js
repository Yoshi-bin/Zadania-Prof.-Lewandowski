export class Validator {
  validateName(name) {
    return name.length >= 2;
  }

  validateAge(age) {
    const ageNumber = parseInt(age, 10);
    return ageNumber > 0 && ageNumber <= 120;
  }
}
