export interface ContentType {
  id: string;
  type_principal: string;
  sous_type: string;
}

export interface ProjectContentType {
  type_id: string;
  subtype_ids: string[];
}