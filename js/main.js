document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.setAttribute("data-theme", localStorage.getItem("lm-theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));

  // =========================================================
  // Theme toggle
  // =========================================================
  const themeToggle = document.querySelector(".theme-toggle");
  const applyTheme = (theme, save = false) => {
    document.documentElement.setAttribute("data-theme", theme);
    if (save) localStorage.setItem("lm-theme", theme);
    if (themeToggle) themeToggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
  };
  applyTheme(document.documentElement.getAttribute("data-theme") || "dark");
  themeToggle?.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next, true);
  });

  // =========================================================
  // Mobile navigation
  // =========================================================

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#main-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =========================================================
  // Subtle mouse glow in navbar
  // =========================================================

  const header = document.querySelector(".site-header");

  if (header) {
    header.addEventListener("pointermove", (event) => {
      const rect = header.getBoundingClientRect();
      header.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      header.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
      header.classList.add("nav-glow-active");
    });

    header.addEventListener("pointerleave", () => {
      header.classList.remove("nav-glow-active");
    });
  }


  // =========================================================
  // Animated navbar underline
  // =========================================================

  document.querySelectorAll(".nav-links").forEach((nav) => {
    const underline = nav.querySelector(".nav-underline");
    const links = [...nav.querySelectorAll("a:not(.nav-cta)")];
    const activeLink = links.find((link) => link.classList.contains("active"));

    if (!underline || !links.length) return;

    const moveUnderline = (link, visible = true) => {
      if (!link || window.innerWidth <= 850) {
        underline.style.opacity = "0";
        return;
      }

      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();

      underline.style.width = `${linkRect.width}px`;
      underline.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
      underline.style.opacity = visible ? "1" : "0";
    };

    // Wait one frame so the browser has calculated the final navbar layout.
    requestAnimationFrame(() => moveUnderline(activeLink, Boolean(activeLink)));

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => moveUnderline(link, true));
    });

    const cta = nav.querySelector(".nav-cta");
    cta?.addEventListener("mouseenter", () => {
      moveUnderline(activeLink, Boolean(activeLink));
    });

    nav.addEventListener("mouseleave", () => {
      moveUnderline(activeLink, Boolean(activeLink));
    });

    window.addEventListener("resize", () => {
      moveUnderline(activeLink, Boolean(activeLink));
    });
  });

  // =========================================================
  // Shared premium footer
  // =========================================================

  document.querySelectorAll(".site-footer").forEach((footer) => {
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-main">
          <div class="footer-brand">
            <a href="index.html" aria-label="LM Detailing – startsida">
              <img class="footer-logo" src="media/LM_Detailing_horizontal_800x200_transparent.png" alt="LM Detailing">
            </a>
            <p>Mobil bilvård, detailing och autoservice med fokus på kvalitet, tydlighet och detaljer.</p>
            <div class="social-row">
              <a class="social-btn" href="#" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></svg>
              </a>
              <a class="social-btn" href="#" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-3.1 0-5 1.9-5 5v3H6v4h3v5h4v-5h3.2l.8-4H13V9c0-.7.3-1 1-1Z"/></svg>
              </a>
              <a class="social-btn" href="#" aria-label="TikTok">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M14 4v10.2a4.2 4.2 0 1 1-3.4-4.1"/><path d="M14 4c1.1 2.4 2.7 3.6 5 3.8"/></svg>
              </a>
            </div>
          </div>

          <div><h3 class="footer-title">NAVIGATION</h3><div class="footer-links">
            <a href="index.html">Hem</a><a href="detailing.html">Detailing</a><a href="autoservice.html">Autoservice</a><a href="om-oss.html">Om oss</a><a href="boka.html">Boka tid</a>
          </div></div>

          <div><h3 class="footer-title">KONTAKT</h3><div class="footer-contact">
            <a href="tel:+46761857397">+46 (0) 76 185 73 97</a>
            <a href="mailto:kundservice@lmautoservice.se">kundservice@lmautoservice.se</a>
            <span>Karlskrona · Mobil verksamhet</span>
          </div></div>

          <div><h3 class="footer-title">JURIDIK</h3><div class="footer-links">
            <a href="integritet.html">Integritet</a><a href="villkor.html">Villkor</a>
          </div><p style="margin-top:18px;color:#5e5a65;font-size:10px;max-width:190px">Vi behandlar dina uppgifter varsamt och använder dem för att hantera dina förfrågningar.</p></div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} LM Detailing. Alla rättigheter förbehållna.</span>
          <span>Karlskrona, Sverige · <a href="index.html">Till startsidan</a></span>
        </div>
      </div>`;
  });

  // =========================================================
  // Scroll-to-top
  // =========================================================

  const top = document.querySelector("#scrollTop");

  if (top) {
    const update = () => {
      top.classList.toggle("visible", window.scrollY > 450);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    top.addEventListener("click", () => {
      top.classList.remove("is-returning");
      void top.offsetWidth;
      top.classList.add("is-returning");

      document.body.classList.remove("scrolling-to-top");
      void document.body.offsetWidth;
      document.body.classList.add("scrolling-to-top");

      window.scrollTo({ top: 0, behavior: "smooth" });

      window.setTimeout(() => {
        top.classList.remove("is-returning");
        document.body.classList.remove("scrolling-to-top");
      }, 1200);
    });
  }

  // =========================================================
  // Scroll reveal animations
  // =========================================================

  const revealElements = document.querySelectorAll(
    ".reveal-left, .reveal-up, .reveal-scale"
  );

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  // =========================================================
  // Homepage slideshow
  // =========================================================

  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = document.querySelector(".slider-dots");

  if (slides.length && dots) {
    let current = 0;
    let timer;

    slides.forEach((_, index) => {
      const dot = document.createElement("button");

      dot.className = "slider-dot" + (index === 0 ? " active" : "");
      dot.type = "button";
      dot.setAttribute("aria-label", `Visa bild ${index + 1}`);

      dot.addEventListener("click", () => show(index));
      dots.appendChild(dot);
    });

    const dotElements = [...dots.children];

    function show(index) {
      current = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === current);
      });

      dotElements.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === current);
      });
    }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(() => show(current + 1), 6000);
    }

    function stopTimer() {
      clearInterval(timer);
    }

    startTimer();

    document.querySelector(".hero")?.addEventListener("mouseenter", stopTimer);
    document.querySelector(".hero")?.addEventListener("mouseleave", startTimer);
  }

  // =========================================================
  // Booking form
  // =========================================================

  const form = document.querySelector("#bookingForm");
  const service = document.querySelector("#service");

  if (form && service) {
    // Never allow a booking date before today. The browser date picker also disables past days.
    const bookingDate = form.querySelector('input[name="date"]');
    if (bookingDate) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      bookingDate.min = `${yyyy}-${mm}-${dd}`;
    }
    const services = {
      Service: [
        "Däckservice",
        "Bromsservice",
        "Olje- & filterbyte",
        "Full service",
        "Torkarblad"
      ],
      Detailing: [
        "Full rekond",
        "Interiörtvätt",
        "Exteriörtvätt",
        "Exteriörtvätt med behandling",
        "Strålkastarrestoration"
      ]
    };

    const radios = [...form.querySelectorAll('input[name="category"]')];

    function populate(selected) {
      service.innerHTML = '<option value="" disabled selected hidden>Välj tjänst..</option>';

      services[selected].forEach((serviceName) => {
        const option = document.createElement("option");
        option.value = serviceName;
        option.textContent = serviceName;
        service.appendChild(option);
      });
    }

    populate(radios.find((radio) => radio.checked)?.value || "Service");

    radios.forEach((radio) => {
      radio.addEventListener("change", () => populate(radio.value));
    });

    const params = new URLSearchParams(location.search);
    const requested = params.get("service");

    if (requested) {
      const category = services.Detailing.includes(requested)
        ? "Detailing"
        : "Service";

      const radio = radios.find((item) => item.value === category);

      if (radio) {
        radio.checked = true;
        populate(category);
      }

      const option = [...service.options].find(
        (item) => item.value === requested
      );

      if (option) service.value = requested;
    }

    // =========================================================
    // Country / calling-code picker
    // =========================================================

    const countries = [{"iso":"AF","code":"+93","name":"Afghanistan","flag":"🇦🇫"},{"iso":"AL","code":"+355","name":"Albanien","flag":"🇦🇱"},{"iso":"DZ","code":"+213","name":"Algeriet","flag":"🇩🇿"},{"iso":"VI","code":"+1340","name":"Amerikanska Jungfruöarna","flag":"🇻🇮"},{"iso":"AS","code":"+1684","name":"Amerikanska Samoa","flag":"🇦🇸"},{"iso":"AD","code":"+376","name":"Andorra","flag":"🇦🇩"},{"iso":"AO","code":"+244","name":"Angola","flag":"🇦🇴"},{"iso":"AI","code":"+1264","name":"Anguilla","flag":"🇦🇮"},{"iso":"AG","code":"+1268","name":"Antigua och Barbuda","flag":"🇦🇬"},{"iso":"AR","code":"+54","name":"Argentina","flag":"🇦🇷"},{"iso":"AM","code":"+374","name":"Armenien","flag":"🇦🇲"},{"iso":"AW","code":"+297","name":"Aruba","flag":"🇦🇼"},{"iso":"AC","code":"+247","name":"Ascension","flag":"🇦🇨"},{"iso":"AU","code":"+61","name":"Australien","flag":"🇦🇺"},{"iso":"AZ","code":"+994","name":"Azerbajdzjan","flag":"🇦🇿"},{"iso":"BS","code":"+1242","name":"Bahamas","flag":"🇧🇸"},{"iso":"BH","code":"+973","name":"Bahrain","flag":"🇧🇭"},{"iso":"BD","code":"+880","name":"Bangladesh","flag":"🇧🇩"},{"iso":"BB","code":"+1246","name":"Barbados","flag":"🇧🇧"},{"iso":"BY","code":"+375","name":"Belarus","flag":"🇧🇾"},{"iso":"BE","code":"+32","name":"Belgien","flag":"🇧🇪"},{"iso":"BZ","code":"+501","name":"Belize","flag":"🇧🇿"},{"iso":"BJ","code":"+229","name":"Benin","flag":"🇧🇯"},{"iso":"BM","code":"+1441","name":"Bermuda","flag":"🇧🇲"},{"iso":"BT","code":"+975","name":"Bhutan","flag":"🇧🇹"},{"iso":"BO","code":"+591","name":"Bolivia","flag":"🇧🇴"},{"iso":"BA","code":"+387","name":"Bosnien och Hercegovina","flag":"🇧🇦"},{"iso":"BW","code":"+267","name":"Botswana","flag":"🇧🇼"},{"iso":"BR","code":"+55","name":"Brasilien","flag":"🇧🇷"},{"iso":"VG","code":"+1284","name":"Brittiska Jungfruöarna","flag":"🇻🇬"},{"iso":"IO","code":"+246","name":"Brittiska territoriet i Indiska oceanen","flag":"🇮🇴"},{"iso":"BN","code":"+673","name":"Brunei","flag":"🇧🇳"},{"iso":"BG","code":"+359","name":"Bulgarien","flag":"🇧🇬"},{"iso":"BF","code":"+226","name":"Burkina Faso","flag":"🇧🇫"},{"iso":"BI","code":"+257","name":"Burundi","flag":"🇧🇮"},{"iso":"KY","code":"+1345","name":"Caymanöarna","flag":"🇰🇾"},{"iso":"CF","code":"+236","name":"Centralafrikanska republiken","flag":"🇨🇫"},{"iso":"CL","code":"+56","name":"Chile","flag":"🇨🇱"},{"iso":"CO","code":"+57","name":"Colombia","flag":"🇨🇴"},{"iso":"CK","code":"+682","name":"Cooköarna","flag":"🇨🇰"},{"iso":"CR","code":"+506","name":"Costa Rica","flag":"🇨🇷"},{"iso":"CW","code":"+599","name":"Curaçao","flag":"🇨🇼"},{"iso":"CY","code":"+357","name":"Cypern","flag":"🇨🇾"},{"iso":"DK","code":"+45","name":"Danmark","flag":"🇩🇰"},{"iso":"DJ","code":"+253","name":"Djibouti","flag":"🇩🇯"},{"iso":"DM","code":"+1767","name":"Dominica","flag":"🇩🇲"},{"iso":"DO","code":"+1809","name":"Dominikanska republiken","flag":"🇩🇴"},{"iso":"EC","code":"+593","name":"Ecuador","flag":"🇪🇨"},{"iso":"EG","code":"+20","name":"Egypten","flag":"🇪🇬"},{"iso":"GQ","code":"+240","name":"Ekvatorialguinea","flag":"🇬🇶"},{"iso":"SV","code":"+503","name":"El Salvador","flag":"🇸🇻"},{"iso":"CI","code":"+225","name":"Elfenbenskusten","flag":"🇨🇮"},{"iso":"ER","code":"+291","name":"Eritrea","flag":"🇪🇷"},{"iso":"EE","code":"+372","name":"Estland","flag":"🇪🇪"},{"iso":"SZ","code":"+268","name":"Eswatini","flag":"🇸🇿"},{"iso":"ET","code":"+251","name":"Etiopien","flag":"🇪🇹"},{"iso":"FK","code":"+500","name":"Falklandsöarna","flag":"🇫🇰"},{"iso":"FJ","code":"+679","name":"Fiji","flag":"🇫🇯"},{"iso":"PH","code":"+63","name":"Filippinerna","flag":"🇵🇭"},{"iso":"FI","code":"+358","name":"Finland","flag":"🇫🇮"},{"iso":"FR","code":"+33","name":"Frankrike","flag":"🇫🇷"},{"iso":"GF","code":"+594","name":"Franska Guyana","flag":"🇬🇫"},{"iso":"PF","code":"+689","name":"Franska Polynesien","flag":"🇵🇫"},{"iso":"TF","code":"+262","name":"Franska sydterritorierna","flag":"🇹🇫"},{"iso":"FO","code":"+298","name":"Färöarna","flag":"🇫🇴"},{"iso":"AE","code":"+971","name":"Förenade Arabemiraten","flag":"🇦🇪"},{"iso":"GA","code":"+241","name":"Gabon","flag":"🇬🇦"},{"iso":"GM","code":"+220","name":"Gambia","flag":"🇬🇲"},{"iso":"GE","code":"+995","name":"Georgien","flag":"🇬🇪"},{"iso":"GH","code":"+233","name":"Ghana","flag":"🇬🇭"},{"iso":"GI","code":"+350","name":"Gibraltar","flag":"🇬🇮"},{"iso":"GR","code":"+30","name":"Grekland","flag":"🇬🇷"},{"iso":"GD","code":"+1473","name":"Grenada","flag":"🇬🇩"},{"iso":"GL","code":"+299","name":"Grönland","flag":"🇬🇱"},{"iso":"GP","code":"+590","name":"Guadeloupe","flag":"🇬🇵"},{"iso":"GU","code":"+1671","name":"Guam","flag":"🇬🇺"},{"iso":"GT","code":"+502","name":"Guatemala","flag":"🇬🇹"},{"iso":"GG","code":"+44","name":"Guernsey","flag":"🇬🇬"},{"iso":"GN","code":"+224","name":"Guinea","flag":"🇬🇳"},{"iso":"GW","code":"+245","name":"Guinea-Bissau","flag":"🇬🇼"},{"iso":"GY","code":"+592","name":"Guyana","flag":"🇬🇾"},{"iso":"HT","code":"+509","name":"Haiti","flag":"🇭🇹"},{"iso":"HM","code":"+672","name":"Heardön och McDonaldöarna","flag":"🇭🇲"},{"iso":"HN","code":"+504","name":"Honduras","flag":"🇭🇳"},{"iso":"HK","code":"+852","name":"Hongkong SAR","flag":"🇭🇰"},{"iso":"IN","code":"+91","name":"Indien","flag":"🇮🇳"},{"iso":"ID","code":"+62","name":"Indonesien","flag":"🇮🇩"},{"iso":"IQ","code":"+964","name":"Irak","flag":"🇮🇶"},{"iso":"IR","code":"+98","name":"Iran","flag":"🇮🇷"},{"iso":"IE","code":"+353","name":"Irland","flag":"🇮🇪"},{"iso":"IS","code":"+354","name":"Island","flag":"🇮🇸"},{"iso":"IM","code":"+44","name":"Isle of Man","flag":"🇮🇲"},{"iso":"IL","code":"+972","name":"Israel","flag":"🇮🇱"},{"iso":"IT","code":"+39","name":"Italien","flag":"🇮🇹"},{"iso":"JM","code":"+1876","name":"Jamaica","flag":"🇯🇲"},{"iso":"JP","code":"+81","name":"Japan","flag":"🇯🇵"},{"iso":"YE","code":"+967","name":"Jemen","flag":"🇾🇪"},{"iso":"JE","code":"+44","name":"Jersey","flag":"🇯🇪"},{"iso":"JO","code":"+962","name":"Jordanien","flag":"🇯🇴"},{"iso":"CX","code":"+61","name":"Julön","flag":"🇨🇽"},{"iso":"KH","code":"+855","name":"Kambodja","flag":"🇰🇭"},{"iso":"CM","code":"+237","name":"Kamerun","flag":"🇨🇲"},{"iso":"CA","code":"+1","name":"Kanada","flag":"🇨🇦"},{"iso":"CV","code":"+238","name":"Kap Verde","flag":"🇨🇻"},{"iso":"BQ","code":"+599","name":"Karibiska Nederländerna","flag":"🇧🇶"},{"iso":"KZ","code":"+7","name":"Kazakstan","flag":"🇰🇿"},{"iso":"KE","code":"+254","name":"Kenya","flag":"🇰🇪"},{"iso":"CN","code":"+86","name":"Kina","flag":"🇨🇳"},{"iso":"KG","code":"+996","name":"Kirgizistan","flag":"🇰🇬"},{"iso":"KI","code":"+686","name":"Kiribati","flag":"🇰🇮"},{"iso":"CC","code":"+61","name":"Kokosöarna","flag":"🇨🇨"},{"iso":"KM","code":"+269","name":"Komorerna","flag":"🇰🇲"},{"iso":"CG","code":"+242","name":"Kongo-Brazzaville","flag":"🇨🇬"},{"iso":"CD","code":"+243","name":"Kongo-Kinshasa","flag":"🇨🇩"},{"iso":"XK","code":"+383","name":"Kosovo","flag":"🇽🇰"},{"iso":"HR","code":"+385","name":"Kroatien","flag":"🇭🇷"},{"iso":"CU","code":"+53","name":"Kuba","flag":"🇨🇺"},{"iso":"KW","code":"+965","name":"Kuwait","flag":"🇰🇼"},{"iso":"LA","code":"+856","name":"Laos","flag":"🇱🇦"},{"iso":"LS","code":"+266","name":"Lesotho","flag":"🇱🇸"},{"iso":"LV","code":"+371","name":"Lettland","flag":"🇱🇻"},{"iso":"LB","code":"+961","name":"Libanon","flag":"🇱🇧"},{"iso":"LR","code":"+231","name":"Liberia","flag":"🇱🇷"},{"iso":"LY","code":"+218","name":"Libyen","flag":"🇱🇾"},{"iso":"LI","code":"+423","name":"Liechtenstein","flag":"🇱🇮"},{"iso":"LT","code":"+370","name":"Litauen","flag":"🇱🇹"},{"iso":"LU","code":"+352","name":"Luxemburg","flag":"🇱🇺"},{"iso":"MO","code":"+853","name":"Macao SAR","flag":"🇲🇴"},{"iso":"MG","code":"+261","name":"Madagaskar","flag":"🇲🇬"},{"iso":"MW","code":"+265","name":"Malawi","flag":"🇲🇼"},{"iso":"MY","code":"+60","name":"Malaysia","flag":"🇲🇾"},{"iso":"MV","code":"+960","name":"Maldiverna","flag":"🇲🇻"},{"iso":"ML","code":"+223","name":"Mali","flag":"🇲🇱"},{"iso":"MT","code":"+356","name":"Malta","flag":"🇲🇹"},{"iso":"MA","code":"+212","name":"Marocko","flag":"🇲🇦"},{"iso":"MH","code":"+692","name":"Marshallöarna","flag":"🇲🇭"},{"iso":"MQ","code":"+596","name":"Martinique","flag":"🇲🇶"},{"iso":"MR","code":"+222","name":"Mauretanien","flag":"🇲🇷"},{"iso":"MU","code":"+230","name":"Mauritius","flag":"🇲🇺"},{"iso":"YT","code":"+262","name":"Mayotte","flag":"🇾🇹"},{"iso":"MX","code":"+52","name":"Mexiko","flag":"🇲🇽"},{"iso":"FM","code":"+691","name":"Mikronesien","flag":"🇫🇲"},{"iso":"MD","code":"+373","name":"Moldavien","flag":"🇲🇩"},{"iso":"MC","code":"+377","name":"Monaco","flag":"🇲🇨"},{"iso":"MN","code":"+976","name":"Mongoliet","flag":"🇲🇳"},{"iso":"ME","code":"+382","name":"Montenegro","flag":"🇲🇪"},{"iso":"MS","code":"+1664","name":"Montserrat","flag":"🇲🇸"},{"iso":"MZ","code":"+258","name":"Moçambique","flag":"🇲🇿"},{"iso":"MM","code":"+95","name":"Myanmar (Burma)","flag":"🇲🇲"},{"iso":"NA","code":"+264","name":"Namibia","flag":"🇳🇦"},{"iso":"NR","code":"+674","name":"Nauru","flag":"🇳🇷"},{"iso":"NL","code":"+31","name":"Nederländerna","flag":"🇳🇱"},{"iso":"NP","code":"+977","name":"Nepal","flag":"🇳🇵"},{"iso":"NI","code":"+505","name":"Nicaragua","flag":"🇳🇮"},{"iso":"NE","code":"+227","name":"Niger","flag":"🇳🇪"},{"iso":"NG","code":"+234","name":"Nigeria","flag":"🇳🇬"},{"iso":"NU","code":"+683","name":"Niue","flag":"🇳🇺"},{"iso":"KP","code":"+850","name":"Nordkorea","flag":"🇰🇵"},{"iso":"MK","code":"+389","name":"Nordmakedonien","flag":"🇲🇰"},{"iso":"MP","code":"+1670","name":"Nordmarianerna","flag":"🇲🇵"},{"iso":"NF","code":"+672","name":"Norfolkön","flag":"🇳🇫"},{"iso":"NO","code":"+47","name":"Norge","flag":"🇳🇴"},{"iso":"NC","code":"+687","name":"Nya Kaledonien","flag":"🇳🇨"},{"iso":"NZ","code":"+64","name":"Nya Zeeland","flag":"🇳🇿"},{"iso":"OM","code":"+968","name":"Oman","flag":"🇴🇲"},{"iso":"PK","code":"+92","name":"Pakistan","flag":"🇵🇰"},{"iso":"PW","code":"+680","name":"Palau","flag":"🇵🇼"},{"iso":"PS","code":"+970","name":"Palestinska territorierna","flag":"🇵🇸"},{"iso":"PA","code":"+507","name":"Panama","flag":"🇵🇦"},{"iso":"PG","code":"+675","name":"Papua Nya Guinea","flag":"🇵🇬"},{"iso":"PY","code":"+595","name":"Paraguay","flag":"🇵🇾"},{"iso":"PE","code":"+51","name":"Peru","flag":"🇵🇪"},{"iso":"PN","code":"+64","name":"Pitcairnöarna","flag":"🇵🇳"},{"iso":"PL","code":"+48","name":"Polen","flag":"🇵🇱"},{"iso":"PT","code":"+351","name":"Portugal","flag":"🇵🇹"},{"iso":"PR","code":"+1787","name":"Puerto Rico","flag":"🇵🇷"},{"iso":"QA","code":"+974","name":"Qatar","flag":"🇶🇦"},{"iso":"RO","code":"+40","name":"Rumänien","flag":"🇷🇴"},{"iso":"RW","code":"+250","name":"Rwanda","flag":"🇷🇼"},{"iso":"RU","code":"+7","name":"Ryssland","flag":"🇷🇺"},{"iso":"RE","code":"+262","name":"Réunion","flag":"🇷🇪"},{"iso":"BL","code":"+590","name":"S:t Barthélemy","flag":"🇧🇱"},{"iso":"SH","code":"+290","name":"S:t Helena","flag":"🇸🇭"},{"iso":"KN","code":"+1869","name":"S:t Kitts och Nevis","flag":"🇰🇳"},{"iso":"LC","code":"+1758","name":"S:t Lucia","flag":"🇱🇨"},{"iso":"PM","code":"+508","name":"S:t Pierre och Miquelon","flag":"🇵🇲"},{"iso":"VC","code":"+1784","name":"S:t Vincent och Grenadinerna","flag":"🇻🇨"},{"iso":"MF","code":"+590","name":"Saint-Martin","flag":"🇲🇫"},{"iso":"SB","code":"+677","name":"Salomonöarna","flag":"🇸🇧"},{"iso":"WS","code":"+685","name":"Samoa","flag":"🇼🇸"},{"iso":"SM","code":"+378","name":"San Marino","flag":"🇸🇲"},{"iso":"SA","code":"+966","name":"Saudiarabien","flag":"🇸🇦"},{"iso":"CH","code":"+41","name":"Schweiz","flag":"🇨🇭"},{"iso":"SN","code":"+221","name":"Senegal","flag":"🇸🇳"},{"iso":"RS","code":"+381","name":"Serbien","flag":"🇷🇸"},{"iso":"SC","code":"+248","name":"Seychellerna","flag":"🇸🇨"},{"iso":"SL","code":"+232","name":"Sierra Leone","flag":"🇸🇱"},{"iso":"SG","code":"+65","name":"Singapore","flag":"🇸🇬"},{"iso":"SX","code":"+1721","name":"Sint Maarten","flag":"🇸🇽"},{"iso":"SK","code":"+421","name":"Slovakien","flag":"🇸🇰"},{"iso":"SI","code":"+386","name":"Slovenien","flag":"🇸🇮"},{"iso":"SO","code":"+252","name":"Somalia","flag":"🇸🇴"},{"iso":"ES","code":"+34","name":"Spanien","flag":"🇪🇸"},{"iso":"LK","code":"+94","name":"Sri Lanka","flag":"🇱🇰"},{"iso":"GB","code":"+44","name":"Storbritannien","flag":"🇬🇧"},{"iso":"SD","code":"+249","name":"Sudan","flag":"🇸🇩"},{"iso":"SR","code":"+597","name":"Surinam","flag":"🇸🇷"},{"iso":"SJ","code":"+47","name":"Svalbard och Jan Mayen","flag":"🇸🇯"},{"iso":"SE","code":"+46","name":"Sverige","flag":"🇸🇪"},{"iso":"ZA","code":"+27","name":"Sydafrika","flag":"🇿🇦"},{"iso":"GS","code":"+500","name":"Sydgeorgien och Sydsandwichöarna","flag":"🇬🇸"},{"iso":"KR","code":"+82","name":"Sydkorea","flag":"🇰🇷"},{"iso":"SS","code":"+211","name":"Sydsudan","flag":"🇸🇸"},{"iso":"SY","code":"+963","name":"Syrien","flag":"🇸🇾"},{"iso":"ST","code":"+239","name":"São Tomé och Príncipe","flag":"🇸🇹"},{"iso":"TJ","code":"+992","name":"Tadzjikistan","flag":"🇹🇯"},{"iso":"TW","code":"+886","name":"Taiwan","flag":"🇹🇼"},{"iso":"TZ","code":"+255","name":"Tanzania","flag":"🇹🇿"},{"iso":"TD","code":"+235","name":"Tchad","flag":"🇹🇩"},{"iso":"TH","code":"+66","name":"Thailand","flag":"🇹🇭"},{"iso":"CZ","code":"+420","name":"Tjeckien","flag":"🇨🇿"},{"iso":"TG","code":"+228","name":"Togo","flag":"🇹🇬"},{"iso":"TK","code":"+690","name":"Tokelauöarna","flag":"🇹🇰"},{"iso":"TO","code":"+676","name":"Tonga","flag":"🇹🇴"},{"iso":"TT","code":"+1868","name":"Trinidad och Tobago","flag":"🇹🇹"},{"iso":"TA","code":"+290","name":"Tristan da Cunha","flag":"🇹🇦"},{"iso":"TN","code":"+216","name":"Tunisien","flag":"🇹🇳"},{"iso":"TR","code":"+90","name":"Turkiet","flag":"🇹🇷"},{"iso":"TM","code":"+993","name":"Turkmenistan","flag":"🇹🇲"},{"iso":"TC","code":"+1649","name":"Turks- och Caicosöarna","flag":"🇹🇨"},{"iso":"TV","code":"+688","name":"Tuvalu","flag":"🇹🇻"},{"iso":"DE","code":"+49","name":"Tyskland","flag":"🇩🇪"},{"iso":"UG","code":"+256","name":"Uganda","flag":"🇺🇬"},{"iso":"UA","code":"+380","name":"Ukraina","flag":"🇺🇦"},{"iso":"HU","code":"+36","name":"Ungern","flag":"🇭🇺"},{"iso":"UY","code":"+598","name":"Uruguay","flag":"🇺🇾"},{"iso":"US","code":"+1","name":"USA","flag":"🇺🇸"},{"iso":"UM","code":"+1","name":"USA:s yttre öar","flag":"🇺🇲"},{"iso":"UZ","code":"+998","name":"Uzbekistan","flag":"🇺🇿"},{"iso":"VU","code":"+678","name":"Vanuatu","flag":"🇻🇺"},{"iso":"VA","code":"+39","name":"Vatikanstaten","flag":"🇻🇦"},{"iso":"VE","code":"+58","name":"Venezuela","flag":"🇻🇪"},{"iso":"VN","code":"+84","name":"Vietnam","flag":"🇻🇳"},{"iso":"EH","code":"+212","name":"Västsahara","flag":"🇪🇭"},{"iso":"WF","code":"+681","name":"Wallis- och Futunaöarna","flag":"🇼🇫"},{"iso":"ZM","code":"+260","name":"Zambia","flag":"🇿🇲"},{"iso":"ZW","code":"+263","name":"Zimbabwe","flag":"🇿🇼"},{"iso":"AX","code":"+358","name":"Åland","flag":"🇦🇽"},{"iso":"AT","code":"+43","name":"Österrike","flag":"🇦🇹"},{"iso":"TL","code":"+670","name":"Östtimor","flag":"🇹🇱"}];
    const countryPicker = document.querySelector("#countryPicker");
    const countryPickerButton = document.querySelector("#countryPickerButton");
    const countryPickerMenu = document.querySelector("#countryPickerMenu");
    const countrySelectedFlag = document.querySelector("#countrySelectedFlag");
    const countrySelectedCode = document.querySelector("#countrySelectedCode");
    const countryCodeInput = document.querySelector("#countryCode");

    if (countryPicker && countryPickerButton && countryPickerMenu && countryCodeInput) {
      countryPickerMenu.innerHTML = countries.map((country) => `
        <button type="button" class="country-option" role="option" data-code="${country.code}" data-flag="${country.flag}" data-iso="${country.iso}">
          <span class="country-option-flag" aria-hidden="true">${country.flag}</span>
          <span class="country-option-name">${escapeHtml(country.name)}</span>
          <span class="country-option-code">${escapeHtml(country.code)}</span>
        </button>`).join("");

      const closeCountryPicker = () => {
        countryPicker.classList.remove("open");
        countryPickerButton.setAttribute("aria-expanded", "false");
      };

      countryPickerButton.addEventListener("click", () => {
        const open = countryPicker.classList.toggle("open");
        countryPickerButton.setAttribute("aria-expanded", String(open));
      });

      countryPickerMenu.addEventListener("click", (event) => {
        const option = event.target.closest(".country-option");
        if (!option) return;
        countrySelectedFlag.textContent = option.dataset.flag;
        countrySelectedCode.textContent = option.dataset.code;
        countryCodeInput.value = option.dataset.code;
        countryPickerButton.setAttribute("aria-label", `${option.dataset.flag} ${option.dataset.code}`);
        closeCountryPicker();
      });

      document.addEventListener("click", (event) => {
        if (!countryPicker.contains(event.target)) closeCountryPicker();
      });
    }

    // =========================================================
    // Vehicle selection / lookup-ready integration
    // =========================================================

    const vehicleMake = document.querySelector("#vehicleMake");
    const vehicleModel = document.querySelector("#vehicleModel");
    const registrationInput = document.querySelector("#registration");
    const lookupVehicle = document.querySelector("#lookupVehicle");
    const vehicleResult = document.querySelector("#vehicleResult");

    const vehicleDatabase = {
  "Abarth": [
    "500 (Gen1) 2008",
    "595 (Gen1) 2012",
    "124 Spider 2016"
  ],
  "Alfa Romeo": [
    "147 (Gen1) 2000",
    "159 (Gen1) 2005",
    "Giulia (Gen1) 2016",
    "Stelvio (Gen1) 2017",
    "Tonale (Gen1) 2022"
  ],
  "Audi": [
    "A1 (Gen1) 2010",
    "A1 (Gen2) 2018",
    "A3 (Gen3) 2012",
    "A3 (Gen4) 2020",
    "A4 (B8) 2007",
    "A4 (B9) 2015",
    "A5 (B8) 2007",
    "A6 (C7) 2011",
    "A6 (C8) 2018",
    "Q3 (Gen1) 2011",
    "Q3 (Gen2) 2018",
    "Q5 (Gen1) 2008",
    "Q5 (Gen2) 2017",
    "Q7 (Gen2) 2015"
  ],
  "BMW": [
    "1-serie (E87) 2004",
    "1-serie (F20) 2011",
    "1-serie (F40) 2019",
    "2-serie (F22) 2014",
    "3-serie (E90) 2005",
    "3-serie (F30) 2011",
    "3-serie (G20) 2019",
    "4-serie (F32) 2013",
    "5-serie (F10) 2010",
    "5-serie (G30) 2017",
    "7-serie (G11) 2015",
    "X1 (F48) 2015",
    "X3 (F25) 2010",
    "X3 (G01) 2017",
    "X5 (F15) 2013",
    "X5 (G05) 2018"
  ],
  "Citroën": [
    "C1 (Gen2) 2014",
    "C3 (Gen3) 2016",
    "C4 (Gen2) 2010",
    "C4 (Gen3) 2020",
    "C5 Aircross (Gen1) 2017",
    "Berlingo (Gen3) 2018"
  ],
  "Dacia": [
    "Duster (Gen1) 2010",
    "Duster (Gen2) 2017",
    "Logan (Gen2) 2012",
    "Sandero (Gen2) 2012",
    "Sandero (Gen3) 2020"
  ],
  "Daewoo": [
    "Kalos (Gen1) 2002",
    "Matiz (Gen1) 1998",
    "Nubira (Gen2) 1999"
  ],
  "Dodge": [
    "Challenger (Gen3) 2008",
    "Charger (Gen7) 2005",
    "Durango (Gen3) 2010"
  ],
  "DS": [
    "DS 3 (Gen1) 2010",
    "DS 4 (Gen1) 2011",
    "DS 7 (Gen1) 2017"
  ],
  "Fiat": [
    "500 (Gen2) 2007",
    "500X (Gen1) 2014",
    "Doblo (Gen2) 2010",
    "Ducato (Gen3) 2006",
    "Panda (Gen3) 2011",
    "Tipo (Gen1) 2015"
  ],
  "Ford": [
    "Fiesta (Gen6) 2008",
    "Fiesta (Gen7) 2017",
    "Focus (Gen3) 2011",
    "Focus (Gen4) 2018",
    "Kuga (Gen2) 2012",
    "Kuga (Gen3) 2019",
    "Mondeo (Gen4) 2007",
    "Puma (Gen2) 2019",
    "Ranger (Gen4) 2011",
    "Transit (Gen4) 2014",
    "Transit Custom (Gen1) 2012"
  ],
  "Honda": [
    "Civic (Gen8) 2005",
    "Civic (Gen9) 2011",
    "Civic (Gen10) 2015",
    "CR-V (Gen3) 2006",
    "CR-V (Gen4) 2012",
    "CR-V (Gen5) 2017",
    "HR-V (Gen2) 2014",
    "Jazz (Gen3) 2015"
  ],
  "Hyundai": [
    "i10 (Gen2) 2013",
    "i20 (Gen2) 2014",
    "i30 (Gen2) 2011",
    "i30 (Gen3) 2016",
    "Ioniq (Gen1) 2016",
    "Kona (Gen1) 2017",
    "Santa Fe (Gen3) 2012",
    "Tucson (Gen3) 2015",
    "Tucson (Gen4) 2020"
  ],
  "Jaguar": [
    "XE (Gen1) 2015",
    "XF (X250) 2007",
    "XF (X260) 2015",
    "F-Pace (Gen1) 2016"
  ],
  "Jeep": [
    "Cherokee (KL) 2013",
    "Compass (Gen2) 2016",
    "Grand Cherokee (WK2) 2010",
    "Renegade (Gen1) 2014",
    "Wrangler (JL) 2017"
  ],
  "Kia": [
    "Ceed (Gen1) 2006",
    "Ceed (Gen2) 2012",
    "Ceed (Gen3) 2018",
    "Niro (Gen1) 2016",
    "Picanto (Gen2) 2011",
    "Rio (Gen3) 2011",
    "Sportage (Gen3) 2010",
    "Sportage (Gen4) 2015",
    "Sportage (Gen5) 2021"
  ],
  "Land Rover": [
    "Defender (L663) 2019",
    "Discovery (L462) 2017",
    "Discovery Sport (L550) 2014",
    "Range Rover Evoque (L538) 2011",
    "Range Rover Sport (L494) 2013"
  ],
  "Lexus": [
    "CT (Gen1) 2010",
    "ES (Gen7) 2018",
    "IS (Gen3) 2013",
    "NX (Gen1) 2014",
    "RX (Gen4) 2015"
  ],
  "Mazda": [
    "2 (Gen2) 2007",
    "3 (Gen2) 2008",
    "3 (Gen3) 2013",
    "6 (Gen3) 2012",
    "CX-3 (Gen1) 2015",
    "CX-5 (Gen1) 2012",
    "CX-5 (Gen2) 2017",
    "MX-5 (ND) 2015"
  ],
  "Mercedes-Benz": [
    "A-klass (W176) 2012",
    "A-klass (W177) 2018",
    "B-klass (W246) 2011",
    "C-klass (W204) 2007",
    "C-klass (W205) 2014",
    "C-klass (W206) 2021",
    "E-klass (W212) 2009",
    "E-klass (W213) 2016",
    "GLA (X156) 2013",
    "GLA (H247) 2019",
    "GLC (X253) 2015",
    "Vito (W447) 2014"
  ],
  "MG": [
    "MG3 (Gen2) 2011",
    "MG4 (Gen1) 2022",
    "ZS (Gen1) 2017",
    "HS (Gen1) 2018"
  ],
  "Mini": [
    "Hatch (R56) 2006",
    "Hatch (F56) 2013",
    "Clubman (F54) 2015",
    "Countryman (F60) 2016"
  ],
  "Mitsubishi": [
    "ASX (Gen1) 2010",
    "Colt (Gen6) 2002",
    "Outlander (Gen2) 2006",
    "Outlander (Gen3) 2012",
    "Pajero (Gen4) 2006"
  ],
  "Nissan": [
    "Juke (Gen1) 2010",
    "Juke (Gen2) 2019",
    "Leaf (Gen1) 2010",
    "Leaf (Gen2) 2017",
    "Qashqai (Gen1) 2006",
    "Qashqai (Gen2) 2014",
    "Qashqai (Gen3) 2021",
    "X-Trail (Gen3) 2013"
  ],
  "Opel": [
    "Astra (J) 2009",
    "Astra (K) 2015",
    "Astra (L) 2021",
    "Corsa (D) 2006",
    "Corsa (E) 2014",
    "Corsa (F) 2019",
    "Insignia (A) 2008",
    "Insignia (B) 2017",
    "Mokka (Gen1) 2012",
    "Mokka (Gen2) 2020"
  ],
  "Peugeot": [
    "108 (Gen1) 2014",
    "208 (Gen1) 2012",
    "208 (Gen2) 2019",
    "308 (Gen2) 2013",
    "308 (Gen3) 2021",
    "3008 (Gen1) 2009",
    "3008 (Gen2) 2016",
    "5008 (Gen2) 2016"
  ],
  "Porsche": [
    "911 (997) 2004",
    "911 (991) 2011",
    "911 (992) 2018",
    "Cayenne (Gen2) 2010",
    "Cayenne (Gen3) 2017",
    "Macan (Gen1) 2014",
    "Panamera (Gen1) 2009"
  ],
  "Renault": [
    "Clio (Gen3) 2005",
    "Clio (Gen4) 2012",
    "Clio (Gen5) 2019",
    "Captur (Gen1) 2013",
    "Captur (Gen2) 2019",
    "Megane (Gen3) 2008",
    "Megane (Gen4) 2015",
    "Kadjar (Gen1) 2015",
    "Kangoo (Gen2) 2007"
  ],
  "Saab": [
    "9-3 (Gen2) 2002",
    "9-5 (Gen2) 2010"
  ],
  "Seat": [
    "Ibiza (Gen4) 2008",
    "Ibiza (Gen5) 2017",
    "Leon (Gen3) 2012",
    "Leon (Gen4) 2020",
    "Ateca (Gen1) 2016",
    "Arona (Gen1) 2017"
  ],
  "Skoda": [
    "Fabia (Gen2) 2007",
    "Fabia (Gen3) 2014",
    "Octavia (Gen2) 2004",
    "Octavia (Gen3) 2013",
    "Octavia (Gen4) 2019",
    "Karoq (Gen1) 2017",
    "Kodiaq (Gen1) 2016",
    "Superb (Gen2) 2008",
    "Superb (Gen3) 2015"
  ],
  "Smart": [
    "Fortwo (Gen2) 2007",
    "Fortwo (Gen3) 2014",
    "Forfour (Gen2) 2014"
  ],
  "Subaru": [
    "Forester (Gen3) 2008",
    "Forester (Gen4) 2013",
    "Impreza (Gen3) 2007",
    "Outback (Gen4) 2009",
    "Outback (Gen5) 2014"
  ],
  "Suzuki": [
    "Swift (Gen3) 2010",
    "Swift (Gen4) 2017",
    "Vitara (Gen2) 2015",
    "SX4 (Gen1) 2006",
    "S-Cross (Gen1) 2013"
  ],
  "Tesla": [
    "Model 3 (Gen1) 2017",
    "Model S (Gen1) 2012",
    "Model X (Gen1) 2015",
    "Model Y (Gen1) 2020"
  ],
  "Toyota": [
    "Aygo (Gen1) 2005",
    "Aygo (Gen2) 2014",
    "C-HR (Gen1) 2016",
    "Corolla (E150) 2006",
    "Corolla (E210) 2018",
    "Hilux (Gen8) 2015",
    "RAV4 (Gen4) 2012",
    "RAV4 (Gen5) 2018",
    "Yaris (Gen3) 2011",
    "Yaris (Gen4) 2020",
    "Proace (Gen1) 2016"
  ],
  "Volkswagen": [
    "Caddy (Gen3) 2004",
    "Caddy (Gen4) 2015",
    "Caddy (Gen5) 2020",
    "Golf (Gen5) 2003",
    "Golf (Gen6) 2008",
    "Golf (Gen7) 2012",
    "Golf (Gen8) 2019",
    "Passat (B7) 2010",
    "Passat (B8) 2014",
    "Polo (Gen5) 2009",
    "Polo (Gen6) 2017",
    "Tiguan (Gen1) 2007",
    "Tiguan (Gen2) 2016",
    "Transporter (T5) 2003",
    "Transporter (T6) 2015",
    "Transporter (T7) 2021"
  ],
  "Volvo": [
    "C30 (Gen1) 2006",
    "S40 (Gen2) 2004",
    "S60 (Gen2) 2010",
    "S60 (Gen3) 2018",
    "S80 (Gen2) 2006",
    "V40 (Gen1) 2012",
    "V50 (Gen1) 2004",
    "V60 (Gen1) 2010",
    "V60 (Gen2) 2018",
    "V70 (Gen3) 2007",
    "V90 (Gen1) 2016",
    "XC40 (Gen1) 2017",
    "XC60 (Gen1) 2008",
    "XC60 (Gen2) 2017",
    "XC90 (Gen2) 2014"
  ]
};

    if (vehicleMake && vehicleModel) {
      Object.keys(vehicleDatabase).forEach((make) => {
        const option = document.createElement("option");
        option.value = make;
        option.textContent = make;
        vehicleMake.appendChild(option);
      });

      vehicleMake.addEventListener("change", () => {
        vehicleModel.innerHTML = '<option value="" disabled selected hidden>Välj modell och år...</option>';
        vehicleModel.disabled = !vehicleMake.value;

        (vehicleDatabase[vehicleMake.value] || []).forEach((model) => {
          const option = document.createElement("option");
          option.value = model;
          option.textContent = model;
          vehicleModel.appendChild(option);
        });
      });
    }

    // The Swedish registration lookup is intentionally prepared as a backend hook.
    // A real provider requires credentials and should be called server-side so
    // API credentials are never exposed in the browser. Set LM_VEHICLE_API_URL
    // later to your own backend endpoint, for example /api/vehicle-lookup.
    const vehicleApiUrl = window.LM_VEHICLE_API_URL || "";

    lookupVehicle?.addEventListener("click", async () => {
      const registration = registrationInput?.value.trim().toUpperCase();
      if (!registration) {
        vehicleResult.innerHTML = "<span>Fyll i ett registreringsnummer först.</span>";
        vehicleResult.classList.add("show");
        return;
      }

      if (!vehicleApiUrl) {
        vehicleResult.innerHTML = "<span>Registreringsfältet är förberett för fordons-API. Tills API:t kopplas in kan du välja märke och modell manuellt nedan.</span>";
        vehicleResult.classList.add("show");
        return;
      }

      lookupVehicle.disabled = true;
      lookupVehicle.textContent = "Söker...";

      try {
        const response = await fetch(`${vehicleApiUrl}?registration=${encodeURIComponent(registration)}`, {
          headers: { Accept: "application/json" }
        });

        if (!response.ok) throw new Error("Lookup failed");
        const vehicle = await response.json();

        const make = vehicle.make || vehicle.carMake || vehicle.brand || "";
        const model = vehicle.model || vehicle.carModel || "";
        const year = vehicle.year || vehicle.manufactureYear || vehicle.registrationYear || "";

        if (!make && !model) throw new Error("No vehicle data");

        if (vehicleMake && [...vehicleMake.options].some((option) => option.value === make)) {
          vehicleMake.value = make;
          vehicleMake.dispatchEvent(new Event("change"));
        }

        if (vehicleModel) {
          const combined = year ? `${model} (${year})` : model;
          const option = [...vehicleModel.options].find((item) => item.value === combined);

          if (option) {
            vehicleModel.value = combined;
          } else {
            const fallback = document.createElement("option");
            fallback.value = combined;
            fallback.textContent = combined;
            vehicleModel.appendChild(fallback);
            vehicleModel.disabled = false;
            vehicleModel.value = combined;
          }
        }

        vehicleResult.innerHTML = `<strong>Bil hittad:</strong> ${escapeHtml(make)} ${escapeHtml(model)}${year ? ` (${escapeHtml(year)})` : ""}.`;
        vehicleResult.classList.add("show");
      } catch (error) {
        vehicleResult.innerHTML = "<span>Vi kunde inte hitta bilen via registreringsnumret. Välj märke och modell manuellt.</span>";
        vehicleResult.classList.add("show");
      } finally {
        lookupVehicle.disabled = false;
        lookupVehicle.textContent = "Hämta bil";
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = Object.fromEntries(new FormData(form));
      const result = document.querySelector("#bookingResult");
      const vehicle = data.vehicleMake && data.vehicleModel
        ? `${data.vehicleMake} ${data.vehicleModel}`
        : data.registration
          ? `registreringsnummer ${data.registration}`
          : "fordonet";

      result.innerHTML = `
        <strong>Tack, ${escapeHtml(data.name)}.</strong><br>
        Din förfrågan för <strong>${escapeHtml(data.service)}</strong> den
        <strong>${escapeHtml(data.date)}</strong> kl.
        <strong>${escapeHtml(data.time)}</strong> för <strong>${escapeHtml(vehicle)}</strong> är registrerad i detta demo-utkast.<br>
        <small>För riktig bokning behöver formuläret kopplas till ett backend-/bokningssystem.</small>`;

      result.classList.add("show");
      result.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // =========================================================
  // Premium micro-interactions
  // =========================================================

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      button.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  });

  const heroMedia = document.querySelector(".hero-media");
  if (heroMedia && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("scroll", () => {
      const y = Math.min(window.scrollY * 0.055, 32);
      heroMedia.style.transform = `scale(1.03) translate3d(0, ${y}px, 0)`;
    }, { passive: true });
  }

  // Give service / info cards a small pointer glow without changing the clean layout.
  document.querySelectorAll(".info-card, .service-feature, .package-card, .value-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
    });
  });

  function escapeHtml(value) {
    return String(value).replace(
      /[&<>"']/g,
      (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[character])
    );
  }
});
