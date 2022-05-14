const moment = require("moment");

class Methods {
  //get total time work
  getTotalWorkTime = (startTime, endTime) => {
    let end = moment(endTime);
    let start = moment(startTime);
    let duration = moment.duration(end.diff(start));
    let times = duration.asHours();
    return times;
  };

  //get salary
  getSalary = (staff, month) => {
    const workTimes = staff.workTime;
    const offTimes = staff.offTime;
    const salaryScale = staff.salaryScale;

    let overTime = 0;
    let shortTime = 0;
    let salary = 0;
    const listDayLeave = [];

    //get list annual leave by month
    offTimes.forEach((off) => {
      const listOffTimes = off.offTime.split(",");
      const timeLeave = off.offHours;
      listOffTimes.forEach((date) => {
        if (Number(date.slice(3, 5)) === Number(month)) {
          listDayLeave.push({ date: date, hours: timeLeave });
        }
      });
    });

    //get over Time && short Time
    workTimes.forEach((work) => {
      let leaveTimeOfDate = 0;
      let WorkTimeOfDate = 0;

      if (work.endTime.getMonth() + 1 === Number(month)) {
        listDayLeave.forEach((date) => {
          if (Number(date.date.slice(0, 2)) === work.endTime.getDate()) {
            leaveTimeOfDate += date.hours;
          }
        });
        let total = this.getTotalWorkTime(work.startTime, work.endTime);
        WorkTimeOfDate += total;

        overTime += WorkTimeOfDate <= 8 ? 0 : WorkTimeOfDate - 8;
        shortTime +=
          WorkTimeOfDate + leaveTimeOfDate >= 8
            ? 0
            : 8 - (WorkTimeOfDate + leaveTimeOfDate);
      }
    });

    if (month) {
      salary = (
        salaryScale * 3000000 +
        (overTime - shortTime) * 200000
      ).toFixed(0);
    }

    return salary;
  };

  getTotalTimeLastDate = (workTimes, offTimes) => {
    const listDayLeave = [];
    let total = 0;

    //get list leave date
    if (offTimes.length > 0) {
      offTimes.forEach((off) => {
        const listOffTime = off.offTime.split(",");
        let timeLeave = off.offHours;
        listOffTime.forEach((date) => {
          listDayLeave.push({ date: date, hours: timeLeave });
        });
      });
    }
    //loop for workTimes have leave date, without last element
    if (workTimes.length > 0) {
      for (let i = 0; i < workTimes.length - 1; i++) {
        total += this.getTotalWorkTime(
          workTimes[i].startTime,
          workTimes[i].endTime
        );
        if (
          workTimes[i].endTime.getDate() !== workTimes[i + 1].endTime.getDate()
        ) {
          let dateOfLastWorkTime = workTimes[i].endTime.getDate();
          let monthOfLastWorkTime = workTimes[i].endTime.getMonth() + 1;

          listDayLeave.forEach((date) => {
            if (
              Number(date.date.slice(0, 2)) == dateOfLastWorkTime &&
              Number(date.date.slice(3, 5)) == monthOfLastWorkTime
            ) {
              total += date.hours;
            }
          });
        }
      }

      //totalTime of last element
      let time = this.getTotalWorkTime(
        workTimes[workTimes.length - 1].startTime,
        workTimes[workTimes.length - 1].endTime
      );
      total += time;
    }
    return total;
  };

  getTotalTimesOfDay = (workTimes) => {
    let totalTime = 0;
    let listWorkTime = [];
    const today = new Date();

    workTimes.forEach((workTime) => {
      if (
        workTime.endTime.getDate() === today.getDate() &&
        workTime.endTime.getMonth() === today.getMonth()
      ) {
        listWorkTime.push(workTime);
        let total = this.getTotalWorkTime(workTime.startTime, workTime.endTime);
        totalTime += total;
      }
    });

    return { listWorkTime, totalTime };
  };
}

module.exports = new Methods();
