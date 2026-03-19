function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('#days');
  const hoursSpan = clock.querySelector('#hours');
  const minutesSpan = clock.querySelector('#minutes');
  const secondsSpan = clock.querySelector('#seconds');

  function updateClock() {
    // v1
    const timeRemaining = getTimeRemaining(endtime);

    daysSpan.innerHTML = addZero(timeRemaining.days);
    hoursSpan.innerHTML = addZero(timeRemaining.hours);
    minutesSpan.innerHTML = addZero(timeRemaining.minutes);
    secondsSpan.innerHTML = addZero(timeRemaining.seconds);

    if (timeRemaining.total <= 0) {
      clearInterval(timeinterval);
    }

    // v2
    // const { total, days, hours, minutes, seconds} = getTimeRemaining(endtime);

    // hoursSpan.innerHTML = addZero(hours);
    // minutesSpan.innerHTML = addZero(minutes);
    // secondsSpan.innerHTML = addZero(seconds);

    // if (total <= 0) {
    //   clearInterval(timeinterval);
    // }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

function addZero(value) {
  return ('0' + value).slice(-2)
}

const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);

initializeClock('clock', deadline);