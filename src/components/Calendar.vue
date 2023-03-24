<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="previousMonth">Prev</button>
      <div class="current-month" ref="currentMonth">{{ monthYear }}</div>
      <div class="current-time">
        <p>In London</p>
        {{ londonTime }}
      </div>
      <button @click="nextMonth">Next</button>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeks" :key="week">
          <td v-for="day in week" :key="day" @click="selectDay(day)">
            <div class="day-number">{{ new Date(day).getDate() }}</div>

            <div class="day-events">
              <div
                v-for="event in eventsOnDay(day)"
                :key="event.id"
                class="event"
              >
                <div>{{ event.title }}</div>
                <div class="event-time">
                  {{ formatTime(event.start) }} - {{ formatTime(event.end) }}
                </div>
                <button @click="editEvent(event)">Edit</button>
              </div>
            </div>
            <button @click="addNewEvent(day)">Add Event</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal-backdrop" v-if="showModal" @click="closeModal"></div>
    <div v-if="showModal" class="modal">
      <button class="modal-close" @click="closeModal">X</button>
      <div class="modal-content">
        <h2>
          Add Event for
          {{
            selectedDay && selectedDay instanceof Date
              ? selectedDay.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })
              : ""
          }}
        </h2>
        <input type="text" v-model="newEventTitle" placeholder="Event Titleh" />
        <div>
          <label for="start-time">Start Time:</label>
          <input type="time" id="start-time" v-model="newEventStart" />
        </div>
        <div>
          <label for="end-time">End Time:</label>
          <input type="time" id="end-time" v-model="newEventEnd" />
        </div>
        <button @click="saveEvent">Save</button>
        <button class="delete" @click="deleteEvent">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  setHours,
  format,
  parseISO,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
const timezone = "Europe/London";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Calendar",

  data() {
    return {
      currentMonth: new Date(),
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      currentTime: null,
      selectedDay: new Date(),
      selectedEvent: null,
      newEventTitle: "",
      newEventStart: "",
      newEventEnd: "",
      events: JSON.parse(localStorage.getItem("events")) || [
        {
          id: 1,
          title: "Lunch",
          start: new Date(2023, 2, 26, 12, 0),
          end: new Date(2023, 2, 26, 13, 0),
        },
      ],
      showModal: false,
    };
  },
  mounted() {
    const events = JSON.parse(localStorage.getItem("events"));
    if (events) {
      this.events = events;
    }
    setInterval(() => {
      const londonTime = utcToZonedTime(new Date(), timezone);
      this.currentTime = format(londonTime, "h:mm:ss a", {
        timeZone: timezone,
      });
    }, 60000);
  },
  computed: {
    weeks() {
      const start = startOfWeek(startOfMonth(this.currentMonth));
      const end = endOfWeek(endOfMonth(this.currentMonth));
      const date = start;
      const weeks = [];
      while (date <= end) {
        const week = [];
        for (let i = 0; i < 7; i++) {
          week.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        weeks.push(week);
      }
      return weeks;
    },
    monthYear() {
      return format(this.currentMonth, "MMMM yyyy");
    },
    londonTime() {
      const now = new Date();
      const londonTime = utcToZonedTime(now, timezone);
      return format(londonTime, "h:mm a ", { timeZone: timezone });
    },
  },
  methods: {
    formatTime(time) {
      const date = new Date(time);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    },
    findEvent(id) {
      return this.events.find((event) => event.id === id);
    },
    addNewEvent(day) {
      this.selectedDay = day;
      this.selectedEvent = null;
      this.newEventTitle = "";
      this.newEventStart = "";
      this.newEventEnd = "";
    },

    saveEvent() {
      const start = setHours(this.selectedDay, parseInt(this.newEventStart));
      const end = setHours(this.selectedDay, parseInt(this.newEventEnd));
      if (this.selectedEvent) {
        this.selectedEvent.title = this.newEventTitle;
        this.selectedEvent.start = start;
        this.selectedEvent.end = end;
      } else {
        const id = Math.max(...this.events.map((e) => e.id)) + 1;
        this.events.push({ id, title: this.newEventTitle, start, end });
      }
      localStorage.setItem("events", JSON.stringify(this.events));
      this.showModal = false;
    },

    editEvent(event) {
      const start = parseISO(event.start);
      const end = parseISO(event.end);
      if (isNaN(start) || isNaN(end)) {
        console.error("Invalid time value");
        return;
      }
      this.selectedEvent = event;
      this.newEventTitle = event.title;
      this.newEventStart = format(start, "HH:mm");
      this.newEventEnd = format(end, "HH:mm");
      this.showModal = true;
    },

    deleteEvent(event) {
      this.selectedEvent = event;
      if (this.selectedEvent) {
        const index = this.events.findIndex(
          (event) => event.id === this.selectedEvent.id
        );
        this.events.splice(index, 1);
        localStorage.setItem("events", JSON.stringify(this.events));
        this.selectedEvent = null;
      }
      this.showModal = false;
    },

    eventsOnDay(day) {
      const events = this.events.filter((event) => {
        const eventDate = new Date(event.start);
        return (
          eventDate.getFullYear() === day.getFullYear() &&
          eventDate.getMonth() === day.getMonth() &&
          eventDate.getDate() === day.getDate()
        );
      });
      return events;
    },
    formatTimeInput(time) {
      const date = new Date();
      const [hours, minutes] = time.split(":");
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    },
    showModalWindow() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },
    combineDateTime(date, time) {
      const [hours, minutes] = time.split(":");
      return setHours(date, hours, minutes);
    },
    previousMonth() {
      this.currentMonth = addMonths(this.currentMonth, -1);
    },
    nextMonth() {
      this.currentMonth = addMonths(this.currentMonth, 1);
    },

    selectDay(day) {
      this.selectedDay = new Date(day);
      this.selectedEvent = null;
      this.showModal = true;
    },
    addEvent(day) {
      this.selectedDay = day;
    },
  },
};
</script>

