(this["foxxielofi-app"] = this["foxxielofi-app"] || []).push([
    [0],
    {
        46: function(e, t, n) { },
        82: function(e, t, n) {
            var g = [
                { id: "jfKfPfyJRdk", name: "lofi hip hop radio - beats to relax/study to" },
                { id: "28KRPhVzCus", name: "lofi hip hop radio - beats to sleep/chill to" },
                { id: "5yx6BWlEVcY", name: "Chillhop Radio - jazzy & lofi hip hop beats" },
                { id: "qH3fETPsqXU", name: "【24/7 CHILL LOFI HIP HOP RADIO】beats to sleep/relax/study to" },
                { id: "CLeZyIID9Bo", name: "Chill Lofi Mix [chill lo-fi hip hop beats]" },
                { id: "YOJsKatW-Ts", name: "Rain+Lofi Chill 19m: Space Traveling Background Music" },
                { id: "4xDzrJKXOOY", name: "synthwave radio 🌌 - beats to chill/game to" },
                { id: "M8yB4NqlnqQ", name: "lofi songs for cold days" },
                { id: "q55qNEKQLG0", name: "RAINING IN OSAKA ( Lofi HipHop) 3 Hour Extended" },
                { id: "og0F2Dpcs1I", name: "Study Lofi 📚 Lofi Deep Focus Study Work Concentration" },
                { id: "VKum4lF8a10", name: "3 hours of relaxing and beautiful animal crossing music" },
                { id: "34KOjUSdv50", name: "Video Game Study Lounge 🎮" },
                { id: "mF3m7Jza2uc", name: "Zelda & Chill + Zelda & Chill 2" },
                { id: "NJuSStkIZBg", name: "Rainy Jazz Cafe ☕️" },
                { id: "8TbLuBOClSg", name: "Cozy animal crossing music that cures my headaches🌿" },
                { id: "IumNzh6yvfM", name: "pov: it finally feels like summer (an animal crossing playlist)" },
                { id: "azV9PMW5-Ro", name: "[24/7 study with me] chill study live stream" },
                { id: "v3gOQbh32Pg", name: "nintendo chill mix" }
            ];

            const currentGVersion = hash(JSON.stringify(g)); // Create a hash of the current list

            function loadJSON(key) {
                console.log(`Attempting to load JSON data for key: "${key}"`);
                try {
                    var data = localStorage.getItem(key);
                    if (!data) {
                        console.warn(`No data found for key "${key}" or data is empty. Returning empty array.`);
                        return [];
                    }
                    var parsedData = JSON.parse(data);
                    console.log(`Data successfully retrieved for key "${key}":`, parsedData);
                    return parsedData;
                } catch (e) {
                    console.error(`Error parsing JSON from localStorage for key "${key}":`, e);
                    return [];
                }
            }

            function saveJSON(key, data) {
                console.log(`Attempting to save JSON data for key: "${key}"`);
                try {
                    if (data === undefined || data === null) {
                        throw new Error("Cannot save undefined or null data");
                    }
                    var jsonData = JSON.stringify(data);
                    localStorage.setItem(key, jsonData);
                    console.log(`Data successfully saved for key "${key}":`, jsonData);
                } catch (e) {
                    console.error(`Error saving JSON to localStorage for key "${key}":`, e);
                }
            }

            function hash(str) {
                var hash = 0, i, chr;
                if (str.length === 0) return hash;
                for (i = 0; i < str.length; i++) {
                    chr = str.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash |= 0;
                }
                return hash;
            }

            function resetLocalStorage() {
                console.log("Attempting to reset localStorage.");
                try {
                    localStorage.removeItem("g");
                    localStorage.removeItem("customVideos");
                    localStorage.removeItem("visitCount");
                    localStorage.removeItem("gVersion");
                    console.log("LocalStorage reset successfully.");
                } catch (e) {
                    console.error("Error resetting localStorage:", e);
                }
            }

            function getCombinedList() {
                var storedG = loadJSON("g");
                var storedVersion = localStorage.getItem("gVersion");

                // Compare versions to check if `g` has been updated
                if (storedVersion !== currentGVersion) {
                    console.log("Stored g list is outdated. Updating localStorage with new list.");
                    saveJSON("g", g);
                    localStorage.setItem("gVersion", currentGVersion);
                    storedG = g;
                } else {
                    console.log("Stored g list is up-to-date.");
                }

                var customVideos = loadJSON("customVideos");
                console.log("Loaded storedG:", storedG);
                console.log("Loaded customVideos:", customVideos);

                return {
                    defaultVideos: storedG,
                    customVideos: customVideos,
                };
            }

            function deduplicateByName(list) {
                const seen = new Set();
                const result = [];
                list.forEach((video) => {
                    if (!seen.has(video.name)) {
                        seen.add(video.name);
                        result.push(video);
                    } else {
                        console.log(`Duplicate found and removed: ${video.name}`);
                    }
                });
                return result;
            }

            var { defaultVideos, customVideos } = getCombinedList();
            var uniqueDefaultVideos = deduplicateByName(defaultVideos);

            console.log("Default Videos:", defaultVideos);
            console.log("Unique Default Videos:", uniqueDefaultVideos);
            console.log("Custom Videos:", customVideos);

            if (uniqueDefaultVideos.length < defaultVideos.length) {
                console.log("Duplicates found and removed based on name.");
            } else {
                console.log("No duplicates found.");
            }

            var finalList = [...uniqueDefaultVideos, ...customVideos];
            var uniqueFinalList = deduplicateByName(finalList);
            saveJSON("g", uniqueFinalList);
            g = uniqueFinalList;

            incrementVisitCount();
            var visitCount = getVisitCount();
            var welcomeMessage = getWelcomeMessage(visitCount);
            console.log("Final welcome message:", welcomeMessage);

            // Your custom video addition event listener
            document.addEventListener("customVideoAdded", function(event) {
                console.log("Custom video addition event detected.");
                var videoData = event.detail;
                console.log("Received customVideoAdded event:", videoData);

                if (!videoData || !videoData.id || !videoData.name) {
                    console.error("Invalid videoData received:", videoData);
                    return;
                }

                var { defaultVideos, customVideos } = getCombinedList();
                var isVideoInArray = customVideos.some(function(video) {
                    return video.name === videoData.name;
                });

                if (!isVideoInArray) {
                    console.log("Adding new custom video:", videoData);
                    var newVideo = {
                        id: videoData.id,
                        name: videoData.name,
                        embedLink: videoData.embedLink || "",
                        isCustom: true,
                    };
                    customVideos.push(newVideo);

                    // Re-deduplicate after adding the new custom video
                    var finalList = [...uniqueDefaultVideos, ...customVideos];
                    var uniqueFinalList = deduplicateByName(finalList);
                    console.log("Updated Unique Default Videos:", uniqueDefaultVideos);
                    console.log("Updated Final List:", uniqueFinalList);

                    saveJSON("g", uniqueFinalList);
                    saveJSON("customVideos", customVideos);

                    g = uniqueFinalList;
                } else {
                    alert("Station already exists!");
                }
            });

            function getVisitCount() {
                console.log("Attempting to get visit count from localStorage.");
                try {
                    var visitCount = localStorage.getItem("visitCount");
                    console.log("Retrieved visit count:", visitCount);
                    if (visitCount === null) {
                        console.log("No visit count found. Initializing to 0.");
                        visitCount = 0;
                        localStorage.setItem("visitCount", visitCount);
                    }
                    return parseInt(visitCount, 10);
                } catch (e) {
                    console.error("Error getting visit count from localStorage:", e);
                    return 0;
                }
            }

            function incrementVisitCount() {
                console.log("Incrementing visit count.");
                var visitCount = getVisitCount();
                visitCount++;
                localStorage.setItem("visitCount", visitCount);
                console.log("Incremented visit count:", visitCount);
            }

            function getWelcomeMessage(visitCount) {
                console.log("Formatting welcome message for visit count:", visitCount);
                if (visitCount === 1) {
                    return "Welcome! It's your first visit.";
                } else {
                    return "Welcome back! You've visited " + visitCount + " times.";
                }
            }

            document.addEventListener("DOMContentLoaded", function() {
                console.log("DOM fully loaded. Starting initialization.");
                incrementVisitCount();
                var visitCount = getVisitCount();
                var welcomeMessage = getWelcomeMessage(visitCount);
            });


            ("use strict");
            n.r(t);
            var i = n(1),
                c = n(0),
                a = n.n(c),
                o = n(18),
                r = n.n(o),
                s = n(4),
                l = (n(46), n(3)),
                u = n(28);
            function b(e, t) {
                var n =
                    arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : window,
                    i = Object(c.useRef)();
                Object(c.useEffect)(
                    function() {
                        i.current = t;
                    },
                    [t]
                ),
                    Object(c.useEffect)(
                        function() {
                            if (n && n.addEventListener) {
                                var t = function(e) {
                                    return i.current(e);
                                };
                                return (
                                    n.addEventListener(e, t),
                                    function() {
                                        n.removeEventListener(e, t);
                                    }
                                );
                            }
                        },
                        [e, n]
                    );
            }
            function d() {
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : [],
                    t =
                        !(arguments.length > 1 && void 0 !== arguments[1]) ||
                        arguments[1];
                function n(n) {
                    t &&
                        e.forEach(function(e) {
                            var t = (e[2] || {}).withShift;
                            ("any" === e[0] ||
                                (n.key === e[0] && (!0 !== t || n.shiftKey))) &&
                                (n.preventDefault(), e[1] && e[1]());
                        });
                }
                return (
                    b("keyup", function(e) {
                        var t;
                        j.includes(
                            null === (t = e.target) || void 0 === t
                                ? void 0
                                : t.tagName
                        ) || n(e);
                    }),
                    null
                );
            }
            var j = ["INPUT", "TEXTAREA"],
                m = n(5),
                f = n(33),
                O = n.n(f),
                h = n(0),
                p = h.useEffect,
                v = h.useState;
            var x = function() {
                var e = v(!1),
                    t = Object(l.a)(e, 2),
                    n = t[0],
                    i = t[1];
                return (
                    p(function() {
                        i(
                            [
                                "iPad Simulator",
                                "iPhone Simulator",
                                "iPod Simulator",
                                "iPad",
                                "iPhone",
                                "iPod",
                            ].includes(navigator.platform) ||
                            (navigator.userAgent.includes("Mac") &&
                                "ontouchend" in document)
                        );
                    }, []),
                    n
                );
            },
                g = g,
                y = {
                    track: function(e, t) { },
                },
                I = function() {
                    var e = Object(c.useState)(""),
                        t = Object(l.a)(e, 2),
                        n = t[0],
                        i = t[1];
                    return (
                        Object(c.useEffect)(
                            function() {
                                setTimeout(function() {
                                    "" === n && i("."),
                                        "." === n && i(".."),
                                        ".." === n && i("..."),
                                        "..." === n && i("");
                                }, 300);
                            },
                            [n]
                        ),
                        n
                    );
                },
                w = n.p + "./media/beats1.bb5eeeaf.svg",
                N = n.p + "./media/beats2.6d67e4f1.svg",
                M = n.p + "./media/beats3.b7b47b9b.svg",
                Z = n.p + "./media/beats4.ad915208.svg",
                z = n.p + "./media/beatsMute.70cdfd3c.svg",
                T = n.p + "./media/buffering1.27886777.svg",
                A = n.p + "./media/buffering2.97cf3daf.svg",
                G = n.p + "./media/buffering3.34a0de3c.svg",
                D = n.p + "./media/buffering4.e55cf19d.svg",
                P = n.p + "./media/checkmark.27630148.svg",
                S = n.p + "./media/facebook.3fe0a515.svg",
                H = n.p + "./media/Unknown-removebg-preview.png",
                L = n.p + "./media/Media_Viewer_Icon_-_Fullscreen.svg.png",
                E =
                    n.p +
                    "./media/Media_Viewer_Icon_-_Close_Fullscreen.svg.png",
                Y = n.p + "./media/icon.png",
                AA = n.p + "./media/whiteplus.png",
                AB = n.p + "./media/4837776.png",
                k = n.p + "./media/mail.7a7748f6.svg",
                W = n.p + "./media/mailbrew.3d6186a7.svg",
                R = n.p + "./media/open.b33a26e7.svg",
                B = n.p + "./media/pause-icon-18-256.png",
                F =
                    n.p +
                    "media/639-6391407_transparent-play-icon-white-png-png-download-removebg-preview.png",
                V = n.p + "./media/Unknown-2-removebg-preview.png";
            function X(e) {
                var t = e.name,
                    n = e.style;
                return Object(i.jsx)("img", {
                    className: "shadow",
                    src: Q[t],
                    alt: "",
                    style: Object(m.a)(
                        {
                            width: 20,
                            height: 20,
                            flex: "0 0 20px",
                        },
                        n
                    ),
                });
            }
            var Q = {
                shuffle: n.p + "./media/Unknown-4-removebg-preview.png",
                play: F,
                pause: B,
                forward: H,
                previous: V,
                open: R,
                timer: n.p + "./media/31-314846_clock-icon-png-white-transparent-png-removebg-preview.png",
                mail: k,
                heart: Y,
                plus: AA,
                rain: AB,
                twitter: n.p + "./media/31-314846_clock-icon-png-white-transparent-png-removebg-preview.png",
                facebook: S,
                checkmark: P,
                fullscreenEnter: L,
                fullscreenExit: E,
                beats1: w,
                beats2: N,
                beats3: M,
                beats4: Z,
                buffering1: T,
                buffering2: A,
                buffering3: G,
                buffering4: D,
                beatsMute: z,
                mailbrew: W,
                chatImage: n.p + "./icon.png",
            };
            C = n(36);
            function U(e) {
                return Object(i.jsx)(
                    C.a,
                    Object(m.a)(
                        {
                            touch: !1,
                            arrow: !1,
                        },
                        e
                    )
                );
            }
            var J = function(e) {
                var t = e.onClick,
                    n = e.text,
                    c = e.style,
                    a = e.icon,
                    o = e.tooltip,
                    r = e.type,
                    s = e.value,
                    l = e.className;
                return Object(i.jsx)(U, {
                    content: o,
                    disabled: !o,
                    children: Object(i.jsxs)("button", {
                        onClick: t,
                        type: null !== r && void 0 !== r ? r : "button",
                        value: s,
                        style: Object(m.a)(
                            Object(m.a)(
                                {
                                    display: "flex",
                                    alignItems: "center",
                                },
                                c
                            ),
                            n
                                ? {}
                                : {
                                    lineHeight: 0,
                                }
                        ),
                        className: l,
                        title: o,
                        children: [
                            a &&
                            Object(i.jsx)(X, {
                                name: a,
                                style: {
                                    marginRight: n ? 8 : 0,
                                },
                            }),
                            n &&
                            Object(i.jsx)("span", {
                                children: n,
                            }),
                        ],
                    }),
                });
            },
                K = n(88),
                q = n(87);
            function _(e) {
                return "../default.gif";
            }
            var $ = "ontouchend" in document;
            var ee = function(e) {
                var t = e.isPlaying,
                    n = Object(c.useState)(1),
                    a = Object(l.a)(n, 2),
                    o = a[0],
                    r = a[1],
                    u = Object(s.f)(pe),
                    b = Object(s.f)(ve),
                    d = u < 0.1 || !t;
                return (
                    Object(c.useEffect)(function() {
                        var e = setInterval(function() {
                            r(function(e) {
                                return 4 === e ? 1 : e + 1;
                            });
                        }, 250);
                        return function() {
                            return clearInterval(e);
                        };
                    }, []),
                    Object(i.jsx)(X, {
                        name: d
                            ? "beatsMute"
                            : (b ? "buffering" : "beats") + o,
                        style: {
                            marginRight: "8px",
                        },
                    })
                );
            },
                te = function(e) {
                    var t = e.currentStationId,
                        n = e.setCurrentStationId,
                        c = e.isPlaying,
                        a = Object(s.e)(Ne),
                        o = Object(l.a)(a, 2),
                        r = o[0],
                        u = o[1],
                        b = Object(s.g)(we),
                        d = Object(s.g)(Ie);
                    if (!t) return null;
                    var j = g.find(function(e) {
                        return e.id === t;
                    });
                    if (!j) return null;
                    var m =
                        localStorage.stationClicked || $
                            ? Object(i.jsx)("span", {
                                children: j.name,
                            })
                            : Object(i.jsxs)("span", {
                                children: [
                                    Object(i.jsxs)("span", {
                                        className: "red",
                                        style: {
                                            display: "inline",
                                        },
                                        children: ["click to change >", " "],
                                    }),
                                    j.name,
                                ],
                            });
                    return Object(i.jsxs)("div", {
                        onChange: function(e) {
                            n(e.target.value);
                        },
                        value: t,
                        name: "stations",
                        id: "stations-selector",
                        children: [
                            Object(i.jsx)(K.a, {
                                children:
                                    r &&
                                    Object(i.jsx)(q.a.div, {
                                        initial: {
                                            y: 60,
                                            opacity: 0,
                                        },
                                        animate: {
                                            y: 0,
                                            opacity: 1,
                                        },
                                        exit: {
                                            y: 60,
                                            opacity: 0,
                                        },
                                        transition: {
                                            type: "spring",
                                            duration: 0.3,
                                            bounce: 0.1,
                                        },
                                        id: "stations-list",
                                        onClick: function() {
                                            return u(!1);
                                        },
                                        children: g.map(function(e) {
                                            var c = e.id === t;
                                            return Object(i.jsxs)("div", {
                                                className:
                                                    "station-wrapper pointer",
                                                onClick: function() {
                                                    c || n(e.id);
                                                },
                                                children: [
                                                    Object(i.jsxs)("div", {
                                                        className:
                                                            "station-thumbnail " +
                                                            (c
                                                                ? "green-box-small"
                                                                : ""),
                                                        style: {
                                                            position:
                                                                "relative",
                                                            backgroundImage: "url(".concat(
                                                                _(
                                                                    "station_thumb_" +
                                                                    e.id
                                                                ),
                                                                ")"
                                                            ),
                                                        },
                                                        children: [
                                                            Object(i.jsx)("a", {
                                                                onClick: function(
                                                                    e
                                                                ) {
                                                                    e.stopPropagation();
                                                                },
                                                                href: "https://www.youtube.com/watch?v=".concat(
                                                                    e.id
                                                                ),
                                                                target:
                                                                    "_blank",
                                                                rel:
                                                                    "noopener noreferrer",
                                                                style: {
                                                                    position:
                                                                        "absolute",
                                                                    top: 8,
                                                                    right: 8,
                                                                },
                                                                children: Object(
                                                                    i.jsx
                                                                )(X, {
                                                                    name:
                                                                        "open",
                                                                }),
                                                            }),
                                                            " ",
                                                        ],
                                                    }),
                                                    Object(i.jsx)(
                                                        "span",
                                                        {
                                                            className: "option",
                                                            children: e.name,
                                                        },
                                                        e.id
                                                    ),
                                                ],
                                            });
                                        }),
                                    }),
                            }),
                            Object(i.jsxs)("div", {
                                id: "stations-button",
                                className: "pointer",
                                onClick: function() {
                                    localStorage.setItem(
                                        "stationClicked",
                                        "true"
                                    ),
                                        r || y.track("Open Selector"),
                                        b(!1),
                                        d(!1),
                                        u(!r);
                                },
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "nowrap",
                                },
                                children: [
                                    Object(i.jsx)(ee, {
                                        isPlaying: c,
                                    }),
                                    " ",
                                    m,
                                ],
                            }),
                        ],
                    });
                },
                ne = function(e) {
                    var t = e.size,
                        n = void 0 === t ? 10 : t;
                    return Object(i.jsx)("div", {
                        style: {
                            width: n,
                            height: n,
                        },
                    });
                };
            var ie = function(e) {
                var t = e.on,
                    n = e.volume;
                return Object(i.jsx)("div", {
                    className: n > 0.02 ? "green-box" : "red-box",
                    style: {
                        width: 6,
                        height: 14,
                        marginRight: 5,
                        background: "white",
                        display: "inline-block",
                        pointerEvents: "none",
                        opacity: t ? 1 : 0.5,
                        borderRadius: "20%",
                    },
                });
            };
            var ce = function(e) {
                var t = e.volume,
                    n = e.setVolume,
                    a = e.style,
                    o = Object(c.useRef)(null),
                    r = Object(c.useState)(!1),
                    s = Object(l.a)(r, 2),
                    u = s[0],
                    b = s[1],
                    d = Object(c.useState)({
                        x: 0,
                        w: 0,
                    }),
                    j = Object(l.a)(d, 2),
                    f = j[0],
                    O = j[1];
                function h(e) {
                    b(!1);
                }
                function p(e) {
                    u && v(e);
                }
                function v(e) {
                    var t,
                        i = e.clientX;
                    n(
                        Math.min(
                            Math.max(
                                ((t = (i - f.x) / f.w),
                                    Math.round(100 * (t + Number.EPSILON)) / 100),
                                0
                            ),
                            1
                        )
                    );
                }
                return (
                    Object(c.useEffect)(
                        function() {
                            var e = o.current.getBoundingClientRect();
                            O({
                                x: e.x,
                                w: e.width,
                            });
                        },
                        [t]
                    ),
                    Object(i.jsx)("div", {
                        style: Object(m.a)(
                            {
                                userSelect: "none",
                            },
                            a
                        ),
                        children: Object(i.jsxs)("div", {
                            onMouseDown: function(e) {
                                b(!0), v(e);
                            },
                            onMouseOut: h,
                            onMouseUp: h,
                            onMouseMove: p,
                            onTouchMove: p,
                            onTouchEnd: h,
                            ref: o,
                            style: {
                                width: "auto",
                                display: "inline-block",
                            },
                            className: "pointer",
                            children: [
                                Object(i.jsx)(ie, {
                                    volume: t,
                                    on: t > 0.02,
                                }),
                                Object(i.jsx)(ie, {
                                    volume: t,
                                    on: t > 0.1,
                                }),
                                Object(i.jsx)(ie, {
                                    volume: t,
                                    on: t > 0.2,
                                }),
                                Object(i.jsx)(ie, {
                                    volume: t,
                                    on: t > 0.3,
                                }),
                                Object(i.jsx)(ie, {
                                    volume: t,
                                    on: t > 0.4,
                                }),
                                Object(i.jsx)(ie, {
                                    volume: t,
                                    on: t > 0.5,
                                }),
                                Object(i.jsx)(ie, {
                                    volume: t,
                                    on: t > 0.6,
                                }),
                                Object(i.jsx)(ie, {
                                    volume: t,
                                    on: t > 0.7,
                                }),
                                Object(i.jsx)(ie, {
                                    volume: t,
                                    on: t > 0.8,
                                }),
                                Object(i.jsx)(ie, {
                                    volume: t,
                                    on: t > 0.9,
                                }),
                            ],
                        }),
                    })
                );
            };
            function ae(e, t) {
                var n = Math.floor(Math.random() * e.length);
                return n === t ? ae(e, t) : n;
            }
            var oe = {
                width: "100%",
                zIndex: 6,
            },
                re = {
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                },
                se = {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                    background: "black",
                },
                le = {
                    pointerEvents: "none",
                    userSelect: "none",
                    position: "fixed",
                    top: "100%",
                    left: "100%",
                },
                ue = {
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                },
                be = {
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: -1,
                    borderRadius: "8px",
                },
                de = function() {
                    var e = Object(c.useState)(""),
                        t = Object(l.a)(e, 2),
                        n = t[0],
                        a = t[1];
                    return (
                        Object(c.useEffect)(
                            function() {
                                setTimeout(function() {
                                    "" === n && a("."),
                                        "." === n && a(".."),
                                        ".." === n && a("..."),
                                        "..." === n && a("");
                                }, 300);
                            },
                            [n]
                        ),
                        Object(i.jsxs)("span", {
                            children: ["Loading", n],
                        })
                    );
                },
                je = function(e) {
                    var t = e.onStationChanged,
                        n = e.isPlaying,
                        a = e.setIsPlaying,
                        o = Object(s.f)(he),
                        r = Object(s.e)(Ne),
                        u = Object(l.a)(r, 2),
                        b = u[0],
                        j = u[1],
                        f = Object(s.e)(xe),
                        h = Object(l.a)(f, 2),
                        p = h[0],
                        v = h[1],
                        w = Object(s.f)(ge),
                        N = Object(s.f)(ye),
                        M = Object(c.useState)(!0),
                        Z = Object(l.a)(M, 2),
                        z = Z[0],
                        T = Z[1],
                        A = Object(s.e)(ve),
                        G = Object(l.a)(A, 2),
                        D = G[0],
                        P = G[1],
                        S = Object(c.useState)(null),
                        H = Object(l.a)(S, 2),
                        L = H[0],
                        E = H[1],
                        Y = Object(s.e)(pe),
                        k = Object(l.a)(Y, 2),
                        W = k[0],
                        R = k[1],
                        B = Object(c.useState)(null),
                        F = Object(l.a)(B, 2),
                        V = F[0],
                        X = F[1],
                        Q = Object(c.useState)(""),
                        C = Object(l.a)(Q, 2),
                        U = C[0],
                        K = C[1],
                        q = Object(s.f)(he),
                        _ = Object(s.e)(Ze),
                        $ = Object(l.a)(_, 2),
                        ee = $[0],
                        ie = $[1],
                        je = !V && q && ee,
                        me = x();
                    function fe() {
                        X(null), K("");
                    }
                    function Oe(e) {
                        e
                            ? y.track("Player - Play")
                            : y.track("Player - Pause"),
                            a(e);
                    }
                    var Ie = Object(c.useCallback)(
                        function() {
                            fe(), j(!1);
                            var e = ae(g, N);
                            v(g[e].id), t(), y.track("Player - Shuffle");
                        },
                        [N, t]
                    );
                    function we() {
                        fe(), j(!1);
                        var e = (function(e, t) {
                            var n = t - 1;
                            return n < 0 ? e.length - 1 : n;
                        })(g, N);
                        v(g[e].id), t(), y.track("Player - Back");
                    }
                    function Me() {
                        fe(), j(!1);
                        var e = (function(e, t) {
                            var n = t + 1;
                            return n > e.length - 1 ? 0 : n;
                        })(g, N);
                        v(g[e].id), t(), y.track("Player - Forward");
                    }
                    return (
                        d(
                            [
                                ["ArrowRight", Me],
                                ["ArrowLeft", we],
                                [
                                    "ArrowUp",
                                    function() {
                                        R(
                                            Math.round(
                                                10 * Math.min(W + 0.1, 1)
                                            ) / 10
                                        );
                                    },
                                ],
                                [
                                    "ArrowDown",
                                    function() {
                                        R(
                                            Math.round(
                                                10 * Math.max(W - 0.1, 0)
                                            ) / 10
                                        );
                                    },
                                ],
                                [
                                    "v",
                                    function() {
                                        je || y.track("Xem video chính thức"),
                                            ie(!je);
                                    },
                                ],
                                [
                                    "Escape",
                                    function() {
                                        return j(!1);
                                    },
                                ],
                                [
                                    " ",
                                    function() {
                                        return Oe(!n);
                                    },
                                ],
                            ],
                            o
                        ),
                        Object(c.useEffect)(
                            function() {
                                var e;
                                if (D)
                                    return (
                                        (e = setTimeout(function() {
                                            E(!0);
                                        }, 3e3)),
                                        function() {
                                            return clearTimeout(e);
                                        }
                                    );
                                clearTimeout(e), E(!1);
                            },
                            [D, w]
                        ),
                        Object(c.useEffect)(
                            function() {
                                if (150 === V) {
                                    K(
                                        "Oops, this station is not working. Skipping it"
                                    );
                                    var e = setTimeout(function() {
                                        fe(), Ie();
                                    }, 4e3);
                                    return function() {
                                        return clearTimeout(e);
                                    };
                                }
                            },
                            [V, Ie]
                        ),
                        Object(i.jsxs)(i.Fragment, {
                            children: [
                                Object(i.jsxs)("div", {
                                    style: Object(m.a)(
                                        Object(m.a)({}, oe),
                                        {},
                                        {
                                            display: o ? "block" : "none",
                                        }
                                    ),
                                    children: [
                                        !b &&
                                        U &&
                                        Object(i.jsxs)("span", {
                                            className: "red",
                                            children: [
                                                U,
                                                Object(i.jsx)(I, {}),
                                            ],
                                        }),
                                        !b &&
                                        !U &&
                                        D &&
                                        L &&
                                        Object(i.jsxs)("span", {
                                            className: "red",
                                            children: [
                                                "Buffering",
                                                Object(i.jsx)(I, {}),
                                            ],
                                        }),
                                        Object(i.jsx)(ne, {
                                            size: 14,
                                        }),
                                        !z &&
                                        Object(i.jsx)("div", {
                                            id: "buttons-ui",
                                            children: Object(i.jsxs)(
                                                "div",
                                                {
                                                    style: re,
                                                    children: [
                                                        !n && Object(i.jsx)(J, {
                                                            icon: "play",
                                                            onClick: function() {
                                                                return Oe(!0);
                                                            },
                                                        }),
                                                        n && Object(i.jsx)(J, {
                                                            icon: "pause",
                                                            onClick: function() {
                                                                return Oe(!1);
                                                            },
                                                        }),
                                                        Object(i.jsx)(J, {
                                                            icon: "shuffle",
                                                            onClick: Ie,
                                                        }),
                                                        Object(i.jsx)(J, {
                                                            icon: "previous",
                                                            onClick: we,
                                                        }),
                                                        Object(i.jsx)(J, {
                                                            icon: "forward",
                                                            onClick: Me,
                                                        }),

                                                        // Adding the "Custom Video" button here
                                                        Object(i.jsx)(J, {
                                                            tooltip: "Add Custom Station",
                                                            icon: "plus",
                                                            onClick: function() {
                                                                if (typeof handleCustomVideo === "function") {
                                                                    handleCustomVideo();
                                                                } else {
                                                                    console.error("handleCustomVideo is not defined.");
                                                                }
                                                            },
                                                            style: {
                                                                marginRight: "14px",
                                                            },
                                                        }),

                                                        // Volume slider
                                                        !me && Object(i.jsx)(ce, {
                                                            volume: W,
                                                            setVolume: R,
                                                            style: {
                                                                marginLeft: "4px",
                                                            },
                                                        }),
                                                    ],
                                                }
                                            ),
                                        }),

                                        Object(i.jsx)(ne, {
                                            size: 12,
                                        }),
                                        !z &&
                                        Object(i.jsx)(te, {
                                            isPlaying: n,
                                            currentStationId: p,
                                            setCurrentStationId: function(
                                                e
                                            ) {
                                                v(e), t(), Oe(!0);
                                            },
                                        }),
                                        z &&
                                        Object(i.jsx)("div", {
                                            id: "buttons-ui",
                                            children: Object(i.jsx)(de, {}),
                                        }),
                                    ],
                                }),
                                Object(i.jsx)("div", {
                                    style: je ? se : le,
                                    className: "yt-wrapper",
                                    children: Object(i.jsx)("div", {
                                        style: ue,
                                        children: Object(i.jsx)(O.a, {
                                            controls: !1,
                                            playing: n,
                                            url:
                                                "https://www.youtube.com/watch?v=" +
                                                w.id,
                                            style: be,
                                            width: "100vw",
                                            height: "200vw",
                                            volume: W,
                                            config: {
                                                youtube: {
                                                    playerVars: {
                                                        modestbranding: !0,
                                                        color: "black",
                                                    },
                                                },
                                            },
                                            playsinline: !0,
                                            onReady: function() {
                                                return T(!1);
                                            },
                                            onError: function(e) {
                                                return X(e);
                                            },
                                            onPlay: function() {
                                                return a(!0);
                                            },
                                            onPause: function() {
                                                return a(!1);
                                            },
                                            onBuffer: function() {
                                                return P(!0);
                                            },
                                            onBufferEnd: function() {
                                                return P(!1);
                                            },
                                            onStart: function() {
                                                return P(!1);
                                            },
                                            onEnded: function() {
                                                return Ie();
                                            },
                                        }),
                                    }),
                                }),
                            ],
                        })
                    );
                },
                me = [
                    "fqtxCwUd2t6dCzILMq",
                    "3dhmyq6EKw2x7eFt4X",
                    "MU56lYT1Ov07fVTsnM",
                    "3oEjHGokRZdOBbcZuo",
                    "wKnqovL33x9in9ci6X",
                    "KETTXY34XNgWZBxvqx",
                    "NKEt9elQ5cR68",
                    "Basrh159dGwKY",
                    "XbJYBCi69nyVOffLIU",
                    "mJhkYA1gnvY7r481qL",
                    "dvreHY4p06lzVSDrvj",
                    "8vRvucL4OhyjyM4A8T",
                    "gfld3S4CsRXRZjqEj3",
                    "7bEpr3NIPNY0E",
                    "QLgtN0msAekg3x7YTm",
                    "dsd7XbYg0e6hG0A7i8",
                    "YRK6HL1CEMUxZHLvjl",
                    "YRQfWgn1De4nYLLQBa",
                    "NnMH7LDpZTPZS",
                    "xUOwGcu6wd0cXBj5n2",
                    "3o6nV7ygKBVCmLPpJu",
                    "p71BYIPogqBPy",
                    "2seKKLp1n0sEeJLYTK",
                    "PXj1J0eMONGOA",
                    "5torEEM8QnR95Cqg11",
                    "He1ppTVuaVSCs",
                    "97e6IX0kayYTK",
                    "3gTmgzy7wYJfyaGRHQ",
                    "3nbxypT20Ulmo",
                    "v2WuhMBzb3h5e",
                    "ZyFCksxxD9tmLYfGJo",
                    "j5zqQSABpeHCU8EpO3",
                    "TNTyFBi6r9R6g",
                    "7FvaPVEKXuB3O",
                    "Wci9oW5MbO6PK",
                    "qvkaMMMqyGFjO",
                    "4oHyOIBIt57ag",
                    "lkceXNDw4Agryfrwz8",
                    "SJhhRPXjaTGe5MKz5N",
                    "4YZNYcTybcYTnROykG",
                    "RcRYrpC1pBvIB0icDm",
                    "9LZTcawH3mc8V2oUqk",
                    "pVGsAWjzvXcZW4ZBTE",
                    "2SYqgPxMm2kbVe3y02",
                    "tvU9iTev6uBIQ",
                    "H62NM1ab7wzMXURdoi",
                    "l1BgQOc1Jj7L86BA4",
                    "gH1jGsCnQBiFHWMFzh",
                    "11fHSR7hmRLbkA",
                    "ckr4W2ppxPBeIF8dx4",
                    "vMSXa7KFGx49aeeXhe",
                    "ZCZ7FHlu3sPek3h0zP",
                    "2yzgWbRc97QOIUpklz",
                    "9jwuxt5bXKadi",
                    "6705G9I9sUcNCaJF10",
                ],
                fe = [
                    "static1",
                    "static2",
                    "static3",
                    "static4",
                    "static5",
                    "static6",
                    "static7",
                    "static8",
                ],
                Oe = function(e) {
                    return function(t) {
                        var n = t.setSelf,
                            i = t.onSet,
                            c = localStorage.getItem(e);

                        try {
                            if (c !== null) {
                                // Ensure that c is a valid JSON string
                                var parsedData = JSON.parse(c);
                                n(parsedData);
                            } else {
                                n(null); // Handle case where localStorage item is null
                            }
                        } catch (error) {
                            console.error(
                                `Error parsing JSON from localStorage for key "${e}":`,
                                error
                            );
                            n(null); // Set default value in case of parsing error
                        }
                    };
                },
                he = Object(s.c)({
                    key: "playerShown",
                    default: !1,
                }),
                pe = Object(s.c)({
                    key: "playerVolume",
                    default: 0.7,
                    effects_UNSTABLE: [Oe("playerVolume")],
                }),
                ve = Object(s.c)({
                    key: "isBuffering",
                    default: null,
                }),
                xe = Object(s.c)({
                    key: "currentStationId",
                    default: g[0].id,
                    effects_UNSTABLE: [Oe("currentStationId")],
                }),
                ge = Object(s.d)({
                    key: "currentStation",
                    get: function(e) {
                        var t = (0, e.get)(xe),
                            n = g.find(function(e) {
                                return e.id === t;
                            });
                        return (
                            n ||
                            (localStorage.removeItem("currentStationId"), g[0])
                        );
                    },
                }),
                ye = Object(s.d)({
                    key: "currentStationIndex",
                    get: function(e) {
                        var t = (0, e.get)(ge);
                        return g.findIndex(function(e) {
                            return e === t;
                        });
                    },
                }),
                Ie = Object(s.c)({
                    key: "pomodoroShown",
                    default: !1,
                }),
                we = Object(s.c)({
                    key: "aboutShown",
                    default: !1,
                }),
                Ne = Object(s.c)({
                    key: "stationsSelectorOpen",
                    default: !1,
                }),
                Me = Object(s.c)({
                    key: "lowEnergyMode",
                    default: !0,
                    effects_UNSTABLE: [Oe("lowEnergyMode")],
                }),
                Ze = Object(s.c)({
                    key: "embedShown",
                    default: !1,
                    effects_UNSTABLE: [Oe("embedShown")],
                }),
                ze = Object(s.c)({
                    key: "currentGifIndex",
                    default: 0,
                    effects_UNSTABLE: [Oe("currentGifIndex")],
                }),
                Te = Object(s.c)({
                    key: "nextGifIndex",
                    default: ae(me),
                }),
                Ae = Object(s.c)({
                    key: "staticShown",
                    default: !1,
                }),
                Ge = Object(s.c)({
                    key: "staticIndex",
                    default: ae(fe),
                });
            function De() {
                return "ontouchend" in document;
            }
            function Pe(e) {
                var t = (function(e, t) {
                    var n = function(e) {
                        var t = window.localStorage.getItem(e);
                        if (t) return JSON.parse(t);
                    },
                        i = Object(c.useState)(function() {
                            if ("undefined" !== typeof window)
                                return n(e) || t;
                        }),
                        a = Object(l.a)(i, 2),
                        o = a[0],
                        r = a[1];
                    Object(c.useEffect)(
                        function() {
                            try {
                                r(n(e));
                            } catch (t) {
                                console.log(
                                    "error reading local storage!",
                                    t
                                );
                            }
                        },
                        [e]
                    );
                    var s = Object(c.useCallback)(
                        function(t) {
                            try {
                                var n =
                                    t instanceof Function ? t(o) : t;
                                r(n),
                                    window.localStorage.setItem(
                                        e,
                                        JSON.stringify(n)
                                    );
                            } catch (i) {
                                console.log(
                                    "error writing local storage",
                                    i
                                );
                            }
                        },
                        [o]
                    ),
                        u = Object(c.useCallback)(function() {
                            window.localStorage.removeItem(e), r(t);
                        }, []);
                    return [o, s, u];
                })("aboutShown", !1),
                    n = Object(l.a)(t, 2),
                    i = n[0],
                    a = n[1],
                    o = De(),
                    r = Object(s.g)(we);
                Object(c.useEffect)(
                    function() {
                        var t = window.innerWidth;
                        if (!(o || t < 600) && !i && e) {
                            var n = setTimeout(function() {
                                r(!0), a(!0);
                            }, 1e3);
                            return function() {
                                return clearTimeout(n);
                            };
                        }
                    },
                    [e]
                );
            }
            var Se = n(34),
                He = n.n(Se);
            function Le() {
                var e = Object(s.g)(xe);
                Object(c.useEffect)(function() {
                    var t = (function() {
                        var e = He.a.parse(location.search).station;
                        return (
                            e &&
                            g.find(function(t) {
                                return t.id === e;
                            })
                        );
                    })();
                    t && e(t.id);
                }, []);
            }
            function Ee() {
                var e = Object(s.f)(ge);
                return function() {
                    e &&
                        y.track("Tweet Station", {
                            stationName: e.name,
                            stationId: e.id,
                        });
                };
            }

            function playRandomAudio() {
                var randomAudioNumber = Math.floor(Math.random() * 14); // Generates a random number between 0 and 8
                var audioFileName =
                    "./media/audio" + randomAudioNumber + ".mp3";
                var audio = new Audio(audioFileName);
                audio.loop = false;
                audio.play();
                setTimeout(function() {
                    audio.pause();
                    audio.currentTime = 0;
                }, 1000);
            }

            var Ye = n.p + "./media/boot.mp3",
                We = n.p + "./media/endWork.05b9f5ea.mp3",
                Re = n.p + "./media/endPause.d5eb5059.mp3",
                Be = {
                    boot: new Audio(Ye),
                    endWork: new Audio(We),
                    endPause: new Audio(Re),
                },
                Fe = n(35),
                Ve = new (n.n(Fe).a)({
                    en: {
                        listeningNow: "listening now",
                        tapToStart: "Tap to start",
                        pressToStart: "Press any key to start",
                        changeStation: "Change station",
                        playPause: "Play/Pause",
                        changeGif: "Toggle Rain",
                        showVideo: "Show original video",
                        lowPowerMode: "Low power mode",
                        closeThis: "Close",
                        arrows: "Arrows",
                        spacebar: "Spacebar",
                        rainDown: "Turn down the rain",
                        rainUp: "Turn up the rain",
                    },
                });
            var Xe = n(17);
            function Qe(e) {
                var t = e.show,
                    n = e.children,
                    c = Object(Xe.a)(e, ["show", "children"]);
                return Object(i.jsx)(K.a, {
                    children:
                        t &&
                        Object(i.jsx)(
                            q.a.div,
                            Object(m.a)(
                                Object(m.a)(
                                    {
                                        initial: {
                                            y: -20,
                                            opacity: 0,
                                        },
                                        animate: {
                                            y: 0,
                                            opacity: 1,
                                        },
                                        exit: {
                                            y: -20,
                                            opacity: 0,
                                        },
                                        transition: {
                                            type: "spring",
                                            duration: 0.25,
                                            bounce: 0.05,
                                        },
                                        className: "about-container",
                                    },
                                    c
                                ),
                                {},
                                {
                                    children: n,
                                }
                            )
                        ),
                });
            }
            var Ce = function() {
                return Object(i.jsxs)("span", {
                    style: {
                        display: "flex",
                        marginBottom: "10px",
                    },
                    children: [
                        Object(i.jsx)(Ue, {
                            name: "1037862493550280704",
                            username: "foxxie",
                            image: "./media/foxxie.png",
                        }),
                        Object(i.jsx)(Ue, {
                            name: "1037862493550280704",
                            username: "kit",
                            image: "./kit.png",
                        }),
                    ],
                });
            },
                Ue = function(e) {
                    var t = e.name,
                        n = e.username,
                        c = e.image;
                    return Object(i.jsxs)("a", {
                        href: "https://discordlookup.com/user/" + t,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        style: {
                            textDecoration: "none",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            marginLeft: "16px",
                        },
                        className: "team-member pointer",
                        children: [
                            Object(i.jsx)("img", {
                                style: {
                                    width: "80px",
                                    height: "80px",
                                    marginBottom: "3px",
                                },
                                src: c,
                                alt: t,
                                className: "green-box-small",
                            }),
                            Object(i.jsxs)("span", {
                                style: {
                                    display: "block",
                                    textDecoration: "none",
                                    fontSize: "20px",
                                },
                                children: [n],
                            }),
                        ],
                    });
                },
                Je = function() {
                    return Object(i.jsxs)("form", {
                        action: "",
                        method: "post",
                        target: "popupwindow",
                        onSubmit: "window.open('', 'popupwindow')",
                        className: "embeddable-buttondown-form",
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            marginBottom: "4px",
                        },
                    });
                },
                Ke = function() {
                    var e = Object(s.f)(we);

                    function VisitCounter() {
                        var visitCount = getVisitCount();
                        console.log(
                            "Rendering VisitCounter with visit count:",
                            visitCount
                        );
                        var welcomeMessage = getWelcomeMessage(visitCount);

                        return Object(i.jsxs)("span", {
                            style: { marginBottom: "4px" },
                            children: [
                                Object(i.jsx)("span", {
                                    className: "red",
                                    children: welcomeMessage,
                                }),
                            ],
                        });
                    }

                    return Object(i.jsxs)(Qe, {
                        show: e,
                        className: "about-container",
                        children: [
                            ,
                            Object(i.jsx)(VisitCounter, {}),
                            Object(i.jsxs)("span", {
                                style: { marginBottom: "4px" },
                                children: [
                                    Object(i.jsx)("span", {
                                        className: "red",
                                        children: "",
                                    }),
                                ],
                            }),
                            Object(i.jsx)(Ce, {}),
                            Object(i.jsxs)("span", {
                                style: { marginBottom: "0px" },
                                children: [
                                    Object(i.jsx)("span", {
                                        className: "red",
                                        children: Ve.arrows,
                                    }),
                                    " ",
                                    Ve.changeStation,
                                ],
                            }),
                            Object(i.jsxs)("span", {
                                style: { marginBottom: "0px" },
                                children: [
                                    Object(i.jsx)("span", {
                                        className: "red",
                                        children: Ve.spacebar,
                                    }),
                                    " ",
                                    Ve.playPause,
                                ],
                            }),
                            // Add more spans for other components
                            Object(i.jsxs)("span", {
                                style: { marginBottom: "0px" },
                                children: [
                                    Object(i.jsx)("span", {
                                        className: "red",
                                        children: "V",
                                    }),
                                    " ",
                                    Ve.showVideo,
                                ],
                            }),
                            // Add more spans for other components
                            Object(i.jsxs)("span", {
                                style: { marginBottom: "0px" },
                                children: [
                                    Object(i.jsx)("span", {
                                        className: "red",
                                        children: "R",
                                    }),
                                    " ",
                                    Ve.changeGif,
                                ],
                            }),
                            Object(i.jsxs)("span", {
                                style: { marginBottom: "0px" },
                                children: [
                                    Object(i.jsx)("span", {
                                        className: "red",
                                        children: "Q",
                                    }),
                                    " ",
                                    Ve.rainDown,
                                ],
                            }),
                            Object(i.jsxs)("span", {
                                style: { marginBottom: "0px" },
                                children: [
                                    Object(i.jsx)("span", {
                                        className: "red",
                                        children: "E",
                                    }),
                                    " ",
                                    Ve.rainUp,
                                ],
                            }),
                            Object(i.jsxs)("span", {
                                style: { marginBottom: "0px" },
                                children: [
                                    Object(i.jsx)("span", {
                                        className: "red",
                                        children: "ESC",
                                    }),
                                    " ",
                                    Ve.closeThis,
                                ],
                            }),
                            Object(i.jsx)(Je, {}),
                            Object(i.jsx)("a", {
                                href: "../sources.html",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: "Sources of Assets",
                            }),
                        ],
                    });
                };

            var qe = function(e) {
                var t = e.src,
                    n = e.zIndex,
                    c = void 0 === n ? 0 : n,
                    a = e.show;
                return void 0 === a || a
                    ? Object(i.jsx)("img", {
                        style: {
                            position: "absolute",
                            width: "100vw",
                            height: "100vh",
                            top: "0",
                            left: "0",
                            objectFit: "cover",
                            zIndex: c,
                        },
                        src: t,
                        alt: "",
                    })
                    : null;
            };
            function _e() {
                var e = Object(s.f)(ze),
                    t = Object(s.f)(Ae),
                    n = Object(s.f)(Ge),
                    c = Object(s.f)(Te);
                return Object(i.jsxs)(i.Fragment, {
                    children: [
                        Object(i.jsx)(qe, {
                            src: _(fe[n]),
                            show: t,
                            zIndex: 1,
                        }),
                        Object(i.jsx)(qe, {
                            src: _(me[e]),
                        }),
                        Object(i.jsx)($e, {
                            src: _(fe[n]),
                        }),
                        Object(i.jsx)($e, {
                            src: _(me[c]),
                        }),
                    ],
                });
            }
            var $e = function(e) {
                var t = e.src;
                return Object(i.jsx)("img", {
                    src: t,
                    alt: "preload",
                    style: {
                        position: "absolute",
                        top: "100%",
                        left: "100%",
                    },
                });
            };
            function et(e) {
                var t = e.isPlaying,
                    n = e.setIsPlaying,
                    a = Object(c.useState)(!1),
                    o = Object(l.a)(a, 2),
                    r = o[0],
                    u = o[1];
                Object(c.useEffect)(
                    function() {
                        if (r) {
                            var e = setTimeout(function() {
                                u(!1);
                            }, 1e3);
                            return function() {
                                return clearTimeout(e);
                            };
                        }
                    },
                    [r]
                );
                var b = Object(s.f)(we),
                    d = Object(s.f)(Ie),
                    j = Object(s.f)(Ne);
                return b || d || j
                    ? null
                    : Object(i.jsx)("div", {
                        style: {
                            position: "absolute",
                            top: "25%",
                            right: "25%",
                            bottom: "25%",
                            left: "25%",
                            cursor: "pointer",
                            zIndex: 99,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        },
                        onMouseEnter: function() {
                            return u(!0);
                        },
                        onMouseLeave: function() {
                            return u(!1);
                        },
                        onClick: function() {
                            n(!t);
                        },
                        children: Object(i.jsx)(X, {
                            name: t ? "pause" : "play",
                            style: {
                                transform: "scale(".concat(
                                    r ? 0.98 : 0.3,
                                    ")"
                                ),
                                opacity: r ? 1 : 0,
                                transition: "0.1s",
                            },
                        }),
                    });
            }
            var tt = 1500;
            var nt = function() {
                var e = Object(s.f)(Ie),
                    t = Object(c.useState)(tt),
                    n = Object(l.a)(t, 2),
                    a = n[0],
                    o = n[1],
                    r = Object(c.useState)(!1),
                    u = Object(l.a)(r, 2),
                    b = u[0],
                    d = u[1],
                    j = Object(c.useState)(!1),
                    m = Object(l.a)(j, 2),
                    f = m[0],
                    O = m[1],
                    h = Object(c.useRef)(4),
                    p = Math.floor(a / 60).toString(),
                    v = (a - 60 * p).toString(),
                    x = !0 === f ? "blue" : !0 === b ? "red" : void 0;
                function g() {
                    b || y.track("Pomodoro"), d(!b);
                }
                return (
                    Object(c.useEffect)(
                        function() {
                            var e;
                            return (
                                b
                                    ? (e = setInterval(function() {
                                        o(function(e) {
                                            return e - 1;
                                        });
                                    }, 1e3))
                                    : clearInterval(e),
                                function() {
                                    return clearInterval(e);
                                }
                            );
                        },
                        [b]
                    ),
                    Object(c.useEffect)(
                        function() {
                            0 === a &&
                                (d(!1),
                                    f
                                        ? (o(tt), O(!1), Be.endPause.play())
                                        : (O(!0),
                                            h.current++,
                                            h.current % 4 === 0
                                                ? (o(900), Be.endWork.play())
                                                : (o(300), Be.endWork.play())));
                        },
                        [a, f]
                    ),
                    Object(i.jsxs)(Qe, {
                        show: e,
                        style: {
                            textAlign: "right",
                            marginTop: 15,
                        },
                        className: "vertical",
                        children: [
                            Object(i.jsxs)("span", {
                                className: x,
                                children: [
                                    2 === p.length ? p : "0" + p,
                                    ":",
                                    2 === v.length ? v : "0" + v,
                                ],
                            }),
                            b || a === tt || 300 === a || 900 === a
                                ? Object(i.jsx)(J, {
                                    text: b ? "Pause" : "Start",
                                    onClick: g,
                                })
                                : Object(i.jsxs)("div", {
                                    style: {
                                        display: "flex",
                                    },
                                    children: [
                                        Object(i.jsx)(J, {
                                            text: "Continue",
                                            onClick: g,
                                            style: {
                                                marginRight: "8px",
                                            },
                                        }),
                                        " ",
                                        Object(i.jsx)(J, {
                                            text: "Stop",
                                            onClick: function() {
                                                d(!1), o(tt);
                                            },
                                        }),
                                    ],
                                }),
                            (!f || (f && !b)) &&
                            Object(i.jsx)(J, {
                                text: "+5:00",
                                onClick: function() {
                                    o(function(e) {
                                        return e + 300;
                                    }),
                                        b ||
                                        (O(!1),
                                            d(!0),
                                            Be.endWork.play());
                                },
                            }),
                        ],
                    })
                );
            },
                it = function(e) {
                    var t = e.blinking,
                        n = e.style,
                        a = Object(c.useState)("\u2588"),
                        o = Object(l.a)(a, 2),
                        r = o[0],
                        s = o[1];
                    return (
                        Object(c.useEffect)(
                            function() {
                                t
                                    ? setTimeout(function() {
                                        "" === r && s("\u2588"),
                                            "\u2588" === r && s("");
                                    }, 600)
                                    : s("\u2588");
                            },
                            [t, r]
                        ),
                        Object(i.jsx)("span", {
                            style: Object(m.a)(
                                {
                                    marginLeft: "4px",
                                    fontSize: "100%",
                                },
                                n
                            ),
                            children: r,
                        })
                    );
                },
                ct = function(e) {
                    var t = e.children,
                        n = e.delay,
                        a = void 0 === n ? 0 : n,
                        o = e.show,
                        r = void 0 === o || o,
                        s = e.onFinished,
                        u = e.style,
                        b = e.className,
                        d = Object(c.useState)(""),
                        j = Object(l.a)(d, 2),
                        m = j[0],
                        f = j[1],
                        O = Object(c.useRef)(0),
                        h = t.length;
                    return (
                        Object(c.useEffect)(
                            function() {
                                if (r) {
                                    var e = setTimeout(function() {
                                        var e = setInterval(function() {
                                            return (
                                                O.current++,
                                                f(
                                                    t
                                                        .toString()
                                                        .slice(0, O.current)
                                                ),
                                                O.current > h - 1 &&
                                                (clearInterval(e),
                                                    s && s()),
                                                function() {
                                                    return clearInterval(e);
                                                }
                                            );
                                        }, 40);
                                    }, a);
                                    return function() {
                                        return clearTimeout(e);
                                    };
                                }
                            },
                            [t, a, h, s, r, m]
                        ),
                        Object(i.jsx)("span", {
                            style: u,
                            className: b,
                            children: m,
                        })
                    );
                },
                at = De();
            function ot() {
                var e = Object(c.useState)(!1),
                    t = Object(l.a)(e, 2),
                    n = t[0],
                    a = t[1],
                    o = at ? Ve.tapToStart : Ve.pressToStart;
                return Object(i.jsxs)("button", {
                    style: oe,
                    children: [
                        Object(i.jsx)(ct, {
                            delay: 1500,
                            onFinished: function() {
                                return a(!0);
                            },
                            children: o,
                        }),
                        Object(i.jsx)(it, {
                            blinking: n,
                        }),
                    ],
                });
            }
            function rt() {
                y.track("Share on Facebook"), window.open("blank_");
            }
            var st = De();
            function lt(e) {
                var t = e.fullscreen,
                    n = e.fullscreenAvailable,
                    c = Object(s.e)(Ie),
                    a = Object(l.a)(c, 2),
                    o = a[0],
                    r = a[1],
                    u = Object(s.e)(we),
                    b = Object(l.a)(u, 2),
                    d = b[0],
                    j = b[1],
                    m = Ee();
                return Object(i.jsxs)("div", {
                    id: "horizontal",
                    children: [
                        n &&
                        // main.js
                        Object(i.jsx)(J, {
                            className: "hide-small-screen",
                            tooltip: "Fullscreen",
                            icon: t.active
                                ? "fullscreenExit"
                                : "fullscreenEnter",
                            onClick: function() {
                                return t.active ? t.exit() : t.enter();
                            },
                            style: {
                                marginRight: "14px",
                            },
                        }),
                        Object(i.jsx)(J, {
                            tooltip: "Rain Intensity Slider",
                            icon: "rain",
                            onClick: function() {
                                toggleSlider();
                            },
                            style: {
                                marginRight: "14px",
                            },
                        }),
                        Object(i.jsx)(J, {
                            tooltip: "Toggle Chat",
                            icon: "chatImage",
                            onClick: function() {
                                // Call your function to toggle the chatbox visibility
                                toggleChat();
                            },
                            style: {
                                marginRight: "14px",
                            },
                        }),
                        Object(i.jsx)(J, {
                            tooltip: "Pomodoro Timer",
                            icon: "timer",
                            onClick: function() {
                                o || y.track("Start Pomodoro"), r(!o), j(!1);
                            },
                            style: {
                                marginRight: "14px",
                            },
                        }),
                        Object(i.jsx)(J, {
                            tooltip: "About",
                            icon: "heart",
                            onClick: function() {
                                d || y.track("Open About"), j(!d), r(!1);
                            },
                        }),
                    ],
                });
            }
            var ut = n(10),
                bt = n.n(ut),
                dt = n(24),
                jt = function(e) {
                    var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : [],
                        n = Object(c.useState)(null),
                        i = Object(l.a)(n, 2),
                        a = i[0],
                        o = i[1],
                        r = Object(c.useState)(null),
                        s = Object(l.a)(r, 2),
                        u = s[0],
                        b = s[1];
                    return (
                        Object(c.useEffect)(function() {
                            (function() {
                                var t = Object(dt.a)(
                                    bt.a.mark(function t() {
                                        var n, i;
                                        return bt.a.wrap(
                                            function(t) {
                                                for (; ;)
                                                    switch ((t.prev = t.next)) {
                                                        case 0:
                                                            return (
                                                                (t.prev = 0),
                                                                (t.next = 3),
                                                                fetch(e)
                                                            );
                                                        case 3:
                                                            return (
                                                                (n = t.sent),
                                                                (t.next = 6),
                                                                n.json()
                                                            );
                                                        case 6:
                                                            (i = t.sent),
                                                                o(i),
                                                                (t.next = 13);
                                                            break;
                                                        case 10:
                                                            (t.prev = 10),
                                                                (t.t0 = t.catch(
                                                                    0
                                                                )),
                                                                b(t.t0);
                                                        case 13:
                                                        case "end":
                                                            return t.stop();
                                                    }
                                            },
                                            t,
                                            null,
                                            [[0, 10]]
                                        );
                                    })
                                );
                                return function() {
                                    return t.apply(this, arguments);
                                };
                            })()();
                        }, t),
                        {
                            response: a,
                            error: u,
                        }
                    );
                },
                mt = function(e) {
                    var t = e.blinking,
                        n = Object(Xe.a)(e, ["blinking"]),
                        a = Object(c.useState)("\u2022"),
                        o = Object(l.a)(a, 2),
                        r = o[0],
                        s = o[1];
                    return (
                        Object(c.useEffect)(
                            function() {
                                t
                                    ? setTimeout(function() {
                                        " " === r && s("\u2022"),
                                            "\u2022" === r && s(" ");
                                    }, 600)
                                    : s("\u2022");
                            },
                            [t, r]
                        ),
                        Object(i.jsx)(
                            "span",
                            Object(m.a)(
                                Object(m.a)({}, n),
                                {},
                                {
                                    children: r,
                                }
                            )
                        )
                    );
                },
                ft = function() {
                    var e,
                        t = Object(c.useState)(!1),
                        n = Object(l.a)(t, 2),
                        a = n[0],
                        o = n[1],
                        r = Object(c.useState)(0),
                        s = Object(l.a)(r, 2),
                        u = s[0],
                        d = s[1];
                    b("focus", function() {
                        d(u + 1);
                    });
                    var j = jt("", [u]),
                        m =
                            null !==
                                (e =
                                    null === j || void 0 === j
                                        ? void 0
                                        : j.response) && void 0 !== e
                                ? e
                                : 0,
                        f = m && m.toLocaleString("en"),
                        O = Object(c.useMemo)(
                            function() {
                                return Ve.listeningNow + " " + f.toString();
                            },
                            [f]
                        );
                    return !f ||
                        (null === j || void 0 === j ? void 0 : j.response) < 3
                        ? null
                        : Object(i.jsxs)("span", {
                            className: "red",
                            id: "visitors-counter",
                            children: [
                                Object(i.jsx)(ct, {
                                    delay: 1e3,
                                    className: "red",
                                    onFinished: function() {
                                        return o(!0);
                                    },
                                    children: O,
                                }),
                                a &&
                                Object(i.jsx)(mt, {
                                    style: {
                                        display: "inline-block",
                                        width: "10px",
                                        marginLeft: "4px",
                                    },
                                    blinking: !0,
                                    className: "red",
                                }),
                            ],
                        });
                };
            var Ot = function() {
                var e = Object(s.e)(he),
                    t = Object(l.a)(e, 2),
                    n = t[0],
                    a = t[1],
                    o = Object(s.e)(Me),
                    r = Object(l.a)(o, 2),
                    b = r[0],
                    j = r[1],
                    m = Object(c.useState)(!1),
                    f = Object(l.a)(m, 2),
                    O = f[0],
                    h = f[1],
                    p = Object(s.g)(Ie),
                    v = Object(s.g)(we),
                    x = (function() {
                        var e = Object(s.g)(Ae),
                            t = Object(s.e)(Ge),
                            n = Object(l.a)(t, 2),
                            i = n[0],
                            c = n[1];
                        return function(t) {
                            e(!0),
                                setTimeout(function() {
                                    e(!1);
                                    var t = ae(fe, i);
                                    c(t);
                                }, t);
                        };
                    })(),
                    g = (function() {
                        var e = Object(s.g)(ze),
                            t = Object(s.e)(Te),
                            n = Object(l.a)(t, 2),
                            i = n[0],
                            c = n[1];
                        return function() {
                            e(i);
                            var t = ae(me, i);
                            c(t);
                        };
                    })(),
                    I = Ee();
                Pe(O), Le();
                var w = "ja" === Ve.getLanguage(),
                    N = Object(u.b)(),
                    M =
                        document.fullscreenEnabled ||
                        document.mozFullscreenEnabled ||
                        document.webkitFullscreenEnabled ||
                        document.msFullscreenEnabled;
                function Z() {
                    n || (a(!0), h(!0));
                }
                return (
                    d([
                        [
                            "Escape",
                            function() {
                                v(!1), p(!1);
                            },
                        ],
                        ["d", I],
                        [
                            "l",
                            function() {
                                return j(!b);
                            },
                        ],
                        ["g", g],
                        ["any", Z],
                    ]),
                    Object(i.jsx)(u.a, {
                        handle: N,
                        children: Object(i.jsxs)("div", {
                            id: "container",
                            className: [
                                b ? "low-energy" : "",
                                n ? "" : "pointer",
                                w ? "ja" : "",
                            ]
                                .join(" ")
                                .trim(),
                            onClick: Z,
                            children: [
                                n &&
                                Object(i.jsx)(et, {
                                    isPlaying: O,
                                    setIsPlaying: h,
                                }),
                                Object(i.jsx)(_e, {}),
                                Object(i.jsx)("div", {
                                    id: "crt-lines",
                                }),
                                Object(i.jsx)("div", {
                                    id: "darken",
                                }),
                                Object(i.jsx)("div", {
                                    id: "vignette",
                                }),
                                Object(i.jsxs)("div", {
                                    id: "top-ui",
                                    children: [
                                        Object(i.jsx)("div", {
                                            children: Object(i.jsx)(ft, {}),
                                        }),
                                        Object(i.jsxs)("div", {
                                            className: "vertical",
                                            children: [
                                                n &&
                                                Object(i.jsx)(lt, {
                                                    fullscreen: N,
                                                    fullscreenAvailable: M,
                                                }),
                                                Object(i.jsx)(Ke, {}),
                                                Object(i.jsx)(nt, {}),
                                            ],
                                        }),
                                    ],
                                }),
                                !n && Object(i.jsx)(ot, {}),
                                Object(i.jsx)(je, {
                                    isPlaying: O,
                                    setIsPlaying: h,
                                    onStationChanged: function() {
                                        var e =
                                            !(
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                            ) || arguments[0];
                                        y.track("Thay đổi kênh"),
                                            x(300),
                                            e && playRandomAudio(),
                                            g();
                                    },
                                }),
                            ],
                        }),
                    })
                );
            };
            var ht = function() {
                return Object(i.jsx)(s.b, {
                    children: Object(i.jsx)(Ot, {}),
                });
            },
                pt = function(e) {
                    e &&
                        e instanceof Function &&
                        n
                            .e(3)
                            .then(n.bind(null, 89))
                            .then(function(t) {
                                var n = t.getCLS,
                                    i = t.getFID,
                                    c = t.getFCP,
                                    a = t.getLCP,
                                    o = t.getTTFB;
                                n(e), i(e), c(e), a(e), o(e);
                            });
                };
            r.a.render(
                Object(i.jsx)(a.a.StrictMode, {
                    children: Object(i.jsx)(ht, {}),
                }),
                document.getElementById("root")
            ),
                pt();
        },
    },
    [[82, 1, 2]],
]);
//# sourceMappingURL=main.4a5edcbf.chunk.js.map
