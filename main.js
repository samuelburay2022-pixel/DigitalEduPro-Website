(function () {
  const data = window.DIGITAL_EDU_PRO_DATA;
  const byId = (id) => document.getElementById(id);

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = text;
    return element;
  }

  const serviceIcons = {
    data:
      "<svg viewBox='0 0 32 32' aria-hidden='true'><path d='M6 25h20'/><path d='M9 22V12'/><path d='M16 22V7'/><path d='M23 22v-6'/><path d='M7 10l6 4 5-7 7 5'/></svg>",
    social:
      "<svg viewBox='0 0 32 32' aria-hidden='true'><circle cx='10' cy='12' r='4'/><circle cx='22' cy='9' r='3'/><circle cx='22' cy='22' r='4'/><path d='m13.5 10.8 5.7-1.2'/><path d='m13.2 14.2 5.7 5.2'/></svg>",
    marketing:
      "<svg viewBox='0 0 32 32' aria-hidden='true'><path d='M6 18h5l11 5V9L11 14H6z'/><path d='M11 18v7'/><path d='M24.5 13.5 28 11'/><path d='M25 18h4'/></svg>",
    funnel:
      "<svg viewBox='0 0 32 32' aria-hidden='true'><path d='M5 7h22l-9 10v7l-4 2v-9z'/><path d='M9 7c1.8 3.2 4.2 5.2 7 6'/></svg>",
    support:
      "<svg viewBox='0 0 32 32' aria-hidden='true'><path d='M8 17a8 8 0 0 1 16 0'/><path d='M8 17v5h4v-6H8z'/><path d='M24 17v5h-4v-6h4z'/><path d='M20 25h-4'/></svg>",
    media:
      "<svg viewBox='0 0 32 32' aria-hidden='true'><rect x='6' y='8' width='20' height='16' rx='2'/><path d='m14 13 7 3-7 3z'/><path d='M9 27h14'/></svg>",
    ai:
      "<svg viewBox='0 0 32 32' aria-hidden='true'><rect x='9' y='9' width='14' height='14' rx='3'/><path d='M12 5v4'/><path d='M20 5v4'/><path d='M12 23v4'/><path d='M20 23v4'/><path d='M5 12h4'/><path d='M23 12h4'/><path d='M5 20h4'/><path d='M23 20h4'/><path d='M13 18l2-4 2 4'/><path d='M18.5 14v4'/></svg>",
    automation:
      "<svg viewBox='0 0 32 32' aria-hidden='true'><path d='M8 16a8 8 0 0 1 13.7-5.7'/><path d='M22 6v5h-5'/><path d='M24 16a8 8 0 0 1-13.7 5.7'/><path d='M10 26v-5h5'/><path d='M16 12v4l3 2'/></svg>",
    admin:
      "<svg viewBox='0 0 32 32' aria-hidden='true'><path d='M10 5h12l3 4v18H7V5z'/><path d='M21 5v5h4'/><path d='M11 15h10'/><path d='M11 20h10'/></svg>",
    hr:
      "<svg viewBox='0 0 32 32' aria-hidden='true'><circle cx='16' cy='10' r='4'/><path d='M8 26a8 8 0 0 1 16 0'/><path d='M24 12a3 3 0 0 1 3 3'/><path d='M8 12a3 3 0 0 0-3 3'/></svg>",
  };

  function createServiceIcon(name) {
    const icon = createElement("span", "service-icon");
    icon.innerHTML = serviceIcons[name] || serviceIcons.support;
    return icon;
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function createFileLink(file) {
    const link = createElement("a", "file-link");
    link.href = file.path;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.append(createElement("span", "file-link-title", file.title));
    link.append(createElement("span", "file-link-type", file.type));
    return link;
  }

  function renderFileList(files) {
    const list = createElement("ul", "file-list");
    files.forEach((file) => {
      const item = createElement("li");
      item.append(createFileLink(file));
      list.append(item);
    });
    return list;
  }

  function renderImagePreviews(files, limit) {
    const preview = createElement("div", "preview-grid");
    files
      .filter((file) => file.isImage)
      .slice(0, limit)
      .forEach((file) => {
        const link = createElement("a", "preview-tile");
        link.href = file.path;
        link.target = "_blank";
        link.rel = "noreferrer";

        const image = document.createElement("img");
        image.src = file.path;
        image.alt = file.title;
        image.loading = "lazy";

        link.append(image, createElement("span", "", file.title));
        preview.append(link);
      });
    return preview;
  }

  function renderServices() {
    const grid = byId("serviceGrid");

    data.services.forEach((service, index) => {
      const number = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
      const article = createElement("article", "service-card");
      const top = createElement("div", "service-card-top");
      top.append(createServiceIcon(service.icon), createElement("span", "service-index", number));
      article.append(top);
      article.append(createElement("h3", "", service.title));
      article.append(createElement("p", "", service.copy));
      grid.append(article);
    });
  }

  function renderServiceVisuals() {
    const carousel = byId("serviceVisualGrid");
    let currentIndex = 0;

    carousel.classList.add("service-carousel");
    carousel.setAttribute("tabindex", "0");
    carousel.setAttribute("aria-label", "Service artwork carousel");

    const stage = createElement("div", "service-carousel-stage");
    const image = document.createElement("img");
    image.className = "service-carousel-image";
    image.loading = "eager";

    const previous = createElement("button", "carousel-button previous", "‹");
    previous.type = "button";
    previous.setAttribute("aria-label", "Show previous service artwork");

    const next = createElement("button", "carousel-button next", "›");
    next.type = "button";
    next.setAttribute("aria-label", "Show next service artwork");

    stage.append(image, previous, next);

    function updateCarousel(index, direction = 1) {
      currentIndex = (index + data.serviceVisuals.length) % data.serviceVisuals.length;
      const file = data.serviceVisuals[currentIndex];

      image.classList.remove("enter-next", "enter-previous");
      if (direction !== 0) {
        void image.offsetWidth;
        image.classList.add(direction > 0 ? "enter-next" : "enter-previous");
      }
      image.src = file.path;
      image.alt = file.title;
    }

    previous.addEventListener("click", () => updateCarousel(currentIndex - 1, -1));
    next.addEventListener("click", () => updateCarousel(currentIndex + 1, 1));
    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") updateCarousel(currentIndex - 1, -1);
      if (event.key === "ArrowRight") updateCarousel(currentIndex + 1, 1);
    });

    carousel.append(stage);
    updateCarousel(0, 0);
  }

  function renderPortfolioLibrary() {
    const library = byId("portfolioLibrary");

    data.portfolioGroups.forEach((group) => {
      library.append(createPortfolioCategoryCarousel(group));
    });
  }

  function createPortfolioCategoryCarousel(group) {
    const article = createElement("article", "portfolio-category-viewer");
    article.id = `portfolio-${slugify(group.title)}`;
    const header = createElement("div", "portfolio-category-header");
    header.append(createElement("h3", "", group.title), createElement("p", "", group.summary));
    article.append(header);

    if (!group.files.length) {
      article.append(createElement("p", "empty-note portfolio-empty-note", "Samples for this category are coming soon."));
      return article;
    }

    let currentIndex = 0;
    const stage = createElement("div", "portfolio-carousel-stage");
    const frame = createElement("div", "portfolio-media-frame");
    const previous = createElement("button", "carousel-button previous", "‹");
    previous.type = "button";
    previous.setAttribute("aria-label", `Show previous ${group.title} item`);

    const next = createElement("button", "carousel-button next", "›");
    next.type = "button";
    next.setAttribute("aria-label", `Show next ${group.title} item`);

    stage.append(frame, previous, next);

    const thumbnails = createElement("div", "portfolio-carousel-thumbs");
    const thumbnailButtons = group.files.map((file, index) => {
      const button = createElement("button", "portfolio-carousel-thumb");
      button.type = "button";
      button.setAttribute("aria-label", `Show ${file.title}`);

      if (file.isImage) {
        const image = document.createElement("img");
        image.src = file.path;
        image.alt = "";
        image.loading = "lazy";
        button.append(image);
      } else if (file.type === "Video") {
        const image = document.createElement("img");
        image.src = file.poster || file.path;
        image.alt = "";
        image.loading = "lazy";
        button.append(image);
      } else {
        button.append(createElement("span", "document-thumb", file.type));
      }

      button.append(createElement("small", "", file.title));
      button.addEventListener("click", () => {
        const direction = index >= currentIndex ? 1 : -1;
        updateCarousel(index, direction);
      });
      thumbnails.append(button);
      return button;
    });

    function updateCarousel(index, direction = 1) {
      currentIndex = (index + group.files.length) % group.files.length;
      const file = group.files[currentIndex];
      frame.replaceChildren();
      frame.classList.remove("is-moving-next", "is-moving-previous");
      if (direction !== 0) {
        void frame.offsetWidth;
        frame.classList.add(direction > 0 ? "is-moving-next" : "is-moving-previous");
      }

      if (file.isImage) {
        const image = document.createElement("img");
        image.src = file.path;
        image.alt = file.title;
        image.loading = "eager";
        if (direction !== 0) image.classList.add(direction > 0 ? "enter-next" : "enter-previous");
        frame.append(image);
      } else if (file.type === "Video") {
        const video = document.createElement("video");
        video.src = file.path;
        if (file.poster) video.poster = file.poster;
        video.controls = true;
        video.muted = false;
        video.volume = 1;
        video.playsInline = true;
        video.preload = "metadata";
        if (direction !== 0) video.classList.add(direction > 0 ? "enter-next" : "enter-previous");
        frame.append(video);
      } else {
        const documentCard = createElement("a", "portfolio-document-card");
        documentCard.href = file.path;
        documentCard.target = "_blank";
        documentCard.rel = "noreferrer";
        documentCard.append(createElement("span", "", file.type));
        documentCard.append(createElement("strong", "", file.title));
        documentCard.append(createElement("em", "", "Open sample"));
        if (direction !== 0) documentCard.classList.add(direction > 0 ? "enter-next" : "enter-previous");
        frame.append(documentCard);
      }

      thumbnailButtons.forEach((button, buttonIndex) => {
        const active = buttonIndex === currentIndex;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-current", active ? "true" : "false");
      });

      thumbnailButtons[currentIndex].scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }

    previous.addEventListener("click", () => updateCarousel(currentIndex - 1, -1));
    next.addEventListener("click", () => updateCarousel(currentIndex + 1, 1));
    article.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") updateCarousel(currentIndex - 1, -1);
      if (event.key === "ArrowRight") updateCarousel(currentIndex + 1, 1);
    });

    article.setAttribute("tabindex", "0");
    article.append(stage, thumbnails);
    updateCarousel(0, 0);
    return article;
  }

  function startToolOrbit(grid) {
    const cards = Array.from(grid.querySelectorAll(".tool-card"));
    if (!cards.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rotation = 0;
    let velocity = 0;
    let lastFrameTime = 0;
    let isDragging = false;
    let startX = 0;
    let startRotation = 0;
    let lastPointerX = 0;
    let lastPointerTime = 0;
    let hoverPointerX = null;
    let audioContext = null;
    let lastSoundTime = 0;

    function getAudioContext() {
      const AudioConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioConstructor) return null;

      if (!audioContext) {
        audioContext = new AudioConstructor();
      }

      if (audioContext.state === "suspended") {
        audioContext.resume().catch(() => {});
      }

      return audioContext;
    }

    function playSwipeSound(intensity = 1) {
      const now = performance.now();
      if (now - lastSoundTime < 75) return;

      const context = getAudioContext();
      if (!context) return;

      lastSoundTime = now;
      const start = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const filter = context.createBiquadFilter();
      const volume = Math.min(0.045, 0.018 + intensity * 0.014);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(520 + intensity * 190, start);
      oscillator.frequency.exponentialRampToValueAtTime(280, start + 0.08);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.08);

      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.09);
    }

    function setToolPositions() {
      const width = grid.clientWidth;
      const radiusX = Math.max(120, Math.min(width * 0.42, 430));
      const radiusY = width < 700 ? 42 : 62;

      cards.forEach((card, index) => {
        const angle = rotation + (index / cards.length) * Math.PI * 2;
        const depth = (Math.sin(angle) + 1) / 2;
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY;
        const scale = 0.72 + depth * 0.34;
        const opacity = 0.5 + depth * 0.5;

        card.style.setProperty("--tool-x", `${x.toFixed(1)}px`);
        card.style.setProperty("--tool-y", `${y.toFixed(1)}px`);
        card.style.setProperty("--tool-scale", scale.toFixed(3));
        card.style.setProperty("--tool-opacity", opacity.toFixed(3));
        card.style.zIndex = String(Math.round(depth * 100));
      });
    }

    function positionCards(timestamp = 0) {
      const elapsed = lastFrameTime ? timestamp - lastFrameTime : 16;
      lastFrameTime = timestamp;

      if (!isDragging && !reducedMotion.matches) {
        if (Math.abs(velocity) > 0.00002) {
          rotation += velocity * elapsed;
          velocity *= 0.94;
        } else {
          rotation += elapsed * 0.00016;
        }
      }

      setToolPositions();
      window.requestAnimationFrame(positionCards);
    }

    function startDrag(event) {
      isDragging = true;
      startX = event.clientX;
      startRotation = rotation;
      lastPointerX = event.clientX;
      lastPointerTime = performance.now();
      hoverPointerX = event.clientX;
      velocity = 0;
      grid.classList.add("is-dragging");
      grid.setPointerCapture(event.pointerId);
      playSwipeSound(0.8);
    }

    function movePointer(event) {
      if (!isDragging) {
        if (event.pointerType === "mouse" && hoverPointerX !== null) {
          const hoverMoveX = event.clientX - hoverPointerX;
          if (Math.abs(hoverMoveX) < 90) {
            rotation += hoverMoveX * 0.0024;
            velocity = hoverMoveX * 0.000012;
            setToolPositions();
          }
        }

        hoverPointerX = event.clientX;
        return;
      }

      const now = performance.now();
      const deltaX = event.clientX - startX;
      const moveX = event.clientX - lastPointerX;
      const elapsed = Math.max(1, now - lastPointerTime);

      rotation = startRotation + deltaX * 0.008;
      velocity = (moveX * 0.008) / elapsed;
      lastPointerX = event.clientX;
      lastPointerTime = now;
      setToolPositions();

      if (Math.abs(moveX) > 1.5) {
        playSwipeSound(Math.min(1.8, Math.abs(moveX) / 24 + 0.55));
      }
    }

    function stopDrag(event) {
      if (!isDragging) return;

      isDragging = false;
      grid.classList.remove("is-dragging");
      if (grid.hasPointerCapture(event.pointerId)) {
        grid.releasePointerCapture(event.pointerId);
      }
    }

    grid.tabIndex = 0;
    grid.setAttribute("aria-label", "Swipe or drag to rotate tools and platforms");
    grid.addEventListener("pointerenter", (event) => {
      hoverPointerX = event.clientX;
    });
    grid.addEventListener("pointerleave", () => {
      hoverPointerX = null;
    });
    grid.addEventListener("pointerdown", startDrag);
    grid.addEventListener("pointermove", movePointer);
    grid.addEventListener("pointerup", stopDrag);
    grid.addEventListener("pointercancel", stopDrag);
    grid.addEventListener("lostpointercapture", stopDrag);
    grid.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      rotation += event.key === "ArrowLeft" ? -0.35 : 0.35;
      velocity = 0;
      setToolPositions();
    });

    window.requestAnimationFrame(positionCards);
  }

  function renderTools() {
    const grid = byId("toolsGrid");
    data.tools.forEach((tool, index) => {
      const card = createElement("article", "tool-card");
      card.style.setProperty("--tool-delay", `${index * 0.03}s`);

      const image = document.createElement("img");
      image.src = tool.path;
      image.alt = `${tool.title} logo`;
      image.loading = "eager";
      image.decoding = "async";

      card.append(image, createElement("span", "", tool.title));
      grid.append(card);
    });

    startToolOrbit(grid);
  }

  function renderTeam() {
    const grid = byId("teamGrid");

    data.team.forEach((person) => {
      const article = createElement("article", "team-card");
      const image = document.createElement("img");
      image.src = person.image;
      image.alt = person.alt;
      image.loading = "lazy";

      const body = createElement("div", "team-body");
      body.append(createElement("h3", "", person.name));
      body.append(createElement("p", "team-role", person.role));
      body.append(createElement("p", "", person.copy));
      if (person.achievements?.length) {
        const checklist = createElement("ul", "team-checklist");
        person.achievements.forEach((item) => {
          checklist.append(createElement("li", "", item));
        });
        body.append(checklist);
      }

      const social = createElement("div", "team-social");
      const profile = createElement("a", "team-social-link profile", "in");
      profile.href = person.profile;
      profile.setAttribute("aria-label", `${person.name} profile`);
      if (!person.profile.startsWith("#")) {
        profile.target = "_blank";
        profile.rel = "noreferrer";
      }

      const email = createElement("a", "team-social-link mail");
      email.href = `mailto:${person.email}`;
      email.setAttribute("aria-label", `Email ${person.name}`);
      social.append(profile, email);

      article.append(image, body, social);

      grid.append(article);
    });
  }

  function renderContactReasons() {
    const list = byId("contactReasons");
    data.contactReasons.forEach((reason) => {
      list.append(createElement("li", "", reason));
    });
  }

  function bindMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = byId("site-nav");

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  function bindContactForm() {
    const form = byId("contactForm");
    const note = byId("formNote");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const subject = encodeURIComponent(`DigitalEduPro inquiry from ${name || "Website visitor"}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:samvirtualops@gmail.com?subject=${subject}&body=${body}`;
      note.textContent = "Opening your email app to send this message to samvirtualops@gmail.com.";
      form.reset();
    });
  }

  function bindSectionScrollArrow() {
    const button = byId("sectionScrollArrow");
    if (!button) return;

    let transitionTimer;

    function isNearPageBottom() {
      const root = document.documentElement;
      return window.scrollY + window.innerHeight >= root.scrollHeight - 90;
    }

    function updateArrowDirection() {
      const atBottom = isNearPageBottom();
      button.dataset.direction = atBottom ? "up" : "down";
      button.setAttribute("aria-label", atBottom ? "Return home" : "Scroll down");
    }

    function scrollWithArrow() {
      if (isNearPageBottom()) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      window.scrollBy({
        top: Math.max(280, Math.round(window.innerHeight * 0.72)),
        behavior: "smooth",
      });
    }

    button.addEventListener("click", () => {
      clearTimeout(transitionTimer);
      document.documentElement.classList.add("is-section-scrolling");
      button.classList.add("is-activated");
      scrollWithArrow();

      transitionTimer = setTimeout(() => {
        document.documentElement.classList.remove("is-section-scrolling");
        button.classList.remove("is-activated");
        updateArrowDirection();
      }, 950);
    });

    window.addEventListener("scroll", updateArrowDirection, { passive: true });
    window.addEventListener("resize", updateArrowDirection);
    updateArrowDirection();
  }

  function bindVideoVisibilityAudio() {
    const watchedVideos = new WeakSet();
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                const video = entry.target;
                const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.18;
                if (isVisible) return;

                video.muted = true;
                if (!video.classList.contains("hero-bg")) {
                  video.pause();
                }
              });
            },
            { threshold: [0, 0.18, 0.45] }
          )
        : null;

    function watchVideo(video) {
      if (watchedVideos.has(video)) return;
      watchedVideos.add(video);

      if (observer) {
        observer.observe(video);
      }
    }

    document.querySelectorAll("video").forEach(watchVideo);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;

          if (node.matches("video")) {
            watchVideo(node);
          }

          node.querySelectorAll("video").forEach(watchVideo);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) return;

      document.querySelectorAll("video").forEach((video) => {
        video.muted = true;
        if (!video.classList.contains("hero-bg")) {
          video.pause();
        }
      });
    });
  }

  function alignInitialHash() {
    if (!window.location.hash) return;

    const target = document.querySelector(window.location.hash);
    if (!target) return;

    const scrollToTarget = () => {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start" });
      root.style.scrollBehavior = previousScrollBehavior;
    };

    requestAnimationFrame(scrollToTarget);
    [120, 420, 900, 1600, 2800].forEach((delay) => {
      setTimeout(scrollToTarget, delay);
    });

    document.querySelectorAll("img").forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", scrollToTarget, { once: true });
      }
    });

    window.addEventListener("load", () => setTimeout(scrollToTarget, 120), { once: true });
  }

  function init() {
    renderServices();
    renderServiceVisuals();
    renderPortfolioLibrary();
    renderTools();
    renderTeam();
    renderContactReasons();
    bindMenu();
    bindContactForm();
    bindSectionScrollArrow();
    bindVideoVisibilityAudio();
    alignInitialHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
