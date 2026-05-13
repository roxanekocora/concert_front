import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertList } from './concert-list';

describe('ConcertList', () => {
  let component: ConcertList;
  let fixture: ComponentFixture<ConcertList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcertList],
    }).compileComponents();

    fixture = TestBed.createComponent(ConcertList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
