const EVENT = 'https://www.pgm.gent/data/gentsefeesten/events.json';

(() => {

  const app = {

    initialize() {
      this.cacheElement();
      this.getDataEvents();
    },

    cacheElement() {
      this.$day = document.querySelector('.event-info');
    },

    getDataEvents() {
      fetch(EVENT)
        .then((response) => response.json())
        .then((json) => {
          this.events = json;
          this.addHtmlForDay();
        })
        .catch(error => console.log(error));
    },

    addHtmlForDay() {
      const query = window.location.search;
      const params = new URLSearchParams(query);
      const check = params.has('day');
      if (check === true) {
        console.log(check)
      } else {
        console.log(check)
      }; 

      const dayCount = params.get('day');
      const slugger = params.get('slug');

      const filterDays = this.events.filter(filter => {
        return filter.day === dayCount
      });

      const id = filterDays.filter(filter => {
        return filter.slug === slugger
      });

      const eventItem = id.map((item) => {
        return `<div class="event-item-top">
                    <div class="event-top">
                        <h1>${item.title}</h1>
                        <a class="event-location" href="#">
                            <img src="static/media/location-marker.svg" alt="Icon of a location marker">
                            ${item.location}
                        </a>
                        <div class="event-date">
                            <p>${item.day_of_week} ${item.day} juli</p>
                            <p>${item.start} u.</p>
                            <img src="static/media/chevron-right.svg" alt="Arrow pointing to the right">
                            <p>${item.end} u.</p>
                        </div>
                    </div>
                    <div class="event__flex">
                      <div class="event-middle">
                          <img src="${(item.image) ? item.image.full : 'static/media/default-teaser.jpg'}" alt="Ambience image">
                      </div>
                      <div class="event-bottom event-bottom-right">
                        <div class="event-text">
                            <p>${(item.description) ? item.description : 'Informatie niet beschikbaar'}</p>
                        </div>
                          <div class="event-links">
                              <div class="link-flex">
                                  <p>Website:</p>
                                  <div>
                                      <a target="_blank" href="${(item.url) ? item.url : '#'}">${(item.url) ? item.url : 'Informatie niet beschikbaar'}${(item.url) ? '<img class="external-link" src="static/media/external-link.svg" alt="Arrow curling to the right">' : ''}</a>
                                  </div>
                              </div>
                              <div class="link-flex">
                                  <p>Organisator</p>
                                  <div>
                                      <a href="#">${(item.organizer) ? item.organizer : 'Informatie niet beschikbaar'}</a>
                                  </div>
                              </div>
                              <div class="link-flex">
                                  <p>Categorieën:</p>
                                  <div>
                                      <a href="#">${(item.category) ? item.category : 'Informatie niet beschikbaar'}</a>
                                  </div>
                              </div>
                          </div>
                          ${item.wheelchair_accessible === true ? '<img class="wheelchair" src="static/media/wheel-chair.svg" alt="Icon of a wheelchair">' : '<p class="wheelchair-access">Niet toegankelijk voor rolstoelgebruikers</p>'}
                          <ul>
                              <li>
                                  <a href="#">
                                      <svg width="25" height="21" viewBox="0 0 25 21" fill="" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M22.26 5.49524C22.2756 5.7135 22.2756 5.93181 22.2756 6.15007C22.2756 12.8074 17.2086 20.4782 7.94749 20.4782C5.09433 20.4782 2.44388 19.6518 0.214355 18.2175C0.619736 18.2643 1.00947 18.2799 1.43045 18.2799C3.78465 18.2799 5.95183 17.4847 7.68244 16.1283C5.46851 16.0815 3.61318 14.6316 2.97394 12.6359C3.28578 12.6827 3.59758 12.7139 3.92503 12.7139C4.37715 12.7139 4.82932 12.6515 5.25025 12.5424C2.94279 12.0746 1.21214 10.0478 1.21214 7.60003V7.53769C1.88253 7.91187 2.66214 8.14573 3.4884 8.17688C2.13198 7.27258 1.24333 5.7291 1.24333 3.98289C1.24333 3.04745 1.49274 2.18995 1.92932 1.44157C4.4083 4.49741 8.13456 6.49302 12.3129 6.71133C12.235 6.33714 12.1882 5.94741 12.1882 5.55762C12.1882 2.7824 14.4333 0.521729 17.2241 0.521729C18.674 0.521729 19.9837 1.12978 20.9035 2.11201C22.0417 1.89375 23.133 1.47277 24.0997 0.895915C23.7255 2.06527 22.9304 3.0475 21.8858 3.67109C22.8992 3.56201 23.8814 3.28131 24.7857 2.89158C24.0998 3.88936 23.2422 4.77801 22.26 5.49524Z" fill="black"/>
                                      </svg>
                                  </a>
                              </li>
                              <li>
                                  <a href="#">
                                      <svg  width="14" height="25" viewBox="0 0 14 25" fill="" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M12.5746 14.0358L13.257 9.58893H8.99012V6.70323C8.99012 5.48666 9.58616 4.3008 11.4972 4.3008H13.437V0.51478C13.437 0.51478 11.6767 0.214355 9.99361 0.214355C6.4797 0.214355 4.18285 2.3442 4.18285 6.1998V9.58893H0.276855V14.0358H4.18285V24.7858H8.99012V14.0358H12.5746Z" fill="black"/>
                                      </svg>
                                  </a>
                              </li>
                              <li>
                                  <a href="#">
                                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                          <path d="M8.625 13.486c0 1.396 0.614 3.464 2.234 3.911 0.057 0 0.112 0.057 0.224 0.057 0.392 0 0.615-1.006 0.615-1.286 0-0.335-0.895-1.062-0.895-2.402 0-2.906 2.347-4.917 5.42-4.917 2.627 0 4.582 1.397 4.582 3.911 0 1.9-0.838 5.475-3.464 5.475-0.95 0-1.788-0.67-1.788-1.563 0-1.341 1.006-2.682 1.006-4.079 0-0.838-0.503-1.564-1.509-1.564-1.341 0-2.124 1.396-2.124 2.458 0 0.614 0.057 1.285 0.392 1.844-0.559 2.124-1.62 5.308-1.62 7.487 0 0.671 0.111 1.341 0.167 2.012v0.112l0.168-0.056c1.956-2.459 1.844-2.962 2.738-6.203 0.447 0.838 1.676 1.285 2.682 1.285 4.079 0 5.923-3.688 5.923-7.040 0-3.52-3.297-5.867-6.929-5.867-3.911-0.001-7.822 2.458-7.822 6.425z"></path>
                                      </svg>                                
                                  </a>
                              </li>
                          </ul>
                      </div>
                    </div>
                </div>`
      }).join('');
      this.$day.innerHTML = eventItem;
    },

  };

  app.initialize();

})();