import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Cart, CartItem, Order, Payment, PaymentMethod } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  selectedPaymentMethodName = '';
  selectedPaymentMethod = new FormControl('0');

  address = '';
  mobileNumber = '';
  displaySpinner = false;
  message = '';
  classname = ''; // Corrected property name

  paymentMethods: PaymentMethod[] = [];

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
      available: false,
      reason: '',
    },
    totalAmount: 0,
    shippingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  };

  constructor(
    private navigationService: NavigationService,
    public utilityService: UtilityService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Get Payment Methods
    this.navigationService.getPaymentMethods().subscribe((res) => {
      this.paymentMethods = res;
    });

    this.selectedPaymentMethod.valueChanges.subscribe((res: any) => {
      if (res === '0') this.selectedPaymentMethodName = '';
      else this.selectedPaymentMethodName = res.toString();
    });

    // Get Cart
    this.navigationService
      .getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersCart = res;
        this.utilityService.calculatePayment(res, this.usersPaymentInfo);
      });

    // Set address and phone number
    this.address = this.utilityService.getUser().address;
    this.mobileNumber = this.utilityService.getUser().mobile;
  }

  getPaymentMethod(id: string) {
    let x = this.paymentMethods.find((v) => v.id === parseInt(id));
    return x?.type + ' - ' + x?.provider;
  }

  placeOrder() {
    this.displaySpinner = true;
    let isPaymentSuccessful = this.payMoney();

    if (!isPaymentSuccessful) {
      this.displaySpinner = false;
      this.toastr.error('Something went wrong! Payment did not happen!');
      return;
    }

    let step = 0;
    let count = timer(0, 3000).subscribe((res) => {
      ++step;
      if (step === 1) {
        this.toastr.info('Processing Payment');
      }
      if (step === 2) {
        this.toastr.info('Payment Successful, Order is being placed.');
        this.storeOrder();
      }
      if (step === 3) {
        this.toastr.success('Your Order has been placed');
        this.displaySpinner = false;
      }
      if (step === 4) {
        this.router.navigateByUrl('/home');
        count.unsubscribe();
      }
    });
  }

  payMoney() {
    // Implement your payment logic here
    return true; // Placeholder function for payment, replace with your actual payment logic
  }

  storeOrder() {
    let payment: Payment;
    let pmid = 0;
    if (this.selectedPaymentMethod.value)
      pmid = parseInt(this.selectedPaymentMethod.value);

    payment = {
      id: 0,
      paymentMethod: {
        id: pmid,
        type: '',
        provider: '',
        available: false,
        reason: '',
      },
      user: this.utilityService.getUser(),
      totalAmount: this.usersPaymentInfo.totalAmount,
      shippingCharges: this.usersPaymentInfo.shippingCharges,
      amountReduced: this.usersPaymentInfo.amountReduced,
      amountPaid: this.usersPaymentInfo.amountPaid,
      createdAt: '',
    };

    this.navigationService
      .insertPayment(payment)
      .subscribe((paymentResponse: any) => {
        payment.id = parseInt(paymentResponse);
        let order: Order = {
          id: 0,
          user: this.utilityService.getUser(),
          cart: this.usersCart,
          payment: payment,
          createdAt: '',
        };
        this.navigationService.insertOrder(order).subscribe((orderResponse) => {
          this.utilityService.changeCart.next(0);
          this.toastr.success('Order placed successfully!');
        });
      });
  }

  removeCartItem(cartItem: CartItem) {
    const index = this.usersCart.cartItems.indexOf(cartItem);
    if (index !== -1) {
      this.usersCart.cartItems.splice(index, 1);
      this.utilityService.calculatePayment(this.usersCart, this.usersPaymentInfo);
    }
  }
}
