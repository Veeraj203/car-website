document.addEventListener("DOMContentLoaded", () => {
    // 1. Loader Animation
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);
    }, 2800); // Wait for Netflix zoom animation

    // 2. Reveal Content & Scroll
    const exploreBtn = document.getElementById("explore-btn");
    const showroom = document.getElementById("showroom");

    exploreBtn.addEventListener("click", () => {
        showroom.style.display = "block";
        setTimeout(() => {
            showroom.classList.add("visible");
            showroom.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    });

    // 3. Background Music Control
    const bgMusic = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");
    const playIcon = document.getElementById("play-icon");
    const pauseIcon = document.getElementById("pause-icon");
    let isPlaying = false;

    // Set volume low for cinematic background
    bgMusic.volume = 0.3;

    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            playIcon.style.display = "block";
            pauseIcon.style.display = "none";
        } else {
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
            playIcon.style.display = "none";
            pauseIcon.style.display = "block";
        }
        isPlaying = !isPlaying;
    });

    // 4. Like Buttons (Hearts)
    const likeBtns = document.querySelectorAll(".btn-like");
    likeBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            btn.classList.toggle("active");
            if (btn.classList.contains("active")) {
                createFloatingHeart(e.clientX, e.clientY);
            }
        });
    });

    function createFloatingHeart(x, y) {
        const heart = document.createElement("div");
        heart.innerHTML = '<svg width="24" height="24" fill="#e50914" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
        heart.style.position = "fixed";
        heart.style.left = `${x - 12}px`;
        heart.style.top = `${y - 12}px`;
        heart.style.zIndex = "9999";
        heart.style.pointerEvents = "none";
        heart.style.transition = "all 1s ease-out";
        document.body.appendChild(heart);

        // Animate up and fade out
        requestAnimationFrame(() => {
            heart.style.transform = `translateY(-100px) scale(1.5)`;
            heart.style.opacity = "0";
        });

        setTimeout(() => {
            heart.remove();
        }, 1000);
    }

    // 5. Floating Particles Effect (Background)
    const particlesContainer = document.getElementById("particles-container");
    setInterval(() => {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        
        // Randomize size, position, and duration
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        
        const duration = Math.random() * 3 + 2;
        particle.style.animation = `float-up ${duration}s linear forwards`;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }, 300); // Add a new particle every 300ms

    // 6. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-up");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".car-card").forEach(card => {
        card.style.opacity = "0"; // Initialize hidden
        observer.observe(card);
    });

    // 7. Navbar Background on Scroll
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(10, 10, 10, 0.9)";
        } else {
            navbar.style.background = "rgba(20, 20, 20, 0.7)";
        }
    });
});
