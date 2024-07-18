// We will store all timer event ids here
let timerEvents = [];

$(() => {
    $('.sub-categories menu').hide();
    $('#black-woman-video').height($(window).height() * 0.8);

    setupSearchBar();
    setupSlidingMenu();
    setupBannerMenu();
});

const setupSearchBar = () => {
    $('#search-bar').width($(window).width() * 0.6);
    $('#backdrop').height($(document).height());
    $('#search-bar').on('input', () => {
        if ($('#search-bar').val() === "") {
            $('#search-btn').css("background-color", "white");
            $('#search-btn').css("color", "black");
            $('#search-cancel').css("visibility", "hidden");
            return;
        };
        $('#search-btn').css("background-color", "dodgerblue");
        $('#search-btn').css("color", "white");
        $('#search-cancel').css("visibility", "visible");
    });

    $('#search-bar').on('focus', () => {
        $('#backdrop').css("visibility", "visible");
        $('#backdrop').css("opacity", "1");
    });

    $('#search-bar').on('focusout', () => {
        setTimeout(() => $('#backdrop').css("visibility", "hidden"), 1000);
        $('#backdrop').css("opacity", "0");
    });

    $('#search-cancel').click((e) => {
        $('#search-bar').val('');
        $('#search-btn').css("background-color", "white");
        $('#search-btn').css("color", "black");
        $('#search-cancel').css("visibility", "hidden");
        e.preventDefault();
    });
}

const setupSlidingMenu = () => {
    $('#profile-btn').click(() => {
        if ($('.sliding-menu').css('visibility') === 'visible') {
            turnoffSlidingMenu();
            return;
        }
        turnonSlidingMenu();
    });

    $('#profile-btn').on('mouseenter', () => {
        turnonSlidingMenu();
    });
    $('#profile-btn').on('mouseleave', () => {
        if ($('.sliding-menu:hover').length === 0) return;
        setTimeout(() => {
            turnoffSlidingMenu();
        }, 500);
    });
    $('.sliding-menu').on('mouseleave', () => {
        if ($('#profile-btn:hover').length !== 0) return;
        setTimeout(() => {
            turnoffSlidingMenu();
        }, 500);
    });
    $('.menu-header button').click(() => {
        turnoffSlidingMenu();
    });
}

const setupBannerMenu = () => {
    handleChosenCategory();
    $('.menu-items li').click((e) => {
        $('.menu-items li').each((_, el) => {
            if ($(el).attr('data-chosen') === 'true') {
                $(el).attr('data-chosen', 'false');
            }
        });
        $(e.target).attr('data-chosen', 'true');
        handleChosenCategory();
    });
    $('.sub-categories button').on('mouseenter', (e) => {
        // Highlight button
        $('.sub-categories button').css('color', '');
        $('.sub-categories button').css('background-color', '');
        $(e.currentTarget).css('color', 'black');
        $(e.currentTarget).css('background-color', 'whitesmoke');
        // Clear all events just in case
        timerEvents.forEach(eventId => {
            clearTimeout(eventId);
        });
        timerEvents = [];
        $('menu').hide();
        $(e.target).next('menu').show();
    });
    $('.sub-categories button').on('mouseleave', (e) => {
        const id = setTimeout(() => {
            $(e.target).next('menu').hide();
            $('.sub-categories button').css('color', '');
            $('.sub-categories button').css('background-color', '');
        }, 500);
        timerEvents.push(id);
    });
    $('.sub-categories menu').on('mouseenter', () => {
        const id = timerEvents.pop();
        if (id === undefined) return;
        clearTimeout(id);
    });

    $('.sub-categories menu').on('mouseleave', (e) => {
        const id = setTimeout(() => {
            $(e.currentTarget).hide();
            $('.sub-categories button').css('color', '');
            $('.sub-categories button').css('background-color', '');
        }, 500);
        timerEvents.push(id);
    });
}

const handleChosenCategory = () => {
    $('.menu-items li').each((_, el) => {
        if ($(el).attr('data-chosen') === "true") {
            $(el).css('background-color', 'rgb(90, 90, 90)');
            $(el).css('border-style', 'none');

            if ($(el).html() === 'WOMEN') {
                $('.sub-categories.man').hide();
                $('.sub-categories.woman').show();
            } else if ($(el).html() === 'MEN') {
                $('.sub-categories.man').show();
                $('.sub-categories.woman').hide();
            }

        } else {
            $(el).css('background-color', 'transparent');
            $(el).css('border-style', 'none');
            $(el).css('border-right', '0.5px solid rgba(255, 255, 255, 0.2)');
        }
    });
}

const turnonSlidingMenu = () => {
    $('.menu-arrow').css("opacity", "1");
    $('.sliding-menu').css("visibility", "visible");
    $('.sliding-menu').css("opacity", "1");
    $('.sliding-menu').removeClass("slide-out");
    $('.sliding-menu').addClass("slide-in");
}

const turnoffSlidingMenu = () => {
    $('.menu-arrow').css("opacity", "0");
    setTimeout(() => $('.sliding-menu').css("visibility", "hidden"), 100);
    $('.sliding-menu').css("opacity", "0");
    $('.sliding-menu').removeClass("slide-in");
    $('.sliding-menu').addClass("slide-out");
}

const mouseIsOver = (element) => {
    return element.parent().find(element.selector + ":hover").length > 0;
}
