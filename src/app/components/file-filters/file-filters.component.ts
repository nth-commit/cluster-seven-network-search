import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Action } from '@ngrx/store';

import { FileSizeDescriptorType, FileDateDescriptorType } from '../../app.constants';
import { AppActions } from '../../app.actions';
import { FileFilterArgs } from '../../pipes/file-filter.pipe';

@Component({
    selector: 'file-filters',
    templateUrl: '/file-filters.component.html',
    styleUrls: ['/file-filters.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFiltersComponent implements AfterViewInit, OnInit {
    @Input() filters: FileFilterArgs;
    @Output() filtersUpdated = new EventEmitter<Action>();

    FileSizeDescriptorType = FileSizeDescriptorType;
    FileDateDescriptorType = FileDateDescriptorType;

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    )
    {
        this.form = formBuilder.group({
            pattern: new FormControl(),
            sizeDescriptorType: new FormControl(),
            dateDescriptorType: new FormControl()
        });
    }

    ngOnInit() {
        this.form.patchValue(this.filters);
    }

    ngAfterViewInit() {
        this.form.valueChanges.subscribe(filters =>
            this.filtersUpdated.emit(AppActions.updateFilter(filters)));
    }
}