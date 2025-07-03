import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlaceService } from '../place.service';
import { Category } from '../../category/category';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-place',
  standalone: false,
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss'
})
export class PlaceComponent {
  formFields: FormGroup;
  categories: Category[] = [];

  constructor(
    private placeService: PlaceService,
    private categoryService: CategoryService,
  ) {
    this.formFields = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      category: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required, Validators.minLength(3)]),
      imageUrl: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|tiff|tif|ico|webp|svg|svgz)$/i)]),
      rating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Erro ao buscar categorias', error);
      }
    });
  }

  onSubmit() {
    this.formFields.markAllAsTouched();

    if (this.formFields.valid) {
      this.placeService.createPlace(this.formFields.value).subscribe({
        next: () => {
          console.log('Lugar criado com sucesso');
          this.formFields.reset();
        },
        error: (error) => {
          console.error('Erro ao criar lugar', error);
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
        return 'Mínimo de 3 caracteres';
      }
      if (formField?.errors?.['pattern']) {
        return 'URL inválida';
      }
    }

    return false;
  }
}
