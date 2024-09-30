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

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        hideError();

        const formData = {
            address: form.address.value,
            squareFootage: Number(form.squareFootage.value),
            budget: Number(form.budget.value),
            businessType: form.businessType.value,
            cashFlowType: form.cashFlowType.value
        };

        try {
            const ideas = await fetchOpportunityZoneIdeas(formData);
            displayIdeas(ideas);
        } catch (error) {
            console.error('Error fetching opportunity zone ideas:', error);
            showError('An error occurred while fetching ideas. Please try again.');
        } finally {
            setLoading(false);
        }
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

        showActionableSteps(idea);
        showLocalResources(idea);
    }

    function showActionableSteps(idea) {
        actionableStepsContainer.style.display = 'block';
        actionableStepsContent.innerHTML = `
            <h3>${idea.title} - Actionable Steps</h3>
            <ol>
                <li>Research local zoning laws and regulations for ${idea.title.toLowerCase()}.</li>
                <li>Conduct a market analysis to validate demand for this type of business in the area.</li>
                <li>Develop a detailed business plan, including financial projections.</li>
                <li>Identify potential investors or funding sources familiar with Opportunity Zone investments.</li>
                <li>Consult with a tax professional to understand the tax benefits and requirements of Opportunity Zone investments.</li>
                <li>Begin the process of acquiring or leasing a suitable property within the Opportunity Zone.</li>
                <li>Engage with local community leaders and organizations to build support for your project.</li>
                <li>Start the permitting and licensing process for your business.</li>
                <li>Develop a timeline for project implementation and set milestones.</li>
                <li>Create a marketing strategy to attract customers or tenants to your new venture.</li>
            </ol>
        `;
    }

    function showLocalResources(idea) {
        localResourcesContainer.style.display = 'block';
        localResourcesContent.innerHTML = `
            <h3>${idea.title} - Local Resources and Support</h3>
            <ul>
                <li>Local Economic Development Office: Contact for guidance on local business incentives and regulations.</li>
                <li>Chamber of Commerce: Join to network with local business leaders and access resources.</li>
                <li>Small Business Development Center: Seek free consulting and workshops for business planning.</li>
                <li>Local Zoning Office: Consult for specific zoning requirements related to ${idea.title.toLowerCase()}.</li>
                <li>Community Banks: Explore local financing options familiar with Opportunity Zone investments.</li>
                <li>Industry Associations: Join relevant associations for ${idea.title.toLowerCase()} to access industry-specific resources.</li>
                <li>Local Universities: Partner for research, talent acquisition, or specialized knowledge.</li>
                <li>Mentorship Programs: Connect with experienced entrepreneurs in similar fields.</li>
                <li>Networking Events: Attend local business mixers to build connections and partnerships.</li>
                <li>Online Communities: Join local business forums or social media groups for peer support and advice.</li>
            </ul>
        `;
    }

    async function fetchOpportunityZoneIdeas(formData) {
        // Simulating an API call with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock response data
        const mockIdeas = [
            {
                id: '1',
                title: 'Co-working Space',
                description: 'Create a modern co-working space catering to remote workers and small businesses in the area.',
                potentialROI: '15-20% annually',
            },
            {
                id: '2',
                title: 'Mixed-Use Development',
                description: 'Develop a mixed-use property with retail on the ground floor and apartments above.',
                potentialROI: '12-18% annually',
            },
            {
                id: '3',
                title: 'Sustainable Agriculture Facility',
                description: 'Establish an indoor vertical farming facility to provide fresh produce to local restaurants and markets.',
                potentialROI: '10-15% annually',
            },
        ];

        return mockIdeas;
    }

    // Add this new function for tooltip positioning
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