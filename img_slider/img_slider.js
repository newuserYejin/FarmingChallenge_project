const slider = document.querySelector('.slider');

const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');

const indicatorParents = document.querySelector('.controls ul');

var sectionIndex = 0;

function setIndex(){
    document.querySelector('.controls .selected').classList.remove('selected');
    slider.style.transform = 'translate(' + (sectionIndex) * (-25) + '%)';
}

rightArrow.addEventListener('click',function(){
    sectionIndex = (sectionIndex < 3) ? sectionIndex + 1 :0;
    setIndex();
    indicatorParents.children[sectionIndex].classList.add('selected');      //화살표로 이미지 움직이면 밑에 버튼에 맞춰서 selected추가
});


leftArrow.addEventListener('click',function(){
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 :3;
    setIndex();
    indicatorParents.children[sectionIndex].classList.add('selected');
});


//밑에 버튼

document.querySelectorAll('.controls li').forEach(function(indicator, index){
    indicator.addEventListener('click',function(){
        sectionIndex = index;
        indicator.classList.add('selected');
        setIndex()
    });
});

let pointer = undefined

function move(){
    if(pointer === undefined){
        pointer = setInterval(function() {
            sectionIndex = (sectionIndex < 3) ? sectionIndex + 1 :0;
            setIndex();
            indicatorParents.children[sectionIndex].classList.add('selected');      //화살표로 이미지 움직이면 밑에 버튼에 맞춰서 selected추가
        },2000);
    }
}

move();

function stop(){
    clearInterval(pointer);
    pointer = undefined;

    console.log(pointer);
}

const point = document.querySelector('.controls')

point.addEventListener('mouseenter', function(){
    stop();
})

point.addEventListener('mouseleave',function(){
    move();
})