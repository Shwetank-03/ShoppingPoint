import { Component, OnInit } from '@angular/core';
import { Cart, CartItem, Payment } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { take, tap, catchError } from 'rxjs';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  numItemsInCart: any;
  usersCart: Cart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: '',
  };

  usersPaymentInfo: Payment = {
    id: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: true,
      reason: '',
    },
    totalAmount: 0,
    shippingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  };

  usersPreviousCarts: Cart[] = [];

  constructor(
    public utilityService: UtilityService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    // Get Cart
    this.navigationService
      .getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersCart = res;

        // Calculate Payment
        this.utilityService.calculatePayment(
          this.usersCart,
          this.usersPaymentInfo
        );
      });

    // Get Previous Carts
    this.navigationService
      .getAllPreviousCarts(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersPreviousCarts = res;
      });
  }

  
  removeFromCart(cartItem: CartItem): Observable<any> {
    const index = this.usersCart.cartItems.findIndex(
      (item: CartItem) => item.id === cartItem.id
    );
    if (index !== -1) {
      this.usersCart.cartItems.splice(index, 1);

      // Update the number of items in the cart
      this.numItemsInCart = this.usersCart.cartItems.length;

      // Send request to remove item from cart
      return this.navigationService.removeFromCart(cartItem.id).pipe(
        take(1),
        tap(() => {
          console.log('Item removed from cart successfully');

          // Calculate Payment
          this.utilityService.calculatePayment(
            this.usersCart,
            this.usersPaymentInfo
          );

          // Update the payment amount
          this.usersPaymentInfo.amountPaid =
            this.usersPaymentInfo.totalAmount -
            this.usersPaymentInfo.amountReduced;

          // Update the usersPaymentInfo object
          this.usersPaymentInfo = { ...this.usersPaymentInfo };

          // Send request to update the payment amount
          this.navigationService
            .insertPayment(this.usersPaymentInfo)
            .pipe(take(1))
            .subscribe({
              next: () => {
                console.log('Payment amount updated successfully');
              },
              error: (error: any) => {
                console.error('Error updating payment amount:', error);
              },
            });
        }),
        catchError((error: any) => {
          console.error('Error removing item from cart:', error);
          return throwError(error);
        })
      );
    } else {
      return throwError('Item not found in cart');
    }
  }

}
