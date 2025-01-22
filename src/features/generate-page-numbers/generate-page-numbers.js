let currentPage;
let loadCount;

window.addEventListener('load', () => {
    currentPage = 1;
    loadCount++;
    return currentPage;
})

const totalPokemon = 386;
const maxPerPage = 12;
const totalPages = Math.ceil(totalPokemon/maxPerPage);

const pageNumberList = document.querySelector(".page-number-list");
const prevPageButton = document.querySelector('.prev-page-container');
const nextPageButton = document.querySelector('.next-page-container');
const prevPageArrow = document.querySelector('.bi-arrow-left');
const nextPageArrow = document.querySelector('.bi-arrow-right');

class CreatePageNumbers{
    constructor(totalPokemon, currentPage) {
        this._totalPokemon = totalPokemon;
        this._pokemonPerPage = 12;
        this._totalPages = Math.ceil(this._totalPokemon/this._pokemonPerPage);
        this._pageList = [];
        this._currentIterator;
        this._listOfIterators = [[],[],[],[],[],[],[],[],[],[],[]];
        this._currentPage = currentPage;
    }

    setNumOfPages() {
        for (let i = 1; i <= this._totalPages; i++) {
            this._pageList.push(`${i}`);
        }
    }

    pushToIterators() {
        this.setNumOfPages();

        this._listOfIterators.forEach(iterator => {
            iterator.push(this._pageList.splice(0, 3));
        });
    }

    initialPages() {
        this.pushToIterators();
        this._currentIterator = 0;

        this._listOfIterators[this._currentIterator].forEach(iteratorPage => {
            iteratorPage.forEach(page => {
                let pageNum = document.createElement('li');
                pageNum.classList.add('page-number');
                pageNum.id = `${page}`;
                pageNum.innerHTML = `${page}`;
                if (currentPage.toString() != page.toString()) {
                    pageNum.style.opacity = '0.5';
                }
                pageNumberList.appendChild(pageNum);

            })
        })
    }

    genPages() {
        //Reset list of iterators
        this._listOfIterators = [[],[],[],[],[],[],[],[],[],[],[]];
        this.pushToIterators();
        console.log('Total Pages: ', this._totalPages);
        console.log('Current Page: ', this._currentPage);
        
        //Determine which iterator to load
        this._listOfIterators.forEach(iterator => {
            iterator.forEach(page => {
                page.forEach(index => {
                    if (index.toString() === this._currentPage.toString()) {
                        // Need to get pages from iterator
                        let pageList = page;
                        pageList.forEach(num => {
                            let pageNum = document.createElement('li');
                            pageNum.classList.add('page-number');
                            pageNum.id = `${num}`;
                            pageNum.innerHTML = `${num}`;
                            pageNumberList.appendChild(pageNum);

                            if (num.toString() === this._currentPage.toString()) {
                                pageNum.style.opacity = '1';
                            } else {
                                pageNum.style.opacity = '0.5';
                            }
                        });

                    }
                })
            })
        });
    }

    removePages() {
        let child = pageNumberList.lastElementChild;
        for (let i = 1; i <= 3; i++) {
            while(child) {
                pageNumberList.removeChild(child);
                child = pageNumberList.lastElementChild;
            }
        }
    }

    nextPage() {
        this.removePages();
        this._currentPage++;
        currentPage++;
        this.genPages();

        if (this._currentPage === this._totalPages) {
            nextPageArrow.style.display = 'none';
        }

        if (this._currentPage !== 1) {
            prevPageArrow.style.display = 'block';
        }
    }

    prevPage() {
        this.removePages();
        this._currentPage--;
        currentPage--;
        this.genPages();

        if (this._currentPage === 1) {
            prevPageArrow.style.display = 'none';
        }

        if (this._currentPage !== this._totalPages) {
            nextPageArrow.style.display = 'block';
        }
    }
}


// Load initial pages
const generatePageNumbers = new CreatePageNumbers(386, 1);

const initialLoad = function() {
    prevPageArrow.style.display = 'none';
    generatePageNumbers.genPages();
}
window.addEventListener('load', initialLoad);





// Go to next page
const genNextPage = function() {
    generatePageNumbers.nextPage();
}
nextPageButton.addEventListener('click', genNextPage);





// Go to prev page
const genPrevPage = function() {
    generatePageNumbers.prevPage();
}
prevPageButton.addEventListener('click', genPrevPage);

