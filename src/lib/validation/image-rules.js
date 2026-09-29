// Per-section image constraints. Shared by the admin UI (instant feedback) and the
// server (authoritative check in the Server Actions).

const WEB_IMAGES = ['image/jpeg', 'image/png', 'image/webp'];

export const IMAGE_RULES = {
  trustedClientLogo: {
    label: 'Client logo',
    types: ['image/png', 'image/webp', 'image/jpeg'],
    maxSizeMB: 1,
    minWidth: 200, minHeight: 80,
    maxWidth: 1600, maxHeight: 800,
    minRatio: 1.5, maxRatio: 4,
    recommended: '400 × 160 px, transparent PNG (landscape logo)',
  },
  homeProject: {
    label: 'Project image',
    types: WEB_IMAGES,
    maxSizeMB: 5,
    minWidth: 800, minHeight: 600,
    maxWidth: 6000, maxHeight: 6000,
    recommended: '1600 × 1200 px or larger (shown 620 px tall, cropped to fit)',
  },
  portfolioProject: {
    label: 'Portfolio image',
    types: WEB_IMAGES,
    maxSizeMB: 5,
    minWidth: 500, minHeight: 500,
    maxWidth: 6000, maxHeight: 6000,
    recommended: '1280 × 960 px or larger',
  },
  serviceMain: {
    label: 'Service main image',
    types: WEB_IMAGES,
    maxSizeMB: 2,
    minWidth: 750, minHeight: 450,
    maxWidth: 3000, maxHeight: 2000,
    minRatio: 1.3, maxRatio: 1.9,
    recommended: '872 × 553 px (landscape)',
  },
  serviceDetail: {
    label: 'Service detail image',
    types: WEB_IMAGES,
    maxSizeMB: 1,
    minWidth: 400, minHeight: 230,
    maxWidth: 2000, maxHeight: 1200,
    minRatio: 1.4, maxRatio: 2,
    recommended: '424 × 244 px (landscape)',
  },
  servicesSection: {
    label: 'Services section image',
    types: WEB_IMAGES,
    maxSizeMB: 2,
    minWidth: 900, minHeight: 380,
    maxWidth: 3000, maxHeight: 1500,
    minRatio: 2, maxRatio: 2.8,
    recommended: '1060 × 453 px (wide banner)',
  },
  bannerPoster: {
    label: 'Banner still image',
    types: ['image/jpeg', 'image/webp'],
    maxSizeMB: 1,
    minWidth: 1280, minHeight: 720,
    maxWidth: 3840, maxHeight: 2160,
    minRatio: 1.6, maxRatio: 1.9,
    recommended: '1920 × 1080 px JPG, ideally the first frame of the video',
  },
  homeAbout: {
    label: 'About block image',
    types: WEB_IMAGES,
    maxSizeMB: 2,
    minWidth: 400, minHeight: 300,
    maxWidth: 3000, maxHeight: 3000,
    recommended: '800 × 650 px, transparent PNG',
  },
  aboutIntro: {
    label: 'About image',
    types: WEB_IMAGES,
    maxSizeMB: 3,
    minWidth: 400, minHeight: 500,
    maxWidth: 4000, maxHeight: 5000,
    minRatio: 0.6, maxRatio: 0.95,
    recommended: '564 × 740 px or larger (portrait)',
  },
  aboutBadge: {
    label: 'Badge background',
    types: WEB_IMAGES,
    maxSizeMB: 2,
    minWidth: 600, minHeight: 300,
    maxWidth: 4000, maxHeight: 3000,
    recommended: '1300 × 750 px (landscape)',
  },
  mdPhoto: {
    label: 'Photo',
    types: WEB_IMAGES,
    maxSizeMB: 3,
    minWidth: 300, minHeight: 300,
    maxWidth: 4000, maxHeight: 5000,
    minRatio: 0.6, maxRatio: 1.4,
    recommended: 'at least 600 × 600 px, face centred (shown in a circle)',
  },
  orgChart: {
    label: 'Organisation chart',
    outputMaxSide: 3000, // keep small text readable
    types: WEB_IMAGES,
    maxSizeMB: 5,
    minWidth: 800, minHeight: 800,
    maxWidth: 8000, maxHeight: 8000,
    recommended: 'high resolution PNG, e.g. 2650 × 3750 px',
  },
  careersIntro: {
    label: 'Careers image',
    types: WEB_IMAGES,
    maxSizeMB: 3,
    minWidth: 300, minHeight: 300,
    maxWidth: 4000, maxHeight: 4000,
    recommended: '624 × 740 px or larger',
  },
  shareImage: {
    label: 'Share image',
    types: ['image/jpeg', 'image/png'],
    maxSizeMB: 2,
    minWidth: 600, minHeight: 315,
    maxWidth: 4000, maxHeight: 3000,
    minRatio: 1.5, maxRatio: 2.3,
    recommended: '1200 × 630 px (JPG or PNG)',
  },
};

// Background video of the home banner.
export const VIDEO_RULES = {
  homeBanner: {
    label: 'Banner video',
    types: ['video/mp4', 'video/webm'],
    maxSizeMB: 30,
    recommended: 'MP4 (H.264), 1920 × 1080, 10–30 seconds, no sound, ideally under 5 MB (compress with HandBrake first)',
  },
};

export function describeVideoRules(rules) {
  return `MP4 or WEBM · max ${rules.maxSizeMB} MB. Recommended: ${rules.recommended}.`;
}

const TYPE_LABELS = { 'image/jpeg': 'JPG', 'image/png': 'PNG', 'image/webp': 'WEBP' };

/** Human readable summary shown under each upload field. */
export function describeRules(rules) {
  const types = rules.types.map((t) => TYPE_LABELS[t] || t).join(', ');
  const ratio = rules.minRatio ? ` · aspect ratio ${rules.minRatio}–${rules.maxRatio} (width ÷ height)` : '';
  return `${types} · max ${rules.maxSizeMB} MB · ${rules.minWidth}×${rules.minHeight} to ${rules.maxWidth}×${rules.maxHeight} px${ratio}. Recommended: ${rules.recommended}.`;
}

/**
 * Checks file facts against the rules. Returns an error message or null.
 * @param {{size:number,type:string,width:number,height:number}} info
 */
export function checkImage(info, rules) {
  if (!rules.types.includes(info.type)) {
    return `${rules.label} must be one of: ${rules.types.map((t) => TYPE_LABELS[t] || t).join(', ')}.`;
  }
  if (info.size > rules.maxSizeMB * 1024 * 1024) {
    return `${rules.label} must be ${rules.maxSizeMB} MB or smaller (selected file is ${(info.size / 1024 / 1024).toFixed(2)} MB).`;
  }
  if (info.width < rules.minWidth || info.height < rules.minHeight) {
    return `${rules.label} is too small (${info.width}×${info.height} px). Minimum is ${rules.minWidth}×${rules.minHeight} px.`;
  }
  if (info.width > rules.maxWidth || info.height > rules.maxHeight) {
    return `${rules.label} is too large (${info.width}×${info.height} px). Maximum is ${rules.maxWidth}×${rules.maxHeight} px.`;
  }
  if (rules.minRatio) {
    const ratio = info.width / info.height;
    if (ratio < rules.minRatio || ratio > rules.maxRatio) {
      return `${rules.label} has the wrong shape (ratio ${ratio.toFixed(2)}). It must be between ${rules.minRatio} and ${rules.maxRatio} (width ÷ height).`;
    }
  }
  return null;
}
