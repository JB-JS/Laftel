// 전역 속성 설정
window.dd = window.console.log.bind(console);

// 모든 파일 프로토타입 함수 설정
Node.prototype.appends = function (nodeName, nodeText) {
  const el = document.createElement(`${nodeName}`);
  el.textContent = nodeText;
  this.append(el);
};

Element.prototype.addClass = function (className, ...args) {
  this.classList.add(className, ...args);

  return this;
};

Element.prototype.removeClass = function (className, ...args) {
  this.classList.remove(className, ...args);

  return this;
};

// 전역 함수 설정
export const one = (selector) => document.querySelector(selector);
export const laftelApi = (url, options = {}) => {

  if (options.headers) {
    const header = Object.assign(options.headers, { laftel: 'TeJava' });
    Object.assign(options, header);
  } else {
    Object.assign(options, { headers: { laftel: 'TeJava' } });
  }

  return fetch(url, options).then((res) => res.json());
}
  ;
export const zero = (n) => (n >= 10 ? n : `0${n}`);
export const all = (selector) => document.querySelectorAll(selector);

// 현재 페이지 에따라 내비게이션 하이라이팅
export const tabActive = () => {
  const page = location.pathname.split('laftel/pages/')[1];

  all('.header-nav__list > li').className = '';

  switch (page) {
    case 'daily.html':
      one('.header-nav__list > li:nth-child(2)').className = 'active';
      break;
    case 'themes.html':
      one('.header-nav__list > li:nth-child(3)').className = 'active';
      break;
    case 'membership.html':
      one('.header-nav__list > li:nth-child(4)').className = 'active';
      break;
  }
};

