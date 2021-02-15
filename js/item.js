import {
  one, all, laftelApi, zero, htmlHeader, tabActive
} from './modules/helper.js';

// 아이템 헤드 이미지
function ItemHeadImg(src) {
  return `
          <img src=${src} />
          <div class="detail-head__thumbnailbtn">
              <button>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <defs>
                    <path
                      id="heart-outline-a"
                      d="M14.45 15.14c1.55-1.533 2.24-2.215 3.1-3.063a2.798 2.798 0 0 0 0-4.019c-1.144-1.128-3.043-1.128-4.19.005L11.792 9.59l-.838-.828-.741-.732c-.503-.52-1.33-.84-2.059-.83-.798 0-1.55.3-2.107.849-1.131 1.116-1.13 2.898.02 4.04 1.144 1.184 2.1 2.132 4.05 4.036l.081.079c.758.74 1.191 1.163 1.595 1.56a3367.5 3367.5 0 0 0 2.657-2.625zM8.14 6c.976-.012 2.15.385 2.936 1.196l.722.713.723-.705c1.61-1.589 4.26-1.589 5.87 0a3.998 3.998 0 0 1 0 5.728c-2.06 2.033-4.116 4.072-6.177 6.105a.624.624 0 0 1-.84 0c-2.057-2.036-4.082-3.953-6.17-6.114a4.006 4.006 0 0 1 0-5.727A4.172 4.172 0 0 1 8.14 6z"
                    ></path>
                  </defs>
                  <g fill="none" fill-rule="evenodd">
                    <mask id="heart-outline-b" fill="#fff">
                      <use xlink:href="#heart-outline-a"></use>
                    </mask>
                    <use
                      fill="#D4D4D4"
                      fill-rule="nonzero"
                      xlink:href="#heart-outline-a"
                    ></use>
                    <g mask="url(#heart-outline-b)">
                      <path d="M0 0h24v24H0z"></path>
                    </g>
                  </g>
                </svg>
                보고싶다
              </button>
              <button>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#D4D4D4"
                    fill-rule="nonzero"
                    d="M12.142 6.85a.145.145 0 0 0-.032-.05l-.17-.159-4.588 4.281a.455.455 0 0 0-.152.325v6.455c0 .256.257.498.61.498h7.186c.26 0 .483-.138.57-.326l2.405-5.25a.341.341 0 0 0 .029-.136v-1.24c0 .016-.02-.003-.076-.003h-6.747l.958-4.315.007-.08zm5.782 3.195c.704 0 1.276.54 1.276 1.202v1.241c0 .214-.046.432-.136.63l-2.406 5.256c-.29.624-.943 1.026-1.662 1.026H7.81C6.81 19.4 6 18.639 6 17.702v-6.455c0-.45.195-.888.536-1.204L11.94 5l.988.922c.27.267.418.602.418.945l-.023.248-.384 1.73-.058.26-.208.94h5.251z"
                  ></path>
                </svg>
                명작추천
              </button>
            </div>`;
}

// 헤드 아이템 정보 컴포넌트
function ItemHeadInfo(props, recentVideo) {
  const ending = props.is_ending ? '완결' : '방영중';
  let data = '';

  if (props.resolution) {
    data += `<li>${props.resolution}</li>`;
    data += '<li class="separator"></li>';
  }

  return `
  <ul class="detail-head__subinfo">
      <li>${props.animation_info.medium}</li>
    <li class="separator"></li>
    ${props.data || ''}
    <li>${props.content_rating}</li>
    <li class="separator"></li>
    <li>${ending}</li>
  </ul>
  <h1 class="detail-head__title">${props.name}</h1>
  <ul class="detail-head__genres">${props.genres.slice(0, 2).join(' / ')}</ul>
  <p>평균 <span class="detail-head__avg">${props.avg_rating.toFixed(1)}</span></p>
  <button class="detail-head__btn">
    <span class="currentWatch">${recentVideo.playback_info.episode_num}</span>화 이어보기
  </button>`;
}

// 선택한 애니 아이템의 에피소드 아이템 HTML 반환 Component Function
function EpisodeItem(props) {
  const date = new Date(props.published_datetime);

  return `
  <li class="detail-list__video--wrapper">
    <a href="#" class="Episode__item">
      <div class="detail-list__video--thumbnail">
        <img src="${props.thumbnail_path}" alt="" />
        <div class="playBtn">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M42.4662 25.5753C44.3329 26.653 44.3329 29.3473 42.4662 30.425L22.8662 41.7411C20.9995 42.8188 18.6662 41.4716 18.6662 39.3162L18.6662 16.6841C18.6662 14.5286 20.9995 13.1815 22.8662 14.2592L42.4662 25.5753Z" fill="currentColor"></path></svg>
        </div>
      </div>
      <div class="detail-list__video--info">
        <h2 class="detail-list__video--subject">${`${props.episode_num}화 ${props.subject}`}</h2>
        <p class="date">${`${date.getFullYear()}.${zero(date.getMonth() + 1)}.${zero(date.getDate())}`}</p>
      </div>
    </a>
  </li>`;
}

