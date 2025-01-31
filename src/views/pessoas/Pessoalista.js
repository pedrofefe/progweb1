import React, { useState, useEffect } from 'react';

import { connect } from "react-redux";

import {listarPessoa} from "../../redux/actions/PessoaAction";
import {pessoaListaFilter} from "../../redux/filters/PessoaFilter"

import PessoaService from '../../service/PessoaService';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import '../../Styles.css';

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencilAlt,faTrashAlt,faSearch} from '@fortawesome/free-solid-svg-icons'



  function Pessoalista(){

    useEffect(() =>{
      listar();
    },[]);
    

    const [show, setShow] = useState(false);
    const [listaPessoas, setListaPessoas] = useState([]);
    const [pessoaSelecionada,setPessoaSelecionada] = useState({});
    const [search,setSearch] = useState('');

    
    const handleClose = () => setShow(false); 
    const handleShow = (pessoa) => {setPessoaSelecionada(pessoa); setShow(true) };
    const handleSearch = (event) => setSearch(event.target.value);
    const handleExcluir = () => { 

      PessoaService.excluir(pessoaSelecionada.id)
      .then( response => {

          const listaAtualizada = listaPessoas.filter(filterExcluir);
          setListaPessoas(listaAtualizada);

          console.log( "RESPONSE = ", response);
      })
      .catch ( error => console.log("ERROR = ", error) )

      setShow(false);
  };

  const filterExcluir = (pessoa) => {
      return pessoa.id != pessoaSelecionada.id;
  }



    const filterSearch = (pessoa) => {
      return (
      pessoa.nome.toLowerCase().includes(search.toLowerCase()) ||
      pessoa.cpf.toLowerCase().includes(search.toLowerCase())
      )
    }
  
    
      //aaaaaaaaaa
      
      const listar = () => {

        props.listarPessoa();

    }

      
   
    return(
    <div>
        <h1>Lista de Pessoa</h1>
        <div className="container">
          <div className="row">
            <div className="col-sm text-align-left">
              <Link to={"/pessoa/formulario"} className="btn btn-primary">Novo</Link>
            </div>
            <div className="col-sm text-align-right">
              <div className="input-group flex-nowrap">
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" onChange ={handleSearch} />
                <span className="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faSearch} /></span>
              </div>    </div>
          </div>
        </div>

        

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Ordem</th>
              <th scope="col">Nome</th>
              <th scope="col">Cpf</th>
              <th scope="col">Operações</th>
            </tr>
          </thead>
          <tbody>

          {props.pessoaLista
          .filter(filterSearch)
          .map( (pessoa, index) => {

          return(
            <tr key= {index}>
              <th scope="row">{pessoa.id}</th>
              <td>{pessoa.nome}</td>
              <td>{pessoa.cpf}</td>
              <td>
                <Link to={`/pessoa/formulario/${pessoa.id}`} className="btn btn-outline-dark mrl-10"><FontAwesomeIcon icon={faPencilAlt} /></Link>
                <Button  variant="outline-dark" onClick={ () => handleShow(pessoa)  } ><FontAwesomeIcon icon={faTrashAlt} /></Button>

              </td>

            </tr>
            );
          })}
          
          </tbody>
        </table>


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>Deseja realmente excluir o, {pessoaSelecionada.nome}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
          </Button>
            <Button variant="danger" onClick={handleExcluir}>
             Excluir
          </Button>
          </Modal.Footer>
        </Modal>




    </div>
    );
 }
 export default connect(pessoaListaFilter,{listarPessoa})(PessoaLista);
