interface Navigator {
    serviceWorker: any
}

(function () {
    const $ = (selector, context?) => [].slice.call((context||document).querySelectorAll(selector));

    if (navigator.serviceWorker) {
        // registerServiceWorker();
    } else {
        console.log('nope!');
    }

    tabs();


    function tabs () {

        const navs     = $('.tab-nav');
        const triggers = $('[href="#sidebar"]');
        const toggles  = $('[data-toggle]');

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
        });
    }

    function registerServiceWorker() {

        navigator.serviceWorker.register('/sw.js').then(function(reg) {
            if (!navigator.serviceWorker.controller) {
                return;
            }

            if (reg.waiting) {
                console.log('reg.waiting');
                reg.waiting.postMessage({action: 'skipWaiting'});
                return;
            }

            if (reg.installing) {
                console.log('reg.installing');
                reg.installing.addEventListener('statechange', function() {
                    if (reg.installing.state == 'installed') {
                        reg.installing.postMessage({action: 'skipWaiting'});
                    }
                });
                return;
            }

            reg.addEventListener('updatefound', function() {
                if (navigator.serviceWorker.controller) {
                    var installingWorker = reg.installing;
                    installingWorker.onstatechange = function () {
                        switch (installingWorker.state) {
                            case 'installed':
                                console.log(installingWorker);
                                console.log(reg, 'installed!');
                                break;
                            default:
                                console.log('installingWorker.state', installingWorker.state);
                        }
                    }
                }
            });
        });
    }

    const embed = (id) => `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}?rel=0&showinfo=false&autoplay=true" frameborder="0" allowfullscreen></iframe>`;

    $('[data-video]').forEach(function(elem: HTMLElement) {
        const listener = function(e) {
            e.preventDefault();
            const vid = document.createElement('DIV');
            vid.classList.add('video-list__video');
            vid.innerHTML = embed(elem.getAttribute('data-video'));
            insertAfter(vid, elem);
            elem.removeEventListener('click', listener);
        };
        elem.addEventListener('click', listener);
    });

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
})();
