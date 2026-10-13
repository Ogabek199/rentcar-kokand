import React, { useMemo } from "react";
import Slider from "react-slick";
import "../../styles/testimonial.css";

const REVIEWS_STORAGE_KEY = "car_reviews";

const defaultTestimonials = [
  {
    text: "Xizmat juda a'lo darajada! Avtomobillar toza va qulay, bron qilish esa juda oson. Tavsiya qilaman!",
    name: "Sardor",
    role: "Mijoz",
    avatar: "https://cdn.uza.uz/2025/01/27/18/24/2FhbrttwJ2720WmOhr9IUTdizlX3LL9L_front.PNG",
    stars: 5,
  },
  {
    text: "Uzoq safar uchun mashina oldim va juda mamnun bo'ldim. Yoqilg'i tejamkor, haydash esa juda yoqimli edi!",
    name: "Abdulaziz",
    role: "Mijoz",
    avatar: "https://cdn.uza.uz/2024/11/26/18/14/huEQojrUvNuqipRKZxbaacI7k3KbpnbH_front.PNG",
    stars: 5,
  },
  {
    text: "Mijozlarga xizmat ko'rsatish juda samimiy va tezkor. Hech qanday muammo bo'lmadi, albatta yana foydalanaman!",
    name: "Jasur",
    role: "Mijoz",
    avatar: "https://ui-avatars.com/api/?name=Jasur&background=E5A00D&color=fff",
    stars: 5,
  },
  {
    text: "Xizmat juda a'lo darajada! Avtomobillar toza va qulay, bron qilish esa juda oson. Tavsiya qilaman!",
    name: "Abduqodir",
    role: "Mijoz",
    avatar: "https://cdn.uza.uz/2024/11/26/18/14/huEQojrUvNuqipRKZxbaacI7k3KbpnbH_front.PNG",
    stars: 5,
  },
];

const getAllStoredReviews = () => {
  try {
    const data = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!data) return [];
    const all = JSON.parse(data);
    if (typeof all !== "object" || all === null) return [];
    return Object.values(all).flat();
  } catch {
    return [];
  }
};

const Testimonial = () => {
  const testimonials = useMemo(() => {
    const stored = getAllStoredReviews().map((r) => ({
      text: r.text,
      name: r.name,
      role: "Mijoz",
      avatar: r.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=E5A00D&color=fff`,
      stars: r.stars ?? 5,
    }));
    return [...defaultTestimonials, ...stored];
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Slider {...settings} className="testimonial-slider testimonial-slider--new">
      {testimonials.map((item, index) => (
        <div key={index} className="testimonial-card">
          <div className="testimonial-card__stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <i key={i} className={i <= (item.stars ?? 5) ? "ri-star-fill" : "ri-star-line"}></i>
            ))}
          </div>
          <p className="testimonial-card__text">"{item.text}"</p>
          <div className="testimonial-card__author">
            <img src={item.avatar} alt={item.name} className="testimonial-card__avatar" />
            <div>
              <strong className="testimonial-card__name">{item.name}</strong>
              <span className="testimonial-card__role">{item.role}</span>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonial;
