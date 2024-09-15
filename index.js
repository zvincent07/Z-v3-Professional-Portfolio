$(document).ready(function() {
    const options = {
        root: null, // Use the viewport as the container
        threshold: 0.5 // The callback will be triggered when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const $section = $(entry.target);
            const $headerWrapper = $section.find('.header-wrapper');
            
            if (entry.isIntersecting) {
                $headerWrapper.addClass('scaled');
            } else {
                $headerWrapper.removeClass('scaled');
            }
        });
    }, options);

    // Target each section with the data-section attribute
    $("section[data-section]").each(function() {
        observer.observe(this);
    });
});

$(document).ready(function() {
    const $slides = $('.slide-up');
    const $navLinks = $('.navbar-nav .nav-link');
    
    // Intersection Observer for scroll-based slide-up effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const $target = $(entry.target);
            if (entry.isIntersecting) {
                $target.addClass('show');
            } else {
                $target.removeClass('show');
            }
        });
    }, {
        threshold: 0.1
    });

    $slides.each(function() {
        observer.observe(this);
    });

    // Click event for navbar links
    $navLinks.on('click', function(e) {
        const targetHref = $(this).attr('href');

        // If the href starts with "#", it's a section ID
        if (targetHref.startsWith('#')) {
            e.preventDefault();
            const targetId = targetHref.substring(1); // Remove the # symbol
            const $targetElement = $('#' + targetId);
            
            if ($targetElement.length) {
                // Scroll to the target element
                $('html, body').animate({
                    scrollTop: $targetElement.offset().top
                }, 500);

                // Apply the slide-up effect to the target element
                $targetElement.removeClass('show');
                $targetElement[0].offsetWidth; // Trigger reflow
                $targetElement.addClass('show');
            }
        } else {
            // If it's not a section ID, let the browser follow the link
            window.location.href = targetHref;
        }
    });
});

$(document).ready(function() {
    var images = [
        './assets/images/picture.jpg',
        './assets/images/picture-2.jpg',
        './assets/images/picture-3.jpg'
    ];
    var currentIndex = 0;

    $('#featureImage').on('click', function() {
        var img = $(this);

        // Fade out the image
        img.fadeOut(300, function() {
            // Change the image source when faded out
            currentIndex = (currentIndex + 1) % images.length;
            img.attr('src', images[currentIndex]);

            // Fade the image back in
            img.fadeIn(300);
        });
    });
});