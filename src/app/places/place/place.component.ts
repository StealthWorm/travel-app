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

  constructor(private placeService: PlaceService, private categoryService: CategoryService) {
    this.formFields = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required]),
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
    console.log(this.formFields.value);
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.formFields.get(field);

    return formField?.invalid && formField?.touched && formField?.errors?.['required'];
  }
}
