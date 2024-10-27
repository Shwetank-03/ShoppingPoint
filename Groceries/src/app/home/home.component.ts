
import { Component, OnInit } from '@angular/core';
import { SuggestedProduct } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  suggestedProducts: SuggestedProduct[] = [
    {
      banerimage : '../../assets/Image/Baner/Baner_Fruits.jpg',
      category: {
        id: 0,
        category: 'Fruits',
        subCategory: 'Apple',
      },
    },
    {
      banerimage: '../../assets/Image/Baner/Baner_Faal.jpg',
      category: {
        id: 1,
        category: 'Snacks',
        subCategory: 'Cookies',
      },
    },
    {
      banerimage: '../../assets/Image/Baner/Baner_Veg.jpg',
      category: {
        id: 1,
        category: 'Vegetables',
        subCategory: 'Potato',
      },
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

