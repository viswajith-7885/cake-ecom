import React, {
  useContext,
  useEffect,
  useState
} from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  CartContext
} from "../context/CartContext";

function ProductView() {

  const location = useLocation();

  const nav = useNavigate();

  const { addToCart } =
    useContext(CartContext);

  // =========================
  // PRODUCT DATA
  // =========================

  const product = location.state;

  // =========================
  // CAROUSEL STATE
  // =========================

  const [currentIndex, setCurrentIndex] =
    useState(0);

  // =========================
  // MEDIA ARRAY
  // =========================

  const mediaItems = [];

  if (product?.image) {

    mediaItems.push({
      type: "image",
      url: product.image
    });

  }

  if (product?.video) {

    mediaItems.push({
      type: "video",
      url: product.video
    });

  }

  // =========================
  // AUTO SLIDE
  // =========================

  useEffect(() => {

    if (mediaItems.length <= 1) return;

    const interval = setInterval(() => {

      setCurrentIndex((prev) =>
        (prev + 1) % mediaItems.length
      );

    }, 4000);

    return () => clearInterval(interval);

  }, [mediaItems.length]);

  // =========================
  // NEXT SLIDE
  // =========================

  const nextSlide = () => {

    setCurrentIndex((prev) =>
      (prev + 1) % mediaItems.length
    );

  };

  // =========================
  // PREV SLIDE
  // =========================

  const prevSlide = () => {

    setCurrentIndex((prev) =>
      (
        prev - 1 + mediaItems.length
      ) % mediaItems.length
    );

  };

  // =========================
  // PRODUCT NOT FOUND
  // =========================

  if (!product) {

    return (

      <div
        className="
          h-screen
          flex
          items-center
          justify-center
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            text-gray-700
          "
        >

          Product Not Found

        </h1>

      </div>

    );

  }

  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-pink-50
        via-rose-50
        to-orange-50
        py-10
        px-4
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          bg-white/70
          backdrop-blur-xl
          rounded-[40px]
          shadow-2xl
          overflow-hidden
          border
          border-white/40
        "
      >

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-10
          "
        >

          {/* ===================== */}
          {/* MEDIA SECTION */}
          {/* ===================== */}

          <div className="p-6">

            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                shadow-2xl
              "
            >

              {
                mediaItems[currentIndex]
                  ?.type === "image" ? (

                  <img
                    src={
                      mediaItems[
                        currentIndex
                      ].url
                    }
                    alt={product.name}
                    className="
                      w-full
                      h-[550px]
                      object-cover
                      transition-all
                      duration-700
                      hover:scale-105
                    "
                  />

                ) : (

                  <video
                    src={
                      mediaItems[
                        currentIndex
                      ].url
                    }
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="
                      w-full
                      h-[550px]
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
                  from-black/40
                  via-transparent
                  to-transparent
                "
              />

              {/* LEFT BUTTON */}
              {
                mediaItems.length > 1 &&

                <button
                  onClick={prevSlide}
                  className="
                    absolute
                    top-1/2
                    left-4
                    -translate-y-1/2
                    z-20
                    w-12
                    h-12
                    rounded-full
                    backdrop-blur-lg
                    bg-white/20
                    border
                    border-white/30
                    text-white
                    text-2xl
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
                  onClick={nextSlide}
                  className="
                    absolute
                    top-1/2
                    right-4
                    -translate-y-1/2
                    z-20
                    w-12
                    h-12
                    rounded-full
                    backdrop-blur-lg
                    bg-white/20
                    border
                    border-white/30
                    text-white
                    text-2xl
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
                    bottom-5
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
                            h-2
                            rounded-full
                            transition-all
                            duration-300
                            ${
                              currentIndex ===
                              index
                                ? "w-8 bg-white"
                                : "w-2 bg-white/50"
                            }
                          `}
                        />

                      )
                    )
                  }

                </div>
              }

            </div>

          </div>

          {/* ===================== */}
          {/* PRODUCT DETAILS */}
          {/* ===================== */}

          <div
            className="
              p-8
              flex
              flex-col
              justify-center
            "
          >

            <span
              className="
                bg-pink-100
                text-pink-600
                px-5
                py-2
                rounded-full
                w-fit
                text-sm
                font-semibold
                mb-5
              "
            >

              Premium Cake

            </span>

            <h1
              className="
                text-5xl
                font-bold
                text-gray-800
                mb-5
              "
            >

              {product.name}

            </h1>

            <p
              className="
                text-gray-500
                text-lg
                leading-relaxed
                mb-8
              "
            >

              {product.description}

            </p>

            <h2
              className="
                text-5xl
                font-extrabold
                text-pink-600
                mb-8
              "
            >

              $ {product.price}

            </h2>

            {/* BUTTONS */}
            <div className="flex gap-4">

              <button
                className="
                  bg-gradient-to-r
                  from-pink-500
                  to-rose-500
                  hover:from-pink-600
                  hover:to-rose-600
                  text-white
                  px-10
                  py-4
                  rounded-2xl
                  shadow-xl
                  hover:scale-105
                  transition-all
                  duration-300
                  font-semibold
                "
                onClick={() =>
                  addToCart(product)
                }
              >

                Add to Cart

              </button>

              <button
                onClick={() => nav(-1)}
                className="
                  border
                  border-pink-500
                  text-pink-500
                  hover:bg-pink-50
                  px-10
                  py-4
                  rounded-2xl
                  transition-all
                  duration-300
                  font-semibold
                "
              >

                Go Back

              </button>

            </div>

            {/* EXTRA INFO */}
            <div
              className="
                mt-12
                border-t
                pt-8
                space-y-4
              "
            >

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Category
                </span>

                <span className="font-semibold">
                  Cakes
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Delivery
                </span>

                <span className="font-semibold">
                  Free Delivery
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Availability
                </span>

                <span
                  className="
                    font-semibold
                    text-green-600
                  "
                >

                  In Stock

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProductView;