const pipe = (...fns) => initVal => fns.reduce((val, fn) => fn(val), initVal);

const filterBrightness = (imgData, brightness) => {
  const data = imgData.data;
  const factor = brightness * 2; // Originally 2.55 but was reduced to be more granular.
  for (let i = 0; i < data.length; i += 4) {
    data[i] += factor;
    data[i + 1] += factor;
    data[i + 2] += factor;
  }
  return imgData;
};

const filterContrast = (imgData, contrast) => {
  const data = imgData.data;
  const factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));

  for (var i = 0; i < data.length; i += 4) {
    data[i] = factor * (data[i] - 128.0) + 128.0;
    data[i + 1] = factor * (data[i + 1] - 128.0) + 128.0;
    data[i + 2] = factor * (data[i + 2] - 128.0) + 128.0;
  }
  return imgData;
};

const copyImageData = (context, source) => {
  const imgData = context.createImageData(source);
  imgData.data.set(source.data);
  return imgData;
};

export const useCanvas = canvas => {
  const context = canvas.getContext("2d");
  let imageData;

  return {
    useImage(img) {
      const { src, width, height } = img;
      URL.revokeObjectURL(src);
      canvas.width = width;
      canvas.height = height;
      context.drawImage(img, 0, 0, width, height);
      imageData = context.getImageData(0, 0, width, height);
    },
    applyFilters({ brightness, contrast }) {
      const imgData = pipe(
        img => filterBrightness(img, brightness),
        img => filterContrast(img, contrast)
      )(copyImageData(context, imageData));

      context.putImageData(imgData, 0, 0);
    }
  };
};
