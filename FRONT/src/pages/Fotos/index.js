import React from "react";
import { get } from "lodash";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { Container } from "../../styles/GlobalStyles";
import Loading from "../../components/Loading";
import { Title, Form } from "./styled";
import axios from "../../services/axios";
import * as actions from "../../store/modules/auth/actions";

export default function Fotos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [foto, setFoto] = React.useState("");

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);

        const url = get(data, "Fotos[0].url", "");

        if (url) {
          setFoto(`http://localhost:3001${url}`);
        }

        setIsLoading(false);
      } catch {
        toast.error("Erro ao obter imagem");
        setIsLoading(false);
        navigate("/");
      }
    };

    if (id) getData();
  }, [id, navigate]);

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setFoto(preview);

    const formData = new FormData();
    formData.append("foto", file);
    formData.append("aluno_id", id);

    try {
      setIsLoading(true);

      await axios.post("/fotos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Foto enviada com sucesso!");
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Erro ao enviar foto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : "Selecionar"}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
