const EVENTTEASE = 'https://www.pgm.gent/data/gentsefeesten/events.json';
const NEWS = 'https://www.pgm.gent/data/gentsefeesten/news.json';

(() => {

  const app = {
    initialize() {
      this.cacheElement();
      this.getDataNews();
    },

    cacheElement() {
      this.$homeEvent = document.querySelector('.home__events')
      this.$homeNews = document.querySelector('.home__news')
    },

    getDataNews() {
      fetch(NEWS)
        .then((response) => response.json())
        .then((json) => {
          this.news = json;
          this.getDataEvents();
        })
        .catch(error => console.log(error));
    },

    getDataEvents() {
      fetch(EVENTTEASE)
        .then((response) => response.json())
        .then((json) => {
          this.events = json;
          this.randomEvent();
          this.randomNews();
        })
        .catch(error => console.log(error));
    },

    randomEvent() {
        n = 3
        var eventTease = [];
        for (var i = 0; i < 3; i++) {
            eventTease.push(this.events[Math.floor(Math.random()*this.events.length)]);
        };

        const teaser = eventTease.map((tease) => {

          const cut = (tease.day_of_week).slice(0, 3)

          return `<li>
                    <a href="detail.html?day=${tease.day}&slug=${tease.slug}">
                        <div class="event__img">
                            <img src="${(tease.image) ? tease.image.thumb : 'static/media/default-teaser.jpg'}" alt="Ambience image">
                        </div>
                        <div>
                            <p class="event__date"><span class="date-bold">${cut} ${tease.day} juli</span> ${tease.start} u.</p>
                            <h3>${tease.title}</h3>
                            <p>${tease.location}</p>
                        </div>
                    </a>
                  </li>`
        }).join('');
        this.$homeEvent.innerHTML = teaser;
    },

    randomNews() {
      v = 3
      var news = [];
      for (var i = 0; i < 3; i++) {
          news.push(this.news[Math.floor(Math.random()*this.news.length)]);
      };
      
      const teaser = news.map((tease) => {

        const date = new Date(tease.publishedAt)

        const day = date.getDate();
        const month = date.getMonth();

        return `<li>
                  <a href="#">
                  <div class="news__teaser">
                    <img src="${(tease.picture) ? tease.picture.medium : 'static/media/default-teaser.jpg'}" alt="Ambience Image">
                    <p class="news__date">${day}/${month + 1}</p>
                  </div>
                  <div class="news__text">
                    <h3>${tease.title}</h3>
                    <p>${tease.synopsis}</p>
                    <img class="arrow" src="static/media/news-arrow.svg" alt=""Arrow Pointing to the right>
                  </div>
                  </a>
                </li>`
      }).join('');
      this.$homeNews.innerHTML = teaser;
    },


  }

    app.initialize()

})();
