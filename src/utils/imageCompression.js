import imageCompression from 'browser-image-compression';

export async function compressImage(imageFile) {
  console.log('originalFile instanceof Blob', imageFile instanceof Blob);
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);

    return compressedFile;
  } catch (error) {
    console.log(error);
    return imageFile;
  }
}

export function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
