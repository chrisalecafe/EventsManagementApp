import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "../components/auth/RequireAuth";
import { AppLayout, LoginLayout } from "../components/layouts";
import { Register, Events, EventRegister, Login, NotFound } from "../pages";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            element={<RequireAuth allowedRoles={["user", "admin", "staff"]} />}
          >
            <Route index element={<Events />} />
            <Route path="eventRegister" element={<EventRegister />} />
            <Route path="register/:id" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="/" element={<LoginLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
