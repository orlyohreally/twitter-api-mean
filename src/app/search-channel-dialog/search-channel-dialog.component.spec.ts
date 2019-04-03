import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchChannelDialogComponent } from './search-channel-dialog.component';

describe('SearchComponent', () => {
  let component: SearchChannelDialogComponent;
  let fixture: ComponentFixture<SearchChannelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchChannelDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchChannelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
