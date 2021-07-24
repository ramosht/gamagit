import React, { useRef, useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

function App(props) {
  const history = useHistory();
  const usuario = useRef();
  const [ erro, setErro ] = useState(false);

  const handleSubmit = e => {
    e.preventDefault()

    axios.get(`https://api.github.com/users/${usuario.current.value}/repos`)
      .then(response => {
        const repositories = response.data
        const repositoriesName = []

        repositories.map(repository => {
          return repositoriesName.push(repository.name)
        })

        localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName))

        setErro(false)

        history.push('/repositories')
      })
      .catch(err => {
        setErro(true)
      })
  }

  return (
    <S.HomeContainer>
      <S.Content onSubmit={handleSubmit}>
        <S.Input className="usuarioInput" placeholder="Usuário" ref={usuario} />
        <S.Button type="submit">Pesquisar</S.Button>
      </S.Content>
      { erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : '' }
    </S.HomeContainer>
  );
}

export default App;