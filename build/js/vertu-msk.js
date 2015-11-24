(function($) {

  $(function(){


    (function() {
      $('footer').on('click', '.footer-m__sm', function(){
        var $this = $(this);
        $this.footerMenu();
      });
      $.fn.footerMenu = function(){
        var $this = $(this);
        $this
            .next()
              .slideToggle();
        $this
          .toggleClass('open');
      }
    })();


    // Новинки в каталоге
    var containerId = '#new-catalog__container';
    var tabsId = '#new-catalog';

    $(function(){
      // Preload tab on page load
      if ( $(tabsId + ' li.current a').length > 0 ) {
        loadTab($(tabsId + ' li.current a'));
      }
      $('.new-catalog').on('click', tabsId + ' a', function(){
        if ( $(this).parent().hasClass('current') ) { return false; }
        $(tabsId + ' li.current').removeClass('current');
        $(this).parent().addClass('current');
        var $winwidth = $(window).width();
        $(window).on('resize', function(){
          var $winwidth = $(window).width();
        });
        // смена категории таба по кликнутой выпадахе
        var $this = $(this),
        $dataItem = $this.data('item');
        $('.tabs__sm').text($dataItem);
        if ($winwidth < 768) {
          $('.tabs').slideToggle();
        }
        loadTab($(this));
        return false;
      });
    });


    function loadTab(tabObj) {
      if( !tabObj || !tabObj.length ) { return; }
      $(containerId).addClass('loading');
      //$(containerId).fadeOut('fast');
      $(containerId).load(tabObj.attr('href'), function(){
        $(containerId).removeClass('loading');
        $(containerId).fadeIn('fast');
        $('.new-catalog__slider').slick({
          arrows: true,
          centerMode: true,
          slidesToShow: 4,
          dots: true,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 900,
              settings: {
                centerMode: false,
                slidesToShow: 1,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                centerMode: false,
                slidesToShow: 1,
                dots: false
              }
            }
          ]
        });
        $('.service-slider').slick({
          arrows: true,
          // centerMode: true,
          slidesToShow: 3,
          dots: false,
          arrows: false,
          responsive: [
            {
              breakpoint: 1140,
              settings: {
                centerMode: false,
                slidesToShow: 1
              }
            }
          ]
        });
      });
    }


    (function() {
      $('.new-catalog').on('click', '.tabs__sm', function(){
        $('.tabs').slideToggle();
      });
    })();

    $('.main-slider__slick').slick({
      dots : true
    });



    $('.js-modal').on('click', function(){
      $('.box-modal').arcticmodal();
    });



    $('.js-service').on({
      mouseenter: function() {
        $(this).parent().addClass('active')
      }, 
      mouseleave: function() {
        $(this).parent().removeClass('active')
      }
    })


      $.fn.fullTxt = function() {
        var $this = $(this);
        $('.about__info__txt--full').slideToggle();
        this.toggleClass('active')
      };

      $('.about__info').on('click', '.plus', function(){
        var $this = $(this);
        $this.fullTxt();
      });

      // slider for mobile view about team
      $('.team__slider').slick({
        slidesToShow: 5,
        dots: false,
        arrows: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          },
          {
            breakpoint: 1010,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 1140,
            settings: {
              slidesToShow: 3
            }
          }
        ]
      });




    // tabs for service-item
    // show first div 
    $('.js-tab-item')
      .first()
        .addClass('js-tab-item--visible');
    $('.js-service-tabs-lnk')
      .first()
        .addClass('active');

    // изменение высоты блока с подложками при перещелкивании табов
    var $tabHeight = $('.js-tab-item--visible').height();
    $('.js-height').css('height', $tabHeight);
    $('.service-item__tabs').css('height', $tabHeight + 200 + 'px');

    $('.service-item__tabs').on('click', '.js-service-tabs-lnk', function(){
      var $tabHeight = $('.js-tab-item--visible').height();
      $('.service-item__tabs').css('height', $tabHeight + 200 + 'px');
    });

    $(window).on('resize', function(){
      var $tabHeight = $('.js-tab-item--visible').height();
      $('.service-item__tabs').css('height', $tabHeight + 200 + 'px');
    });


    $('.js-service-tabs-lnk').on('click', function() {
      $this = $(this);
      $('.js-service-tabs-lnk')
        .removeClass('active');
      $(this)
        .addClass('active');
    });

    $('.js-service-tabs-lnk').on('click', function() {
      var $this = $(this);
      $this.tabs();
    });

    $.fn.tabs = function() {
      // take a data-target in clicked tab
      var $tabResult = $(this).data('target');
      var $this = $(this);
      // remove all visible
      $('.js-tab-item')
        .removeClass('js-tab-item--visible');
      // show div with the same data-result as menu data-target
      $this
        .parents('.service-item__tabs')
          .find('.js-tab-item[data-result="'+ $tabResult +'"]')
            .addClass('js-tab-item--visible');
      var $contactsHeight = $('.js-tab-item--visible').height();
      $('.js-height').css('height', $contactsHeight);
    };

    // раскрашивание псевдотаблицы в разные цвета по клику
    $('.service-tabs__item__col').on('click', function(){
      var $this = $(this);
      $this
        .children()
          .toggleClass('active');
      $this
        .toggleClass('active');
    });

    // выпадающий список моделей на service-item
    $.fn.modelChose = function() {
      var firstItem = $(this).children().data('item');
      $('.service-tabs-lnk__sm').text(firstItem);
      $('.service-tabs-lnk__sm').trigger('click');
    };

    $('.service-tabs-lnk__sm').on('click', function(){
      var $winwidth = $(window).width();
      // размер окна пересчитывается по умолчанию, поэтому не нужно его считать ресайзом.
      if ($winwidth < 768) {
        $('.service-tabs-lnk').toggleClass('open');
      }
    });

    $('.js-model-item').on('click', function(){
      var $this = $(this);
      $this.modelChose();
    });

    // выпадающие кнопки в карточке товара model-line на 480px
    $('.js--subbtn-dropdown').on('click', function () {
        $('.model__subbtn-list').slideToggle(500);
    });

    // раскрытие текста на странице model-line
    $('.product-info__text.second').hide();

    $('.js-product-btn').on('click', function() {
        var $this = $(this);
        $this.toggleClass('open');
        $('.product-info__text.second').slideToggle(500);
    });

      // показываем текст по клику на кнопку "подробнее", странциа model-line
      $('.js-btn-more').on('click', function () {
          $('.model__description').slideToggle(500);
      })
  });
    


})(jQuery);