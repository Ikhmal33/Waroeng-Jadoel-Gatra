/* ===========================
   WAROENG JADOEL GATRA KENCANA
   script.js
   =========================== */

document.addEventListener("DOMContentLoaded", () => {
  // ===========================
  // 1. INITIALIZE AOS
  // ===========================
  AOS.init({
    duration: 750,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
  });

  // ===========================
  // 2. STICKY NAVBAR
  // ===========================
  const header = document.getElementById("main-header");

  const handleScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Update scroll progress bar
    const scrollProgress = document.getElementById("scroll-progress");
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // ===========================
  // 3. SMOOTH SCROLL
  // ===========================
  const smoothScrollLinks = document.querySelectorAll("[data-scroll]");

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-scroll");
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        const headerOffset = header.offsetHeight;
        const elementPosition =
          targetEl.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset - 16;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ===========================
  // 4. MENU FILTER
  // ===========================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const menuCategories = document.querySelectorAll(".menu-category");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // Update active button state
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Show/hide categories
      menuCategories.forEach((cat) => {
        const catName = cat.getAttribute("data-category");
        if (filter === "all" || catName === filter) {
          cat.classList.remove("hidden-category");
        } else {
          cat.classList.add("hidden-category");
        }
      });
    });
  });

  // ===========================
  // 5. BOOKING MODAL
  // ===========================
  const modal = document.getElementById("booking-modal");
  const modalTitle = document.getElementById("modal-room-title");
  const modalCloseBtn = document.getElementById("modal-close");
  const modalOverlay = document.getElementById("modal-overlay");

  const openModal = (roomName) => {
    modalTitle.textContent = roomName;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".booking-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const roomName = btn.getAttribute("data-room");
      openModal(roomName);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

  // ESC key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // WhatsApp redirect from modal
  const waBookingBtn = document.getElementById("wa-booking-btn");
  if (waBookingBtn) {
    waBookingBtn.addEventListener("click", () => {
      const room = modalTitle.textContent;
      const msg = encodeURIComponent(
        `Halo, saya ingin booking ${room} di Waroeng Jadoel Gatra Kencana. Mohon informasi ketersediaan dan harganya. Terima kasih!`,
      );
      window.open(`https://wa.me/628123456789?text=${msg}`, "_blank");
    });
  }

  // Navbar Reservations button
  const reservationBtn = document.getElementById("reservation-btn");
  if (reservationBtn) {
    reservationBtn.addEventListener("click", () => {
      const msg = encodeURIComponent(
        "Halo, saya ingin melakukan reservasi di Waroeng Jadoel Gatra Kencana. Mohon informasinya. Terima kasih!",
      );
      window.open(`https://wa.me/628123456789?text=${msg}`, "_blank");
    });
  }

  // Active nav link highlight on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a[data-scroll]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = "#" + entry.target.id;
          navLinks.forEach((link) => {
            link.classList.remove(
              "text-primary",
              "border-b-2",
              "border-primary",
              "pb-1",
            );
            link.classList.add("text-on-surface-variant");
            if (link.getAttribute("data-scroll") === id) {
              link.classList.add(
                "text-primary",
                "border-b-2",
                "border-primary",
                "pb-1",
              );
              link.classList.remove("text-on-surface-variant");
            }
          });
        }
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((section) => observer.observe(section));
});
