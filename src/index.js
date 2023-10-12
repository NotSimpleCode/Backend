import express from "express";
import cors from "cors"; // Importa el paquete cors
import peopleRoutes from "./routes/people_routes.js";
import rolesRoutes from "./routes/roles_routes.js";
import userConnection from "./routes/users_connection_routes.js";


const app = express();

app.use(express.json());

// Configura CORS para permitir solicitudes desde http://localhost:5173
//app.use(cors({ origin: 'http://localhost:5173' }));
// Configurar CORS para permitir cualquier origen
app.use(cors());

app.use('/api', peopleRoutes); 
app.use('/api', rolesRoutes);
app.use('/api', userConnection);


const port = process.env.PORT || 3000; // Usa el puerto proporcionado por Azure o el puerto 3000 si no está definido

app.listen(port, () => {
  console.log('Server is running on port', port);
});


