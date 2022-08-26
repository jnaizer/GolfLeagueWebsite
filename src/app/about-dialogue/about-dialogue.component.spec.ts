import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDialogueComponent } from './about-dialogue.component';

describe('AboutDialogueComponent', () => {
  let component: AboutDialogueComponent;
  let fixture: ComponentFixture<AboutDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
