// const key23 = '0cdf8d12e2d547f293bf44b597ab88f3';
// const keyGl = 'e79b7dc9701a4d73b80ec3ea92841718';
// const cCodes = ['au', 'ca', 'gb', 'ie', 'in', 'my', 'ng', 'nz', 'ph', 'sa', 'sg', 'us', 'za']

function Service() {
    this.url = 'http://news-api-v2.herokuapp.com';
    this.apiKey = '0cdf8d12e2d547f293bf44b597ab88f3';
    this.ajax = new Ajax(this.url);
    this.basicCountry = 'us';
    this.basicImg = './basic-img.png'
    this.everything = function(q, callback) {
        const {ajax, apiKey} = this;
        const query = ajax.setQuery({q, apiKey});
        ajax.get('everything', query, callback);
    }
    this.topHeadlines = function(country, callback) {
        const {ajax, apiKey, basicCountry} = this;
        country = country || basicCountry;
        const query = ajax.setQuery({country, apiKey});
        ajax.get('top-headlines', query, callback);
    }
    this.categoryHeadlines = function(country, category, callback) {
        const {ajax, apiKey, basicCountry} = this;
        country = country || basicCountry;
        const query = ajax.setQuery({country, category, apiKey});
        ajax.get('top-headlines', query, callback);
    }
}
const newsService = new Service();

document.addEventListener('DOMContentLoaded', () => {
    preloader.add();
    newsService.topHeadlines(newsService.basicCountry, onGetResponse)
})

function onGetResponse(res, err) {
    preloader.remove();
    if(err) return notification(err, 'error-msg');
    if(res.articles.length) {
        renderNews(res.articles)
    } else {
        notification('No articles', 'error-msg');
    }
}

function renderNews(news) {
    const newsContainer = document.querySelector('.news-container .row');
    newsContainer.innerHTML = '';
    // const fragment = document.createDocumentFragment();
    news.forEach(item => {
        newsContainer.append(newsTemplate(item));
    })
}

function newsTemplate(newsData) {
    const {title, url, urlToImage, description} = newsData;
    // const basicImgUrl = 'https://parlament.ua/wp-content/uploads/2021/02/news-1.jpg';

    const wrapper = document.createElement('div');
    wrapper.classList.add('col', 's12');
    const card = `
        <div class="card">
            <div class="card-image">
                <img src="${urlToImage || newsService.basicImg}" class="news-img">
                <span class="card-title">${title || ''}</span>
            </div>
            <div class="card-content">
                <p>${description || ''}</p>
            </div>
            <div class="card-action">
                <a href="${url}" target="_blank">Read more</a>
            </div>
        </div>
    `;
    wrapper.insertAdjacentHTML('beforeend', card)
    return wrapper;
}


//Interactive DOM manipulation

const searchForm = document.querySelector('#search-news');
const searchQuery = document.querySelector('#search-query');
const searchCountry = document.querySelector('#search-country');
const searchCategory = document.querySelector('#search-category');

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    preloader.add();
    if(searchQuery.value) {
        newsService.everything(searchQuery.value, onGetResponse)
    } else {
        newsService.categoryHeadlines(searchCountry.value, searchCategory.value, onGetResponse)
    }
    searchForm.reset();
})

function notification(mes, type = 'success') {
    M.toast({ html: mes, classes: type })
}

const preloader = {
    add() {
        document.body.insertAdjacentHTML('afterbegin', `
            <div class="progress mt-0 mb-2">
                <div class="indeterminate red lighten-3"></div>
            </div>
        `)
    },
    remove() {
        const loader = document.querySelector('.progress');
        if(loader) {
            loader.remove();
        }
    }
}

window.addEventListener('error', e => {
    console.log(e)
    if(e.target.classList.contains('news-img')) {
        e.target.src = newsService.basicImg;
    }
}, true)