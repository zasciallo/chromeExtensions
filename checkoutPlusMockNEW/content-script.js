console.log("Content script loaded v1.2");

// Enhanced button detection for any e-commerce store
let buttonSelectors = [
	".rebuy-cart__checkout-button",
	".cart__ctas #CartDrawer-Checkout",
	".cart__ctas [name=checkout]",
	"#cart-notification-form button[name=checkout]",
	"#UpcartPopup .styles_Footer__checkoutButton__",
	"#mu-checkout-button",
	"button[data-ocu-checkout='true']",
	"button[name='checkout']",
	"button.checkout.button",
	"input[name='checkout']",
	".boost-cart__checkout-cta",
	"a[href*=checkout]",
	".al_sidecart .bottom-0 button",
	"button.CartDrawer-checkoutButton",
	"div.rebuy-cart__flyout-actions button.rebuy-button",
];

let productHTML = `
<div role="row" class="_6zbcq51k _6zbcq51j _1fragem3c _1fragem2x _1fragemn2 _6zbcq51n _6zbcq512 _6zbcq51m">
  <div aria-hidden="true" class="_6zbcq520 _6zbcq51z _1fragem3c _1fragemp7" style="--_6zbcq54: 3.2rem;">
    <div
      class="_6zbcq523 _6zbcq522 _1fragemqf _1fragemqd _1fragemqh _1fragemqb _1fragemci _1fragemby _1fragemd2 _1fragembe _1fragem46 _6zbcq525 _6zbcq524 _1fragem2x _1fragemms">
    </div>
    <div
      class="_6zbcq523 _6zbcq522 _1fragemqf _1fragemqd _1fragemqh _1fragemqb _1fragemci _1fragemby _1fragemd2 _1fragembe _1fragem46 _6zbcq527 _6zbcq526 _1fragemn2">
    </div>
  </div>
  <div role="cell" class="_6zbcq52d _6zbcq52c _1fragem3c _1fragemp7 _6zbcq51w _6zbcq51t _1fragem8w _6zbcq51q">
    <div class="_1m6j2n34 _1m6j2n33 _1fragemn2 _1fragemuy _1fragemoc _1m6j2n3e _1m6j2n39 _1m6j2n35 _1fragemmd"
      style="--_1m6j2n30: 1;">
      <picture>
        <source media="(min-width: 0px)"
          srcset="https://cdn.shopify.com/s/files/1/0091/1386/2249/files/SavedByLogo2_64x64.png?v=1721235815 1x, https://cdn.shopify.com/s/files/1/0091/1386/2249/files/SavedByLogo2_128x128.png?v=1721235815 2x, https://cdn.shopify.com/s/files/1/0091/1386/2249/files/SavedByLogo2_256x256.png?v=1721235815 4x">
        <img src="https://cdn.shopify.com/s/files/1/0091/1386/2249/files/SavedByLogo2_64x64.png?v=1721235815"
          alt="SavedBy Package Protection Shipping Insurance" loading="eager"
          class="_1m6j2n3g _1fragemq1 _1fragem2x _1fragem32 _1m6j2n3m _1m6j2n3k _1fragemrg _1fragemrc _1fragemrk _1fragemr8 _1m6j2n3p _1m6j2n3n _1fragemcn _1fragemc3 _1fragemd7 _1fragembj _1m6j2n35 _1fragemmd">
      </picture>
      <div class="_1m6j2n3s _1m6j2n3r _1fragemms">
        <div
          class="_1m6j2n3u _1m6j2n3t _1fragemql _1fragemqr _1fragemr3 _1fragemqx _1fragemrg _1fragemrc _1fragemrk _1fragemr8 _1fragemj6 _1fragemhd _1fragem3c _1fragemns _1fragem87 _1m6j2n3v _1m6j2n3x _1m6j2n3p _1m6j2n3n _1fragemcn _1fragemc3 _1fragemd7 _1fragembj">
          <span class="_1m6j2n3z _1fragemtw">Quantity</span><span aria-hidden="true">1</span>
        </div>
      </div>
    </div>
  </div>
  <div role="cell"
    class="_6zbcq52d _6zbcq52c _1fragem3c _1fragemp7 _6zbcq51x _6zbcq51u _1fragem87 _6zbcq51r _6zbcq51p _1fragemny _6zbcq529 _6zbcq528 _1fragempa _16s97g741"
    style="--_16s97g73w: 6.4rem;">
    <div class="_1fragem32 _1fragemn2 dDm6x">
      <p class="_1tx8jg70 _1fragemn2 _1tx8jg7e _1tx8jg7d _1fragemph _1tx8jg717 _1tx8jg71f _1tx8jg71h">SavedBy Package
        Protection</p>
      <div class="_1ip0g651 _1ip0g650 _1fragemn2 _1fragem5z _1fragem7s _1fragem41">
        <p class="_1tx8jg70 _1fragemn2 _1tx8jg7c _1tx8jg7b _1fragempg _1tx8jg717 _1tx8jg71g _1tx8jg71h">$1.67</p>
        <ul class="_1ip0g651 _1ip0g650 _1fragemn2 _1fragem4g _1fragem69 _1fragem41"></ul>
      </div>
    </div>
  </div>
  <div role="cell" class="_6zbcq52d _6zbcq52c _1fragem3c _1fragemp7 _6zbcq51x _6zbcq51u _1fragem87 _6zbcq51q _6zbcq52a">
    <div class="_6zbcq52e _1fragemtw"><span class="_19gi7yt0 _19gi7yt16 _19gi7yt1e _19gi7yt1k _1fragem3h">1</span></div>
  </div>
  <div role="cell"
    class="_6zbcq52d _6zbcq52c _1fragem3c _1fragemp7 _6zbcq51x _6zbcq51u _1fragem87 _6zbcq51r _6zbcq51p _1fragemny">
    <div class="_197l2ofx _1fragemp7 _1fragemnu _1fragem3c _1fragemn2 Byb5s"><span translate="no"
        class="_19gi7yt0 _19gi7yt16 _19gi7yt1e _19gi7yt1k _1fragem3h notranslate">$1.67</span></div>
  </div>
</div>
`;

