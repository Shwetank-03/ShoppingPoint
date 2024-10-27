import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product, Review } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  imageIndex = 1;
  product: Product | null = null;
  reviewControl = new FormControl('', Validators.required);
  showError = false;
  reviewSaved = false;
  otherReviews: Review[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      const id = params['id'];
      if (id) {
        this.navigationService.getProduct(id).subscribe(
          (res: any) => {
            this.product = res;
            this.fetchAllReviews();
          },
          (error: any) => {
            console.error('Error fetching product:', error);
          }
        );
      } else {
        console.error('No product ID provided');
      }
    });
  }

  submitReview() {
    if (this.reviewControl.invalid) {
      this.showError = true;
      return;
    }

    const review = this.reviewControl.value;
    const userId = this.utilityService.getUser()?.id;
    const productId = this.product?.id;

    if (!userId || !productId) {
      console.error('Invalid user or product');
      return;
    }

    this.navigationService.submitReview(userId, productId, review || '').subscribe(
      () => {
        this.reviewSaved = true;
        this.fetchAllReviews();
        this.reviewControl.setValue('');
      },
      (error: any) => {
        console.error('Error submitting review:', error);
      }
    );
  }

  fetchAllReviews() {
    if (!this.product?.id) {
      console.error('Invalid product');
      return;
    }

    this.navigationService.getAllReviewsOfProduct(this.product.id).subscribe(
      (res: any) => {
        this.otherReviews = res;
      },
      (error: any) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
}
