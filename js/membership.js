import { htmlHeader, laftelApi, tabActive } from './modules/helper.js';

function MembershipContent(data) {
  const {
    name, description, price, purchase_info, product_type,
  } = data;

  return `
  <section class="Ticket__Block">
    <h2>${name}</h2>
    <p class="description">${description}</p>
    <div>
      <span class="price">${price.toLocaleString()}원</span>
      <button class="buy">구매하기</button>
    </div>
    <div>
      ${product_type === "period" ? '<a href="">멤버쉽으로 볼 수 있는 작품 확인하기</a>' : ''}
    </div>
    <hr />
    <h3>구매 안내</h3>
    <p class="purchase-info">${purchase_info}</p>
  </section>`;
}
// 멤버쉽 내용 함수형 컴포넌트
function App(datas) {

  return `
    ${htmlHeader()}
    <main id="main">
      ${datas.results.map(MembershipContent).join('')}
    </main>`;
}

class Membership {
  static init() {
    laftelApi('https://laftel.net/api/products/v1/list/?shop=web').then(this.refresh);
  }

  static refresh(datas) {

    document.getElementById('root').innerHTML = App(datas);
    tabActive();
  }
}

Membership.init();
