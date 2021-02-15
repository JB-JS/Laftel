import { one, all, laftelApi, htmlHeader, tabActive } from './modules/helper.js';

let slideItems = null;
let recommendItems = null;

function SlideItem(item) {
  return `
    <div class="slide-item" style="
        background-image: linear-gradient(
      90deg,
      rgba(18, 18, 18, 0.5) 0%,
      rgba(18, 18, 18, 0) 50%
    ),
    linear-gradient(rgba(18, 18, 18, 0.5) 0%, rgba(18, 18, 18, 0) 21.11%),
    linear-gradient(rgba(18, 18, 18, 0) 50%, rgba(18, 18, 18, 0.5) 100%),
    linear-gradient(-90deg, rgba(18, 18, 18, 0.5) 0%, rgba(18, 18, 18, 0) 20%),
    url(${item.web_img});
    ">
      <div class="SlideContent__Block">
        <img src=${item.logo_img} alt="" />
        <p>${item.content}</p>
        <button>
          <span>${item.button_text}</span>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" class="CarouselContent__StyledArrowRight-sc-1n7m5kr-6 pBuIm"><path d="M10.6048 36.0619C11.4113 36.8684 12.7187 36.8684 13.5252 36.0619L28.1268 21.4602C28.9333 20.6538 28.9333 19.3463 28.1268 18.5399L13.5252 3.93824C12.7187 3.1318 11.4113 3.13181 10.6048 3.93824C9.7984 4.74467 9.79839 6.05213 10.6048 6.85857L23.7463 20.0001L10.6048 33.1416C9.79839 33.948 9.79839 35.2555 10.6048 36.0619Z" fill="white"></path></svg>
        </button>
      </div>
    </div>`;
}

function RecommendItem(item) {
  dd();
  return `
  <div class="RecommendItem__Wrapper">
        <a href="" class="RecommendItem__LinkBlock">
      <div class="RecommendItem__ThumbnailBlock">
        <img src="${item.images[0]['img_url']}" />
      </div>
      <h4>
        ${item.name}
      </h4>
    </a>
  </div>`;
}

function RecommendList(item) {

  return `
  <div class="Container__Block">
    <div class="RecommendList">
      <h1>${item.name}</h1>
      <div class="RecommendList__ScrollBlock">
        ${item.item_list.map(RecommendItem).join('')}
      </div>
    </div>
  </div<`;
}

function SlideBtn(el, ix) {
  return `<li data-index=${ix + 1}>
            <button></button>
          </li>`;
}

