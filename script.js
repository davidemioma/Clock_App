//Selectors
const timeText = document.querySelector(".time-text");
const timezoneText = document.querySelector(".timezone");
const countryName = document.querySelector(".country");
const placeText = document.querySelector(".map");
const yearText = document.querySelector(".year");
const weekText = document.querySelector(".week");
const weekNoText = document.querySelector(".week_no");
const greetings = document.querySelector(".view");
const intro = document.querySelector(".intro");
const timeInfo = document.querySelector(".time_info");
const btnMore = document.querySelector(".more-btn");
const btnLess = document.querySelector(".less-btn");

//functions
const renderData = function (timeData, countryData) {
  timeText.textContent = `${timeData.datetime.slice(11, 16)}`;

  timezoneText.textContent = `${timeData.abbreviation}`;

  countryName.textContent = `in ${countryData.country_name}, ${countryData.country_code}`;

  placeText.textContent = `${timeData.timezone}`;

  yearText.textContent = `${timeData.day_of_year}`;

  weekText.textContent = `${timeData.day_of_week}`;

  weekNoText.textContent = `${timeData.week_number}`;
};

const getCountryData = async function () {
  try {
    const res = await fetch(
      `https://api.freegeoip.app/json/?apikey=e8b19cc0-55ed-11ec-aa90-d58e3b706f7f`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const getCountryTime = async function () {
  try {
    const countryData = await getCountryData();

    const ip = countryData.ip;

    const res = await fetch(`http://worldtimeapi.org/api/ip=${ip}`);

    const timeData = await res.json();

    const time = timeData.datetime.slice(11, 13);

    if (time > 23 && time < 17) {
      greetings.textContent = `good morning`;
    } else {
      greetings.textContent = `good evening`;
    }

    renderData(timeData, countryData);
  } catch (err) {
    console.error(err);
  }
};

//Events
setInterval(() => {
  getCountryTime();
}, 1000);

btnMore.addEventListener("click", function () {
  intro.classList.add("hidden");
  timeInfo.style.display = "grid";
  btnLess.style.display = "inline-flex";
  btnMore.style.display = "none";
});

btnLess.addEventListener("click", function () {
  intro.classList.remove("hidden");
  timeInfo.style.display = "none";
  btnLess.style.display = "none";
  btnMore.style.display = "inline-flex";
});
