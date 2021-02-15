import { one, all, laftelApi, htmlHeader, tabActive } from './modules/helper.js';

let themeItem = null;

function ThemesItemWrapper(item) {

  return `  
  <div>
    <a href="/laftel/pages/theme.html?id=${item.id}" class="theme-item-wrapper">
      <div class="gallery">
        <div class="images">
        ${item.img_url_list.map(img => `<img src=${img} />`).join('')}
        </div>
        <div class="blurred" style="background-image: url(${item.img_url_list[0]})"></div>
      </div>
      <div class="description">${item.title}</div>
    </a>
  </div>`;
}

function App() {
  return `
  ${htmlHeader()}
  <section class="themes">
    <h1>테마추천 전체 리스트</h1>
    <main class="themes-wrapper">
      ${themeItem.results.map(ThemesItemWrapper).join('')}
    </main>
  </section>`;
}

class Themes {
  static init() {
    laftelApi('https://laftel.net/api/recommends/v1/themes_summary/').then(this.refresh);
  }

  static refresh(item) {

    themeItem = item;

    document.getElementById('root').innerHTML = App();
    tabActive();
  }
}

Themes.init();
