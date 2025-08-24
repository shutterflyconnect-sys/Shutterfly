
        document.addEventListener('DOMContentLoaded', () => {
            // --- Crystal Background Animation ---
            const canvas = document.getElementById('crystal-canvas');
            const ctx = canvas.getContext('2d');
            let particles = [];
            
            const resizeCanvas = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            };

            const createParticles = () => {
                particles = [];
                const particleCount = Math.floor((canvas.width * canvas.height) / 20000); // Adjust density
                for (let i = 0; i < particleCount; i++) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: Math.random() * 3 + 1,
                        speedX: (Math.random() * 0.3 - 0.15),
                        speedY: (Math.random() * 0.3 - 0.15),
                        opacity: Math.random() * 0.5 + 0.1
                    });
                }
            };

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    // Update position
                    p.x += p.speedX;
                    p.y += p.speedY;

                    // Boundary check
                    if (p.x > canvas.width + 5 || p.x < -5) p.speedX *= -1;
                    if (p.y > canvas.height + 5 || p.y < -5) p.speedY *= -1;

                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(200, 220, 255, ${p.opacity})`;
                    ctx.fill();
                });
                requestAnimationFrame(animate);
            };

            window.addEventListener('resize', () => {
                resizeCanvas();
                createParticles();
            });
            
            resizeCanvas();
            createParticles();
            animate();
            
            // --- Explore Button & Nav Overlay Logic ---
            const exploreBtn = document.getElementById('explore-btn');
            const navOverlay = document.getElementById('nav-overlay');
            const navOverlayLinks = document.querySelectorAll('.nav-overlay-link');
            const body = document.body;

            const toggleMenu = () => {
                body.classList.toggle('body-no-scroll');
                exploreBtn.classList.toggle('menu-open');
                navOverlay.classList.toggle('active');
            };

            exploreBtn.addEventListener('click', toggleMenu);

            navOverlayLinks.forEach(link => {
                link.addEventListener('click', toggleMenu);
            });


            // --- Modal/Lightbox Logic ---
            const modal = document.getElementById('modal');
            const modalImg = document.getElementById('modalImg');
            const closeModalBtn = document.getElementById('closeModal');
            const modalContent = document.querySelector('.modal-content');
            const galleryImageContainers = document.querySelectorAll('.photo-card');

            const openModal = (e) => {
                const img = e.currentTarget.querySelector('.gallery-img');
                if (!img) return;
                
                modalImg.src = img.src;
                body.classList.add('body-no-scroll');
                modal.classList.remove('pointer-events-none', 'opacity-0');
                modalContent.classList.remove('opacity-0', 'scale-95');
            };

            const closeModalFunc = () => {
                // Only remove the no-scroll class if the nav menu is also closed
                if (!exploreBtn.classList.contains('menu-open')) {
                    body.classList.remove('body-no-scroll');
                }
                modal.classList.add('opacity-0');
                modalContent.classList.add('opacity-0', 'scale-95');
                setTimeout(() => {
                    modal.classList.add('pointer-events-none');
                }, 300);
            };

            galleryImageContainers.forEach(container => {
                container.addEventListener('click', openModal);
            });

            closeModalBtn.addEventListener('click', closeModalFunc);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModalFunc();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
                    closeModalFunc();
                }
            });
        });
    