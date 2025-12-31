const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });


  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

const canvas = document.getElementById("stars");
if (canvas) {
  const ctx = canvas.getContext("2d");
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resize();
  window.addEventListener("resize", resize);
  
  const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    d: Math.random() * 0.5 + 0.1,
    opacity: Math.random() * 0.5 + 0.5
  }));
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(s => {
      ctx.fillStyle = `rgba(0, 242, 255, ${s.opacity})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      
      s.y += s.d;
      
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
    });
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

const footer = document.querySelector(".footer");
if (footer) {
  const showFooter = () => {
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (footerTop < windowHeight - 100) {
      footer.classList.add("show");
    }
  };
  
  window.addEventListener("scroll", showFooter);
  showFooter();
}

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
      alert(`Thank you ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
      contactForm.reset();
    }
  });
}

const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.querySelector(".close");

if (modal && modalImg) {
  const galleryItems = document.querySelectorAll(".gallery-item img");
  
  galleryItems.forEach(img => {
    img.addEventListener("click", function() {
      modal.style.display = "flex";
      modalImg.src = this.src;
    });
  });
  
  if (closeModal) {
    closeModal.addEventListener("click", function() {
      modal.style.display = "none";
    });
  }
  
  modal.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.6s ease';
  observer.observe(card);
});

const skillBars = document.querySelectorAll('.skill');
if (skillBars.length > 0) {
  const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skill = entry.target;
        const width = skill.style.width;
        skill.style.width = '0%';
        setTimeout(() => {
          skill.style.width = width;
        }, 200);
        skillObserver.unobserve(skill);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });
}
// Active Navigation Link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});