let checkoutWidgetHTML = `
<div class="Geu8c" style="">
  <div class="M4bqA Geu8c" style="">
    <div class="_1fragem32 _1fragemn2">
      <div>
        <div class="_1fragem32 _1fragemn2">
          <div class="_16s97g74v"></div>
          <div class="_1fragem32 _1fragemn2">
            <div
              class="_4jeq6k0 _1fragemn2 _1fragem50 _1fragem6t _1fragema _1fragemns _1fragem41 _1fragemnh _16s97g7f _16s97g7p _16s97g71j _16s97g71t"
              style="--_16s97g7a: minmax(auto, max-content); --_16s97g7k: minmax(0, 1fr); --_16s97g71e: minmax(auto, max-content); --_16s97g71o: minmax(0, 1fr);">
              <div>
                <div class="_1mmswk94 _1mmswk93 _1fragemn2 _1fragem3c">
                  <div class="_1mmswk96 _1mmswk95 _1fragemn2 _1fragempb"><input type="checkbox" id="DeprecatedCheckbox0"
                      class="_1mmswk98 _1mmswk97 _1fragemqg _1fragemqe _1fragemqi _1fragemqc _1fragemrg _1fragemrc _1fragemrk _1fragemr8 _1fragemci _1fragemby _1fragemd2 _1fragembe _1fragemp4 _1fragem32 _1fragemq1 _1fragem2x _1fragemub _1fragemu5 _1fragemui _1mmswk99 _1fragemov _1mmswk9c _1mmswk9a _1fragemuu">
                    <div
                      class="_1mmswk9m _1mmswk9l _1fragemov _1fragemtv _1fragemte _1fragemms _1fragemu5 _1fragemul _1fragemub">
                      <span
                        class="a8x1wu2 a8x1wu1 _1fragemq1 _1fragem2x _1fragemly _1fragemlo a8x1wu9 a8x1wui a8x1wum a8x1wuk _1fragem32 a8x1wup a8x1wuo a8x1wuw"><svg
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true"
                          class="a8x1wuy a8x1wux _1fragem32 _1fragemq1 _1fragemly _1fragemlo _1fragemp6">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="m1.5 7.097 3.596 3.602c.104.105.156.157.216.175a.25.25 0 0 0 .16-.004c.059-.022.108-.077.206-.188L12.5 3">
                          </path>
                        </svg></span></div>
                  </div>
                </div>
              </div><span
                class="_19gi7yt0 _19gi7yt4 _19gi7ytm _19gi7ytl _1fragempi _19gi7yt16 _19gi7yt1e _19gi7yt1k">SavedBy
                Package Protection</span><span
                class="_19gi7yt0 _19gi7yt4 _19gi7yti _19gi7yth _1fragempg _19gi7yt16 _19gi7yt1f _19gi7yt1k">$1.67</span>
              <div class="_197l2ofx _1fragemp7 _1fragemns _1fragem3c _1fragemn2"><button type="button"
                  class="_1m2hr9ge _1m2hr9gd _1fragemum _1fragemn2 _1fragemp4 _1fragemtz _1fragemuf _1fragemuh _1fragemu6 _1m2hr9g1h _1m2hr9g1e _1fragemuh _1fragemuf _1fragemu5 _1fragemtt _1m2hr9gi _1m2hr9gg _1fragem3m _1m2hr9g1w _1m2hr9g1a _1m2hr9g18 _1fragemq2 _1m2hr9g1j _1m2hr9g1i _1fragemu2"
                  aria-haspopup="dialog"><span
                    class="_1m2hr9gv _1m2hr9gu _1fragemtv _1fragemub _1fragemu5 _1fragemui _1m2hr9gr _1m2hr9gp _1fragem3c _1fragem87 _1fragemtx"><span
                      class="a8x1wu2 a8x1wu1 _1fragemq1 _1fragem2x _1fragemly _1fragemlo a8x1wu9 a8x1wui a8x1wum a8x1wuk _1fragem32 a8x1wur a8x1wuo a8x1wuw"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true"
                        class="a8x1wuy a8x1wux _1fragem32 _1fragemq1 _1fragemly _1fragemlo _1fragemp6">
                        <g clip-path="url(#questionCircle_svg__a)">
                          <circle cx="7" cy="7" r="5.5"></circle>
                          <path stroke-linejoin="round" d="M6.99 10.24h.02v.02h-.02z"></path>
                          <path stroke-linecap="round"
                            d="M5.5 5.25a1.5 1.5 0 1 1 2.428 1.179C7.494 6.77 7 7.198 7 7.75"></path>
                        </g>
                        <defs>
                          <clipPath id="questionCircle_svg__a">
                            <path fill="#fff" d="M0 0h14v14H0z"></path>
                          </clipPath>
                        </defs>
                      </svg></span></span></button></div>
            </div>
          </div>
          <div class="_16s97g74v"></div>
          <p class="_1tx8jg70 _1fragemn2 _1tx8jg717 _1tx8jg71f _1tx8jg71i _1tx8jg7c _1tx8jg7b _1fragempg">Add SavedBy
            for peace of mind against lost, stolen, or damaged packages.</p>
        </div>
      </div>
    </div>
  </div>
</div>
`;
let tierRate = "035";
console.log("Checkout+ Content Script Loaded Successfully!");
console.log("Current URL:", window.location.href);
console.log("Content script is ready to receive messages");

