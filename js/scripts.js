(function () {
    const $ = (selector) => [].slice.call(document.querySelectorAll(selector));

    const nav = $('.tab-nav')[0];
    const buttons = $('.tab-nav__button');
    const targets = $('.tab-content');

    if (nav) {
        nav.addEventListener('click', function (e) {
            const trigger = e.target.closest('.tab-nav__button');
            if (!trigger) {
                return;
            }

            const target = $(trigger.hash)[0];
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
})();