const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: '6ac39780',
            s: searchTerm
        }
    });
    return response.data.Search;
};

const input = document.querySelector('input');

const onInput = async (e) => {
    const movies = await fetchData(e.target.value);
    movies.forEach((movie) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <img src="${movie.Poster}" />
        <h1>${movie.Title}</h1>
        `;

        document.querySelector('#content').appendChild(div)
    });
};

input.addEventListener('input', debounce(onInput, 500));