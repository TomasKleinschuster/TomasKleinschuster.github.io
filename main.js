const grid = new Muuri('.grid', {
    layout: {
        rounding: false,
      }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('load-images');

    // listeners de los enlaces para filtrar por categoria

    const categoryLinks = document.querySelectorAll('#categories a');
    categoryLinks.forEach( (element) => {
       element.addEventListener('click', (event) => {
           event.preventDefault();
           categoryLinks.forEach((link) => link.classList.remove('active'));
           event.target.classList.add('active');

           const category = event.target.innerHTML.toLowerCase();
           category === 'all projects' ? grid.filter('[data-category]') : grid.filter(`[data-category="${category}"]`);
        });
    });

    // listener para la barra de busqueda

    document.querySelector('#search-bar').addEventListener('input', (event) => {
        const search = event.target.value;
        grid.filter( (item) => item.getElement().dataset.tags.includes(search) );
    });

    // listener para las imagenes

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((element) => {
        const route = element.getAttribute('src');
        const description = element.parentNode.parentNode.dataset.description;

        element.addEventListener('click', () => {
            overlay.classList.add('active');
            document.querySelector('#overlay img').src = route;
            document.querySelector('#overlay .description').innerHTML = description;
        });
    });

    // event listener boton de cerrar

    document.querySelector('#btn-close-popup').addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    // event listener overlay

    overlay.addEventListener('click', (event) => {
        event.target.id === 'overlay' ? overlay.classList.remove('active') : '';
    });
});