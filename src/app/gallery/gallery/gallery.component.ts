import { Component } from '@angular/core';
import { Category } from '../../category/category';
import { Place } from '../../places/place';
import { CategoryService } from '../../category/category.service';
import { PlaceService } from '../../places/place.service';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  categories: Category[] = [];
  places: Place[] = [];

  constructor(
    private categoryService: CategoryService,
    private placeService: PlaceService) { }

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
}