<style scoped>
.calendar {
  font-family: Arial, sans-serif;
  min-width: 610px;
  width: 80vw;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.current-month {
  font-size: 24px;
  font-weight: bold;
  color: #a5639f;
}

.current-time {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 16px;
  color: #a5639f;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 10px;
  text-align: center;
}

th {
  color: #a5639f;
  background-color: #f5f5f5;
  border-bottom: 2px solid #ccc;
}

tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}

.day-number {
  font-size: 20px;
  color: #a5639f;
  margin-bottom: 5px;
}

.event {
  background-color: #ffe6e6;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
}

.event-time {
  font-size: 14px;
  color: #a5639f;
}

button {
  background-color: #a5639f;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
}

input[type="text"],
input[type="time"] {
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
  font-size: 16px;
}

input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(0.7);
}

h2 {
  font-size: 24px;
  font-weight: bold;
  color: #a5639f;
  margin-bottom: 10px;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 11;
}

.modal-content {
  padding: 20px;
}
.modal-close {
  position: absolute;
  top: -10px;
  right: -5px;
  font-size: 20px;
  font-weight: bold;
  color: #a5639f;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.modal-close:hover {
  color: red;
}
.delete {
  margin-left: 20px;
}

@media (max-width: 768px) {
  .calendar {
    padding: 10px;
  }
  .current-month {
    font-size: 20px;
  }
  .current-time {
    font-size: 14px;
  }
  th,
  td {
    padding: 5px;
  }
  .day-number {
    font-size: 16px;
  }
  .event {
    font-size: 14px;
  }
  button {
    font-size: 14px;
    padding: 5px 10px;
  }
  input[type="text"],
  input[type="time"] {
    font-size: 14px;
    padding: 5px;
    margin-bottom: 5px;
  }
  h2 {
    font-size: 20px;
  }
}
</style>
