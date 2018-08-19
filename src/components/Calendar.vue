<template>
  <div class="calendar-wrapper">
    <div class="calendar-header">
      <div class="previous-month" @click="changeMonth('backward')">
        <b-icon icon="chevron-left"></b-icon>
      </div>
      <div class="header-title">{{currentMonth}}/{{currentYear}}</div>
      <div class="next-month" @click="changeMonth('forward')">
        <b-icon icon="chevron-right"></b-icon>
      </div>
    </div>
    <div class="calendar-weeks">
      <span v-for="(day, i) in daysOfWeek" class="item" :key="i">{{daysOfWeek[i]}}</span>
    </div>
    <div class="calendar-days">
      <div v-for="(day, i) in days" class="item" :key="i" :class="[day.classes]">
        <p class="date-number">{{day.day}}</p>
        <span v-if="day.isToday" class="today"></span>
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
      today,
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

      for (let i = 0; i < 42; i += 1) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const day = {
          date: this.formattedDate(date),
          day: date.getDate(),
          isToday: this.formattedDate(date) === formattedToday,
          classes: [],
          events: [],
        };

        if (date.getMonth() + 1 === this.currentMonth) day.classes.push('current-month');

        daysList.push(day);
      }

      this.days = daysList;
    },

    changeMonth(direction) {
      const newMonth = direction === 'backward' ? this.currentMonth - 1 : this.currentMonth + 1;

      if (newMonth < 1) {
        this.currentMonth = 12;
        this.currentYear = this.currentYear - 1;
      } else if (newMonth > 12) {
        this.currentMonth = 1;
        this.currentYear = this.currentYear + 1;
      } else {
        this.currentMonth = newMonth;
      }

      this.regenerateDays();
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-wrapper {
  overflow: hidden;

  h3, p {
    margin: 0;
    padding: 0;
  }

  .calendar-header {
    background-color: #3d4852;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    font-weight: 600;
    overflow: hidden;
    position: relative;
    padding: 0;
    width: 100%;

    & > div {
      float: left;
      line-height: 20px;
      padding: 15px;
    }

    .header-title {
      color: #dedede;
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 0;
      text-align: center;
      width: 60%;
    }

    .previous-month,
    .next-month {
      color: #dedede;
      cursor: pointer;
      user-select: none;
      width: 20%;

      &:hover {
        color: #fff;
      }
    }

    .previous-month {
      text-align: left;
    }

    .next-month{
      text-align: right;
    }
  }

  .calendar-weeks {
    background: #fff;
    font-size: 16px;
    overflow: hidden;
    text-align: center;
    width: 100%;
  }

  .item {
    line-height: 70px;
    float: left;
    user-select: none;
    width: 14.285%;
  }

  .calendar-days {
    background: #fff;
    font-size: 16px;
    overflow: hidden;
    text-align: center;
    width: 100%;

    .item {
      position: relative;

      &.current-month {
        &:hover {
          background: #f7f9fb;
          cursor: pointer;
        }
      }

      &:not(.current-month) {
        color: #bebebe;
      }

      .date-number {
        font-size: 16px;
        position: relative;
        z-index: 3;
      }

      .today {
        content: '';
        border: 1px solid #f29543;
        border-radius: 50%;
        height: 36px;
        left: 50%;
        position: absolute;
        margin-left: -18px;
        margin-top: -19px;
        top: 50%;
        width: 36px;
        z-index: 1;
      }
    }
  }
}

@media (max-width: 767px) {
  .calendar-wrapper {
    .calendar-header {
      background: #fff;

      .header-title {
        color: #4a4a4a;
        font-size: 16px;
      }

      .previous-month,
      .next-month {
        color: #4a4a4a;

        &:hover {
          color: #1b1b1b;
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .calendar-wrapper {
    .date-number {
      line-height: 70px;
    }
  }
}

@media screen and (max-width: 767px) {
  .calendar-wrapper {
    .calendar-header {
      & > div {
        padding: 10px 15px;
      }
    }
  }

  .calendar-weeks {
    .item {
      line-height: 60px;
    }
  }

  .calendar-days {
    .item {
      line-height: 42px;

      .date-number {
        line-height: 42px;
      }
    }

  }
}
</style>
