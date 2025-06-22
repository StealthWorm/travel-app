import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  formFields: FormGroup;

  constructor(private categoryService: CategoryService) {
    this.formFields = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.formFields.markAllAsTouched(); // marca todos os campos como tocados

    if (this.formFields.valid) {
      // "subscribe" é um método do Observable que permite observar a resposta do servidor reativamente
      this.categoryService.createCategory(this.formFields.value).subscribe({
        next: () => {
          this.formFields.reset();
        },
        error: (error) => {
          console.error('Erro ao criar categoria:', error);
        }
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.formFields.get(field);

    return formField?.invalid && formField?.touched && formField?.errors?.['required'];
  }
}
