// 导入导航栏js
import './nav'

// 轮播图
let mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    autoplay: {
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },

    // 前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // 分页器
    pagination: {
        el: '.swiper-pagination',
        clickable :true,
    },
})