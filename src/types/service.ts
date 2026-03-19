export type ServiceCategoryType = "commercial" | "medical" | "industrial" | "additional";

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  category: ServiceCategoryType;
  image: string;
  icon: string;
  features: string[];
  benefits: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: ServiceItem[];
}
