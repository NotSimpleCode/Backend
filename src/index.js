import express from "express";
import cors from "cors"; // Importa el paquete cors
import peopleRoutes from "./routes/people_routes.js";
import rolesRoutes from "./routes/roles_routes.js";
import userConnection from "./routes/users_connection_routes.js";

const app = express();

app.use(express.json());

// Configura CORS para permitir solicitudes desde http://localhost:5173
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api', peopleRoutes); 
app.use('/api', rolesRoutes);
app.use('/api', userConnection);

app.listen(3000, () => {
  console.log('Server on port', 3000);
});


