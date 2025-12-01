import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProveedorAutenticacion, useAutenticacion } from './contextos/autenticacion-contexto';
import { ProveedorTema } from './contextos/tema-contexto';
import { ProveedorMenu } from './contextos/menu-contexto';
import { ProveedorEdicionImagenes } from './contextos/edicion-imagenes-contexto';
import InicioSesion from './paginas/InicioSesion';
import Registro from './paginas/Registro';
import Inicio from './paginas/Inicio';
import Pacientes from './paginas/Pacientes';
import Agenda from './paginas/Agenda';
import EdicionImagenes from './paginas/EdicionImagenes';
import Tratamientos from './paginas/Tratamientos';
import Finanzas from './paginas/Finanzas';
import Inventarios from './paginas/Inventarios';
import Configuracion from './paginas/Configuracion';
import { Loader2, Smartphone } from 'lucide-react';
import { useResponsive } from './hooks/use-responsive';

function RutaProtegida({ children }: { children: React.ReactNode }) {
  const { usuario, cargando } = useAutenticacion();

  if (cargando) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/inicio-sesion" replace />;
  }

  return <>{children}</>;
}

function RutaPublica({ children }: { children: React.ReactNode }) {
  const { usuario, cargando } = useAutenticacion();

  if (cargando) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (usuario) {
    return <Navigate to="/inicio" replace />;
  }

  return <>{children}</>;
}

function PantallaNoSoportada() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-6 text-center">
      <div className="mb-6 rounded-full bg-destructive/10 p-6">
        <Smartphone className="h-16 w-16 text-destructive" />
      </div>
      <h1 className="mb-2 text-2xl font-bold text-foreground">
        Dispositivo no soportado
      </h1>
      <p className="text-muted-foreground text-lg max-w-md">
        Esta aplicación no está disponible para celulares o tablets. Por favor, ingresa desde una computadora o laptop para acceder al sistema.
      </p>
    </div>
  );
}

function InicioResponsive() {
  const { es_movil, es_tablet } = useResponsive();
  if (es_movil || es_tablet) return <PantallaNoSoportada />;
  return <Inicio />;
}

function PacientesResponsive() {
  const { es_movil, es_tablet } = useResponsive();
  if (es_movil || es_tablet) return <PantallaNoSoportada />;
  return <Pacientes />;
}

function AgendaResponsive() {
  const { es_movil, es_tablet } = useResponsive();
  if (es_movil || es_tablet) return <PantallaNoSoportada />;
  return <Agenda />;
}

function EdicionImagenesResponsive() {
  const { es_movil, es_tablet } = useResponsive();
  if (es_movil || es_tablet) return <PantallaNoSoportada />;
  return <EdicionImagenes />;
}

function TratamientosResponsive() {
  const { es_movil, es_tablet } = useResponsive();
  if (es_movil || es_tablet) return <PantallaNoSoportada />;
  return <Tratamientos />;
}

function FinanzasResponsive() {
  const { es_movil, es_tablet } = useResponsive();
  if (es_movil || es_tablet) return <PantallaNoSoportada />;
  return <Finanzas />;
}

function InventariosResponsive() {
  const { es_movil, es_tablet } = useResponsive();
  if (es_movil || es_tablet) return <PantallaNoSoportada />;
  return <Inventarios />;
}

function ConfiguracionResponsive() {
  const { es_movil, es_tablet } = useResponsive();
  if (es_movil || es_tablet) return <PantallaNoSoportada />;
  return <Configuracion />;
}

function App() {
  return (
    <ProveedorTema>
      <ProveedorAutenticacion>
        <ProveedorMenu>
          <ProveedorEdicionImagenes>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/inicio-sesion"
                  element={
                    <RutaPublica>
                      <InicioSesion />
                    </RutaPublica>
                  }
                />
                <Route
                  path="/registro"
                  element={
                    <RutaPublica>
                      <Registro />
                    </RutaPublica>
                  }
                />
                <Route
                  path="/inicio"
                  element={
                    <RutaProtegida>
                      <InicioResponsive />
                    </RutaProtegida>
                  }
                />
                <Route
                  path="/pacientes"
                  element={
                    <RutaProtegida>
                      <PacientesResponsive />
                    </RutaProtegida>
                  }
                />
                <Route
                  path="/agenda"
                  element={
                    <RutaProtegida>
                      <AgendaResponsive />
                    </RutaProtegida>
                  }
                />
                <Route
                  path="/edicion-imagenes"
                  element={
                    <RutaProtegida>
                      <EdicionImagenesResponsive />
                    </RutaProtegida>
                  }
                />
                <Route
                  path="/tratamientos"
                  element={
                    <RutaProtegida>
                      <TratamientosResponsive />
                    </RutaProtegida>
                  }
                />
                <Route
                  path="/finanzas"
                  element={
                    <RutaProtegida>
                      <FinanzasResponsive />
                    </RutaProtegida>
                  }
                />
                <Route
                  path="/inventarios"
                  element={
                    <RutaProtegida>
                      <InventariosResponsive />
                    </RutaProtegida>
                  }
                />
                <Route
                  path="/configuracion"
                  element={
                    <RutaProtegida>
                      <ConfiguracionResponsive />
                    </RutaProtegida>
                  }
                />
                <Route path="/" element={<Navigate to="/inicio" replace />} />
              </Routes>
            </BrowserRouter>
          </ProveedorEdicionImagenes>
        </ProveedorMenu>
      </ProveedorAutenticacion>
    </ProveedorTema>
  );
}

export default App;