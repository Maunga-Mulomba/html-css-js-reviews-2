document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star-rating");
  const searchInput = document.getElementById("search-bar");
  const reviewNumbers = document.querySelectorAll(".reviews__number");
  const searchBtn = document.getElementById("search-btn");
  const progressBarContainers = document.querySelectorAll(
    ".reviews__percentage"
  );
  const avgRating = document.getElementById("avg-rating");
  const rankings = document.querySelectorAll(".ranking");
  const searchProduct = document.getElementById("search-product");
  const submitBtn = document.getElementById("submit-btn");
  const addReview = document.querySelector(".add-review");
  const reviewBtn = document.getElementById("review-btn");
  const thankYouMsg = document.querySelector(".thank-you-msg");

  // ADD NEW REVIEW
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      const clickedStarValue = parseInt(star.getAttribute("data-star"));

      stars.forEach((s) => {
        const starValue = parseInt(s.getAttribute("data-star"));
        if (starValue <= clickedStarValue) {
          s.classList.add("is-active");
        } else {
          s.classList.remove("is-active");
        }
      });
    });

    // HOVER OVER EFFECT
    star.addEventListener("mouseover", () => {
      stars.forEach((s, i) => {
        if (i <= index) {
          s.classList.add("is-active");
        } else {
          s.classList.remove("is-active");
        }
      });
    });
  });

  // GENERATE RANDOM NUMBERS ON SEARCH
  searchBtn.addEventListener("click", () => {
    // Get the search query from the input field
    const searchQuery = searchInput.value.toUpperCase().trim();

    if (searchQuery !== "") {
      // Generate random review counts and update the displayed numbers
      reviewNumbers.forEach((review, index) => {
        const randomReviewCount = Math.floor(Math.random() * 101);
        review.textContent = randomReviewCount;
      });

      // Calculate the total number of reviews and update progress bars
      const totalReviews = Array.from(reviewNumbers).map((r) =>
        parseInt(r.textContent)
      );
      const total = totalReviews.reduce((acc, curr) => acc + curr, 0);

      // Update the progress bars for each rating
      progressBarContainers.forEach((container, index) => {
        const percentage = (totalReviews[index] / total) * 100;
        const progressBar = container.querySelector(".progress-bar");
        progressBar.style.width = percentage + "%";
      });

      // change the average rating
      let sum = 0;
      rankings.forEach((star, index) => {
        const starValue = parseInt(star.getAttribute("data-percent"));
        sum += starValue * totalReviews[index];
      });
      const averageScore = sum / total;

      avgRating.textContent = averageScore.toFixed(1);

      // display name of the product
      searchProduct.textContent = `Showing reviews for: ${searchQuery}`;
      searchInput.value = "";
    }
  });

  reviewBtn.addEventListener("click", () => {
    addReview.style.display = "Block";
  });

  // SUBMIT REVIEW
  submitBtn.addEventListener("click", () => {
    addReview.style.display = "none";
    thankYouMsg.style.display = "block";

    setTimeout(() => {
      location.reload();
    }, 3000);
  });
});
