document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        section.classList.add('fade-section'); // Add initial hidden state
        observer.observe(section);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// --- Pricing Toggle Logic ---
const pricingSwitch = document.getElementById('pricing-switch');
const priceValues = document.querySelectorAll('.price-value');
const periodLabels = document.querySelectorAll('.period');
const billingTexts = document.querySelectorAll('.billing-text');
const toggleLabels = document.querySelectorAll('.toggle-label');

if (pricingSwitch) {
    pricingSwitch.addEventListener('change', function () {
        const isYearly = this.checked;

        // Update Labels
        toggleLabels.forEach(label => label.classList.remove('active'));
        if (isYearly) {
            toggleLabels[1].classList.add('active'); // Yearly label
        } else {
            toggleLabels[0].classList.add('active'); // Monthly label
        }

        // Update Prices & Text
        priceValues.forEach((price, index) => {
            if (isYearly) {
                // Set to Yearly
                price.textContent = price.getAttribute('data-yearly');
                // Format with commas
                if (price.textContent.length > 3) {
                    price.textContent = price.textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                if (periodLabels[index]) periodLabels[index].textContent = '/yr';
                if (billingTexts[index]) billingTexts[index].textContent = 'Billed Annually';
            } else {
                // Set to Monthly
                price.textContent = price.getAttribute('data-monthly');
                if (periodLabels[index]) periodLabels[index].textContent = '/mo';
                if (billingTexts[index]) billingTexts[index].textContent = 'Billed Monthly';
            }
        });
    });
}
