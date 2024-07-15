/*! JavaScript Menu/Sub-Menu */
$(document).ready(function () {
    $(document).each(function () {
        $("ul#sub-menu").parent("li").addClass("hasSub"),
            $(".nav-menu ul li").each(function () {
                $(this).hoverTimeout(
                    0,
                    function () {
                        $(this).children("ul").slideDown();
                    },
                    0,
                    function () {
                        $(this).children("ul").hide();
                    }
                );
            });
    });
});

/*! JavaScript Indicator */
window.onscroll = function () {
    scrollindicator();
};
function scrollindicator() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress-Indicator").style.width = scrolled + "%";
}

/*! JavaScript Preloader */
!(function (e) {
    e.fn.preloader = function (t) {
        function r() {
            c = e(i.selector);
        }
        function n() {
            switch (i.type) {
                case "document":
                default:
                    setTimeout(function () {
                        o();
                    }, i.delay);
            }
        }
        function o() {
            switch (i.removeType) {
                case "fade":
                    a();
                    break;
                case "remove":
                default:
                    u();
            }
        }
        function u() {
            return c.remove();
        }
        function a() {
            return c.fadeOut(i.fadeDuration, f());
        }
        function f() {
            return function () {
                c.remove();
            };
        }
        var i = e.extend({ selector: "#preloader", type: "document", removeType: "fade", fadeDuration: 750, delay: 0 }, t),
            c = null;
        return (
            r(),
            this.ready(function () {
                e(this).trigger("preloader:before"), n(), e(this).trigger("preloader:after");
            })
        );
    };
})(jQuery);
$(window).preloader({ delay: 3000 });
/*! ScrollToTop JavaScript */
var scrollToTop = (function () {
    function o(o) {
        function n(t) {
            (e += Math.PI / (o / (t - l))), e >= Math.PI && window.scrollTo(0, 0), 0 !== window.scrollY && (window.scrollTo(0, Math.round(s + s * Math.cos(e))), (l = t), window.requestAnimationFrame(n));
        }
        var s = window.scrollY / 2,
            e = 0,
            l = performance.now();
        window.requestAnimationFrame(n);
    }
    var n = document.getElementById("scrollToTop");
    (showButton = n.dataset.upshow || 600), (scrollSpeed = n.dataset.upspeed || 1e3);
    var s = window.scrollY;
    window.addEventListener("scroll", function () {
        (s = window.scrollY), showButton < s ? n.classList.add("visible") : n.classList.remove("visible");
    }),
        (n.onclick = function () {
            o(scrollSpeed);
        });
})();

/*! Media Sticky JavaScript */
("use strict");
jQuery(function (e) {
    function s(e) {
        var s = 1 === e.data,
            a = 2 === e.data,
            o = 0 === e.data;
        s && (i.removeClass("is-paused"), i.toggleClass("is-playing")), a && (i.removeClass("is-playing"), i.toggleClass("is-paused")), o && i.removeClass("is-playing", "is-paused");
    }
    var a,
        o = e(window),
        t = e("#featured-media"),
        i = e("#media-featured"),
        n = t.offset().top,
        l = Math.floor(n + t.outerHeight() / 2);
    (window.onYouTubeIframeAPIReady = function () {
        a = new YT.Player("media-featured", { events: { onStateChange: s } });
    }),
        o
            .on("resize", function () {
                (n = t.offset().top), (l = Math.floor(n + t.outerHeight() / 2));
            })
            .on("scroll", function () {
                i.toggleClass("is-sticky", o.scrollTop() > l && i.hasClass("is-playing"));
            });
});

