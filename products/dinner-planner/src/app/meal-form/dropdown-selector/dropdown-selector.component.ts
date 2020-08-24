import { Component, OnInit, Input, forwardRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DropdownSelectorComponent),
    }
  ]
})
export class DropdownSelectorComponent implements ControlValueAccessor {
  @Input()
  options: string[]

  selectedOption: string;

  constructor() { 
  }

  writeValue(obj: any): void {
    this.selectedOption = obj;
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

}
