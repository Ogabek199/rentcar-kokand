import React, { useEffect, useState, useMemo } from "react";
import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams, Link } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import { ImageGallery } from "../components/UI/ImageLightbox";
import CarItem from "../components/UI/CarItem";
import { logError } from "../utils/errorLogger";
import "../styles/car-details.css";
import { slugify } from "../utils/slugify";

const TELEGRAM_URL = "https://t.me/RendcarQoqon";

const REVIEWS_STORAGE_KEY = "car_reviews";

const getStoredReviews = (carSlug) => {
  try {
    const data = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!data) return [];
    const all = JSON.parse(data);
    return Array.isArray(all[carSlug]) ? all[carSlug] : [];
  } catch (err) {
    console.warn("Sharhlar o'qilishda xatolik:", err);
    logError({
      errorType: "Storage Read Error",
      message: err.message,
      page: "CarDetails - getStoredReviews",
      additionalInfo: { carSlug },
    });
    return [];
  }
};

const saveReview = (carSlug, review) => {
  try {
    const data = localStorage.getItem(REVIEWS_STORAGE_KEY);
    const all = data ? JSON.parse(data) : {};
    if (!Array.isArray(all[carSlug])) all[carSlug] = [];
    all[carSlug].unshift(review);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.warn("Sharh saqlanmadi:", err);
    logError({
      errorType: "Storage Write Error",
      message: err.message,
      page: "CarDetails - saveReview",
      additionalInfo: { carSlug, reviewExists: !!review },
    });
  }
};

const INCLUDED = [
  "Cheksiz kilometr",
  "Aeroportga yetkazib berish va olish",
  "Bluetooth va USB",
  "GPS navigatsiya",
  "24/7 yo'l yordami",
  "Bolalar o'rindig'i (so'rov bo'yicha)",
  "Charm interyer",
  "Yetkazib berishda tozalangan",
];

const MOCK_REVIEWS = [
  { name: "Abror Tulyaganov", date: "12 oktyabr, 2023", stars: 5, text: "Kokandda eng qulay ijara. Mashina ajoyib holatda, xizmat tez.", avatar: "https://ui-avatars.com/api/?name=Abror&background=E5A00D&color=fff" },
  { name: "Dilnoza Rahimova", date: "5 oktyabr, 2023", stars: 5, text: "Ishonchli va samimiy. Yana ham foydalanaman.", avatar: "https://ui-avatars.com/api/?name=Dilnoza&background=E5A00D&color=fff" },
];

const ReviewFormInline = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedText = text.trim();
    if (!trimmedName) {
      setError("Ismni kiriting");
      return;
    }
    if (!trimmedText) {
      setError("Sharh matnini yozing");
      return;
    }
    setError("");
    onSubmit({ name: trimmedName, phone: phone.trim(), stars, text: trimmedText });
  };

  return (
    <div className="review-form-inline">
      <h3 className="review-form-inline__title">Sharh yozish</h3>
      <form className="review-form-inline__form" onSubmit={handleSubmit}>
        <label className="review-form-inline__label">
          Ism <span className="review-form-inline__required">*</span>
        </label>
        <input
          type="text"
          className="review-form-inline__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ismingiz"
          required
        />
        <label className="review-form-inline__label">Telefon (ixtiyoriy)</label>
        <input
          type="tel"
          className="review-form-inline__input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+998776344747"
        />
        <label className="review-form-inline__label">Baholash</label>
        <div className="review-form-inline__stars">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              className="review-form-inline__star-btn"
              onClick={() => setStars(i)}
              aria-label={`${i} yulduz`}
            >
              <i className={i <= stars ? "ri-star-fill" : "ri-star-line"} /> 
            </button>
          ))}
        </div>
        <label className="review-form-inline__label">
          Sharh <span className="review-form-inline__required">*</span>
        </label>
        <textarea
          className="review-form-inline__textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Mashina va xizmat haqida fikringiz..."
          rows={4}
          required
        />
        {error && <p className="review-form-inline__error">{error}</p>}
        <div className="review-form-inline__actions">
          <button type="button" className="review-form-inline__btn review-form-inline__btn--ghost" onClick={onClose}>
            Bekor qilish
          </button>
          <button type="submit" className="review-form-inline__btn review-form-inline__btn--primary">
            Yuborish
          </button>
        </div>
      </form>
    </div>
  );
};

