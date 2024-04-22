import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/ui/Layout";
import { ListGeneros } from "../views/ListGeneros";
import { ListDirectores } from "../views/ListDirectores";
import { ListProductoras } from "../views/ListProductoras";
import { ListMedias } from "../views/ListMedias";
import { ListTipos } from "../views/ListTipos";

export const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/admin/generos" element={<ListGeneros />} />
        <Route path="/admin/directores" element={<ListDirectores />} />
        <Route path="/admin/productoras" element={<ListProductoras />} />
        <Route path="/admin/tipos" element={<ListTipos />} />
        <Route path="/admin/series" element={<ListMedias />} />
        <Route path='/admin/*' element={<Navigate to='/admin/generos' />} />
        <Route path='/*' element={<Navigate to='/admin/generos' />} />
      </Route>
    </Routes>
  )
};
