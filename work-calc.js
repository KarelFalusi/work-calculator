let data = [];
let dataFromStorage = localStorage.getItem('info');
if (dataFromStorage) {
    data = JSON.parse(dataFromStorage);
};

let workSelect = document.getElementById("work-select");
let workProgress = document.getElementById("progress");
let timeSelect = document.getElementById("tentacles");
let confirmButton = document.getElementById("confirm-button");
let dateTime = new Date().toLocaleString();

workSelect.addEventListener('change', function () {
    if (workSelect.value === '') {
        console.log('Please choose the workout option.');
    } else {
        console.log('User choice is', workSelect.value);
    }

});

timeSelect.addEventListener('change', function () {
    if (timeSelect.value === '') {
        console.log('Please choose time you worked');
    } else {
        console.log('User worked', timeSelect.value, 'minutes');
    }
});

function work() {
    if (workSelect.value === '' && timeSelect.value === '') {
        console.log('Missing workout method and worked time.');
    } else if (workSelect.value === '') {
        console.log('Please choose the workout method.');
    } else if (timeSelect.value === '') {
        console.log('Please choose the time you worked.');
    } else {
        console.log('User workout option was', workSelect.value, 'And User worked', timeSelect.value, 'minutes');
    }
};


confirmButton.addEventListener('click', function () {
    let object = {
        workOption: workSelect.value,
        progress: workProgress.value,
        time: timeSelect.value,
        dateAndTime: dateTime
    };
    console.log(object);
    data.push(object);
    console.log(data)
    localStorage.setItem('info', JSON.stringify(data))
});
