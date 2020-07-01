/**
 * 导航栏按钮
 */
let isClick = true;
$('.list-button').on('click', function () {
    if (isClick) { // 是否点击导航栏按钮
        isClick = false;
        $.each($(this).children(), function (i, n) {
            if (i === 0) {
                $(n).addClass('spa1');
            } else if (i === 1) {
                $(n).hide();
            } else {
                $(n).addClass('spa3');
            }
        });
        $('nav').height('330px')
    } else {
        isClick = true;
        $.each($(this).children(), function (i, n) {
            if (i === 0) {
                $(n).removeClass('spa1');
            } else if (i === 1) {
                $(n).show();
            } else {
                $(n).removeClass('spa3');
            }
        });
        $('nav').height('60px')
    }
});

/**
 * 导航栏
 */
$('.nav-list').on('click', 'li', function () {
    // $('.list-button').click()
});

// 鼠标移入
$('.nav-list').on('mousemove', 'li', function () {
    let left = $(this).position().left + parseInt($(this).css('marginLeft'));
    $('.nav-bar').css({
        'left': left,
        'width': '36px',
        'opacity': '1',
    });
})

// 鼠标移出
$('.nav-list').on('mouseout', 'li', function () {
    $('.nav-bar').css({
        'width': '0px',
        'opacity': '0',
    });
})

/**
 * 监听页面滚动
 */
$(window).on('scroll', function () {
    if ($(this).scrollTop() > $('nav').height()) {
        $('nav').addClass('nav-shadow');
    } else {
        $('nav').removeClass('nav-shadow');
    }
})