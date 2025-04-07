import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaterequestComponent } from './createrequest.component';

describe('CreaterequestComponent', () => {
  let component: CreaterequestComponent;
  let fixture: ComponentFixture<CreaterequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaterequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaterequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
