import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.html',
  styleUrl: './category.scss'
})
export class Category {
  formFields: FormGroup;

  constructor() {
    this.formFields = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.formFields.markAllAsTouched(); // marca todos os campos como tocados

    if (this.formFields.valid) {
      console.log('Formulário submetido:', this.formFields.value);
      console.log('Formulário válido:', this.formFields.valid);
    }
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.formFields.get(field);

    return formField?.invalid && formField?.touched && formField?.errors?.['required'];
  }
}
