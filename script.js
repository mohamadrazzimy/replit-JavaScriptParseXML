
var myUrl = 'https://catalog.ldc.upenn.edu/desc/addenda/LDC2010T05.xml';
// using the cors-anywhere service to handle cors issues
var proxy = 'https://cors-anywhere.herokuapp.com/';

// Execute request
fetch(proxy + myUrl)
  .then(response => response.text())
  .then(xmlString => parseXML(xmlString))
  .catch(error => console.error(error));

// Parse the XML data
function parseXML(xmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'application/xml');

  // Access the elements
  const posts = doc.getElementsByTagName('Post');
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const postClass = post.getAttribute('class');
    const postUser = post.getAttribute('user');
    const postText = post.textContent.trim();

    console.log('Post Class:', postClass);
    console.log('Post User:', postUser);
    console.log('Post Text:', postText);

    const terminals = post.getElementsByTagName('t');
    for (let j = 0; j < terminals.length; j++) {
      const terminal = terminals[j];
      const pos = terminal.getAttribute('pos');
      const word = terminal.getAttribute('word');
      console.log(`POS: ${pos}, Word: ${word}`);
      const divOutput = document.getElementById('divOutput');
      if (divOutput) {
        divOutput.innerHTML += `POS: ${pos}, Word: ${word}<br>`;
      }
    }
    console.log();
  }
}