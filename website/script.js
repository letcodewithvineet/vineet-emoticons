/*
 * script.js
 *
 * Handles interactivity for the vineet‑emoticons website. This file builds
 * the emoji library UI, updates the preview when a user selects an emoji,
 * enables search filtering, and provides functionality for copying and
 * downloading emoji characters. It also powers a simple custom emoji
 * generator where visitors can choose a face colour, eye style and mouth
 * style, then draw the result to a canvas for download or copying.
 */

// Wait for DOMContentLoaded to ensure elements are available
document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------
   * Emoji library data and rendering
   *
   * We define a selection of emojis grouped into intuitive categories. Each
   * emoji is represented by an object containing the unicode character, a
   * human‑readable name and an identifier suitable for file names. Feel free
   * to extend these lists with additional favourites.
   */
  const categories = [
    {
      id: 'smileys',
      label: 'Smileys',
      icon: '😃',
      emojis: [
        { char: '😀', name: 'Grinning Face', id: 'grinning-face' },
        { char: '😃', name: 'Smiling Face with Big Eyes', id: 'smiling-face-big-eyes' },
        { char: '😄', name: 'Smiling Face with Smiling Eyes', id: 'smiling-face-with-smiling-eyes' },
        { char: '😁', name: 'Beaming Face with Smiling Eyes', id: 'beaming-face-with-smiling-eyes' },
        { char: '😆', name: 'Grinning Squinting Face', id: 'grinning-squinting-face' },
        { char: '😅', name: 'Grinning Face with Sweat', id: 'grinning-face-with-sweat' },
        { char: '😂', name: 'Face with Tears of Joy', id: 'face-with-tears-of-joy' },
        { char: '🤣', name: 'Rolling on the Floor Laughing', id: 'rolling-on-the-floor-laughing' },
        { char: '😊', name: 'Smiling Face with Smiling Eyes', id: 'smiling-face-with-smiling-eyes-alt' },
        { char: '😇', name: 'Smiling Face with Halo', id: 'smiling-face-with-halo' },
        { char: '🙂', name: 'Slightly Smiling Face', id: 'slightly-smiling-face' },
        { char: '🙃', name: 'Upside-Down Face', id: 'upside-down-face' },
        { char: '😉', name: 'Winking Face', id: 'winking-face' },
        { char: '😍', name: 'Smiling Face with Heart-Eyes', id: 'smiling-face-with-heart-eyes' },
        { char: '😘', name: 'Face Blowing a Kiss', id: 'face-blowing-a-kiss' },
        { char: '😜', name: 'Winking Face with Tongue', id: 'winking-face-with-tongue' },
        { char: '🤪', name: 'Zany Face', id: 'zany-face' },
      ],
    },
    {
      id: 'animals',
      label: 'Animals',
      icon: '🐶',
      emojis: [
        { char: '🐶', name: 'Dog Face', id: 'dog-face' },
        { char: '🐱', name: 'Cat Face', id: 'cat-face' },
        { char: '🐭', name: 'Mouse Face', id: 'mouse-face' },
        { char: '🐰', name: 'Rabbit Face', id: 'rabbit-face' },
        { char: '🦊', name: 'Fox Face', id: 'fox-face' },
        { char: '🐻', name: 'Bear Face', id: 'bear-face' },
        { char: '🐼', name: 'Panda Face', id: 'panda-face' },
        { char: '🐨', name: 'Koala', id: 'koala' },
        { char: '🐸', name: 'Frog', id: 'frog' },
        { char: '🦁', name: 'Lion Face', id: 'lion-face' },
        { char: '🐵', name: 'Monkey Face', id: 'monkey-face' },
      ],
    },
    {
      id: 'food',
      label: 'Food',
      icon: '🍎',
      emojis: [
        { char: '🍎', name: 'Red Apple', id: 'red-apple' },
        { char: '🍇', name: 'Grapes', id: 'grapes' },
        { char: '🍉', name: 'Watermelon', id: 'watermelon' },
        { char: '🍌', name: 'Banana', id: 'banana' },
        { char: '🍒', name: 'Cherries', id: 'cherries' },
        { char: '🍕', name: 'Pizza', id: 'pizza' },
        { char: '🍔', name: 'Hamburger', id: 'hamburger' },
        { char: '🍟', name: 'French Fries', id: 'french-fries' },
        { char: '🌭', name: 'Hot Dog', id: 'hot-dog' },
        { char: '🍿', name: 'Popcorn', id: 'popcorn' },
        { char: '🍩', name: 'Doughnut', id: 'doughnut' },
      ],
    },
    {
      id: 'activities',
      label: 'Activities',
      icon: '⚽',
      emojis: [
        { char: '⚽', name: 'Soccer Ball', id: 'soccer-ball' },
        { char: '🏀', name: 'Basketball', id: 'basketball' },
        { char: '🏈', name: 'American Football', id: 'american-football' },
        { char: '⚾', name: 'Baseball', id: 'baseball' },
        { char: '🎾', name: 'Tennis', id: 'tennis' },
        { char: '🏐', name: 'Volleyball', id: 'volleyball' },
        { char: '🎳', name: 'Bowling', id: 'bowling' },
        { char: '⛳', name: 'Flag in Hole', id: 'flag-in-hole' },
        { char: '🏓', name: 'Ping Pong', id: 'ping-pong' },
        { char: '🎮', name: 'Video Game', id: 'video-game' },
      ],
    },
    {
      id: 'travel',
      label: 'Travel',
      icon: '✈️',
      emojis: [
        { char: '✈️', name: 'Airplane', id: 'airplane' },
        { char: '🚗', name: 'Car', id: 'car' },
        { char: '🚕', name: 'Taxi', id: 'taxi' },
        { char: '🚲', name: 'Bicycle', id: 'bicycle' },
        { char: '🚆', name: 'Train', id: 'train' },
        { char: '🚀', name: 'Rocket', id: 'rocket' },
        { char: '🚤', name: 'Speedboat', id: 'speedboat' },
        { char: '🚁', name: 'Helicopter', id: 'helicopter' },
        { char: '🗽', name: 'Statue of Liberty', id: 'statue-of-liberty' },
      ],
    },
    {
      id: 'objects',
      label: 'Objects',
      icon: '💡',
      emojis: [
        { char: '💡', name: 'Light Bulb', id: 'light-bulb' },
        { char: '📱', name: 'Mobile Phone', id: 'mobile-phone' },
        { char: '💻', name: 'Laptop Computer', id: 'laptop-computer' },
        { char: '⌚', name: 'Watch', id: 'watch' },
        { char: '📷', name: 'Camera', id: 'camera' },
        { char: '🎧', name: 'Headphone', id: 'headphone' },
        { char: '⌨️', name: 'Keyboard', id: 'keyboard' },
        { char: '📦', name: 'Package', id: 'package' },
        { char: '🎁', name: 'Gift', id: 'gift' },
      ],
    },
    {
      id: 'symbols',
      label: 'Symbols',
      icon: '❤️',
      emojis: [
        { char: '❤️', name: 'Red Heart', id: 'red-heart' },
        { char: '💛', name: 'Yellow Heart', id: 'yellow-heart' },
        { char: '💚', name: 'Green Heart', id: 'green-heart' },
        { char: '💙', name: 'Blue Heart', id: 'blue-heart' },
        { char: '💜', name: 'Purple Heart', id: 'purple-heart' },
        { char: '🧡', name: 'Orange Heart', id: 'orange-heart' },
        { char: '💔', name: 'Broken Heart', id: 'broken-heart' },
        { char: '❗', name: 'Exclamation Mark', id: 'exclamation-mark' },
        { char: '⭐', name: 'Star', id: 'star' },
        { char: '✨', name: 'Sparkles', id: 'sparkles' },
      ],
    },
  ];

  // Flatten all emojis into a single list for search
  const allEmojis = categories.reduce((acc, cat) => acc.concat(cat.emojis), []);

  // Elements references
  const categoriesContainer = document.getElementById('categories');
  const grid = document.getElementById('emoji-grid');
  const searchInput = document.getElementById('search-input');
  const previewEl = document.getElementById('emoji-preview');
  const nameEl = document.getElementById('emoji-name');
  const idEl = document.getElementById('emoji-id');
  const copyBtn = document.getElementById('copy-btn');
  const downloadBtn = document.getElementById('download-btn');

  let currentCategoryId = categories[0].id;
  let selectedEmoji = categories[0].emojis[0];
  let selectedEmojiElement = null;

  /**
   * Render category buttons. The active category is visually highlighted. When
   * clicked, each button updates the current category and refreshes the
   * displayed grid. Categories also display an icon for quick visual
   * identification.
   */
  function renderCategories() {
    categoriesContainer.innerHTML = '';
    categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.textContent = `${cat.icon} ${cat.label}`;
      btn.classList.toggle('active', cat.id === currentCategoryId);
      btn.dataset.category = cat.id;
      btn.addEventListener('click', () => {
        currentCategoryId = cat.id;
        searchInput.value = '';
        renderCategories();
        populateGrid();
      });
      categoriesContainer.appendChild(btn);
    });
  }

  /**
   * Populate the emoji grid based on the current category or search query. If
   * a search term is present, the grid shows matches across all categories.
   * Otherwise, it displays the emojis of the selected category. The first
   * emoji of the resulting set is automatically selected unless a prior
   * selection exists in the same set.
   */
  function populateGrid() {
    grid.innerHTML = '';
    const query = searchInput.value.trim().toLowerCase();
    let emojisToShow;
    if (query) {
      emojisToShow = allEmojis.filter((e) => e.name.toLowerCase().includes(query) || e.char.includes(query));
    } else {
      const cat = categories.find((c) => c.id === currentCategoryId);
      emojisToShow = cat ? cat.emojis : [];
    }

    emojisToShow.forEach((emoji, index) => {
      const item = document.createElement('div');
      item.className = 'emoji-item';
      item.textContent = emoji.char;
      item.title = emoji.name;
      item.addEventListener('click', () => {
        selectEmoji(emoji, item);
      });
      // Highlight previously selected emoji
      if (selectedEmoji && emoji.char === selectedEmoji.char) {
        item.classList.add('active');
        selectedEmojiElement = item;
      }
      grid.appendChild(item);
    });

    // If current selection is not in the displayed list, default to the first emoji
    const selectedExists = selectedEmoji && emojisToShow.some((e) => e.char === selectedEmoji.char);
    if (!selectedExists) {
      if (emojisToShow.length > 0) {
        const firstElement = grid.querySelector('.emoji-item');
        if (firstElement) {
          selectEmoji(emojisToShow[0], firstElement);
        }
      }
    }
  }

  /**
   * Update the preview panel and highlight the selected emoji in the grid. This
   * function stores the chosen emoji globally so that copy and download
   * operations can access it. The optional element parameter is the DOM
   * element representing the clicked emoji; if provided, it will receive
   * an active class.
   * @param {Object} emoji - The emoji object selected
   * @param {HTMLElement} element - The grid element representing the emoji
   */
  function selectEmoji(emoji, element) {
    selectedEmoji = emoji;
    previewEl.textContent = emoji.char;
    nameEl.textContent = emoji.name;
    idEl.textContent = emoji.id;
    if (selectedEmojiElement) {
      selectedEmojiElement.classList.remove('active');
    }
    if (element) {
      element.classList.add('active');
      selectedEmojiElement = element;
    }
  }

  /**
   * Copy the currently selected emoji to the clipboard. If the clipboard API
   * fails for some reason, fall back to using a hidden textarea.
   */
  function copySelectedEmoji() {
    const text = selectedEmoji ? selectedEmoji.char : '';
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Emoji copied to clipboard');
      }).catch(() => {
        fallbackCopyText(text);
      });
    } else {
      fallbackCopyText(text);
    }
  }

  /**
   * Fallback method for copying text to the clipboard. Creates a temporary
   * textarea to select and copy text programmatically.
   * @param {string} text - The text to copy
   */
  function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Emoji copied to clipboard');
    } catch (err) {
      console.warn('Failed to copy text', err);
    }
    document.body.removeChild(textarea);
  }

  /**
   * Download the selected emoji as a PNG image. A temporary canvas is used to
   * render the character at high resolution and exported via a blob URL.
   */
  function downloadSelectedEmoji() {
    if (!selectedEmoji) return;
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Adjust font to ensure emoji fully fills the canvas
    ctx.font = `${size * 0.8}px serif`;
    ctx.fillText(selectedEmoji.char, size / 2, size / 2 + size * 0.05);
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedEmoji.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  /**
   * Simple toast notification. Creates a floating message at the bottom of
   * the screen which fades out after a short time. Only one toast is shown
   * at any given moment.
   * @param {string} message - The message to display
   */
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 2500);
  }

  // Event listeners for copy and download buttons
  copyBtn.addEventListener('click', copySelectedEmoji);
  downloadBtn.addEventListener('click', downloadSelectedEmoji);

  // Search input event – refresh grid on each keystroke
  searchInput.addEventListener('input', () => {
    populateGrid();
  });

  // Initialise categories and grid
  renderCategories();
  populateGrid();

  /* ------------------------------------------------------------------
   * Custom emoji generator
   *
   * Users can create bespoke emojis by choosing a base colour, eye style
   * and mouth style. Each option is defined by an object containing a
   * label for display and a drawing function that receives a 2D canvas
   * context. The draw functions operate in an abstract coordinate system
   * anchored at the canvas centre to simplify positioning.
   */

  // Options definitions
  const faceColors = ['#FFD966', '#F4B400', '#FFAB91', '#AED581', '#81D4FA', '#CE93D8', '#FFF59D'];
  const eyeOptions = [
    {
      id: 'normal',
      label: '◉◉',
      draw: function (ctx, cx, cy, scale) {
        const r = 10 * scale;
        const offsetX = 30 * scale;
        const offsetY = 20 * scale;
        ctx.fillStyle = '#000';
        // left eye
        ctx.beginPath();
        ctx.arc(cx - offsetX, cy - offsetY, r, 0, Math.PI * 2);
        ctx.fill();
        // right eye
        ctx.beginPath();
        ctx.arc(cx + offsetX, cy - offsetY, r, 0, Math.PI * 2);
        ctx.fill();
      },
    },
    {
      id: 'happy',
      label: '^ ^',
      draw: function (ctx, cx, cy, scale) {
        const w = 20 * scale;
        const h = 10 * scale;
        const offsetX = 30 * scale;
        const offsetY = 20 * scale;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3 * scale;
        // left eye (arc up)
        ctx.beginPath();
        ctx.arc(cx - offsetX, cy - offsetY, w / 2, Math.PI, 0, false);
        ctx.stroke();
        // right eye
        ctx.beginPath();
        ctx.arc(cx + offsetX, cy - offsetY, w / 2, Math.PI, 0, false);
        ctx.stroke();
      },
    },
    {
      id: 'wink',
      label: '😉',
      draw: function (ctx, cx, cy, scale) {
        const r = 10 * scale;
        const offsetX = 30 * scale;
        const offsetY = 20 * scale;
        ctx.fillStyle = '#000';
        // left eye open
        ctx.beginPath();
        ctx.arc(cx - offsetX, cy - offsetY, r, 0, Math.PI * 2);
        ctx.fill();
        // right eye wink (line)
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3 * scale;
        ctx.beginPath();
        ctx.moveTo(cx + offsetX - 8 * scale, cy - offsetY);
        ctx.lineTo(cx + offsetX + 8 * scale, cy - offsetY);
        ctx.stroke();
      },
    },
    {
      id: 'starry',
      label: '✧✧',
      draw: function (ctx, cx, cy, scale) {
        const r = 12 * scale;
        const offsetX = 30 * scale;
        const offsetY = 20 * scale;
        ctx.fillStyle = '#000';
        // draw small star by rotating squares
        function drawStar(x, y) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-r / 2, -r / 6, r, r / 3);
          ctx.rotate(Math.PI / 2);
          ctx.fillRect(-r / 2, -r / 6, r, r / 3);
          ctx.restore();
        }
        drawStar(cx - offsetX, cy - offsetY);
        drawStar(cx + offsetX, cy - offsetY);
      },
    },
  ];

  const mouthOptions = [
    {
      id: 'smile',
      label: '◡',
      draw: function (ctx, cx, cy, scale) {
        const r = 40 * scale;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 4 * scale;
        ctx.beginPath();
        ctx.arc(cx, cy + 30 * scale, r, 0, Math.PI, false);
        ctx.stroke();
      },
    },
    {
      id: 'sad',
      label: '︵',
      draw: function (ctx, cx, cy, scale) {
        const r = 35 * scale;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 4 * scale;
        ctx.beginPath();
        ctx.arc(cx, cy + 60 * scale, r, Math.PI, 0, false);
        ctx.stroke();
      },
    },
    {
      id: 'open',
      label: '○',
      draw: function (ctx, cx, cy, scale) {
        const r = 20 * scale;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(cx, cy + 40 * scale, r, 0, Math.PI * 2);
        ctx.fill();
      },
    },
    {
      id: 'tongue',
      label: '👅',
      draw: function (ctx, cx, cy, scale) {
        const r = 20 * scale;
        // mouth outline
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(cx, cy + 40 * scale, r, 0, Math.PI * 2);
        ctx.fill();
        // tongue
        ctx.fillStyle = '#e57373';
        ctx.beginPath();
        ctx.arc(cx, cy + 48 * scale, r * 0.6, 0, Math.PI, false);
        ctx.fill();
      },
    },
  ];

  // Elements for creator controls
  const colorOptionsEl = document.getElementById('color-options');
  const eyesOptionsEl = document.getElementById('eyes-options');
  const mouthOptionsEl = document.getElementById('mouth-options');
  const createBtn = document.getElementById('create-btn');
  const customCanvas = document.getElementById('custom-canvas');
  const downloadCustomBtn = document.getElementById('download-custom-btn');
  const copyCustomBtn = document.getElementById('copy-custom-btn');
  const ctxCustom = customCanvas.getContext('2d');

  let selectedColor = faceColors[0];
  let selectedEyes = eyeOptions[0];
  let selectedMouth = mouthOptions[0];

  /**
   * Render selection options for colours, eyes and mouths. Each option is
   * represented as a clickable element. The selected option receives a
   * special class for styling.
   */
  function renderCreatorOptions() {
    // Render colour swatches
    colorOptionsEl.innerHTML = '';
    faceColors.forEach((color) => {
      const div = document.createElement('div');
      div.className = 'color-option';
      div.style.backgroundColor = color;
      div.setAttribute('role', 'button');
      div.setAttribute('aria-label', `Face colour ${color}`);
      if (color === selectedColor) {
        div.classList.add('selected');
      }
      div.addEventListener('click', () => {
        selectedColor = color;
        renderCreatorOptions();
        drawCustomEmoji();
      });
      colorOptionsEl.appendChild(div);
    });
    // Render eye options
    eyesOptionsEl.innerHTML = '';
    eyeOptions.forEach((option) => {
      const div = document.createElement('div');
      div.className = 'eye-option';
      div.textContent = option.label;
      div.setAttribute('role', 'button');
      div.setAttribute('aria-label', `Eyes: ${option.id}`);
      if (option.id === selectedEyes.id) {
        div.classList.add('selected');
      }
      div.addEventListener('click', () => {
        selectedEyes = option;
        renderCreatorOptions();
        drawCustomEmoji();
      });
      eyesOptionsEl.appendChild(div);
    });
    // Render mouth options
    mouthOptionsEl.innerHTML = '';
    mouthOptions.forEach((option) => {
      const div = document.createElement('div');
      div.className = 'mouth-option';
      div.textContent = option.label;
      div.setAttribute('role', 'button');
      div.setAttribute('aria-label', `Mouth: ${option.id}`);
      if (option.id === selectedMouth.id) {
        div.classList.add('selected');
      }
      div.addEventListener('click', () => {
        selectedMouth = option;
        renderCreatorOptions();
        drawCustomEmoji();
      });
      mouthOptionsEl.appendChild(div);
    });
  }

  /**
   * Draw the custom emoji on the canvas. Clears previous drawings and
   * re‑renders the face, eyes and mouth according to the currently selected
   * options. The drawing logic scales automatically based on the canvas
   * dimensions so that shapes remain proportional.
   */
  function drawCustomEmoji() {
    const w = customCanvas.width;
    const h = customCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const scale = w / 240; // base canvas size factor
    ctxCustom.clearRect(0, 0, w, h);
    // draw face circle
    ctxCustom.fillStyle = selectedColor;
    ctxCustom.beginPath();
    ctxCustom.arc(cx, cy, 100 * scale, 0, Math.PI * 2);
    ctxCustom.fill();
    // draw eyes
    selectedEyes.draw(ctxCustom, cx, cy - 10 * scale, scale);
    // draw mouth
    selectedMouth.draw(ctxCustom, cx, cy + 10 * scale, scale);
  }

  /**
   * Download the custom emoji as a PNG file. Generates a temporary anchor
   * element to trigger the download of the canvas data URL.
   */
  function downloadCustomEmoji() {
    customCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'custom-emoji.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  /**
   * Copy the custom emoji image to the clipboard. Uses the asynchronous
   * ClipboardItem API where available; falls back to copying the data URL
   * string if image copy is unsupported.
   */
  function copyCustomEmoji() {
    if (navigator.clipboard && navigator.clipboard.write) {
      customCanvas.toBlob(async (blob) => {
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          showToast('Custom emoji copied to clipboard');
        } catch (err) {
          // fallback: copy data URL as text
          customCanvas.toDataURL('image/png');
          fallbackCopyText(customCanvas.toDataURL('image/png'));
        }
      });
    } else {
      fallbackCopyText(customCanvas.toDataURL('image/png'));
    }
  }

  // Initial render of creator options and canvas
  renderCreatorOptions();
  drawCustomEmoji();

  // Event listeners for create, download and copy actions
  createBtn.addEventListener('click', drawCustomEmoji);
  downloadCustomBtn.addEventListener('click', downloadCustomEmoji);
  copyCustomBtn.addEventListener('click', () => {
    copyCustomEmoji();
  });
});

/*
 * Lightweight toast styling appended here to avoid reliance on external CSS.
 * The toast appears fixed at the bottom centre of the viewport and fades
 * in/out using CSS transitions. See showToast() above for usage.
 */
const style = document.createElement('style');
style.textContent = `
  .toast {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 0.6rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 1000;
  }
  .toast.show {
    opacity: 1;
  }
`;
document.head.appendChild(style);