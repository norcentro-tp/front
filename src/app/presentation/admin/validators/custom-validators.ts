import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';


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
export function restrictedCharactersValidator( restrictedCharacters:string[]): ValidatorFn {
  
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
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
  
      if (value && !alphanumericRegex.test(value)) {
        return { alphanumeric: true };
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