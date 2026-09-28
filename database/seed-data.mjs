// Initial website content — mirrors the original static HTML site exactly.
import fs from 'node:fs';
import path from 'node:path';

export const settings = {
  'home.trusted_clients_title': 'Our Trusted Clients',
  'home.services_subtitle': 'Our Services',
  'home.services_title': 'Our end to end offerings',
  'home.services_image': '/assets/img/page/services.jpg',
  'about.clients_subtitle': 'Our Partners',
  'about.clients_title': 'Our Clients',
};

export const trustedClients = [
  { name: 'Ocean Rubber Factory', logo: '/assets/img/brand/brand-1.png' },
  { name: 'RAK Ceramics', logo: '/assets/img/brand/brand-2.png' },
  { name: 'Embosal Steel Mills', logo: '/assets/img/brand/brand-3.png' },
  { name: 'Ayoki Fabricon', logo: '/assets/img/brand/brand-4.png' },
  { name: 'Pioneer Cement Industries', logo: '/assets/img/brand/brand-5.png' },
  { name: 'Danube Home', logo: '/assets/img/brand/brand-6.png' },
  { name: 'Vertiv', logo: '/assets/img/ver.png' },
];

export const homeStats = [
  { label: 'Complete Projects', value: 35, suffix: '+' },
  { label: 'Team Members', value: 70, suffix: '+' },
  { label: 'Clients', value: 35, suffix: '+' },
];

export const services = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'database', 'seed-services.json'), 'utf8')
);

export const homeProjects = [
  { title: 'VERTIV New Factory', location: 'Alghail', image: '/assets/img/gallery/3.jpg' },
  { title: 'RAK Steel Building', location: 'Ras Al Khaimah', image: '/assets/img/gallery/5.jpg' },
  { title: 'Embosal Steel Mill', location: 'Algail', image: '/assets/img/project/pr-14.jpg' },
  { title: 'Cimaf Cement Factory', location: 'Tema, Ghana', image: '/assets/img/project/pr-13.jpg' },
];

export const portfolioProjects = [
  { caption: 'CIVIL CONSTRUCTION OF CIMAF GRINDING MILL, CEMENT SILO & CLINKER SILO @ TEMA, GHANA – WEST AFRICA', image: '/assets/img/project/pr-1.jpg' },
  { caption: 'PORT CONVEYOR PROJECT@FUJAIRAH', image: '/assets/img/project/pr-2.jpg' },
  { caption: 'FACTORY SHED,ACCOMODATION,KITCHEN&DINING PROJECT @AL HAMRA INDUSTRIAL ZONE,AL JAZEERA', image: '/assets/img/project/pr-3.jpg' },
  { caption: 'PORT CONVEYOR PROJECT @ FUJAIRAH', image: '/assets/img/project/pr-4.jpg' },
  { caption: 'FACTORY SHED,ACCOMMODATION,KITCHEN&DINING PROJECT@AL HAMRA INDUSTRIAL ZONE,AL JAZEERA', image: '/assets/img/project/pr-5.jpg' },
  { caption: 'LABOUR ACCOMMODATION@AL GHAIL INDUSTRIAL PARK', image: '/assets/img/project/pr-6.jpg' },
  { caption: 'PORT OF FUJAIRAH - UNDERGROUND CONVEYOR TUNNEL PROJECT', image: '/assets/img/project/pr-7.jpg' },
  { caption: 'UNDERGROUND WATER TANK - BATWAL GROUP, FUJAIRAH', image: '/assets/img/project/pr-8.jpg' },
  { caption: 'RAK STEEL BUILDING - RAS AL KHAIMAH', image: '/assets/img/project/pr-9.jpg' },
  { caption: 'VERTIV FACTORY SHED, ACCOMMODATION, KITCHEN & DINING PROJECT - AL HAMRA INDUSTRIAL ZONE, AL JAZEERA', image: '/assets/img/project/pr-10.jpg' },
  { caption: 'PORT OF FUJAIRAH - UNDERGROUND CONVEYOR TUNNEL PROJECT', image: '/assets/img/project/pr-11.jpg' },
  { caption: 'VERTIV NEW FACTORY - ALGHAIL', image: '/assets/img/project/pr-12.jpg' },
  { caption: 'CIMAF CEMENT FACTORY - TEMA, GHANA', image: '/assets/img/project/pr-13.jpg' },
  { caption: 'EMBOSAL STEEL MILL - ALGAIL', image: '/assets/img/project/pr-14.jpg' },
];

export const clients = [
  'M/S Vertiv Gulf LLC',
  'M/S Arabian Explosive LLC',
  'M/S OCEAN RUBBER FACTORY',
  'M/S R A K CERAMICS',
  'M/S Embosal Steel mills LLC',
  'M/S CORE METAL LLC',
  'M/S UNION FIBRE GLASS LLC',
  'M/S AYOKI FABRIC CON & AYOKI LLC',
  'M/S FOUR LINE INDUSTRIES',
  'M/S WELGATE SCAFFOLDING & TRADING CO. LLC',
  'M/S Danube Home, RAK',
  'M/S J K CEMENT WORKS',
  'M/S PIONEER CEMENT INDUSTRIES',
  'M/S STAR CEMENT',
  'M/S AL-AIN CEMENT FACTORY',
  'SHARJAH CEMENT FACTORY',
  'M/S MECON INDUSTRIES',
  'M/S QUALITY GARNET',
  'M/S UNION CEMENT COMPANY RAK',
  'M/S DUTCO INTERIOR LLC',
  'M/S FINE INDUSTRIES',
  'M/S CEMENT TEC LLC',
  'M/S AL JAZEERA POLYMERS',
  'M/S GULF PIPE',
  'M/S OSIAN PAINT',
  'M/S JULPHAR METAL LLC',
  'M/S GLOBAL RESOURCES',
  'M/S ALFA METAL FABRICS',
  'M/S AL HAMRA REAL ESTATE',
  'M/S AL HAMRA CONSTRUCTIONS',
  'M/S GREEN GLASS INDUSTRIES',
  'M/S DHALU MALL PRINTING',
  'M/S CLUDI RAK',
  'M/S COVE ROTANA BEACH RESORT',
  'Ni-Met Recycle Plant LLC',
];

export const jobOpenings = [
  {
    title: 'Civil Engineer', jobType: 'Full-time', location: 'RAK, UAE', experience: '3+ Years Experience',
    requirements: "Bachelor's degree in Civil Engineering\nExperience in construction project management\nKnowledge of UAE building codes",
  },
  {
    title: 'Project Manager', jobType: 'Full-time', location: 'RAK, UAE', experience: '5+ Years Experience',
    requirements: 'PMP certification preferred\nExperience in industrial construction\nStrong leadership and communication skills',
  },
  {
    title: 'Safety Inspector', jobType: 'Full-time', location: 'RAK, UAE', experience: '2+ Years Experience',
    requirements: 'NEBOSH certification required\nExperience in construction safety\nKnowledge of HSE regulations',
  },
  {
    title: 'Site Supervisor', jobType: 'Full-time', location: 'RAK, UAE', experience: '4+ Years Experience',
    requirements: 'Diploma in Civil Engineering\nExperience in site supervision\nStrong problem-solving skills',
  },
];
