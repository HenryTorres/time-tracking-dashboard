
const daily = document.querySelector('.daily');
const weekly = document.querySelector('.weekly');
const monthly = document.querySelector('.monthly');

document.addEventListener('DOMContentLoaded', () => {
  daily.classList.add('active');
  fnCreateCard('daily');
});

daily.addEventListener('click', () => {
  daily.classList.add('active');
  weekly.classList.remove('active');
  monthly.classList.remove('active');

  fnCreateCard('daily');
});

weekly.addEventListener('click', () => {
  daily.classList.remove('active');
  weekly.classList.add('active');
  monthly.classList.remove('active');

  fnCreateCard('weekly');
});

monthly.addEventListener('click', () => {
  daily.classList.remove('active');
  weekly.classList.remove('active');
  monthly.classList.add('active');

  fnCreateCard('monthly');
});

const fnCreateCard = (timeframe) => {
  fetch('data/data.json')
    .then(response => response.json())
    .then(data => {

      console.log(data);

      const cards = document.querySelector('.cards');
      cards.innerHTML = '';

      data.map(item => {
        const style = getComputedStyle(document.documentElement);

        let color, image;
        switch (item.title) {
          case 'Work':
            color = style.getPropertyValue('--light-red-work').trim();
            image = 'url(images/icon-work.svg)';
            break;
          case 'Play':
            color = style.getPropertyValue('--soft-blue-play').trim();
            image = 'url(images/icon-play.svg)';
            break;
          case 'Study':
            color = style.getPropertyValue('--light-red-study').trim();
            image = 'url(images/icon-study.svg)';
            break;
          case 'Exercise':
            color = style.getPropertyValue('--lime-green-excercise').trim();
            image = 'url(images/icon-exercise.svg)';
            break;
          case 'Social':
            color = style.getPropertyValue('--violet-social').trim();
            image = 'url(images/icon-social.svg)';
            break;
          case 'Self Care':
            color = style.getPropertyValue('--soft-orange-self-care').trim();
            image = 'url(images/icon-self-care.svg)';
            break;
        }

        const newCardHTML = `
        <div class="card" style="background-color: ${color}; background-image: ${image}">
        <div class="card-content">
          <div class="card-content-title">
            <span>${item.title}</span>
            <img src="images/icon-ellipsis.svg" alt="">
          </div>
          <div class="card-content-time">
            <p>${item.timeframes[timeframe].current}hrs</p>
            <p>Last Week - ${item.timeframes[timeframe].previous}hrs</p>
          </div>
        </div>
      </div>
      `;

        cards.innerHTML += newCardHTML;
      });

    })
}
