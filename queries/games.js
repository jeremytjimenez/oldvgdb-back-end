const db = require("../db/dbConfig");

const getAllGames = async () => {
  try {
    const allGames = await db.any("SELECT * FROM games");

    return allGames;
  } catch (error) {
    return error;
  }
};

async function getGameById(id) {
  try {
    const foundGame = await db.any(`SELECT * FROM games WHERE id = $1`, id);

    return foundGame;
  } catch (error) {
    return error;
  }
}

// use returning * in order to return what was created

const createGame = async (data) => {
  try {
    const newGame = await db.one(
      "INSERT INTO games (title, release_year, developer, publisher, country, platform, genre, player_count, art, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        data.title,
        data.release_year,
        data.developer,
        data.publisher,
        data.country,
        data.platform,
        data.genre,
        data.player_count,
        data.art,
        data.description
      ]
    );

    return { status: "successful!", data: newGame };
  } catch (error) {
    return error;
  }
};

const deleteGameById = async (id) => {
  try {
    const deletedGame = await db.any(
      "DELETE FROM games WHERE id = $1 RETURNING *",
      [id]
    );

    return { status: "successful!", data: deletedGame };
  } catch (error) {
    return { status: "failed", err: error };
  }
};

const updateGameById = async (id, data) => {
  try {
    const originalGame = await db.any("SELECT * FROM games WHERE id = $1", [
      id,
    ]);

    let combinedGame = {
      ...originalGame[0],
      ...data,
    };

    const updatedGame = await db.one(
      "UPDATE games SET title = $1, release_year = $2, developer = $3, publisher = $4, country = $5, platform = $6, genre = $7, player_count = $8, art = $9, description = $10 WHERE id = $11 RETURNING *",
      [
        combinedGame.title,
        combinedGame.release_year,
        combinedGame.developer,
        combinedGame.publisher,
        combinedGame.country,
        combinedGame.platform,
        combinedGame.genre,
        combinedGame.player_count,
        combinedGame.art,
        combinedGame.description,
        id,
      ]
    );

    console.log(updatedGame)

    return { status: "successful!", data: updatedGame };
  } catch (error) {
    return { status: "failed", err: error };
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  deleteGameById,
  updateGameById,
};
