document.addEventListener("DOMContentLoaded", function () {
  const tutors = {
    "dr-johnson": {
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      rating: "★★★★★",
      reviews: "(128 reviews)",
      img: "images/profile.png",
      mode: "Online or In-person",
    },
    "david-chen": {
      name: "Mr. David Chen",
      subject: "Chemistry",
      rating: "★★★★☆",
      reviews: "(87 reviews)",
      img: "images/profile.png",
      mode: "Online only",
    },
    "emily-wilson": {
      name: "Ms. Emily Wilson",
      subject: "English Literature",
      rating: "★★★★★",
      reviews: "(64 reviews)",
      img: "images/profile.png",
      mode: "In-person only",
    }
  };

  const params = new URLSearchParams(window.location.search);
  const tutorKey = params.get("tutor");
  const tutor = tutors[tutorKey];

  if (tutor) {
    document.querySelector(".tutor-img").src = tutor.img;
    document.querySelector(".tutor-basic-info h3").textContent = tutor.name;
    document.querySelector(".stars").textContent = tutor.rating;
    document.querySelector(".review-count").textContent = tutor.reviews;
    document.querySelector(".tutor-subject").textContent = tutor.subject + " • " + tutor.mode;
  }

  const form = document.querySelector(".booking-form");
  if (!form) return;
  const confirmation = document.getElementById("confirmation-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const date = document.getElementById("session-date").value;
    const time = document.getElementById("session-time").value;
    const type = document.getElementById("session-type").value;

    if (!date || !time || !type) {
      alert("Please fill out all required fields.");
      return;
    }

    confirmation.classList.remove("d-none");
    form.reset();

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2500);
  });
});
