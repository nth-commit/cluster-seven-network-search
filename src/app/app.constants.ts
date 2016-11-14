export const NETWORK_SEARCH_API_BASE: string = 'http://c7webtest.azurewebsites.net';

export enum FileSizeDescriptorType {
    All = 0,
    Small = 1,
    Medium = 2,
    Large = 3,
    ExtraLarge = 4
};

const BYTES_PER_KILOBYTE = 1024;
const BYTES_PER_MEGABYTE = Math.pow(BYTES_PER_KILOBYTE, 2);
export const MAX_FILE_SIZES = {
    [FileSizeDescriptorType.Small]: BYTES_PER_MEGABYTE,
    [FileSizeDescriptorType.Medium]: BYTES_PER_MEGABYTE * 10,
    [FileSizeDescriptorType.Large]: BYTES_PER_MEGABYTE * 100
};

export enum FileDateDescriptorType {
    All = 0,

    PastHour = 1,

    PastDay = 2,

    PastWeek = 3,

    PastMonth = 4,

    PastYear = 5
};