export const sortNewLocations = (prevLocs, newLoc) => {
  let locs = [];
  //add to the beginning
  if (prevLocs.indexOf(newLoc) < 0) {
    locs = [newLoc].concat(prevLocs);
  } else {
    //shift order
    let index = prevLocs.indexOf(newLoc);
    prevLocs.splice(index, 1);
    locs = [newLoc].concat(prevLocs);
  }

  return locs;
};

export const removeLocation = (prevLocs, rmLoc) => {
  console.log(prevLocs, rmLoc);
  let index = prevLocs.indexOf(rmLoc);
  prevLocs.splice(index, 1);

  return prevLocs;
};
