(function () {
    const $ = (selector, context?) => [].slice.call((context||document).querySelectorAll(selector));
    const navs    = $('.tab-nav');
    const triggers = $('[href="#sidebar"]');
    const toggles = $('[data-toggle]');

    toggles.forEach(function (toggle) {
        const target    = $(toggle.hash)[0];
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            toggle.classList.toggle('active');
            target.classList.toggle('active');
        });
    });


    navs.forEach(function (nav) {

        const context = nav.parentNode;
        const buttons = $('.tab-nav__button', context);
        const targets = $('.tab-content', context);

        if (nav) {
            nav.addEventListener('click', function (e) {
                const trigger = e.target.closest('.tab-nav__button');
                if (!trigger) {
                    return;
                }

                const target = $(trigger.hash, context)[0];
                if (!target) {
                    return
                }

                e.preventDefault();
                target.classList.add('tab-content--active');
                targets
                    .filter(x => x !== target)
                    .forEach(x => x.classList.remove('tab-content--active'))

                trigger.classList.add('tab-nav__button--active');
                buttons
                    .filter(x => x !== trigger)
                    .forEach(x => x.classList.remove('tab-nav__button--active'));
            })
        }
    })
})();