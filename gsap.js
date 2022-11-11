


window.addEventListener('DOMContentLoaded', (event) => {

  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });




  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }


  $("[letters-fade-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.8 } });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: 100,
      duration: 0.2,
      ease: "power1.out",
      stagger: { amount: 0.5 }
    });
    createScrollTrigger($(this), tl);
  });




  $("[words-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      opacity: 0,
      y: 100,
      duration: 0.5,
      ease: "back.out(2)",
      stagger: { amount: 0.5 }
    });

    ScrollTrigger.create({
      trigger: $(this),
      start: "top 60%",
      onEnter: () => tl.play(),
      onLeaveBack: () => tl.reverse()
    });
  });


  gsap.set("[text-split]", { opacity: 1 });



});