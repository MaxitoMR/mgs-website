export interface NavItem {
  label: string;
  href: string;
}

export interface NavCategory {
  label: string;
  items: NavItem[];
}

export const serviceNav: NavCategory[] = [
  {
    label: "Commercial",
    items: [
      { label: "Banks", href: "/services/banks" },
      { label: "Car Dealerships", href: "/services/car-dealerships" },
      { label: "Churches", href: "/services/churches" },
      { label: "Office Buildings", href: "/services/multi-tenant-offices" },
      { label: "Restaurants", href: "/services/restaurants" },
      { label: "Retail Facilities", href: "/services/retail-facilities" },
      { label: "Schools & Universities", href: "/services/schools" },
      { label: "Gymnasiums", href: "/services/gymnasiums" },
    ],
  },
  {
    label: "Medical",
    items: [
      { label: "Clinics", href: "/services/clinics" },
      { label: "Surgery Centers", href: "/services/surgery-centers" },
      { label: "Imaging Facilities", href: "/services/imaging-facilities" },
      { label: "Laboratories", href: "/services/laboratories" },
      { label: "Sports Rehabilitation", href: "/services/sports-rehabilitation" },
      { label: "Terminal Sanitization", href: "/services/terminal-sanitization" },
    ],
  },
  {
    label: "Industrial",
    items: [
      { label: "Factory & Plants", href: "/services/factory-plants" },
      { label: "Warehouses", href: "/services/warehouses" },
      { label: "Petrochemical Plants", href: "/services/petrochemical-plants" },
      { label: "Hydroelectric Plants", href: "/services/hydroelectric-plants" },
    ],
  },
  {
    label: "Additional Services",
    items: [
      { label: "Concrete Floors", href: "/services/concrete-floors" },
      { label: "Post-Construction", href: "/services/post-construction" },
      { label: "Industrial Cleanup", href: "/services/industrial-cleanup" },
      { label: "Power Washing", href: "/services/power-washing" },
      { label: "Windows", href: "/services/windows" },
      { label: "Upholstery", href: "/services/upholstery" },
      { label: "Specialized Cleaning", href: "/services/specialized-cleaning" },
    ],
  },
];

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#contact" },
];
