import { htmlHeader, laftelApi, tabActive } from './modules/helper.js';

let infos = null;
let searchDatas = null;

function OptionList(name) {
  return (`
    <section class="search-option">
      <article class="option-title"></article>
      <div class="options">
          <div class="check-label">
            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 16 16" style="vertical-align: middle;"><path fill="#FFF" fill-rule="evenodd" stroke="currentColor" d="M2 .5A1.5 1.5 0 0 0 .5 2v12A1.5 1.5 0 0 0 2 15.5h12a1.5 1.5 0 0 0 1.5-1.5V2A1.5 1.5 0 0 0 14 .5H2z"></path></svg>
            <p>${name}</p>
          </div>
      </div>
    </section>
  `);
}

function SearchItem(data) {
  return (`
    <a class="Search__Card">
      <div class="thumbnail-wrapper">
        <img src="${data.img}" alt=""/>
        ${data.is_adult ? '<div class="adult">19</div>' : ''}
      </div>      
      <p class="Search__Card--title">${data.name}</p>
    </a>
  `);
}

function App() {

  dd(infos, Object.keys(infos));

  return `
  ${htmlHeader()}
  <div class="Search__Block" style="display: flex;">
    <aside>
      <section class="filter">
        <h1>필터</h1>
        <button>
          초기화
          <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 24 24" style="vertical-align: middle;"><path d="M6.25 11.667c0-3.76 3.118-6.817 6.95-6.817V5v-.15c3.832 0 6.95 3.057 6.95 6.817 0 3.76-3.118 6.816-6.95 6.816a.546.546 0 0 1-.55-.542c0-.3.247-.542.55-.542 3.227 0 5.85-2.572 5.85-5.732s-2.623-5.733-5.85-5.733c-3.226 0-5.85 2.572-5.85 5.733v1.049l1.462-1.434c.215-.21.561-.21.777 0a.538.538 0 0 1 0 .77l-2.4 2.352a.569.569 0 0 1-.595.118.539.539 0 0 1-.182-.118l-2.4-2.353a.538.538 0 0 1 0-.77c.215-.21.561-.21.776 0l1.462 1.435v-1.05z" fill-rule="nonzero"></path></svg>
        </button>  
      </section>
      <div class="filter-viewable">
        <div class="check-label">
          <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 16 16" style="vertical-align: middle;"><g fill="none" fill-rule="evenodd"><rect width="15" height="15" x=".5" y=".5" fill="#FFF" stroke="currentColor" rx="2"></rect><path fill="currentColor" fill-rule="nonzero" d="M6.335 11.807V12c-.23 0-.44-.088-.495-.222L3.18 8.75c-.266-.277-.226-.697.049-.984.273-.285.698-.24.986.059l2.123 2.453 5.48-6.062a.665.665 0 0 1 .98 0 .7.7 0 0 1 .005.98l-5.929 6.59a.745.745 0 0 1-.54.215v-.193z"></path></g></svg>
          <div>감상 가능한 작품만 보기</div>
        </div>
        <div class="check-label">
          <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 16 16" style="vertical-align: middle;"><path fill="#FFF" fill-rule="evenodd" stroke="currentColor" d="M2 .5A1.5 1.5 0 0 0 .5 2v12A1.5 1.5 0 0 0 2 15.5h12a1.5 1.5 0 0 0 1.5-1.5V2A1.5 1.5 0 0 0 14 .5H2z"></path></svg>
          <div>멤버십 포함된 작품만 보기</div>
        </div>            
      </div>      
      ${infos["genres"].map(OptionList).join('')}
    </aside>
    <main>
      <div class="Search__ResultHeader">
        <div class="result-count">총 <span class="count">${searchDatas.count.toLocaleString()}</span>개의 작품이 검색되었어요!</div>
        <div class="sort-menu">
          <div class="selected">
          라프텔 랭킹 순<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: middle;"><g><path d="m11.6 16.6h16.8l-8.4 8.4z"></path></g></svg>
          </div>          
          <ul class="sort-option">
            <li class="option">라프텔 랭킹 순</li>
            <li class="option">이름 순</li>
            <li class="option">최신 순</li>
            <li class="option">평가 많은 순</li>
            <li class="option">평점 높은 순</li>
          </ul>          
        </div>
      </div>
      <div class="Search__CardList" style="display:flex; flex-wrap: wrap;">
        ${searchDatas.results.map(SearchItem).join('')}
      </div>
    </main>
  </div>`;
}

class Search {
  static init() {
    const infos = laftelApi('https://laftel.net/api/v1.0/info/discover');
    const search = laftelApi('https://laftel.net/api/search/v1/discover/?sort=rank&viewable=true');

    Promise.all([infos, search]).then(this.render);
  }

  static render(datas) {
    [infos, searchDatas] = datas;
    document.getElementById('root').innerHTML = App();
    tabActive();
  }
}

Search.init();