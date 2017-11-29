export interface SearchData {
  collection: SearchDataCollection [];
  next_href: string;
  query_urn: string;
}

export interface SearchDataCollection {
  output: string;
  query: string;
}
