import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./auth";
import Dashboard from "./components/dashboard/Dashboard";
import AddBreakPage from "./pages/breaks/AddBreakPage";
import EditBreakPage from "./pages/breaks/EditBreakPage";
import ListBreakPage from "./pages/breaks/ListBreakPage";
import Login from "./pages/Login";
import PredictionPage from "./pages/prediction/PredictionPage";
import Register from "./pages/Register";
import ReportPage from "./pages/reports/Index";
import AddSessionPage from "./pages/sessions/AddSessionPage";
import EditSessionPage from "./pages/sessions/EditSessionPage";
import ListSessionPage from "./pages/sessions/ListSessionPage";
import AddSubjectPage from "./pages/subjects/AddSubjectPage";
import EditSubjectPage from "./pages/subjects/EditSubjectPage";
import ListSubjectPage from "./pages/subjects/ListSubjectPage";
import PrivateRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/subjects" element={<Dashboard />}>
              <Route index={true} element={<ListSubjectPage />} />
              <Route path="add" element={<AddSubjectPage />} />
              <Route path="edit/:id" element={<EditSubjectPage />} />
            </Route>
            <Route path="/sessions" element={<Dashboard />}>
              <Route index={true} element={<ListSessionPage />} />
              <Route path="add" element={<AddSessionPage />} />
              <Route path="edit/:id" element={<EditSessionPage />} />
            </Route>
            <Route path="/breaks" element={<Dashboard />}>
              <Route index={true} element={<ListBreakPage />} />
              <Route path="add" element={<AddBreakPage />} />
              <Route path="edit/:id" element={<EditBreakPage />} />
            </Route>
            <Route path="/report" element={<Dashboard />}>
              <Route index={true} element={<ReportPage />} />
            </Route>
            <Route path="/prediction" element={<Dashboard />}>
              <Route index={true} element={<PredictionPage />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
