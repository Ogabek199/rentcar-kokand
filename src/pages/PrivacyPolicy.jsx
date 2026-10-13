import React from "react";
import { Container } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

const PrivacyPolicy = () => {
  return (
    <Helmet
      title="Maxfiylik siyosati"
      description="Ziyo Rent Car maxfiylik siyosati: shaxsiy ma’lumotlar, cookie’lar va foydalanuvchi huquqlari. Bog‘lanish: +998776344747, Telegram @RendcarQoqon."
      canonicalPath="/privacy-policy"
    >
      <CommonSection title="Maxfiylik siyosati" />
      
      <section style={{ padding: "60px 0" }} className="animate-on-scroll animate-fade-in-up">
        <Container>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ marginBottom: "30px" }}>
              <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "var(--color-text-muted)", marginBottom: "20px" }}>
                Ziyo Rent Car sizning shaxsiy ma'lumotlaringizni himoya qilishga jiddiy yondashadi. 
                Ushbu Maxfiylik siyosati bizning veb-saytimiz va xizmatlarimizdan foydalanganda qanday ma'lumotlar 
                to'planishi, ishlatilishi va himoya qilinishini tushuntiradi.
              </p>
              <p style={{ fontSize: "0.95rem", color: "#666", fontStyle: "italic" }}>
                Oxirgi yangilanish: {new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-dark)", marginBottom: "15px", paddingBottom: "10px", borderBottom: "2px solid var(--color-primary)" }}>
                1. To'plangan ma'lumotlar
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text)", marginBottom: "15px" }}>
                Biz quyidagi ma'lumotlarni to'playmiz:
              </p>
              <ul style={{ paddingLeft: "25px", marginBottom: "20px" }}>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Shaxsiy ma'lumotlar:</strong> Ism, telefon raqami, elektron pochta manzili, manzil
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Bron ma'lumotlari:</strong> Avtomobil tanlovi, olish va qaytarish sanalari, to'lov ma'lumotlari
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Texnik ma'lumotlar:</strong> IP manzil, brauzer turi, qurilma ma'lumotlari, cookie'lar
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Foydalanish ma'lumotlari:</strong> Veb-saytdagi harakatlar, sahifalar ko'rishlar, vaqt
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-dark)", marginBottom: "15px", paddingBottom: "10px", borderBottom: "2px solid var(--color-primary)" }}>
                2. Ma'lumotlardan foydalanish
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text)", marginBottom: "15px" }}>
                To'plangan ma'lumotlar quyidagi maqsadlarda ishlatiladi:
              </p>
              <ul style={{ paddingLeft: "25px", marginBottom: "20px" }}>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Avtomobil ijarasi xizmatlarini taqdim etish va boshqarish
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Mijozlar bilan aloqa o'rnatish va xizmat ko'rsatish
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Veb-sayt va xizmatlarni yaxshilash va optimallashtirish
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Xavfsizlikni ta'minlash va firibgarlikni oldini olish
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Qonuniy talablarga javob berish
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Marketing va reklama faoliyati (faqat rozilik bilan)
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-dark)", marginBottom: "15px", paddingBottom: "10px", borderBottom: "2px solid var(--color-primary)" }}>
                3. Ma'lumotlarni baham ko'rish
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text)", marginBottom: "15px" }}>
                Biz sizning shaxsiy ma'lumotlaringizni uchinchi shaxslarga sotmaymiz yoki ijaraga bermaymiz. 
                Ma'lumotlar faqat quyidagi hollarda baham ko'rilishi mumkin:
              </p>
              <ul style={{ paddingLeft: "25px", marginBottom: "20px" }}>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Xizmat ko'rsatish uchun zarur bo'lgan ishonchli hamkorlar bilan (to'lov tizimlari, SMS xizmatlari)
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Qonuniy talablar bo'yicha (sud, huquqni muhofaza qilish organlari)
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Xavfsizlikni ta'minlash uchun zarur bo'lganda
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Sizning aniq roziligingiz bilan
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-dark)", marginBottom: "15px", paddingBottom: "10px", borderBottom: "2px solid var(--color-primary)" }}>
                4. Cookie'lar va kuzatish texnologiyalari
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text)", marginBottom: "15px" }}>
                Biz veb-saytimizda cookie'lar va shunga o'xshash texnologiyalardan foydalanamiz:
              </p>
              <ul style={{ paddingLeft: "25px", marginBottom: "20px" }}>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Zarur cookie'lar:</strong> Veb-saytning asosiy funksiyalarini ta'minlash uchun
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Analitik cookie'lar:</strong> Veb-sayt trafigini tahlil qilish va yaxshilash uchun
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Marketing cookie'lar:</strong> Reklama va marketing maqsadlarida (faqat rozilik bilan)
                </li>
              </ul>
              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text)", marginTop: "15px" }}>
                Siz brauzer sozlamalari orqali cookie'larni boshqarishingiz mumkin. Biroq, ba'zi cookie'larni 
                o'chirish veb-saytning to'liq funksionalligiga ta'sir qilishi mumkin.
              </p>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-dark)", marginBottom: "15px", paddingBottom: "10px", borderBottom: "2px solid var(--color-primary)" }}>
                5. Ma'lumotlarni himoya qilish
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text)", marginBottom: "15px" }}>
                Biz sizning ma'lumotlaringizni himoya qilish uchun quyidagi choralarni ko'ramiz:
              </p>
              <ul style={{ paddingLeft: "25px", marginBottom: "20px" }}>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Shifrlash texnologiyalari (SSL/TLS)
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Xavfsiz serverlar va ma'lumotlar bazalari
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Muntazam xavfsizlik auditlari
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Xodimlar uchun maxfiylik bo'yicha o'qitishlar
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Cheklangan ma'lumotlarga kirish huquqlari
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-dark)", marginBottom: "15px", paddingBottom: "10px", borderBottom: "2px solid var(--color-primary)" }}>
                6. Sizning huquqlaringiz
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text)", marginBottom: "15px" }}>
                Siz quyidagi huquqlarga egasiz:
              </p>
              <ul style={{ paddingLeft: "25px", marginBottom: "20px" }}>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Kirish huquqi:</strong> O'zingizning shaxsiy ma'lumotlaringizga kirish
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Tuzatish huquqi:</strong> Noto'g'ri ma'lumotlarni tuzatish
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>O'chirish huquqi:</strong> Ma'lumotlaringizni o'chirishni so'rash
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Cheklash huquqi:</strong> Ma'lumotlarni qayta ishlashni cheklash
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Ma'lumotlarni ko'chirish huquqi:</strong> Ma'lumotlaringizni boshqa xizmatga ko'chirish
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Qarshilik ko'rsatish huquqi:</strong> Ma'lumotlarni qayta ishlashga qarshilik ko'rsatish
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-dark)", marginBottom: "15px", paddingBottom: "10px", borderBottom: "2px solid var(--color-primary)" }}>
                7. Ma'lumotlarni saqlash muddati
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text)", marginBottom: "15px" }}>
                Biz sizning ma'lumotlaringizni faqat zarur bo'lgan muddat davomida saqlaymiz:
              </p>
              <ul style={{ paddingLeft: "25px", marginBottom: "20px" }}>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Bron ma'lumotlari: Xizmat ko'rsatilgandan keyin 3 yil
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  To'lov ma'lumotlari: Qonuniy talablarga muvofiq (odatda 5 yil)
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Marketing ma'lumotlari: Rozilik bekor qilingungacha yoki 2 yil
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  Texnik ma'lumotlar: 1 yil
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-dark)", marginBottom: "15px", paddingBottom: "10px", borderBottom: "2px solid var(--color-primary)" }}>
                8. Uchinchi tomon xizmatlari
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text)", marginBottom: "15px" }}>
                Biz quyidagi uchinchi tomon xizmatlaridan foydalanamiz:
              </p>
              <ul style={{ paddingLeft: "25px", marginBottom: "20px" }}>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Google Analytics:</strong> Veb-sayt trafigini tahlil qilish
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>To'lov tizimlari:</strong> Xavfsiz to'lovlarni qabul qilish
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>SMS xizmatlari:</strong> Xabarnomalar yuborish
                </li>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Hosting provayderlar:</strong> Veb-saytni saqlash
                </li>
              </ul>
              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text)", marginTop: "15px" }}>
                Bu xizmatlar o'zlarining maxfiylik siyosatlariga ega. Biz ularning siyosatlarini tavsiya qilamiz.
              </p>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-dark)", marginBottom: "15px", paddingBottom: "10px", borderBottom: "2px solid var(--color-primary)" }}>
                9. O'zgarishlar
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text)", marginBottom: "15px" }}>
                Biz ushbu Maxfiylik siyosatini vaqt-vaqt bilan yangilashimiz mumkin. O'zgarishlar kiritilganda, 
                biz veb-saytimizda e'lon qilamiz va muhim o'zgarishlar bo'lsa, sizga xabar beramiz. 
                Veb-saytni muntazam tekshirib turishingizni tavsiya qilamiz.
              </p>
            </div>

            <div style={{ marginBottom: "40px", padding: "25px", backgroundColor: "#f8f9fa", borderRadius: "8px", borderLeft: "4px solid var(--color-primary)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-dark)", marginBottom: "15px", paddingBottom: "10px", borderBottom: "2px solid var(--color-primary)" }}>
                10. Biz bilan bog'lanish
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text)", marginBottom: "15px" }}>
                Agar sizda ushbu Maxfiylik siyosati yoki ma'lumotlaringizni boshqarish bo'yicha savollar yoki 
                talablar bo'lsa, biz bilan bog'laning:
              </p>
              <ul style={{ paddingLeft: "25px", marginBottom: "0" }}>
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Telefon:</strong> <a href="tel:+998776344747" style={{ color: "var(--color-primary)", textDecoration: "none" }}>+998776344747</a>
                </li>
                {/*<li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>*/}
                {/*  <strong>Elektron pochta:</strong> <a href="mailto:otaxonovogabek633@gmail.com" style={{ color: "var(--color-primary)", textDecoration: "none" }}>otaxonovogabek633@gmail.com</a>*/}
                {/*</li>*/}
                <li style={{ marginBottom: "10px", lineHeight: "1.7", color: "var(--color-text)" }}>
                  <strong>Manzil:</strong> Qo'qon shahar, Farg'ona viloyati, O'zbekiston
                </li>
              </ul>
            </div>

            <div style={{ marginTop: "50px", padding: "20px", backgroundColor: "#fff3cd", borderRadius: "8px", border: "1px solid #ffc107" }}>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "#856404", margin: "0", textAlign: "center" }}>
                <strong>Eslatma:</strong> Ushbu sahifani foydalanish orqali siz ushbu Maxfiylik siyosatiga rozilik bildirasiz. 
                Agar siz rozilik bildirmasangiz, iltimos veb-saytdan foydalanmang.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default PrivacyPolicy;
