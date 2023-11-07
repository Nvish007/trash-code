import ImageResizer from '@bam.tech/react-native-image-resizer';

export const resizeImage = imagePathObj => {
  return new Promise((resolve, reject) => {
    ImageResizer.createResizedImage(imagePathObj.uri, 500, 500, 'JPEG', 100)
      .then(resizedImageUri => {
        resolve(resizedImageUri);
      })
      .catch(error => {
        reject(error);
      });
  });
};
