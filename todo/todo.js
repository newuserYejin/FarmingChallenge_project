// 할일의 난이도 설정 버튼 불러오기
const levelButtons = document.querySelectorAll('.level_buttons > .level_button');

// 어떤 level이 선택 됐는지 표시하기
levelButtons.forEach(button => {
  button.addEventListener('click', () => {
    // 모든 버튼에서 'selected' 클래스 제거
    levelButtons.forEach(btn => {
      btn.classList.remove('selected');
    });

    // 현재 클릭한 버튼에 'selected' 클래스 추가
    button.classList.add('selected');
  });
});

// 할일 추가하기
document.getElementById("add").addEventListener('click',addList);
// 아이디 add에 이벤트 리스너 부여하기

function addList(){
    const input = document.getElementById("inner");
    const content = input.value.trim(); 
    // 문자열 앞뒤 공백 제거
    const list_box = document.getElementById("list_box");

    if(content == ''){
        alert('할 일을 입력해주세요');
        return;
    }
    const level = document.querySelectorAll('.level_buttons > .level_button');
    let select_level = '낮음'; //내가 선택한 레벨의 정보가 들어갈 변수

    level.forEach(button => {       // 하위 요소들이 리스트로 반환되는데 그에 대해서 하나씩 불러오는 것. forEach
        if (button.classList.contains('selected')){     // 선택된 요소는 selected로 표현될 것이기 떄문에 selected인것 찾기
            select_level = button.id;           // 찾았으면 해당 id 레벨정보에 저장
        }
    });

    console.log(select_level);

    const List_Item = document.createElement('div');
    List_Item.classList.add('box','content');

    const check = document.createElement('input')
    check.type = 'checkbox';
    List_Item.appendChild(check);

    const task_content = document.createElement('div');
    task_content.innerHTML = content;
    List_Item.appendChild(task_content);

    const task_level = document.createElement('div');
    task_level.classList.add('box','task_level');

    if (select_level == 'low'){
        task_level.innerHTML = '낮음';
    }else if(select_level == 'middle'){
        task_level.innerHTML = '보통';
    }else if(select_level == 'high'){
        task_level.innerHTML = '높음';
    }else if(select_level == 'very_high'){
        task_level.innerHTML = '매우 높음';
    }else{
        task_level.innerHTML = '';
    }
    List_Item.appendChild(task_level);

    list_box.appendChild(List_Item);

    input.value = '';
}

// 정렬

let allButton = document.getElementById("all");
let doneButton = document.getElementById("done");
const notDoneButton = document.getElementById("notdone");

allButton.addEventListener('click', Filtering);
doneButton.addEventListener('click', Filtering);
notDoneButton.addEventListener('click', Filtering);


function Filtering(){
    const allItems = document.querySelectorAll('.list_box > .content');     // 전체 일때는 list_box의 모든 content보여주기
    const doneItems = document.querySelectorAll('.list_box > .content > input:checked');        // 완료 일때는 list_box의 check 된 content보여주기
    const notDoneItems = document.querySelectorAll('.list_box > .content > input:not(:checked)');

    if (allButton.classList.contains('selected')) {
        // '전체' 버튼을 클릭한 경우
        allItems.forEach(item => {
          item.style.opacity = 1;
          item.style.pointerEvents = 'auto';
        });
      } else if (doneButton.classList.contains('selected')) {
        // '완료' 버튼을 클릭한 경우
        allItems.forEach(item => {
          item.style.opacity = 0;
          item.style.pointerEvents = 'none';
        });
        doneItems.forEach(item => {
          item.parentNode.style.opacity = 1;
          item.parentNode.style.pointerEvents = 'auto';
        });
      } else if (notDoneButton.classList.contains('selected')) {
        // '미완료' 버튼을 클릭한 경우
        allItems.forEach(item => {
          item.style.opacity = 0;
          item.style.pointerEvents = 'none';
        });
        notDoneItems.forEach(item => {
          item.parentNode.style.opacity = 1;
          item.parentNode.style.pointerEvents = 'auto';
        });
      }
}

const orderby_Buttons = document.querySelectorAll('.orderby_buttons > .button_state');

orderby_Buttons.forEach(button => {
    button.addEventListener('click', () => {
      // 모든 버튼에서 'selected' 클래스 제거
      orderby_Buttons.forEach(btn => {
        btn.classList.remove('selected');
      });
  
      // 현재 클릭한 버튼에 'selected' 클래스 추가
      button.classList.add('selected');
      Filtering();
    });
  });

  allButton.classList.add('selected');


