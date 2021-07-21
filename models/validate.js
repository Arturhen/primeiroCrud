const moment = require("moment");

class Validate {
  validateDate(date, dateCreate) {
    const dataValidate = moment(date).isBefore(dateCreate);
    console.log(dataValidate)
    const validate = [
      {
        nome: "data",
        validation: dataValidate,
        mesagem: "insira a data certa",
      },
    ];

    const errors = validate.filter((camp) => !camp.validation);
    console.log(errors)
    return errors;
  }
}

module.exports = new Validate();
