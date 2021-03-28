

const hash = location.hash;

const trie = new Trie();
const list = new DoubleLinkedList();

// Trie
const searchInput =  document.getElementById('searchText');
const results = document.getElementById('search-results');

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const podcasts = document.querySelector('#results-container');


console.log(podcasts)
console.log(typeof(podcasts))

let offset = 0;

const fetchData = async (url, token) => {
  const results = await fetch(url, {
    headers: {
    // 'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
     
    }
  })
  const data = await results.json();
  return data;
}
const hashObj = hash.slice(1).split('&').reduce((acc, cur) => {
  const [key, value] = cur.split('=');
  acc[key] = value;
  return acc;
}, {});
console.log(hashObj);

// //chrom insector > application > local storage
// no hash token
// 1.check local storage
// 2. send to login.html

let token = hashObj.access_token;

const newEl = str => {
  const p = document.createElement("p");
  p.classList = "search-results";
  p.innerText = str;
  return p;
};



if (token) {
  window.localStorage.setItem('token', hashObj.access_token);
  fetchData('https://api.spotify.com/v1/browse/categories',token).then(data => {
 
    //   populate the trie
    // grab the element
    const words = data.categories.items.map((item) => item.name.toLowerCase());
    words.forEach(word => trie.insert(word));

    // const images = data.categories.items.map((item)=> item.icons[0].url);
    // images.forEach((image) => {
    //   //  list.push(image)
    //   const div = document.createElement('div');
    //   div.classList = 'results';
    //   imageParent.appendChild(div);


    //   const divImg = document.createElement('div');
    //   divImg.classList = 'image';
    //   div.appendChild(divImg);

    //   const img = document.createElement('img');
    //   img.classList = 'image-result';
    //   img.src = image;
    //   divImg.appendChild(img);
    // });

   
    // add an event listener (keydown)
    searchInput.addEventListener('keyup', ev => {
     
      let found  = trie.autoComplete(searchInput.value)
      console.log(found);
        results.innerHTML = '';

        found.forEach((genre) => {
          const el = newEl(genre);
          results.appendChild(el);
          console.log(el)
         })

    });
  }).catch((error) => alert(error.message));
} else {
  location.replace('/login.html');
}

const podcastsElement = (cover, title, genre)=> {
  const element = `
    <img src=${cover}/>
    <span>${title}</span>
    <span>Genre</span>
    <button id='listen-btn' type="submit">Listen</button>
  `;

  const pDiv = document.createElement('div');
  pDiv.classList.add('results');
  pDiv.innerHTML = element;
  return pDiv;
 
}

const fetchGenre = async (genre) => {
  podcasts.innerHTML = '';
  results.value = genre;

  const data = await fetchData(
    `https://api.spotify.com/v1/search?q=${genre}&type=show`, 
    token
  );
  console.log(data);

  results.innerHTML = '';
  const dll = new DoubleLinkedList();
  let elements = [];
  elements = data.shows.items.map((show) => {
    console.log(show)
    console.log(show.images[0].url,'image');
    console.log(show.name, 'name')
    let images = show.images[0].url;
    let name = show.name;
    return podcastsElement(images, name,'');
  
  });
  console.log(elements, 'elements');

  elements.forEach((element) => {
    console.log(element);
    dll.push(element)
  });

  for (let i = offset; i <= offset +3; i++) {
  podcasts.appendChild(dll.getNodeAtIndex(i).value);
  }
  

 
  
  

}
fetchGenre(genre='pop')



if (!token) window.location.replace('/login.html');
