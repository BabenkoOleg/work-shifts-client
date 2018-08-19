<template>
  <div class="calendar-wrapper">
    <div class="calendar-header">
      <div class="previous-month" @click="changeMonth('backward')">
        <b-icon icon="chevron-left"></b-icon>
      </div>
      <div class="title">{{currentMonth}}/{{currentYear}}</div>
      <div class="next-month" @click="changeMonth('forward')">
        <b-icon icon="chevron-right"></b-icon>
      </div>
    </div>
    <div class="calendar-body">
      <div class="weeks">
        <span v-for="(day, i) in daysOfWeek" class="item" :key="i">{{daysOfWeek[i]}}</span>
      </div>
      <div class="dates" >
      <div v-for="(day, i) in days" class="item" :key="i" :class="[day.classes]">
        <p class="date-num">{{day.day}}</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const today = new Date();

    return {
      days: [],
      today: today,
      currentYear: today.getFullYear(),
      currentMonth: today.getMonth() + 1,
      currentDate: today.getDate(),
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    };
  },

  created() {
    this.regenerateDays();
  },

  methods: {
    formattedDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },

    regenerateDays() {
      const daysList = [];
      const firstDay = new Date(this.currentYear, this.currentMonth - 1, 1);
      const dayOfWeek = firstDay.getDay() - 1;

      const startDate = new Date(firstDay);
      startDate.setDate(firstDay.getDate() - dayOfWeek);

      const formattedToday = this.formattedDate(this.today);

      for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const day = {
          date: this.formattedDate(date),
          day: date.getDate(),
          classes: [],
          events: [],
        };

        if (this.formattedDate(date) === formattedToday) day.classes.push('today');
        if (date.getMonth() + 1 === this.currentMonth) day.classes.push('current-month');

        daysList.push(day);
      }

      this.days = daysList;
    },

    changeMonth(direction) {
      const newMonth = direction === 'backward' ? this.currentMonth - 1 : this.currentMonth + 1;

      if (newMonth < 1) {
        this.currentMonth = 12;
        this.currentYear--;
      } else if (newMonth > 12) {
        this.currentMonth = 1;
        this.currentYear++;
      } else {
        this.currentMonth = newMonth;
      }

      this.regenerateDays();
    },
  },
};
</script>

<style lang="scss" scoped>
$base-orange: #f29543;
$white: #ffffff;
$gray: #e0e0e0;
$gray-dark: #b1b1b1;
$large-padding: 15px;

@media screen and (min-width: 768px) {
  .calendar-wrapper{
    .date-num{
      line-height: 50px;
    }
  }
}
@media screen and (max-width: 767px) {
  .date-num{
    line-height: 42px;
  }
}

.calendar-wrapper{
  .calendar-header{
    position: relative;
    width: 100%;
    background-color: $white;
    // box-shadow: 0 6px 5px rgba(0,0,0,.1);
    font-weight: 500;
    overflow: hidden;
    padding-bottom: 10px;
    &>div{
      float: left;
      line-height: 20px;
      padding: $large-padding;
    }
    .title{
      width: 60%;
      text-align: center;
    }
    .previous-month {
      text-align: left;
      width: 20%;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .next-month{
      text-align: right;
      width: 20%;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }
  .calendar-body{
    width: 100%;
    .weeks{
      width: 100%;
      overflow: hidden;
      text-align: center;
      font-size: 1rem;
      .item{
        line-height: 50px;
        float: left;
        width: 14.285%;
      }
    }
    .dates{
      width: 100%;
      overflow: hidden;
      text-align: center;
      font-size: 1rem;
      .item{
        position: relative;
        float: left;
        display: block;
        width: 14.285%;
        cursor: default;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        .date-num{
          font-size: 1rem;
          position: relative;
          z-index: 3;
        }
        &.event{
          cursor: pointer;
        }
        &.selected-day{
          .is-event{
            background-color: $base-orange;
          }
        }
        .is-event{
          content: '';
          border: 1px solid $base-orange;
          background-color: #fff;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 1;
          margin-left: -18px;
          margin-top: -19px;
        }
        .is-today{
          content: '';
          background-color: $base-orange;
          border-radius: 50%;
          opacity: .8;
          width: 12px;
          height: 4px;
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          margin-left: -6px;
          margin-top: 8px;
        }
      }
    }
  }
  h3, p {
    margin: 0;
    padding: 0;
  }
  }


</style>
