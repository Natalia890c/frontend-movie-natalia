import { Route, Routes } from "react-router-dom";
import Layout from "../components/ui/Layout";
import { ListGeneros } from "../views/ListGeneros";
import { ListDirectores } from "../views/ListDirectores";
import { ListProductoras } from "../views/ListProductoras";
import { ListMedias } from "../views/ListMedias";
import { ListTipos } from "../views/ListTipos";

export const Router = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/generos" element={<ListGeneros />}/>
        <Route path="/directores" element={<ListDirectores />}/>
        <Route path="/productoras" element={<ListProductoras />}/>
        <Route path="/tipos" element={<ListTipos />}/>
        <Route path="/series" element={<ListMedias />}/>
      </Route>
    </Routes>
  )
};
