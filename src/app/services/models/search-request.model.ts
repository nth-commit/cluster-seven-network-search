export interface SearchRequest {
    name: string;
    description: string;
    requester: string;
    requestedAt: string;
    finishedAt: string;
    count: number;
    index: number;
};