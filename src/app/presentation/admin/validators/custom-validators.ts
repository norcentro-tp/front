import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export function vinCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    const regex = /^[A-HJ-NPR-Z0-9]{12}[0-9]{5}$/;

    if (value && !regex.test(value)) {
      return { invalidVINCode: true };
    }

    return null;
  };
}
export function hexadecimalColorValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    if (value && !regex.test(value)) {
      return { invalidHexColor: true };
    }

    return null;
  };
}
export function restrictedCharactersValidator(
  restrictedCharacters: string[]
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    for (const char of restrictedCharacters) {
      if (value && value.includes(char)) {
        return { restrictedCharacters: true };
      }
    }

    return null;
  };
}
export function alphanumericValidator(): ValidatorFn {
  const alphanumericRegex = /^(?! )[a-zA-Z0-9 áÁéÉíÍóÓúÚ]+(?<! )$/;

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    if (value && !alphanumericRegex.test(value)) {
      return { alphanumeric: true };
    }

    return null;
  };
}

export function alphanumericPlusValidator(): ValidatorFn {
  const alphanumericplusRegex = /^(?! )[a-zA-Z0-9 áÁéÉíÍóÓúÚ.,\/¿?¡!-]+(?<! )$/;

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    if (value && !alphanumericplusRegex.test(value)) {
      return { alphanumericPlus: true };
    }

    return null;
  };
}

export function alphabeticValidator(): ValidatorFn {
  const alphabeticRegex = /^(?! )[a-zA-Z áÁéÉíÍóÓúÚ]+(?<! )$/;

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    if (value && !alphabeticRegex.test(value)) {
      return { alphabetic: true };
    }

    return null;
  };
}

export function numericValidator(): ValidatorFn {
  const numericRegex = /^[0-9]+$/;

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    if (value && !numericRegex.test(value)) {
      return { numeric: true };
    }

    return null;
  };
}

export function numericPlusValidator(): ValidatorFn {
  const numericRegex = /^[0-9]+(\.[0-9]+)?$/;

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    if (value && !numericRegex.test(value)) {
      return { numericPlus: true };
    }

    return null;
  };
}

export function allFieldsFilledValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const formGroup = control as FormGroup;

    for (const controlName in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(controlName)) {
        const control = formGroup.controls[controlName];

        if (!control.value) {
          return { allFieldsFilled: true };
        }
      }
    }

    return null;
  };
}

export function emailValidator(): ValidatorFn {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    if (value && !emailRegex.test(value)) {
      return { email: true };
    }

    return null;
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    if (value && (!/\d/.test(value) || !/[a-zA-Z]/.test(value))) {
      return { password: true };
    }

    return null;
  };
}
