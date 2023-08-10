function fetchStudentList() {
    if (document.hidden) return; // 페이지가 숨겨져 있다면 아무 것도 하지 않음

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/student/getlist', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var students = response.data;
            var table = document.getElementById('student-table');
            table.innerHTML = ""; // 테이블을 비웁니다.

            var thead = document.createElement('thead');
            var headerRow = document.createElement('tr');
            ['학생 ID', '로그인 ID', '비밀번호', '이메일', '전화번호', '액션'].forEach(function (header) {
                var th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            var tbody = document.createElement('tbody');
            students.forEach(function (student) {
                var tr = document.createElement('tr');
                [student.studentId, student.loginId, student.loginPwd, student.studentEmail, student.studentPhoneNumber].forEach(function (property) {
                    var td = document.createElement('td');
                    td.textContent = property;
                    tr.appendChild(td);
                });

                // 여기에서 버튼을 추가합니다.
                var actionTd = document.createElement('td');
                var updateBtn = document.createElement('button');
                updateBtn.textContent = '업데이트';
                updateBtn.className = 'btn btn-primary'; // 부트스트랩 클래스
                updateBtn.onclick = function() { showUpdateModal(student); }; // showUpdateModal 함수 호출
                var deleteBtn = document.createElement('button');
                deleteBtn.textContent = '삭제';
                deleteBtn.className = 'btn btn-danger ml-2'; // 부트스트랩 클래스
                deleteBtn.onclick = function() { deleteStudent(student.studentId); }; // deleteStudent 함수 호출
                actionTd.appendChild(updateBtn);
                actionTd.appendChild(deleteBtn);
                tr.appendChild(actionTd);

                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
        }
    };
    xhr.send();
}

// 페이지가 로드되면 학생 명단을 가져옵니다.
window.onload = function () {
    fetchStudentList();

    // 5초마다 명단을 새로 가져옵니다.
    setInterval(fetchStudentList, 5000);
};

function submitForm() {
    var form = document.getElementById('signupForm');
    var student = {
        loginId: form.loginId.value, // 수정된 부분
        loginPwd: form.loginPwd.value,
        studentEmail: form.studentEmail.value,
        studentPhoneNumber: form.studentPhoneNumber.value,
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/student', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var response = JSON.parse(xhr.responseText);
            if (response.resultCode === "ACK-OK / Data" || response.resultCode === "resultCode-OK") {
                alert('가입이 성공적으로 완료되었습니다.');
                window.location.href = 'index.html';
            } else {
                alert('오류가 발생했습니다. ' + response.resultDescription);
            }
        }
    };

    xhr.send(JSON.stringify({ data: student }));
}

function showUpdateModal(student) {
  var form = document.getElementById('updateForm');
  // studentId를 숨겨진 입력 필드에 저장
  form.updateStudentId.value = student.studentId;

  form.updateLoginId.value = student.loginId;
  form.updateLoginPwd.value = student.loginPwd;
  form.updateStudentEmail.value = student.studentEmail;
  form.updateStudentPhoneNumber.value = student.studentPhoneNumber;

  // 모달을 보여줍니다.
  $('#updateModal').modal('show');
}

function submitUpdate() {
  // 폼에서 업데이트할 데이터를 가져옵니다.
  var form = document.getElementById('updateForm');
  var updatedData = {
    studentId: form.updateStudentId.value,
    loginId: form.updateLoginId.value,
    loginPwd: form.updateLoginPwd.value,
    studentEmail: form.updateStudentEmail.value,
    studentPhoneNumber: form.updateStudentPhoneNumber.value,
  };

  // 서버로 업데이트 요청을 보냅니다.
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', '/api/student', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // 성공하면 모달을 닫고 명단을 다시 불러옵니다.
      $('#updateModal').modal('hide');
      fetchStudentList();
    }
  };
  xhr.send(JSON.stringify({ data: updatedData }));
}

function deleteStudent(studentId) {
  // 사용자에게 삭제 확인을 받습니다.
  var isConfirmed = confirm("해당 학생 정보를 삭제하시겠습니까?");
  if (!isConfirmed) return;

  // 서버로 삭제 요청을 보냅니다.
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', '/api/student/' + studentId, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // 성공하면 명단을 다시 불러옵니다.
      fetchStudentList();
    } else if (xhr.readyState === 4) {
      // 실패하면 오류 메시지를 보여줍니다.
      alert('학생 정보 삭제에 실패하였습니다.');
    }
  };
  xhr.send();
}
