let year = document.getElementById('year');
let month = document.getElementById("month");
const yearValue = parseInt(year.textContent, 10); // 10진수로 변환
let monthValue = parseInt(month.textContent, 10); // 10진수로 변환
let memos = {};

const calender = document.getElementsByClassName("calender");

//로드 됐을때 달력 바로 나타내기
document.addEventListener('DOMContentLoaded', function () {
    Calender();
    addThClickEvent();
});

// 달력 생성 코드
function Calender() {
    calender[0].innerHTML = "";
    const firstDate = new Date(yearValue, monthValue - 1, 1);           //0이 1월, 1이 2월...  month에 해당되는 달의 첫날 구하기
    const lastDate = new Date(yearValue, monthValue, 0);        //0을 넣으면 해당 이전달의 마지막 날 구하기
    const days = lastDate.getDate();        //해당 달의 일 수 구하기
    const firstDate_day = firstDate.getDay();   //첫일의 요일 구하기

    let day = 1;        //const는 한번 선언시 변경 불가. 반복문에서 사용 불가

    for (let i = 0; i < 6; i++) {          //한달에 최대 6주
        let row = "";
        const Row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDate_day) {      // 가장 첫 주에서 시작 요일보다 작을 경우 빈칸
                row += " ";
            } else if (day > days) {
                break;
            } else {
                row += day
                if (j < 6) {
                    row += " "
                }
                day++;
            }
        }

        while (row.split(" ").length < 7) {        // 각 줄의 네모 개수 맞추기
            row += " ";
        }

        if (row.trim() === "") {
            // 마지막 주가 비어있는 경우
            break;
        }
        Row.classList.add('row');

        row.split(" ").forEach(dayString => {
            const dayElement = document.createElement('th');
            dayElement.textContent = dayString.trim();
            Row.appendChild(dayElement);
        });
        calender[0].appendChild(Row);
    }
}


// 월 이동 시키기
function decreaseM() {
    if (monthValue > 1) {
        monthValue--;
        month.textContent = monthValue;
        Calender();
        updateMemoData();
    }
}

function increaseM() {
    if (monthValue < 12) {
        monthValue++;
        month.textContent = monthValue;
        Calender();
        updateMemoData();
    }
}

//메모 추가

document.getElementById("add").addEventListener('click', addList);

function addList() {
    const input = document.getElementById("inner");
    const input_content = input.value.trim();

    const memo_list = document.getElementById("modalContent");

    const real_memo_box = document.createElement('div');
    real_memo_box.classList.add('real_memo_box');

    const memo_list_content = document.createElement('div');
    memo_list_content.classList.add('real_memo');
    memo_list_content.innerHTML = input_content;

    real_memo_box.appendChild(memo_list_content);

    const memo_remove_button = document.createElement('button');
    memo_remove_button.id = "remove";
    memo_remove_button.textContent = "삭제";
    memo_remove_button.addEventListener('click', function () {
        memo_list.removeChild(real_memo_box);
        updateMemoData();
    });

    real_memo_box.append(memo_remove_button);

    memo_list.appendChild(real_memo_box);

    const currentDate = `${yearValue}-${monthValue}-${currentSelectedDay}`;
    if (!memos[currentDate]) {
        memos[currentDate] = [];
    }
    memos[currentDate].push(input_content);


    input.value = "";
}

//모달창

let modal = document.getElementById("memoModal");
let modalDate = document.getElementById("modalDate");
let modalContent = document.getElementById("modalContent");
let closeModal = document.getElementById("closeModal");

// 현재 선택된 날짜
let currentSelectedDay;

function addThClickEvent() {
    let thElements = document.querySelectorAll(".calender th");

    thElements.forEach((th) => {
        th.addEventListener("click", function () {
            let date = parseInt(th.textContent.trim(), 10);
            showMemo(date);
        });
    });
}

function showMemo(date) {
    currentSelectedDay = date;
    const currentDate = `${yearValue}-${String(monthValue).padStart(2, '0')}-${String(currentSelectedDay).padStart(2, '0')}`;
    modalDate.textContent = `${monthValue}월 ${date}일`;

    // 메모 내용이 있으면 메모와 삭제 버튼을 보여주고 없으면 빈 메모 창을 보여줌
    if (memos[currentDate]) {
        modalContent.innerHTML = ''; // 기존 내용 초기화
        memos[currentDate].forEach((memoText) => {
            const real_memo_box = document.createElement('div');
            real_memo_box.classList.add('real_memo_box');

            const memo_list_content = document.createElement('div');
            memo_list_content.classList.add('real_memo');
            memo_list_content.innerHTML = memoText;

            real_memo_box.appendChild(memo_list_content);

            const memo_remove_button = document.createElement('button');
            memo_remove_button.id = "remove";
            memo_remove_button.textContent = "삭제";
            memo_remove_button.addEventListener('click', function () {
                modalContent.removeChild(real_memo_box);
                updateMemoData();
            });

            real_memo_box.append(memo_remove_button);

            modalContent.appendChild(real_memo_box);
        });
    } else {
        modalContent.textContent = '';
    }

    modal.style.display = "block";
}

closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});


function updateMemoData() {
    const currentDate = `${yearValue}-${monthValue}-${currentSelectedDay}`;
    const memo_list = document.getElementById("modalContent");
    const memoContents = memo_list.getElementsByClassName('real_memo');

    memos[currentDate] = [];
    for (let i = 0; i < memoContents.length; i++) {
        memos[currentDate].push(memoContents[i].textContent);
    }
}
