import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  product: any = {};
  selectedImage: File | null = null;

  constructor(private http: HttpClient) {}

  submitForm() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    this.http.post('/api/products', formData).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        this.product = {};
        this.selectedImage = null;
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post('/api/shopping/CreateProduct', product);
  }

  handleImageUpload(event: any) {
    this.selectedImage = event.target.files[0];
  }
}
