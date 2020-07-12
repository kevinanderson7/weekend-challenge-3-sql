$(document).ready(onReady);

function onReady() {
  $('#js-btn-enter-task').on('click', clickEnterTask);
  //   $('#checkbox-input').on('change', updateTaskStatus);
  getTaskData();
  console.log('jq');
}

function clickEnterTask() {
  console.log('clicking enterTask');
  submitTask();
}

function submitTask() {
  const taskToSend = {
    task: $('.js-task-input').val(),
  };
  console.log(taskToSend);
  if (taskToSend.task === '') {
    alert('Please input a task');
  } else {
    $.ajax({
      method: 'POST',
      url: '/todo',
      data: taskToSend,
    })
      .then(function (response) {
        console.log(response);
        getTaskData();
      })
      .catch(function (error) {
        console.log('error in task post', error);
      });
  }
}

function updateTaskStatus() {}

function getTaskData() {
  $.ajax({
    method: 'GET',
    url: '/todo',
  })
    .then(function (response) {
      const listOfTasks = response;
      console.log('server response:', response);

      $('.js-task-input').val('');
      $('#todoTableBody').empty();

      for (let task of listOfTasks) {
        $('#todoTableBody').append(`
            <tr>
            <td>${task.task}</td>
            <td><input type="checkbox" id="checkbox-input"></td>
          </tr>`);
      }
    })
    .catch(function (error) {
      console.log('error in task get', error);
    });
}

function updateRank(id, taskStatus) {
  console.log('RANK SAVE - id:', id);
  console.log('RANK SAVE - rank:', taskStatus);
  $.ajax({
    type: 'PUT',
    url: `/todo/taskStatus/${id}`,
    data: {
      taskStatus,
    },
  })
    .then((response) => {
      getMusicData();
    })
    .catch((err) => {
      console.log('err: ', err);
      alert('Stuff broke!!!');
    });
}
