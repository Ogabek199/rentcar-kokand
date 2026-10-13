import { useState, useMemo, useEffect } from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import SearchBar from "../components/UI/SearchBar";
import FilterSort from "../components/UI/FilterSort";
import carData from "../assets/data/carData";
import "../styles/no-results.css";
import { useTranslation } from "../i18n/LanguageContext";

const CarListing = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    transmission: "all",
  });
  const [sortBy, setSortBy] = useState("default");

  const filteredAndSortedCars = useMemo(() => {
    let filtered = [...carData];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((car) =>
        car.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Transmission filter
    if (filters.transmission !== "all") {
      filtered = filtered.filter((car) => car.automatic === filters.transmission);
    }

    // Sort
    switch (sortBy) {
      case "name-asc":
        filtered.sort((a, b) => a.carName.localeCompare(b.carName));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.carName.localeCompare(a.carName));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, filters, sortBy]);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const section = document.querySelector(".section--cars");
        if (section) section.querySelectorAll(".animate-on-scroll").forEach((el) => el.classList.add("animated"));
      });
    });
    return () => cancelAnimationFrame(timer);
  }, [searchTerm, filters, sortBy]);

  return (
    <Helmet
      title={t("carListing.title")}
      description="Ziyo Rent Car avtoparki: Malibu, Gentra, Equinox, Onix, Tahoe, Captiva. Qo‘qonda kunlik ijara — bron uchun Telegram @RendcarQoqon."
      keywords="avtopark Qo‘qon, Malibu ijarasi, Gentra ijarasi, Equinox ijarasi, Tahoe ijarasi, rent car Kokand"
      canonicalPath="/cars"
    >
      <CommonSection title={t("carListing.sectionTitle")} />

      <section className="section--cars animate-on-scroll animate-fade-in-up">
        <Container>
          <div className="animate-on-scroll animate-fade-in-down">
            <FilterSort 
              onFilterChange={setFilters} 
              onSortChange={setSortBy}
              searchComponent={<SearchBar onSearch={setSearchTerm} />}
            />
          </div>
          
          {filteredAndSortedCars.length > 0 ? (
            <Row className="animate-on-scroll animate-stagger">
              {filteredAndSortedCars.map((item) => (
                <CarItem item={item} key={item.id} />
              ))}
            </Row>
          ) : (
            <div className="no-results animate-on-scroll animate-fade-in">
              <i className="ri-search-line"></i>
              <h3>{t("carListing.notFound")}</h3>
              <p>{t("carListing.notFoundText")}</p>
            </div>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
