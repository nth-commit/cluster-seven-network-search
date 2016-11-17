import { Home } from './pages/home/home';
import { SearchDetails } from './pages/search-details/search-details';

import { SearchRequestListComponent } from './components/search-request-list/search-request-list.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { FileComponent } from './components/file/file.component';
import { FileFiltersComponent } from './components/file-filters/file-filters.component';

import { BytePipe } from './pipes/byte.pipe';
import { FileFilterPipe } from './pipes/file-filter.pipe';
import { ValuesPipe } from './pipes/values.pipe';
import { EnumValuesPipe } from './pipes/enum-values.pipe';
import { EnumKeyPipe } from './pipes/enum-key.pipe';
import { FileSizeDescriptorTypePipe } from './pipes/file-size-descriptor-type.pipe';
import { FileDateDescriptorTypePipe } from './pipes/file-date-descriptor-type.pipe';

export const APP_DECLARATIONS = [
    Home,
    SearchDetails,
    
    SearchRequestListComponent,
    FileListComponent,
    FileComponent,
    FileFiltersComponent,

    BytePipe,
    FileFilterPipe,
    ValuesPipe,
    EnumValuesPipe,
    EnumKeyPipe,
    FileSizeDescriptorTypePipe,
    FileDateDescriptorTypePipe
];