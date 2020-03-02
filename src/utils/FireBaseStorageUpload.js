import firebase from 'firebase';
const storage = firebase.storage();
// eslint-disable-next-line no-undef
export const FileUpload = async (fileName, name) => {
  return new Promise(async (resolve, reject) => {
    let constUrl;
    const uploadTask = await storage
      .ref(`/issuer_complaince_images/${name}/${fileName.name}`)
      .put(fileName)
      .then(snapShot => {
        storage
          .ref(`/issuer_complaince_images/${name}`)
          .child(`${fileName.name}`)
          .getDownloadURL()
          .then(fireBaseUrl => {
            console.log(fireBaseUrl);
            constUrl = fireBaseUrl;
          });
      });
    resolve(constUrl);
  });
};
