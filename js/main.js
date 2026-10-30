/*
 * POWERENIX · interacción de la web
 * JavaScript normal, sin librerías. Cada bloque se activa solo si la página
 * tiene el elemento correspondiente, así que el mismo archivo sirve para todas.
 */
document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1. Cabecera: fondo oscuro al hacer scroll ---------- */
  const header = document.getElementById("site-header");
  const SCROLLED = ["border-b", "border-border", "bg-background/90", "backdrop-blur-md"];
  const menuBtn = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  let menuOpen = false;

  const paintHeader = () => {
    if (!header) return;
    const solid = window.scrollY > 20 || menuOpen;
    SCROLLED.forEach((c) => header.classList.toggle(c, solid));
    header.classList.toggle("bg-transparent", !solid);
  };
  paintHeader();
  window.addEventListener("scroll", paintHeader, { passive: true });

  /* ---------- 2. Menú móvil ---------- */
  const setMenu = (open) => {
    menuOpen = open;
    if (!menuBtn || !mobileNav) return;
    mobileNav.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menuBtn.querySelector('[data-icon="open"]').toggleAttribute("hidden", open);
    menuBtn.querySelector('[data-icon="close"]').toggleAttribute("hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
    paintHeader();
  };
  menuBtn?.addEventListener("click", () => setMenu(!menuOpen));
  mobileNav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && menuOpen) setMenu(false);
  });

  /* ---------- 3. Animación de aparición al hacer scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 4. Pestañas (días de clases y categorías de tienda) ---------- */
  const TAB_ON = ["border-primary", "bg-primary", "text-primary-foreground"];
  const TAB_OFF = ["border-border", "text-muted-foreground", "hover:text-foreground"];
  const selectTab = (buttons, value) => {
    buttons.forEach((b) => {
      const on = b.dataset.tab === value;
      b.setAttribute("aria-selected", String(on));
      TAB_ON.forEach((c) => b.classList.toggle(c, on));
      TAB_OFF.forEach((c) => b.classList.toggle(c, !on));
    });
  };

  // 4a. Gimnasio: horario de clases por día
  document.querySelectorAll("[data-tabs]").forEach((list) => {
    const buttons = list.querySelectorAll("[data-tab]");
    const panels = list.parentElement.querySelectorAll("[data-panel]");
    buttons.forEach((b) =>
      b.addEventListener("click", () => {
        selectTab(buttons, b.dataset.tab);
        panels.forEach((p) => {
          p.hidden = p.dataset.panel !== b.dataset.tab;
        });
      }),
    );
  });

  // 4b. Tienda: filtro de productos por categoría
  document.querySelectorAll("[data-filter-tabs]").forEach((list) => {
    const buttons = list.querySelectorAll("[data-tab]");
    const cards = list.parentElement.querySelectorAll("[data-filter-grid] [data-category]");
    buttons.forEach((b) =>
      b.addEventListener("click", () => {
        const cat = b.dataset.tab;
        selectTab(buttons, cat);
        cards.forEach((c) => {
          c.hidden = cat !== "Todos" && c.dataset.category !== cat;
          c.classList.add("is-visible");
        });
      }),
    );
  });

  /* ---------- 5. Carrusel de reseñas (cambia cada 6 segundos) ---------- */
  document.querySelectorAll("[data-carousel]").forEach((box) => {
    const slides = box.querySelectorAll("[data-review]");
    const dots = box.querySelectorAll("[data-dot]");
    let i = 0;
    let timer;
    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => {
        s.hidden = k !== i;
      });
      dots.forEach((d, k) => {
        d.classList.toggle("bg-primary", k === i);
        d.classList.toggle("bg-border", k !== i);
      });
      clearInterval(timer);
      timer = setInterval(() => show(i + 1), 6000);
    };
    box.querySelector("[data-prev]")?.addEventListener("click", () => show(i - 1));
    box.querySelector("[data-next]")?.addEventListener("click", () => show(i + 1));
    dots.forEach((d) => d.addEventListener("click", () => show(Number(d.dataset.dot))));
    show(0);
  });

  /* ---------- 6. Formularios: abren el correo del visitante ---------- */
  const EMAIL = "powerenix.db@gmail.com"; // cambia aquí el correo de destino
  document.querySelectorAll("form[data-mailto]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(form);
      let subject, body;
      if (form.dataset.mailto === "contacto") {
        subject = String(f.get("subject"));
        body = `Nombre: ${f.get("name")}\nEmail: ${f.get("email")}\nTeléfono: ${f.get("phone")}\n\n${f.get("message")}`;
      } else {
        subject = "Lista de espera ropa Powerenix";
        body = `Nombre: ${f.get("name")}\nEmail: ${f.get("email")}`;
      }
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      form.hidden = true;
      const thanks = form.parentElement.querySelector("[data-form-thanks]");
      if (thanks) thanks.hidden = false;
    });
  });

  /* ---------- 7. Aviso de cookies ---------- */
  const COOKIE_KEY = "powerenix-cookie-consent";
  const banner = document.getElementById("cookie-banner");
  const read = () => {
    try {
      return localStorage.getItem(COOKIE_KEY);
    } catch {
      return null;
    }
  };
  const save = (v) => {
    try {
      localStorage.setItem(COOKIE_KEY, v);
    } catch {
      /* sin almacenamiento */
    }
  };
  if (banner && !read()) banner.hidden = false;
  banner?.querySelectorAll("[data-cookie]").forEach((b) =>
    b.addEventListener("click", () => {
      save(b.dataset.cookie);
      banner.hidden = true;
    }),
  );

  /* ---------- 8. Año actual en el pie ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
