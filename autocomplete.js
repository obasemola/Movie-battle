const createAutoComplete = ({ root }) => {
root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;
const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');

const onInput = async (e) => {
    const movies = await fetchData(e.target.value);

    if(!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    movies.forEach((movie) => {
        const option = document.createElement('a');
        const imgSrc = movie.Poster === "N/A" ? '' : movie.Poster;

        option.classList.add('dropdown-item');
        option.innerHTML = `
        <img src="${imgSrc}" />
        ${movie.Title}
        `;

        option.addEventListener('click', (e) => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie);
        });

        resultsWrapper.appendChild(option)
    });
};

input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) {
        dropdown.classList.remove('is-active')
    }
});

}