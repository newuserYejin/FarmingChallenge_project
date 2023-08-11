
const button = document.querySelector(".login_button");

button.addEventListener("click", function (e) {
    e.preventDefault();

    var input_id = document.getElementById("input_id").value;
    var input_pw = document.getElementById("input_pw").value;
    var real_id = "farmming";
    var real_pw = "1234";

    if (input_id == null || input_id == "", input_pw == null || input_pw == "") {
        M.toast({
            html: '아이디와 비밀번호를 모두 입력해주세요!'
        });
        console.log("아이디 :" + input_id);
        console.log("비번: " + input_pw);
        return false;
    } else if (input_id !== real_id || input_pw !== real_pw) {
        M.toast({
            html: '아이디와 비밀번호를 확인해주세요!'
        });
        return false;
    } else {
        M.toast({
            html: '로그인 되었습니다'
        });
        return false;
    }

})