function formatPrice(cents) {
	return `$${(cents / 100).toFixed(2)}`;
}
function getFeeTiers(rate) {
	switch (rate) {
		case "035":
			return 0.035;
		case "040":
			return 0.04;
		case "045":
			return 0.045;
		default:
			console.log(`Unknown tier rate: ${rate}. Defaulting to 035.`);
			return 0.035;
	}
}

function calculateFee(cents) {
	const feeTier = getFeeTiers(tierRate);
	return cents * feeTier;
}

function createCheckoutPlus(button, fee) {
	const style = document.createElement("style");
	style.id = "savedby-extra-css";
	style.innerHTML = `
  `;
	document.body.appendChild(style);
	const widget = document.createElement("savedby-checkout-plus");
	console.log("Creating widget for button:", button);
	widget.id = "savedby-checkout-plus-widget";
	widget.style.display = "block";
	widget.style.width = "100%";

	widget.innerHTML = `
  <style>
    .sb__parent {
      margin-bottom: 12px;
      margin-top: 16px;
      max-width: var(--container-max-width, 100%);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .hs-site-cart-popup-layout savedby-widget .sb__container,
    #slidecarthq .sb__container,
    #rebuy-cart .sb__container,
    #rebuy-cart .sb__checkout-container {
      max-width: 100%;
    }

    .sb__info-wrapper {
      display: flex;
      width: 100%;
      line-height: 1;
      margin: 0;
      font-family: var(--info-font-family, "Montserrat", "Roboto", "Helvetica", "Arial", sans-serif);
      letter-spacing: 0.01em;
      vertical-align: middle;
    }

    .sb__info-wrapper:has(+ slot) {
      margin-bottom: 0;
    }

    .sb__info-container {
      border-radius: var(--info-border-radius, 4px);
      display: flex;
      gap: 0 8px;
      padding: 4px 8px;
      justify-content: center;
      min-height: 16px;
      background-color: var(--info-bg-color, #f5f5f5);
      color: var(--info-text-color, #000000);
      width: 100%;
      align-items: center;
      mix-blend-mode: normal;
      backdrop-filter: blur(10px);
    }

    /* INFO LOGO */

    .sb__info-logo-container {
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    [data-variant=DETAILED] .sb__info-logo-container {
      height: auto;
    }

    .sb__info-logo-container>img {
      height: 100%;
      aspect-ratio: 1;
      max-width: 28px;
    }

    /* INFO CONTENT */
    .sb__info-content {
      display: flex;
      flex-direction: column;
      text-align: left;
      padding: 4px 0;
      flex: auto;
    }

    /* INFO TEXT */

    .sb__info-text-wrapper {
      flex: 1;
      display: flex;
    }

    .sb__info-text-container {
      column-gap: 4px;
      display: flex;
      flex-wrap: wrap;
      font-size: var(--info-font-size, 0.8em);
      align-items: center;
    }

    [data-variant=DETAILED] .sb__info-text-container {
      width: 100%;
    }

    .sb__info-text-container [name="title"] {
      font-size: var(--info-title-font-size, 16px);
      font-weight: 400;
      color: var(--info-title-color, inherit);
    }

    [data-variant=DETAILED] [name="title"] {
      font-size: var(--info-title-font-size, 14px);
    }

    .sb__info-container [name="description"] {
      font-weight: 100;
      white-space: nowrap;
      font-size: var(--info-desc-font-size, 1.1em);
      color: var(--info-desc-color, inherit);
    }

    [data-variant=DETAILED] [name="description"] {
      opacity: 0.8;
      font-size: var(--info-desc-font-size, 14px);
    }

    .sb__info-text-container [name="fee"] {
      font-weight: 100;
      color: var(--info-fee-color, inherit);
      font-size: var(--info-fee-font-size, 1.1em);
      text-align: right;
      flex: auto
    }

    [data-variant=SIMPLE] [name="fee"]::before {
      content: "•";
      margin: 0 4px;
    }

    [data-variant=DETAILED] [name="fee"] {
      opacity: 0.8;
    }

    /* INFO HELP BUTTON */

    .sb__info-help-button {
      /* padding-left: 4px; */
      /* background-color: red; */
      height: 18px;
      width: 18px;
      max-height: 24px;
      max-width: 24px;
      cursor: pointer;
      opacity: 0.5
    }

    [data-variant=DETAILED] .sb__info-help-button {
      /* background-color: red;s */
      height: 18px;
      width: 18px;
    }

    .sb__info-help-button>svg {
      fill: var(--info-help-color, #000000);
    }

    @media (max-width: 330px) {
      .sb__info-container {
        background-color: unset;
      }

      .sb__info-text-container {
        font-size: 12px;
      }
    }

    .sb__checkout-wrapper {
      justify-content: center;
      width: 100%;
    }

    .sb__checkout-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      gap: 16px;
    }

    .sb__button-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      width: 100%;
      flex-wrap: wrap;
    }

    .sb__button {
      display: flex;
      border-radius: var(--btn-border-radius, 5px);
      height: var(--btn-height, 54px);
      justify-content: center;
      align-items: center;
      font-weight: bold;
      cursor: pointer;
      font-size: 16px;
      width: 100%;
      border-width: 0;
      font-family: var(--info-font-family, "Montserrat", "Roboto", "Helvetica", "Arial", sans-serif);
      white-space: nowrap;
    }

    .sb__checkout-button {
      background-color: var(--btn-checkout-bg-color, #000000);
      color: var(--btn-checkout-text-color, #ffffff);
    }

    .sb__checkout-button>svg {
      fill: var(--btn-checkout-text-color, #ffffff);
    }

    .sb__button:hover {
      filter: brightness(0.9);
    }

    /* TODO -- DOESNT WORK INSIDE SHADOW ROOT */
    slot[name="checkoutButton"][disabled] {
      filter: grayscale(0.9);
      cursor: not-allowed;
      opacity: 0.3;
    }

    .sb__cart-button {
      background-color: var(--btn-cart-bg-color, #ffffff);
      color: var(--btn-cart-text-color, #000000);
    }

    /* TODO -- LOADING */
    .sb__loading-icon,
    .sb__loading-icon div {
      box-sizing: border-box;
    }

    .sb__loading-icon {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }

    .sb__loading-icon div {
      position: absolute;
      top: 33.33333px;
      width: 13.33333px;
      height: 13.33333px;
      border-radius: 50%;
      background: currentColor;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .sb__loading-icon div:nth-child(1) {
      left: 8px;
      animation: sb__loading-icon1 0.6s infinite;
    }

    .sb__loading-icon div:nth-child(2) {
      left: 8px;
      animation: sb__loading-icon2 0.6s infinite;
    }

    .sb__loading-icon div:nth-child(3) {
      left: 32px;
      animation: sb__loading-icon2 0.6s infinite;
    }

    .sb__loading-icon div:nth-child(4) {
      left: 56px;
      animation: sb__loading-icon3 0.6s infinite;
    }

    @keyframes sb__loading-icon1 {
      0% {
        transform: scale(0);
      }

      100% {
        transform: scale(1);
      }
    }

    @keyframes sb__loading-icon3 {
      0% {
        transform: scale(1);
      }

      100% {
        transform: scale(0);
      }
    }

    @keyframes sb__loading-icon2 {
      0% {
        transform: translate(0, 0);
      }

      100% {
        transform: translate(24px, 0);
      }
    }

    .sb__continue-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .sb__non-covered-link {
      color: var(--continue-text-color, #000000);
      font-size: var(--continue-font-size, 13px);
      text-decoration: var(--continue-text-decoration, underline);
      text-align: center;
      cursor: pointer;
      width: auto;
      opacity: 0.7;
      font-weight: 300;
      font-family: var(--info-font-family, "Montserrat", "Roboto", "Helvetica", "Arial", sans-serif);
    }

    div:has(>.sb__non-covered-link[disabled]) {
      cursor: not-allowed;
    }

    .sb__non-covered-link[disabled] {
      pointer-events: none;
      filter: grayscale(0.9);
    }

    .sb__disclaimer {
      color: var(--disclaimer-text-color, gray);
      font-size: var(--disclaimer-font-size, 14px);
      font-family: var(--info-font-family, "Montserrat", "Roboto", "Helvetica", "Arial", sans-serif);
      text-decoration: var(--disclaimer-text-decoration, none);
      font-style: var(--disclaimer-text-style, italic);
      font-weight: var(--disclaimer-font-weight, 300);
      line-height: 1.2;
      text-align: center;
    }

    .sb__info-logo-container > svg {
      height: 24px;
      aspect-ratio: 1;
      fill: var(--info-icon-color, #22a9db);
    }
  </style>
  <div class="sb__parent">
    <div data-variant="SIMPLE" class="sb__info-wrapper">
      <div class="sb__info-container">
        <div class="sb__info-logo-container"><svg xmlns="http://www.w3.org/2000/svg" zoomAndPan="magnify" viewBox="0 0 900 899.99999" preserveAspectRatio="xMidYMid meet" version="1.2"><defs><clipPath id="f7421b8fc4"><path d="M 36 36 L 865 36 L 865 865 L 36 865 Z M 36 36 "></path></clipPath><clipPath id="e5329d5a89"><path d="M 300.722656 -117.992188 L 1017.742188 300.574219 L 599.171875 1017.59375 L -117.847656 599.023438 Z M 300.722656 -117.992188 "></path></clipPath><clipPath id="78f033fdf2"><path d="M 300.722656 -117.992188 L 1017.742188 300.574219 L 599.171875 1017.59375 L -117.847656 599.023438 Z M 300.722656 -117.992188 "></path></clipPath></defs><g id="f2d2a9abd8"><g clip-rule="nonzero" clip-path="url(#f7421b8fc4)"><g clip-rule="nonzero" clip-path="url(#e5329d5a89)"><g clip-rule="nonzero" clip-path="url(#78f033fdf2)"><path d="M 52.585938 386.171875 L 56.472656 301.042969 L 99.03125 302.996094 C 164.75 305.980469 237.886719 305.734375 274 264.683594 C 302.085938 232.753906 309.0625 175.113281 294.734375 93.363281 L 287.371094 51.402344 L 371.296875 36.679688 L 378.65625 78.640625 C 397.933594 188.625 384.640625 267.894531 337.972656 320.941406 C 271.847656 396.15625 156.878906 390.894531 95.136719 388.089844 Z M 300.644531 844.648438 L 302.59375 802.089844 C 305.59375 736.347656 305.335938 663.234375 264.28125 627.117188 C 232.386719 599.027344 174.714844 592.058594 92.964844 606.386719 L 51.003906 613.746094 L 36.28125 529.824219 L 78.242188 522.460938 C 188.214844 503.152344 267.449219 516.363281 320.542969 563.148438 C 395.757812 629.269531 390.507812 744.21875 387.691406 805.980469 L 385.738281 848.539062 Z M 529.394531 864.792969 L 522.03125 822.832031 C 502.734375 712.835938 516.046875 633.578125 562.730469 580.507812 C 628.839844 505.316406 743.789062 510.566406 805.550781 513.382812 L 848.109375 515.332031 L 844.226562 600.464844 L 801.667969 598.511719 C 735.925781 595.515625 662.8125 595.769531 626.710938 636.804688 C 598.613281 668.753906 591.648438 726.371094 605.957031 808.109375 L 613.316406 850.070312 Z M 607.753906 358.304688 C 597.851562 352.523438 588.667969 345.894531 580.128906 338.402344 C 504.917969 272.277344 510.179688 157.308594 512.980469 95.566406 L 514.933594 53.007812 L 600.0625 56.890625 L 598.132812 99.460938 C 595.148438 165.183594 595.394531 238.316406 636.425781 274.421875 C 668.300781 302.445312 725.960938 309.492188 807.742188 295.152344 L 849.703125 287.792969 L 864.425781 371.71875 L 822.464844 379.078125 C 730.109375 395.25 659.441406 388.476562 607.753906 358.304688 Z M 607.753906 358.304688 " style="stroke: none; fill-rule: nonzero; fill-opacity: 1;"></path></g></g></g></g></svg></div>
        <div class="sb__info-text-wrapper">
          <div class="sb__info-text-container"><span name="title">Checkout+</span>
            <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
              <span name="description">Package Protection</span><span name="fee">$${fee || "1.67"}</span>
            </div>
          </div>
        </div>
        <div class="sb__info-help-button"><svg xmlns="http://www.w3.org/2000/svg" height="100%" focusable="false"
            aria-hidden="true" viewBox="0 0 24 24">
            <path
              d="M11 18h2v-2h-2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4">
            </path>
          </svg></div>
      </div>
    </div>
    <div class="sb__viewCart-container" style="display: none;">
      <view-cart-button />
    </div>
    <div class="sb__checkoutBtn-container">
      <checkout-button />
    </div>
    <div class="sb__continue-container">
      <a class="sb__non-covered-link">Continue without package protection</a>
    </div>
    <div class="sb__disclaimer">
      <span>We highly suggest protecting your package with Checkout+ for lost, damaged, or stolen packages.</span>
    </div>
  `;
	//copy the button node
	const btnCopy = button.cloneNode(true);
	widget.querySelector("checkout-button").replaceWith(button.cloneNode(true));
	console.log("Button replaced in widget:", btnCopy);
	const viewCartButton = button.parentNode.querySelector("a[href*='cart']");
	if (viewCartButton) {
		widget.querySelector(".sb__viewCart-container").style.display = "flex";
		widget.querySelector("view-cart-button").replaceWith(viewCartButton.cloneNode(true));
		viewCartButton.style.display = "none";
	}
	widget.querySelector("div.sb__info-container").style.borderRadius = window.getComputedStyle(button).borderRadius || "4px";
	button.replaceWith(widget);

	document.querySelector("[slot='savedby-checkout-button']").style.minWidth = "calc(100% - 2rem)";
	console.log("Widget created and button replaced:", widget);
}

