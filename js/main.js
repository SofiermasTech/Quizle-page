// Video-section popup
const videoPopup = document.querySelector('.section-video__video');
const btnCloseVideo = document.querySelector('.section-video__btn-close');
const btnOpenVideo = document.querySelector('.section-video__btn-play');

function toggleVideo() {
   videoPopup.classList.toggle('video-show');
   document.addEventListener('keydown', closeVideoEsc);
}

const closeVideoEsc = function (evt) {
   if (evt.key === 'Escape') {
      toggleVideo();
   }
}

videoPopup.addEventListener('mousedown', (evt) => {
   if (evt.target === evt.currentTarget) {
      toggleVideo();
   }
});


// Кнопка показать еще
const btnLoadMore = document.querySelector('.section-quize-cards__load-more');
const cardsLength = document.querySelectorAll('.quize-card').length;

let cards = 6;

function startCards() {
   cards += 6;
   const arrayCards = Array.from(document.querySelector('.section-quize-cards__content').children);
   const visibleCards = arrayCards.slice(0, cards);

   visibleCards.forEach(element => {
      element.classList.add('quize-card--visible');
      element.style.display = 'flex';

   });

   if (visibleCards.length === cardsLength) {
      btnLoadMore.style.display = 'none';
   } else {
      btnLoadMore.style.display = 'block';
   }
}

btnLoadMore.addEventListener('click', startCards);

// Section Q&A - аккордеон
document.addEventListener('DOMContentLoaded', () => {
   const accordions = document.querySelectorAll('.js-accordeon');

   accordions.forEach(element => {
      element.addEventListener('click', (evt) => {
         const events = evt.currentTarget;

         const tabAccordeon = events.querySelector('.js-tab-accordeon');
         const contentAccordeon = events.querySelector('.js-content-accordeon');

         events.classList.toggle('js-active');

         // Accessibility - значение ARIA-атрибутов
         if (events.classList.contains('js-active')) {
            tabAccordeon.setAttribute('aria-expanded', true);
            contentAccordeon.setAttribute('aria-hidden', false);
         } else {
            tabAccordeon.setAttribute('aria-expanded', false);
            contentAccordeon.setAttribute('aria-hidden', true);
         }
      })
   })
})

// Фильтр для шаблонов по категориям
const conteinerCategories = document.querySelector('.categiries__filters-list-container');
const inputLabel = conteinerCategories.querySelectorAll('.filter-item__label');
const btnRemoveClass = conteinerCategories.querySelectorAll('.filter-item__btn');
const btnWrapCategories = document.querySelectorAll('.js-filter-item');

// отмена всплытия от label, чтобы не было двойного события клика
inputLabel.forEach(label => {
   label.addEventListener('click', function (evt) {
      evt.stopPropagation();
   });
});

conteinerCategories.addEventListener('click', function (evt) {
   if (evt.target.tagName !== 'INPUT') {
      return;
   } else {
      console.log(evt.target.tagName);
      const events = evt.target;
      const btnClick = events.closest('.js-filter-item');

      btnWrapCategories.forEach(item => {
         item.classList.remove('active');
         item.setAttribute('aria-selected', false);
      });

      if (btnClick.classList.contains('active')) {
         btnClick.classList.remove('active');
      } else {
         btnClick.classList.add('active');
         btnClick.setAttribute('aria-selected', true);
      }
   }
})


// контейнер со всеми карточками (список)
const cardsArea = document.querySelector('.section-quize-cards__content');
// карточка
const card = cardsArea.querySelectorAll('.quize-card');

function filterCards() {
   conteinerCategories.addEventListener('click', evt => {
      if (evt.target.id === '') return;

      const dataId = evt.target.id;

      // сначала скрываем все карточки
      card.forEach(item => {
         item.style.display = 'none';
      });

      switch (dataId) {
         case 'all':
            let counter = 0;
            card.forEach(item => {
               // отображаем только первые 6 карточек из категории 'quize-card'
               if (counter < 6 && item.classList.contains('quize-card')) {
                  item.style.display = 'flex';
                  counter++;
               } else {
                  item.style.display = 'none';
                  btnLoadMore.style.display = 'block';
               }
            });
            break;
         case 'furniture':
            getItemCard('furniture')
            break;
         case 'realty':
            getItemCard('realty')
            break;
         case 'tours':
            getItemCard('tours')
            break;
         case 'kitchen':
            getItemCard('kitchen')
            break;
         case 'other':
            getItemCard('other')
            break;
         case 'health':
            getItemCard('health')
            break;
         case 'interior':
            getItemCard('interior')
            break;
         case 'cars':
            getItemCard('cars')
            break;
         case 'courses':
            getItemCard('courses')
            break;
      }
   })
}

filterCards();

