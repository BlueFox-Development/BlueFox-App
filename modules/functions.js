const moment = require('moment');
const axios = require('axios');

module.exports = {

    wait(ms) {
        let start = new Date().getTime();
        let end = start;
        while (end < start + ms) {
            end = new Date().getTime()
        }
        return;
    },

    initHearbeat(interval=15000) {
        let that = this;
        this.heartbeat();
        setInterval(function () {
            that.heartbeat();
        }, interval)
    },

    heartbeat() {
        axios.post('http://api.bluefoxhost.com:4000/v1/host/app/heartbeat')
            .then(function (response) {
                if (response.status === 200) console.log("Successful heartbeat");
                else console.error("Unsuccessful heartbeat");
            })
            .catch(function (error) {
                console.error(`Heartbeat skipped: (${error})`);
            });
    }

}
