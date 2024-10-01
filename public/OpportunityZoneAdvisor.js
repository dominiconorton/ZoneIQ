'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('opportunityZoneForm');
    const submitButton = document.getElementById('submitButton');
    const errorMessage = document.getElementById('errorMessage');
    const ideasContainer = document.getElementById('ideasContainer');
    const actionableStepsContainer = document.getElementById('actionableStepsContainer');
    const actionableStepsContent = document.getElementById('actionableStepsContent');
    const localResourcesContainer = document.getElementById('localResourcesContainer');
    const localResourcesContent = document.getElementById('localResourcesContent');

    let selectedIdea = null;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        hideError();

        // Static data for demonstration
        const staticIdeas = [
            {
                id: 1,
                title: "Co-working Space",
                description: "Create a modern co-working space offering innovative workspaces and startup incubation services.",
                potentialROI: "15-20% annually",
                actionableSteps: [
                    "Research local demand for co-working spaces in Opportunity Zones",
                    "Identify a suitable property for renovation or new construction",
                    "Develop a business plan, including financial projections",
                    "Secure funding through Opportunity Zone investors",
                    "Design the space layout and amenities",
                    "Implement marketing strategies to attract tenants",
                    "Establish partnerships with local businesses and startups",
                    "Plan for ongoing management and community building activities"
                ],
                localResources: [
                    {
                        name: "Local Economic Development Office",
                        link: "#",
                        description: "Offers guidance on zoning and business permits"
                    },
                    {
                        name: "Chamber of Commerce",
                        link: "#",
                        description: "Provides networking and local business support"
                    },
                    {
                        name: "Small Business Development Center",
                        link: "#",
                        description: "Offers free business consulting and low-cost training"
                    }
                ]
            },
            {
                id: 2,
                title: "Mixed-use Development",
                description: "Develop a mixed-use property with retail on the ground floor and apartments above.",
                potentialROI: "12-18% annually",
                actionableSteps: [
                    "Conduct market research to determine optimal mix of retail and residential",
                    "Identify potential sites within the Opportunity Zone",
                    "Create architectural plans and obtain necessary permits",
                    "Secure financing, including Opportunity Zone funds",
                    "Begin construction and establish a timeline",
                    "Develop a marketing strategy for both retail and residential spaces",
                    "Create a property management plan",
                    "Plan for community engagement and local economic impact"
                ],
                localResources: [
                    {
                        name: "City Planning Department",
                        link: "#",
                        description: "Provides information on zoning and development regulations"
                    },
                    {
                        name: "Local Real Estate Association",
                        link: "#",
                        description: "Offers market insights and networking opportunities"
                    },
                    {
                        name: "Community Development Corporation",
                        link: "#",
                        description: "Supports neighborhood revitalization efforts"
                    }
                ]
            },
            {
                id: 3,
                title: "Sustainable Agriculture Facility",
                description: "Establish an indoor vertical farming facility to provide fresh produce to local restaurants and grocers.",
                potentialROI: "10-15% annually",
                actionableSteps: [
                    "Research vertical farming technologies and best practices",
                    "Identify a suitable industrial or warehouse space in the Opportunity Zone",
                    "Develop a business plan and financial projections",
                    "Secure Opportunity Zone funding and additional investments",
                    "Design the facility layout and select growing systems",
                    "Obtain necessary permits and certifications",
                    "Establish relationships with local restaurants and grocers",
                    "Implement a marketing strategy emphasizing sustainability and local production"
                ],
                localResources: [
                    {
                        name: "Department of Agriculture Extension Office",
                        link: "#",
                        description: "Provides agricultural expertise and resources"
                    },
                    {
                        name: "Local Food Policy Council",
                        link: "#",
                        description: "Offers insights on local food systems and policies"
                    },
                    {
                        name: "Sustainable Agriculture Association",
                        link: "#",
                        description: "Provides networking and educational resources"
                    }
                ]
            }
        ];

        displayIdeas(staticIdeas);
        setLoading(false);
    }

    function setLoading(isLoading) {
        submitButton.disabled = isLoading;
        submitButton.textContent = isLoading ? 'Loading...' : 'Get Opportunity Zone Ideas';
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    function displayIdeas(ideas) {
        ideasContainer.innerHTML = '';
        if (ideas.length === 0) {
            ideasContainer.innerHTML = '<p>No ideas found.</p>';
            return;
        }

        const header = document.createElement('h2');
        header.textContent = 'Opportunity Zone Ideas';
        ideasContainer.appendChild(header);

        ideas.forEach(idea => {
            const ideaElement = document.createElement('div');
            ideaElement.className = 'idea';
            ideaElement.innerHTML = `
                <h3>${idea.title}</h3>
                <p>${idea.description}</p>
                <p class="potential-roi">Potential ROI: ${idea.potentialROI}</p>
            `;
            ideaElement.addEventListener('click', () => selectIdea(idea, ideaElement));
            ideasContainer.appendChild(ideaElement);
        });
    }

    function selectIdea(idea, ideaElement) {
        if (selectedIdea) {
            selectedIdea.classList.remove('selected');
        }
        ideaElement.classList.add('selected');
        selectedIdea = ideaElement;

        showActionableSteps(idea.actionableSteps);
        showLocalResources(idea.localResources);
    }

    function showActionableSteps(steps) {
        actionableStepsContainer.style.display = 'block';
        actionableStepsContent.innerHTML = `
            <h3>Actionable Steps</h3>
            <ol>
                ${steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        `;
    }

    function showLocalResources(resources) {
        localResourcesContainer.style.display = 'block';
        localResourcesContent.innerHTML = `
            <h3>Local Resources and Support</h3>
            <ul>
                ${resources.map(resource => `<li><a href="${resource.link}" target="_blank">${resource.name}</a>: ${resource.description}</li>`).join('')}
            </ul>
        `;
    }

    function positionTooltip(icon) {
        const tooltip = icon;
        const iconRect = icon.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top = iconRect.bottom + window.scrollY + 5; // Add a small offset
        let left = iconRect.left + (iconRect.width / 2) + window.scrollX;

        // Set the tooltip position
        tooltip.style.setProperty('--tooltip-top', `${top}px`);
        tooltip.style.setProperty('--tooltip-left', `${left}px`);

        // Delay the calculation to ensure the tooltip is rendered
        setTimeout(() => {
            const tooltipRect = tooltip.getBoundingClientRect();
            
            // Check if tooltip goes beyond right edge of viewport
            if (left + tooltipRect.width > window.innerWidth) {
                left = window.innerWidth - tooltipRect.width - 10;
            }

            // Check if tooltip goes beyond left edge of viewport
            if (left < 10) {
                left = 10;
            }

            // Check if tooltip goes beyond bottom edge of viewport
            if (top + tooltipRect.height > window.innerHeight + window.scrollY) {
                top = iconRect.top - tooltipRect.height - 5 + window.scrollY; // Add a small offset
            }

            // Update the tooltip position
            tooltip.style.setProperty('--tooltip-top', `${top}px`);
            tooltip.style.setProperty('--tooltip-left', `${left}px`);
        }, 0);
    }

    // Add event listeners for tooltip positioning
    const infoIcons = document.querySelectorAll('.info-icon');
    infoIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => positionTooltip(icon));
        icon.addEventListener('focus', () => positionTooltip(icon));
    });
});