function replaceTextInNode(root, newText) {
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
	let node;
	while ((node = walker.nextNode())) {
		if (node.nodeValue?.trim()) {
			node.nodeValue = newText;
			break;
		}
	}
}

function updateCheckoutButton(totalPrice) {
	console.log("Updating checkout button with cart data:", totalPrice);
	const fee = ~~calculateFee(totalPrice); //--> truncate decimal points
	const newTotal = totalPrice + fee;
	console.log("Calculated fee:", fee, "New total:", newTotal);
	const label = `Checkout+ ${formatPrice(newTotal)}`;

	const buttons = document.querySelectorAll(buttonSelectors.join(", "));
	if (!buttons.length) return;
	buttons.forEach((button) => {
		console.log("Found checkout button:", button);
		button.setAttribute("slot", "savedby-checkout-button");
		if (button.type === "hidden") return;
		if (button.tagName === "INPUT") {
			button.value = label;
		} else {
			replaceTextInNode(button, label);
		}
		createCheckoutPlus(button, fee / 100);
	});
}

function createCheckBoxWidget(section) {
	if (document.querySelector("savedby-checkout-plus")) return;
	console.log("Creating checkbox widget...");
	const widget = document.createElement("div");
	widget.id = "savedby-checkbox-widget";
	widget.innerHTML = checkoutWidgetHTML;
	console.log("Checkbox widget created:", widget);
	return widget;
}

