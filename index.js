// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

//returns an array of objects containing each employee data
function createEmployeeRecords(arrays) {
  return arrays.map((array) => createEmployeeRecord(array));
}

//returns an object time in
function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');

  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
}

// TIme out event
function createTimeOutEvent(employee, dateStamp) {
  const dateAndHour = dateStamp.split(' ');
  const date = dateAndHour[0];
  const hour = parseInt(dateAndHour[1], 10);

  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: hour,
    date: date,
  });

  return employee;
}

//Hours worked
function hoursWorkedOnDate(employee, date) {
  const timeInEvent = employee.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employee.timeOutEvents.find(
    (event) => event.date === date
  );

  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}
// wages earned
function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  const payOwed = hoursWorked * employee.payPerHour;
  return payOwed;
}

// total wages for dates worked

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map((event) => event.date);

  const totalWages = datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employee, date);
  }, 0);

  return totalWages;
}

// payroll
function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => {
    return totalPayroll + allWagesFor(employee);
  }, 0);
}





















