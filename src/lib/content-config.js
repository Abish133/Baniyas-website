import { HOME_FAQS } from '@/lib/constants/home-faqs';

// Editable page text, images and lists (stored in site_settings).
// One entry per admin "Page content" screen. Each field's `default` is the
// original website content, used until the admin saves something else.
//
// Field types:
//   text        single line
//   textarea    multi line (line breaks kept)
//   paragraphs  multi line, a blank line starts a new paragraph
//   image       upload, validated with IMAGE_RULES[rules]
//   video       upload, validated with VIDEO_RULES[rules]
//   faqs        question/answer list (JSON)
//   cards       icon/title/text list (JSON)
// `required: false` fields may be cleared; empty hides that item on the site.

// Icons offered for cards (theme flaticons plus the Font Awesome icons the original site used).
export const EXTRA_CARD_ICONS = ['fas fa-handshake', 'fas fa-leaf', 'fas fa-shield-alt', 'fas fa-hard-hat', 'fas fa-tools', 'fas fa-users', 'fas fa-star', 'fas fa-check-circle'];

const faqsToText = (faqs) =>
  faqs.map((faq) => ({
    question: faq.question,
    answer: `${faq.intro}\n${faq.points.map((point) => `- ${point.title} ${point.text}`).join('\n')}`,
  }));

const CORE_VALUES = [
  { icon: 'flaticon-award', title: 'Excellence', text: 'We strive for excellence in quality and we continuously innovate utilizing advanced technologies.' },
  { icon: 'flaticon-team', title: 'Teamwork', text: "We insist on mutual respect, cooperation and mutual encouragement to achieve each individual's potential." },
  { icon: 'flaticon-handshake', title: 'Integrity', text: 'We act with reliability, honesty and fairness.' },
  { icon: 'fas fa-handshake', title: 'Commitment', text: 'We are fully dedicated to delivering our objectives through the most efficient use of resources.' },
  { icon: 'fas fa-leaf', title: 'Sustainability', text: 'We are committed to safeguarding all stakeholders, including especially the health and safety of our employees, society as a whole and the environment.' },
  { icon: 'fas fa-shield-alt', title: 'Accountability', text: 'We are fully accountable for carrying out our responsibilities in accordance to the values and principles of Bani Yas Building Contg. LLC.' },
];

const BENEFITS = [
  { icon: 'flaticon-team', title: 'Professional Growth', text: 'Continuous learning opportunities and career advancement programs' },
  { icon: 'flaticon-medical', title: 'Health Insurance', text: 'Comprehensive medical coverage for you and your family' },
  { icon: 'flaticon-clock', title: 'Work-Life Balance', text: 'Flexible working arrangements and generous vacation time' },
];

