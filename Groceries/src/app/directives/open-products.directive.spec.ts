import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appOpenProductDetails]'
})
export class OpenProductDetailsDirective {
  @Input() productId: number = 0;

  constructor(private router: Router) {}

  @HostListener('click')
  openProductDetails() {
    window.scrollTo(0, 0);
    this.router.navigate(['/product-details'], {
      queryParams: {
        id: this.productId
      }
    });
  }
}
