var app = new Vue({
	el: "#app",
	data: {
		showMode: "departure",
		schedule: [],
		delayList: [],
		direction: null,
		search: "",
		startDate: new Date(),
		endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
	},
	methods: {
		loadSchedule: function() {
			var self = this;
			if (self.showMode === "departure") {
				self.direction = "departure";
			} else if (self.showMode === "arrival") {
				self.direction = "arrival";
			} else {
				self.direction = "all";
			}
			axios
				.get("http://localhost:11111/bitrix/timetable/", {
					params: {
						direction: self.direction,
						dateStart: self.startDate,
						dateEnd: self.endDate,
						perPage: 9999,
						page: 0,
						locale: "ru"
					}
				})
				.then(function(response) {
					self.schedule = [];
					self.schedule = response.data.items;
					self.delayList = self.schedule.filter(function(s) {
						return s.t_otpr > s.t_st;
					});
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		editDate: function(date) {
			date.toLocaleString("ru", self.options);
		}
	},
	created: function() {
		var self = this;
		self.loadSchedule();
	},
	computed: {
		filteredList() {
			var self = this;
			var filterObj =
				this.showMode === "delay" ? this.delayList : this.schedule;
			if (this.search === "") {
				return filterObj;
			}
			return filterObj.filter(function(item) {
				return item.flt
					.toLowerCase()
					.includes(self.search.toLowerCase());
			});
		}
	}
});
