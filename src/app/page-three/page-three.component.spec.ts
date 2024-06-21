import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageThreeComponent } from './page-three.component';

describe('PageTheeComponent', () => {
  let component: PageThreeComponent;
  let fixture: ComponentFixture<PageThreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageThreeComponent]
    });
    fixture = TestBed.createComponent(PageThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