// 헤더부분 모든 파일에 추가
export const htmlHeader = () => {
  return `
    <!-- 헤더 블럭 -->
    <header class="header header-bg-white">
      <!-- 헤더 로고 블럭 -->
      <div class="header__logo">
      <a href="/laftel">
      <svg width="66" height="17" viewBox="0 0 66 17">
      <g fill="#282A35" fill-rule="evenodd">
      <path
      d="M4.911 16.884h2.446c.87 0 1.574-.707 1.574-1.579V15c0-.871-.704-1.578-1.574-1.578H4.911a1.465 1.465 0 0 1-1.458-1.463V2.185c0-.871-.705-1.578-1.575-1.578h-.304C.705.607 0 1.314 0 2.185v9.774c0 2.709 2.21 4.925 4.911 4.925M35.298 4.07h1.66v11.236c0 .871.705 1.577 1.574 1.577h.305c.87 0 1.574-.706 1.574-1.578V4.07h1.66c.87 0 1.574-.707 1.574-1.579v-.305c0-.871-.705-1.578-1.574-1.578h-6.773c-.87 0-1.574.707-1.574 1.578v.305c0 .872.705 1.58 1.574 1.58M46.487 16.852c.103.02.21.032.318.032h6.345c.87 0 1.574-.707 1.574-1.579V15c0-.871-.705-1.578-1.574-1.578H48.683V10.49h3.473c.868 0 1.573-.706 1.573-1.578v-.306c0-.871-.705-1.578-1.574-1.578h-3.472V4.07H53.15c.87 0 1.574-.707 1.574-1.578v-.305c0-.872-.705-1.579-1.574-1.579H46.805c-.87 0-1.575.707-1.575 1.579v13.119c0 .763.54 1.4 1.257 1.547M14.397 5.576c0-.727.51-1.377 1.228-1.49.903-.14 1.69.566 1.69 1.446v3.606h-2.918V5.576zm-1.88 11.308h.305c.87 0 1.575-.707 1.575-1.579V12.6h2.918v2.705c0 .872.704 1.579 1.573 1.579h.305c.87 0 1.574-.707 1.574-1.579V5.532c0-2.842-2.433-5.142-5.313-4.909-2.567.208-4.51 2.427-4.51 5.01v9.672c0 .872.704 1.579 1.574 1.579zM28.12 4.07h2.445c.869 0 1.574-.708 1.574-1.58v-.305c0-.871-.705-1.578-1.574-1.578h-2.446c-2.7 0-4.91 2.216-4.91 4.925v9.773c0 .872.703 1.578 1.573 1.578h.304c.87 0 1.574-.706 1.574-1.578V10.92h3.905c.869 0 1.574-.707 1.574-1.579v-.304c0-.872-.705-1.579-1.574-1.579H26.66V5.532c0-.805.657-1.463 1.46-1.463M61.649 16.884h2.445c.87 0 1.574-.707 1.574-1.579V15c0-.871-.705-1.578-1.574-1.578h-2.445c-.803 0-1.46-.658-1.46-1.463V2.185c0-.871-.705-1.578-1.573-1.578h-.305c-.87 0-1.574.707-1.574 1.578v9.774c0 2.709 2.21 4.925 4.912 4.925"
      ></path>
      </g>
      </svg>
      </a>
      </div>

      <!-- 헤더 네비 블럭 -->
      <nav class="header-nav">
      <ul class="header-nav__list">
      <li><a href="/laftel/pages/search.html">태그검색</a></li>
      <li><a href="/laftel/pages/daily.html">요일별 신작</a></li>
      <li><a href="/laftel/pages/themes.html">테마추천</a></li>
      <li><a href="/laftel/pages/membership.html">멤버십</a></li>
      </ul>
      </nav>
      <!-- 헤더 인터페이스 영역 -->
      <div class="header-interface">
      <div class="header-interface__icon">
        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M16.552 10.315a6.214 6.214 0 0 1-1.819 4.412 6.142 6.142 0 0 1-4.414 1.843 6.142 6.142 0 0 1-4.414-1.843c-2.426-2.424-2.426-6.375 0-8.824a6.184 6.184 0 0 1 4.414-1.842c1.65 0 3.226.654 4.414 1.842a6.214 6.214 0 0 1 1.819 4.412m5.142 9.891l-4.754-4.751c2.547-3.273 2.256-8.073-.679-11.007C14.684 2.848 12.575 2 10.343 2a8.332 8.332 0 0 0-5.918 2.448C2.85 6 2 8.11 2 10.34s.873 4.34 2.45 5.916a8.312 8.312 0 0 0 5.893 2.424 8.444 8.444 0 0 0 5.142-1.746l4.73 4.752c.193.194.46.315.727.315.267 0 .533-.121.728-.315.436-.436.436-1.067.024-1.479"></path></svg>
      </div>
      <div class="header-interface__icon header-interface__icon-bell">
        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-width="0.45" d="M20.113 16.716c0-.625-.507-1.131-1.136-1.131a1.13 1.13 0 0 1-1.128-1.13V9.548a6.037 6.037 0 1 0-12.075 0v4.909c0 .623-.508 1.129-1.13 1.129-.626 0-1.135.507-1.135 1.131v.378h16.603v-.378m-4.905 1.888a3.396 3.396 0 1 1-6.792 0H3.51c-.834 0-1.51-.675-1.51-1.509v-.379c0-1.329.984-2.429 2.264-2.614V9.547A7.546 7.546 0 0 1 11.811 2a7.547 7.547 0 0 1 7.547 7.547v4.555a2.64 2.64 0 0 1 2.264 2.614v.38c0 .835-.676 1.508-1.51 1.508h-4.905zm-1.51 0H9.925a1.887 1.887 0 1 0 3.774 0z"></path></svg>
      </div>
      <div class="header__usermenu">
      <span class="header__username">jungbeomsu</span>
      <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: middle;"><g><path d="m12.3 13l7.7 7.7 7.7-7.7 2.3 2.4-10 10-10-10z"></path></g></svg></div>
      </div>
    </header>
      `;
};