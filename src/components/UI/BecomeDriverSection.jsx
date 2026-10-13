import "../../styles/become-driver.css";
import { Container, Row, Col } from "reactstrap";

const BecomeDriverSection = () => {
  return (
    <section className="become__driver">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become__driver-img">
            <img src="https://asacar.uz/uploads/car_color/KK/KK/KE/1632743563.png" alt="" className="w-100" />
          </Col>

          <Col lg="6" md="6" sm="12">
            <h2 className="section__title become__driver-title">
              Biz bilan pul ishlashni hohlaysizmi? Shunday ekan, kechikmang
            </h2>

            <button onClick={() => alert("Murojaat uchun: +998776344747")} className="btn become__driver-btn mt-4">
              Haydovchi bo'l
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BecomeDriverSection;
