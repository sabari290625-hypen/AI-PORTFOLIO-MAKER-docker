// Convert photo file to base64
async function convertPhotoToBase64(file) {
    if (!file) return null;
    try {
          // Update services section (internships)
        if (portfolioData.internships) {
            const servicesContent = document.querySelector('#services-content');
            if (servicesContent) {
                servicesContent.innerHTML = `
                    <div class="card">
                        <div class="box">
                            <i class="fas fa-briefcase"></i>
                            <div class="text">${portfolioData.internships}</div>
                            <p>Position: ${portfolioData.posting || ||'N/A'}</p>
                            <p>Duration: ${portfolioData.duration |||| 'N/A'}</p>
                        </div>
                    </div>
                `;
            }
        }

        // Update skills section
        const skillsText = portfolioData.technicalSkills ? 
            `Technical Skills: ${portfolioData.technicalSkills}\n\n` +
            `Soft Skills: ${portfolioData.softSkills || 'N/A'}\n\n` +
            `Certifications: ${portfolioData.certifications || 'N/A'}` :
            'Your skills details will appear here';
        document.querySelector('#skills-para').textContent = skillsText;    const base64String = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
        console.log("Photo converted to base64");
        return base64String;
    } catch (error) {
        console.error("Error converting photo:", error);
        return null;
    }
}

