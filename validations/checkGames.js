const checkRelease_Year = (req, res, next) => {
  const releaseYear = req.body.release_year.toString();
  if (releaseYear.length !== 4) {
    res.status(400).json({ error: "Invalid release year." });
  } else {
    next();
  }
};

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
const checkArt = (req, res, next) => {
  const artUrl = req.body.art;

  if (!artUrl || isValidUrl(artUrl)) {
    next();
  } else {
    res.status(400).json({ error: "Invalid box art URL." });
  }
};

module.exports = { checkRelease_Year, checkArt };
