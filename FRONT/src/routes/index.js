import React from "react";
import { Routes as Switch, Route } from "react-router-dom";

import MyRoute from "./MyRoute";

import Aluno from "../pages/Aluno";
import Alunos from "../pages/Alunos";
import Fotos from "../pages/Fotos";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Page404 from "../pages/Page404";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" element={<Alunos />} isClosed={false} />

      <Route
        path="/aluno/:id/edit"
        element={
          <MyRoute isClosed>
            <Aluno />
          </MyRoute>
        }
      />

      <Route
        path="/aluno"
        element={
          <MyRoute isClosed>
            <Aluno />
          </MyRoute>
        }
      />

      <Route
        path="/fotos/:id"
        element={
          <MyRoute isClosed>
            <Fotos />
          </MyRoute>
        }
      />

      <Route exact path="/login" element={<Login />} isClosed={false} />

      <Route exact path="/register" element={<Register />} isClosed={false} />

      <Route path="*" element={<Page404 />} />
    </Switch>
  );
}
