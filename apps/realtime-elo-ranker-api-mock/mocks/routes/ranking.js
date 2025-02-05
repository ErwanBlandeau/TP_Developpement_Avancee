const { PLAYER_INVENTER } = require("../data/players.data.js");

const fakeRanking = PLAYER_INVENTER.map((player, index) => ({
  id: player,
  rank: 1000 + index * 10
})).sort((a, b) => b.rank - a.rank);

module.exports = [
  {
    id: "get-ranking",
    url: "/api/ranking",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: fakeRanking,
        }
      }
    ]
  },
  {
    id: "get-ranking-events-random",
    url: "/api/ranking/events",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: async (req, res, _next, core) => {
            res.writeHead(200, {
              'Content-Type': 'text/event-stream',
              'Content-Encoding': 'none',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
              'Access-Control-Allow-Origin': '*',
            });
            await new Promise(resolve => {
              const interval = setInterval(() => {
                core.logger.info('Sending ranking update');
                res.write("event: message\n" + "data: " + JSON.stringify({
                  type: "RankingUpdate",
                  player: {
                    id: PLAYER_INVENTER[((Math.floor(Math.random() * PLAYER_INVENTER.length)))],
                    rank: Math.floor(Math.random() * 2500)
                  }
                }) + '\n\n');
              }, 500);
              req.on('close', () => {
                clearInterval(interval);
                res.end();
                resolve();
              });
            });
          }
        }
      }
    ]
  }
];