const LeaderService = {
  getAll(db) {
    return db
      .select(
        'name',
        'score'
      )
      .from('leaderboard')
      .orderBy('score', 'desc')
      .limit(5)
  },

  postScore(db, newScore) {
    return db
      .from('leaderboard')
      .insert(newScore)
  }
}

module.exports = LeaderService;