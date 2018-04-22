$(function() {

    "use strict";

    setTimeout(function() {
        $('#loader-wrapper').fadeOut();
    },500);

    //header scrolled
    if (window.matchMedia('(min-width: 992px)').matches) {
        $(window).on("scroll", function () {
            var winScr = $(window).scrollTop(),
                header = $('.header');

            if (winScr > 70) {
                header.addClass('scrolled');
            } else {
                header.removeClass('scrolled');
            }

        });
    }

    if($('.grid').length){
        var $grid = $('.grid').isotope({
            itemSelector: '.element-item',
            layoutMode: 'masonry'
        });

        var filterFns = {
            ium: function() {
                var name = $(this).find('.name').text();
                return name.match( /ium$/ );
            }
        };
        $('.filters-button-group').on( 'click', '.btn_isotop', function() {
            var filterValue = $( this ).attr('data-filter');
            filterValue = filterFns[ filterValue ] || filterValue;
            $grid.isotope({ filter: filterValue });
        });
        $('.button-group').each( function( i, buttonGroup ) {
            var $buttonGroup = $( buttonGroup );
            $buttonGroup.on( 'click', '.btn_isotop', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $( this ).addClass('is-checked');
            });
        });
    }

});