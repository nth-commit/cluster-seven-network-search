import { SearchRequestService } from './services/search-request.service';
import { FileService } from './services/file.service';
import { FileSizeDescriptorResolver } from './services/file-size-descriptor.resolver';

import { FileFilterPipe } from './pipes/file-filter.pipe';

import { SearchRequestResolve } from './resolves/search-request.resolve';

export const APP_PROVIDERS = [
    SearchRequestService,
    FileService,
    FileSizeDescriptorResolver,

    FileFilterPipe,

    SearchRequestResolve
];