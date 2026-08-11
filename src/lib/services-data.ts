export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  category: "commercial" | "medical" | "industrial" | "additional";
  description: string;
  longDescription: string;
  image: string;
  /** Optional extra photos shown in a "closer look" feature on the detail page. */
  gallery?: { src: string; title?: string; caption?: string }[];
  features: string[];
  benefits: string[];
}

export const services: Service[] = [
  // Commercial
  {
    slug: "banks",
    title: "Bank Cleaning Services",
    shortTitle: "Banks",
    category: "commercial",
    description: "Lobbies, teller lines, private offices and ATM vestibules, serviced after hours by background-checked crews.",
    longDescription: "MGS services lobbies, teller lines, private offices, ATM vestibules and vault approaches with vetted, background-checked crews, scheduled around banking hours. Every visit is documented against our QA protocol.",
    image: "/attached_assets/Official_About_Us_Background_1__1752010002961.png",
    features: ["Lobby and teller area maintenance", "ATM and kiosk cleaning", "Vault area cleaning", "Security-compliant protocols", "After-hours service available", "Customer-facing area detailing"],
    benefits: ["Background-checked crews only", "Scheduled outside banking hours", "Every visit documented", "Consistent public-facing presentation"],
  },
  {
    slug: "car-dealerships",
    title: "Car Dealership Cleaning Services",
    shortTitle: "Car Dealerships",
    category: "commercial",
    description: "Showroom floors and glass, service bays, parts departments and customer lounges, to one documented standard.",
    longDescription: "MGS maintains showroom floors and glass, service and parts departments, customer lounges and offices — degreasing in the bays, detailing where customers stand. Programs run around sales and service hours.",
    image: "/attached_assets/car dealerships_1752004563652.png",
    features: ["Showroom floor maintenance", "Service bay degreasing", "Customer lounge cleaning", "Window and glass detailing", "Exterior pressure washing", "Parts department organization"],
    benefits: ["Showroom ready before opening", "Service bay degreasing", "Scheduled around sales hours", "One standard across every department"],
  },
  {
    slug: "churches",
    title: "Church Cleaning Services",
    shortTitle: "Churches",
    category: "commercial",
    description: "Sanctuaries, fellowship halls, classrooms and nurseries, cleaned around your service calendar.",
    longDescription: "MGS cleans sanctuaries, fellowship halls, classrooms, nurseries and restrooms with EPA-registered products, sanitizing shared and children's spaces. Setup and turnover are coordinated around your calendar.",
    image: "/attached_assets/Official_About_Us_Background_1__1752010204354.png",
    features: ["Sanctuary and altar care", "Fellowship hall cleaning", "Nursery sanitization", "Classroom maintenance", "Restroom deep cleaning", "Event setup and teardown support"],
    benefits: ["EPA-registered products throughout", "Children's spaces sanitized", "Setup and turnover coordinated", "Worked around your service calendar"],
  },
  {
    slug: "multi-tenant-offices",
    title: "Multi-Tenant Office Cleaning",
    shortTitle: "Office Buildings",
    category: "commercial",
    description: "One standard across common areas, tenant suites and restrooms, under a single point of contact.",
    longDescription: "MGS handles lobbies, elevators, restrooms, individual suites and parking structures on schedules that vary tenant to tenant. Building management deals with one point of contact rather than one per floor.",
    image: "/images/office-desk-cleaning.jpg",
    features: ["Common area maintenance", "Individual suite cleaning", "Lobby and elevator care", "Restroom servicing", "Parking structure cleaning", "Administrative office cleaning"],
    benefits: ["One point of contact for the building", "Per-tenant schedules", "Common areas and suites to one standard", "Fewer tenant complaints to field"],
  },
  {
    slug: "restaurants",
    title: "Restaurant Cleaning Services",
    shortTitle: "Restaurants",
    category: "commercial",
    description: "Kitchen and hood-line deep cleaning, dining rooms and restrooms, kept inspection-ready.",
    longDescription: "MGS delivers kitchen and hood-line deep cleaning, dining-room maintenance, restroom sanitization and food-prep disinfection to health-code expectations. Work is scheduled around service hours.",
    image: "/attached_assets/MGS_Supply_And_Services_Gallery-VCT_Floor-10_1752003407188.jpg",
    features: ["Kitchen deep cleaning", "Hood and grease trap service", "Dining area maintenance", "Restroom sanitization", "Food prep area sterilization", "Health code compliance cleaning"],
    benefits: ["Health-code compliant", "Hood-line and grease control", "Scheduled around service", "Inspection-ready between visits"],
  },
  {
    slug: "retail-facilities",
    title: "Retail Facility Cleaning",
    shortTitle: "Retail",
    category: "commercial",
    description: "Sales floors, fitting rooms, storefront glass and stockrooms, on schedules that fit trading hours.",
    longDescription: "MGS maintains sales floors, fitting rooms, entrances, storefront glass, stockrooms and common areas across stores and centers of any size. Schedules fit trading hours and the standard matches the brand on the door.",
    image: "/attached_assets/MGS_Supply_And_Services_Gallery-Commercial-11_1752003063871.jpg",
    features: ["Sales floor maintenance", "Fitting room sanitization", "Display and shelf cleaning", "Entrance and storefront care", "Stockroom organization", "Customer service area maintenance"],
    benefits: ["Fits trading hours", "Storefront glass included", "Scales from one store to a center", "Consistent brand presentation"],
  },
  {
    slug: "schools",
    title: "School & University Cleaning",
    shortTitle: "Schools",
    category: "commercial",
    description: "Classrooms, cafeterias, gyms and labs disinfected with EPA-registered products cleared for occupied spaces.",
    longDescription: "MGS services classrooms, cafeterias, gymnasiums, laboratories and restrooms with EPA-registered products approved for occupied learning environments. Disinfection is scheduled to leave campuses ready each morning.",
    image: "/attached_assets/school image_1752005095720.png",
    features: ["Classroom sanitization", "Cafeteria deep cleaning", "Gymnasium maintenance", "Laboratory cleaning", "Restroom servicing", "Athletic facility cleaning and sanitization"],
    benefits: ["Products cleared for occupied rooms", "Shared-surface disinfection", "Ready before first period", "Reduced transmission risk"],
  },
  {
    slug: "gymnasiums",
    title: "Gymnasium Cleaning Services",
    shortTitle: "Gymnasiums",
    category: "commercial",
    description: "Equipment sanitization, locker rooms and wet areas, on a frequency matched to member traffic.",
    longDescription: "MGS sanitizes equipment and high-touch points, deep-cleans locker rooms, showers and pool areas, and maintains floors and mirrors. Frequency is set by member traffic, not by a fixed calendar.",
    image: "/attached_assets/commercial-cleaning-houston-health-clubs-01-150x150_1752003854215.jpeg",
    features: ["Equipment sanitization", "Locker room deep cleaning", "Shower and pool area maintenance", "Floor mat cleaning", "Mirror and glass care", "Athletic training facilities"],
    benefits: ["Frequency set by traffic", "High-touch equipment sanitized", "Locker rooms and wet areas", "Longer equipment life"],
  },
  // Medical
  {
    slug: "clinics",
    title: "Clinic & Private Practice Cleaning",
    shortTitle: "Clinics",
    category: "medical",
    description: "Exam rooms and patient areas disinfected with hospital-grade, EPA-registered products under infection-control protocol.",
    longDescription: "MGS performs terminal cleaning of exam rooms, disinfection of waiting and patient areas, and management of medical-waste zones with EPA-registered hospital-grade disinfectants. Results are ATP-verified and crews are trained on patient privacy.",
    image: "/attached_assets/private practice image_1752165223451.png",
    gallery: [
      {
        src: "/images/clinic-floor.jpg",
        title: "Floor care, on the schedule",
        caption:
          "Low-speed scrubbing of a clinical corridor floor. In a healthcare setting the floor is part of the infection-control picture — cleaned on a schedule and worked around patient traffic, not squeezed in after hours as an afterthought.",
      },
    ],
    features: ["Exam room terminal cleaning", "Waiting area sanitization", "Medical waste area management", "EPA-registered disinfectants", "HIPAA-compliant practices", "ATP testing verification"],
    benefits: ["Hospital-grade disinfectants", "ATP-verified results", "Medical-waste zones managed", "Crews trained on patient privacy"],
  },
  {
    slug: "surgery-centers",
    title: "Surgery Center Cleaning",
    shortTitle: "Surgery Centers",
    category: "medical",
    description: "Terminal cleaning and infection control for ambulatory surgical centers, to AORN and Joint Commission standards.",
    longDescription: "MGS crews perform terminal cleaning of operating rooms between cases, service pre-op and PACU areas, and maintain sterile processing to AORN and Joint Commission guidelines. Every result is ATP-tested and documented for accreditation.",
    image: "/images/surgery-center.jpg",
    gallery: [
      {
        src: "/images/surgery-center-cleaning.jpg",
        title: "Terminal cleaning, done right",
        caption:
          "Full PPE, a HEPA backpack vac, and a room-by-room protocol between cases — the way an OR has to be turned over to hold up to AORN and Joint Commission standards.",
      },
      {
        src: "/images/surgery-center-floor.jpg",
        title: "Floors held to the same protocol",
        caption:
          "Auto-scrubbing a surgical suite during a deep clean. In this environment the floor answers to the same standard as every other surface — cleaned and documented, not just mopped.",
      },
    ],
    features: ["Operating room terminal cleaning", "Pre-op and PACU cleaning", "Sterile processing area maintenance", "AORN guideline compliance", "ATP testing and documentation for compliance", "Air filtration system cleaning"],
    benefits: ["AORN and Joint Commission standards", "Terminal cleaning between cases", "ATP-tested and documented", "Supports accreditation review"],
  },
  {
    slug: "imaging-facilities",
    title: "Imaging Facility Cleaning",
    shortTitle: "Imaging Centers",
    category: "medical",
    description: "MRI, CT, X-ray and ultrasound suites cleaned to room-specific protocols that protect the hardware.",
    longDescription: "MGS follows room-specific protocols for MRI, CT, X-ray and ultrasound environments, using equipment-safe products and observing magnetic- and radiation-safety requirements. Patient-prep areas are sanitized to clinical standard.",
    image: "/attached_assets/imaging center image_1752168794610.png",
    features: ["MRI suite cleaning protocols", "CT room maintenance", "Patient prep area sanitization", "Equipment-safe cleaning products", "Emergency imaging services", "Radiation safety compliance"],
    benefits: ["Equipment-safe products", "Magnetic- and radiation-safety trained", "Room-specific protocols", "No risk to imaging hardware"],
  },
  {
    slug: "laboratories",
    title: "Laboratory Cleaning Services",
    shortTitle: "Laboratories",
    category: "medical",
    description: "Biosafety-aware cleaning of cabinets, fume hoods and controlled environments.",
    longDescription: "MGS crews are trained in biosafety protocol, chemical handling and cleanroom-rated procedure. Cabinets, fume hoods and controlled environments are serviced in a sequence designed to prevent cross-contamination.",
    image: "/attached_assets/laboratories image_1752167124287.png",
    features: ["Biosafety cabinet cleaning", "Fume hood maintenance", "Controlled environment protocols", "Chemical spill response", "Cleanroom-rated procedures", "Air purification during and after cleaning"],
    benefits: ["Biosafety-trained crews", "Cleanroom-rated procedure", "Cross-contamination sequencing", "Research integrity preserved"],
  },
  {
    slug: "sports-rehabilitation",
    title: "Sports Rehabilitation Facility Cleaning",
    shortTitle: "Sports Rehab",
    category: "medical",
    description: "Treatment tables, hydrotherapy equipment and high-touch surfaces sanitized on a traffic-matched frequency.",
    longDescription: "MGS sanitizes treatment rooms, hydrotherapy areas, exercise equipment and locker rooms on a frequency set by patient traffic. The protocol is written for recovering and immunocompromised patients.",
    image: "/images/sports-rehab.jpg",
    gallery: [
      {
        src: "/images/sports-rehab-2.jpg",
        title: "Every surface, every machine",
        caption:
          "Treatment tables, hydrotherapy gear, and the high-touch points athletes cycle through all day — wiped down and verified, not just tidied.",
      },
    ],
    features: ["Treatment room sanitization", "Hydrotherapy pool maintenance", "Equipment cleaning", "Locker room servicing", "Physical therapy area care", "Athletic training facilities"],
    benefits: ["Frequency set by patient traffic", "Hydrotherapy equipment included", "Written for immunocompromised patients", "Longer equipment life"],
  },
  {
    slug: "terminal-sanitization",
    title: "Terminal Sanitization Services",
    shortTitle: "Terminal Cleaning",
    category: "medical",
    description: "Whole-room disinfection with UV-C, electrostatic application and hospital-grade chemistry, ATP-verified.",
    longDescription: "MGS combines EPA-registered hospital-grade chemistry with UV-C and electrostatic application for room turnover in patient rooms, ORs and critical-care areas. Every room is ATP-tested and documented.",
    image: "/attached_assets/ICU image_1752163777393.png",
    features: ["UV-C disinfection technology", "Electrostatic spraying", "Hospital-grade disinfectants", "ATP testing results", "Complete room turnover", "Air filtration system maintenance"],
    benefits: ["UV-C and electrostatic application", "EPA-registered hospital-grade chemistry", "ATP-tested every room", "Targets healthcare-associated infection"],
  },
  // Industrial
  {
    slug: "factory-plants",
    title: "Factory & Plant Cleaning Services",
    shortTitle: "Factories",
    category: "industrial",
    description: "Production floors, assembly lines and loading docks, cleaned to OSHA-compliant procedure.",
    longDescription: "MGS services production floors, assembly lines, loading docks and support offices with industrial-grade equipment and OSHA-compliant procedure. Degreasing, dust and debris control and scheduled deep cleaning keep the floor safe and the facility audit-ready.",
    image: "/attached_assets/factory plant image_1752262345888.png",
    features: ["Production floor cleaning", "Assembly line maintenance", "Heavy equipment degreasing", "Loading dock pressure washing", "OSHA compliance cleaning", "Air filtration system cleaning"],
    benefits: ["OSHA-compliant procedure", "Degreasing and dust control", "Works around production schedules", "Audit-ready between visits"],
  },
  {
    slug: "warehouses",
    title: "Warehouse Cleaning Services",
    shortTitle: "Warehouses",
    category: "industrial",
    description: "Ride-on floor scrubbing, rack cleaning and dock maintenance, scaled to high-square-footage sites.",
    longDescription: "MGS deploys ride-on scrubbers and industrial crews for aisle and floor maintenance, rack and shelving cleaning, dock areas and office space. Dust is controlled and walkways stay compliant under constant forklift traffic.",
    image: "/attached_assets/16_1__1752185614631.png",
    features: ["Aisle and floor maintenance", "Rack and shelving cleaning", "Dock area maintenance", "Office space cleaning", "Restroom servicing", "Concrete floor scrubbing"],
    benefits: ["Ride-on scrubbers for large floors", "Rack and high-shelf cleaning", "Dock and walkway compliance", "Scales to any square footage"],
  },
  {
    slug: "petrochemical-plants",
    title: "Petrochemical Plant Cleaning",
    shortTitle: "Petrochemical",
    category: "industrial",
    description: "HAZWOPER-certified crews for control rooms, administrative areas and decontamination zones.",
    longDescription: "MGS deploys HAZWOPER-certified personnel to control rooms, administrative areas and decontamination zones, using chemical-compatible products. Procedure is documented to satisfy site safety and regulatory requirements.",
    image: "/attached_assets/commercial-claning-housong-chemical-plants_1752268757986.jpeg",
    features: ["Control room cleaning", "Administrative area maintenance", "Decontamination zone protocols", "HAZWOPER-certified personnel", "Chemical-safe cleaning products", "Air filtration system cleaning"],
    benefits: ["HAZWOPER-certified personnel", "Chemical-compatible products", "Documented procedure", "Meets site safety requirements"],
  },
  {
    slug: "hydroelectric-plants",
    title: "Hydroelectric Plant Cleaning",
    shortTitle: "Hydroelectric",
    category: "industrial",
    description: "Security-cleared crews for control rooms, turbine halls and administrative areas.",
    longDescription: "MGS maintains control rooms, turbine halls, administrative offices and visitor areas with security-cleared, safety-trained crews. Access and documentation meet the requirements critical-infrastructure sites operate under.",
    image: "/attached_assets/21_1__1752264204538.png",
    features: ["Control room maintenance", "Administrative office cleaning", "Visitor center care", "Safety-compliant protocols", "High-security area access", "Turbine hall cleaning"],
    benefits: ["Security-cleared crews", "Critical-infrastructure access protocol", "Safety-trained for live plant", "Documentation on every visit"],
  },
  // Additional Services
  {
    slug: "concrete-floors",
    title: "Concrete Floor Cleaning Services",
    shortTitle: "Concrete Floors",
    category: "additional",
    description: "Diamond grinding and polishing, epoxy coating and antimicrobial urethane-cement systems.",
    longDescription: "MGS provides industrial cleaning, diamond grinding and polishing, epoxy coating and antimicrobial urethane-cement systems with cove-base integration. The result adds ADA-compliant slip resistance and extends floor life.",
    image: "/attached_assets/MGS_Supply_And_Services_Gallery-Concrete-8_1752005273591.jpg",
    features: ["Diamond grinding and polishing", "Epoxy coating systems", "Antimicrobial urethane cement with cove base integration", "Stain removal", "Slip resistance treatment", "Advanced Coating Systems"],
    benefits: ["Diamond grinding and polishing", "Epoxy and urethane-cement systems", "ADA-compliant slip resistance", "Extends floor life"],
  },
  {
    slug: "post-construction",
    title: "Post-Construction Cleanup",
    shortTitle: "Post-Construction",
    category: "additional",
    description: "Debris removal, dust abatement and final detailing that hands over a move-in-ready facility.",
    longDescription: "MGS runs the full post-construction sequence: debris removal, dust abatement across every surface, window and glass cleaning, floor scrubbing and sealing, and final detailing. The schedule is built around the handover date.",
    image: "/attached_assets/post construction image_1752524176668.png",
    features: ["Debris removal", "Construction dust elimination", "Window and glass cleaning", "Floor scrubbing and sealing", "HVAC vent cleaning", "Final detail cleaning"],
    benefits: ["Full post-construction sequence", "Dust abatement on every surface", "Built around the handover date", "Move-in ready on completion"],
  },
  {
    slug: "industrial-cleanup",
    title: "Industrial Cleanup Services",
    shortTitle: "Industrial Cleanup",
    category: "additional",
    description: "Chemical spill response, decontamination and facility restoration, scheduled or 24/7.",
    longDescription: "MGS fields certified crews for chemical-spill response, accident-site cleaning, equipment decontamination and facility restoration. Response is available 24/7, executed to regulatory procedure and documented for compliance.",
    image: "/attached_assets/image for industrial_1752529190864.png",
    features: ["Chemical spill response", "Accident site cleaning", "Equipment decontamination", "Facility restoration", "Certified Response Teams", "Emergency response available 24/7"],
    benefits: ["24/7 emergency response", "Certified response crews", "Executed to regulatory procedure", "Documented for compliance"],
  },
  {
    slug: "power-washing",
    title: "Power Washing Services",
    shortTitle: "Power Washing",
    category: "additional",
    description: "Building exteriors, parking structures, sidewalks and loading docks, cleaned to runoff requirements.",
    longDescription: "MGS power-washes building exteriors, parking structures, sidewalks, entrances and loading docks with industrial equipment and environmentally responsible solutions. Slip and trip hazards go with the grime, and runoff requirements are met.",
    image: "/attached_assets/19_1__1752521150706.png",
    features: ["Building exterior washing", "Parking structure cleaning", "Sidewalk and entrance cleaning", "Loading dock pressure washing", "Graffiti removal", "Fleet vehicle washing"],
    benefits: ["Industrial pressure equipment", "Removes slip and trip hazards", "Meets runoff requirements", "Restores exterior appearance"],
  },
  {
    slug: "windows",
    title: "Window Cleaning Services",
    shortTitle: "Windows",
    category: "additional",
    description: "Interior and exterior glass from storefronts to high-rise, including skylights and architectural features.",
    longDescription: "MGS handles interior and exterior window cleaning at any height, including high-rise access, architectural glass, skylights and hard-water stain removal. Schedules keep the envelope consistently clear.",
    image: "/attached_assets/7_1__1752265131708.png",
    features: ["Interior and exterior cleaning", "High-rise window washing", "Architectural glass features", "Screen cleaning and repair", "Hard water stain removal", "Skylight cleaning"],
    benefits: ["Any height, including high-rise", "Skylights and architectural glass", "Hard-water stain removal", "Maintainable schedule"],
  },
  {
    slug: "upholstery",
    title: "Upholstery Cleaning Services",
    shortTitle: "Upholstery",
    category: "additional",
    description: "Hot-water extraction and fabric-specific treatment for commercial upholstery and carpet.",
    longDescription: "MGS uses hot-water extraction, low-moisture methods and fabric-specific treatments to lift the soil, allergens and odor vacuuming leaves behind. Protection is applied afterward, at a fraction of the cost of replacement.",
    image: "/attached_assets/MGS_Supply_And_Services_Gallery-Carpet_Shampooing-1_1752528755838.jpg",
    features: ["Hot water extraction", "Dry cleaning methods", "Stain treatment and removal", "Fabric protection application", "Carpet shampooing", "Odor elimination"],
    benefits: ["Hot-water extraction", "Fabric-specific treatment", "Improves indoor air quality", "Cheaper than replacement"],
  },
  {
    slug: "specialized-cleaning",
    title: "Specialized Cleaning Services",
    shortTitle: "Specialized",
    category: "additional",
    description: "Custom programs for biohazard remediation, controlled environments, data centers and disaster restoration.",
    longDescription: "MGS builds custom programs for biohazard remediation, controlled-environment and data-center cleaning, and disaster restoration. Each one deploys certified teams, specialized equipment and a protocol written for the requirement.",
    image: "/attached_assets/terminal sanitization_1752528525894.png",
    features: ["Biohazard remediation", "Controlled environment cleaning", "Data center maintenance", "Disaster restoration", "Advanced Equipment Deployment", "Custom protocol development"],
    benefits: ["Certified specialist teams", "Protocol written per requirement", "Specialized equipment", "Scoped to non-standard work"],
  },
];

export const serviceCategories = [
  {
    id: "commercial",
    name: "Commercial Services",
    description: "Recurring janitorial programs for offices, retail, restaurants, and commercial facilities across greater Houston.",
    icon: "Building2",
  },
  {
    id: "medical",
    name: "Medical Services",
    description: "Infection-control cleaning for clinics, laboratories, and surgical centers, executed to healthcare standards.",
    icon: "Heart",
  },
  {
    id: "industrial",
    name: "Industrial Services",
    description: "Heavy-duty cleaning for plants, warehouses, and processing facilities, scoped to the hazards involved.",
    icon: "Factory",
  },
  {
    id: "additional",
    name: "Additional Services",
    description: "Project-based and specialized work — floor systems, post-construction, power washing, and restoration.",
    icon: "Sparkles",
  },
] as const;

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter((s) => s.category === category);
}

export function getAllSlugs(): string[] {
  return services.map((s) => s.slug);
}