// Handle form submission
async function handleFormSubmit(form) {
    try {
        const formData = new FormData(form);
        const data = {};
        
        // Handle photo
        const photoInput = document.getElementById("photoInput");
        const photoBase64 = await convertPhotoToBase64(photoInput?.files[0]);
        if (photoBase64) {
            data.photo = photoBase64;
        }

        // Handle other form fields
        for (let [key, value] of formData.entries()) {
            if (key !== 'photo' && value) {
                data[key] = String(value).trim();
            }
        }

        // Save to localStorage
        localStorage.setItem("portfolioData", JSON.stringify(data));
        console.log("Form data saved");
        return true;
    } catch (error) {
        console.error("Error processing form:", error);
        return false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Form handling for index.html
    const form = document.getElementById("portfolioForm");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Form submitted");
            
            if (await handleFormSubmit(form)) {
                window.location.href = "output.html";
            } else {
                alert("There was an error processing your form. Please try again.");
            }
            return false;
        });
    }

    // Portfolio data handling for output.html
    const portfolioData = JSON.parse(localStorage.getItem('portfolioData')) || {};
    
    // Update all text content
    if (document.querySelector('.home')) {
        // Update basic information
        const name = portfolioData.contactName || portfolioData.name || 'Your Name';
        document.querySelector('#home-name').textContent = name;
        document.querySelector('#about-name').textContent = name;
        document.querySelector('#contact-name').textContent = name;
        document.querySelector('#footer-name').textContent = name;
        
        // Update profile image
        const profileImg = document.querySelector('#profile-img');
        if (profileImg) {
            if (portfolioData.photo) {
                console.log("Setting profile image from stored data");
                profileImg.src = portfolioData.photo;
                profileImg.onload = () => {
                    console.log("Profile image loaded successfully");
                    profileImg.style.display = 'block';
                };
                profileImg.onerror = () => {
                    console.error("Error loading profile image");
                    profileImg.src = 'hello.jpeg'; // Fallback image
                };
            } else {
                console.log("No profile image found in stored data");
                profileImg.src = 'hello.jpeg'; // Fallback image
            }
        }

        // Update contact information
        document.querySelector('#contact-email').textContent = portfolioData.email || 'your.email@example.com';
        document.querySelector('#contact-address').textContent = portfolioData.address || 'Your City, Country';
        
        // Update motivation in contact section
        document.querySelector('#contact-para').textContent = portfolioData.quote || 'Your motivation will appear here.';
        
        // Update bio in about section
        document.querySelector('#about-para').textContent = portfolioData.careerGoal || 'Your bio will appear here.';
        
        // Update typing animation for role
        const roleText = portfolioData.course ? `${portfolioData.course} Student` : 'Professional';
        if (typeof Typed !== 'undefined') {
            new Typed('.typing', { strings: [roleText], typeSpeed: 100, backSpeed: 60, loop: true });
            new Typed('.typing-2', { strings: [roleText], typeSpeed: 100, backSpeed: 60, loop: true });
        }

        // Update social links
        if (portfolioData.linkedin) {
            document.querySelector('#contact-linkedin').innerHTML = `<a href="${portfolioData.linkedin}" target="_blank">LinkedIn Profile</a>`;
        }
        if (portfolioData.github) {
            document.querySelector('#contact-github').innerHTML = `<a href="${portfolioData.github}" target="_blank">GitHub Profile</a>`;
        }

        // About section is already updated above
        
        // Update skills section
        document.querySelector('#skills-para').textContent = portfolioData.technicalSkills || 'Your skills details will appear here.';

        // Update current year
        document.querySelector('#current-year').textContent = new Date().getFullYear();

        // Create project cards
        const projectsCarousel = document.querySelector('#projects-carousel');
        if (projectsCarousel) {
            const projects = [
                { title: 'Academic Projects', content: portfolioData.academicProjects },
                { title: 'Personal Projects', content: portfolioData.personalProjects },
                { title: 'Detailed Project', content: portfolioData.detailedProject }
            ];

            projects.forEach(project => {
                if (project.content) {
                    const div = document.createElement('div');
                    div.className = 'card';
                    div.innerHTML = `
                        <div class="box">
                            <div class="text">${project.title}</div>
                            <p>${project.content}</p>
                        </div>
                    `;
                    projectsCarousel.appendChild(div);
                }
            });
        }

        // Create achievement cards
        const achievementCarousel = document.querySelector('#achievement-carousel');
        if (achievementCarousel) {
            const achievements = [
                { title: 'Achievements', content: portfolioData.achievements },
                { title: 'Proud Achievement', content: portfolioData.proudAchievement },
                { title: 'Leadership', content: portfolioData.leadership },
                { title: 'Certifications', content: portfolioData.certifications }
            ];

            achievements.forEach(achievement => {
                if (achievement.content) {
                    const div = document.createElement('div');
                    div.className = 'card';
                    div.innerHTML = `
                        <div class="box">
                            <div class="text">${achievement.title}</div>
                            <p>${achievement.content}</p>
                        </div>
                    `;
                    achievementCarousel.appendChild(div);
                }
            });
        }

        // Create service cards
        const servicesContent = document.querySelector('#services-content');
        if (servicesContent) {
            const services = [
                { title: 'Technical Skills', content: portfolioData.technicalSkills },
                { title: 'Soft Skills', content: portfolioData.softSkills },
                { title: 'Career Goal', content: portfolioData.careerGoal }
            ];

            services.forEach(service => {
                if (service.content) {
                    const div = document.createElement('div');
                    div.className = 'card';
                    div.innerHTML = `
                        <div class="box">
                            <div class="text">${service.title}</div>
                            <p>${service.content}</p>
                        </div>
                    `;
                    servicesContent.appendChild(div);
                }
            });
        }

        // Initialize Typed.js for dynamic text
        if (typeof Typed !== 'undefined') {
            new Typed(".typing", {
                strings: [portfolioData.posting || "Developer"],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true
            });

            new Typed(".typing-2", {
                strings: [portfolioData.posting || "Developer"],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true
            });
        }

        // Initialize Owl Carousel if available
        if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
            $('.carousel').owlCarousel({
                margin: 20,
                loop: true,
                autoplay: true,
                autoplayTimeOut: 2000,
                autoplayHoverPause: true,
                responsive: {
                    0: { items: 1, nav: false },
                    600: { items: 2, nav: false },
                    1000: { items: 3, nav: false }
                }
            });
        }

        // Scroll up button functionality
        const scrollBtn = document.querySelector('.scroll-up-btn');
        if (scrollBtn) {
            const handleScroll = () => {
                scrollBtn.classList.toggle('show', window.scrollY > 500);
            };
            
            window.addEventListener('scroll', handleScroll);
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Menu toggle functionality
        const menuBtn = document.querySelector('.menu-btn');
        const navbar = document.querySelector('.navbar .menu');
        if (menuBtn && navbar) {
            const toggleMenu = () => {
                navbar.classList.toggle('active');
                menuBtn.querySelector('i')?.classList.toggle('active');
            };

            menuBtn.addEventListener('click', toggleMenu);
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navbar.contains(e.target) && !menuBtn.contains(e.target) && navbar.classList.contains('active')) {
                    toggleMenu();
                }
            });

            // Close menu when clicking on a menu item
            navbar.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (navbar.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            });
        }
    }
});

