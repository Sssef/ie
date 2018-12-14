(function() {
  const $d = $(document);
  const $menu = $(".st-menu");
  const $menuBtn = $(".hamburger");

  $d.on("click", ".hamburger", function() {
    $(this).toggleClass("is-active");
    $menu.toggleClass("active");
  });

  $("#callback-phone, #callback-modal-phone").mask("(999) 999 99 99");

  $d.on("click", ".st-mobile-nav__item", function() {
    
    if($menu.hasClass("active") === true && $menuBtn.hasClass("is-active") === true) {
      $menu.removeClass("active");
      $menuBtn.removeClass("is-active");
    }

    return false;
    
  });

  $('a[href*="#"]').mPageScroll2id();

  $d.on("click", "#callbackBtn", function() {
    $(".st-modal").addClass("active");
  });

  $d.on("click", ".st-close", function() {
    $(this).closest(".st-modal").removeClass("active");
  });

  $('#seePhotos').magnificPopup({
    items: [
      {
       src: "/wp-content/themes/ie/img/VEGA-min.jpg",
       type: "image"
      },
     {
       src: "/wp-content/themes/ie/img/ie_photo_1.jpg",
       type: "image"

     },
     {
      src: "/wp-content/themes/ie/img/ie_photo_2.jpg",
      type: "image"
     },
    ],
    gallery:{
      enabled:true
    },
    type: "image"
  });


    const companySwiper = new Swiper("#companySlider", {
      // Optional parameters
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoplay: true,
      // Navigation arrows
      navigation: {
        nextEl: ".st-next",
        prevEl: ".st-prev"
      },
    });

  const partnersSwiper = new Swiper("#partnersSlider", {
    // Optional parameters
    loop: true,
    slidesPerView: 4,
    spaceBetween: 30,
    // Navigation arrows
    navigation: {
      nextEl: ".st-next",
      prevEl: ".st-prev"
    },
    breakpoints: {
      // when window width is <= 480px
      1440: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      // when window width is <= 640px
      992: {
        slidesPerView: 1,
        spaceBetween: 30
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 15
      }
    }
  });

})();