const CarDetails = () => {
  const { slug } = useParams();
  
  // Car item'ni memoize qilish
  const singleCarItem = useMemo(
    () => {
      const raw = String(slug ?? "");
      const decoded = (() => {
        try {
          return decodeURIComponent(raw);
        } catch {
          return raw;
        }
      })();

      // New canonical: match by item.slug (or derived slugify)
      const bySlug = carData.find((item) => (item.slug || slugify(item.carName)) === raw);
      if (bySlug) return bySlug;

      // Backward compatibility: old URLs used carName in the path
      return carData.find((item) => item.carName === decoded);
    },
    [slug]
  );
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState(() => {
    const stored = singleCarItem ? getStoredReviews(slug) : [];
    return [...MOCK_REVIEWS, ...stored];
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (slug) {
      const stored = getStoredReviews(slug);
      setReviews([...MOCK_REVIEWS, ...stored]);
    }
  }, [slug]);

  if (!singleCarItem) {
    return (
      <Helmet title="Topilmadi" description="So‘ralgan avtomobil topilmadi." noindex canonicalPath="/cars">
        <Container className="py-5 text-center">
          <p>Bunday avtomobil topilmadi.</p>
          <Link to="/cars">Avtomobillar ro'yxatiga qaytish</Link>
        </Container>
      </Helmet>
    );
  }

  const canonicalSlug = singleCarItem.slug || slugify(singleCarItem.carName);
  const similarCars = carData.filter((c) => c.id !== singleCarItem.id).slice(0, 4);
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://rentcar-kokand.uz";
  const pageUrl = `${origin}/cars/${canonicalSlug}`;
  const telegramHref = `${TELEGRAM_URL}?text=${encodeURIComponent(
    `Assalomu alaykum! ${singleCarItem.carName} mashinasi kerak. Narxini bilmoqchiman.`
  )}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: singleCarItem.carName,
    image: [singleCarItem.imgUrl],
    description: singleCarItem.description,
    brand: {
      "@type": "Brand",
      name: singleCarItem.brand || "Ziyo Rent Car",
    },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Ziyo Rent Car",
      },
    },
  };

  return (
    <Helmet
      title={singleCarItem.carName}
      description={`${singleCarItem.carName} — Qo‘qonda ijaraga oling. Narx va bron: Telegram @RendcarQoqon yoki +998776344747. Ziyo Rent Car.`}
      keywords={`${singleCarItem.carName} ijarasi, ${singleCarItem.brand} rent car Qo‘qon, avtomobil ijarasi`}
      canonicalPath={`/cars/${canonicalSlug}`}
      image={singleCarItem.imgUrl}
      type="product"
      structuredData={productJsonLd}
    >
      <section className="car-details-page animate-page-enter">
        <Container>
          <Row>
            <Col lg="8">
              <div className="car-details__main">
                <p className="car-details__badge animate-on-scroll animate-fade-in-down">Yangi avlod</p>
                <div className="car-details__rating-row animate-on-scroll animate-fade-in-up">
                  <span className="car-details__stars">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <i key={i} className="ri-star-fill"></i>
                    ))}
                  </span>
                  <span className="car-details__reviews-count">({singleCarItem.rating} ta sharh)</span>
                </div>
                <h1 className="car-details__title">{singleCarItem.carName}</h1>
                <p className="car-details__location">
                  <i className="ri-map-pin-line"></i>
                  Qo'qon markazida mavjud
                </p>

                <div className="car-details__hero-img-wrap animate-on-scroll animate-scale-in">
                  <a
                    href={telegramHref}
                    target="_blank"
                    rel="noreferrer"
                    className="car-details__price-ask"
                  >
                    <i className="ri-telegram-fill"></i>
                    <span className="car-details__price-label">NARXNI BILISH</span>
                    <span className="car-details__price-value">Telegramda bilib oling</span>
                  </a>
                  <div className="car-details__image-wrapper">
                    <ImageGallery images={[singleCarItem.imgUrl]} className="single-image" />
                  </div>
                  <span className="car-details__tag">Premium tanlov</span>
                </div>

                <div className="car-details__specs animate-on-scroll animate-fade-in-up">
                  <h3 className="car-details__heading">
                    <i className="ri-key-2-line"></i>
                    Asosiy xususiyatlar
                  </h3>
                  <div className="car-details__specs-grid">
                    <div className="car-details__spec-card">
                      <i className="ri-flashlight-line"></i>
                      <span className="car-details__spec-value">—</span>
                      <span className="car-details__spec-label">HP</span>
                    </div>
                    <div className="car-details__spec-card">
                      <i className="ri-fuel-line"></i>
                      <span className="car-details__spec-value">Benzin</span>
                      <span className="car-details__spec-label">Yoqilg'i</span>
                    </div>
                    <div className="car-details__spec-card">
                      <i className="ri-settings-3-line"></i>
                      <span className="car-details__spec-value">{singleCarItem.automatic}</span>
                      <span className="car-details__spec-label">Uzatma</span>
                    </div>
                    <div className="car-details__spec-card">
                      <i className="ri-user-line"></i>
                      <span className="car-details__spec-value">4</span>
                      <span className="car-details__spec-label">Kattalar</span>
                    </div>
                  </div>
                </div>

                <div className="car-details__block animate-on-scroll animate-fade-in-up">
                  <h3 className="car-details__heading">Ushbu avtomobil haqida</h3>
                  <p className="car-details__description">{singleCarItem.description}</p>
                </div>

                <div className="car-details__block animate-on-scroll animate-fade-in-up">
                  <h3 className="car-details__heading">Nimalar kiradi</h3>
                  <ul className="car-details__included">
                    {INCLUDED.map((item, i) => (
                      <li key={i}><i className="ri-check-line"></i>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="car-details__block animate-on-scroll animate-fade-in-up">
                  <div className="car-details__reviews-head">
                    <h3 className="car-details__heading mb-0">Foydalanuvchi sharhlari</h3>
                    <button
                      type="button"
                      className="car-details__write-review"
                      onClick={() => setShowReviewForm(true)}
                    >
                      Sharh yozish
                    </button>
                  </div>
                  {showReviewForm && (
                    <ReviewFormInline
                      onClose={() => setShowReviewForm(false)}
                      onSubmit={(review) => {
                        setReviews([review, ...reviews]);
                        // Save to localStorage associated with this car slug
                        saveReview(slug, review);
                      }}
                    />
                  )}
                  {(showAllReviews ? reviews : reviews.slice(0, 3)).map((r, i) => (
                    <div key={i} className="car-details__review-card">
                      <div className="car-details__review-header">
                        <img 
                          src={r.avatar} 
                          alt="" 
                          className="car-details__review-avatar" 
                          loading="lazy"
                          decoding="async"
                        />
                        <div>
                          <strong>{r.name}</strong>
                          <span className="car-details__review-date">{r.date}</span>
                        </div>
                        <span className="car-details__stars car-details__stars--sm">
                          {Array(r.stars).fill(0).map((_, j) => (
                            <i key={j} className="ri-star-fill"></i>
                          ))}
                        </span>
                      </div>
                      <p className="car-details__review-text">"{r.text}"</p>
                    </div>
                  ))}
                  {reviews.length > 3 && (
                    <button
                      type="button"
                      className="car-details__view-all car-details__view-all-btn"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                      {showAllReviews ? "Kamroq ko'rsatish" : `Barcha sharhlar (${reviews.length})`}
                    </button>
                  )}
                </div>

                {similarCars.length > 0 && (
                  <div className="car-details__block animate-on-scroll animate-fade-in-up">
                    <h3 className="car-details__heading">Sizga ham yoqishi mumkin</h3>
                    <p className="car-details__similar-sub">Avtoparkimizdan yana premium variantlar.</p>
                    <Row>
                      {similarCars.map((car) => (
                        <CarItem key={car.id} item={car} colProps={{ lg: "6", md: "6", sm: "6" }} />
                      ))}
                    </Row>
                    <div className="text-center mt-3">
                      <Link to="/cars" className="btn-outline">Barcha avtomobillar</Link>
                    </div>
                  </div>
                )}
              </div>
            </Col>

            <Col lg="4" className="mt-4">
              <div className="car-details__sidebar animate-on-scroll animate-fade-in-left">
                <div className="reserve-card">
                  <h3 className="reserve-card__title">Mashinani band qilish</h3>
                  <p className="reserve-card__price reserve-card__price--ask">
                    Narxni Telegramda bilib oling
                  </p>
                  <BookingForm carName={singleCarItem.carName} />
                  <p className="reserve-card__disclaimer">Telegram orqali yozing — tez javob beramiz.</p>
                  <div className="reserve-card__trust">
                    <span><i className="ri-shield-check-line"></i> Xavfsiz</span>
                    <span><i className="ri-time-line"></i> Tez tasdiq</span>
                  </div>
                </div>

                <div className="need-help-card">
                  <h3 className="need-help-card__title">Yordam kerakmi?</h3>
                  <p className="need-help-card__text">Konsiyerj jamoamiz 24/7 maxsus so'rovlaringiz uchun xizmatda.</p>
                  <a href="tel:+998776344747" className="need-help-card__btn">
                    <i className="ri-phone-line"></i>
                    Qo'llab-quvvatlash bilan bog'lanish →
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