function App() {
  return `
    ${htmlHeader()}
    <div class="Home__BLock">
      <div class="Slide__Block">
        <div class="prev">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            class="Arrow__StyledArrowLeft-txuhwz-1 fdMbpe"
          >
            <path
              d="M28.761 3.30405C27.9546 2.49761 26.6471 2.49761 25.8407 3.30405L11.239 17.9057C10.4326 18.7121 10.4326 20.0196 11.239 20.8261L25.8407 35.4277C26.6471 36.2342 27.9546 36.2342 28.761 35.4277C29.5674 34.6213 29.5675 33.3138 28.761 32.5074L15.6195 19.3659L28.761 6.22438C29.5675 5.41794 29.5675 4.11049 28.761 3.30405Z"
              fill="white"
            ></path>
          </svg>
        </div>
        <div class="slide-list">${slideItems.map(SlideItem).join('')}</div>
        <div class="next">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            class="Arrow__StyledArrowRight-txuhwz-2 cZrmYq"
          >
            <path
              d="M10.6048 36.0619C11.4113 36.8684 12.7187 36.8684 13.5252 36.0619L28.1268 21.4602C28.9333 20.6538 28.9333 19.3463 28.1268 18.5399L13.5252 3.93824C12.7187 3.1318 11.4113 3.13181 10.6048 3.93824C9.7984 4.74467 9.79839 6.05213 10.6048 6.85857L23.7463 20.0001L10.6048 33.1416C9.79839 33.948 9.79839 35.2555 10.6048 36.0619Z"
              fill="white"
            ></path>
          </svg>
        </div>
        <div class="SlideBtn">
          <ul class="SlideBtn__list">            
            ${slideItems.map(SlideBtn).join('')}
          </ul>
        </div>
      </div>      
        ${recommendItems.map(RecommendList).join('')}
      
    </div>
    <footer>
      <div class="Footer__Top">
        <svg width="66" height="17" viewBox="0 0 66 17"><g fill="white" fill-rule="evenodd"><path d="M4.911 16.884h2.446c.87 0 1.574-.707 1.574-1.579V15c0-.871-.704-1.578-1.574-1.578H4.911a1.465 1.465 0 0 1-1.458-1.463V2.185c0-.871-.705-1.578-1.575-1.578h-.304C.705.607 0 1.314 0 2.185v9.774c0 2.709 2.21 4.925 4.911 4.925M35.298 4.07h1.66v11.236c0 .871.705 1.577 1.574 1.577h.305c.87 0 1.574-.706 1.574-1.578V4.07h1.66c.87 0 1.574-.707 1.574-1.579v-.305c0-.871-.705-1.578-1.574-1.578h-6.773c-.87 0-1.574.707-1.574 1.578v.305c0 .872.705 1.58 1.574 1.58M46.487 16.852c.103.02.21.032.318.032h6.345c.87 0 1.574-.707 1.574-1.579V15c0-.871-.705-1.578-1.574-1.578H48.683V10.49h3.473c.868 0 1.573-.706 1.573-1.578v-.306c0-.871-.705-1.578-1.574-1.578h-3.472V4.07H53.15c.87 0 1.574-.707 1.574-1.578v-.305c0-.872-.705-1.579-1.574-1.579H46.805c-.87 0-1.575.707-1.575 1.579v13.119c0 .763.54 1.4 1.257 1.547M14.397 5.576c0-.727.51-1.377 1.228-1.49.903-.14 1.69.566 1.69 1.446v3.606h-2.918V5.576zm-1.88 11.308h.305c.87 0 1.575-.707 1.575-1.579V12.6h2.918v2.705c0 .872.704 1.579 1.573 1.579h.305c.87 0 1.574-.707 1.574-1.579V5.532c0-2.842-2.433-5.142-5.313-4.909-2.567.208-4.51 2.427-4.51 5.01v9.672c0 .872.704 1.579 1.574 1.579zM28.12 4.07h2.445c.869 0 1.574-.708 1.574-1.58v-.305c0-.871-.705-1.578-1.574-1.578h-2.446c-2.7 0-4.91 2.216-4.91 4.925v9.773c0 .872.703 1.578 1.573 1.578h.304c.87 0 1.574-.706 1.574-1.578V10.92h3.905c.869 0 1.574-.707 1.574-1.579v-.304c0-.872-.705-1.579-1.574-1.579H26.66V5.532c0-.805.657-1.463 1.46-1.463M61.649 16.884h2.445c.87 0 1.574-.707 1.574-1.579V15c0-.871-.705-1.578-1.574-1.578h-2.445c-.803 0-1.46-.658-1.46-1.463V2.185c0-.871-.705-1.578-1.573-1.578h-.305c-.87 0-1.574.707-1.574 1.578v9.774c0 2.709 2.21 4.925 4.912 4.925"></path></g></svg>
        <nav>
          <ul>
            <li><a href="">회사소개</a></li>
            <li><a href="">고객센터</a></li>
            <li><a href="">이용약관</a></li>
            <li><a href="">개인정보 처리방침</a></li>
          </ul>
        </nav>
        <div class="Footer__SocialButton">
          <a href="">
          <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: middle;"><g><path d="m29.4 0.3v5.9h-3.5q-1.9 0-2.6 0.8t-0.7 2.4v4.2h6.6l-0.9 6.6h-5.7v16.9h-6.8v-16.9h-5.7v-6.6h5.7v-4.9q0-4.1 2.3-6.4t6.2-2.3q3.3 0 5.1 0.3z"></path></g></svg>
          </a >
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: middle;"><g><path d="m37.7 9.1q-1.5 2.2-3.7 3.7 0.1 0.3 0.1 1 0 2.9-0.9 5.8t-2.6 5.5-4.1 4.7-5.7 3.3-7.2 1.2q-6.1 0-11.1-3.3 0.8 0.1 1.7 0.1 5 0 9-3-2.4-0.1-4.2-1.5t-2.6-3.5q0.8 0.1 1.4 0.1 1 0 1.9-0.3-2.5-0.5-4.1-2.5t-1.7-4.6v0q1.5 0.8 3.3 0.9-1.5-1-2.4-2.6t-0.8-3.4q0-2 0.9-3.7 2.7 3.4 6.6 5.4t8.3 2.2q-0.2-0.9-0.2-1.7 0-3 2.1-5.1t5.1-2.1q3.2 0 5.3 2.3 2.4-0.5 4.6-1.7-0.8 2.5-3.2 3.9 2.1-0.2 4.2-1.1z"></path></g></svg>
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: middle;"><g><path d="m28.6 20q0-0.8-0.7-1.2l-11.4-7.1q-0.7-0.5-1.5-0.1-0.7 0.4-0.7 1.3v14.2q0 0.9 0.7 1.3 0.4 0.2 0.7 0.2 0.5 0 0.8-0.3l11.4-7.1q0.7-0.4 0.7-1.2z m11.4 0q0 2.1 0 3.3t-0.2 3.1-0.5 3.3q-0.4 1.6-1.6 2.7t-2.7 1.3q-5 0.6-15 0.6t-15-0.6q-1.6-0.2-2.8-1.3t-1.5-2.7q-0.3-1.5-0.5-3.3t-0.2-3.1 0-3.3 0-3.3 0.2-3.1 0.5-3.3q0.4-1.6 1.6-2.7t2.7-1.3q5-0.6 15-0.6t15 0.6q1.6 0.2 2.8 1.3t1.5 2.7q0.3 1.5 0.5 3.3t0.2 3.1 0 3.3z"></path></g></svg>
          </a>
        </div>        
      </div>
      <div class="Footer__DescriptionHeader">
        <div class="toggle">
          <h1>리디(주) 사업자 정보</h1>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.363 6.363a1.239 1.239 0 000 1.752l8.76 8.761a1.239 1.239 0 001.753 0l8.761-8.76a1.239 1.239 0 10-1.752-1.753L12 14.248 4.115 6.363a1.239 1.239 0 00-1.752 0z" fill="currentColor"></path></svg>
        </div>
      </div>
      <div class="Footer__Description">
        <p>상호: 리디 주식회사 / 대표: 배기식</p>
        <p>주소: 서울시 강남구 역삼동 702-28 어반벤치빌딩 10층 (테헤란로 325)</p>
        <p>사업자등록번호 : 120-87-27435 / 통신판매번호 : 제 2009-서울강남 35-02139호</p>
        <p>이메일 : contact@laftel.net / 대표전화 : 1644-0331</p>
      </div>  
    </footer>
  `;
}

