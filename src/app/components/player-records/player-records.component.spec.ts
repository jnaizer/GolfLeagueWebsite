import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRecordsComponent } from './player-records.component';

describe('PlayerRecordsComponent', () => {
  let component: PlayerRecordsComponent;
  let fixture: ComponentFixture<PlayerRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
