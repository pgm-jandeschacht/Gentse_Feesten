const CATEGORIES = 'https://www.pgm.gent/data/gentsefeesten/categories.json';
const EVENTS = 'https://www.pgm.gent/data/gentsefeesten/events.json';

(() => {
  const app = {
    initialize() {
      this.cacheElement();
      this.registerEventListener();
      this.registerEventListenerClose();
      this.registerEventListenerProgram();
      this.registerEventListenerDays();
      this.registerEventListenerListView();
      this.registerEventListenerGridView();
      this.dayToggle();
      this.getDataCategories();
    },

    cacheElement() {
      this.$categories = document.querySelector('.categories');
      this.$eventCard = document.querySelector('.event__cards');
      this.$homeEvent = document.querySelector('.home__events')
    },

    dayToggle() {
      const currentPage = location.href;
      console.log(currentPage)
      const selector = document.querySelector('.calendar');
      console.log(selector)
      const menuItem = selector.querySelectorAll('a');
      console.log(menuItem)
      const menuLength = menuItem.length
      for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentPage) {
          menuItem[i].classList.toggle('calendar-black')
        }
      }
    },
      
    registerEventListener() {
      const btn = document.querySelector('.button__burger');
      btn.addEventListener('click', test);
      function test (ev) {
        document.querySelector('.navigation-mobile').classList.toggle('appear');
      }
    },

    registerEventListenerClose() {
      const btn = document.querySelector('.close-nav');
      btn.addEventListener('click', test);
      function test (ev) {
        document.querySelector('.navigation-mobile').classList.toggle('appear');
      }
    },

    registerEventListenerProgram() {
      const btn = document.querySelector('.program-toggle');
      btn.addEventListener('click', test);
      function test (ev) {
        document.querySelector('.add').classList.toggle('turn');
      }
    },

    registerEventListenerDays() {
      const btn = document.querySelector('.program-toggle');
      btn.addEventListener('click', test);
      function test (ev) {
        document.querySelector('.days-menu').classList.toggle('dropdown');
      }
    },

    registerEventListenerListView() {
      const btn = document.querySelector('.list');
      btn.addEventListener('click', test);
      function test (ev) {
        const selected = document.querySelectorAll(".event__container");
        selected.forEach(function(container) {
          container.classList.add('list-view');
        });
        document.querySelector('.list').classList.add('button-active');
        document.querySelector('.grid').classList.remove('button-active');
      }
    },

    registerEventListenerGridView() {
      const btn = document.querySelector('.grid');
      btn.addEventListener('click', test);
      function test (ev) {
        const selected = document.querySelectorAll(".event__container");
        selected.forEach(function(container) {
          container.classList.remove('list-view');
        });
        document.querySelector('.list').classList.remove('button-active');
        document.querySelector('.grid').classList.add('button-active');
      }
    },

    getDataCategories() {
      fetch(CATEGORIES)
          .then(response => response.json())
          .then((json) => {
            this.categories = json;
            this.getDataEvents();
          })
          .catch(error => console.log(error));
    },

    getDataEvents() {
      fetch(EVENTS)
        .then((response) => response.json())
        .then((json) => {
          this.events = json;
          this.addHtmlForDays();
        })
        .catch(error => console.log(error));
    },

    addHtmlForDays () {
      const cat = this.categories.map((category) => {
        return `<li><a href="#${category}">${category}</a></li>`
      }).join('');
      this.$categories.innerHTML = cat;


      const query = window.location.search;
      const params = new URLSearchParams(query);
      const check = params.has('day');
      if (check === true) {
        console.log(check)
      } else {
        console.log(check)
      }; 
 

      const dayCount = params.get('day');

      const events = this.categories.map((category) => {
        const filterDays = this.events.filter(filter => {
          return filter.day === dayCount
        });


        // Filtered 3 events
        n = 3;
        var eventTease = [];
        for (var i = 0; i < 3; i++) {
            eventTease.push(filterDays[Math.floor(Math.random()*filterDays.length)]);
        };

        eventTease.sort((event1, event2) => {
          return event1.sort_key.localeCompare(event2.sort_key)
        });

        const teaser = eventTease.map((tease) => {
          return `<li>
                    <a href="detail.html?day=${tease.day}&slug=${tease.slug}">
                        <div class="event__img">
                            <img src="${(tease.image) ? tease.image.thumb : 'static/media/default-teaser.jpg'}" alt="Ambience Image">
                        </div>
                        <div>
                            <p class="event__date"><span class="date-bold"></span>${tease.start} u.</p>
                            <h3>${tease.title}</h3>
                            <p>${tease.location}</p>
                        </div>
                    </a>
                  </li>`
        }).join('');
        this.$homeEvent.innerHTML = teaser;
        ///////

        
        const filterCats = filterDays.filter((header) => {
          return header.category.indexOf(category) > -1;
        });
      
        filterCats.sort((event1, event2) => {
          return event1.sort_key.localeCompare(event2.sort_key)
        });

        const listItems = filterCats.map((item) => {
          return `<li class="event__container">
                    <a href="detail.html?day=${item.day}&slug=${item.slug}">
                      <div class="event__img">
                        <img src="${(item.image) ? item.image.thumb : 'static/media/default-teaser.jpg'}" alt="Ambience image">
                      </div>
                      <div class="event__text">
                        <p class="event__date date-bold">${item.start} u.</p>
                        <h3>${item.title}</h3>
                        <p>${item.location}</p>
                      </div>
                    </a>
                  </li>`
        }).join('');

        return `
        <div class="event__card">
          <div class="category__title">
            <h2 id="${category}">${category}</h2>
            <a href="#to-top" class="to-top-arrow">
              <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.683 0L6.785 1.885l4.118 4.118H0v2.661h10.903l-4.118 4.117 1.898 1.886L16 7.333z" fill="#000" fill-rule="nonzero"/>
              </svg>
            </a>
          </div>
            <ul class="home__events events-list">
              ${listItems}
            </ul>
        </div>`
      }).join('');
      this.$eventCard.innerHTML = events; 
    },

  };

  app.initialize();

})();