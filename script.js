(function () {
  var secs = Array.prototype.slice.call(document.querySelectorAll("section.sec"));
  var links = Array.prototype.slice.call(document.querySelectorAll(".side a, .pills a"));
  var bar = document.querySelector(".bar");
  var up = document.querySelector(".up");
  var pills = document.querySelector(".pills");

  function setActive(id) {
    links.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("on", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    var p = pills && pills.querySelector("a.on");
    if (p && pills.offsetParent !== null) {
      pills.scrollTo({ left: p.offsetLeft - 20, behavior: "smooth" });
    }
  }

  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    up.classList.toggle("show", h.scrollTop > 700);
    var line = 180, current = secs[0].id;
    secs.forEach(function (s) {
      if (s.getBoundingClientRect().top <= line) current = s.id;
    });
    setActive(current);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  up.addEventListener("click", function () { window.scrollTo({ top: 0 }); });
  document.getElementById("yr").textContent = new Date().getFullYear();
  onScroll();
})();
