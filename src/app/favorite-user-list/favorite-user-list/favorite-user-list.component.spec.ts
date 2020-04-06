import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteUserListComponent } from './favorite-user-list.component';

describe('FavoriteUserListComponent', () => {
  let component: FavoriteUserListComponent;
  let fixture: ComponentFixture<FavoriteUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteUserListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
