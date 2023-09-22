import { FormControl, RequiredValidator } from '@angular/forms';

export class CustomValidators {
  static minLengthName(value: FormControl, min = 3) {
    let valueArray = value.value.split('');

    if (value && value.value !== '') {
      if (valueArray.length < min) {
        return { minLengthError: true };
      }
    }

    return null;
  }

  static minLengthEmail(value: FormControl, min = 5) {
    let valueArray = value.value.split('');

    if (value && value.value !== '') {
      if (valueArray.length < min) {
        return { minLengthError: true };
      }
    }

    return null;
  }

  static minLengthPass(value: FormControl, min = 6) {
    let valueArray = value.value.split('');

    if (value && value.value !== '') {
      if (valueArray.length < min) {
        return { minLengthError: true };
      }
    }

    return null;
  }

  static minLengthcpf(value: FormControl, min = 11) {
    let valueArray = value.value.split('');

    if (value && value.value !== '') {
      if (valueArray.length < min) {
        return { minLengthError: true };
      }
    }

    return null;
  }

  static maxLengthcpf(value: FormControl, max = 14) {
    let valueArray = value.value.split('');

    if (value && value.value !== '') {
      if (valueArray.length > max) {
        return { maxLengthError: true };
      }
    }

    return null;
  }

  static requiredValidator(value: FormControl, min = 1) {
    if (!value || value.value == '') {
      return { requiredError: true };
    }

    return null;
  }

  static requiredValidatorOpts(value: FormControl, min = 1) {
    if (value && value.value !== '') {
      if (value.value < min) {
        return { requiredErrorOpts: true };
      }
    }

    return null;
  }
}
