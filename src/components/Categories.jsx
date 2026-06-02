import React, {
  useEffect,
  useState,
  useContext
} from "react";

import API from "../services/api";

import { CartContext }
  from "../context/CartContext";

import { useNavigate }
  from "react-router-dom";

function Categories() {

  const [categories, setCategories] =
    useState([]);

  const [currentIndex, setCurrentIndex] =
    useState({});

  const nav = useNavigate();

  const { addToCart } =
    useContext(CartContext);

  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {

    fetchCategories();

  }, []);

  const fetchCategories = async () => {

    try {

      const response = await API.get(
        "/products"
      );

      setCategories(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // =========================
  // AUTO CAROUSEL
  // =========================

  useEffect(() => {

    const interval = setInterval(() => {

      categories.forEach((category) => {

        const mediaItems = [];

        if (category.image) {

          mediaItems.push({
            type: "image",
            url: category.image
          });

        }

        if (category.video) {

          mediaItems.push({
            type: "video",
            url: category.video
          });

        }

        if (mediaItems.length > 1) {

          setCurrentIndex((prev) => ({
            ...prev,
            [category._id]:
              (
                (prev[category._id] || 0) + 1
              ) % mediaItems.length
          }));

        }

      });

    }, 4000);

    return () => clearInterval(interval);

  }, [categories]);

  // =========================
  // NEXT SLIDE
  // =========================

  const nextSlide = (id, total) => {

    setCurrentIndex((prev) => ({
      ...prev,
      [id]:
        ((prev[id] || 0) + 1) % total
    }));

  };

  // =========================
  // PREV SLIDE
  // =========================

  const prevSlide = (id, total) => {

    setCurrentIndex((prev) => ({
      ...prev,
      [id]:
        (
          (prev[id] || 0) - 1 + total
        ) % total
    }));

  };

  return (

    <div>

      <section className="py-20 bg-soft-white">

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >

          {/* HEADING */}
          <div className="text-center mb-16">

            <h2
              className="
                text-4xl
                md:text-5xl
                font-bold
                text-chocolate
                mb-4
              "
            >

              Explore Our Collection

            </h2>

            <p
              className="
                text-lg
                text-chocolate/70
                max-w-2xl
                mx-auto
              "
            >

              From elegant wedding cakes
              to playful birthday treats,
              we have something special
              for every celebration

            </p>

          </div>

          {/* PRODUCTS */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-8
            "
          >

            {
              categories.map((category) => {

                // =====================
                // MEDIA ARRAY
                // =====================

                const mediaItems = [];

                if (category.image) {

                  mediaItems.push({
                    type: "image",
                    url: category.image
                  });

                }

                if (category.video) {

                  mediaItems.push({
                    type: "video",
                    url: category.video
                  });

                }

                const current =
                  currentIndex[
                    category._id
                  ] || 0;

                return (

                  <div
                    key={category._id}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-3xl
                      shadow-lg
                      hover:shadow-2xl
                      transition-all
                      duration-500
                      bg-white
                    "
                    onClick={() =>
                      nav(
                        `/product/${category._id}`,
                        {
                          state: category
                        }
                      )
                    }
                  >

                    {/* ADD TO CART */}
                    <button
                      onClick={(e) => {

                        e.stopPropagation();

                        addToCart(category);

                      }}
                      className="
                        absolute
                        top-4
                        right-4
                        z-20
                        bg-white/20
                        backdrop-blur-lg
                        border
                        border-white/30
                        text-white
                        px-4
                        py-2
                        rounded-full
                        shadow-lg
                        hover:bg-white
                        hover:text-black
                        transition-all
                        duration-300
                      "
                    >

                      Add To Cart

                    </button>

                    {/* ================= */}
                    {/* CAROUSEL */}
                    {/* ================= */}

                    <div
                      className="
                        aspect-[3/4]
                        overflow-hidden
                        relative
                      "
                    >

                      {
                        mediaItems[current]
                          ?.type ===
                        "image" ? (

                          <img
                            src={
                              mediaItems[
                                current
                              ].url
                            }
                            alt={
                              category.name
                            }
                            className="
                              w-full
                              h-full
                              object-cover
                              group-hover:scale-110
                              transition-transform
                              duration-700
                            "
                          />

                        ) : (

                          <video
                            src={
                              mediaItems[
                                current
                              ].url
                            }
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls={false}
                            className="
                              w-full
                              h-full
                              object-cover
                            "
                          />

                        )
                      }

                      {/* OVERLAY */}
                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/80
                          via-black/20
                          to-transparent
                        "
                      />

                      {/* LEFT BUTTON */}
                      {
                        mediaItems.length > 1 &&

                        <button
                          onClick={(e) => {

                            e.stopPropagation();

                            prevSlide(
                              category._id,
                              mediaItems.length
                            );

                          }}
                          className="
                            absolute
                            top-1/2
                            left-4
                            -translate-y-1/2
                            z-20
                            w-10
                            h-10
                            rounded-full
                            backdrop-blur-md
                            bg-white/20
                            border
                            border-white/30
                            text-white
                            flex
                            items-center
                            justify-center
                            shadow-lg
                            hover:bg-white/40
                            hover:scale-110
                            transition-all
                            duration-300
                          "
                        >

                          ‹

                        </button>
                      }

                      {/* RIGHT BUTTON */}
                      {
                        mediaItems.length > 1 &&

                        <button
                          onClick={(e) => {

                            e.stopPropagation();

                            nextSlide(
                              category._id,
                              mediaItems.length
                            );

                          }}
                          className="
                            absolute
                            top-1/2
                            right-4
                            -translate-y-1/2
                            z-20
                            w-10
                            h-10
                            rounded-full
                            backdrop-blur-md
                            bg-white/20
                            border
                            border-white/30
                            text-white
                            flex
                            items-center
                            justify-center
                            shadow-lg
                            hover:bg-white/40
                            hover:scale-110
                            transition-all
                            duration-300
                          "
                        >

                          ›

                        </button>
                      }

                      {/* DOTS */}
                      {
                        mediaItems.length > 1 &&

                        <div
                          className="
                            absolute
                            bottom-4
                            left-1/2
                            -translate-x-1/2
                            flex
                            gap-2
                            z-20
                          "
                        >

                          {
                            mediaItems.map(
                              (_, index) => (

                                <div
                                  key={index}
                                  className={`
                                    w-2
                                    h-2
                                    rounded-full
                                    transition-all
                                    duration-300
                                    ${
                                      current ===
                                      index
                                        ? "bg-white w-5"
                                        : "bg-white/50"
                                    }
                                  `}
                                />

                              )
                            )
                          }

                        </div>
                      }

                    </div>

                    {/* CONTENT */}
                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        p-6
                        text-white
                        z-10
                      "
                    >

                      <h3
                        className="
                          text-2xl
                          font-bold
                          mb-2
                        "
                      >

                        {category.name}

                      </h3>

                      <p
                        className="
                          text-white/90
                          text-sm
                          mb-2
                        "
                      >

                        {
                          category.description
                        }

                      </p>

                      <p
                        className="
                          text-lg
                          font-semibold
                        "
                      >

                        $ {category.price}

                      </p>

                    </div>

                  </div>

                );

              })
            }

          </div>

        </div>

      </section>

    </div>

  );

}

export default Categories;