import React, { useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";

import { useParams } from "react-router-dom";
import blogData from "../assets/data/blogData.js";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import "../styles/blog-details.css";
import { slugify } from "../utils/slugify";

const BlogDetails = () => {
  const { slug } = useParams();
  const raw = String(slug ?? "");
  const decoded = (() => {
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  })();

  const blog = blogData.find((b) => (b.slug || slugify(b.title)) === raw) || blogData.find((b) => b.title === decoded);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog]);

  if (!blog) {
    return (
      <Helmet title="Topilmadi" description="So‘ralgan blog topilmadi." noindex canonicalPath="/blogs">
        <section>
          <Container className="py-5 text-center">
            <p>Bunday blog topilmadi.</p>
            <Link to="/blogs">Bloglar ro'yxatiga qaytish</Link>
          </Container>
        </section>
      </Helmet>
    );
  }

  return (
    <Helmet
      title={blog.title}
      description={blog.description}
      canonicalPath={`/blogs/${blog.slug || slugify(blog.title)}`}
      image={blog.imgUrl}
      type="article"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        image: blog.imgUrl ? [blog.imgUrl] : undefined,
        author: blog.author
          ? { "@type": "Person", name: blog.author }
          : undefined,
        publisher: {
          "@type": "Organization",
          name: "Ziyo Rent Car",
        },
        datePublished: blog.date,
        description: blog.description,
      }}
    >
      <section className="animate-page-enter">
        <Container>
          <Row>
            <Col lg="8" md="8">
              <div className="blog__details animate-on-scroll animate-fade-in-up">
                <img src={blog.imgUrl} alt="" className="w-100" />
                <h2 className="section__title mt-4">{blog.title}</h2>

                <div className="blog__publisher d-flex align-items-center gap-4 mb-4">
                  <span className="blog__author">
                    <i className="ri-user-line"></i> {blog.author}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-calendar-line"></i> {blog.date}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-time-line"></i> {blog.time}
                  </span>
                </div>

                <p className="section__description">{blog.description}</p>
                <h6 className="ps-5 fw-normal">
                  <blockquote className="fs-4">{blog.quote}</blockquote>
                </h6> 
                <p className="section__description">{blog.description}</p>
              </div>

              <div className="comment__list mt-5">
                {/* =============== comment form ============ */}
                <div className="leave__comment-form mt-5">
                  <h4>Izoh qoldiring</h4>
                  <p className="section__description">
                  Post yozish yoki fikr bildirish uchun tizimga kirishingiz kerak
                  </p>

                  <Form>
                    <FormGroup className=" d-flex gap-3">
                      <Input type="text" placeholder="To'liq ism" />
                      <Input type="tel" placeholder="Telefon raqamingiz" />
                    </FormGroup>

                    <FormGroup>
                      <textarea
                        rows="5"
                        className="w-100 py-2 px-3"
                        placeholder="Fikr bildirish..."
                      ></textarea>
                    </FormGroup>

                    <button className="btn comment__btn mt-3">
                      Fikr qoldirish
                    </button>
                  </Form>
                </div>
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="recent__post mb-4">
                <h5 className=" fw-bold">Oxirgi xabarlar</h5>
              </div>
              {blogData.map((item) => (
                <div className="recent__blog-post mb-4" key={item.id}>
                  <div className="recent__blog-item d-flex gap-3">
                    <img src={item.imgUrl} alt="" className="w-25 rounded-2" />
                    <h6>
                      <Link to={`/blogs/${item.slug || slugify(item.title)}`}>{item.title}</Link>
                    </h6>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BlogDetails;
