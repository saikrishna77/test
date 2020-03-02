import image2base64 from 'image-to-base64';
export const Base64 = async file => {
  return new Promise(async (resolve, reject) => {
    let a = await image2base64(file).then(response => {
      if (!response) {
        reject();
      }
      console.log(response);
      resolve(response);
    });
  });
};
