$(document).ready(onReady);

function onReady() {
  $('#js-btn-enter-task').on('click', clickEnterTask);
  $('#todoTableBody').on('click', '.js-btn-delete', clickDeleteTask);
  $('#todoTableBody').on('click', '.js-btn-task-status', clickTaskComplete);
  getTaskData();
  console.log('jq');
}

// function clickingCheckbox() {
//   console.log('clicking checkbox');
// }
function clickEnterTask() {
  console.log('clicking enterTask');
  submitTask();
}
function clickDeleteTask() {
  // console.log($(this).parent().parent().data('id'));

  const id = $(this).parent().parent().data('id');
  deleteTask(id);
}

// function clickCompleteTask() {
//     // console.log($(this).parent().parent().data('id'));

//     const id = $(this).parent().parent().data('id');
//     deleteTask(id);
//   }

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
function clickTaskComplete() {
  const id = $(this).parent().parent().data('id');
  console.log('edit task status', id);
  updateTaskStatus(id);

  //   let newTaskStatus = 'complete';
  //   console.log('newTaskStatus: ', newTaskStatus);

  //   const id = $(this).data('idTask');
}
function updateTaskStatus(taskId) {
  //   if (newTaskStatus === 'complete') {
  //     console.log(newTaskStatus);

  let newTaskStatus = 'complete';
  //   } else {
  //     newTaskStatus = 'incomplete';
  //   }
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
        let tableRow = $(`
            <tr>
            <td>${task.task}</td>
            <td><button data-id-task="${task.id}" class="js-btn-task-status">
            Complete?
          </button></td>
          <td><button class="js-btn-delete">
            Delete
          </button></td>
          </tr>`);

        tableRow.data('id', task.id);
        $('#todoTableBody').append(tableRow);
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
// function updateRank(id, taskStatus) {
//   console.log('RANK SAVE - id:', id);
//   console.log('RANK SAVE - rank:', taskStatus);
//   $.ajax({
//     type: 'PUT',
//     url: `/todo/taskStatus/${id}`,
//     data: {
//       taskStatus,
//     },
//   })
//     .then((response) => {
//       getMusicData();
//     })
//     .catch((err) => {
//       console.log('err: ', err);
//       alert('Stuff broke!!!');
//     });
// }
