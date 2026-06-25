import type { Locale } from "@/lib/i18n";

export type Chapitre = {
  id: string;
  title: string;
  points: string[];
};

export type Chantier = {
  id: number;
  iconKey: "Landmark" | "Shield" | "Factory" | "Building2" | "Hospital";
  color: string;
  title: string;
  description: string;
  chapitres: Chapitre[];
};

const fr: Chantier[] = [
  {
    id: 1,
    iconKey: "Landmark",
    color: "#1d9bf0",
    title: "Institutionnel, Politique et Diplomatie",
    description:
      "Réformer profondément les institutions pour une démocratie effective et une souveraineté renforcée",
    chapitres: [
      {
        id: "1-1",
        title: "Réforme des Institutions",
        points: [
          "Création d'un Bloc Institutionnel avec 1 Président + 2 Vice-Présidents",
          "Système de rotation du pouvoir entre 4 Aires Politico-Géographiques",
          "Mandat présidentiel réduit à 4 ans, renouvelable une fois",
          "Vote de confiance à mi-mandat et possibilité de vote de défiance",
          "Suppression du Sénat et du poste de Premier Ministre",
          "Vote biométrique sécurisé et déclaration obligatoire des biens",
        ],
      },
      {
        id: "1-2",
        title: "Cameroun Fort et Engagé pour l'Afrique",
        points: [
          "Révision de tous les accords de coopération bilatéraux",
          "Création d'une Communauté des Pays du Golfe de Guinée (CPGG)",
          "Sortie progressive de la Zone Franc CFA",
          "Création d'une Banque Centrale du Cameroun (BCC)",
          "Promotion d'une Agence Spatiale Africaine (ASAF)",
          "Patriotisme économique : préférence aux partenaires africains",
        ],
      },
      {
        id: "1-3",
        title: "Gouvernement Décomplexé",
        points: [
          "Réduction du nombre de ministères et ministres",
          "Création d'un Code de Conduite Gouvernementale (CCG)",
          "Conseils ministériels hebdomadaires avec compte-rendu public",
          "Évaluation trimestrielle des ministres sur objectifs mesurables",
        ],
      },
      {
        id: "1-4",
        title: "Justice Juste et Exemplaire",
        points: [
          "Révision du Code pénal, Code civil et Code de procédure",
          "Création d'un Bureau National des Investigations (BNI)",
          "Création de Tribunaux de Commerce régionaux",
          "Informatisation des dossiers judiciaires",
          "Légalisation du concubinage sous forme contractuelle",
        ],
      },
      {
        id: "1-5",
        title: "Gouvernance des Territoires",
        points: [
          "Création de Districts Administratifs infra-communaux",
          "Renforcement de la décentralisation avec budgets autonomes",
          "Création de Conseils d'Observation : Communal, Départemental, Régional",
        ],
      },
      {
        id: "1-6",
        title: "La Diaspora",
        points: [
          "Création de Sièges de Députés de la Diaspora à l'Assemblée",
          "Système de Partenariat Diaspora–État–Peuple (SPADEP)",
          "Banque des Acquis Extérieurs (BAE) pour transferts de fonds",
          "Facilitation du retour et de l'investissement de la diaspora",
        ],
      },
    ],
  },
  {
    id: 2,
    iconKey: "Shield",
    color: "#ff700c",
    title: "Défense, Sécurité, Sûreté et Recherche",
    description: "Moderniser nos forces armées et investir dans la recherche et l'innovation technologique",
    chapitres: [
      {
        id: "2-1",
        title: "Armée et Police de Métiers",
        points: [
          "Dépolitisation complète des forces de défense et de sécurité",
          "Création de nouveaux grades militaires et policiers",
          "Fin de carrière des soldats à 45 ans → reversement dans la Police",
          "Traitement double pour les soldats en opération",
          "Création d'un Complexe Militaro-Industriel à l'Est",
          "Construction d'une Base Militaire Multifonctionnelle à Bakassi",
          "Création d'une Silicon Valley Camerounaise dans le Boyo",
        ],
      },
      {
        id: "2-2",
        title: "Administration Pénitentiaire",
        points: [
          "Prison dissuasive, moralisatrice et réparatrice",
          "Centres de Détention des Prévenus séparés des condamnés",
          "Service des Travaux Forcés pour rembourser les victimes",
          "Réinsertion professionnelle des détenus",
        ],
      },
      {
        id: "2-3",
        title: "Crise Anglophone et Boko Haram",
        points: [
          "Cessez-le-feu immédiat et dialogue national inclusif",
          "Réforme constitutionnelle reconnaissant spécificités anglophones",
          "Programme de reconstruction économique NO/SO",
          "Renforcement bases militaires Extrême-Nord",
          "Programme de déradicalisation et réinsertion",
        ],
      },
      {
        id: "2-4",
        title: "Sécurité Transports et Télécoms",
        points: [
          "Nationalisation télécommunications : création CAMPHONE",
          "Société Nationale Transports Fluviaux et Maritimes",
          "Société de Transport Ferroviaire (CAMTRATRA)",
          "Centrale Nationale de Surveillance du Trafic",
        ],
      },
      {
        id: "2-5",
        title: "Recherche et Innovation",
        points: [
          "Vision Recherche–Innovation 2040 (VRI-40)",
          "Cameroonian Valley of Creative Intelligence (CAVCI)",
          "Centre d'Exploitation et Perfectionnement de l'IA (CEPIA)",
          "Supercalculateur Quantique National",
          "Fonds de financement recherche — budget annuel garanti",
        ],
      },
    ],
  },
  {
    id: 3,
    iconKey: "Factory",
    color: "#ffcb08",
    title: "Économie, Infrastructures et Environnement",
    description: "Bâtir une économie souveraine, performante et durable avec des infrastructures modernes",
    chapitres: [
      {
        id: "3-1",
        title: "Économie Performante et Solidaire",
        points: [
          "Sortie progressive Zone Franc et création Banque Centrale Cameroun",
          "Création d'une Bourse Nationale Camerounaise (BNC)",
          "Banques sectorielles : Mines, Culture, Sports, Santé, Industries",
          "Banque Nationale d'Investissement Citoyen (BANIC)",
          "Préférence nationale obligatoire dans marchés publics",
          "TVA Sociale et Système d'Économie Populaire",
        ],
      },
      {
        id: "3-2",
        title: "Secteur Primaire et Sécurité Alimentaire",
        points: [
          "Création d'Agropoles Régionaux dans chaque région",
          "Mécanisation de l'agriculture : parc d'équipements",
          "Écoles Primaires Agropastorales dès le cycle primaire",
          "Développement pisciculture et Chaine Valeurs Laitières",
          "Subvention intrants agricoles et Taxe Douane Agricole",
        ],
      },
      {
        id: "3-3",
        title: "Secteur Secondaire et Transfert Techno",
        points: [
          "Complexe Biochimique et Industriel du Cameroun",
          "Chaine Industrielle Pétrochimique et Mécanique",
          "Complexe d'Usines de Montage Automobile (CUMA)",
          "Société Nationale des Robotiques (SNR)",
          "Zones d'Extraction et Transformation Spéciales (ZETS)",
        ],
      },
      {
        id: "3-4",
        title: "Traitement Préférentiel Entreprises",
        points: [
          "Quota obligatoire marchés publics aux entreprises camerounaises",
          "Crédit d'Impôt Création Entreprises et Recrutement Cadres",
          "Bonus Fiscal Triennal pour entreprises performantes",
          "Centre d'Incubation et Accélération Start-Ups",
        ],
      },
      {
        id: "3-5",
        title: "Infrastructures d'Envergure",
        points: [
          "Trans-Camerounaise (TRANSCAM) — axe ferroviaire national",
          "Voie Trans-Centrafricaine et Trans-Golfe",
          "Boucles Routières de Contournement grandes villes",
          "Transport Express Régional (TER) capitales régionales",
          "Complexes Aéroportuaires Internationaux par région",
        ],
      },
      {
        id: "3-6",
        title: "Habitat Social",
        points: [
          "Société Nationale Habitat Écologique Loyer Modéré",
          "Banque de l'Habitat et du Logement (BHL)",
          "Contrôle loyers abusifs : Brigades de Surveillance",
          "Crédit d'Eau et Crédit Énergie aux ménages faibles revenus",
        ],
      },
      {
        id: "3-7",
        title: "Tourisme, Artisanat et Culture",
        points: [
          "Système National Intégré Promotion Tourisme",
          "Spaces de Commerce Artisanal dans chaque ville",
          "Appellation d'Origine Contrôlée produits camerounais",
          "Centre Hospitalier Touristique — tourisme médical",
        ],
      },
      {
        id: "3-8",
        title: "Environnement et Écosystème",
        points: [
          "Agence Nationale Surveillance Environnementale",
          "Agence Composts et Énergies Renouvelables",
          "Centres Traitement Recyclage Eaux et Dépollution Sols",
          "Gestion durable Forêts Communales Protégées",
        ],
      },
    ],
  },
  {
    id: 4,
    iconKey: "Building2",
    color: "#1d9bf0",
    title: "Administration, Gouvernance, Travail et Mémoire",
    description: "Promouvoir le mérite, réduire le train de vie de l'État et restaurer notre mémoire collective",
    chapitres: [
      {
        id: "4-1",
        title: "Administration de Mérite",
        points: [
          "Recrutement fonction publique uniquement par concours",
          "Système d'Évaluation Trimestriel de Rendement au Poste",
          "Code d'Éthique et de Morale Citoyenne (CEMOC)",
          "Système d'Intranet Administratif National",
          "Direction de la Discipline et des Dénonciations",
        ],
      },
      {
        id: "4-2",
        title: "Réduction Train de Vie de l'État",
        points: [
          "Audit des 70-80 sociétés d'État — liquidation non rentables",
          "Réduction avantages en nature hauts fonctionnaires",
          "Publication obligatoire comptes de l'État — transparence",
          "Trêve Administrative Obligatoire périodes crise budgétaire",
        ],
      },
      {
        id: "4-3",
        title: "Cameroun au Travail",
        points: [
          "Culture nationale du travail et du mérite",
          "Bonus Salarial Annuel et Saisonnier pour performance",
          "Système de Plein Emploi (SPE)",
          "Statut d'Entrepreneur Industriel (SEI)",
        ],
      },
      {
        id: "4-4",
        title: "Plein Emploi et Travail Décent",
        points: [
          "États Généraux de l'Emploi (EGE)",
          "Contrats Jeunes adaptés aux premiers emplois",
          "Système Validation Acquis Expérience en Diplôme",
          "Caisse Épargne Retraite Travailleurs Informel",
          "Statut légal travailleurs du sexe avec carte professionnelle",
        ],
      },
      {
        id: "4-5",
        title: "Réforme Foncière et Domaniale",
        points: [
          "Titres Fonciers spécialisés : Agricole, Coutumier, Industriel",
          "Taxe Plus-Value Foncière et Immobilière",
          "Carte d'Aménagement et Construction communal/régional/national",
          "Informatisation du cadastre national",
        ],
      },
      {
        id: "4-6",
        title: "Restauration Mémoire Historique",
        points: [
          "Bibliothèque Nationale, Régionales et Municipales",
          "Cimetière des Présidents pour honorer chefs d'État",
          "Reconnaissance héros nationaux (Um Nyobè, Félix Moumié)",
          "Réforme programmes scolaires : histoire camerounaise authentique",
          "Code National Langue Camerounaise valoriser langues locales",
        ],
      },
    ],
  },
  {
    id: 5,
    iconKey: "Hospital",
    color: "#ff700c",
    title: "Éducation, Santé et Social",
    description: "Garantir l'accès universel à une éducation de qualité, aux soins de santé et à la protection sociale",
    chapitres: [
      {
        id: "5-1",
        title: "Éducation Adaptée au Développement",
        points: [
          "Fusion système éducatif anglophone/francophone en système bilingue",
          "Écoles Primaires Dédiées spécialisées dès le primaire",
          "Collèges Secondaires Dédiés secteurs stratégiques",
          "Universités Spécialisées : Agriculture, Mines, Sports, Aéronautique",
          "Revalorisation salaire enseignants — Traitement Spécial ZEP",
          "Assistants de Vie Scolaire pour élèves en difficulté",
        ],
      },
      {
        id: "5-2",
        title: "Système de Santé pour Tous",
        points: [
          "Couverture Santé Universelle (CSU) — accès gratuit ou réduit",
          "Assurance Maladie Obligatoire (AMO)",
          "Compte Santé et Carte Santé pour chaque citoyen",
          "Dossier Médical Électronique — informatisation totale",
          "Centres de Téléconsultation zones rurales",
          "Service de Médecine Traditionnelle reconnu et encadré",
        ],
      },
      {
        id: "5-3",
        title: "Eau et Électricité pour Tous",
        points: [
          "Société Nationale des Eaux du Cameroun (SNEC)",
          "Société Nationale d'Électricité — renationalisation",
          "Crédits d'Eau et Crédits d'Énergie aux ménages",
          "Bassins Artificiels d'Eau et Bassins Hydrologiques Villageois",
          "Objectif : accès universel eau potable + électricité 2035",
        ],
      },
      {
        id: "5-4",
        title: "Éducation Physique et Sport",
        points: [
          "Banque Camerounaise des Sports (BCS)",
          "Centres de Développement Techniques et Sportifs régionaux",
          "Complexe Municipal Multisports dans chaque ville",
          "École Nationale Métiers Encadrement et Médecine du Sport",
          "Statut du Sportif avec couverture sociale",
        ],
      },
      {
        id: "5-5",
        title: "Culture et Arts",
        points: [
          "Agence Nationale de la Culture et de l'Art (ANCA)",
          "Banque de la Culture et de l'Art (BCA)",
          "Taxe Art et Culture sur importations culturelles",
          "Collèges Départementaux des Arts",
          "Protection Appellations d'Origine Camerounaises",
        ],
      },
      {
        id: "5-6",
        title: "Questions Essentielles",
        points: [
          "Légalisation encadrée activités religieuses",
          "Conseil National Activités Pratiques Occultes",
          "Allocation Compensatoire de Handicap",
          "Carte de Non-Exclusion Sociale pour vulnérables",
          "Centres Hébergement Personnes Sans Abri",
        ],
      },
      {
        id: "5-7",
        title: "Communication Sociale Saine",
        points: [
          "Code National de la Communication Sociale",
          "Conseil National des Médias (CNM)",
          "Régulation espace numérique — lutte désinformation",
          "Subvention médias qualité langues nationales",
        ],
      },
    ],
  },
];