export const CONTENT_PAGES = {
  home: {
    title: 'Home page',
    description: 'Banner, about block, services heading, FAQs and the call to action of the home page.',
    siteHref: '/',
    sections: [
      {
        title: 'Banner',
        icon: 'fa-regular fa-film',
        description: 'Full-screen video banner at the top of the home page.',
        fields: [
          { key: 'home.banner_subtitle', label: 'Small text above the title', max: 40, col: 'col-md-6', default: 'BANI YAS BUILDERS' },
          { key: 'home.trusted_clients_title', label: 'Trusted clients heading', max: 40, col: 'col-md-6', default: 'Our Trusted Clients' },
          { key: 'home.banner_title', label: 'Title (line 1)', max: 40, col: 'col-md-6', default: 'Shaping Futures' },
          { key: 'home.banner_title2', label: 'Title (line 2)', max: 40, col: 'col-md-6', default: 'Build to Last' },
          { key: 'home.banner_button1', label: 'Button 1 (to Contact)', max: 25, col: 'col-md-6', default: 'Start Today' },
          { key: 'home.banner_button2', label: 'Button 2 (to Portfolio)', max: 25, col: 'col-md-6', default: 'visit Portfolio' },
          { key: 'home.banner_video', label: 'Background video', type: 'video', rules: 'homeBanner', default: '/assets/img/banner/banner.mp4' },
          {
            key: 'home.banner_poster', label: 'Still image (shown until the video plays)', type: 'image', rules: 'bannerPoster',
            default: '/assets/img/banner/banner-poster.jpg',
          },
        ],
      },
      {
        title: 'About block',
        icon: 'fa-regular fa-building',
        description: '"Welcome to Bani Yas Builders" with the counters.',
        fields: [
          { key: 'home.about_subtitle', label: 'Small text above the title', max: 40, col: 'col-md-6', default: 'About Our Company' },
          { key: 'home.about_button', label: 'Button text (to About)', max: 25, col: 'col-md-6', default: 'Our Story' },
          { key: 'home.about_title', label: 'Title', max: 80, default: 'Welcome to Bani Yas Builders' },
          {
            key: 'home.about_text', label: 'Text', type: 'textarea', max: 600, rows: 3,
            default: 'Bani Yas Building Contg LLC is a multidisciplinary Civil Engineering Construction company with proven capabilities over a wide range of different technical fields in the Civil Engineering Industry since 2008.',
          },
          { key: 'home.about_image', label: 'Image', type: 'image', rules: 'homeAbout', default: '/assets/img/about/about-6.png' },
        ],
      },
      {
        title: 'Services section',
        icon: 'fa-regular fa-helmet-safety',
        description: 'Heading and image above the services slider.',
        fields: [
          { key: 'home.services_subtitle', label: 'Small text above the title', max: 40, col: 'col-md-6', default: 'Our Services' },
          { key: 'home.services_title', label: 'Title', max: 80, col: 'col-md-6', default: 'Our end to end offerings' },
          { key: 'home.services_image', label: 'Section image', type: 'image', rules: 'servicesSection', default: '/assets/img/page/services.jpg' },
        ],
      },
      {
        title: 'FAQs',
        icon: 'fa-regular fa-circle-question',
        description: 'Accordion near the bottom of the home page. The first question is shown open.',
        fields: [
          { key: 'home.faq_title', label: 'Heading', max: 40, default: 'FAQs' },
          {
            key: 'home.faqs', label: 'Questions', type: 'faqs', max: 12, required: false,
            help: 'In an answer, start a line with "- " to make a bullet point. Text up to the first ":" of a bullet is shown in bold.',
            default: JSON.stringify(faqsToText(HOME_FAQS)),
          },
        ],
      },
      {
        title: 'Call to action',
        icon: 'fa-regular fa-bullhorn',
        description: 'Banner above the home page footer.',
        fields: [
          { key: 'home.cta_title', label: 'Title', max: 100, default: "Partner with us and let's build something remarkable together" },
          { key: 'home.cta_button', label: 'Button text (to Contact)', max: 25, default: 'Free Consultation' },
        ],
      },
    ],
  },

  about: {
    title: 'About page',
    description: 'Every section of the About page except the client list.',
    siteHref: '/about',
    sections: [
      {
        title: 'Introduction',
        icon: 'fa-regular fa-building',
        fields: [
          { key: 'about.intro_subtitle', label: 'Small text above the title', max: 40, col: 'col-md-6', default: 'About Our Company' },
          { key: 'about.intro_button', label: 'Button text (to Portfolio)', max: 25, col: 'col-md-6', default: 'See Projects' },
          { key: 'about.intro_title', label: 'Title', max: 80, default: 'Trusted Partner in Construction and Design' },
          { key: 'about.intro_badge', label: 'Badge text', type: 'textarea', max: 60, rows: 2, help: 'Shown on the image badge. Each line on its own line.', default: 'Building Trust\nSince 2008' },
          {
            key: 'about.intro_text', label: 'Text', type: 'paragraphs', max: 3000, rows: 10,
            default: [
              'At Bani Yas Building Contg. LLC, we are a dedicated multidisciplinary civil engineering construction company with proven capabilities over a wide range of different technical fields in the Civil Engineering Industry since 2008. Bani Yas has established itself over the years since then. We have built a reputation for quality, safety and precision across sectors such as manufacturing, energy, logistics and processing.',
              'Our team of seasoned engineers, project managers, and skilled tradespeople bring deep expertise in complex industrial projects - from large scale factories and warehouses to specialized plants and infrastructure. We understand the critical importance of operational efficiency, regulatory compliance and safety standards in industrial environments and we build with those priorities in mind.',
              "With a commitment to innovation, sustainability and on-time delivery, Bani Yas Building Contg. LLC is a trusted partner for industrial clients who demand excellence. We don't just build facilities - we build the future of industry.",
            ].join('\n\n'),
          },
          { key: 'about.intro_image', label: 'Main image', type: 'image', rules: 'aboutIntro', default: '/assets/img/about/about-4.jpg' },
          { key: 'about.intro_badge_image', label: 'Badge background image', type: 'image', rules: 'aboutBadge', default: '/assets/img/page/portfolio-8.jpg' },
        ],
      },
      {
        title: 'Vision & Mission',
        icon: 'fa-regular fa-bullseye-arrow',
        fields: [
          { key: 'about.vm_subtitle', label: 'Small text above the title', max: 40, col: 'col-md-6', default: 'Our Foundation' },
          { key: 'about.vm_title', label: 'Title', max: 60, col: 'col-md-6', default: 'Vision & Mission' },
          { key: 'about.vision_title', label: 'Vision heading', max: 40, default: 'Our Vision' },
          {
            key: 'about.vision_text', label: 'Vision text', type: 'textarea', max: 800, rows: 3,
            default: 'Our goal is to build a tradition of trust and be a leading construction company in the global market by pioneering sustainable building practices and creating iconic structures.',
          },
          { key: 'about.mission_title', label: 'Mission heading', max: 40, default: 'Our Mission' },
          {
            key: 'about.mission_text', label: 'Mission text', type: 'textarea', max: 800, rows: 4,
            default: 'To support and inspire the world by building a better future with our innovative building solutions. Our values are to be the builder of choice and to grow by continually providing useful and significant products, services and solutions to markets we already serve.',
          },
        ],
      },
      {
        title: "Managing Director's message",
        icon: 'fa-regular fa-quote-left',
        fields: [
          { key: 'about.md_subtitle', label: 'Small text above the title', max: 40, col: 'col-md-6', default: 'Leadership' },
          { key: 'about.md_title', label: 'Title', max: 80, col: 'col-md-6', default: 'Message from Managing Director' },
          { key: 'about.md_image', label: 'Photo', type: 'image', rules: 'mdPhoto', default: '/assets/img/about/MD.jpeg' },
          {
            key: 'about.md_text', label: 'Message', type: 'paragraphs', max: 4000, rows: 12,
            default: [
              'We believe that hard work combined with smart work is the key to success. Through these years our company has come through a lot of ups and downs and has carved a niche out for itself in the construction and engineering landscape and emerged as one of the top construction companies in Ras Al Khaimah.',
              'Bani Yas Building Contg. LLC has earned a reputation among its clients for its reliability and integrity towards the work. Bani Yas Building Contg. LLC has the capability and accountability to timely deliver the projects to clients with the highest standard of quality, also exceeding their expectations. We also upgrade ourselves with the latest tools and machinery to complete the projects efficiently and effectively.',
              'We have achieved this success because of the dedication and hard work of our employees and workers towards their work. They have contributed more for the growth and development of the company.',
              'We would like to thank our valued clients for their unending support and employees for their cooperation and hard work in making the Bani Yas Building Contg. LLC success possible. Looking forward, the aim of Bani Yas Building Contg. LLC is to continue providing quality construction with innovative ideas, adopt better management and construction techniques.',
            ].join('\n\n'),
          },
        ],
      },
      {
        title: 'Core values',
        icon: 'fa-regular fa-gem',
        fields: [
          { key: 'about.values_subtitle', label: 'Small text above the title', max: 40, col: 'col-md-6', default: 'Our Principles' },
          { key: 'about.values_title', label: 'Title', max: 60, col: 'col-md-6', default: 'Our Core Values' },
          { key: 'about.values', label: 'Values', type: 'cards', max: 9, help: 'Shown three per row.', default: JSON.stringify(CORE_VALUES) },
        ],
      },
      {
        title: 'Organisation chart',
        icon: 'fa-regular fa-sitemap',
        fields: [
          { key: 'about.org_heading', label: 'Section heading', max: 60, default: 'Organizational chart' },
          { key: 'about.org_subtitle', label: 'Small text above the title', max: 40, col: 'col-md-6', default: 'Construction Advices' },
          { key: 'about.org_title', label: 'Title', max: 80, col: 'col-md-6', default: '"Built Around Human Potential."' },
          {
            key: 'about.org_text', label: 'Text', type: 'paragraphs', max: 3000, rows: 10,
            default: [
              'At Baniyas Builders, our greatest asset is our team. With a solid foundation built on experience, integrity, and a shared commitment to excellence, our people are the driving force behind every successful project we deliver.',
              "From visionary architects and meticulous engineers to seasoned project managers and skilled tradespeople, each member of the Baniyas Builders team brings a deep understanding of the construction industry and a passion for building the right way — safely, efficiently, and to the highest standards. We believe in collaboration at every level. Our hands-on leadership style ensures clear communication, timely decision-making, and seamless coordination across every phase of the construction process. Whether we're delivering a luxury villa, a commercial development, or an infrastructure project, our team works with one goal in mind: to exceed expectations and build lasting trust. When you choose Baniyas Builders, you're not just hiring a contractor — you're partnering with a team that’s committed to your vision, focused on quality, and dedicated to delivering results that stand the test of time.",
            ].join('\n\n'),
          },
          { key: 'about.org_image', label: 'Chart image', type: 'image', rules: 'orgChart', default: '/assets/img/bani_org_chart (2).png' },
        ],
      },
      {
        title: 'Clients section',
        icon: 'fa-regular fa-users',
        description: 'Heading of the client list (the names are managed under "Our Clients").',
        fields: [
          { key: 'about.clients_subtitle', label: 'Small text above the title', max: 30, col: 'col-md-6', default: 'Our Partners' },
          { key: 'about.clients_title', label: 'Title', max: 60, col: 'col-md-6', default: 'Our Clients' },
        ],
      },
    ],
  },

  careers: {
    title: 'Careers page',
    description: 'Introduction and employee benefits (job openings are managed under "Job Openings").',
    siteHref: '/careers',
    sections: [
      {
        title: 'Introduction',
        icon: 'fa-regular fa-user-plus',
        fields: [
          { key: 'careers.intro_subtitle', label: 'Small text above the title', max: 40, col: 'col-md-6', default: 'Join Our Team' },
          { key: 'careers.intro_title', label: 'Title', max: 80, col: 'col-md-6', default: 'Build Your Future With Us' },
          {
            key: 'careers.intro_text', label: 'Text', type: 'paragraphs', max: 2000, rows: 7,
            default: [
              'At Bani Yas Building Contg. LLC, we believe our people are our greatest asset. Join a team of dedicated professionals who are passionate about creating exceptional construction projects and building lasting careers.',
              'We offer competitive compensation, comprehensive benefits, and opportunities for professional growth in a dynamic work environment.',
            ].join('\n\n'),
          },
          { key: 'careers.intro_image', label: 'Image', type: 'image', rules: 'careersIntro', default: '/assets/img/team/team-1.jpg' },
        ],
      },
      {
        title: 'Employee benefits',
        icon: 'fa-regular fa-gift',
        fields: [
          { key: 'careers.benefits_subtitle', label: 'Small text above the title', max: 40, col: 'col-md-6', default: 'Why Choose Us' },
          { key: 'careers.benefits_title', label: 'Title', max: 60, col: 'col-md-6', default: 'Employee Benefits' },
          { key: 'careers.benefits', label: 'Benefits', type: 'cards', max: 9, required: false, help: 'Shown three per row. Remove all to hide the section.', default: JSON.stringify(BENEFITS) },
        ],
      },
    ],
  },

  layout: {
    title: 'Footer & sidebar',
    description: 'Text shown on every page: footer, sidebar menu and copyright line.',
    siteHref: '/',
    sections: [
      {
        title: 'Footer',
        icon: 'fa-regular fa-table-layout',
        fields: [
          { key: 'layout.footer_cta', label: 'Call to action above the footer (inner pages)', max: 100, default: 'Your Dream Project Awaits — Get Started Today!' },
          { key: 'layout.footer_tagline', label: 'Text under the logo', max: 100, default: 'We have Solutions for every construction' },
          { key: 'layout.copyright', label: 'Copyright text', max: 100, help: 'Shown as "Copyright <current year> – <this text>". The year updates automatically.', default: 'All Rights Reserved By Bani Yas' },
        ],
      },
      {
        title: 'Sidebar menu',
        icon: 'fa-regular fa-bars',
        description: 'The panel that opens from the menu button in the header.',
        fields: [
          { key: 'layout.sidebar_text', label: 'Text under the logo', type: 'textarea', max: 250, rows: 3, default: 'Redefining the construction industry with innovative solutions, cutting-edge technology and sustainable practices' },
        ],
      },
    ],
  },

  seo: {
    title: 'SEO & sharing',
    description: 'What Google shows in search results, and the preview when a link is shared (WhatsApp, LinkedIn, …).',
    siteHref: '/',
    sections: [
      {
        title: 'Sharing image',
        icon: 'fa-regular fa-image',
        fields: [{ key: 'seo.share_image', label: 'Preview image', type: 'image', rules: 'shareImage', default: '/assets/img/banner/banner.jpg' }],
      },
      ...[
        ['home', 'Home page', 'BANI YAS BUILDING CONTG.LLC', 'Bani Yas Building Contracting LLC is a civil engineering and industrial construction company in Ras Al Khaimah, UAE, delivering projects since 2008.'],
        ['about', 'About page', 'About Us', 'Learn about Bani Yas Building Contracting LLC: our story since 2008, vision and mission, core values, leadership and team in Ras Al Khaimah, UAE.'],
        ['services', 'Services page', 'Services', 'Industrial construction services in the UAE: concrete silos, factory sheds, kiln foundations, prefabricated buildings and cement factory works.'],
        ['portfolio', 'Portfolio page', 'Portfolio', 'Completed and ongoing construction projects by Bani Yas Building Contracting LLC across Ras Al Khaimah and the UAE.'],
        ['careers', 'Careers page', 'Careers', 'Join Bani Yas Building Contracting LLC. See current job openings and employee benefits at our construction company in Ras Al Khaimah, UAE.'],
        ['contact', 'Contact page', 'Contact Us', 'Contact Bani Yas Building Contracting LLC in Ras Al Khaimah, UAE — phone, email, office address and enquiry form.'],
      ].map(([page, label, title, description]) => ({
        title: label,
        icon: 'fa-regular fa-magnifying-glass',
        fields: [
          { key: `seo.${page}_title`, label: 'Page title', max: 70, help: 'Shown in the browser tab and as the Google result title (about 50–60 characters).', default: title },
          { key: `seo.${page}_description`, label: 'Description', type: 'textarea', max: 170, rows: 2, help: 'Shown under the title in Google (about 120–160 characters).', default: description },
        ],
      })),
    ],
  },

  legal: {
    title: 'Legal pages',
    description: 'Terms & Conditions and Privacy Policy pages. Leave a page empty to hide it and its footer link.',
    siteHref: '/',
    sections: [
      {
        title: 'Terms & Conditions',
        icon: 'fa-regular fa-file-contract',
        description: 'Shown at /terms.',
        fields: [{ key: 'legal.terms', label: 'Text', type: 'paragraphs', max: 20000, rows: 16, required: false, help: 'A blank line starts a new paragraph. Start a line with "## " for a heading.', default: '' }],
      },
      {
        title: 'Privacy Policy',
        icon: 'fa-regular fa-user-shield',
        description: 'Shown at /privacy.',
        fields: [{ key: 'legal.privacy', label: 'Text', type: 'paragraphs', max: 20000, rows: 16, required: false, help: 'A blank line starts a new paragraph. Start a line with "## " for a heading.', default: '' }],
      },
    ],
  },
};

export const CONTENT_PAGE_KEYS = Object.keys(CONTENT_PAGES);

export function contentFields(pageKey) {
  return CONTENT_PAGES[pageKey].sections.flatMap((section) => section.fields);
}

const ALL_FIELDS = CONTENT_PAGE_KEYS.flatMap(contentFields);

export const CONTENT_DEFAULTS = Object.fromEntries(ALL_FIELDS.map((field) => [field.key, field.default]));

/** Keys that may be saved empty on purpose (empty hides the item). */
export const OPTIONAL_CONTENT_KEYS = ALL_FIELDS.filter((field) => field.required === false).map((field) => field.key);

// ---------------------------------------------------------------------------
// Helpers for rendering the stored values.
// ---------------------------------------------------------------------------

/** Splits text on blank lines. */
export function toParagraphs(text) {
  return (text || '')
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function toLines(text) {
  return (text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseJsonList(value) {
  try {
    const list = JSON.parse(value || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}
