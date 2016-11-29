// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const cpuStat = require('cpu-stat');
//by default returns cpu usage percent for all cores over a period of the next 1000ms

const cpuTimeIntervall=1000;

 var vm = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!',
    avarageClock: cpuStat.avgClockMHz(),
    cpuUsage:'',
    totalCores:cpuStat.totalCores(),
    counter: 0,
    test:0
  },
  methods: {
    incrementTest: function () {
      this.message = this.message.split('').reverse().join('')
      this.test=this.test+1;
    }
  },
   created:function() {
      function monitorCpuUsage(){
        var getCpuStates=function(err, percent, seconds) {
          if (err) {
            return console.log(err);
          }
          vm.cpuUsage=percent;
          vm.counter=vm.counter+1;
        }
        cpuStat.usagePercent(getCpuStates,cpuTimeIntervall);
      }
      monitorCpuUsage();
        setInterval(() => {
           monitorCpuUsage();
        },cpuTimeIntervall);
    }
})
 //