const en: Chantier[] = [
  {
    id: 1,
    iconKey: "Landmark",
    color: "#1d9bf0",
    title: "Institutions, Politics and Diplomacy",
    description: "Deeply reform institutions for an effective democracy and a stronger sovereignty",
    chapitres: [
      {
        id: "1-1",
        title: "Reform of Institutions",
        points: [
          "Creation of an Institutional Bloc with 1 President + 2 Vice-Presidents",
          "Power rotation system between 4 Politico-Geographic Areas",
          "Presidential term reduced to 4 years, renewable once",
          "Mid-term vote of confidence and no-confidence option",
          "Abolition of the Senate and Prime Minister position",
          "Secure biometric voting and mandatory asset declaration",
        ],
      },
      {
        id: "1-2",
        title: "A Strong Cameroon Engaged for Africa",
        points: [
          "Review of all bilateral cooperation agreements",
          "Creation of a Gulf of Guinea Community (CPGG)",
          "Gradual exit from the CFA Franc Zone",
          "Creation of a Central Bank of Cameroon (BCC)",
          "Promotion of an African Space Agency (ASAF)",
          "Economic patriotism — preference to African partners",
        ],
      },
      {
        id: "1-3",
        title: "A Leaner Government",
        points: [
          "Reduction in the number of ministries and ministers",
          "Government Code of Conduct (CCG)",
          "Weekly cabinet meetings with public summaries",
          "Quarterly evaluation of ministers on measurable goals",
        ],
      },
      {
        id: "1-4",
        title: "Fair and Exemplary Justice",
        points: [
          "Overhaul of the Penal, Civil and Procedure Codes",
          "Creation of a National Bureau of Investigations (BNI)",
          "Regional Commercial Courts",
          "Digitalization of judicial files",
          "Legalization of contract-based civil partnerships",
        ],
      },
      {
        id: "1-5",
        title: "Territorial Governance",
        points: [
          "Creation of sub-municipal Administrative Districts",
          "Strengthened decentralization with autonomous budgets",
          "Communal, Departmental and Regional Observation Councils",
        ],
      },
      {
        id: "1-6",
        title: "The Diaspora",
        points: [
          "Creation of Diaspora seats in the National Assembly",
          "Diaspora–State–People Partnership System (SPADEP)",
          "External Assets Bank (BAE) for remittances",
          "Facilitate diaspora return and investment",
        ],
      },
    ],
  },
  {
    id: 2,
    iconKey: "Shield",
    color: "#ff700c",
    title: "Defense, Security, Safety and Research",
    description: "Modernize our armed forces and invest in research and technological innovation",
    chapitres: [
      {
        id: "2-1",
        title: "Professional Army and Police",
        points: [
          "Full depoliticization of defense and security forces",
          "New military and police ranks",
          "Soldiers' career ending at 45 → transfer to Police",
          "Double pay for soldiers in active operations",
          "Military-Industrial Complex in the East region",
          "Multifunctional Military Base in Bakassi",
          "Cameroonian Silicon Valley in Boyo",
        ],
      },
      {
        id: "2-2",
        title: "Prison Administration",
        points: [
          "Deterrent, rehabilitative and restorative prisons",
          "Pre-trial detention centers separated from convicts",
          "Forced Labour Service to compensate victims",
          "Professional reintegration of inmates",
        ],
      },
      {
        id: "2-3",
        title: "Anglophone Crisis and Boko Haram",
        points: [
          "Immediate ceasefire and inclusive national dialogue",
          "Constitutional reform recognizing Anglophone specificities",
          "Economic reconstruction program for NW/SW",
          "Strengthen military bases in the Far North",
          "Deradicalization and reintegration program",
        ],
      },
      {
        id: "2-4",
        title: "Transport and Telecom Security",
        points: [
          "Telecom nationalization — creation of CAMPHONE",
          "National Fluvial and Maritime Transport company",
          "Railway Transport company (CAMTRATRA)",
          "National Traffic Monitoring Centre",
        ],
      },
      {
        id: "2-5",
        title: "Research and Innovation",
        points: [
          "Research–Innovation Vision 2040 (VRI-40)",
          "Cameroonian Valley of Creative Intelligence (CAVCI)",
          "AI Exploitation and Improvement Centre (CEPIA)",
          "National Quantum Supercomputer",
          "Research funding pool — guaranteed annual budget",
        ],
      },
    ],
  },
  {
    id: 3,
    iconKey: "Factory",
    color: "#ffcb08",
    title: "Economy, Infrastructure and Environment",
    description: "Build a sovereign, performing and sustainable economy with modern infrastructure",
    chapitres: [
      {
        id: "3-1",
        title: "Performing and Solidarity-Based Economy",
        points: [
          "Gradual CFA Zone exit and Cameroon Central Bank",
          "Cameroonian National Stock Exchange (BNC)",
          "Sector banks — Mining, Culture, Sports, Health, Industry",
          "Citizen Investment National Bank (BANIC)",
          "Mandatory national preference in public procurement",
          "Social VAT and Popular Economy System",
        ],
      },
      {
        id: "3-2",
        title: "Primary Sector and Food Security",
        points: [
          "Regional Agropoles in every region",
          "Mechanization of agriculture — equipment pool",
          "Agropastoral Primary Schools from grade one",
          "Fish farming and Dairy Value Chain development",
          "Agricultural input subsidy and Agricultural Customs Tax",
        ],
      },
      {
        id: "3-3",
        title: "Secondary Sector and Tech Transfer",
        points: [
          "Cameroon Biochemical and Industrial Complex",
          "Petrochemical and Mechanical Industrial Chain",
          "Automobile Assembly Plant Complex (CUMA)",
          "National Robotics Company (SNR)",
          "Special Extraction and Transformation Zones (ZETS)",
        ],
      },
      {
        id: "3-4",
        title: "Preferential Treatment for Businesses",
        points: [
          "Mandatory quota in public contracts for Cameroonian firms",
          "Tax credit for company creation and executive hiring",
          "Three-year fiscal bonus for performing firms",
          "Start-up Incubation and Acceleration Centre",
        ],
      },
      {
        id: "3-5",
        title: "Major Infrastructure",
        points: [
          "Trans-Cameroon (TRANSCAM) national rail axis",
          "Trans-Central-African and Trans-Gulf routes",
          "Ring roads around major cities",
          "Regional Express Transport (TER) for regional capitals",
          "International Airport Complexes per region",
        ],
      },
      {
        id: "3-6",
        title: "Social Housing",
        points: [
          "National Ecological Low-Rent Housing Company",
          "Housing Bank (BHL)",
          "Rent abuse control — Monitoring Brigades",
          "Water and Energy Credit for low-income households",
        ],
      },
      {
        id: "3-7",
        title: "Tourism, Crafts and Culture",
        points: [
          "Integrated National Tourism Promotion System",
          "Craft Trade spaces in every city",
          "Protected Origin labels for Cameroonian products",
          "Tourism Hospital — medical tourism",
        ],
      },
      {
        id: "3-8",
        title: "Environment and Ecosystems",
        points: [
          "National Environmental Surveillance Agency",
          "Composting and Renewable Energy Agency",
          "Water Recycling and Soil Decontamination Centres",
          "Sustainable management of Protected Communal Forests",
        ],
      },
    ],
  },
  {
    id: 4,
    iconKey: "Building2",
    color: "#1d9bf0",
    title: "Administration, Governance, Work and Memory",
    description: "Promote merit, reduce the State's expenses and restore our collective memory",
    chapitres: [
      {
        id: "4-1",
        title: "Merit-Based Administration",
        points: [
          "Civil service recruitment only via examinations",
          "Quarterly Performance Evaluation system",
          "Citizen Ethics and Morality Code (CEMOC)",
          "National Administrative Intranet",
          "Discipline and Whistleblowing Directorate",
        ],
      },
      {
        id: "4-2",
        title: "Reducing the Cost of Government",
        points: [
          "Audit of 70-80 State-owned companies — liquidate non-profitable ones",
          "Cut benefits in kind for senior officials",
          "Mandatory publication of State accounts",
          "Mandatory Administrative Truce in budget crisis periods",
        ],
      },
      {
        id: "4-3",
        title: "Cameroon at Work",
        points: [
          "National culture of work and merit",
          "Annual and seasonal performance bonuses",
          "Full Employment System (SPE)",
          "Industrial Entrepreneur Status (SEI)",
        ],
      },
      {
        id: "4-4",
        title: "Full and Decent Employment",
        points: [
          "Employment State Council (EGE)",
          "Youth Contracts tailored to first jobs",
          "Experience-to-Diploma Validation System",
          "Informal Workers' Retirement Savings",
          "Legal status for sex workers with a professional card",
        ],
      },
      {
        id: "4-5",
        title: "Land Reform",
        points: [
          "Specialized Land Titles — Agricultural, Customary, Industrial",
          "Land and Real Estate Capital Gains Tax",
          "Municipal/Regional/National Land Use Map",
          "Computerization of the national cadastre",
        ],
      },
      {
        id: "4-6",
        title: "Restoring Historical Memory",
        points: [
          "National, Regional and Municipal Libraries",
          "Presidents' Cemetery to honour heads of state",
          "Recognition of national heroes (Um Nyobè, Félix Moumié)",
          "Curriculum reform — authentic Cameroonian history",
          "Cameroonian Language Code to value local languages",
        ],
      },
    ],
  },
  {
    id: 5,
    iconKey: "Hospital",
    color: "#ff700c",
    title: "Education, Health and Social",
    description: "Guarantee universal access to quality education, healthcare and social protection",
    chapitres: [
      {
        id: "5-1",
        title: "Development-Aligned Education",
        points: [
          "Merging Anglophone/Francophone systems into a bilingual one",
          "Specialized Primary Schools from grade one",
          "Specialized Secondary Colleges for strategic sectors",
          "Specialized Universities — Agriculture, Mining, Sports, Aeronautics",
          "Higher teacher salaries — Special ZEP allowance",
          "School Life Assistants for struggling students",
        ],
      },
      {
        id: "5-2",
        title: "Healthcare for All",
        points: [
          "Universal Health Coverage (CSU) — free or reduced access",
          "Compulsory Health Insurance (AMO)",
          "Health Account and Health Card for every citizen",
          "Electronic Medical Records — full digitization",
          "Teleconsultation Centres in rural areas",
          "Recognized and regulated traditional medicine service",
        ],
      },
      {
        id: "5-3",
        title: "Water and Electricity for All",
        points: [
          "National Cameroon Water Company (SNEC)",
          "National Electricity Company — re-nationalization",
          "Water and Energy Credits for households",
          "Village water reservoirs and basins",
          "Goal — universal drinking water and electricity by 2035",
        ],
      },
      {
        id: "5-4",
        title: "Physical Education and Sports",
        points: [
          "Cameroonian Bank for Sports (BCS)",
          "Regional Sports Development Centres",
          "Multisport Municipal Complexes in every city",
          "National School for Sports Coaching and Medicine",
          "Athlete Status with social coverage",
        ],
      },
      {
        id: "5-5",
        title: "Culture and Arts",
        points: [
          "National Culture and Arts Agency (ANCA)",
          "Culture and Arts Bank (BCA)",
          "Art and Culture Tax on cultural imports",
          "Departmental Arts Colleges",
          "Protection of Cameroonian origin labels",
        ],
      },
      {
        id: "5-6",
        title: "Key Social Questions",
        points: [
          "Regulated legalization of religious activities",
          "National Council for Occult Practices",
          "Compensatory Disability Allowance",
          "Social Non-Exclusion Card for vulnerable people",
          "Homeless Shelter Centres",
        ],
      },
      {
        id: "5-7",
        title: "Healthy Social Communication",
        points: [
          "National Social Communication Code",
          "National Media Council (CNM)",
          "Digital space regulation — fight disinformation",
          "Subsidy for quality media in national languages",
        ],
      },
    ],
  },
];

export function getProgram(locale: Locale): Chantier[] {
  return locale === "en" ? en : fr;
}