function displayProductInCart() {
	if (document.getElementById("savedby-product-card")) return;
	console.log("Creating product card...");
	const productCard = document.createElement("div");
	productCard.id = "savedby-product-card";
	productCard.style.marginTop = "12px";
	productCard.innerHTML = productHTML;
	console.log("Product card created:", productCard);
	return productCard;
}

function populateCheckoutPage() {
	const checkBoxWidget = createCheckBoxWidget();
	const productCard = displayProductInCart();
	const orderSummary = document.getElementById("gift-card-field");
	const productList = document.querySelector('[role="table"] [role="rowgroup"]:has([role="cell"] img)');
	if (orderSummary) {
		orderSummary.insertAdjacentElement("afterend", checkBoxWidget);
	}
	if (productList) {
		productList.insertAdjacentElement("beforeend", productCard);
	}
}

function injectLabel() {
	console.log("Injecting label into checkout page...");
	if (window.location.pathname.includes("/checkout")) {
		console.log("Checkout page detected, populating checkout page with label.");
		populateCheckoutPage();
		console.log("Shopify theme not detected, injecting label directly into checkout page.");
		return;
	}

	console.log("Shopify theme detected, fetching cart data to update checkout button.");
	fetch("/cart.js?sb=true")
		.then((res) => res.json())
		.then((cart) => {
			updateCheckoutButton(cart.total_price);
		})
		.catch((err) => {
			console.error("Error fetching cart data:", err);
			updateCheckoutButton(7000);
		});
}