class Home {
  static slideNum = 1;

  static init() {
    const carousels = laftelApi('https://laftel.net/api/carousels/v1/list/');
    const recommend = laftelApi('https://laftel.net/api/home/v2/recommend/5/', { method: "POST" });

    Promise.all([carousels, recommend]).then(this.refresh);
  }

  // 이벤트 핸들러 설정
  static handle() {

    window.addEventListener('scroll', Home.headerScroll);


    /*     all('.SlideContent__Block button').forEach((el, ix) => {
          el.addEventListener('click', function () {
            location.href = `pages/item.html?item=${slideItems[ix].item_destination}`;
          });
        }); */
    one('.SlideBtn__list').addEventListener('click', (e) => {
      e.target.nodeName === 'LI' && Home.slideBtnMove(e);
    });
    one('.Slide__Block .next svg').addEventListener('click', Home.next);
    one('.Slide__Block .prev svg').addEventListener('click', Home.prev);
  }

  static headerScroll(e) {

    if (window.scrollY && !one('.header').classList.contains('move')) {
      one('.header').classList.remove('static');
      one('.header').addClass('move');
    } else if (window.scrollY === 0) {
      one('.header').classList.remove('move');
      one('.header').classList.add('static');
    }
  }

  static slideBtnMove(e) {
    one(`.slide-item:nth-child(${Home.slideNum})`).removeClass('slide-active');
    one(`.SlideBtn__list > li:nth-child(${Home.slideNum})`).removeClass('active');

    Home.slideNum = +e.target.dataset.index;

    one(`.SlideBtn__list > li:nth-child(${Home.slideNum})`).addClass('active');
    one(`.slide-item:nth-child(${Home.slideNum})`).addClass('slide-active');
    clearInterval(Home.slideTime);
    Home.slideTime = setInterval(Home.next, 7000);
  }

  static next() {
    one(`.SlideBtn__list > li:nth-child(${Home.slideNum})`).removeClass('active');
    one(`.slide-item:nth-child(${Home.slideNum})`).removeClass('slide-active');

    Home.slideNum += 1;
    Home.slideNum = Home.slideNum > slideItems.length ? 1 : Home.slideNum;

    one(`.SlideBtn__list > li:nth-child(${Home.slideNum})`).addClass('active');
    one(`.slide-item:nth-child(${Home.slideNum})`).addClass('slide-active');
    clearInterval(Home.slideTime);
    Home.slideTime = setInterval(Home.next, 7000);

  }

  static prev() {

    one(`.SlideBtn__list > li:nth-child(${Home.slideNum})`).removeClass('active');
    one(`.slide-item:nth-child(${Home.slideNum})`).removeClass('slide-active');

    Home.slideNum -= 1;
    Home.slideNum = Home.slideNum === 0 ? slideItems.length : Home.slideNum;

    one(`.SlideBtn__list > li:nth-child(${Home.slideNum})`).addClass('active');
    one(`.slide-item:nth-child(${Home.slideNum})`).addClass('slide-active');
    clearInterval(Home.slideTime);
    Home.slideTime = setInterval(Home.next, 7000);
  }

  static refresh(datas) {
    slideItems = datas[0];
    recommendItems = datas[1];

    one('#root').innerHTML = App();
    tabActive();
    Home.handle();

    one('.header').removeClass('header-bg-white').addClass('static');
    one('.slide-item:first-child').addClass('slide-active');
    one('.SlideBtn__list > li:first-child').addClass('active');

    Home.slideTime = setInterval(Home.next, 7000);

    dd(slideItems);
    dd(datas[1]);
  }
}

Home.init();