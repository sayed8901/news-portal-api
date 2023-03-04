const fetchCategories = () => {
  fetch('https://openapi.programming-hero.com/api/news/categories')
  .then(res => res.json())
  .then(data => showCategories(data))
};

// news category গুলোকে fetch করতে
const showCategories = data => {
  const newsCategory = data.data.news_category;
  // console.log(newsCategory);
  const categoriesContainer = document.getElementById('categories-container');
  for(const singleCategory of newsCategory){
    // console.log(singleCategory);
    // menu item গুলো loop করে নিয়ে তৈরি করতে
    // categoriesContainer.innerHTML += `<a class="nav-link" href="#">${singleCategory.category_name}</a>`;
    // or, 
    const linkContainer = document.createElement('p');
    linkContainer.innerHTML = `
      <a class="nav-link" href="#" 
      onclick="fetchCategoryNews('${singleCategory.category_id}', '${singleCategory.category_name}')">
      ${singleCategory.category_name}</a>
    `;
    categoriesContainer.appendChild(linkContainer);
  }
}

// category এর মধ্যকার news-গুলোকে fetch করতে
const fetchCategoryNews = (categoryId, categoryName) => {
  // console.log(categoryId);
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  console.log(url);
  fetch(url)
  .then(res => res.json())
  .then(data => showAllNews(data, categoryName))
}


const showAllNews = (categoryId, categoryName) => {
  const newsCount = categoryId.data.length
  // console.log(newsCount, categoryName);
  
  document.getElementById('news-count').innerText = `${newsCount}`;
  document.getElementById('category-name').innerText = `${categoryName}`;

  const newsContainer = document.getElementById('all-news');
  // console.log(categoryId.data);
  newsContainer.innerHTML = '';

  categoryId.data.forEach(singleNews => {
    // destructuring necessary data fields
    const {image_url, title, details, author, total_view} = singleNews;

    const newsCard = document.createElement('div');
    newsCard.classList.add('card', 'mb-3');
    newsCard.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">
            ${details.slice(0, 200)}...
            </p>
          </div>
          <div class="card-footer border-0 bg-body d-flex justify-content-between">
            <div class="d-flex gap-4">
              <img src="${author.img}" class="img-fluid rounded-circle" alt="..." width="40" height="40">
              <div>
                <p class="m-0 p-0">${author.name}</p>
                <p class="m-0 p-0">
                  ${author.published_date}
                </p>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <i class="fas fa-eye"></i>
              <p class="m-0 p-0">${total_view}</p>
            </div>
            <div>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half"></i>
            </div>
            <div>
            <i class="fas fa-arrow-right" onclick="showNewsDetail('${categoryId}')"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    newsContainer.appendChild(newsCard);
  });
}


const showNewsDetail = news_id => {
  url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url).then(res=>res.json()).then(data=>console.log(data.data))
}