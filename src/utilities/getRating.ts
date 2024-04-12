const getRating = (stars: number) => {
  let starNumber = [];
  let regStars = [];
  if (stars < 5) {
    for (let i = 0; i < 5 - stars; i++) {
      regStars[i] = i;
    }
  }
  for (let i = 0; i < stars; i++) {
    starNumber[i] = i;
  }
  return { regStars, starNumber };
};
export default getRating;
