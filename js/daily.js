import { one, all, laftelApi, htmlHeader, tabActive } from './modules/helper.js';

// 요일들 배열모습
const WEEK = [[], [], [], [], [], [], []];

// 요일 1개의 배열 컴포넌트 반환
function Day(el) {
  const {
    genres, id, img, name, latest_episode_created,
  } = el;

  // eslint-disable-next-line max-len
  const nowTime = new Date().getTime();
  // 업데이트 후 26시간
  const isUpdated = nowTime - 93600000 <= new Date(latest_episode_created).getTime() && new Date(latest_episode_created).getTime() <= new Date().getTime();
  const genre = genres.length > 1 ? genres.slice(0, 2).join(' / ') : genres.join('');

  return `
  <a href="item.html?item=${id}" class="days-content__item">
    <img src="${img}?w=200&webp=0" alt="${`${img}-${name}`}" />
    <h3 class="days-content__title">${name}</h3>
    <p class="genres">${genre}</p>
        ${isUpdated ? '<div class="updated">UP</div>' : ''}
  </a>`;
}

// 7개의 요일이 모인 배열
function Days(datas) {
  return `<div class="days-content__items">${datas.map(Day).join('')}</div>`;
}

function App(notice) {
  return `
  ${htmlHeader()}
  <main class="main">
    <div class="rap">
      ${notice && notice.results.length ?
      `<!-- 업로드 지연 알림 블럭 -->
      <section class="UploadDelayNotice__Block">
        <h3>업로드 지연 안내</h3>        
        <ul class="UploadDelayNotice__List">
          ${notice.results.map((info) => `<li class="UploadeDelayNotice__item">${info.description}</li>`).join('')}
        </ul>
      </section>` : ''}

      <!-- 요일 리스트 블럭 -->
      <div class="daily-list">
        <div class="days-list">
          <div class="days-list__rap">
            <div class="days-list__day">월</div>
          </div>
          <div class="days-list__rap">
            <div class="days-list__day">화</div>
          </div>
          <div class="days-list__rap">
            <div class="days-list__day">수</div>
          </div>
          <div class="days-list__rap">
            <div class="days-list__day">목</div>
          </div>
          <div class="days-list__rap">
            <div class="days-list__day">금</div>
          </div>
          <div class="days-list__rap">
            <div class="days-list__day">토</div>
          </div>
          <div class="days-list__rap">
            <div class="days-list__day">일</div>
          </div>
        </div>
        <div class="days-content">
          ${WEEK.map(Days).join('')}
        </div>
      </div>
    </div>
  </main>`;
}

class Daily {

  static init() {
    const dailyData = laftelApi('https://www.laftel.net/api/search/v2/daily/');
    const notice = laftelApi('https://laftel.net/api/v1.0/lists/schedule_notice/');

    Promise.all([dailyData, notice]).then(this.addDaily);
  }

  static addDaily(datas) {
    const nthNum = [7, 1, 2, 3, 4, 5, 6];
    const todayNum = nthNum[new Date().getDay()];
    const day = {
      월요일: 0,
      화요일: 1,
      수요일: 2,
      목요일: 3,
      금요일: 4,
      토요일: 5,
      일요일: 6,
    };

    datas[0].forEach((el) => {
      WEEK[day[el.distributed_air_time]].push(el);
    });

    document.getElementById('app').innerHTML = App(datas[1]);

    tabActive();

    one(`.days-list > .days-list__rap:nth-child(${todayNum}) .days-list__day`).addClass('today');
    one(`.days-content > .days-content__items:nth-child(${todayNum})`).addClass('today-list');

  }
}

Daily.init();
