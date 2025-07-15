import { Component } from '@angular/core';
import { Category } from '../../category/category';
import { Place } from '../../places/place';
import { CategoryService } from '../../category/category.service';
import { PlaceService } from '../../places/place.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  formFields: FormGroup;
  categories: Category[] = [];
  places: Place[] = [];

  constructor(
    private categoryService: CategoryService,
    private placeService: PlaceService) {
    this.formFields = new FormGroup({
      name: new FormControl('', []),
      category: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
    this.placeService.getPlaces().subscribe({
      next: (places) => {
        this.places = places;
      },
    });
  }

  getRating(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  getFilteredPlaces(name: string, categoryId: string): void {
    this.formFields.markAllAsTouched();

    // Find the category name by ID
    const selectedCategory = this.categories.find(cat => cat.id === categoryId);
    const categoryName = selectedCategory?.name || '';

    this.placeService.getFilteredPlaces(name, categoryName).subscribe({
      next: (places) => {
        this.places = places;
      },
    });
  }
}
