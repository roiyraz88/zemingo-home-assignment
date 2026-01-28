import { connectDB } from "./config/db";
import { config } from "./config/config";
import app from "./app";

connectDB();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
