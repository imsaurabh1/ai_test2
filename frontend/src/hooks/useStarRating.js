//hook to calculate stars

const useStarRating = (DQB) => {
  let stars = 0;
  let color = "text-green-400";  // Use the same green-400 for all stars

  if (DQB >= 7) {
    stars = 5;
  } else if (DQB >= 5.5) {
    stars = 4;
  } else if (DQB >= 4) {
    stars = 3;
  } else if (DQB >= 2.5) {
    stars = 2;
  } else {
    stars = 1;
  }

  return { stars, color };
};



export default useStarRating;