/*! Bootstrap Modal JavaScript */
$(document).ready(function () {
    $("#videoModal").on("show.bs.modal", function (event) {
        let button = $(event.relatedTarget);
        let url = button.data("video");
        $(this).find("iframe").attr({ src: url, allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" });
    });
    $("#videoModal").on("hidden.bs.modal", function () {
        $("#videoModal iframe").removeAttr("src allow");
    });
});

/*! Lazy load Blogger JavaScript */
(function (a) {
    a.fn.lazyload = function (b) {
        var c = { threshold: 0, failurelimit: 0, event: "scroll", effect: "show", container: window };
        if (b) {
            a.extend(c, b);
        }
        var d = this;
        if ("scroll" == c.event) {
            a(c.container).bind("scroll", function (b) {
                var e = 0;
                d.each(function () {
                    if (a.abovethetop(this, c) || a.leftofbegin(this, c)) {
                    } else if (!a.belowthefold(this, c) && !a.rightoffold(this, c)) {
                        a(this).trigger("appear");
                    } else {
                        if (e++ > c.failurelimit) {
                            return false;
                        }
                    }
                });
                var f = a.grep(d, function (a) {
                    return !a.loaded;
                });
                d = a(f);
            });
        }
        this.each(function () {
            var b = this;
            if (undefined == a(b).attr("original")) {
                a(b).attr("original", a(b).attr("src"));
            }
            if ("scroll" != c.event || undefined == a(b).attr("src") || c.placeholder == a(b).attr("src") || a.abovethetop(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.rightoffold(b, c)) {
                if (c.placeholder) {
                    a(b).attr("src", c.placeholder);
                } else {
                    a(b).removeAttr("src");
                }
                b.loaded = false;
            } else {
                b.loaded = true;
            }
            a(b).one("appear", function () {
                if (!this.loaded) {
                    a("<img />")
                        .bind("load", function () {
                            a(b).hide().attr("src", a(b).attr("original"))[c.effect](c.effectspeed);
                            b.loaded = true;
                        })
                        .attr("src", a(b).attr("original"));
                }
            });
            if ("scroll" != c.event) {
                a(b).bind(c.event, function (c) {
                    if (!b.loaded) {
                        a(b).trigger("appear");
                    }
                });
            }
        });
        a(c.container).trigger(c.event);
        return this;
    };
    a.belowthefold = function (b, c) {
        if (c.container === undefined || c.container === window) {
            var d = a(window).height() + a(window).scrollTop();
        } else {
            var d = a(c.container).offset().top + a(c.container).height();
        }
        return d <= a(b).offset().top - c.threshold;
    };
    a.rightoffold = function (b, c) {
        if (c.container === undefined || c.container === window) {
            var d = a(window).width() + a(window).scrollLeft();
        } else {
            var d = a(c.container).offset().left + a(c.container).width();
        }
        return d <= a(b).offset().left - c.threshold;
    };
    a.abovethetop = function (b, c) {
        if (c.container === undefined || c.container === window) {
            var d = a(window).scrollTop();
        } else {
            var d = a(c.container).offset().top;
        }
        return d >= a(b).offset().top + c.threshold + a(b).height();
    };
    a.leftofbegin = function (b, c) {
        if (c.container === undefined || c.container === window) {
            var d = a(window).scrollLeft();
        } else {
            var d = a(c.container).offset().left;
        }
        return d >= a(b).offset().left + c.threshold + a(b).width();
    };
    a.extend(a.expr[":"], {
        "below-the-fold": "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold": "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold": "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold": "!$.rightoffold(a, {threshold : 0, container: window})",
    });
})(jQuery);
$(function () {
    $("img").lazyload({ placeholder: "https://1.bp.blogspot.com/-Qg5bi1ZtDdM/VZ5nHAyYBqI/AAAAAAAAChE/exGnasO4oyk/s640/arlinadesign.gif", effect: "fadeIn", threshold: "-50" });
});

/*! Simple Tabs JQuery JavaScript */
(function (a) {
    a.fn.navtabs = function (b) {
        b = jQuery.extend({ active: 1, fx: null, showSpeed: 400, hideSpeed: 400, showEasing: null, hideEasing: null, show: function () {}, hide: function () {}, change: function () {} }, b);
        return this.each(function () {
            var e = a(this),
                c = e.children("[data-tab]"),
                d = b.active - 1;
            e.addClass("navtabs").prepend('<ul class="tabs-lists d-flex flex-row"></ul>');
            c.addClass("tab-content")
                .each(function () {
                    a(this).hide();
                    e.find(".tabs-lists").append('<li><a href="#">' + a(this).data("tab") + "</a></li>");
                })
                .eq(d)
                .show();
            e.find(".tabs-lists a")
                .on("click", function () {
                    var f = a(this).parent().index();
                    a(this).closest(".tabs-lists").find(".activeTab").removeClass("activeTab");
                    a(this).addClass("activeTab");
                    if (b.fx == "slide") {
                        if (c.eq(f).is(":hidden")) {
                            c.slideUp(b.hideSpeed, b.hideEasing, function () {
                                b.hide.call(e);
                            })
                                .eq(f)
                                .slideDown(b.showSpeed, b.showEasing, function () {
                                    b.show.call(e);
                                });
                        }
                    } else {
                        if (b.fx == "fade") {
                            if (c.eq(f).is(":hidden")) {
                                c.hide()
                                    .eq(f)
                                    .fadeIn(b.showSpeed, b.showEasing, function () {
                                        b.show.call(e);
                                    });
                            }
                        } else {
                            if (b.fx == "fancyslide") {
                                if (c.eq(f).is(":hidden")) {
                                    c.slideUp(b.hideSpeed, b.hideEasing, function () {
                                        b.hide.call(e);
                                    })
                                        .eq(f)
                                        .delay(b.hideSpeed)
                                        .slideDown(b.showSpeed, b.showEasing, function () {
                                            b.show.call(e);
                                        });
                                }
                            } else {
                                if (c.eq(f).is(":hidden")) {
                                    c.hide().eq(f).show();
                                }
                            }
                        }
                    }
                    b.change.call(e);
                    return false;
                })
                .eq(d)
                .addClass("activeTab");
        });
    };
})(jQuery);

// contacts form
(function () {
    var e = document.getElementsByTagName("pre"),
        t = e.length;
    for (var n = 0; n < t; n++) {
        e[n].innerHTML = '<span class="line-number"></span>' + e[n].innerHTML + '<span class="cl"></span>';
        var r = e[n].innerHTML.split(/\n/).length;
        for (var i = 0; i < r; i++) {
            var s = e[n].getElementsByTagName("span")[0];
            s.innerHTML += "<span>" + (i + 1) + "</span>";
        }
    }
})();
$(document).ready(function () {
    $("#contact").appendTo(".contact-form");
    $(".contact-form #contact").css("display", "block");
    $(".tabs-wrap").navtabs({ active: 1, fx: "fade", showSpeed: 400, hideSpeed: 400 });
});

/*! Countdown Timer JQuery JavaScript */
!(function (n) {
    function o(n) {
        return n < 10 ? "0" + n : n;
    }
    (n.fn.showclock = function () {
        var t = new Date(),
            s = n(this).data("date").split("-"),
            c = [0, 0];
        null != n(this).data("time") && (c = n(this).data("time").split(":"));
        var a = new Date(s[0], s[1] - 1, s[2], c[0], c[1]).getTime() / 1e3 - t.getTime() / 1e3;
        if (a <= 0 || isNaN(a)) return this.hide(), this;
        var e = Math.floor(a / 86400);
        a %= 86400;
        var l = Math.floor(a / 3600);
        a %= 3600;
        var d = Math.floor(a / 60);
        a = Math.floor(a % 60);
        var i = "";
        0 != e &&
            ((i += "<div class='countdown-container days col-3 pl-1 pr-1 d-inline-block text-center'>"),
            (i += "<span class='countdown-value days-bottom d-block'>" + o(e) + "</span>"),
            (i += "<span class='countdown-heading days-top d-block'>Days</span>"),
            (i += "</div>")),
            (i += "<div class='countdown-container hours col-3 pl-1 pr-1 d-inline-block text-center'>"),
            (i += "<span class='countdown-value hours-bottom d-block'>" + o(l) + "</span>"),
            (i += "<span class='countdown-heading hours-top d-block'>Hours</span>"),
            (i += "</div>"),
            (i += "<div class='countdown-container minutes col-3 pl-1 pr-1 d-inline-block text-center'>"),
            (i += "<span class='countdown-value minutes-bottom d-block'>" + o(d) + "</span>"),
            (i += "<span class='countdown-heading minutes-top d-block'>Mins</span>"),
            (i += "</div>"),
            (i += "<div class='countdown-container seconds col-3 pl-1 pr-1 d-inline-block text-center'>"),
            (i += "<span class='countdown-value seconds-bottom d-block'>" + o(a) + "</span>"),
            (i += "<span class='countdown-heading seconds-top d-block'>Secs</span>"),
            (i += "</div>"),
            this.html(i);
    }),
        (n.fn.countdown = function () {
            var o = n(this);
            o.showclock(),
                setInterval(function () {
                    o.showclock();
                }, 1e3);
        });
})(jQuery),
    jQuery(document).ready(function () {
        jQuery(".countdown").length > 0 &&
            jQuery(".countdown").each(function () {
                jQuery(this).countdown();
            });
    });

/*! Wight Recent Posts JavaScript */
$(document).ready(function () {
    var e = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    $(".HTML .widget-content").each(function () {
        $(this).prev("h2").text();
        var t = $(this).find("span").attr("label"),
            a = $(this).find("span").attr("number"),
            l = $(this).parent().attr("id"),
            s = $(this).find("span").attr("type");
        null != s &&
            s.match("hero01") &&
            $.ajax({
                url: "/feeds/posts/default/-/" + t + "?alt=json-in-script&max-results=" + a,
                type: "get",
                dataType: "jsonp",
                success: function (t) {
                    for (var s = "", r = '<div class="hero01-feat-wrap"><div class="container-fluid px-0"><div class="row">', i = 0; i < t.feed.entry.length; i++) {
                        for (var c = 0; c < t.feed.entry[i].link.length; c++)
                            if ("alternate" == t.feed.entry[i].link[c].rel) {
                                s = t.feed.entry[i].link[c].href;
                                break;
                            }
                        for (var n, o = 0; o < t.feed.entry[i].link.length; o++)
                            if ("replies" === t.feed.entry[i].link[o].rel && "text/html" === t.feed.entry[i].link[o].type) {
                                n = t.feed.entry[i].link[o].title;
                                break;
                            }
                        if (((n = parseInt(n, 10)), "content" in t.feed.entry[i])) var d = t.feed.entry[i].content.$t;
                        else if ("summary" in b_rc) d = t.feed.entry[i].summary.$t;
                        else d = "";
                        (d = d.replace(/<\S[^>]*>/g, "")).length > 170 && (d = d.substring(0, 150) + "...");
                        var f = t.feed.entry[i].title.$t,
                            h = t.feed.entry[i].category[0].term,
                            v = t.feed.entry[i].author[0].name.$t,
                            p = (t.feed.entry[i].author[0].gd$image.src, t.feed.entry[i].published.$t),
                            u = p.substring(0, 4),
                            b = p.substring(5, 7),
                            g = p.substring(8, 10),
                            m = e[parseInt(b, 10)] + " " + g + ", " + u,
                            y = t.feed.entry[i].content.$t,
                            k = $("<div>").html(y);
                        if (y.indexOf("<img") > -1) o = k.find("img:first").attr("src");
                        else o = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                        r +=
                            0 == i
                                ? '<div class="hero01-col-widget-first col-12 mb-4 position-relative"><div class="hero01-col-widget-feat-image"><div class="hero01-thumb"><a class="hero01-col-widget-img" href="' +
                                  s +
                                  '" style="background:url(' +
                                  o +
                                  ') no-repeat center center;background-size: cover"><span class="hero01-overlay"/></a><div class="hero01-category-gallery"><a class="icon ' +
                                  h +
                                  '" href="/search/label/' +
                                  h +
                                  "?&max-result=" +
                                  a +
                                  '"></a></div><div class="hero01-col-widget-wrap text-center align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-10 m-auto"><h3 class="hero01-title"><a href="' +
                                  s +
                                  '">' +
                                  f +
                                  '</a></h3><div class="hero01-label"><a class="icon ' +
                                  h +
                                  '" href="/search/label/' +
                                  h +
                                  "?&max-result=" +
                                  a +
                                  '">' +
                                  h +
                                  '</a></div><span class="hero01-auth-ty">' +
                                  v +
                                  '</span><span class="hero01-col-widget-time">' +
                                  m +
                                  "</span></div></div></div></div></div></div></div>"
                                : '<div class="hero01-col-widget-second col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 position-relative"><div class="hero01-col-widget-feat-image">   <div class="hero01-thumb"><a class="hero01-col-widget-img" href="' +
                                  s +
                                  '" style="background:url(' +
                                  o +
                                  ') no-repeat center center;background-size: cover"><span class="hero01-overlay"/></a><div class="hero01-category-gallery"><a class="icon ' +
                                  h +
                                  '" href="/search/label/' +
                                  h +
                                  "?&max-result=" +
                                  a +
                                  '"></a></div></div><div class="hero01-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-12 p-0"><h3 class="hero01-title"><a href="' +
                                  s +
                                  '">' +
                                  f +
                                  '</a></h3><div class="hero01-label"><a class="icon ' +
                                  h +
                                  '" href="/search/label/' +
                                  h +
                                  "?&max-result=" +
                                  a +
                                  '">' +
                                  h +
                                  '</a></div><span class="hero01-auth-ty">' +
                                  v +
                                  "</span></div></div></div></div></div></div>";
                    }
                    (r += "</div></div></div>"),
                        $(".HTML .widget-content").each(function () {
                            $(this).parent().attr("id") == l &&
                                ($(this).html(r),
                                $(this).parent().addClass("hero01"),
                                $(this).parent().addClass("hero01ection float-left w-100"),
                                $(this)
                                    .prev("h2")
                                    .wrapInner('<a href="/search/label/' + h + "?&max-result=" + a + '"></a>'),
                                $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                $(this)
                                    .prev(".heading-head")
                                    .append('<a class="tymore" href="/search/label/' + h + "?&max-result=" + a + '">View More</a>'),
                                $(".hero01-left").addClass("comload").removeClass("preload"),
                                $(this)
                                    .find(".hero01-img,.ty-img")
                                    .each(function () {
                                        $(this)
                                            .attr("style", function (e, t) {
                                                return t.replace("/default.jpg", "/mqdefault.jpg");
                                            })
                                            .attr("style", function (e, t) {
                                                return t.replace("s72-c", "s1600");
                                            });
                                    }));
                        });
                },
            });
    });
}),
    $(document).ready(function () {
        var e = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        $(".HTML .widget-content").each(function () {
            $(this).prev("h2").text();
            var t = $(this).find("span").attr("label"),
                a = $(this).find("span").attr("number"),
                l = $(this).parent().attr("id"),
                s = $(this).find("span").attr("type");
            null != s &&
                s.match("hero02") &&
                $.ajax({
                    url: "/feeds/posts/default/-/" + t + "?alt=json-in-script&max-results=" + a,
                    type: "get",
                    dataType: "jsonp",
                    success: function (t) {
                        for (var s = "", r = '<div class="hero02-feat-wrap"><div class="container-fluid px-0"><div class="row">', i = 0; i < t.feed.entry.length; i++) {
                            for (var c = 0; c < t.feed.entry[i].link.length; c++)
                                if ("alternate" == t.feed.entry[i].link[c].rel) {
                                    s = t.feed.entry[i].link[c].href;
                                    break;
                                }
                            for (var n, o = 0; o < t.feed.entry[i].link.length; o++)
                                if ("replies" === t.feed.entry[i].link[o].rel && "text/html" === t.feed.entry[i].link[o].type) {
                                    n = t.feed.entry[i].link[o].title;
                                    break;
                                }
                            if (((n = parseInt(n, 10)), "content" in t.feed.entry[i])) var d = t.feed.entry[i].content.$t;
                            else if ("summary" in b_rc) d = t.feed.entry[i].summary.$t;
                            else d = "";
                            (d = d.replace(/<\S[^>]*>/g, "")).length > 170 && (d = d.substring(0, 150) + "...");
                            var f = t.feed.entry[i].title.$t,
                                h = t.feed.entry[i].category[0].term,
                                v = t.feed.entry[i].author[0].name.$t,
                                p = (t.feed.entry[i].author[0].gd$image.src, t.feed.entry[i].published.$t),
                                u = p.substring(0, 4),
                                b = p.substring(5, 7),
                                g = p.substring(8, 10),
                                m = e[parseInt(b, 10)] + " " + g + ", " + u,
                                y = t.feed.entry[i].content.$t,
                                k = $("<div>").html(y);
                            if (y.indexOf("<img") > -1) o = k.find("img:first").attr("src");
                            else o = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                            r +=
                                -1 == i
                                    ? '<div class="hero02-col-widget-first col-12 position-relative"><div class="hero02-col-widget-feat-image"><div class="hero02-thumb"><a class="hero02-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="hero02-overlay"/></a><div class="hero02-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div><div class="hero02-col-widget-wrap text-center align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-10 m-auto"><h3 class="hero02-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="hero02-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="hero02-auth-ty">' +
                                      v +
                                      '</span><span class="hero02-col-widget-time">' +
                                      m +
                                      "</span></div></div></div></div></div></div></div>"
                                    : '<div class="hero02-col-widget-first col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-4 position-relative"><div class="hero02-col-widget-feat-image"><div class="hero02-thumb"><a class="hero02-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="hero02-overlay"/></a><div class="hero02-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div><div class="hero02-col-widget-wrap text-center align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-10 m-auto"><h3 class="hero02-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="hero02-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="hero02-auth-ty">' +
                                      v +
                                      '</span><span class="hero02-col-widget-time">' +
                                      m +
                                      "</span></div></div></div></div></div></div></div>";
                        }
                        (r += "</div></div></div>"),
                            $(".HTML .widget-content").each(function () {
                                $(this).parent().attr("id") == l &&
                                    ($(this).html(r),
                                    $(this).parent().addClass("hero02"),
                                    $(this).parent().addClass("hero02ection float-left w-100"),
                                    $(this)
                                        .prev("h2")
                                        .wrapInner('<a href="/search/label/' + h + "?&max-result=" + a + '"></a>'),
                                    $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                    $(this)
                                        .prev(".heading-head")
                                        .append('<a class="tymore" href="/search/label/' + h + "?&max-result=" + a + '">View More</a>'),
                                    $(".hero02-left").addClass("comload").removeClass("preload"),
                                    $(this)
                                        .find(".hero02-img,.ty-img")
                                        .each(function () {
                                            $(this)
                                                .attr("style", function (e, t) {
                                                    return t.replace("/default.jpg", "/mqdefault.jpg");
                                                })
                                                .attr("style", function (e, t) {
                                                    return t.replace("s72-c", "s1600");
                                                });
                                        }));
                            });
                    },
                });
        });
    }),
    $(document).ready(function () {
        var e = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        $(".HTML .widget-content").each(function () {
            $(this).prev("h2").text();
            var t = $(this).find("span").attr("label"),
                a = $(this).find("span").attr("number"),
                l = $(this).parent().attr("id"),
                s = $(this).find("span").attr("type");
            null != s &&
                s.match("hero03") &&
                $.ajax({
                    url: "/feeds/posts/default/-/" + t + "?alt=json-in-script&max-results=" + a,
                    type: "get",
                    dataType: "jsonp",
                    success: function (t) {
                        for (var s = "", r = '<div class="hero03-feat-wrap"><div class="container-fluid px-0"><div class="row">', i = 0; i < t.feed.entry.length; i++) {
                            for (var c = 0; c < t.feed.entry[i].link.length; c++)
                                if ("alternate" == t.feed.entry[i].link[c].rel) {
                                    s = t.feed.entry[i].link[c].href;
                                    break;
                                }
                            for (var n, o = 0; o < t.feed.entry[i].link.length; o++)
                                if ("replies" === t.feed.entry[i].link[o].rel && "text/html" === t.feed.entry[i].link[o].type) {
                                    n = t.feed.entry[i].link[o].title;
                                    break;
                                }
                            if (((n = parseInt(n, 10)), "content" in t.feed.entry[i])) var d = t.feed.entry[i].content.$t;
                            else if ("summary" in b_rc) d = t.feed.entry[i].summary.$t;
                            else d = "";
                            (d = d.replace(/<\S[^>]*>/g, "")).length > 170 && (d = d.substring(0, 150) + "...");
                            var f = t.feed.entry[i].title.$t,
                                h = t.feed.entry[i].category[0].term,
                                v = t.feed.entry[i].author[0].name.$t,
                                p = (t.feed.entry[i].author[0].gd$image.src, t.feed.entry[i].published.$t),
                                u = p.substring(0, 4),
                                b = p.substring(5, 7),
                                g = p.substring(8, 10),
                                m = e[parseInt(b, 10)] + " " + g + ", " + u,
                                y = t.feed.entry[i].content.$t,
                                k = $("<div>").html(y);
                            if (y.indexOf("<img") > -1) o = k.find("img:first").attr("src");
                            else o = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                            r +=
                                -1 == i
                                    ? '<div class="hero03-col-widget-first col-12 position-relative"><div class="hero03-col-widget-feat-image"><div class="hero03-thumb"><a class="hero03-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="hero03-overlay"/></a><div class="hero03-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div><div class="hero03-col-widget-wrap text-center align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-10 m-auto"><h3 class="hero03-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="hero03-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="hero03-auth-ty">' +
                                      v +
                                      '</span><span class="hero03-col-widget-time">' +
                                      m +
                                      "</span></div></div></div></div></div></div></div>"
                                    : '<div class="hero03-col-widget-first col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 position-relative"><div class="hero03-col-widget-feat-image"><div class="hero03-thumb"><a class="hero03-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="hero03-overlay"/></a><div class="hero03-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div><div class="hero03-col-widget-wrap text-center align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-10 m-auto"><h3 class="hero03-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="hero03-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="hero03-auth-ty">' +
                                      v +
                                      '</span><span class="hero03-col-widget-time">' +
                                      m +
                                      "</span></div></div></div></div></div></div></div>";
                        }
                        (r += "</div></div></div>"),
                            $(".HTML .widget-content").each(function () {
                                $(this).parent().attr("id") == l &&
                                    ($(this).html(r),
                                    $(this).parent().addClass("hero03"),
                                    $(this).parent().addClass("hero03ection float-left w-100"),
                                    $(this)
                                        .prev("h2")
                                        .wrapInner('<a href="/search/label/' + h + "?&max-result=" + a + '"></a>'),
                                    $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                    $(this)
                                        .prev(".heading-head")
                                        .append('<a class="tymore" href="/search/label/' + h + "?&max-result=" + a + '">View More</a>'),
                                    $(".hero03-left").addClass("comload").removeClass("preload"),
                                    $(this)
                                        .find(".hero03-img,.ty-img")
                                        .each(function () {
                                            $(this)
                                                .attr("style", function (e, t) {
                                                    return t.replace("/default.jpg", "/mqdefault.jpg");
                                                })
                                                .attr("style", function (e, t) {
                                                    return t.replace("s72-c", "s1600");
                                                });
                                        }));
                            });
                    },
                });
        });
    }),
    $(document).ready(function () {
        var e = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        $(".HTML .widget-content").each(function () {
            $(this).prev("h2").text();
            var t = $(this).find("span").attr("label"),
                a = $(this).find("span").attr("number"),
                l = $(this).parent().attr("id"),
                s = $(this).find("span").attr("type");
            null != s &&
                s.match("block01") &&
                $.ajax({
                    url: "/feeds/posts/default/-/" + t + "?alt=json-in-script&max-results=" + a,
                    type: "get",
                    dataType: "jsonp",
                    success: function (t) {
                        for (var s = "", r = '<div class="block01-feat-wrap"><div class="container-fluid px-0"><div class="row">', i = 0; i < t.feed.entry.length; i++) {
                            for (var c = 0; c < t.feed.entry[i].link.length; c++)
                                if ("alternate" == t.feed.entry[i].link[c].rel) {
                                    s = t.feed.entry[i].link[c].href;
                                    break;
                                }
                            for (var n, o = 0; o < t.feed.entry[i].link.length; o++)
                                if ("replies" === t.feed.entry[i].link[o].rel && "text/html" === t.feed.entry[i].link[o].type) {
                                    n = t.feed.entry[i].link[o].title;
                                    break;
                                }
                            if (((n = parseInt(n, 10)), "content" in t.feed.entry[i])) var d = t.feed.entry[i].content.$t;
                            else if ("summary" in b_rc) d = t.feed.entry[i].summary.$t;
                            else d = "";
                            (d = d.replace(/<\S[^>]*>/g, "")).length > 170 && (d = d.substring(0, 150) + "...");
                            var f = t.feed.entry[i].title.$t,
                                h = t.feed.entry[i].category[0].term,
                                v = t.feed.entry[i].author[0].name.$t,
                                p = (t.feed.entry[i].author[0].gd$image.src, t.feed.entry[i].published.$t),
                                u = p.substring(0, 4),
                                b = p.substring(5, 7),
                                g = p.substring(8, 10),
                                m = e[parseInt(b, 10)] + " " + g + ", " + u,
                                y = t.feed.entry[i].content.$t,
                                k = $("<div>").html(y);
                            if (y.indexOf("<img") > -1) o = k.find("img:first").attr("src");
                            else o = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                            r +=
                                -1 == i
                                    ? '<div class="block01-col-widget-first col-12 position-relative"><div class="block01-col-widget-feat-image"><div class="block01-thumb"><a class="block01-col-widget-img"  href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="block01-overlay"/></a><div class="block01-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div><div class="block01-col-widget-wrap text-center align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-10"><h3 class="block01-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="block01-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="block01-auth-ty">' +
                                      v +
                                      '</span><span class="block01-col-widget-time">' +
                                      m +
                                      "</span></div></div></div></div></div></div></div>"
                                    : '<div class="block01-col-widget-second col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-4 position-relative"><div class="block01-col-widget-feat-image">   <div class="block01-thumb"><a class="block01-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="block01-overlay"/></a><div class="block01-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div></div><div class="block01-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-12 p-0"><h3 class="block01-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="block01-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="block01-auth-ty">' +
                                      v +
                                      "</span></div></div></div></div></div></div>";
                        }
                        (r += "</div></div></div>"),
                            $(".HTML .widget-content").each(function () {
                                $(this).parent().attr("id") == l &&
                                    ($(this).html(r),
                                    $(this).parent().addClass("block01"),
                                    $(this).parent().addClass("block01ection float-left w-100"),
                                    $(this)
                                        .prev("h2")
                                        .wrapInner('<a href="/search/label/' + h + "?&max-result=" + a + '"></a>'),
                                    $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                    $(this)
                                        .prev(".heading-head")
                                        .append('<a class="tymore" href="/search/label/' + h + "?&max-result=" + a + '">View More</a>'),
                                    $(".block01-left").addClass("comload").removeClass("preload"),
                                    $(this)
                                        .find(".block01-img,.ty-img")
                                        .each(function () {
                                            $(this)
                                                .attr("style", function (e, t) {
                                                    return t.replace("/default.jpg", "/mqdefault.jpg");
                                                })
                                                .attr("style", function (e, t) {
                                                    return t.replace("s72-c", "s1600");
                                                });
                                        }));
                            });
                    },
                });
        });
    }),
    $(document).ready(function () {
        var e = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        $(".HTML .widget-content").each(function () {
            $(this).prev("h2").text();
            var t = $(this).find("span").attr("label"),
                a = $(this).find("span").attr("number"),
                l = $(this).parent().attr("id"),
                s = $(this).find("span").attr("type");
            null != s &&
                s.match("block02") &&
                $.ajax({
                    url: "/feeds/posts/default/-/" + t + "?alt=json-in-script&max-results=" + a,
                    type: "get",
                    dataType: "jsonp",
                    success: function (t) {
                        for (var s = "", r = '<div class="block02-feat-wrap"><div class="container-fluid px-0"><div class="row">', i = 0; i < t.feed.entry.length; i++) {
                            for (var c = 0; c < t.feed.entry[i].link.length; c++)
                                if ("alternate" == t.feed.entry[i].link[c].rel) {
                                    s = t.feed.entry[i].link[c].href;
                                    break;
                                }
                            for (var n, o = 0; o < t.feed.entry[i].link.length; o++)
                                if ("replies" === t.feed.entry[i].link[o].rel && "text/html" === t.feed.entry[i].link[o].type) {
                                    n = t.feed.entry[i].link[o].title;
                                    break;
                                }
                            if (((n = parseInt(n, 10)), "content" in t.feed.entry[i])) var d = t.feed.entry[i].content.$t;
                            else if ("summary" in b_rc) d = t.feed.entry[i].summary.$t;
                            else d = "";
                            (d = d.replace(/<\S[^>]*>/g, "")).length > 170 && (d = d.substring(0, 150) + "...");
                            var f = t.feed.entry[i].title.$t,
                                h = t.feed.entry[i].category[0].term,
                                v = t.feed.entry[i].author[0].name.$t,
                                p = (t.feed.entry[i].author[0].gd$image.src, t.feed.entry[i].published.$t),
                                u = p.substring(0, 4),
                                b = p.substring(5, 7),
                                g = p.substring(8, 10),
                                m = e[parseInt(b, 10)] + " " + g + ", " + u,
                                y = t.feed.entry[i].content.$t,
                                k = $("<div>").html(y);
                            if (y.indexOf("<img") > -1) o = k.find("img:first").attr("src");
                            else o = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                            r +=
                                -1 == i
                                    ? '<div class="block02-col-widget-first col-12 position-relative"><div class="block02-col-widget-feat-image"><div class="block02-thumb"><a class="block02-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="block02-overlay"/></a><div class="block02-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div><div class="block02-col-widget-wrap text-center align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-10"><h3 class="block02-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="block02-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="block02-auth-ty">' +
                                      v +
                                      '</span><span class="block02-col-widget-time">' +
                                      m +
                                      "</span></div></div></div></div></div></div></div>"
                                    : '<div class="block02-col-widget-second col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 position-relative"><div class="block02-col-widget-feat-image">   <div class="block02-thumb"><a class="block02-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="block02-overlay"/></a><div class="block02-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div></div><div class="block02-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-12 p-0"><h3 class="block02-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="block02-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="block02-auth-ty">' +
                                      v +
                                      "</span></div></div></div></div></div></div>";
                        }
                        (r += "</div></div></div>"),
                            $(".HTML .widget-content").each(function () {
                                $(this).parent().attr("id") == l &&
                                    ($(this).html(r),
                                    $(this).parent().addClass("block02"),
                                    $(this).parent().addClass("block02ection float-left w-100"),
                                    $(this)
                                        .prev("h2")
                                        .wrapInner('<a href="/search/label/' + h + "?&max-result=" + a + '"></a>'),
                                    $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                    $(this)
                                        .prev(".heading-head")
                                        .append('<a class="tymore" href="/search/label/' + h + "?&max-result=" + a + '">View More</a>'),
                                    $(".block02-left").addClass("comload").removeClass("preload"),
                                    $(this)
                                        .find(".block02-img,.ty-img")
                                        .each(function () {
                                            $(this)
                                                .attr("style", function (e, t) {
                                                    return t.replace("/default.jpg", "/mqdefault.jpg");
                                                })
                                                .attr("style", function (e, t) {
                                                    return t.replace("s72-c", "s1600");
                                                });
                                        }));
                            });
                    },
                });
        });
    }),
    $(document).ready(function () {
        var e = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        $(".HTML .widget-content").each(function () {
            $(this).prev("h2").text();
            var t = $(this).find("span").attr("label"),
                a = $(this).find("span").attr("number"),
                l = $(this).parent().attr("id"),
                s = $(this).find("span").attr("type");
            null != s &&
                s.match("block03") &&
                $.ajax({
                    url: "/feeds/posts/default/-/" + t + "?alt=json-in-script&max-results=" + a,
                    type: "get",
                    dataType: "jsonp",
                    success: function (t) {
                        for (var s = "", r = '<div class="block03-feat-wrap"><div class="container-fluid px-0"><div class="row">', i = 0; i < t.feed.entry.length; i++) {
                            for (var c = 0; c < t.feed.entry[i].link.length; c++)
                                if ("alternate" == t.feed.entry[i].link[c].rel) {
                                    s = t.feed.entry[i].link[c].href;
                                    break;
                                }
                            for (var n, o = 0; o < t.feed.entry[i].link.length; o++)
                                if ("replies" === t.feed.entry[i].link[o].rel && "text/html" === t.feed.entry[i].link[o].type) {
                                    n = t.feed.entry[i].link[o].title;
                                    break;
                                }
                            if (((n = parseInt(n, 10)), "content" in t.feed.entry[i])) var d = t.feed.entry[i].content.$t;
                            else if ("summary" in b_rc) d = t.feed.entry[i].summary.$t;
                            else d = "";
                            (d = d.replace(/<\S[^>]*>/g, "")).length > 170 && (d = d.substring(0, 150) + "...");
                            var f = t.feed.entry[i].title.$t,
                                h = t.feed.entry[i].category[0].term,
                                v = t.feed.entry[i].author[0].name.$t,
                                p = (t.feed.entry[i].author[0].gd$image.src, t.feed.entry[i].published.$t),
                                u = p.substring(0, 4),
                                b = p.substring(5, 7),
                                g = p.substring(8, 10),
                                m = e[parseInt(b, 10)] + " " + g + ", " + u,
                                y = t.feed.entry[i].content.$t,
                                k = $("<div>").html(y);
                            if (y.indexOf("<img") > -1) o = k.find("img:first").attr("src");
                            else o = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                            r +=
                                -1 == i
                                    ? '<div class="block03-col-widget-first col-12 position-relative"><div class="block03-col-widget-feat-image"><div class="block03-thumb"><a class="block03-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="block03-overlay"/></a><div class="block03-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div><div class="block03-col-widget-wrap text-center align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-10"><h3 class="block03-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="block03-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="block03-auth-ty">' +
                                      v +
                                      '</span><span class="block03-col-widget-time">' +
                                      m +
                                      "</span></div></div></div></div></div></div></div>"
                                    : '<div class="block03-col-widget-second col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-4 position-relative"><div class="block03-col-widget-feat-image">   <div class="block03-thumb"><a class="block03-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="block03-overlay"/></a><div class="block03-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div></div><div class="block03-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-12 p-0"><h3 class="block03-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="block03-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="block03-auth-ty">' +
                                      v +
                                      "</span></div></div></div></div></div></div>";
                        }
                        (r += "</div></div></div>"),
                            $(".HTML .widget-content").each(function () {
                                $(this).parent().attr("id") == l &&
                                    ($(this).html(r),
                                    $(this).parent().addClass("block03"),
                                    $(this).parent().addClass("block03ection float-left w-100"),
                                    $(this)
                                        .prev("h2")
                                        .wrapInner('<a href="/search/label/' + h + "?&max-result=" + a + '"></a>'),
                                    $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                    $(this)
                                        .prev(".heading-head")
                                        .append('<a class="tymore" href="/search/label/' + h + "?&max-result=" + a + '">View More</a>'),
                                    $(".block03-left").addClass("comload").removeClass("preload"),
                                    $(this)
                                        .find(".block03-img,.ty-img")
                                        .each(function () {
                                            $(this)
                                                .attr("style", function (e, t) {
                                                    return t.replace("/default.jpg", "/mqdefault.jpg");
                                                })
                                                .attr("style", function (e, t) {
                                                    return t.replace("s72-c", "s1600");
                                                });
                                        }));
                            });
                    },
                });
        });
    }),
    $(document).ready(function () {
        var e = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        $(".HTML .widget-content").each(function () {
            $(this).prev("h2").text();
            var t = $(this).find("span").attr("label"),
                a = $(this).find("span").attr("number"),
                l = $(this).parent().attr("id"),
                s = $(this).find("span").attr("type");
            null != s &&
                s.match("block04") &&
                $.ajax({
                    url: "/feeds/posts/default/-/" + t + "?alt=json-in-script&max-results=" + a,
                    type: "get",
                    dataType: "jsonp",
                    success: function (t) {
                        for (var s = "", r = '<div class="block04-feat-wrap"><div class="container-fluid px-0"><div class="row d-table">', i = 0; i < t.feed.entry.length; i++) {
                            for (var c = 0; c < t.feed.entry[i].link.length; c++)
                                if ("alternate" == t.feed.entry[i].link[c].rel) {
                                    s = t.feed.entry[i].link[c].href;
                                    break;
                                }
                            for (var n, o = 0; o < t.feed.entry[i].link.length; o++)
                                if ("replies" === t.feed.entry[i].link[o].rel && "text/html" === t.feed.entry[i].link[o].type) {
                                    n = t.feed.entry[i].link[o].title;
                                    break;
                                }
                            if (((n = parseInt(n, 10)), "content" in t.feed.entry[i])) var d = t.feed.entry[i].content.$t;
                            else if ("summary" in b_rc) d = t.feed.entry[i].summary.$t;
                            else d = "";
                            (d = d.replace(/<\S[^>]*>/g, "")).length > 170 && (d = d.substring(0, 150) + "...");
                            var f = t.feed.entry[i].title.$t,
                                h = t.feed.entry[i].category[0].term,
                                v = t.feed.entry[i].author[0].name.$t,
                                p = (t.feed.entry[i].author[0].gd$image.src, t.feed.entry[i].published.$t),
                                u = p.substring(0, 4),
                                b = p.substring(5, 7),
                                g = p.substring(8, 10),
                                m = e[parseInt(b, 10)] + " " + g + ", " + u,
                                y = t.feed.entry[i].content.$t,
                                k = $("<div>").html(y);
                            if (y.indexOf("<img") > -1) o = k.find("img:first").attr("src");
                            else o = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                            r +=
                                0 == i
                                    ? '<div class="block04-col-widget-first col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mb-4 float-left position-relative"><div class="block04-col-widget-feat-image"><div class="block04-thumb"><a class="block04-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="block04-overlay"/></a><div class="block04-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div><div class="block04-col-widget-wrap text-center align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-10 m-auto"><h3 class="block04-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="block04-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="block04-auth-ty">' +
                                      v +
                                      '</span><span class="block04-col-widget-time">' +
                                      m +
                                      "</span></div></div></div></div></div></div></div>"
                                    : '<div class="block04-col-widget-second col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 float-left position-relative"><div class="block04-col-widget-feat-image">   <div class="block04-thumb"><a class="block04-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="block04-overlay"/></a><div class="block04-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div></div><div class="block04-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-12 p-0"><h3 class="block04-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="block04-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="block04-auth-ty">' +
                                      v +
                                      "</span></div></div></div></div></div></div>";
                        }
                        (r += "</div></div></div>"),
                            $(".HTML .widget-content").each(function () {
                                $(this).parent().attr("id") == l &&
                                    ($(this).html(r),
                                    $(this).parent().addClass("block04"),
                                    $(this).parent().addClass("block04ection float-left w-100"),
                                    $(this)
                                        .prev("h2")
                                        .wrapInner('<a href="/search/label/' + h + "?&max-result=" + a + '"></a>'),
                                    $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                    $(this)
                                        .prev(".heading-head")
                                        .append('<a class="tymore" href="/search/label/' + h + "?&max-result=" + a + '">View More</a>'),
                                    $(".block04-left").addClass("comload").removeClass("preload"),
                                    $(this)
                                        .find(".block04-img,.ty-img")
                                        .each(function () {
                                            $(this)
                                                .attr("style", function (e, t) {
                                                    return t.replace("/default.jpg", "/mqdefault.jpg");
                                                })
                                                .attr("style", function (e, t) {
                                                    return t.replace("s72-c", "s1600");
                                                });
                                        }));
                            });
                    },
                });
        });
    }),
    $(document).ready(function () {
        var e = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        $(".HTML .widget-content").each(function () {
            $(this).prev("h2").text();
            var t = $(this).find("span").attr("label"),
                a = $(this).find("span").attr("number"),
                l = $(this).parent().attr("id"),
                s = $(this).find("span").attr("type");
            null != s &&
                s.match("block05") &&
                $.ajax({
                    url: "/feeds/posts/default/-/" + t + "?alt=json-in-script&max-results=" + a,
                    type: "get",
                    dataType: "jsonp",
                    success: function (t) {
                        for (var s = "", r = '<div class="block05-feat-wrap"><div class="container-fluid px-0"><div class="row d-table">', i = 0; i < t.feed.entry.length; i++) {
                            for (var c = 0; c < t.feed.entry[i].link.length; c++)
                                if ("alternate" == t.feed.entry[i].link[c].rel) {
                                    s = t.feed.entry[i].link[c].href;
                                    break;
                                }
                            for (var n, o = 0; o < t.feed.entry[i].link.length; o++)
                                if ("replies" === t.feed.entry[i].link[o].rel && "text/html" === t.feed.entry[i].link[o].type) {
                                    n = t.feed.entry[i].link[o].title;
                                    break;
                                }
                            if (((n = parseInt(n, 10)), "content" in t.feed.entry[i])) var d = t.feed.entry[i].content.$t;
                            else if ("summary" in b_rc) d = t.feed.entry[i].summary.$t;
                            else d = "";
                            (d = d.replace(/<\S[^>]*>/g, "")).length > 170 && (d = d.substring(0, 150) + "...");
                            var f = t.feed.entry[i].title.$t,
                                h = t.feed.entry[i].category[0].term,
                                v = t.feed.entry[i].author[0].name.$t,
                                p = (t.feed.entry[i].author[0].gd$image.src, t.feed.entry[i].published.$t),
                                u = p.substring(0, 4),
                                b = p.substring(5, 7),
                                g = p.substring(8, 10),
                                m = e[parseInt(b, 10)] + " " + g + ", " + u,
                                y = t.feed.entry[i].content.$t,
                                k = $("<div>").html(y);
                            if (y.indexOf("<img") > -1) o = k.find("img:first").attr("src");
                            else o = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                            r +=
                                0 == i
                                    ? '<div class="block05-col-widget-first col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mb-4 mb-4 float-left position-relative"><div class="block05-col-widget-feat-image"><div class="block05-thumb"><a class="block05-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="block05-overlay"/></a><div class="block05-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div></div><div class="block05-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-10"><h3 class="block05-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="block05-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="block05-auth-ty">' +
                                      v +
                                      '</span><span class="block05-col-widget-time">' +
                                      m +
                                      "</span></div></div></div></div></div></div>"
                                    : '<div class="block05-col-widget-second col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 float-left position-relative"><div class="block05-col-widget-feat-image">   <div class="block05-thumb float-left"><a class="block05-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="block05-overlay"/></a><div class="block05-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div></div><div class="block05-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-12 p-0"><h3 class="block05-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="block05-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="block05-auth-ty">' +
                                      v +
                                      "</span></div></div></div></div></div></div>";
                        }
                        (r += "</div></div></div>"),
                            $(".HTML .widget-content").each(function () {
                                $(this).parent().attr("id") == l &&
                                    ($(this).html(r),
                                    $(this).parent().addClass("block05"),
                                    $(this).parent().addClass("block05ection float-left w-100"),
                                    $(this)
                                        .prev("h2")
                                        .wrapInner('<a href="/search/label/' + h + "?&max-result=" + a + '"></a>'),
                                    $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                    $(this)
                                        .prev(".heading-head")
                                        .append('<a class="tymore" href="/search/label/' + h + "?&max-result=" + a + '">View More</a>'),
                                    $(".block05-left").addClass("comload").removeClass("preload"),
                                    $(this)
                                        .find(".block05-img,.ty-img")
                                        .each(function () {
                                            $(this)
                                                .attr("style", function (e, t) {
                                                    return t.replace("/default.jpg", "/mqdefault.jpg");
                                                })
                                                .attr("style", function (e, t) {
                                                    return t.replace("s72-c", "s1600");
                                                });
                                        }));
                            });
                    },
                });
        });
    }),
    $(document).ready(function () {
        var e = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        $(".HTML .widget-content").each(function () {
            $(this).prev("h2").text();
            var t = $(this).find("span").attr("label"),
                a = $(this).find("span").attr("number"),
                l = $(this).parent().attr("id"),
                s = $(this).find("span").attr("type");
            null != s &&
                s.match("block06") &&
                $.ajax({
                    url: "/feeds/posts/default/-/" + t + "?alt=json-in-script&max-results=" + a,
                    type: "get",
                    dataType: "jsonp",
                    success: function (t) {
                        for (var s = "", r = '<div class="block06-feat-wrap"><div class="container-fluid px-0"><div class="row">', i = 0; i < t.feed.entry.length; i++) {
                            for (var c = 0; c < t.feed.entry[i].link.length; c++)
                                if ("alternate" == t.feed.entry[i].link[c].rel) {
                                    s = t.feed.entry[i].link[c].href;
                                    break;
                                }
                            for (var n, o = 0; o < t.feed.entry[i].link.length; o++)
                                if ("replies" === t.feed.entry[i].link[o].rel && "text/html" === t.feed.entry[i].link[o].type) {
                                    n = t.feed.entry[i].link[o].title;
                                    break;
                                }
                            if (((n = parseInt(n, 10)), "content" in t.feed.entry[i])) var d = t.feed.entry[i].content.$t;
                            else if ("summary" in b_rc) d = t.feed.entry[i].summary.$t;
                            else d = "";
                            (d = d.replace(/<\S[^>]*>/g, "")).length > 170 && (d = d.substring(0, 150) + "...");
                            var f = t.feed.entry[i].title.$t,
                                h = t.feed.entry[i].category[0].term,
                                v = t.feed.entry[i].author[0].name.$t,
                                p = (t.feed.entry[i].author[0].gd$image.src, t.feed.entry[i].published.$t),
                                u = p.substring(0, 4),
                                b = p.substring(5, 7),
                                g = p.substring(8, 10),
                                m = e[parseInt(b, 10)] + " " + g + ", " + u,
                                y = t.feed.entry[i].content.$t,
                                k = $("<div>").html(y);
                            if (y.indexOf("<img") > -1) o = k.find("img:first").attr("src");
                            else o = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                            r +=
                                -1 == i
                                    ? '<div class="block06-col-widget-first col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mb-4 mb-4 float-left position-relative"><div class="block06-col-widget-feat-image"><div class="block06-thumb"><a class="block06-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="block06-overlay"/></a><div class="block06-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div></div><div class="block06-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-10"><h3 class="block06-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="block06-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="block06-auth-ty">' +
                                      v +
                                      '</span><span class="block06-col-widget-time">' +
                                      m +
                                      "</span></div></div></div></div></div></div>"
                                    : '<div class="block06-col-widget-first col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-4 position-relative"><div class="block06-col-widget-feat-image"><div class="block06-thumb"><a class="block06-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="block06-overlay"/></a><div class="block06-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div></div><div class="block06-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-10"><h3 class="block06-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="block06-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="block06-auth-ty">' +
                                      v +
                                      '</span><span class="block06-col-widget-time">' +
                                      m +
                                      "</span></div></div></div></div></div></div>";
                        }
                        (r += "</div></div></div>"),
                            $(".HTML .widget-content").each(function () {
                                $(this).parent().attr("id") == l &&
                                    ($(this).html(r),
                                    $(this).parent().addClass("block06"),
                                    $(this).parent().addClass("block06ection float-left w-100"),
                                    $(this)
                                        .prev("h2")
                                        .wrapInner('<a href="/search/label/' + h + "?&max-result=" + a + '"></a>'),
                                    $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                    $(this)
                                        .prev(".heading-head")
                                        .append('<a class="tymore" href="/search/label/' + h + "?&max-result=" + a + '">View More</a>'),
                                    $(".block06-left").addClass("comload").removeClass("preload"),
                                    $(this)
                                        .find(".block06-img,.ty-img")
                                        .each(function () {
                                            $(this)
                                                .attr("style", function (e, t) {
                                                    return t.replace("/default.jpg", "/mqdefault.jpg");
                                                })
                                                .attr("style", function (e, t) {
                                                    return t.replace("s72-c", "s1600");
                                                });
                                        }));
                            });
                    },
                });
        });
    }),
    $(document).ready(function () {
        $(".HTML .widget-content").each(function () {
            $(this).prev("h2").text();
            var e = $(this).find("span").attr("label"),
                t = $(this).find("span").attr("number"),
                a = $(this).parent().attr("id"),
                l = $(this).find("span").attr("type");
            null != l &&
                l.match("block07") &&
                $.ajax({
                    url: "/feeds/posts/default/-/" + e + "?alt=json-in-script&max-results=" + t,
                    type: "get",
                    dataType: "jsonp",
                    success: function (e) {
                        for (var l = "", s = '<div class="block07-feat-wrap"><div class="container-fluid px-0"><div class="row">', r = 0; r < e.feed.entry.length; r++) {
                            for (var i = 0; i < e.feed.entry[r].link.length; i++)
                                if ("alternate" == e.feed.entry[r].link[i].rel) {
                                    l = e.feed.entry[r].link[i].href;
                                    break;
                                }
                            for (var c, n = 0; n < e.feed.entry[r].link.length; n++)
                                if ("replies" === e.feed.entry[r].link[n].rel && "text/html" === e.feed.entry[r].link[n].type) {
                                    c = e.feed.entry[r].link[n].title;
                                    break;
                                }
                            if (((c = parseInt(c, 10)), "content" in e.feed.entry[r])) var o = e.feed.entry[r].content.$t;
                            else if ("summary" in b_rc) o = e.feed.entry[r].summary.$t;
                            else o = "";
                            (o = o.replace(/<\S[^>]*>/g, "")).length > 170 && (o = o.substring(0, 150) + "...");
                            var d = e.feed.entry[r].title.$t,
                                f = e.feed.entry[r].category[0].term,
                                h = e.feed.entry[r].author[0].name.$t,
                                v = (e.feed.entry[r].author[0].gd$image.src, e.feed.entry[r].published.$t),
                                p = v.substring(0, 4),
                                u = v.substring(5, 7),
                                b = v.substring(8, 10),
                                g = (parseInt(u, 10), e.feed.entry[r].content.$t),
                                m = $("<div>").html(g);
                            if (g.indexOf("<img") > -1) n = m.find("img:first").attr("src");
                            else n = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                            s +=
                                '<div class="block07-col-widget-second col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-4 float-left position-relative"><div class="block07-col-widget-feat-image">   <div class="block07-thumb float-left"><a class="block07-col-widget-img" href="' +
                                l +
                                '" style="background:url(' +
                                n +
                                ') no-repeat center center;background-size: cover"><span class="block07-overlay"/></a><div class="block07-category-gallery"><a class="icon ' +
                                f +
                                '" href="/search/label/' +
                                f +
                                "?&max-result=" +
                                t +
                                '"></a></div></div><div class="block07-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-12 p-0"><h3 class="block07-title"><a href="' +
                                l +
                                '">' +
                                d +
                                '</a></h3><div class="block07-label"><a class="icon ' +
                                f +
                                '" href="/search/label/' +
                                f +
                                "?&max-result=" +
                                t +
                                '">' +
                                f +
                                '</a></div><span class="block07-auth-ty">' +
                                h +
                                "</span></div></div></div></div></div></div>";
                        }
                        (s += "</div></div></div>"),
                            $(".HTML .widget-content").each(function () {
                                $(this).parent().attr("id") == a &&
                                    ($(this).html(s),
                                    $(this).parent().addClass("block07"),
                                    $(this).parent().addClass("block07ection float-left w-100"),
                                    $(this)
                                        .prev("h2")
                                        .wrapInner('<a href="/search/label/' + f + "?&max-result=" + t + '"></a>'),
                                    $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                    $(this)
                                        .prev(".heading-head")
                                        .append('<a class="tymore" href="/search/label/' + f + "?&max-result=" + t + '">View More</a>'),
                                    $(".block07-left").addClass("comload").removeClass("preload"),
                                    $(this)
                                        .find(".block07-img,.ty-img")
                                        .each(function () {
                                            $(this)
                                                .attr("style", function (e, t) {
                                                    return t.replace("/default.jpg", "/mqdefault.jpg");
                                                })
                                                .attr("style", function (e, t) {
                                                    return t.replace("s72-c", "s1600");
                                                });
                                        }));
                            });
                    },
                });
        });
    }),
    $(document).ready(function () {
        $(".HTML .widget-content").each(function () {
            $(this).prev("h2").text();
            var e = $(this).find("span").attr("label"),
                t = $(this).find("span").attr("number"),
                a = $(this).parent().attr("id"),
                l = $(this).find("span").attr("type");
            null != l &&
                l.match("block08") &&
                $.ajax({
                    url: "/feeds/posts/default/-/" + e + "?alt=json-in-script&max-results=" + t,
                    type: "get",
                    dataType: "jsonp",
                    success: function (e) {
                        for (var l = "", s = '<div class="block08-feat-wrap"><div class="container-fluid px-0"><div class="row">', r = 0; r < e.feed.entry.length; r++) {
                            for (var i = 0; i < e.feed.entry[r].link.length; i++)
                                if ("alternate" == e.feed.entry[r].link[i].rel) {
                                    l = e.feed.entry[r].link[i].href;
                                    break;
                                }
                            for (var c, n = 0; n < e.feed.entry[r].link.length; n++)
                                if ("replies" === e.feed.entry[r].link[n].rel && "text/html" === e.feed.entry[r].link[n].type) {
                                    c = e.feed.entry[r].link[n].title;
                                    break;
                                }
                            if (((c = parseInt(c, 10)), "content" in e.feed.entry[r])) var o = e.feed.entry[r].content.$t;
                            else if ("summary" in b_rc) o = e.feed.entry[r].summary.$t;
                            else o = "";
                            (o = o.replace(/<\S[^>]*>/g, "")).length > 170 && (o = o.substring(0, 150) + "...");
                            var d = e.feed.entry[r].title.$t,
                                f = e.feed.entry[r].category[0].term,
                                h = e.feed.entry[r].author[0].name.$t,
                                v = (e.feed.entry[r].author[0].gd$image.src, e.feed.entry[r].published.$t),
                                p = v.substring(0, 4),
                                u = v.substring(5, 7),
                                b = v.substring(8, 10),
                                g = (parseInt(u, 10), e.feed.entry[r].content.$t),
                                m = $("<div>").html(g);
                            if (g.indexOf("<img") > -1) n = m.find("img:first").attr("src");
                            else n = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                            s +=
                                '<div class="block08-col-widget-second col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 float-left position-relative"><div class="block08-col-widget-feat-image">   <div class="block08-thumb float-left"><a class="block08-col-widget-img" href="' +
                                l +
                                '" style="background:url(' +
                                n +
                                ') no-repeat center center;background-size: cover"><span class="block08-overlay"/></a><div class="block08-category-gallery"><a class="icon ' +
                                f +
                                '" href="/search/label/' +
                                f +
                                "?&max-result=" +
                                t +
                                '"></a></div></div><div class="block08-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-12 p-0"><h3 class="block08-title"><a href="' +
                                l +
                                '">' +
                                d +
                                '</a></h3><div class="block08-label"><a class="icon ' +
                                f +
                                '" href="/search/label/' +
                                f +
                                "?&max-result=" +
                                t +
                                '">' +
                                f +
                                '</a></div><span class="block08-auth-ty">' +
                                h +
                                "</span></div></div></div></div></div></div>";
                        }
                        (s += "</div></div></div>"),
                            $(".HTML .widget-content").each(function () {
                                $(this).parent().attr("id") == a &&
                                    ($(this).html(s),
                                    $(this).parent().addClass("block08"),
                                    $(this).parent().addClass("block08ection float-left w-100"),
                                    $(this)
                                        .prev("h2")
                                        .wrapInner('<a href="/search/label/' + f + "?&max-result=" + t + '"></a>'),
                                    $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                    $(this)
                                        .prev(".heading-head")
                                        .append('<a class="tymore" href="/search/label/' + f + "?&max-result=" + t + '">View More</a>'),
                                    $(".block08-left").addClass("comload").removeClass("preload"),
                                    $(this)
                                        .find(".block08-img,.ty-img")
                                        .each(function () {
                                            $(this)
                                                .attr("style", function (e, t) {
                                                    return t.replace("/default.jpg", "/mqdefault.jpg");
                                                })
                                                .attr("style", function (e, t) {
                                                    return t.replace("s72-c", "s1600");
                                                });
                                        }));
                            });
                    },
                });
        });
    }),
    $(document).ready(function () {
        var e = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        $(".HTML .widget-content").each(function () {
            $(this).prev("h2").text();
            var t = $(this).find("span").attr("label"),
                a = $(this).find("span").attr("number"),
                l = $(this).parent().attr("id"),
                s = $(this).find("span").attr("type");
            null != s &&
                s.match("blockA01") &&
                $.ajax({
                    url: "/feeds/posts/default/-/" + t + "?alt=json-in-script&max-results=" + a,
                    type: "get",
                    dataType: "jsonp",
                    success: function (t) {
                        for (var s = "", r = '<div class="blockA01-feat-wrap"><div class="container-fluid px-0"><div class="row">', i = 0; i < t.feed.entry.length; i++) {
                            for (var c = 0; c < t.feed.entry[i].link.length; c++)
                                if ("alternate" == t.feed.entry[i].link[c].rel) {
                                    s = t.feed.entry[i].link[c].href;
                                    break;
                                }
                            for (var n, o = 0; o < t.feed.entry[i].link.length; o++)
                                if ("replies" === t.feed.entry[i].link[o].rel && "text/html" === t.feed.entry[i].link[o].type) {
                                    n = t.feed.entry[i].link[o].title;
                                    break;
                                }
                            if (((n = parseInt(n, 10)), "content" in t.feed.entry[i])) var d = t.feed.entry[i].content.$t;
                            else if ("summary" in b_rc) d = t.feed.entry[i].summary.$t;
                            else d = "";
                            (d = d.replace(/<\S[^>]*>/g, "")).length > 170 && (d = d.substring(0, 150) + "...");
                            var f = t.feed.entry[i].title.$t,
                                h = t.feed.entry[i].category[0].term,
                                v = t.feed.entry[i].author[0].name.$t,
                                p = (t.feed.entry[i].author[0].gd$image.src, t.feed.entry[i].published.$t),
                                u = p.substring(0, 4),
                                b = p.substring(5, 7),
                                g = p.substring(8, 10),
                                m = e[parseInt(b, 10)] + " " + g + ", " + u,
                                y = t.feed.entry[i].content.$t,
                                k = $("<div>").html(y);
                            if (y.indexOf("<img") > -1) o = k.find("img:first").attr("src");
                            else o = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                            r +=
                                0 == i
                                    ? '<div class="blockA01-col-widget-first col-12 mb-4 position-relative"><div class="blockA01-col-widget-feat-image"><div class="blockA01-thumb"><a class="blockA01-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="blockA01-overlay"/></a><div class="blockA01-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div><div class="blockA01-col-widget-wrap text-center align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-10 m-auto"><h3 class="blockA01-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="blockA01-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="blockA01-auth-ty">' +
                                      v +
                                      '</span><span class="blockA01-col-widget-time">' +
                                      m +
                                      "</span></div></div></div></div></div></div></div>"
                                    : '<div class="blockA01-col-widget-second col-12 mb-4 position-relative"><div class="blockA01-col-widget-feat-image">   <div class="blockA01-thumb float-left"><a class="blockA01-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="blockA01-overlay"/></a><div class="blockA01-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div></div><div class="blockA01-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-12 p-0"><h3 class="blockA01-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="blockA01-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="blockA01-auth-ty">' +
                                      v +
                                      "</span></div></div></div></div></div></div>";
                        }
                        (r += "</div></div></div>"),
                            $(".HTML .widget-content").each(function () {
                                $(this).parent().attr("id") == l &&
                                    ($(this).html(r),
                                    $(this).parent().addClass("blockA01"),
                                    $(this).parent().addClass("blockA01ection float-left w-100"),
                                    $(this)
                                        .prev("h2")
                                        .wrapInner('<a href="/search/label/' + h + "?&max-result=" + a + '"></a>'),
                                    $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                    $(this)
                                        .prev(".heading-head")
                                        .append('<a class="tymore" href="/search/label/' + h + "?&max-result=" + a + '">View More</a>'),
                                    $(".blockA01-left").addClass("comload").removeClass("preload"),
                                    $(this)
                                        .find(".blockA01-img,.ty-img")
                                        .each(function () {
                                            $(this)
                                                .attr("style", function (e, t) {
                                                    return t.replace("/default.jpg", "/mqdefault.jpg");
                                                })
                                                .attr("style", function (e, t) {
                                                    return t.replace("s72-c", "s1600");
                                                });
                                        }));
                            });
                    },
                });
        });
    }),
    $(document).ready(function () {
        $(".HTML .widget-content").each(function () {
            $(this).prev("h2").text();
            var e = $(this).find("span").attr("label"),
                t = $(this).find("span").attr("number"),
                a = $(this).parent().attr("id"),
                l = $(this).find("span").attr("type");
            null != l &&
                l.match("blockA02") &&
                $.ajax({
                    url: "/feeds/posts/default/-/" + e + "?alt=json-in-script&max-results=" + t,
                    type: "get",
                    dataType: "jsonp",
                    success: function (e) {
                        for (var l = "", s = '<div class="blockA02-feat-wrap"><div class="container-fluid px-0"><div class="row">', r = 0; r < e.feed.entry.length; r++) {
                            for (var i = 0; i < e.feed.entry[r].link.length; i++)
                                if ("alternate" == e.feed.entry[r].link[i].rel) {
                                    l = e.feed.entry[r].link[i].href;
                                    break;
                                }
                            for (var c, n = 0; n < e.feed.entry[r].link.length; n++)
                                if ("replies" === e.feed.entry[r].link[n].rel && "text/html" === e.feed.entry[r].link[n].type) {
                                    c = e.feed.entry[r].link[n].title;
                                    break;
                                }
                            if (((c = parseInt(c, 10)), "content" in e.feed.entry[r])) var o = e.feed.entry[r].content.$t;
                            else if ("summary" in b_rc) o = e.feed.entry[r].summary.$t;
                            else o = "";
                            (o = o.replace(/<\S[^>]*>/g, "")).length > 170 && (o = o.substring(0, 150) + "...");
                            var d = e.feed.entry[r].title.$t,
                                f = e.feed.entry[r].category[0].term,
                                h = e.feed.entry[r].author[0].name.$t,
                                v = (e.feed.entry[r].author[0].gd$image.src, e.feed.entry[r].published.$t),
                                p = v.substring(0, 4),
                                u = v.substring(5, 7),
                                b = v.substring(8, 10),
                                g = (parseInt(u, 10), e.feed.entry[r].content.$t),
                                m = $("<div>").html(g);
                            if (g.indexOf("<img") > -1) n = m.find("img:first").attr("src");
                            else n = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                            s +=
                                '<div class="blockA02-col-widget-second col-12 mb-4 position-relative"><div class="blockA02-col-widget-feat-image">   <div class="blockA02-thumb float-left"><a class="blockA02-col-widget-img" href="' +
                                l +
                                '" style="background:url(' +
                                n +
                                ') no-repeat center center;background-size: cover"><span class="blockA02-overlay"/></a><div class="blockA02-category-gallery"><a class="icon ' +
                                f +
                                '" href="/search/label/' +
                                f +
                                "?&max-result=" +
                                t +
                                '"></a></div></div><div class="blockA02-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-12 p-0"><h3 class="blockA02-title"><a href="' +
                                l +
                                '">' +
                                d +
                                '</a></h3><div class="blockA02-label"><a class="icon ' +
                                f +
                                '" href="/search/label/' +
                                f +
                                "?&max-result=" +
                                t +
                                '">' +
                                f +
                                '</a></div><span class="blockA02-auth-ty">' +
                                h +
                                "</span></div></div></div></div></div></div>";
                        }
                        (s += "</div></div></div>"),
                            $(".HTML .widget-content").each(function () {
                                $(this).parent().attr("id") == a &&
                                    ($(this).html(s),
                                    $(this).parent().addClass("blockA02"),
                                    $(this).parent().addClass("blockA02ection float-left w-100"),
                                    $(this)
                                        .prev("h2")
                                        .wrapInner('<a href="/search/label/' + f + "?&max-result=" + t + '"></a>'),
                                    $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                    $(this)
                                        .prev(".heading-head")
                                        .append('<a class="tymore" href="/search/label/' + f + "?&max-result=" + t + '">View More</a>'),
                                    $(".blockA02-left").addClass("comload").removeClass("preload"),
                                    $(this)
                                        .find(".blockA02-img,.ty-img")
                                        .each(function () {
                                            $(this)
                                                .attr("style", function (e, t) {
                                                    return t.replace("/default.jpg", "/mqdefault.jpg");
                                                })
                                                .attr("style", function (e, t) {
                                                    return t.replace("s72-c", "s1600");
                                                });
                                        }));
                            });
                    },
                });
        });
    }),
    $(document).ready(function () {
        var e = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        $(".HTML .widget-content").each(function () {
            $(this).prev("h2").text();
            var t = $(this).find("span").attr("label"),
                a = $(this).find("span").attr("number"),
                l = $(this).parent().attr("id"),
                s = $(this).find("span").attr("type");
            null != s &&
                s.match("blockA03") &&
                $.ajax({
                    url: "/feeds/posts/default/-/" + t + "?alt=json-in-script&max-results=" + a,
                    type: "get",
                    dataType: "jsonp",
                    success: function (t) {
                        for (var s = "", r = '<div class="blockA03-feat-wrap"><div class="container-fluid px-0"><div class="row">', i = 0; i < t.feed.entry.length; i++) {
                            for (var c = 0; c < t.feed.entry[i].link.length; c++)
                                if ("alternate" == t.feed.entry[i].link[c].rel) {
                                    s = t.feed.entry[i].link[c].href;
                                    break;
                                }
                            for (var n, o = 0; o < t.feed.entry[i].link.length; o++)
                                if ("replies" === t.feed.entry[i].link[o].rel && "text/html" === t.feed.entry[i].link[o].type) {
                                    n = t.feed.entry[i].link[o].title;
                                    break;
                                }
                            if (((n = parseInt(n, 10)), "content" in t.feed.entry[i])) var d = t.feed.entry[i].content.$t;
                            else if ("summary" in b_rc) d = t.feed.entry[i].summary.$t;
                            else d = "";
                            (d = d.replace(/<\S[^>]*>/g, "")).length > 170 && (d = d.substring(0, 150) + "...");
                            var f = t.feed.entry[i].title.$t,
                                h = t.feed.entry[i].category[0].term,
                                v = t.feed.entry[i].author[0].name.$t,
                                p = (t.feed.entry[i].author[0].gd$image.src, t.feed.entry[i].published.$t),
                                u = p.substring(0, 4),
                                b = p.substring(5, 7),
                                g = p.substring(8, 10),
                                m = e[parseInt(b, 10)] + " " + g + ", " + u,
                                y = t.feed.entry[i].content.$t,
                                k = $("<div>").html(y);
                            if (y.indexOf("<img") > -1) o = k.find("img:first").attr("src");
                            else o = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
                            r +=
                                0 == i
                                    ? '<div class="blockA03-col-widget-first col-12 mb-4 mb-4 position-relative"><div class="blockA03-col-widget-feat-image"><div class="blockA03-thumb"><a class="blockA03-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="blockA03-overlay"/></a><div class="blockA03-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div></div><div class="blockA03-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-12 p-0"><h3 class="blockA03-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="blockA03-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="blockA03-auth-ty">' +
                                      v +
                                      '</span><span class="blockA03-col-widget-time">' +
                                      m +
                                      "</span></div></div></div></div></div></div>"
                                    : '<div class="blockA03-col-widget-second col-12 mb-3 position-relative"><div class="blockA03-col-widget-feat-image">   <div class="blockA03-thumb float-left"><a class="blockA03-col-widget-img" href="' +
                                      s +
                                      '" style="background:url(' +
                                      o +
                                      ') no-repeat center center;background-size: cover"><span class="blockA03-overlay"/></a><div class="blockA03-category-gallery"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '"></a></div></div><div class="blockA03-col-widget-wrap text-left align-items-center justify-content-center"><div class="container"><div class="row"><div class="col-12 col-sm-12 col-md-10 col-lg-12 col-xl-12 p-0"><h3 class="blockA03-title"><a href="' +
                                      s +
                                      '">' +
                                      f +
                                      '</a></h3><div class="blockA03-label"><a class="icon ' +
                                      h +
                                      '" href="/search/label/' +
                                      h +
                                      "?&max-result=" +
                                      a +
                                      '">' +
                                      h +
                                      '</a></div><span class="blockA03-auth-ty">' +
                                      v +
                                      "</span></div></div></div></div></div></div>";
                        }
                        (r += "</div></div></div>"),
                            $(".HTML .widget-content").each(function () {
                                $(this).parent().attr("id") == l &&
                                    ($(this).html(r),
                                    $(this).parent().addClass("blockA03"),
                                    $(this).parent().addClass("blockA03ection float-left w-100"),
                                    $(this)
                                        .prev("h2")
                                        .wrapInner('<a href="/search/label/' + h + "?&max-result=" + a + '"></a>'),
                                    $(this).prev("h2").wrap('<div class="heading-head"></div>'),
                                    $(this)
                                        .prev(".heading-head")
                                        .append('<a class="tymore" href="/search/label/' + h + "?&max-result=" + a + '">View More</a>'),
                                    $(".blockA03-left").addClass("comload").removeClass("preload"),
                                    $(this)
                                        .find(".blockA03-img,.ty-img")
                                        .each(function () {
                                            $(this)
                                                .attr("style", function (e, t) {
                                                    return t.replace("/default.jpg", "/mqdefault.jpg");
                                                })
                                                .attr("style", function (e, t) {
                                                    return t.replace("s72-c", "s1600");
                                                });
                                        }));
                            });
                    },
                });
        });
    });
