import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {ExpandingRowComponent} from '../../components/expanding-row/expanding-row.component';
import {NgForOf} from '@angular/common';
import {FaqsService} from '../../services/faqs.service';
import {Faq} from '../../models/interfaces.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-faq',
  imports: [
    CommonPageComponent,
    ExpandingRowComponent,
    NgForOf
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit, OnDestroy {
  constructor(private faqsService: FaqsService) {}

  faqs: Faq[] = [];
  private faqsSubscription?: Subscription;

  ngOnInit(): void {
    this.faqsSubscription = this.faqsService.getFaqs().subscribe(
      faqs => this.faqs = faqs
    );
  }

  ngOnDestroy(): void {
    this.faqsSubscription?.unsubscribe();
  }
}