function getItemCard(className) {
   card.forEach(item => {
      if (item.classList.contains(className)) {
         item.style.display = 'flex';
         btnLoadMore.style.display = 'none';
      } else {
         item.style.display = 'none';
      }
   })
}

// Кнопка показа фильтров на мобильной версии
function hiddenFilter() {
   btnWrapCategories.forEach(filter => {
      if (document.documentElement.clientWidth < 992) {
         filter.style.display = 'none';
      } else {
         filter.style.display = 'flex';
      }
   })
}

hiddenFilter();

function toggleFilters() {
   btnWrapCategories.forEach(item => {
      item.style.display = item.style.display === 'none' ? 'flex' : 'none';
   });
}


//Свайпер для section-questions
const sliderMobile = document.querySelector('.section-type-question__cards');
let mySwiper;

function mobileSlider() {
   if (window.innerWidth <= 767 && sliderMobile.dataset.mobile == 'false') {

      mySwiper = new Swiper(sliderMobile, {
         slideClass: 'section-type-question__card',
         wrapperClass: 'section-type-question__cards-wrapper',
         direction: 'horizontal',
         loop: true,
         spaceBetween: 40,
         slidesPerView: 1,
         autoHeight: true,
         pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
         },

      });

      sliderMobile.dataset.mobile == 'true';
   }

   if (window.innerWidth > 767 && sliderMobile.classList.contains('swiper-initialized')) {
      mySwiper.destroy();
      sliderMobile.dataset.mobile = 'false';
      sliderMobile.classList.remove('swiper-initialized');
   }
}

mobileSlider();

function resizeHandler() {
   mobileSlider();
   hiddenFilter();
};

window.addEventListener('resize', resizeHandler);


// Анимация intro
const sectionIntro = document.querySelector('.intro');
const iconBtnBuy = document.querySelector('.btn-buy__icon');

function randomCircle(x, y) {
   return (x + (Math.random() * (y - x)));
}

// интервал размеров элемента
const s = randomCircle(6, 16);

// розовые элм.
for (let i = 0; i < 50; i++) {
   sectionIntro.innerHTML += '<svg class="intro__decor-1" \
   style=" animation-duration: ' + randomCircle(1, 20) + 's; opacity: ' + randomCircle(0.1, 0.2) + '; \
   top: ' + randomCircle(0, 100) + '%; right: ' + randomCircle(0, 100) + '%; \
   width: ' + s + 'px; height: ' + s + 'px;" viewBox="0 0 22 22" fill="none"  xmlns="http://www.w3.org/2000/svg"> \
   <path fill="#fb2dc9" fill-rule="evenodd" \
   d="M8.8 4.62a4.4 4.4 0 0 1-4.4 4.4H1.98a1.98 1.98 0 0 0 0 3.96H4.4a4.4 4.4 0 0 1 4.4 4.4v2.64a1.98 1.98 0 0 0 3.96 0v-2.53a4.51 4.51 0 0 1 4.51-4.51h2.75a1.98 1.98 0 0 0 0-3.96h-2.75a4.51 4.51 0 0 1-4.51-4.51V1.98a1.98 1.98 0 0 0-3.96 0v2.64Z"\
   clip-rule="evenodd" /> </svg>';
};

// фиолетовые элм.
for (let i = 0; i < 50; i++) {
   sectionIntro.innerHTML += '<svg class="intro__decor-5" \
   style=" animation-duration: ' + randomCircle(1, 20) + 's; opacity: ' + randomCircle(0.1, 0.2) + ';\
   top: ' + randomCircle(0, 100) + '%; right: ' + randomCircle(0, 100) + '%; \
   width: ' + s + 'px; height: ' + s + 'px;" viewBox="0 0 22 22" fill="none"  xmlns="http://www.w3.org/2000/svg"> \
   <path fill="#8264FC" fill-rule="evenodd" \
   d="M8.8 4.62a4.4 4.4 0 0 1-4.4 4.4H1.98a1.98 1.98 0 0 0 0 3.96H4.4a4.4 4.4 0 0 1 4.4 4.4v2.64a1.98 1.98 0 0 0 3.96 0v-2.53a4.51 4.51 0 0 1 4.51-4.51h2.75a1.98 1.98 0 0 0 0-3.96h-2.75a4.51 4.51 0 0 1-4.51-4.51V1.98a1.98 1.98 0 0 0-3.96 0v2.64Z"\
   clip-rule="evenodd" /> </svg>';
};

// Анимация элементов при скролле
const animationItems = document.querySelectorAll('.scroll-anim-js');

const showScrollItems = () => {
   const triger = (window.innerHeight / 5) * 4;

   for (const animationItem of animationItems) {
      const topOfItem = animationItem.getBoundingClientRect().top - 80;

      if (topOfItem < triger) {
         animationItem.classList.add('show');
      } else {
         animationItem.classList.remove('show');
      }
   }
}

showScrollItems();

window.addEventListener('scroll', showScrollItems);