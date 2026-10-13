// Observer'ni cache qilish - har safar yangi observer yaratmaslik uchun
let globalObserver = null;

const getObserver = () => {
  if (!globalObserver) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    globalObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          globalObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
  }
  return globalObserver;
};

export const initScrollAnimations = () => {
  const observer = getObserver();
  
  // Faqat animatsiya qilinmagan elementlarni topish
  const elements = document.querySelectorAll(".animate-on-scroll:not(.animated)");
  
  // Faqat yangi elementlarni kuzatish
  elements.forEach((el) => {
    // Agar allaqachon kuzatilmoqda bo'lsa, qo'shmaslik
    if (!el.dataset.observed) {
      observer.observe(el);
      el.dataset.observed = "true";
    }
  });
};

export const addScrollAnimation = (element, animationType = "fadeInUp") => {
  if (!element) return;
  
  element.classList.add("animate-on-scroll", `animate-${animationType}`);
  
  const observer = getObserver();
  
  // Agar allaqachon kuzatilmoqda bo'lsa, qo'shmaslik
  if (!element.dataset.observed) {
    observer.observe(element);
    element.dataset.observed = "true";
  }
};
