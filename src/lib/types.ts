export interface SearchDocument {
	id: string;
	value: { n: string };
}

export interface SearchResponse {
	total: number;
	documents: SearchDocument[];
	page: number;
}
