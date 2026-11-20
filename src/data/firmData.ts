export interface Address {
  building: string;
  street: string;
  district: string;
  city: string;
  postalCode: string;
}

export interface FirmProfile {
  name: string;
  shortName: string;
  nepaliName: string;
  establishedYearBS: string;
  establishedYearAD: string;
  city: string;
  country: string;
  email: string;
  secondaryEmail?: string;
  phone: string;
  phoneHref: string;
  workingHours: string;
  workingDays: string;
  mapUrl: string;
  address: Address;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface HeroContent {
  eyebrow: string;
  nepaliEyebrow: string;
  headlineLines: [string, string];
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface PracticeArea {
  id: string;
  number: string;
  name: string;
  slug: string;
  nepaliTitle?: string;
  statute: string;
  statuteShort: string;
  description: string;
  approach: string;
  keyMatters: string[];
  leadCounsel: string;
}

export interface FeaturedPracticeArea {
  id: string;
  number: string;
  name: string;
  targetSlug: string;
  summary: string;
  statuteShort: string;
}

export interface FirmStat {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  detail: string;
}

export interface TimelineEntry {
  id: string;
  yearBS: string;
  yearAD: string;
  heading: string;
  description: string;
}

export interface FirmOverviewContent {
  eyebrow: string;
  heading: string;
  leadParagraph: string;
  bodyParagraphs: string[];
  foundingSummary: {
    foundedBy: string;
    foundedYear: string;
    chambersLocation: string;
    clientele: string;
  };
  partnersCtaLabel: string;
  partnersCtaHref: string;
  timelineHeading: string;
  timelineSubheading: string;
  timeline: TimelineEntry[];
}

export interface FounderForewordContent {
  eyebrow: string;
  heading: string;
  pullQuote: string;
  paragraphs: string[];
  founderName: string;
  nepaliName: string;
  designation: string;
  credentials: string;
  portraitSrc: string;
  portraitAlt: string;
}

export interface PartnerProfile {
  id: string;
  barCouncilNote: string;
  name: string;
  nepaliName: string;
  designation: string;
  qualifications: string[];
  languages: string[];
  shortBio: string;
  extendedBio: string;
  specialisations: string[];
  email: string;
  portraitSrc: string;
  portraitAlt: string;
}

export interface FaqCategory {
  id: string;
  label: string;
  description: string;
}

export interface FaqQuestion {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
  statutoryReference: string;
}

export interface SelectedJudgment {
  id: string;
  referenceNumber: string;
  court: string;
  publicationYear: string;
  subjectArea: string;
  title: string;
  nepaliReference?: string;
  summary: string;
  documentUrl: string;
  documentLabel: string;
}

export interface FooterContent {
  description: string;
  practiceLinks: Array<{ label: string; href: string }>;
  firmLinks: Array<{ label: string; href: string }>;
  resourceLinks: Array<{ label: string; href: string }>;
  disclaimerTitle: string;
  disclaimerParagraphs: string[];
  barComplianceNote: string;
}

export const firmProfile: FirmProfile = {
  name: "Law Chambers & Legal Research",
  shortName: "Law Chambers",
  nepaliName: "ल चेम्बर्स एण्ड रिसर्च सेन्टर",
  establishedYearBS: "2055 B.S.",
  establishedYearAD: "1998 A.D.",
  city: "Kathmandu",
  country: "Nepal",
  email: "chambers@lawchambers.com.np",
  secondaryEmail: "research@lawchambers.com.np",
  phone: "+977 (01) 4258910",
  phoneHref: "tel:+977014258910",
  workingHours: "09:30 - 17:30 NPT",
  workingDays: "Sunday through Friday (Closed on Public Holidays)",
  mapUrl: "https://maps.google.com/?q=Supreme+Court+of+Nepal+Ramshah+Path",
  address: {
    building: "Chambers House, 3rd Floor",
    street: "Ramshah Path, Putalisadak",
    district: "Kathmandu Metropolitan City — Ward No. 28",
    city: "Kathmandu",
    postalCode: "44600",
  },
};

export const navigationItems: NavigationItem[] = [
  { id: "nav-the-firm", label: "The Firm", href: "#the-firm" },
  { id: "nav-practice", label: "Practice", href: "#practice-areas" },
  { id: "nav-foreword", label: "Foreword", href: "#foreword" },
  { id: "nav-partners", label: "Partners", href: "#partners" },
  { id: "nav-questions", label: "Questions", href: "#questions" },
];

export const heroContent: HeroContent = {
  eyebrow: "RAMSHAH PATH, KATHMANDU",
  nepaliEyebrow: "न्याय",
  headlineLines: [
    "Defending for",
    "impartial justice.",
  ],
  lead: "A full-service law firm practising in Nepal since 1998 — in the courts, and in the drafting of the statutes those courts apply.",
  primaryCta: {
    label: "Contact the Firm",
    href: "#contact",
  },
  secondaryCta: {
    label: "Our Practice",
    href: "#practice-areas",
  },
};

export const practiceAreas: PracticeArea[] = [
  {
    id: "pa-01",
    number: "01",
    name: "Business and Corporate Law",
    slug: "business-corporate",
    nepaliTitle: "व्यवसायिक तथा कम्पनी कानुन",
    statute: "Companies Act, 2063 (2006) · Insolvency Act, 2063 · Rastra Bank Act, 2058",
    statuteShort: "Companies Act, 2063",
    description: "Comprehensive legal counsel on company incorporation, shareholder agreements, corporate restructuring, mergers, joint ventures, and commercial contracts under Nepali law.",
    approach: "We draft and negotiate corporate charters, board resolutions, and commercial supply agreements with a view toward dispute prevention and statutory compliance before the Office of the Company Registrar (OCR).",
    keyMatters: [
      "Private and public company incorporation, conversion, and capital structuring",
      "Shareholder agreements, share purchase transactions, and due diligence",
      "Commercial lending documentation and banking regulatory compliance",
    ],
    leadCounsel: "Adv. Shailaja Koirala",
  },
  {
    id: "pa-02",
    number: "02",
    name: "Civil Law",
    slug: "civil-law",
    nepaliTitle: "देवानी कानुन तथा सम्पत्ती विवाद",
    statute: "National Civil Code (Muluki Dewani Samhita), 2074 (2017) · Civil Procedure Code, 2074",
    statuteShort: "Civil Code, 2074",
    description: "Representation in property title disputes, ancestral partition (Angsha), contract enforcement, land registration challenges, and unjust enrichment claims.",
    approach: "Our litigation practice emphasizes thorough examination of cadastral records (Napi), Malpot deeds, and limitation periods prior to instituting suits or filing appellate pleadings.",
    keyMatters: [
      "Title declaration and cadastral boundary disputes",
      "Ancestral property partition (Angsha-Banda) and deed cancellation",
      "Contractual breach damages and specific performance claims",
    ],
    leadCounsel: "Sr. Adv. Devendra Raj Acharya",
  },
  {
    id: "pa-03",
    number: "03",
    name: "Criminal Defence",
    slug: "criminal-defence",
    nepaliTitle: "फौजदारी प्रतिरक्षा",
    statute: "National Penal Code, 2074 (2017) · Criminal Procedure Code, 2074 · Banking Offence and Punishment Act, 2064",
    statuteShort: "Penal Code, 2074",
    description: "Trial and appellate defence in complex criminal prosecutions, white-collar allegations, banking offences, revenue investigations, and constitutional habeas corpus petitions.",
    approach: "We intervene from the earliest stage of investigation and remand proceedings to safeguard due process rights, evidentiary integrity, and bail eligibility before District, High, and Special Courts.",
    keyMatters: [
      "Banking offence and cheque dishonour trial defence",
      "Revenue and anti-corruption inquiry representation before Special Court",
      "Bail hearings, remand advocacy, and Supreme Court revision writs",
    ],
    leadCounsel: "Sr. Adv. Devendra Raj Acharya",
  },
  {
    id: "pa-04",
    number: "04",
    name: "Family Law",
    slug: "family-law",
    nepaliTitle: "पारिवारिक कानुन",
    statute: "National Civil Code, 2074 (Part 3: Family Law)",
    statuteShort: "Civil Code (Family)",
    description: "Discreet legal representation in family relations, parentage, guardianship, adoption (Dharmaputra/Dharmaputri), maintenance obligations, and domestic settlements.",
    approach: "We handle sensitive family matters with strict confidentiality, prioritising mediated family settlements where viable while protecting statutory entitlements in court when litigation is unavoidable.",
    keyMatters: [
      "Guardianship and child custody determinations",
      "Statutory maintenance claims (Khanampeen) and property protection",
      "Inter-country and domestic adoption verification proceedings",
    ],
    leadCounsel: "Adv. Anuradha Pradhan",
  },
  {
    id: "pa-05",
    number: "05",
    name: "Divorce Law",
    slug: "divorce-law",
    nepaliTitle: "सम्बन्ध विच्छेद कानुन",
    statute: "National Civil Code, 2074 (Chapter on Divorce, Sections 93–104)",
    statuteShort: "Civil Code, Sec 93-104",
    description: "Advisory and courtroom representation in mutual-consent divorce proceedings, contested matrimonial dissolution, alimony assessment, and pre-divorce partition of property.",
    approach: "We assist both resident citizens and non-resident Nepalis (NRNs) through power-of-attorney (Warisnama) representation, ensuring structured asset division and clear settlement decrees.",
    keyMatters: [
      "Mutual-consent divorce facilitation before District Courts",
      "Contested divorce petitions and conciliation proceedings",
      "Partition of ancestral and self-acquired matrimonial assets",
    ],
    leadCounsel: "Adv. Anuradha Pradhan",
  },
  {
    id: "pa-06",
    number: "06",
    name: "Tort Litigation",
    slug: "tort-litigation",
    nepaliTitle: "दुष्कृति तथा क्षतिपूर्ति विवाद",
    statute: "National Civil Code, 2074 (Part 5: Provisions Relating to Torts) · Defamation and Libel Act, 2016",
    statuteShort: "Civil Code (Torts)",
    description: "Pursuit and defence of civil liability claims arising from negligence, professional malpractice, defamation, nuisance, trespass, and statutory compensation.",
    approach: "As codified tort jurisprudence develops under Part 5 of the Civil Code, we build evidentiary records proving causation and quantifiable actual damages.",
    keyMatters: [
      "Professional and medical negligence liability claims",
      "Commercial defamation and damage to business reputation actions",
      "Property nuisance and environmental tort injunctions",
    ],
    leadCounsel: "Adv. Siddhartha Bikram Shah",
  },
  {
    id: "pa-07",
    number: "07",
    name: "Employment and Labour Law",
    slug: "employment-labour",
    nepaliTitle: "श्रम तथा रोजगारी कानुन",
    statute: "Labour Act, 2074 (2017) · Contribution-Based Social Security Act, 2074 · Bonus Act, 2030",
    statuteShort: "Labour Act, 2074 (2017)",
    description: "Counsel to employers, corporations, and development organisations on employment contracts, human-resource bylaws, Social Security Fund (SSF) compliance, retrenchment, and Labour Court disputes.",
    approach: "We audit internal HR manuals against the Labour Act and Labour Rules, 2075, and represent management in collective bargaining and disciplinary proceedings.",
    keyMatters: [
      "Drafting employment agreements, executive service contracts & HR bylaws",
      "Social Security Fund (SSF) registration and statutory audit compliance",
      "Labour Court litigation, retrenchment structuring and collective disputes",
    ],
    leadCounsel: "Adv. Shailaja Koirala",
  },
  {
    id: "pa-08",
    number: "08",
    name: "Cybercrime and IT Law",
    slug: "cybercrime-it",
    nepaliTitle: "साइबर अपराध तथा सूचना प्रविधि कानुन",
    statute: "Electronic Transactions Act, 2063 (2006) · Individual Privacy Act, 2075 (2018)",
    statuteShort: "Electronic Transactions Act, 2063",
    description: "Legal representation in cyber offences, unauthorized system access, digital defamation, data privacy compliance, software licensing, and fin-tech regulatory matters.",
    approach: "We coordinate digital forensic documentation with statutory defence before the Cyber Bureau and District Court benches, while advising technology companies on cross-border service agreements.",
    keyMatters: [
      "Electronic Transactions Act defence before designated Kathmandu District Court",
      "Data privacy policy structuring and consent compliance audits",
      "Software development, SaaS licensing, and IP assignment contracts",
    ],
    leadCounsel: "Adv. Siddhartha Bikram Shah",
  },
  {
    id: "pa-09",
    number: "09",
    name: "Consumer Protection Law",
    slug: "consumer-protection",
    nepaliTitle: "उपभोक्ता हित संरक्षण कानुन",
    statute: "Consumer Protection Act, 2075 (2018) · Competition Promotion and Market Protection Act, 2063",
    statuteShort: "Consumer Protection Act, 2075",
    description: "Representation in product liability, unfair trade practices, regulatory inspections by the Department of Supply Management, and medical or service-sector consumer claims.",
    approach: "We advise manufacturers, importers, hospitals, and retail chains on statutory labelling, warranty compliance, and defence against administrative penalties.",
    keyMatters: [
      "Department of Commerce and Supply inspection response",
      "Consumer Court product liability defense and compensation negotiation",
      "Statutory labeling, MRP, and warranty compliance audits",
    ],
    leadCounsel: "Adv. Anuradha Pradhan",
  },
  {
    id: "pa-10",
    number: "10",
    name: "Immigration Law",
    slug: "immigration",
    nepaliTitle: "अध्यागमन तथा गैरआवासीय नेपाली कानुन",
    statute: "Immigration Act, 2049 (1992) · Non-Resident Nepali Act, 2064 (2008) · Citizenship Act, 2063",
    statuteShort: "Immigration Act, 2049 · NRN Act",
    description: "Advisory on business and investor visas, expatriate work permits, Non-Resident Nepali (NRN) identity cards, citizenship restoration, and administrative immigration appeals.",
    approach: "We work closely with the Department of Immigration, Ministry of Home Affairs, and Department of Labour to secure timely clearances for foreign executives and technical specialists.",
    keyMatters: [
      "Investor, business, and study visa processing and renewal",
      "Expatriate work permits and Labour Department approvals",
      "NRN card issuance, property ownership advisory, and dual-citizenship formalities",
    ],
    leadCounsel: "Adv. Siddhartha Bikram Shah",
  },
  {
    id: "pa-11",
    number: "11",
    name: "Foreign Direct Investment",
    slug: "foreign-investment",
    nepaliTitle: "वैदेशिक लगानी तथा प्रविधि हस्तान्तरण",
    statute: "Foreign Investment and Technology Transfer Act (FITTA), 2075 (2019) · Foreign Exchange Regulation Act, 2019",
    statuteShort: "FITTA, 2075 (2019)",
    description: "End-to-end transaction structuring, Department of Industry (DOI) and Investment Board Nepal (IBN) approvals, technology transfer agreements, and dividend repatriation.",
    approach: "We guide foreign sponsors from Negative List screening and minimum threshold compliance through Nepal Rastra Bank (NRB) capital recording and subsequent profit repatriation.",
    keyMatters: [
      "Department of Industry (DOI) foreign investment approvals",
      "Technology Transfer Agreements (TTA), royalty structuring and registration",
      "NRB foreign currency recording and offshore dividend repatriation",
    ],
    leadCounsel: "Adv. Shailaja Koirala",
  },
  {
    id: "pa-12",
    number: "12",
    name: "Intellectual Property Law",
    slug: "intellectual-property",
    nepaliTitle: "बौद्धिक सम्पत्ति कानुन",
    statute: "Patent, Design and Trade Mark Act, 2022 (1965) · Copyright Act, 2059 (2002)",
    statuteShort: "Patent, Design & TM Act",
    description: "Registration, opposition, renewal, and infringement enforcement of trademarks, industrial designs, patents, and copyrights in Nepal.",
    approach: "We manage domestic and international trademark portfolios before the Department of Industry, prosecuting passing-off and counterfeit enforcement actions alongside customs authorities.",
    keyMatters: [
      "Trademark, patent and design searches, applications and renewals",
      "Opposition proceedings and cancellation suits before Department of Industry",
      "Border enforcement, anti-counterfeiting seizures and trademark litigation",
    ],
    leadCounsel: "Adv. Siddhartha Bikram Shah",
  },
  {
    id: "pa-13",
    number: "13",
    name: "Secretarial and Compliance",
    slug: "secretarial-compliance",
    nepaliTitle: "कम्पनी सचिवीय तथा नियामक अनुपालन",
    statute: "Companies Act, 2063 (Sections 51, 78, 80 & 108) · Income Tax Act, 2058",
    statuteShort: "Companies Act, 2063",
    description: "Ongoing corporate governance, annual statutory filings, board and general meeting minutes, share register maintenance, and regulatory audits.",
    approach: "Acting as retained company secretaries and compliance counsel, we keep corporate records in continuous good standing to avoid statutory fines and facilitate institutional financing.",
    keyMatters: [
      "Annual returns, share register maintenance & OCR online portal compliance",
      "Drafting board minutes, AGMs, EGMs and special resolutions",
      "Corporate secretarial audits and regulatory rectification",
    ],
    leadCounsel: "Adv. Shailaja Koirala",
  },
];

export const featuredPracticeAreas: FeaturedPracticeArea[] = [
  {
    id: "fpa-07",
    number: "07",
    name: "Employment & Labour",
    targetSlug: "employment-labour",
    summary: "Employment contracts, HR bylaws, SSF compliance, and Labour Court disputes.",
    statuteShort: "Labour Act, 2074 (2017)",
  },
  {
    id: "fpa-08",
    number: "08",
    name: "Cybercrime & IT",
    targetSlug: "cybercrime-it",
    summary: "Cyber offences, digital evidence, data privacy, and technology contracts.",
    statuteShort: "Electronic Transactions Act, 2063",
  },
  {
    id: "fpa-09",
    number: "09",
    name: "Consumer Protection",
    targetSlug: "consumer-protection",
    summary: "Product liability, regulatory inspections, and market competition claims.",
    statuteShort: "Consumer Protection Act, 2075",
  },
  {
    id: "fpa-10",
    number: "10",
    name: "Immigration",
    targetSlug: "immigration",
    summary: "Business and investor visas, work permits, and NRN statutory rights.",
    statuteShort: "Immigration Act, 2049 · NRN Act",
  },
  {
    id: "fpa-11",
    number: "11",
    name: "Foreign Investment",
    targetSlug: "foreign-investment",
    summary: "Department of Industry approvals, NRB repatriation, and cross-border structuring.",
    statuteShort: "FITTA, 2075 (2019)",
  },
];

export const firmStatistics: FirmStat[] = [
  {
    id: "stat-est",
    label: "Year Established",
    value: "2055",
    suffix: "B.S.",
    detail: "Founded in 1998 A.D. at Ramshah Path, Kathmandu",
  },
  {
    id: "stat-practice",
    label: "Continuous Practice",
    value: "28",
    suffix: "Yrs",
    detail: "Appellate litigation and institutional advisory",
  },
  {
    id: "stat-areas",
    label: "Core Practice Areas",
    value: "13",
    detail: "Aligned with codified Nepali statutory frameworks",
  },
  {
    id: "stat-counsel",
    label: "Senior & Managing Counsel",
    value: "04",
    detail: "Admitted to practice before the Courts of Nepal",
  },
];

export const firmOverviewContent: FirmOverviewContent = {
  eyebrow: "01 / THE FIRM",
  heading: "An enduring tradition of disciplined legal scholarship and courtroom advocacy.",
  leadParagraph:
    "Law Chambers & Legal Research was established with a singular premise: that effective advocacy before the courts of Nepal requires rigorous preparation in primary statutory texts, comparative jurisprudence, and procedural discipline.",
  bodyParagraphs: [
    "Situated along Ramshah Path in proximity to the Supreme Court of Nepal and central administrative ministries, our chambers combine trial and appellate litigation with structured corporate and regulatory counsel. We advise closely held family enterprises, multinational subsidiaries, infrastructure developers, financial institutions, and individuals navigating complex personal or property disputes.",
    "Rather than operating as a high-volume consultancy, the firm maintains deliberate partner involvement across every brief—from initial statutory opinion and pleadings drafting to oral arguments before constitutional and division benches.",
  ],
  foundingSummary: {
    foundedBy: "Senior Advocate Devendra Raj Acharya",
    foundedYear: "2055 B.S. (1998 A.D.)",
    chambersLocation: "Ramshah Path, Kathmandu",
    clientele: "Corporations, Foreign Investors, Financial Institutions & Private Clients",
  },
  partnersCtaLabel: "Meet the Partners and Counsel",
  partnersCtaHref: "#partners",
  timelineHeading: "Institutional Milestones",
  timelineSubheading: "Chronology of Chambers Practice and Research Initiatives",
  timeline: [
    {
      id: "tl-2055",
      yearBS: "2055 B.S.",
      yearAD: "1998 A.D.",
      heading: "Founding of Chambers at Ramshah Path",
      description:
        "Established as a litigation and statutory research chambers focusing on civil, constitutional writ petitions, and commercial disputes before the Appellate and Supreme Courts.",
    },
    {
      id: "tl-2063",
      yearBS: "2063 B.S.",
      yearAD: "2006 A.D.",
      heading: "Expansion into Corporate & Company Advisory",
      description:
        "Following the enactment of the Companies Act, 2063, the firm instituted a dedicated corporate and secretarial practice advising domestic industries and banking institutions.",
    },
    {
      id: "tl-2072",
      yearBS: "2072 B.S.",
      yearAD: "2015 A.D.",
      heading: "Constitutional Bench & Federal Regulatory Practice",
      description:
        "After the promulgation of the Constitution of Nepal, 2072, chambers expanded its public law and inter-jurisdictional regulatory advisory across federal, provincial, and local tiers.",
    },
    {
      id: "tl-2075",
      yearBS: "2075 B.S.",
      yearAD: "2018 A.D.",
      heading: "Codified Civil & Criminal Code Transition Desk",
      description:
        "Published internal commentaries and guided corporate and individual clients through the comprehensive transition to the Muluki Civil and Penal Codes, 2074.",
    },
    {
      id: "tl-2080",
      yearBS: "2080 B.S.",
      yearAD: "2023 A.D.",
      heading: "Cross-Border Investment & Technology Law Wing",
      description:
        "Consolidated foreign direct investment, intellectual property, and electronic transactions advisory under a unified cross-border commercial practice group.",
    },
  ],
};

export const founderForewordContent: FounderForewordContent = {
  eyebrow: "03 / FOREWORD",
  heading: "A word from our founder.",
  pullQuote:
    "“Law is not only about resolving disputes. It is about building trust, protecting rights, and advancing society.”",
  paragraphs: [
    "It gives me great pride to introduce Law Chambers & Legal Research, a trusted institution in Nepal's legal fraternity since its establishment in 1998. When I founded this firm, my vision was to create a platform where integrity, professionalism and public service come together to deliver justice and empower clients. Over the past three decades, this vision has guided our work and allowed us to contribute meaningfully to the legal, social and constitutional development of our nation.",
    "Our firm has grown into a full-service practice with deep expertise in corporate, civil, criminal and regulatory matters, while also offering specialised services in emerging areas such as technology, foreign investment and intellectual property.",
    "We have been privileged to serve individuals, corporations, government institutions and international organisations with dedication and diligence. The trust our clients place in us is our greatest strength, and we remain committed to upholding the highest ethical standards and legal excellence in every matter we handle.",
    "As Nepal continues its journey of legal reform and socio-economic transformation, Law Chambers stands ready to play its part as a reliable partner. With a team of highly skilled professionals educated both in Nepal and abroad, we are well positioned to provide innovative and practical solutions that meet the challenges of a rapidly changing world.",
    "I extend my gratitude to all who have supported us over the years and invite you to place your trust in Law Chambers & Legal Research. Together, we will continue to pursue justice with integrity and serve society with commitment.",
  ],
  founderName: "Devendra Raj Acharya",
  nepaliName: "वरिष्ठ अधिवक्ता देवेन्द्र राज आचार्य",
  designation: "Senior Advocate, Founder and Senior Partner",
  credentials: "B.L. (Tribhuvan University), LL.M. (Constitutional & Commercial Law)",
  portraitSrc: "/images/founder.jpeg",
  portraitAlt: "Devendra Raj Acharya — Founder and Senior Advocate",
};

export const partnerProfiles: PartnerProfile[] = [
  {
    id: "partner-01",
    barCouncilNote: "Senior Counsel · Constitutional, Civil & Appellate Litigation",
    name: "Devendra Raj Acharya",
    nepaliName: "देवेन्द्र राज आचार्य",
    designation: "FOUNDING & MANAGING PARTNER",
    qualifications: [
      "LL.M. in Constitutional & Administrative Law",
      "Bachelor of Laws (B.L.), Nepal Law Campus, Tribhuvan University",
    ],
    languages: ["Nepali", "English", "Sanskrit", "Hindi"],
    shortBio:
      "Devendra Raj Acharya leads the firm's Supreme Court and Constitutional Bench litigation practice, bringing nearly three decades of courtroom advocacy in complex property, banking, and public law disputes.",
    extendedBio:
      "Over twenty-eight years of active practice, he has represented state enterprises, commercial banks, and private litigants in landmark disputes concerning statutory interpretation, land acquisition, and commercial liability. He regularly mentors junior advocates on appellate pleading standards.",
    specialisations: [
      "Constitutional Writ Jurisdiction",
      "Civil & Property Appeals",
      "Criminal Defence",
      "Commercial Arbitration",
    ],
    email: "d.acharya@lawchambers.com.np",
    portraitSrc: "/images/partner-acharya.jpeg",
    portraitAlt: "Senior Advocate Devendra Raj Acharya",
  },
  {
    id: "partner-02",
    barCouncilNote: "Advocate · Corporate, FDI & Banking Practice",
    name: "Shailaja Koirala",
    nepaliName: "शैलजा कोइराला",
    designation: "SENIOR PARTNER — CORPORATE & FDI",
    qualifications: [
      "LL.M. in International Commercial Law",
      "B.A. LL.B., Kathmandu School of Law",
    ],
    languages: ["Nepali", "English"],
    shortBio:
      "Shailaja Koirala heads the corporate, foreign investment, and labour advisory practice, guiding domestic conglomerates and multinational sponsors through regulatory approvals and commercial transactions.",
    extendedBio:
      "She has advised foreign investors across hydropower, information technology, hospitality, and manufacturing sectors on joint-venture structuring, Department of Industry clearances, Nepal Rastra Bank foreign exchange compliance, and collective labour negotiations.",
    specialisations: [
      "Foreign Direct Investment (FITTA)",
      "Corporate Restructuring & M&A",
      "Employment & Labour Law",
      "Company Secretarial Compliance",
    ],
    email: "s.koirala@lawchambers.com.np",
    portraitSrc: "/images/partner-koirala.jpeg",
    portraitAlt: "Advocate Shailaja Koirala",
  },
];

export const faqCategories: FaqCategory[] = [
  {
    id: "cat-divorce",
    label: "Divorce",
    description:
      "Procedures, statutory grounds, mutual consent timelines, and property division under the National Civil Code, 2074.",
  },
  {
    id: "cat-disputes",
    label: "Personal disputes",
    description:
      "Boundary demarcations, defamation, and domestic dispute conciliation procedures.",
  },
  {
    id: "cat-land",
    label: "Land transfer from abroad",
    description:
      "Power-of-attorney execution at Nepali embassies, Malpot registration, and NRN statutory limits.",
  },
  {
    id: "cat-cheque",
    label: "Cheque dishonour",
    description:
      "Remedies under Banking Offence Act, 2064 versus Negotiable Instruments Act, 2034.",
  },
  {
    id: "cat-fdi",
    label: "Foreign investment",
    description:
      "Minimum capital thresholds, DOI clearances, and NRB currency repatriation.",
  },
];

export const faqQuestions: FaqQuestion[] = [
  {
    id: "faq-01",
    categoryId: "cat-divorce",
    question: "How long does a mutual-consent divorce take compared to a contested divorce in Nepal?",
    answer:
      "Under Chapter 3 of Part 3 of the National Civil Code, 2074 (2017), when both spouses agree to dissolve their marriage and have settled property and custody terms in writing, a mutual-consent petition before the concerned District Court is generally concluded within a few court working days after verification of identity and consent. By contrast, a contested divorce filed unilaterally by either spouse requires statutory service of summons, mandatory mediation referral, and a one-year reconciliation window (Section 97) if the court deems conciliation possible, frequently extending proceedings to twelve months or more.",
    statutoryReference: "National Civil Code, 2074 — Sections 93 to 97",
  },
  {
    id: "faq-02",
    categoryId: "cat-divorce",
    question: "Can a Nepali citizen residing abroad file or respond to a divorce petition without returning to Nepal?",
    answer:
      "Yes, an overseas citizen can execute an authenticated Power of Attorney (Warisnama) attested by the relevant Embassy or Consulate of Nepal abroad under Section 153 of the Civil Procedure Code, 2074. The appointed attorney-in-fact can then institute or defend proceedings on their behalf.",
    statutoryReference: "Civil Procedure Code, 2074 — Section 153",
  },
  {
    id: "faq-03",
    categoryId: "cat-divorce",
    question: "How is matrimonial property divided upon divorce under the National Civil Code?",
    answer:
      "Under Sections 99 and 100 of the Civil Code, before decreeing a divorce on petition of the wife or husband, if property partition has not occurred, the court determines the share of partition between husband and wife as equal coparceners from ancestral and joint assets, unless the wife explicitly waives or opts for lump-sum or periodic maintenance.",
    statutoryReference: "National Civil Code, 2074 — Sections 99, 100",
  },
  {
    id: "faq-04",
    categoryId: "cat-disputes",
    question: "What is the statutory limitation period for filing a defamation or libel compensation suit?",
    answer:
      "Under Section 687 of the National Civil Code, 2074, a suit for compensation regarding civil injury, harm to reputation, or defamation must be instituted within six months from the date of cause of action or knowledge thereof.",
    statutoryReference: "National Civil Code, 2074 — Section 687",
  },
  {
    id: "faq-05",
    categoryId: "cat-land",
    question: "How can non-resident Nepalis (NRNs) purchase or transfer residential property in Nepal?",
    answer:
      "Foreign citizens of Nepali origin holding a valid NRN Card are eligible to acquire up to prescribed ceilings of land/apartment property for residential purposes under the NRN Act, 2064 and Land Act, 2021, subject to government approval and registration with the Land Revenue Office.",
    statutoryReference: "Non-Resident Nepali Act, 2064 & Land Act, 2021",
  },
  {
    id: "faq-06",
    categoryId: "cat-cheque",
    question: "What is the key difference between pursuing a cheque bounce under the Banking Offence Act versus the Negotiable Instruments Act?",
    answer:
      "The Negotiable Instruments Act, 2034 is a private civil recovery suit with interest and fine, whereas the Banking Offence and Punishment Act, 2064 entails state-investigated criminal prosecution with potential imprisonment and mandatory fine matching the dishonoured amount.",
    statutoryReference: "Banking Offence Act, 2064 vs. Negotiable Instruments Act, 2034",
  },
  {
    id: "faq-07",
    categoryId: "cat-fdi",
    question: "What is the current minimum threshold for foreign direct investment in Nepal?",
    answer:
      "Under gazette notifications issued under FITTA, 2075, the general minimum foreign investment threshold is currently NPR 20 Million per foreign investor, with expedited automatic route approvals available for approved sectors via the Department of Industry portal.",
    statutoryReference: "FITTA, 2075 (2019) & Ministry of Industry Notifications",
  },
];

export const selectedJudgments: SelectedJudgment[] = [
  {
    id: "jd-10842",
    referenceNumber: "NKP 2079 · DECISION NO. 10842",
    court: "Supreme Court of Nepal — Division Bench",
    publicationYear: "2079 B.S. (2022 A.D.)",
    subjectArea: "Civil Code & Documentary Evidence",
    title: "Interpretation of Statutory Limitation and Documentary Authentication in Private Loan Recovery",
    nepaliReference: "ने.का.प. २०७९, नि.नं. १०८४२ — लेनदेन तथा हदम्याद सम्बन्धी नजिर",
    summary:
      "Examines the mandatory local-level authentication requirement under Section 478 of the National Civil Code, 2074 and clarifies transitional application to private instruments executed prior to codification.",
    documentUrl: "https://supremecourt.gov.np",
    documentLabel: "Official Supreme Court Record",
  },
  {
    id: "jd-10691",
    referenceNumber: "NKP 2078 · DECISION NO. 10691",
    court: "Supreme Court of Nepal — Full Bench",
    publicationYear: "2078 B.S. (2021 A.D.)",
    subjectArea: "Family & Property Partition Law",
    title: "Equal Coparcenary Rights of Daughters and Retrospective Valuation of Ancestral Estates",
    nepaliReference: "ने.का.प. २०७८, नि.नं. १०६९१ — अंश हक तथा समान पैतृक सम्पत्ति",
    summary:
      "Affirms constitutional equality in ancestral partition claims under Article 18 and Section 205 of the National Civil Code, addressing prior partition deeds and undisclosed joint family assets.",
    documentUrl: "https://supremecourt.gov.np",
    documentLabel: "Official Supreme Court Record",
  },
  {
    id: "jd-11014",
    referenceNumber: "NKP 2080 · DECISION NO. 11014",
    court: "Supreme Court of Nepal — Division Bench",
    publicationYear: "2080 B.S. (2023 A.D.)",
    subjectArea: "Commercial Law & Arbitration Act, 2055",
    title: "Due Process in Commercial Arbitration Awards and Scope of High Court Appellate Interference",
    nepaliReference: "ने.का.प. २०८०, नि.नं. ११०१४ — मध्यस्थता निर्णय र बदर निवेदन",
    summary:
      "Reiterates limited statutory grounds for challenging arbitral awards under Section 30 of the Arbitration Act, emphasizing party autonomy and non-interference on merits.",
    documentUrl: "https://supremecourt.gov.np",
    documentLabel: "Official Supreme Court Record",
  },
];

export const footerContent: FooterContent = {
  description:
    "An independent law firm and statutory research chambers based at Ramshah Path, Kathmandu, dedicated to principled litigation, corporate counsel, and legal scholarship across Nepal.",
  practiceLinks: [
    { label: "Business & Corporate Law", href: "#pa-business-corporate" },
    { label: "Civil & Property Law", href: "#pa-civil-law" },
    { label: "Criminal Defence", href: "#pa-criminal-defence" },
    { label: "Foreign Direct Investment", href: "#pa-foreign-investment" },
    { label: "Family & Divorce Law", href: "#pa-family-law" },
    { label: "Intellectual Property", href: "#pa-intellectual-property" },
  ],
  firmLinks: [
    { label: "The Firm & History", href: "#the-firm" },
    { label: "All Practice Areas", href: "#practice-areas" },
    { label: "Founder's Foreword", href: "#foreword" },
    { label: "Partners & Counsel", href: "#partners" },
  ],
  resourceLinks: [
    { label: "Frequently Asked Questions", href: "#questions" },
    { label: "Selected Supreme Court Judgments", href: "#judgments" },
    { label: "Confidential Consultation", href: "#contact" },
    { label: "Nepal Kanoon Patrika (External)", href: "https://supremecourt.gov.np" },
  ],
  disclaimerTitle: "Informational Notice & Professional Conduct Disclaimer",
  disclaimerParagraphs: [
    "The materials published on this website are provided by Law Chambers & Legal Research solely for general informational and institutional identification purposes. Nothing contained herein constitutes a formal legal opinion, statutory advice, or an inducement or solicitation of legal engagement.",
    "Accessing this website, reading its statutory summaries, or initiating preliminary correspondence with our office does not create an advocate-client relationship unless and until a formal written engagement letter or Wakalatnama is executed following a conflict-of-interest review.",
    "Please note: All names, dates, and credentials presented in this prototype are structured placeholder data prepared for design and architectural verification. Final publication requires review and verification by the firm's legal counsel in accordance with the Code of Conduct for Legal Practitioners, 2079 issued by the Nepal Bar Council.",
  ],
  barComplianceNote: "Prepared in compliance with informational guidelines under the Nepal Bar Council Act, 2050.",
};
