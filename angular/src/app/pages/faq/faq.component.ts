import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExpandingRowComponent} from '../../components/expanding-row/expanding-row.component';
import {NgForOf} from '@angular/common';
import {FaqsService} from '../../services/faqs.service';
import {Faq} from '../../models/interfaces.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-faq',
  imports: [
    ExpandingRowComponent,
    NgForOf
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit, OnDestroy {
  faqs: Faq[] = [];
  private faqsSubscription?: Subscription;

  constructor(private faqsService: FaqsService) {}

  ngOnInit(): void {
    this.faqsSubscription = this.faqsService.getFaqs().subscribe(
      faqs => this.faqs = faqs
    );
  }

  ngOnDestroy(): void {
    this.faqsSubscription?.unsubscribe();
  }
}
