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
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)])
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

  isFieldInvalid(field: string): string | boolean {
    const formField = this.formFields.get(field);

    if (formField?.invalid && formField?.touched) {
      if (formField?.errors?.['required']) {
        return 'Campo obrigatório';
      }
      if (formField?.errors?.['minlength']) {
        if (field === 'name') {
          return 'Mínimo de 3 caracteres';
        }
        if (field === 'description') {
          return 'Mínimo de 10 caracteres';
        }
      }
    }

    return false;
  }
}
