import { File } from './services/models/file.model';
import { FileFilterArgs, DEFAULT_FILE_FILTER_ARGS } from './pipes/file-filter.pipe';

export interface AppState {
    files: File[];

    filters: FileFilterArgs;
}

export const DEFAULT_APP_STATE: AppState = {
    files: [],

    filters: DEFAULT_FILE_FILTER_ARGS
};