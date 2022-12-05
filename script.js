'use strict';

const exampleBtn = document.querySelector('.btn-example');
const calculateBtn = document.querySelector('.btn-calculate');
const text = document.querySelector('.text');
const publicText = document.querySelector('.public-text');

exampleBtn.addEventListener('click', e => {
  const exampleText = `John Doe
  2022/10/03	08:53:09	18:34:26	09:41:17 (9.68)
  2022/10/04	08:44:29	18:23:22	09:38:53 (9.64)
  2022/10/05	08:43:32	17:44:30	09:00:58 (9.01)
  2022/10/06	08:45:50	18:18:13	09:32:23 (9.53)
  2022/10/07	08:43:28	16:40:27	07:56:59 (7.94)
  2022/10/10	07:00:07	16:51:39	08:00:32 (8.00)
  2022/10/11	07:03:05	16:05:25	09:02:20 (9.03)
  2022/10/12	08:56:38	18:37:05	09:40:27 (9.67)
  2022/10/13	08:28:30	16:45:00	08:16:30 (8.27)
  2022/10/18	08:51:45	18:08:32	09:16:47 (9.27)
  2022/10/19	08:48:27	18:18:51	09:30:24 (9.50)
  2022/10/20	08:49:33	18:26:59	09:37:26 (9.62)
  2022/10/21	08:52:34	18:03:25	09:10:51 (9.18)
  2022/10/24	08:58:35	18:36:39	09:38:04 (9.63)
  2022/10/25	08:45:32	18:39:14	09:53:42 (9.89)
  2022/10/26	08:50:20	18:53:42	10:03:22 (10.05)
  2022/10/27	08:55:40	18:51:52	09:56:12 (9.93)
  2022/10/28	09:03:03	17:57:35	08:54:32 (8.90)
  2022/10/31	08:12:37	18:24:33	10:11:56 (10.19)
  
  Jane Doe Johnson
2022/10/01	08:25:36	14:25:54	06:00:18 (6.00)
2022/10/02	08:22:12	12:57:58	04:35:46 (4.59)
2022/10/03	08:51:41	18:29:40	09:37:59 (9.63)
2022/10/04	08:36:51	17:52:00	09:15:09 (9.25)
2022/10/05	08:35:51	18:34:26	09:58:35 (9.97)
2022/10/06	08:47:13	18:44:36	09:57:23 (9.95)
2022/10/07	08:36:26	18:35:04	09:58:38 (9.97)
2022/10/10	09:08:48	18:33:41	09:24:53 (9.41)
2022/10/11	08:59:29	18:40:35	09:41:06 (9.68)
2022/10/12	08:59:55	18:43:43	09:43:48 (9.73)
2022/10/13	09:08:53	18:36:01	09:27:08 (9.45)
2022/10/14	08:57:54	18:31:14	09:33:20 (9.55)
2022/10/17	09:05:53	18:39:14	09:33:21 (9.55)
2022/10/18	09:48:51	18:35:58	08:47:07 (8.78)
2022/10/19	08:59:04	18:43:00	09:43:56 (9.73)
2022/10/20	09:07:42	18:37:58	00:00:00 (0.00)
2022/10/21	08:50:49	18:39:45	09:48:56 (9.81)
2022/10/22	08:22:07	14:38:27	06:16:20 (6.27)
2022/10/23	08:09:09	13:08:13	04:59:04 (4.98)
2022/10/25	07:58:18	18:39:20	10:41:02 (10.68)
2022/10/26	08:11:27	19:07:20	10:55:53 (10.93)
2022/10/27	08:09:39	19:05:53	10:56:14 (10.93)
2022/10/28	08:03:35	17:54:37	09:51:02 (9.85)
2022/10/29	12:47:34	16:51:57	04:04:23 (4.07)
2022/10/31	08:01:12	18:39:45	10:38:33 (10.64)`;

  navigator.clipboard.writeText(exampleText);
});

class Overtime {
  personObject = [];
  publicDates = [];
  constructor() {
    this._getPublicHolidays();
  }

  separatePeople(data) {
    this.people = data
      .split(/(?<!([a-zA-Z]+){1})\s(?=([a-zA-Z]+\s){2,3})/)
      .filter(el => el && el.length > 26);
    this.createPersonObject();
  }

  createPersonObject() {
    this.people.forEach((el, i) => {
      const [name, ...days] = el.split('\n');
      this.personObject[i] = {
        name,
        days,
      };
    });
  }

  formatDays() {
    this.personObject.forEach(person => {
      const formattedDays = person.days.split('\t');
      console.log(formattedDays);
    });
    console.log(this.personObject);
  }

  calculatePublicHolidays(data) {
    if (data) {
      this.publicDates = [];
      const dates = data.split('\n');
      dates.forEach(day => {
        this.publicDates.push(new Date(Date.parse(day)));
      });
      this._setPublicHolidays();
    }
  }

  _setPublicHolidays() {
    window.localStorage.setItem('publicDate', JSON.stringify(this.publicDates));
  }

  _getPublicHolidays() {
    const savedDates = JSON.parse(window.localStorage.getItem('publicDate'));
    if (savedDates) this.publicDates = savedDates;
  }

  calculateTotalTime() {}

  calculateNormalTime() {}

  calculateOvertime() {}

  calculateSundayTime() {}

  calculatePublicTime() {}

  renderResults() {}
}

const app = new Overtime();

calculateBtn.addEventListener('click', e => {
  const peopleData = text.value;
  const publicData = publicText.value;
  app.separatePeople(peopleData);
  app.createPersonObject();
  app.calculatePublicHolidays(publicData);
  app.formatDays();
});
