export interface OpenFda {
  brand_name: string[];
  generic_name?: string[];
  manufacturer_name?: string[];
  product_type?: string[];
}

export interface Drug {
  id: string;
  openfda: OpenFda;
  description?: string;
  dosage_and_administration?: string;
  indications_and_usage?: string;
  contraindications?: string;
  warnings?: string;
  adverse_reactions?: string;
  drug_interactions?: string;
  use_in_specific_populations?: string;
  clinical_pharmacology?: string;
  how_supplied?: string;
  storage_and_handling?: string;
}
