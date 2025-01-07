import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { User } from '../../../../shared/models/users';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { map, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Swiper, SwiperEvents, SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-costumers-panel',
  standalone: true,
  imports: [CommonModule, CardComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './costumers-panel.component.html',
  styleUrl: './costumers-panel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CostumersPanelComponent implements OnInit {
  @Input() costumers$: Observable<User[]> = new Observable<User[]>();
  filteredCostumers$!: Observable<User[]>;
  searchForm: FormGroup = this.fb.group({
    searchTerm: ['']
  });

  private readonly destroy$ = new Subject<void>();

  swiperConfig: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 20,
    grid: {
      rows: 3,
      fill: 'row'
    },
    scrollbar: {
      draggable: true,
      hide: false
    },
    modules: [Grid]
  };

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeFilteredCustomers();
    this.setupSearchSubscription();
  }

  private initializeFilteredCustomers(): void {
    this.filteredCostumers$ = this.costumers$;
  }

  private setupSearchSubscription(): void {
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.onSearch());
  }

  public onSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value?.toLowerCase() || '';

    this.filteredCostumers$ = this.costumers$.pipe(
      map(customers => this.filterCustomers(customers, searchTerm))
    );
  }

  private filterCustomers(customers: User[], searchTerm: string): User[] {
    if (!searchTerm) return customers;

    return customers.filter(customer =>
      this.matchesSearchCriteria(customer, searchTerm)
    );
  }

  private matchesSearchCriteria(customer: User, searchTerm: string): boolean {
    return (
      customer.username?.toLowerCase().includes(searchTerm) ||
      customer.document?.includes(searchTerm)
    ) ?? false;
  }
}
function Grid(options: { params: SwiperOptions; swiper: Swiper; extendParams: (obj: { [name: string]: any; }) => void; on: <E extends keyof SwiperEvents>(event: E, handler: SwiperEvents[E]) => void; once: <E extends keyof SwiperEvents>(event: E, handler: SwiperEvents[E]) => void; off: { <E extends keyof SwiperEvents>(event: E, handler: SwiperEvents[E]): void; <E extends keyof SwiperEvents>(event: E): void; }; emit: <E extends keyof SwiperEvents>(event: E, ...args: any[]) => void; }): void {
  throw new Error('Function not implemented.');
}

