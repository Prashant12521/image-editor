let filters = {
  brightness: { value: 100, min: 0, max: 200, unit: "%" },
  contrast: { value: 100, min: 0, max: 200, unit: "%" },
  saturation: { value: 100, min: 0, max: 200, unit: "%" },
  hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
  blur: { value: 0, min: 0, max: 20, unit: "px" },
  grayscale: { value: 0, min: 0, max: 100, unit: "%" },
  sepia: { value: 0, min: 0, max: 100, unit: "%" },
  opacity: { value: 100, min: 0, max: 100, unit: "%" },
  invert: { value: 0, min: 0, max: 100, unit: "%" },
};

const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");
const presetsBox = document.querySelector('.presets-box')

let file = null;
let image = null;

const filterContainer = document.querySelector(".filters");

function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (e) => {
    filters[name].value = input.value;
    applyFilters();
  });

  return div;
}

function createFilter() {
  Object.keys(filters).forEach((filter) => {
    const filterElement = createFilterElement(
      filter,
      filters[filter].unit,
      filters[filter].value,
      filters[filter].min,
      filters[filter].max,
    );

    filterContainer.appendChild(filterElement);
  });
}

createFilter();

imgInput.addEventListener("change", (e) => {
  file = e.target.files[0];
  const imagePlaceholder = document.querySelector(".placeholder");
  imageCanvas.style.display = "block";
  imagePlaceholder.style.display = "none";
  presetsBox.style.display = 'block'

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});

function applyFilters() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  canvasCtx.filter = `
  brightness(${filters.brightness.value}${filters.brightness.unit})
  contrast(${filters.contrast.value}${filters.contrast.unit})
  saturate(${filters.saturation.value}${filters.saturation.unit})
  hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
  blur(${filters.blur.value}${filters.blur.unit})
  grayscale(${filters.grayscale.value}${filters.grayscale.unit})
  sepia(${filters.sepia.value}${filters.sepia.unit})
  opacity(${filters.opacity.value}${filters.opacity.unit})
  invert(${filters.invert.value}${filters.invert.unit})
  `;
  canvasCtx.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click", () => {
  filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturation: { value: 100, min: 0, max: 200, unit: "%" },
    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" },
  };
  applyFilters();

  filterContainer.innerHTML = "";
  createFilter();
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  drama: {
    brightness: 90,
    contrast: 140,
    saturation: 110,
    hueRotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 110,
    contrast: 90,
    saturation: 80,
    hueRotation: 10,
    blur: 0,
    grayscale: 20,
    sepia: 40,
    opacity: 100,
    invert: 0,
  },

  blackWhite: {
    brightness: 100,
    contrast: 120,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  cool: {
    brightness: 100,
    contrast: 105,
    saturation: 110,
    hueRotation: 180,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  warm: {
    brightness: 105,
    contrast: 100,
    saturation: 110,
    hueRotation: 330,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },

  fade: {
    brightness: 110,
    contrast: 85,
    saturation: 90,
    hueRotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 10,
    opacity: 90,
    invert: 0,
  },

  cinematic: {
    brightness: 95,
    contrast: 130,
    saturation: 85,
    hueRotation: 200,
    blur: 0,
    grayscale: 10,
    sepia: 15,
    opacity: 100,
    invert: 0,
  },

  dreamy: {
    brightness: 110,
    contrast: 90,
    saturation: 105,
    hueRotation: 0,
    blur: 3,
    grayscale: 0,
    sepia: 10,
    opacity: 95,
    invert: 0,
  },
};

Object.keys(presets).forEach((presetName) => {
  const presetBtn = document.createElement("button");
  presetBtn.classList.add("btn");
  presetBtn.innerText = presetName;
  presetsContainer.appendChild(presetBtn);

  presetBtn.addEventListener("click", () => {
    const preset = presets[presetName];

    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });

    applyFilters();

    filterContainer.innerHTML = "";
    createFilter();
  });
});
