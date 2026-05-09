document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById("loader-wrapper");
    const video = document.getElementById("heroVideo");

    const initSite = () => {
        if (loader) {
            loader.classList.add("loader-hidden");
            document.body.classList.add("loaded");
            document.body.style.overflow = "auto";
        }
    };

    window.addEventListener("load", function() {
        if (video) video.play().catch(() => {});
        // Loader duration
        setTimeout(initSite, 3500); 
    });

    // Safety backup
    setTimeout(initSite, 6000);
});
// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Subtle Parallax for About Images
window.addEventListener('scroll', function() {
    const scrollPos = window.pageYOffset;
    const aboutSection = document.querySelector('.ronazio-custom-about');
    
    if (aboutSection) {
        const sectionTop = aboutSection.offsetTop;
        const mainCard = document.querySelector('.ronazio-card-main');
        const subCard = document.querySelector('.ronazio-card-sub');
        
        if (scrollPos > sectionTop - 800) {
            let offset = (scrollPos - sectionTop) * 0.1;
            mainCard.style.transform = `translateY(${offset}px)`;
            subCard.style.transform = `translateY(${-offset}px)`;
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("booking-modal-unique");
    const closeBtn = document.querySelector(".rich-close-wrapper");
    const roomTriggers = document.querySelectorAll(".btn-royal-trigger");
    const slidesContainer = document.getElementById("modal-slides-container");
    const mName = document.getElementById("m-room-name");
    const mDesc = document.getElementById("m-room-desc");

    // Room Sync to Modal
    roomTriggers.forEach(btn => {
        btn.addEventListener("click", function() {
            const card = this.closest(".room-unique-card");
            const name = card.getAttribute("data-room");
            const desc = card.getAttribute("data-desc");
            const imgs = card.querySelectorAll(".room-unique-slides img");

            mName.innerText = name;
            mDesc.innerText = desc;
            slidesContainer.innerHTML = "";
            
            imgs.forEach(img => {
                const clone = document.createElement("img");
                clone.src = img.src;
                slidesContainer.appendChild(clone);
            });

            modal.style.display = "flex";
            setTimeout(() => modal.classList.add("active"), 50);
        });
    });

    // Close Modal Logic
    closeBtn.onclick = () => {
        modal.classList.remove("active");
        setTimeout(() => modal.style.display = "none", 1200);
    };

    // WhatsApp Form Submission
    document.getElementById("whatsapp-form-unique").onsubmit = function(e) {
        e.preventDefault();
        const phone = "919597562331"; // REPLACE WITH YOUR NUMBER
        const msg = `*Ronazio Booking Enquiry*%0A` +
                    `*Room:* ${mName.innerText}%0A` +
                    `*Guest:* ${document.getElementById("g-name").value}%0A` +
                    `*Location:* ${document.getElementById("g-loc").value}%0A` +
                    `*Check-in:* ${document.getElementById("cin").value}%0A` +
                    `*Check-out:* ${document.getElementById("cout").value}%0A` +
                    `*Adults:* ${document.getElementById("ad").value}%0A` +
                    `*Kids:* ${document.getElementById("ch").value} (Age: ${document.getElementById("age").value})`;
        
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    };
});


document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById('gallery-grid');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img-full');
    const closeBtn = document.getElementById('close-gallery');
    const prevBtn = document.getElementById('prev-photo');
    const nextBtn = document.getElementById('next-photo');

    let currentIndex = 0;
    const photoIDs = [
        "Ext.jpeg", "Exter.jpeg", "Bal.jpeg", "Balco.jpeg",
        "Exterior.jpeg", "Exteriorr.jpeg", "Family.jpeg","SeaV4.jpeg", "Family2.jpeg",
        "Balcony FAMLY.jpeg", "Exteriorrr.jpeg", "Family3.jpeg",
        "FamilyBalcony.jpeg", "Sea.jpeg",
        "D With B.jpeg", "D1.jpeg", "Deluxe1.jpeg", "Deluxe3.jpeg",
        "Exterior1.jpeg", "Reception.jpeg"
    ];

   const fullImages = photoIDs.map(name => `images/${name}`);
    // Load Grid
    photoIDs.forEach((id, index) => {
        const thumbUrl = `images/${id}`;
        const col = document.createElement('div');
        col.className = 'col-6 col-md-4 col-lg-3 gallery-item splash-trigger';
        
        col.innerHTML = `
            <div class="gallery-card-inner">
                <div class="gallery-front">
                    <img src="${thumbUrl}" alt="Gallery ${index}">
                </div>
                <div class="gallery-back">
                    <img src="${thumbUrl}" alt="Gallery ${index} Flip">
                </div>
            </div>
        `;

        col.addEventListener('click', () => {
            currentIndex = index;
            updateModalImage();
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 50);
        });

        grid.appendChild(col);
    });

    function updateModalImage() {
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.src = fullImages[currentIndex];
            modalImg.style.opacity = '1';
        }, 200);
    }

    // Navigation Logic
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % fullImages.length;
        updateModalImage();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + fullImages.length) % fullImages.length;
        updateModalImage();
    });

    closeBtn.onclick = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 1000);
    };
});

document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form-whatsapp");

    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            // Form data values
            const name = document.getElementById("c-name").value;
            const email = document.getElementById("c-email").value;
            const subject = document.getElementById("c-subject").value;
            const message = document.getElementById("c-message").value;
            
            const phone = "919597562331"; // REPLACE WITH YOUR NUMBER

            // Formatting the WhatsApp Message
            const whatsappMsg = `*New Contact Enquiry - Ronazio Residency*%0A%0A` +
                                `*Name:* ${name}%0A` +
                                `*Email:* ${email}%0A` +
                                `*Subject:* ${subject || 'General Enquiry'}%0A` +
                                `*Message:* ${message}`;

            // Opening WhatsApp in new tab
            window.open(`https://wa.me/${phone}?text=${whatsappMsg}`, '_blank');
        });
    }
});

const brandLink = document.getElementById('matrix-brand-hover');
const glitterBox = document.getElementById('glitter-container');
let dustInterval;

function createDust() {
    const colors = ['#FF0000', '#FFFFFF', '#FF8888'];
    for (let i = 0; i < 6; i++) {
        const dust = document.createElement('div');
        dust.className = 'star-dust';
        dust.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const x = (Math.random() - 0.5) * 100 + 'px';
        const y = (Math.random() - 0.5) * 100 + 'px';
        dust.style.setProperty('--x', x);
        dust.style.setProperty('--y', y);
        
        dust.style.left = '40%';
        dust.style.top = '50%';
        
        glitterBox.appendChild(dust);
        setTimeout(() => dust.remove(), 1000);
    }
}

// Click Trigger
brandLink.addEventListener('click', createDust);

// Hover Trigger
brandLink.addEventListener('mouseenter', () => {
    dustInterval = setInterval(createDust, 150);
});

brandLink.addEventListener('mouseleave', () => {
    clearInterval(dustInterval);
});
