const calcSelfMailer = (
  paperOzPerSqIn,
  paperCaliper,
  height,
  width,
  numPanels
) => {
  //first calculate the weight of the mailpiece by getting the area in sq inches of the mailpiece
  // and multiply by the weight per sq oz of paper
  const totalWeight = height * width * paperOzPerSqIn;

  //calculate thickness by how many panels there are and the thickness of the paper
  const totalThickness = paperCaliper * numPanels;

  return { totalWeight, totalThickness };
};

const calcInsert = (
  paperOzPerSqIn,
  paperCaliper,
  height,
  width,
  numPanels,
  numPages
) => {
  //first calculate the weight of the mailpiece by getting the area in sq inches of the mailpiece
  // and multiply by the weight per sq oz of paper
  const totalWeight = height * width * paperOzPerSqIn * numPages;

  //calculate thickness by how many panels there are and the thickness of the paper
  const totalThickness = paperCaliper * numPanels * numPages;

  return { totalWeight, totalThickness };
};

const calcBooklet = (
  cvrPaperOzPerSqIn,
  cvrPaperCaliper,
  txtPaperOzPerSqIn,
  txtPaperCaliper,
  height,
  width,
  numPages
) => {
  //first calculate the weight

  const totalWeight =
    height * width * cvrPaperOzPerSqIn +
    (height * width * txtPaperOzPerSqIn * (numPages / 4) - 1);

  const totalThickness =
    cvrPaperCaliper * 2 + (numPages / 2 - 2 * txtPaperCaliper);

  return { totalWeight, totalThickness };
};

module.exports = { calcSelfMailer, calcInsert, calcBooklet };
