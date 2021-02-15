import { all, htmlHeader, laftelApi, one, tabActive } from './modules/helper.js';

function ThemeCard(theme) {
  const { item: { avg_rating, genre_tag_list, id, img_url, name }, ment } = theme;
  return (`
      <div class="ThemeCard" to="item.html?item=${id}">
        <div class="ThemeCard__ImgWrapper">
          <a href="item.html?item=${id}">
            <img src="${img_url}" alt="" class="ThemeCard__Img" />
          </a>
        </div>              
        <div class="ThemeCard__info">
          <h2 class="ThemeCard__Title">${name}</h2>
          <ul class="ThemeCard__TagList">
            ${avg_rating && `
              <li class="ThemeCard__Avg">
                <img src="https://asset.laftel.net/static/media/ic_star_full_periwinkle.48f3b9f3.svg" alt="star-icon">
                평점 ${avg_rating.toFixed(1)}
              </li>
            `}
            ${genre_tag_list.map((tag) => `<li><a>${tag}</a></li>`).join('')}
          </ul>        
          <p class="ThemeCard__Content">${ment}</p>
          <div class="ThemeCard__PlaybackBtn">
            <button>
              <img
                src="https://asset.laftel.net/static/media/ic_play_white.27dd3bcc.svg"
                alt="play"
              />
                  지금 재생
                </button>
          </div>
        </div>        
      </div>
  `);
}

function App(themes) {
  return (`
    ${htmlHeader()}
    <main class="ThemeBlock">
      <section class="ThemeHead">
        <h1>${themes.title}</h1>
        <p>${themes.content}</p>
      </section>
      <section class="ThemeCards">${themes.theme_item_list.map(ThemeCard).join('')}</section>
    </main>
  `);
}

class Theme {
  static init() {

    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const themes = laftelApi(`https://laftel.net/api/recommends/v1/themes/${id}`);

    themes.then(this.render);
  }

  static handle() {
    all('.ThemeCard').forEach(el => {
      el.addEventListener('click', function () {
        location.href = this.getAttribute('to');
      });
    });
  }

  static render(themes) {
    dd(themes);


    document.getElementById('root').innerHTML = App(themes);

    Theme.handle();
    tabActive();
  }
}

Theme.init();