// Update settings from sidepanel
function updateSetting(settings) {
	console.log("Updating settings:", settings);

	// Update disclaimer text if provided
	if (settings.disclaimerText) {
		const disclaimers = document.querySelectorAll(".sb__disclaimer span");
		disclaimers.forEach((disclaimer) => {
			disclaimer.textContent = settings.disclaimerText;
		});
	}
	// Update fee tier if provided
	if (settings.feeTier) {
		tierRate = settings.feeTier;
		console.log("Updated fee tier to:", tierRate);
	}

	// Handle double button styling
	if (settings.enableDoubleButton !== undefined) {
		const nonCoveredLinks = document.querySelectorAll(".sb__non-covered-link");
		console.log("nonCoveredLinks", nonCoveredLinks);
		nonCoveredLinks.forEach((link) => {
			const parent = link.closest("div.sb__parent");
			if (!parent) return;
			const extraCss = document.querySelector("#savedby-extra-css");
			if (!extraCss) return;

			if (settings.enableDoubleButton) {
				console.log("enableDoubleButton", settings.enableDoubleButton);
				if (!extraCss.innerHTML.includes("double-button")) {
					console.log("Parent:", parent);
					const widgetButton = parent.querySelector("[slot=savedby-checkout-button]");
					console.log("Widget Button:", widgetButton);
					const elHeight = widgetButton.offsetHeight;

					const styles = window.getComputedStyle(widgetButton);

					let backgroundColor = styles.backgroundColor;
					const borderRadius = styles.borderRadius;
					const fontSize = styles.fontSize;
					const fontFamily = styles.fontFamily;
					const fontWeight = styles.fontWeight;

					if (!backgroundColor || backgroundColor === "rgba(0, 0, 0, 0)" || backgroundColor === "transparent") {
						const effectiveBg = getEffectiveBackgroundColor(widgetButton);
						backgroundColor = effectiveBg;
					}

					// fallback if still nothing
					if (!backgroundColor || backgroundColor === "transparent") {
						backgroundColor = styles.color; // fallback to text color
					}
					console.log("elHeight", elHeight);

					extraCss.innerHTML = `
        a.sb__non-covered-link.double-button {
            color: ${backgroundColor};
            min-height: ${elHeight}px;
            border: 2px solid ${backgroundColor};
            border-radius: ${borderRadius};
            font-weight: ${fontWeight};
            font-size: ${fontSize};
            font-family: ${fontFamily || "inherit"};
            text-decoration: none;
            opacity: unset;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            box-sizing: border-box;
            padding: 0 6px;
            line-height: 1.5;
            transition: opacity .2s linear;
        }

        a.sb__non-covered-link.double-button:hover {
          opacity: .8;
        }
      `;
				}
				link.classList.add("double-button");
			} else {
				link.classList.remove("double-button");
			}
		});
	}

	// Handle disclaimer visibility
	if (settings.enableDisclaimer !== undefined) {
		const disclaimers = document.querySelectorAll(".sb__disclaimer");
		disclaimers.forEach((disclaimer) => {
			disclaimer.style.display = settings.enableDisclaimer ? "block" : "none";
		});
	}
}

// Listen for messages from the sidepanel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log("Content script received message:", message);
	if (message.target != "content-script.js") return;
	console.log(message.action);
	switch (message.action) {
		case "injectCheckout":
			buttonSelectors.push(...message.selectors);
			console.log(buttonSelectors);
			injectLabel();
			sendResponse({ success: true });
			break;
		case "updateSettings":
			updateSetting(message.settings);
			sendResponse({ success: true });
			break;

		case "resetSettings":
			resetSettingsForNewPage();
			sendResponse({ success: true });
			break;
		case "removeCheckoutPlus":
			const widgets = document.querySelectorAll("savedby-checkout-plus");
			[...widgets].forEach((element) => {
				const oldBtn = document.querySelector('[slot="savedby-checkout-button"]').cloneNode(true);
				element.parentNode.append(oldBtn);
				oldBtn.textContent = "CHECKOUT";
				element.remove();
			});
			break;
		default:
			sendResponse({ success: false, error: "Unknown action" });
	}
});
