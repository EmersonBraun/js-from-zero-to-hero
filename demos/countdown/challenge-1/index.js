function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const months = Math.floor(total / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(total / (1000 * 60 * 60 * 24 * 30 * 12));

  return {
    total,
    months,
    days,
    hours,
    minutes,
    seconds,
    years
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);

  function updateClock() {
    const timeRemaining = getTimeRemaining(endtime);

    const options = ['years','months','days','hours','minutes','seconds']
    for (const option of options) {
      clock.querySelector(`#${option}`).innerHTML = addZero(timeRemaining[option])
    }

    if (timeRemaining.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

function addZero(value) {
  return ('0' + value).slice(-2)
}

const deadline = new Date(Date.parse(new Date()) + 46 * 30 * 24 * 60 * 60 * 1000);

initializeClock('clock', deadline);