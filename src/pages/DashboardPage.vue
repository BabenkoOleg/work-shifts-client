<template>
  <div class="dashboard-page">
    <div class="calendar">
      <calendar></calendar>
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue';

export default {
  components: {
    Calendar,
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  max-width: 1000px;
  margin: 0 auto;
}

@media (max-width: 767px) {
  .calendar {
    width: 100%;
  }
}
</style>
