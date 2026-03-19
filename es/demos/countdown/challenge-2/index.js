function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  console.log(total)
  const seconds = Math.floor((total / 1000) % 60) || 0;
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const months = Math.floor(total / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(total / (1000 * 60 * 60 * 24 * 30 * 12)) ;

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

function initializeClock(id) {
  const clock = document.getElementById(id);
  const value = document.getElementById('datetime').value

  function updateClock() {
    const timeRemaining = getTimeRemaining(value);

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

function getDeadline() {
  initializeClock('clock');
}


window.addEventListener('load', () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const nowDate = now.toISOString().substring(0,16);
  document.getElementById('datetime').value = nowDate
  document.getElementById('datetime').min = nowDate
});