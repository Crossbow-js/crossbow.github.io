(function () {
    var $ = function (selector, context) { return [].slice.call((context || document).querySelectorAll(selector)); };
    var navs = $('.tab-nav');
    var triggers = $('[href="#sidebar"]');
    var toggles = $('[data-toggle]');
    toggles.forEach(function (toggle) {
        var target = $(toggle.hash)[0];
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            toggle.classList.toggle('active');
            target.classList.toggle('active');
        });
    });
    navs.forEach(function (nav) {
        var context = nav.parentNode;
        var buttons = $('.tab-nav__button', context);
        var targets = $('.tab-content', context);
        if (nav) {
            nav.addEventListener('click', function (e) {
                var trigger = e.target.closest('.tab-nav__button');
                if (!trigger) {
                    return;
                }
                var target = $(trigger.hash, context)[0];
                if (!target) {
                    return;
                }
                e.preventDefault();
                target.classList.add('tab-content--active');
                targets
                    .filter(function (x) { return x !== target; })
                    .forEach(function (x) { return x.classList.remove('tab-content--active'); });
                trigger.classList.add('tab-nav__button--active');
                buttons
                    .filter(function (x) { return x !== trigger; })
                    .forEach(function (x) { return x.classList.remove('tab-nav__button--active'); });
            });
        }
    });
})();
//# sourceMappingURL=scripts.js.map