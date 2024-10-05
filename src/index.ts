import dotenv from "dotenv";

import server from "./server/server";

dotenv.config();

function main() {
  const port = process.env.PORT || "8080";
  server.app.listen(port, () => {
    console.log(`Running sat-viewer on port ${port}`);
  });
}

main();
