const hash = location.hash;
const trie = new Trie();

const fetchData = async (url, token) => {
    const results = await fetch(url, {headers: {
        Authorization: `Bearer ${token}`
    }})
    const data = await results.json();
    return data;
}
const hashObj = hash.slice(1).split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('=');
    acc[key] = value;
    return acc;
}, {});

//chrom insector > application > local storage
let token = hasObj.access_token;

if (!token) {
  window.localStorage.setItem('token', hashObj.access_token);
  fetchData('https://api.spotify.com/v1/browse/categories',token).then(data => {
    //   populate the trie
    console.log(data);
    // grab the element
    const words = data.categories.item.map((item) => item.name);
    words.forEach(word => trie.insert(word));
    console.log(words);
    console.log(trie);
    // add an event listener (keydown)
    document
      .getElementById('searchText')
      .addEventListener('keyup', ev => {
        const { found } = trie.autoComplete(ev.target.value.toLowerCase());
        console.log(found);
        const results = document.getElementById('results');
        results.innerHTML = '';
        found?.forEach((genre) => {
          const p = newEl(genre);
          results.appendChild(p);
        })

        console.log(ev.target.innerText);
      });

        // current value
        // use trie.autoComplete
        // with our array iterate
         // div (container) -> append child
        // display
  }).catch((error) => alert(error.message));
} else {
  location.replace('/login.html');
}

if (!token) window.location.replace('/login.html');
