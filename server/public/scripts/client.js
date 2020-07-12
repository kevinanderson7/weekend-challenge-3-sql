$(document).ready(onReady);

function onReady() {
  $('#js-btn-enter-task').on('click', clickEnterTask);
  $('#todoTableBody').on('click', '.js-btn-delete', clickDeleteTask);
  $('#todoTableBody').on('click', '.js-btn-task-status', clickTaskComplete);
  getTaskData();
  console.log('jq');
}

function clickEnterTask() {
  console.log('clicking enterTask');
  submitTask();
}
function clickDeleteTask() {
  const id = $(this).parent().parent().data('id');
  deleteTask(id);
}

function submitTask() {
  const taskToSend = {
    task: $('.js-task-input').val(),
    task_status: 'incomplete',
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
function clickTaskComplete() {
  const id = $(this).parent().parent().data('id');
  console.log('edit task status', id);

  $(this).addClass('complete');
  updateTaskStatus(id);
}

function updateTaskStatus(taskId) {
  let newTaskStatus = 'complete';

  $.ajax({
    type: 'PUT',
    url: `/todo/${taskId}`,
    data: {
      newTaskStatus,
    },
  })
    .then((response) => {
      getTaskData();
    })
    .catch((error) => {
      console.log('error: ', error);
      alert('did not submit checkbox successfully');
    });
}

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
        if (task.task_status === 'complete') {
          let tableRow = $(`
            <tr class="strikeout">
            <td class="task-box">${task.task}</td>
            <td class="complete-box"><button data-id-task="${task.id}" class="js-btn-task-status btn btn-outline-dark complete-button">
            Complete
          </button></td>
          <td><button class="js-btn-delete btn btn-outline-danger">
            Delete
          </button></td>
          </tr>`);

          tableRow.data('id', task.id);
          $('#todoTableBody').append(tableRow);
        } else {
          let tableRow = $(`
            <tr class="">
            <td class="task-box">${task.task}</td>
            <td class="complete-box"><button data-id-task="${task.id}" class="js-btn-task-status btn btn-outline-success complete-button">
            Complete
          </button></td>
          <td><button class="js-btn-delete btn btn-outline-danger">
            Delete
          </button></td>
          </tr>`);

          tableRow.data('id', task.id);
          $('#todoTableBody').append(tableRow);
        }
      }
    })
    .catch(function (error) {
      console.log('error in task get', error);
    });
}
function deleteTask(taskId) {
  console.log('clicking delete task');

  $.ajax({
    type: 'DELETE',
    url: `/todo/${taskId}`,
  })
    .then((response) => {
      getTaskData();
    })
    .catch((error) => {
      console.log('error: ', error);
      alert('Stuff broke!');
    });
}
