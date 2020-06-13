const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: '6ac39780',
            i: searchTerm
        }
    });
console.log(response.data)
};

const input = document.querySelector('input');

const onInput = (e) => {
        fetchData(e.target.value);
};

input.addEventListener('input', debounce(onInput, 500));