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
    description: "Security-conscious janitorial service for banks and credit unions — lobbies, teller lines, offices, and ATM vestibules, on a schedule that works around your hours.",
    longDescription: "Financial facilities carry a specific set of requirements: a spotless public-facing presentation, controlled after-hours access, and staff who understand security protocol. MGS services lobbies, teller lines, private offices, ATM vestibules, and vault approaches with vetted, background-checked crews, scheduled to avoid disruption to banking operations. Every visit is documented against our QA protocol.",
    image: "/attached_assets/Official_About_Us_Background_1__1752010002961.png",
    features: ["Lobby and teller area maintenance", "ATM and kiosk cleaning", "Vault area cleaning", "Security-compliant protocols", "After-hours service available", "Customer-facing area detailing"],
    benefits: ["Enhanced customer experience", "Security-compliant cleaning", "Flexible scheduling around operations", "Consistent pristine presentation"],
  },
  {
    slug: "car-dealerships",
    title: "Car Dealership Cleaning Services",
    shortTitle: "Car Dealerships",
    category: "commercial",
    description: "Janitorial service for automotive dealerships — showroom glass and floors, service bays, and customer lounges held to the standard a premium purchase deserves.",
    longDescription: "A dealership sells an experience before it sells a vehicle, and presentation is part of the product. MGS maintains showroom floors and glass, service and parts departments, customer lounges, and offices — degreasing where it is needed, detailing where it shows. Programs are scheduled around sales and service hours and held to a consistent, documented standard.",
    image: "/attached_assets/car dealerships_1752004563652.png",
    features: ["Showroom floor maintenance", "Service bay degreasing", "Customer lounge cleaning", "Window and glass detailing", "Exterior pressure washing", "Parts department organization"],
    benefits: ["Premium showroom presentation", "Improved customer confidence", "Enhanced buying environment", "Automotive showroom and service area cleaning"],
  },
  {
    slug: "churches",
    title: "Church Cleaning Services",
    shortTitle: "Churches",
    category: "commercial",
    description: "Respectful, thorough janitorial service for churches and worship facilities — sanctuaries, fellowship halls, classrooms, and nurseries ready for every service and event.",
    longDescription: "Worship facilities move between quiet weekdays and high-traffic services and events, and cleanliness supports both. MGS cares for sanctuaries, fellowship halls, classrooms, nurseries, and restrooms with EPA-registered products — sanitizing shared and children's spaces and coordinating setup and turnover around your calendar.",
    image: "/attached_assets/Official_About_Us_Background_1__1752010204354.png",
    features: ["Sanctuary and altar care", "Fellowship hall cleaning", "Nursery sanitization", "Classroom maintenance", "Restroom deep cleaning", "Event setup and teardown support"],
    benefits: ["Welcoming worship environment", "Sanitized nursery areas", "Ready for events and services", "Respectful care of sacred spaces"],
  },
  {
    slug: "multi-tenant-offices",
    title: "Multi-Tenant Office Cleaning",
    shortTitle: "Office Buildings",
    category: "commercial",
    description: "Recurring janitorial service for multi-tenant office buildings — common areas, suites, and restrooms held to a consistent standard across every tenant.",
    longDescription: "Multi-tenant buildings demand coordination: one standard applied across common areas and independent suites, on schedules that vary tenant to tenant. MGS handles lobbies, elevators, restrooms, individual offices, and parking structures under a single point of contact for building management — so presentation stays consistent for every tenant and managers field fewer complaints.",
    image: "/attached_assets/Untitled design_1752001861995.png",
    features: ["Common area maintenance", "Individual suite cleaning", "Lobby and elevator care", "Restroom servicing", "Parking structure cleaning", "Administrative office cleaning"],
    benefits: ["Consistent quality across all tenants", "Flexible scheduling per tenant", "Single point of contact for building management", "Professional appearance maintained"],
  },
  {
    slug: "restaurants",
    title: "Restaurant Cleaning Services",
    shortTitle: "Restaurants",
    category: "commercial",
    description: "Health-code-focused janitorial and kitchen deep cleaning for restaurants and food-service operations — front and back of house kept inspection-ready.",
    longDescription: "In food service, cleanliness is a compliance requirement before it is a presentation one. MGS delivers kitchen and hood-line deep cleaning, dining-room maintenance, restroom sanitization, and food-prep-area disinfection aligned to health-code expectations. Programs are scheduled around service and built to keep the facility inspection-ready.",
    image: "/attached_assets/MGS_Supply_And_Services_Gallery-VCT_Floor-10_1752003407188.jpg",
    features: ["Kitchen deep cleaning", "Hood and grease trap service", "Dining area maintenance", "Restroom sanitization", "Food prep area sterilization", "Health code compliance cleaning"],
    benefits: ["Health inspection ready", "Safe food preparation environment", "Enhanced dining experience", "Food service industry cleaning protocols"],
  },
  {
    slug: "retail-facilities",
    title: "Retail Facility Cleaning",
    shortTitle: "Retail",
    category: "commercial",
    description: "Janitorial service for retail stores and shopping centers — sales floors, fitting rooms, and storefronts kept clean enough to protect the sale.",
    longDescription: "Retail presentation directly affects dwell time and conversion. MGS maintains sales floors, fitting rooms, entrances, storefront glass, stockrooms, and common areas across stores and centers of any size — on schedules that fit trading hours and to a standard that reflects the brand on the door.",
    image: "/attached_assets/MGS_Supply_And_Services_Gallery-Commercial-11_1752003063871.jpg",
    features: ["Sales floor maintenance", "Fitting room sanitization", "Display and shelf cleaning", "Entrance and storefront care", "Stockroom organization", "Customer service area maintenance"],
    benefits: ["Inviting shopping environment", "Clean fitting rooms boost sales", "Professional storefront appearance", "Appliance store flooring"],
  },
  {
    slug: "schools",
    title: "School & University Cleaning",
    shortTitle: "Schools",
    category: "commercial",
    description: "Janitorial and disinfection service for schools and universities — classrooms, cafeterias, gyms, and labs maintained with EPA-registered products safe for students and staff.",
    longDescription: "Educational facilities concentrate people and shared surfaces, which makes disinfection a health measure, not just presentation. MGS services classrooms, cafeterias, gymnasiums, laboratories, and restrooms using EPA-registered products appropriate for occupied learning environments — reducing transmission risk while keeping campuses ready each day.",
    image: "/attached_assets/school image_1752005095720.png",
    features: ["Classroom sanitization", "Cafeteria deep cleaning", "Gymnasium maintenance", "Laboratory cleaning", "Restroom servicing", "Athletic facility cleaning and sanitization"],
    benefits: ["Healthy learning environment", "EPA-approved safe products", "Reduced student illness", "Athletic equipment storage cleaning"],
  },
  {
    slug: "gymnasiums",
    title: "Gymnasium Cleaning Services",
    shortTitle: "Gymnasiums",
    category: "commercial",
    description: "Janitorial and equipment sanitization for gyms and fitness facilities — high-touch equipment, locker rooms, and wet areas kept hygienic and member-ready.",
    longDescription: "Fitness facilities cycle high volumes of skin contact and moisture — the conditions bacteria and fungus prefer. MGS sanitizes equipment and high-touch points, deep-cleans locker rooms, showers, and pool areas, and maintains floors and mirrors — protecting members and extending the life of the equipment they use.",
    image: "/attached_assets/commercial-cleaning-houston-health-clubs-01-150x150_1752003854215.jpeg",
    features: ["Equipment sanitization", "Locker room deep cleaning", "Shower and pool area maintenance", "Floor mat cleaning", "Mirror and glass care", "Athletic training facilities"],
    benefits: ["Reduced infection risk", "Equipment longevity", "Member satisfaction", "Athletic Support Facilities"],
  },
  // Medical
  {
    slug: "clinics",
    title: "Clinic & Private Practice Cleaning",
    shortTitle: "Clinics",
    category: "medical",
    description: "Medical-grade janitorial service for clinics and private practices — exam rooms and patient areas disinfected with hospital-grade, EPA-registered products under infection-control protocol.",
    longDescription: "Outpatient clinics and private practices carry hospital-level infection-control expectations on a commercial footprint. MGS performs terminal cleaning of exam rooms, disinfection of waiting and patient areas, and management of medical-waste zones using EPA-registered, hospital-grade disinfectants — with ATP verification and practices that respect patient privacy.",
    image: "/attached_assets/private practice image_1752165223451.png",
    features: ["Exam room terminal cleaning", "Waiting area sanitization", "Medical waste area management", "EPA-registered disinfectants", "HIPAA-compliant practices", "ATP testing verification"],
    benefits: ["Infection control compliance", "Patient confidence", "Regulatory readiness", "ATP Testing Verification"],
  },
  {
    slug: "surgery-centers",
    title: "Surgery Center Cleaning",
    shortTitle: "Surgery Centers",
    category: "medical",
    description: "Terminal cleaning and infection control for ambulatory surgical centers, executed to AORN and Joint Commission standards.",
    longDescription: "Ambulatory surgical centers hold the tightest cleanliness standard in outpatient care. MGS crews perform terminal cleaning of operating rooms between cases, service pre-op and PACU areas, and maintain sterile processing to AORN and Joint Commission guidelines. Results are ATP-tested and documented, supporting surgical-site-infection prevention and accreditation.",
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
    benefits: ["Surgical site infection prevention", "Accreditation compliance", "Complete facility sanitization services", "Alignment with accreditation standards for healthcare organizations"],
  },
  {
    slug: "imaging-facilities",
    title: "Imaging Facility Cleaning",
    shortTitle: "Imaging Centers",
    category: "medical",
    description: "Equipment-safe janitorial service for diagnostic imaging and radiology — MRI, CT, X-ray, and ultrasound suites cleaned to protocols that protect sensitive hardware.",
    longDescription: "Imaging suites pair patient-care hygiene with millions of dollars of sensitive equipment, and the two require different handling. MGS teams follow room-specific protocols for MRI, CT, X-ray, and ultrasound environments — using equipment-safe products, observing magnetic-safety and radiation-safety requirements, and sanitizing patient-prep areas without risk to the hardware.",
    image: "/attached_assets/imaging center image_1752168794610.png",
    features: ["MRI suite cleaning protocols", "CT room maintenance", "Patient prep area sanitization", "Equipment-safe cleaning products", "Emergency imaging services", "Radiation safety compliance"],
    benefits: ["Equipment protection", "Patient safety", "Regulatory compliance", "Emergency imaging services"],
  },
  {
    slug: "laboratories",
    title: "Laboratory Cleaning Services",
    shortTitle: "Laboratories",
    category: "medical",
    description: "Contamination-controlled janitorial service for laboratories — biosafety-aware cleaning of cabinets, fume hoods, and controlled environments that protects research integrity.",
    longDescription: "Laboratory cleaning is a contamination-control problem first. MGS crews are trained in biosafety protocol, chemical handling, and cleanroom-rated procedure — servicing biosafety cabinets, fume hoods, and controlled environments in a sequence designed to prevent cross-contamination and preserve the integrity of the work being done.",
    image: "/attached_assets/laboratories image_1752167124287.png",
    features: ["Biosafety cabinet cleaning", "Fume hood maintenance", "Controlled environment protocols", "Chemical spill response", "Cleanroom-rated procedures", "Air purification during and after cleaning"],
    benefits: ["Cross-contamination prevention", "Regulatory compliance", "Research integrity", "Airborne pathogen capture"],
  },
  {
    slug: "sports-rehabilitation",
    title: "Sports Rehabilitation Facility Cleaning",
    shortTitle: "Sports Rehab",
    category: "medical",
    description: "Hygienic janitorial service for sports medicine and rehabilitation centers — treatment tables, hydrotherapy equipment, and high-touch surfaces sanitized on a traffic-matched frequency.",
    longDescription: "Rehabilitation facilities move recovering patients across shared tables, hydrotherapy equipment, and training gear all day. MGS sanitizes treatment rooms, hydrotherapy areas, exercise equipment, and locker rooms on a frequency matched to that traffic — protecting recovering and immunocompromised patients and extending equipment life.",
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
    benefits: ["Infection prevention", "Patient safety", "Equipment longevity", "Athletic Support Facilities"],
  },
  {
    slug: "terminal-sanitization",
    title: "Terminal Sanitization Services",
    shortTitle: "Terminal Cleaning",
    category: "medical",
    description: "Terminal cleaning and whole-room disinfection for healthcare — UV-C, electrostatic application, and hospital-grade disinfectants with documented, ATP-verified results.",
    longDescription: "Terminal sanitization is the deepest level of healthcare disinfection, reserved for room turnover in patient rooms, ORs, and critical-care areas. MGS combines EPA-registered hospital-grade chemistry with UV-C and electrostatic application, then verifies the result with ATP testing and documentation — directly targeting healthcare-associated infection rates and supporting accreditation.",
    image: "/attached_assets/ICU image_1752163777393.png",
    features: ["UV-C disinfection technology", "Electrostatic spraying", "Hospital-grade disinfectants", "ATP testing results", "Complete room turnover", "Air filtration system maintenance"],
    benefits: ["Healthcare-associated infection reduction", "Accreditation support", "Documented disinfection verification", "Advanced Sanitization Technology"],
  },
  // Industrial
  {
    slug: "factory-plants",
    title: "Factory & Plant Cleaning Services",
    shortTitle: "Factories",
    category: "industrial",
    description: "Heavy-duty janitorial and production-floor cleaning for manufacturing plants, scoped to the hazards of the environment.",
    longDescription: "Manufacturing environments combine heavy soil, moving equipment, and strict safety rules. MGS services production floors, assembly lines, loading docks, and support offices with industrial-grade equipment and OSHA-compliant procedure — degreasing, dust and debris control, and scheduled deep cleaning that keeps the line safe and the facility audit-ready.",
    image: "/attached_assets/factory plant image_1752262345888.png",
    features: ["Production floor cleaning", "Assembly line maintenance", "Heavy equipment degreasing", "Loading dock pressure washing", "OSHA compliance cleaning", "Air filtration system cleaning"],
    benefits: ["Workplace safety improvement", "OSHA compliance", "Equipment longevity", "Asset preservation programs"],
  },
  {
    slug: "warehouses",
    title: "Warehouse Cleaning Services",
    shortTitle: "Warehouses",
    category: "industrial",
    description: "Industrial janitorial service for warehouses and distribution centers — floor scrubbing, rack cleaning, and dock maintenance scaled to high-square-footage operations.",
    longDescription: "Warehouse cleaning is a matter of scale and safety: large concrete floors, tall racking, and constant forklift and dock traffic. MGS deploys ride-on scrubbers and industrial crews for aisle and floor maintenance, rack and shelving cleaning, dock areas, and office space — controlling dust and keeping walkways and work zones compliant.",
    image: "/attached_assets/16_1__1752185614631.png",
    features: ["Aisle and floor maintenance", "Rack and shelving cleaning", "Dock area maintenance", "Office space cleaning", "Restroom servicing", "Concrete floor scrubbing"],
    benefits: ["Safety compliance", "Organized workspace", "Dust and debris control", "Aisle and floor maintenance"],
  },
  {
    slug: "petrochemical-plants",
    title: "Petrochemical Plant Cleaning",
    shortTitle: "Petrochemical",
    category: "industrial",
    description: "HAZWOPER-certified janitorial service for petrochemical and chemical-processing facilities — control rooms, admin areas, and decontamination zones cleaned to strict safety protocol.",
    longDescription: "Petrochemical facilities operate under hazard controls that most contractors are not equipped for. MGS deploys HAZWOPER-certified personnel for control rooms, administrative areas, and decontamination zones — using chemical-compatible products and documented procedure that satisfies site safety and regulatory requirements.",
    image: "/attached_assets/commercial-claning-housong-chemical-plants_1752268757986.jpeg",
    features: ["Control room cleaning", "Administrative area maintenance", "Decontamination zone protocols", "HAZWOPER-certified personnel", "Chemical-safe cleaning products", "Air filtration system cleaning"],
    benefits: ["Safety compliance", "Hazardous material handling", "Regulatory documentation", "All safety standards met"],
  },
  {
    slug: "hydroelectric-plants",
    title: "Hydroelectric Plant Cleaning",
    shortTitle: "Hydroelectric",
    category: "industrial",
    description: "Security-cleared janitorial service for hydroelectric and power-generation facilities — control rooms, turbine halls, and administrative areas maintained under strict access protocol.",
    longDescription: "Power-generation sites are critical infrastructure with access and safety protocols to match. MGS maintains control rooms, turbine halls, administrative offices, and visitor areas with security-cleared, safety-trained crews — meeting the documentation and access requirements that energy facilities operate under.",
    image: "/attached_assets/21_1__1752264204538.png",
    features: ["Control room maintenance", "Administrative office cleaning", "Visitor center care", "Safety-compliant protocols", "High-security area access", "Turbine hall cleaning"],
    benefits: ["Regulatory compliance", "Safety-first approach", "Critical infrastructure cleanliness", "All safety standards met"],
  },
  // Additional Services
  {
    slug: "concrete-floors",
    title: "Concrete Floor Cleaning Services",
    shortTitle: "Concrete Floors",
    category: "additional",
    description: "Concrete floor cleaning, diamond polishing, and coating — epoxy and antimicrobial urethane-cement systems for commercial, medical, and industrial floors.",
    longDescription: "Concrete is durable but not maintenance-free, and the right treatment depends on the environment. MGS provides industrial cleaning, diamond grinding and polishing, epoxy coating, and antimicrobial urethane-cement systems with cove-base integration — restoring appearance, adding ADA-compliant slip resistance, and extending floor life across commercial, medical, and industrial settings.",
    image: "/attached_assets/MGS_Supply_And_Services_Gallery-Concrete-8_1752005273591.jpg",
    features: ["Diamond grinding and polishing", "Epoxy coating systems", "Antimicrobial urethane cement with cove base integration", "Stain removal", "Slip resistance treatment", "Advanced Coating Systems"],
    benefits: ["Extended floor lifespan", "ADA slip resistance compliant", "Aesthetic appeal", "Aesthetics"],
  },
  {
    slug: "post-construction",
    title: "Post-Construction Cleanup",
    shortTitle: "Post-Construction",
    category: "additional",
    description: "Post-construction cleanup — debris removal, dust abatement, and final detailing that turns a finished build into a move-in-ready facility.",
    longDescription: "New construction and renovation leave behind fine dust and debris that ordinary cleaning will not clear. MGS handles the full post-construction sequence — debris removal, dust abatement across every surface, window and glass cleaning, floor scrubbing and sealing, and final detailing — turning a completed build into a move-in-ready facility on the project's timeline.",
    image: "/attached_assets/post construction image_1752524176668.png",
    features: ["Debris removal", "Construction dust elimination", "Window and glass cleaning", "Floor scrubbing and sealing", "HVAC vent cleaning", "Final detail cleaning"],
    benefits: ["Move-in ready spaces", "Dust-free environment", "Professional finish", "Debris hauled off, not left in a corner"],
  },
  {
    slug: "industrial-cleanup",
    title: "Industrial Cleanup Services",
    shortTitle: "Industrial Cleanup",
    category: "additional",
    description: "Scheduled and 24/7 emergency industrial cleanup — chemical spill response, decontamination, and facility restoration by certified response crews.",
    longDescription: "Industrial cleanup covers both planned deep cleaning and unplanned events. MGS fields certified crews for chemical-spill response, accident-site cleaning, equipment decontamination, and facility restoration — available 24/7, executed to regulatory procedure, and documented for compliance.",
    image: "/attached_assets/image for industrial_1752529190864.png",
    features: ["Chemical spill response", "Accident site cleaning", "Equipment decontamination", "Facility restoration", "Certified Response Teams", "Emergency response available 24/7"],
    benefits: ["Rapid deployment teams available around the clock", "Certified cleanup procedures", "Regulatory compliance documentation", "Complete restoration services"],
  },
  {
    slug: "power-washing",
    title: "Power Washing Services",
    shortTitle: "Power Washing",
    category: "additional",
    description: "Commercial and industrial pressure washing — building exteriors, parking structures, sidewalks, and loading docks restored with environmentally responsible methods.",
    longDescription: "Exterior surfaces accumulate grime, mold, and staining that degrade both appearance and safety. MGS power-washes building exteriors, parking structures, sidewalks, entrances, and loading docks with industrial equipment and environmentally responsible solutions — restoring curb appeal and removing slip and trip hazards while meeting runoff requirements.",
    image: "/attached_assets/19_1__1752521150706.png",
    features: ["Building exterior washing", "Parking structure cleaning", "Sidewalk and entrance cleaning", "Loading dock pressure washing", "Graffiti removal", "Fleet vehicle washing"],
    benefits: ["Curb appeal improvement", "Safety hazard removal", "Property value protection", "Environmental compliance"],
  },
  {
    slug: "windows",
    title: "Window Cleaning Services",
    shortTitle: "Windows",
    category: "additional",
    description: "Interior and exterior commercial window cleaning — storefronts to high-rise glass, including architectural features and skylights, on a maintainable schedule.",
    longDescription: "Clean glass changes how a building reads from the street and how much daylight reaches the people inside. MGS handles interior and exterior window cleaning for properties of every height — including high-rise access, architectural glass, skylights, and hard-water stain removal — on schedules that keep the envelope consistently clear.",
    image: "/attached_assets/7_1__1752265131708.png",
    features: ["Interior and exterior cleaning", "High-rise window washing", "Architectural glass features", "Screen cleaning and repair", "Hard water stain removal", "Skylight cleaning"],
    benefits: ["Enhanced natural light", "Professional building appearance", "Extended window lifespan", "Improved tenant satisfaction"],
  },
  {
    slug: "upholstery",
    title: "Upholstery Cleaning Services",
    shortTitle: "Upholstery",
    category: "additional",
    description: "Commercial upholstery and carpet cleaning — hot-water extraction and fabric-specific treatments that extend furnishing life and improve indoor air quality.",
    longDescription: "Soft furnishings hold soil, allergens, and odor that vacuuming cannot remove. MGS uses hot-water extraction, low-moisture methods, and fabric-specific treatments for commercial upholstery and carpet — lifting stains, applying protection, and improving indoor air quality at a fraction of the cost of replacement.",
    image: "/attached_assets/MGS_Supply_And_Services_Gallery-Carpet_Shampooing-1_1752528755838.jpg",
    features: ["Hot water extraction", "Dry cleaning methods", "Stain treatment and removal", "Fabric protection application", "Carpet shampooing", "Odor elimination"],
    benefits: ["Extended furniture lifespan", "Improved indoor air quality", "Professional appearance", "Cost savings vs. replacement"],
  },
  {
    slug: "specialized-cleaning",
    title: "Specialized Cleaning Services",
    shortTitle: "Specialized",
    category: "additional",
    description: "Custom janitorial programs for non-standard requirements — biohazard remediation, data-center cleaning, controlled environments, and disaster restoration.",
    longDescription: "Some environments fall outside a standard scope of work. MGS builds custom programs for biohazard remediation, controlled-environment and data-center cleaning, and disaster restoration — deploying certified teams, specialized equipment, and documented protocols developed around the specific requirement.",
    image: "/attached_assets/terminal sanitization_1752528525894.png",
    features: ["Biohazard remediation", "Controlled environment cleaning", "Data center maintenance", "Disaster restoration", "Advanced Equipment Deployment", "Custom protocol development"],
    benefits: ["Expert handling of sensitive situations", "Certified specialized teams", "Custom solutions for unique needs", "Advanced Equipment Fleet"],
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
