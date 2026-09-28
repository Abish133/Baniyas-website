// Portfolio data object
const portfolioData = {
    'community-center': {
        title: 'Community Center',
        date: 'March 15, 2024',
        client: 'City Municipality',
        category: 'Public Spaces',
        location: 'Al Nakheel, RAK-UAE',
        mainImage: 'assets/img/page/portfolio-3.jpg',
        description: 'A vibrant community center designed to foster local engagement and provide a space for various community activities. This project emphasizes accessibility, sustainability, and modern design principles.',
        features: [
            'Multi-purpose event halls',
            'Children\'s activity areas',
            'Senior citizen facilities',
            'Outdoor recreational spaces',
            'Energy-efficient systems',
            'Wheelchair accessibility'
        ],
        additionalImages: [
            'assets/img/about/about-1.jpg',
            'assets/img/page/choose-us.jpg'
        ],
        additionalContent: 'The community center serves as a hub for local residents, featuring state-of-the-art facilities for events, workshops, and recreational activities. Our design prioritizes natural lighting and ventilation to create a welcoming atmosphere for all age groups.'
    },
    'healthcare-facility': {
        title: 'Healthcare Facility',
        date: 'January 20, 2024',
        client: 'RAK Health Authority',
        category: 'Healthcare',
        location: 'Emirates Islamic Tower, Al Nakheel, RAK-UAE',
        mainImage: 'assets/img/page/portfolio-1.jpg',
        description: 'A modern healthcare facility designed with patient comfort and medical efficiency in mind. The project incorporates advanced medical infrastructure with healing-focused architectural elements.',
        features: [
            'Advanced medical equipment integration',
            'Patient-centered design approach',
            'Infection control systems',
            'Natural healing environments',
            'Emergency response optimization',
            'Sustainable building materials'
        ],
        additionalImages: [
            'assets/img/about/about-1.jpg',
            'assets/img/page/choose-us.jpg'
        ],
        additionalContent: 'This healthcare facility sets new standards for medical architecture in the region, combining cutting-edge technology with compassionate design to create spaces that promote healing and well-being for patients and staff alike.'
    },
    'seaside-resort': {
        title: 'Seaside Resort Expansion',
        date: 'November 10, 2023',
        client: 'Coastal Hospitality Group',
        category: 'Hospitality',
        location: 'RAK Coastal Area, UAE',
        mainImage: 'assets/img/page/portfolio-6.jpg',
        description: 'An elegant resort expansion project that seamlessly blends luxury accommodations with the natural coastal environment. The design emphasizes sustainable tourism and environmental preservation.',
        features: [
            'Eco-friendly construction materials',
            'Ocean-view suites and villas',
            'Sustainable water management',
            'Native landscape integration',
            'Renewable energy systems',
            'Cultural design elements'
        ],
        additionalImages: [
            'assets/img/about/about-1.jpg',
            'assets/img/page/choose-us.jpg'
        ],
        additionalContent: 'The resort expansion project demonstrates our commitment to sustainable hospitality development, creating luxurious spaces that respect and enhance the natural coastal environment while providing world-class amenities for guests.'
    },
    'urban-mall': {
        title: 'Urban Mall Development',
        date: 'October 10, 2023',
        client: 'UAE Retail Ventures',
        category: 'Retail',
        location: 'Al Nakheel Commercial District, RAK-UAE',
        mainImage: 'assets/img/page/portfolio-2.jpg',
        description: 'A comprehensive retail development that redefines the shopping experience through innovative design and customer-centric spaces. The project integrates retail, dining, and entertainment in a cohesive architectural vision.',
        features: [
            'Conceptualisation and Ideation',
            'Material Selection and Sustainability',
            'Detailed Design Development',
            'Building Code Compliance and Safety',
            'Sustainability Environmental Considerations',
            'Final Construction Documents'
        ],
        additionalImages: [
            'assets/img/about/about-1.jpg',
            'assets/img/page/choose-us.jpg'
        ],
        additionalContent: 'In addition to retail spaces, our portfolio also includes community developments that focus on enhancing local engagement. This mall project incorporates outdoor spaces for recreation and community gatherings, fostering a sense of belonging among visitors.'
    },
    'modern-architecture': {
        title: 'Modern Architecture',
        date: 'September 5, 2023',
        client: 'Progressive Developers',
        category: 'Modern',
        location: 'RAK Downtown, UAE',
        mainImage: 'assets/img/page/portfolio-8.jpg',
        description: 'A striking example of contemporary architectural design that pushes boundaries while maintaining functionality. This project showcases innovative use of materials and space optimization.',
        features: [
            'Cutting-edge design concepts',
            'Smart building technologies',
            'Flexible space configurations',
            'Advanced facade systems',
            'Integrated renewable energy',
            'Future-ready infrastructure'
        ],
        additionalImages: [
            'assets/img/about/about-1.jpg',
            'assets/img/page/choose-us.jpg'
        ],
        additionalContent: 'This modern architecture project represents the future of building design, incorporating smart technologies and sustainable practices to create spaces that adapt to changing needs while minimizing environmental impact.'
    },
    'industrial-warehouse': {
        title: 'Industrial Warehouse',
        date: 'August 15, 2023',
        client: 'Logistics Solutions LLC',
        category: 'Industrial',
        location: 'RAK Industrial Zone, UAE',
        mainImage: 'assets/img/page/portfolio-7.jpg',
        description: 'A state-of-the-art industrial facility designed for maximum efficiency and operational flexibility. The project optimizes workflow while incorporating modern safety and environmental standards.',
        features: [
            'Optimized workflow design',
            'Advanced loading systems',
            'Climate control solutions',
            'Safety compliance systems',
            'Scalable infrastructure',
            'Environmental protection measures'
        ],
        additionalImages: [
            'assets/img/about/about-1.jpg',
            'assets/img/page/choose-us.jpg'
        ],
        additionalContent: 'This industrial warehouse project demonstrates our expertise in functional design, creating spaces that maximize operational efficiency while maintaining the highest standards of worker safety and environmental responsibility.'
    }
};

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to load portfolio details
function loadPortfolioDetails() {
    const projectId = getUrlParameter('project');
    
    if (projectId && portfolioData[projectId]) {
        const project = portfolioData[projectId];
        
        // Update page title
        document.title = `${project.title} - BANI YAS BUILDING CONTG.LLC`;
        
        // Update breadcrumb
        const breadcrumbTitle = document.querySelector('.breadcrumb__area-content h2');
        if (breadcrumbTitle) {
            breadcrumbTitle.textContent = project.title;
        }
        
        // Update project overview
        const dateElement = document.querySelector('.portfolio__details-overview-item:nth-child(1) h6');
        const clientElement = document.querySelector('.portfolio__details-overview-item:nth-child(2) h6');
        const categoryElement = document.querySelector('.portfolio__details-overview-item:nth-child(3) h6');
        const locationElement = document.querySelector('.portfolio__details-overview-item:nth-child(4) h6 a');
        
        if (dateElement) dateElement.textContent = project.date;
        if (clientElement) clientElement.textContent = project.client;
        if (categoryElement) categoryElement.textContent = project.category;
        if (locationElement) {
            locationElement.textContent = project.location;
            locationElement.href = `https://www.google.com/maps?q=${encodeURIComponent(project.location)}`;
        }
        
        // Update main content
        const mainImage = document.querySelector('.portfolio__details-area img');
        const titleElement = document.querySelector('.portfolio__details-area h3');
        const descriptionElement = document.querySelector('.portfolio__details-area p');
        
        if (mainImage) mainImage.src = project.mainImage;
        if (titleElement) titleElement.textContent = project.title;
        if (descriptionElement) descriptionElement.textContent = project.description;
        
        // Update feature lists
        const featureLists = document.querySelectorAll('.portfolio__details-area-list');
        if (featureLists.length >= 2 && project.features.length >= 6) {
            // First list (first 3 features)
            const firstListItems = featureLists[0].querySelectorAll('li');
            for (let i = 0; i < Math.min(3, firstListItems.length); i++) {
                if (project.features[i]) {
                    firstListItems[i].innerHTML = `<i class="fas fa-check"></i>${project.features[i]}`;
                }
            }
            
            // Second list (next 3 features)
            const secondListItems = featureLists[1].querySelectorAll('li');
            for (let i = 0; i < Math.min(3, secondListItems.length); i++) {
                if (project.features[i + 3]) {
                    secondListItems[i].innerHTML = `<i class="fas fa-check"></i>${project.features[i + 3]}`;
                }
            }
        }
        
        // Update additional content
        const additionalContentElement = document.querySelector('.portfolio__details-area p:last-of-type');
        if (additionalContentElement) {
            additionalContentElement.textContent = project.additionalContent;
        }
        
        // Update additional images
        const additionalImages = document.querySelectorAll('.portfolio__details-area-image img');
        if (additionalImages.length >= 2 && project.additionalImages.length >= 2) {
            additionalImages[0].src = project.additionalImages[0];
            additionalImages[1].src = project.additionalImages[1];
        }
    }
}

// Load portfolio details when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the portfolio details page
    if (window.location.pathname.includes('portfolio-details') || window.location.href.includes('portfolio-details')) {
        loadPortfolioDetails();
    }
});