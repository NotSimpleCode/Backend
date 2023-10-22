import express from "express";
import cors from "cors"; // Importa el paquete cors
import peopleRoutes from "./routes/people_routes.js";
import rolesRoutes from "./routes/roles_routes.js";
import userConnection from "./routes/users_connection_routes.js";
import cosechas from "./routes/cosechas_routes.js";
import hist_cosecha from "./routes/historial_cosecha_routes.js";
import hist_plagas from "./routes/historial_plagas_routes.js";
import lotes from "./routes/lotes_routes.js";
import user_lotes from "./routes/lotes_users_routes.js";
import sectores from "./routes/sectores_routes.js";
import tipo_planta from "./routes/tipo_plantas_routes.js";
import ventas from "./routes/ventas_routes.js";

const app = express();

app.use(express.json());

// Configura CORS para permitir solicitudes desde http://localhost:5173
//app.use(cors({ origin: 'http://localhost:5173' }));
// Configurar CORS para permitir cualquier origen
app.use(cors());

app.use('/api', peopleRoutes); 
app.use('/api', rolesRoutes);
app.use('/api', userConnection);

app.use('/api', lotes); 
app.use('/api', user_lotes);
app.use('/api', tipo_planta);
app.use('/api', sectores); 
app.use('/api', cosechas);
app.use('/api', hist_cosecha);
app.use('/api', hist_plagas); 
app.use('/api', ventas);


const port = process.env.PORT || 3000; // Usa el puerto proporcionado por Azure o el puerto 3000 si no está definido

app.listen(port, () => {
  console.log('Server is running on port', port);
});


