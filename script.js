// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    // Change icon based on menu state
    const icon = mobileMenuBtn.querySelector('i');
    if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Match Details Button Interaction
const matchDetailsBtn = document.getElementById('matchDetailsBtn');

matchDetailsBtn.addEventListener('click', () => {
    alert('Match details: Napoli vs Juventus\nDate: Wednesday, 05 Feb 2026\nTime: 18:00 CET\nVenue: Stadio Diego Armando Maradona');
});

// Highlight Items Interaction
const highlightItems = document.querySelectorAll('.highlight-item');

highlightItems.forEach(item => {
    item.addEventListener('click', () => {
        const number = item.querySelector('.highlight-number').textContent;
        const label = item.querySelector('.highlight-label').textContent;
        alert(`Match Statistic: ${number} ${label}`);
    });
});

// Shop Items Interaction
const shopItems = document.querySelectorAll('.shop-item');

shopItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // Don't trigger if the click is on the shop link
        if (!e.target.classList.contains('shop-link') && !e.target.closest('.shop-link')) {
            const name = item.querySelector('.jersey-name').textContent;
            const season = item.querySelector('.jersey-season').textContent;
            alert(`Opening details for: ${name} (${season})`);
        }
    });
});

// News Links Interaction
const newsLinks = document.querySelectorAll('.news-link');
const viewAllLinks = document.querySelectorAll('.view-all-link');

newsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const newsTitle = link.closest('.news-content').querySelector('h4').textContent;
        alert(`Opening article: "${newsTitle}"`);
    });
});

viewAllLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionTitle = link.closest('.section-title').querySelector('.view-all-link').textContent;
        alert(`Navigating to: ${sectionTitle}`);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
        mainNav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Update current date in match section
function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options).toUpperCase();
    
    // Update all match date elements except the specific match date
    const matchDateElements = document.querySelectorAll('.match-date');
    matchDateElements.forEach(element => {
        const icon = element.querySelector('i');
        if (icon && icon.classList.contains('fa-calendar-alt')) {
            // Only update if it's not the specific match date (05 FEB 2026)
            if (!element.textContent.includes('05 FEB 2026')) {
                element.innerHTML = `<i class="far fa-calendar-alt"></i> ${formattedDate}`;
            }
        }
    });
}

// Initialize date on page load
updateCurrentDate();

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to stats on scroll
function animateStatsOnScroll() {
    const statsSection = document.querySelector('.hero');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    // Reset numbers to 0
                    const finalValue = parseInt(stat.textContent);
                    stat.textContent = '0';
                    
                    // Animate counting up
                    let count = 0;
                    const increment = finalValue / 50; // Adjust speed
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= finalValue) {
                            stat.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(count);
                        }
                    }, 30);
                });
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    animateStatsOnScroll();
    
    // Add click event to social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.querySelector('i').className.split('fa-')[1];
            alert(`Redirecting to SSC Napoli's ${platform} page`);
        });
    });
});