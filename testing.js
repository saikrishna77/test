var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode() {
  //   // read binary data
  //   var bitmap = fs.readFileSync(
  //   );
  // //   // convert binary data to base64 encoded string
  //   return new Buffer(bitmap).toString('base64');
  let a =
    'https://firebasestorage.googleapis.com/v0/b/ccap-21cd3.appspot.com/o/issuer_registration_images%2FFInal_Testing%2Fmanufacture.png?alt=media&token=0bce1a83-1621-4b31-8081-6199d53207a6';
  return a.toString('base64');
}

console.log(base64_encode());