// 비슷한 작품 요소의 Component FUnction
function RelatedItem(props) {
  return `
  <div class="similer__item">
    <a href="./item.html?item=${props.meta_info.item}" class="similer__item--img">
      <img src=${props.img} alt="" />
      <div class="viewable">
        <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: middle;"><g><path d="m13.4 8.4l18.2 11.6-18.2 11.6v-23.2z"></path></g></svg>
      </div>
    </a>
    <a class="similer__item--title">${props.name}</a>
    <p class="medium">${props.animation_info.medium}</p>
  </div>`;
}

// 시리즈 작품 요소들의 함수형 컴포넌트
function SeriesItem(props) {
  return `
  <div class="similer__item">
    <a href="./item.html?item=${props.meta_info.item}" class="similer__item--img">
      <img src=${props.img} alt="" />
      <div class="viewable">
        <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: middle;"><g><path d="m13.4 8.4l18.2 11.6-18.2 11.6v-23.2z"></path></g></svg>
      </div>
    </a>
    <a class="similer__item--title">${props.name}</a>
    <p class="medium">${props.animation_info.medium}</p>
  </div>`;
}

// 제작정보 내용 컴포넌트
function ProductionContent(props) {
  let scenarioWriter = '';
  let productionName = '';

  // 순수 자바스크립트로 동적 렌더링 구현
  if (props.scenario_writer.length) { scenarioWriter += `<li><b>각본</b> : ${props.scenario_writer[0].name}</li>`; }

  if (props.production) { productionName += `<li><b>제작</b> : ${props.production.name}</li>`; }

  return `
    ${productionName}
    ${scenarioWriter || ''}
    ${props.illustrators.length ? `<li><b>그림</b> : ${props.illustrators}</li>` : ''}
    <li><b>출시</b> : ${props.air_year_quarter}</li>`;
}

