import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Inject,
  forwardRef
} from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectAutocomplete } from 'instantsearch.js/es/connectors';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent extends BaseWidget implements OnInit {
  state: {
    query: string;
    refine: (target: string) => void;
    indices: object[];
  };
  inputControl = new FormControl();

  @Output() querySuggestionSelected = new EventEmitter<{ query: string }>();

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('AutocompleteComponent');

    this.inputControl.valueChanges.subscribe(value => {
      this.state.refine(value);
    });
  }

  public ngOnInit() {
    this.createWidget(connectAutocomplete, {});
    super.ngOnInit();
  }
}
