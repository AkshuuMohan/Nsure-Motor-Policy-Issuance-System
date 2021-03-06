// ---- Angular Hammer ----
// Copyright (c) 2015 Ryan S Mullins <ryan@ryanmullins.org>
// Licensed under the MIT Software License
//
// (fairly heavy) modifications by James Wilson <me@unbui.lt>
//
! function(a, b, c) {
    "use strict";

    function d(a, b) {
        if (void 0 === a || void 0 === b) return null;
        var d;
        return d = b.indexOf("pan") > -1 ? new c.Pan : b.indexOf("pinch") > -1 ? new c.Pinch : b.indexOf("press") > -1 ? new c.Press : b.indexOf("rotate") > -1 ? new c.Rotate : b.indexOf("swipe") > -1 ? new c.Swipe : new c.Tap, a.add(d), d
    }

    function e(a, b) {
        return a && (b.preventGhosts = a.preventGhosts), b
    }

    function f(a) {
        return a.indexOf("pan") > -1 ? "pan" : a.indexOf("pinch") > -1 ? "pinch" : a.indexOf("press") > -1 ? "press" : a.indexOf("rotate") > -1 ? "rotate" : a.indexOf("swipe") > -1 ? "swipe" : a.indexOf("tap") > -1 ? "tap" : "custom"
    }

    function g(a, b, c) {
        if (null == a || null == b || null == b.type) return console.error("ERROR: Angular Hammer could not setup the recognizer. Values of the passed manager and options: ", a, b);
        var e = a.get(b._name);
        if (e || (e = d(a, b._name)), b.directions || ("pan" === b._name || "swipe" === b._name ? b.directions = "DIRECTION_ALL" : b._name.indexOf("left") > -1 ? b.directions = "DIRECTION_LEFT" : b._name.indexOf("right") > -1 ? b.directions = "DIRECTION_RIGHT" : b._name.indexOf("up") > -1 ? b.directions = "DIRECTION_UP" : b._name.indexOf("down") > -1 ? b.directions = "DIRECTION_DOWN" : b.directions = ""), b.direction = h(b.directions), e.set(b), "string" == typeof b.recognizeWith) {
            var f;
            null == a.get(b.recognizeWith) && (f = d(a, b.recognizeWith)), null != f && e.recognizeWith(f)
        }
        if ("string" == typeof b.dropRecognizeWith && null != a.get(b.dropRecognizeWith) && e.dropRecognizeWith(a.get(b.dropRecognizeWith)), "string" == typeof b.requireFailure) {
            var g;
            null == a.get(b.requireFailure) && (g = d(a, {
                type: b.requireFailure
            })), null != g && e.requireFailure(g)
        }
        "string" == typeof b.dropRequireFailure && null != a.get(b.dropRequireFailure) && e.dropRequireFailure(a.get(b.dropRequireFailure)), b.preventGhosts === !0 && null != c && i(c)
    }

    function h(a) {
        var d = 0;
        return b.forEach(a.split("|"), function(a) {
            c.hasOwnProperty(a) && (d |= c[a])
        }), d
    }

    function i(b) {
        function c(a) {
            for (var b = 0; b < g.length; b++) {
                var c = g[b][0],
                    d = g[b][1];
                if (Math.abs(a.clientX - c) < h && Math.abs(a.clientY - d) < h) {
                    a.stopPropagation(), a.preventDefault();
                    break
                }
            }
        }

        function d() {
            g = []
        }

        function e() {
            g.splice(0, 1)
        }

        function f(a) {
            if (a.touches.length - a.changedTouches.length <= 0) {
                var b = a.changedTouches[0];
                g.push([b.clientX, b.clientY]), setTimeout(e, i)
            }
        }
        if (b) {
            var g = [],
                h = 25,
                i = 2500;
            "ontouchstart" in a && (b[0].addEventListener("touchstart", d, !0), b[0].addEventListener("touchend", f, !0), b[0].addEventListener("click", c, !0), b[0].addEventListener("mouseup", c, !0))
        }
    }
    if ("undefined" == typeof b) throw Error("angular-hammer: AngularJS (window.angular) is undefined but is necessary.");
    if ("undefined" == typeof c) throw Error("angular-hammer: HammerJS (window.Hammer) is undefined but is necessary.");
    var j = ["hmCustom:custom", "hmSwipe:swipe", "hmSwipeleft:swipeleft", "hmSwiperight:swiperight", "hmSwipeup:swipeup", "hmSwipedown:swipedown", "hmPan:pan", "hmPanstart:panstart", "hmPanmove:panmove", "hmPanend:panend", "hmPancancel:pancancel", "hmPanleft:panleft", "hmPanright:panright", "hmPanup:panup", "hmPandown:pandown", "hmPress:press", "hmPressup:pressup", "hmRotate:rotate", "hmRotatestart:rotatestart", "hmRotatemove:rotatemove", "hmRotateend:rotateend", "hmRotatecancel:rotatecancel", "hmPinch:pinch", "hmPinchstart:pinchstart", "hmPinchmove:pinchmove", "hmPinchend:pinchend", "hmPinchcancel:pinchcancel", "hmPinchin:pinchin", "hmPinchout:pinchout", "hmTap:tap", "hmDoubletap:doubletap"],
        k = "hmTouchEvents",
        l = b.module("hmTouchEvents", []);
    l.provider(k, function() {
        function a(a) {
            return a = b.copy(a), a.event ? "doubletap" == a.event ? (a.type = "tap", a.taps || (a.taps = 2), a._name = "doubletap") : a._name = !1 : a._name = a.type || !1, a
        }

        function d(b) {
            if ("custom" == b) throw Error(k + "Provider: no defaults exist for custom events");
            var c = f(b);
            return a("doubletap" == b ? {
                type: c,
                event: "doubletap"
            } : {
                type: c
            })
        }
        var e = this,
            g = !1,
            h = {},
            i = {},
            j = {};
        j[c.Tap.toString()] = "tap", j[c.Pan.toString()] = "pan", j[c.Pinch.toString()] = "pinch", j[c.Press.toString()] = "press", j[c.Rotate.toString()] = "rotate", j[c.Swipe.toString()] = "swipe", e.applyHammerPresets = function() {
            var d = c.defaults.preset;
            b.forEach(d, function(b) {
                var c = b[1];
                c.type || (c.type = j[b[0]]), c = a(c), c._name && (h[c._name] = c)
            })
        }, e.addManagerOption = function(a, c) {
            "object" == typeof a ? b.extend(i, a) : i[a] = c
        }, e.addRecognizerOption = function(b) {
            if (Array.isArray(b))
                for (var c = 0; c < b.length; c++) e.addRecognizerOption(b[c]);
            else {
                if ("object" != typeof b) throw Error(k + "Provider: addRecognizerOption: should be object or array of objects");
                b = a(b), b._name ? h[b.type] = b : b.event || (g = b)
            }
        }, e.$get = function() {
            return {
                extendWithDefaultManagerOpts: function(a) {
                    a = "object" != typeof a ? {} : b.copy(a);
                    for (var c in i) a[c] || (a[c] = b.copy(i[c]));
                    return a
                },
                extendWithDefaultRecognizerOpts: function(c, e) {
                    if ("object" != typeof e && (e = []), Array.isArray(e) || (e = [e]), "custom" == c) return e;
                    var i, j = f(c),
                        k = h[c] || h[j],
                        l = !1,
                        m = b.extend({}, g || {}, k || {});
                    return e.forEach(function(a) {
                        return a.event || a.type ? void(l || (a.event == c ? (i = a, l = !0) : a.event || a.type != j || (i = a))) : b.extend(m, a)
                    }), i = i ? a(i) : d(c), [b.extend(m, i)]
                }
            }
        }
    }), b.forEach(j, function(a) {
        var d = a.split(":"),
            f = d[0],
            h = d[1];
        l.directive(f, ["$parse", "$window", k, function(a, d, i) {
            return {
                restrict: "A",
                scope: !1,
                link: function(j, l, m) {
                    if (!c || !d.addEventListener) throw Error(k + ": window.Hammer or window.addEventListener not found, can't add event " + f);
                    var n = l.data("hammer"),
                        o = i.extendWithDefaultManagerOpts(j.$eval(m.hmManagerOptions)),
                        p = i.extendWithDefaultRecognizerOpts(h, j.$eval(m.hmRecognizerOptions));
                    n || (n = new c.Manager(l[0], o), l.data("hammer", n), j.$on("$destroy", function() {
                        n.destroy()
                    }));
                    var q = a(m[f]).bind(null, j),
                        r = function(a) {
                            a.element = l;
                            var b = n.get(a.type);
                            b && (b.options.preventDefault && a.preventDefault(), b.options.stopPropagation && a.srcEvent.stopPropagation()), j.$apply(function() {
                                q({
                                    $event: a
                                })
                            })
                        };
                    b.forEach(p, function(a) {
                        "custom" !== h && ("doubletap" === h && n.get("tap") ? a.recognizeWith = "tap" : "pan" == a.type && n.get("swipe") ? a.recognizeWith = "swipe" : "pinch" == a.type && n.get("rotate") && (a.recognizeWith = "rotate")), g(n, e(o, a), l), n.on(h, r)
                    })
                }
            }
        }])
    })
}(window, window.angular, window.Hammer);
//# sourceMappingURL=angular.hammer.min.js.map