// 앱 컴포넌트
function App(item, related, episode, series, themes, userInfo, recentVideo) {
  const {
    animation_info: {
      air_year_quarter, scenario_writer, production,
    },
    illustrators
  } = item;

  let seriesHtml = '';

  if (series.results.length) {
    seriesHtml += `
          <section class="ItemSeries block">
            <h2>시리즈 작품</h2>            
            <div class="ItemSeries__Content">
              ${series.results.map(SeriesItem).join('')}
            </div>
          </section>`;
  }
  return `
      <!-- 헤더 블럭 -->
    ${htmlHeader()}
        <!-- 아이템 head 영역 -->
    <div class="detail">
      <section class="detail-head">
        <div class="detail-rap">
          <div class="detail-head__img">${ItemHeadImg(item.img)}</div>
          <div class="detail-head__info">${ItemHeadInfo(item, recentVideo)}</div>
        </div>
      </section>

      <div class="detail-rap detail-content">
        <!-- 메인 내용 영역 -->
        <main>
          <section class="detail-list block">
            <ul class="detail-list__tabmenu">
              <li class="active">에피소드 (${episode.count})</li>
              <li>리뷰 (${item.meta_info.cnt_short_review.toLocaleString()})</li>
            </ul>
            <div class="detail-list__sort">
              <span>첫화부터</span><span>최신화부터</span>
            </div>
            <ul class="detail-list__video">
              ${episode.results.map(EpisodeItem).join('')}
            </ul>
          </section>
          ${seriesHtml}
          <section class="similer block">
            <h2 class="similer__title">비슷한 작품</h2>
            <div class="similer__items">
              ${related.results.map(RelatedItem).join('')}
            </div>
          </section>
        </main>
        <!-- 사이드바 내용 -->
        <aside>
          <div class="membership block">
            <div class="membership__addWidget">
              <div class="label">AD</div>
              <p>영상 속 광고를 보며 무료로 감상할 수 있어요.</p>
            </div>
            <button>
              <div>
                최애 애니 <span class="highlight">광고없이</span> <br />
                무제한으로 감상하려면?
              </div>
              <div>
                멤버십 시작
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.3629 21.6371C6.84676 22.121 7.63123 22.121 8.1151 21.6371L16.8761 12.8761C17.36 12.3922 17.36 11.6078 16.8761 11.1239L8.1151 2.36289C7.63123 1.87903 6.84675 1.87904 6.3629 2.36289C5.87904 2.84675 5.87903 3.63123 6.3629 4.1151L14.2478 12L6.3629 19.8849C5.87903 20.3688 5.87903 21.1532 6.3629 21.6371Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
          <div class="shop block">
            <h4>에피소드 구매</h4>
            <button>구매하기</button>
            <p>
              에피소드를 개별 구매 하실 수 있어요, 소장한 작품은 판권이
              만료되어도 감상할 수 있습니다.
            </p>
          </div>
          <div class="content block">
            <h4>줄거리</h4>
            <p>${item.content}</p>
            <button>더보기</button>
          </div>
          <div class="production-info block">
            <h4>제작정보</h4>
            <ul class="production-info__list">
              ${ProductionContent({ production, illustrators, air_year_quarter, scenario_writer, })}
            </ul>
          </div>
          ${item.awards.length ? `
            <div class="AwardHistory__Block block">
              <h4>수상 이력</h4>
              <ul class="AwardHistory__List">                
                ${item.awards.map((award) => `<li class="AwardHistory__Item">${award}</li>`).join('')}
              </ul>
            </div>
         ` : ''}
          <div class="tags block">
            <h4>태그</h4>
            <ul>${item.tags.map(tag => `<li><a href="#">#${tag}</a></li>`).join('')}</ul>
          </div>
          <div class="RelatedTheme__Block block">
            <div class="ReatledTheme__Head">
              <h4>관련 테마</h4>
              <div class="RelatedTheme__Btn">
                <button>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M16.8761 2.3629C16.3923 1.87903 15.6078 1.87903 15.1239 2.3629L6.36291 11.1239C5.87906 11.6078 5.87905 12.3922 6.36291 12.8761L15.1239 21.6371C15.6078 22.121 16.3923 22.121 16.8761 21.6371C17.36 21.1532 17.36 20.3688 16.8761 19.8849L8.99121 12L16.8761 4.1151C17.36 3.63123 17.36 2.84676 16.8761 2.3629Z" fill="currentColor"></path></svg>
                </button>
                <button>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M16.8761 2.3629C16.3923 1.87903 15.6078 1.87903 15.1239 2.3629L6.36291 11.1239C5.87906 11.6078 5.87905 12.3922 6.36291 12.8761L15.1239 21.6371C15.6078 22.121 16.3923 22.121 16.8761 21.6371C17.36 21.1532 17.36 20.3688 16.8761 19.8849L8.99121 12L16.8761 4.1151C17.36 3.63123 17.36 2.84676 16.8761 2.3629Z" fill="currentColor"></path></svg>
                </button>    
              </div>
            </div>
            ${themes.length ? themes.map((theme) => `
              <a class="RelatedTheme__ThumbnailWrapper">
                <img src="${theme.thumbnails[0]}" alt=""/>
                <p>${theme.content}</p>
              </a>`).join('') : ''}
          </div>         
        </aside>
      </div>
  `;
}


class Detail {
  static init() {
    /* laftel API
    비디오 가져오기
    get api/items/v1/:id
    get api/episodes/v2/list/:item_id
    */
    const params = new URLSearchParams(window.location.search);
    const item = params.get('item');
    const laftelAddress = 'https://www.laftel.net/api';
    const itemData = laftelApi(`${laftelAddress}/items/v1/${item}/`);
    const related = laftelApi(`${laftelAddress}/items/v1/${item}/related/?limit=1000`);
    const episodes = laftelApi(`${laftelAddress}/episodes/v2/list/?item_id=${item}&sort=oldest&limit=20&show_playback_offset=true&offset=0`);
    const series = laftelApi(`${laftelAddress}/items/v1/${item}/series/?limit=1000`);
    const themes = laftelApi(`${laftelAddress}/v1.0/items/${item}/themes/`);
    const userInfo = laftelApi(`${laftelAddress}/v1.0/users/myinfo/`, { headers: { authorization: 'Token 0c2ba4418f590ef2d993307e055b67db6abbc34c' } });
    const recentVideo = laftelApi(`${laftelAddress}/episodes/v1/${item}/recent-video/`, { headers: { authorization: 'Token 0c2ba4418f590ef2d993307e055b67db6abbc34c' } });


    Promise.all([itemData, related, episodes, series, themes, userInfo, recentVideo]).then(this.render);
  }

  static render(datas) {
    dd(datas);
    document.getElementById('root').innerHTML = App(...datas);

    tabActive();
  }
}

Detail.init();
