import { Action } from '@ngrx/store';

import { File } from './services/models/file.model';
import { FileFilterArgs } from './pipes/file-filter.pipe';

export class AppActions {

    static LOAD_FILES = 'Load Files';
    static loadFiles(files: File[]): Action {
        return {
            type: AppActions.LOAD_FILES,
            payload: files
        };
    }

    static CLEAR_FILES = 'Clear Files';
    static clearFiles(): Action {
        return {
            type: AppActions.CLEAR_FILES,
            payload: null
        };
    }

    static UPDATE_FILTER = 'Update Filter';
    static updateFilter(fileFilterArgs: FileFilterArgs): Action {
        return {
            type: AppActions.UPDATE_FILTER,
            payload: fileFilterArgs
        };
    }

    static CLEAR_FILTER = 'Clear Filter'
    static clearFilter(): Action {
        return {
            type: AppActions.CLEAR_FILTER,
            payload: null
        };
    }
}