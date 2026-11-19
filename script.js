document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu-links
  const MENU_ITEMS = document.querySelectorAll("nav a");

  MENU_ITEMS.forEach(function (element) {
    element.addEventListener("click", function (evt) {
      evt.preventDefault();
      alert("Hvis jeg ikke var doven ville dette link nok føre til en side der hed " + element.innerHTML);
    });
  });

  

  // 2. Farvebokse og toast-besked
  const colorBoxes = document.querySelectorAll('.color-box');
  const toast = document.getElementById('toast');
  let toastTimeout;

  colorBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const hexCode = box.getAttribute('data-hex');

      navigator.clipboard.writeText(hexCode).then(() => {
        showToast(`Kopierede ${hexCode} til udklipsholder!`);
      }).catch(() => {
        showToast(`Farvekode: ${hexCode}`);
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // 3. Filtrering af mood-cards
  const filterButtons = document.querySelectorAll('.filter-btn');
  const moodCards = document.querySelectorAll('.mood-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      moodCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

// All available 3D models
const models = [
    "./model1.glb",
    "./model2.glb",
    "./model3.glb",
    "./model4.glb",
    "./model5.glb"
];

const viewer = document.getElementById("mainModel");
const prevButton = document.getElementById("prevModel");
const nextButton = document.getElementById("nextModel");
const counter = document.getElementById("modelCounter");

let currentModel = 0;

function changeModel(index) {

    // Loop around when reaching the beginning or end
    currentModel = (index + models.length) % models.length;

    // Load selected model
    viewer.src = models[currentModel];

}

// Previous arrow
prevButton.addEventListener("click", () => {
    changeModel(currentModel - 1);
});

// Next arrow
nextButton.addEventListener("click", () => {
    changeModel(currentModel + 1);
});

  // 4. Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightbox = document.querySelector('.close-lightbox');

  if (lightbox && lightboxImg && lightboxCaption && closeLightbox) {
    moodCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const caption = card.querySelector('.card-caption');

        if (img && caption) {
          lightboxImg.src = img.src;
          lightboxCaption.textContent = caption.textContent;
          lightbox.classList.add('open');
        }
      });
    });

    closeLightbox.addEventListener('click', () => {
      lightbox.classList.remove('open');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
      }
    });
  }

  // 5. Gør appen installerbar uden ekstra filer
  const manifestData = {
    name: document.title || "Min App",
    short_name: document.title || "MinApp",
    start_url: window.location.href,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "data:image/svg+xml,<svg xmlns='http://w3.org' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23000000'/><text x='50' y='65' font-size='50' text-anchor='middle' fill='%23ffffff'>A</text></svg>",
        sizes: "192x192",
        type: "image/svg+xml"
      }
    ]
  };

  const manifestBlob = new Blob([JSON.stringify(manifestData)], { type: 'application/json' });
  const manifestLink = document.createElement('link');
  manifestLink.rel = 'manifest';
  manifestLink.href = URL.createObjectURL(manifestBlob);
  document.head.appendChild(manifestLink);

  // Tilføj også support til iPhone/iPad ("Føj til hjemmeskærm")
  const appleMeta = document.createElement('meta');
  appleMeta.name = 'apple-mobile-web-app-capable';
  appleMeta.content = 'yes';
  document.head.appendChild(appleMeta);
});

const galleryImages = document.querySelectorAll('.mood-card img');
const lightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeButton = document.querySelector('.lightbox-close');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;

        const caption = img.parentElement.querySelector('.card-caption');

        lightboxCaption.textContent = caption
            ? caption.textContent
            : img.alt;

        lightbox.classList.add('show');

    });
});

// Close using X button
closeButton.addEventListener('click', () => {
    lightbox.classList.remove('show');
});

// Close when clicking outside the image
lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        lightbox.classList.remove('show');
    }
});

// Close using Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        lightbox.classList.remove('show');
    }
});