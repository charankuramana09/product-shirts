import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  colour: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userInfo: Product[] = [];
  filteredItems: Product[] = [];
  searchTerm: string = '';
  sortBy: string = '';
  selectedColors: { [key: string]: boolean } = {};
  selectedNames: { [key: string]: boolean } = {};
  selectedPrices: { [key: string]: boolean } = {};
  priceRanges: string[] = ['0-100', '101-200', '201-300', '301-400', '401-500'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const url: string = '/assets/shop-data.json';
    this.http.get<Product[]>(url).subscribe(data => {
      this.userInfo = data;
      this.filteredItems = this.userInfo.slice();
      this.sortItems();
    });
  }

  filterItems() {
    this.filteredItems = this.userInfo.filter(item =>
      Object.keys(this.selectedColors).every(color => !this.selectedColors[color] || item.colour === color) &&
      Object.keys(this.selectedNames).every(name => !this.selectedNames[name] || item.name === name)  &&
      Object.keys(this.selectedPrices).every(price => !this.selectedPrices[price] || this.isInRange(item.price, price))
    );
    this.sortItems();
  }

  sortItems() {
    if (this.sortBy === 'priceAsc') {
      this.filteredItems.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'priceDesc') {
      this.filteredItems.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'nameAsc') {
      this.filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'nameDesc') {
      this.filteredItems.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  getUniqueColors(): string[] {
    return Array.from(new Set(this.userInfo.map(item => item.colour)));
  }

  getUniqueNames(): string[] {
    return Array.from(new Set(this.userInfo.map(item => item.name)));
  }

  isInRange(price: number, range: string): boolean {
    const [min, max] = range.split('-').map(Number);
    return price >= min && price <= max;
  }
}
