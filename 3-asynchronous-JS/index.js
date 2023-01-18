const fs = require('fs');
const superagent = require('superagent');

// buidling a promise
const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find the file 😒');

      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('I could not find the file 😒');

      resolve('Success!!!');
    });
  });
};

const getDogPic3Promises = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Promise, res2Promise, res3Promise]);
    // console.log(all);

    const imgs = all.map((el) => {
      return el.body.message;
    });
    console.log(imgs);

    await writeFilePromise('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log('Error ' + err);
    throw err;
  }
  return '2: Ready';
};

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePromise('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log('Error ' + err);
    throw err;
  }
  return '2: Ready';
};

// Using an IIFE
(async () => {
  try {
    console.log('1: Will get dog pics!!');
    const x = await getDogPic3Promises();
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log('Error 🔥');
  }
})();

/*
console.log('1: Will get dog pics!!');
// const x = getDogPic();
// console.log(x);
getDogPic()
  .then((x) => {
    console.log(x);
  })
  .catch((err) => {
    console.log(err);
  });
console.log('3: Done getting dog pics!');
*/

/*
readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body);
    console.log(res.body.message);

    return writeFilePromise('dog-img.txt', res.body.message);
  })
  .then(() => console.log('Random dog image saved to file!'))
  .catch((err) => {
    if (err) console.log(err.message);
  });
*/
