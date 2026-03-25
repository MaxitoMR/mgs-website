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
      { label: "Multi Tenant Offices", href: "/services/multi-tenant-offices" },
      { label: "Retail Facilities", href: "/services/retail-facilities" },
      { label: "Restaurants", href: "/services/restaurants" },
      { label: "Gymnasiums", href: "/services/gymnasiums" },
      { label: "Car Dealerships", href: "/services/car-dealerships" },
      { label: "School & University", href: "/services/schools" },
      { label: "Banks", href: "/services/banks" },
      { label: "Churches", href: "/services/churches" },
    ],
  },
  {
    label: "Medical",
    items: [
      { label: "Surgery Centers", href: "/services/surgery-centers" },
      { label: "Laboratories", href: "/services/laboratories" },
      { label: "Imaging Facilities", href: "/services/imaging-facilities" },
      { label: "Sports & Rehab", href: "/services/sports-rehabilitation" },
      { label: "Clinic & Private Practice", href: "/services/clinics" },
      { label: "Terminal Cleaning", href: "/services/terminal-sanitization" },
    ],
  },
  {
    label: "Industrial",
    items: [
      { label: "Factory Plants", href: "/services/factory-plants" },
      { label: "Hydroelectric Power Plants", href: "/services/hydroelectric-plants" },
      { label: "Petrochemical Plants", href: "/services/petrochemical-plants" },
      { label: "Warehouses", href: "/services/warehouses" },
    ],
  },
  {
    label: "Specialized",
    items: [
      { label: "Terminal Sanitization", href: "/services/terminal-sanitization" },
      { label: "Various Concrete Floors", href: "/services/concrete-floors" },
      { label: "Post-Construction Cleanup", href: "/services/post-construction" },
      { label: "Industrial Cleanup", href: "/services/industrial-cleanup" },
      { label: "Windows", href: "/services/windows" },
      { label: "Power Washing", href: "/services/power-washing" },
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

export const rightNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Apply Now", href: "/careers" },
];

export const portalItems: NavItem[] = [
  { label: "Staff Portal", href: "/staff-portal" },
  { label: "Client Portal", href: "#" },
];
