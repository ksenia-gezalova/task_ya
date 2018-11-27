var app = new Vue({
    el: '#app',
    data: {
        showMode: 'departure',
        schedule: [],
        delayList: [],
        direction: null,
        search: ''
    },
    methods: {
        loadSchedule: function () {
            var self = this;
            if (self.showMode === 'departure') {
                self.direction = 'departure';
            } else if (self.showMode === 'arrival') {
                self.direction = 'arrival'
            } else {
                self.direction = 'all'
            }
            axios.get('http://localhost:11111/bitrix/timetable/', {
                    params: {
                        direction: self.direction,
                        dateStart: '2018-11-27T18:00:00+03:00',
                        dateEnd: '2018-11-27T20:00:00+03:00',
                        perPage: 9999,
                        page: 0,
                        locale: 'ru'
                    }
                })
                .then(function (response) {
                    self.schedule = response.data.items;
                    self.delayList = self.schedule.filter(function (s) {
                        return s.t_otpr > s.t_st;
                    });
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    },
    created: function () {
        var self = this;
        this.loadSchedule();
    }
})