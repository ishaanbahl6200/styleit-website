// JavaScript for interactivity will go here 

document.addEventListener('DOMContentLoaded', () => {
    // Old IntersectionObserver for .feature-item has been removed 
    // as .feature-item is no longer used in the primary features section.
    // If .feature-item is used elsewhere for animations, that observer code would need to be managed separately.

    // Logic for interactive features section (hover to change image)
    const featureDetailItems = document.querySelectorAll('.feature-detail-item');
    const currentFeatureImage = document.getElementById('current-feature-image');

    function displayFeature(index) {
        if (index < 0 || index >= featureDetailItems.length) return;

        const item = featureDetailItems[index];
        const newImageSrc = item.dataset.image;

        if (newImageSrc && currentFeatureImage.src !== (window.location.origin + '/' + newImageSrc)) {
            currentFeatureImage.style.opacity = '0';
            currentFeatureImage.style.transform = 'translateY(-30px)';
            setTimeout(() => {
                currentFeatureImage.src = newImageSrc;
                currentFeatureImage.alt = item.querySelector('h3').textContent + " Feature";
                currentFeatureImage.style.transition = 'none'; 
                currentFeatureImage.style.transform = 'translateY(30px)';
                void currentFeatureImage.offsetHeight; 
                currentFeatureImage.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
                currentFeatureImage.style.opacity = '1';
                currentFeatureImage.style.transform = 'translateY(0)';
            }, 300);
        }

        featureDetailItems.forEach(i => i.classList.remove('active-feature'));
        item.classList.add('active-feature');
    }

    if (featureDetailItems.length && currentFeatureImage) {
        // Initial display (first item)
        if (featureDetailItems[0]) {
            displayFeature(0); // Display first feature
        }
        
        // Handle manual hover over feature items
        featureDetailItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                displayFeature(index); 
            });
        });
    }

    // Testimonial Scroller Logic
    const bannerContainer = document.querySelector('.testimonial-banner-container');
    const track = document.querySelector('.testimonial-track');
    const testimonialCards = Array.from(track ? track.children : []);

    if (bannerContainer && track && testimonialCards.length > 0) {
        let scrollSpeed = 0.5; // Pixels per frame, adjust for speed
        let animationFrameId = null;

        testimonialCards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });

        const cardStyle = window.getComputedStyle(testimonialCards[0]);
        const cardMarginRight = parseFloat(cardStyle.marginRight);
        const singleCardWidth = testimonialCards[0].offsetWidth + cardMarginRight;
        const originalTrackWidth = singleCardWidth * testimonialCards.length;
        
        track.style.width = (originalTrackWidth * 2) + 'px'; // Double width for clones

        let currentPosition = 0;

        function animateScroll() {
            currentPosition -= scrollSpeed;
            track.style.transform = `translateX(${currentPosition}px)`;

            // If the first set of cards has scrolled completely out of view, reset position
            if (Math.abs(currentPosition) >= originalTrackWidth) {
                currentPosition = 0; // Reset to the beginning
            }
            animationFrameId = requestAnimationFrame(animateScroll);
        }

        // Start animation
        animationFrameId = requestAnimationFrame(animateScroll);

        // Pause on hover
        bannerContainer.addEventListener('mouseenter', () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        });

        bannerContainer.addEventListener('mouseleave', () => {
            animationFrameId = requestAnimationFrame(animateScroll);
        });
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = questionButton.querySelector('.faq-icon');

        if (questionButton && answer) {
            questionButton.addEventListener('click', () => {
                const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';

                questionButton.setAttribute('aria-expanded', !isExpanded);
                // Answer visibility is handled by CSS based on aria-expanded, no direct style change needed here for max-height
                // if (!isExpanded) {
                //     answer.style.maxHeight = answer.scrollHeight + "px";
                // } else {
                //     answer.style.maxHeight = '0';
                // }
                icon.textContent = isExpanded ? '+' : '−'; // Change icon text based on state
            });
        }
    });
}); 
