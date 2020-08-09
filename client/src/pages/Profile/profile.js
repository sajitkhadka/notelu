import React from 'react';
import styled from 'styled-components/macro';

import ProfileBGImage from '../../img/ProfileEdit.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar,faEnvelope,faPhone } from '@fortawesome/free-solid-svg-icons';
import { Form,Input,InputDiv} from './profileStyles';


export var Image = styled.div`
  width: 40%;
  background-color: lightcoral;
  background: url(${ProfileBGImage}) no-repeat right center/cover;
  flex: 2;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const profile = ()=>{
return (
        <React.Fragment>
          <Form style={{minWidth:"400px"}}>
            
            <InputDiv>
            <FontAwesomeIcon icon={faUser} />
            <div>
                <Input type="text" placeholder="First Name"></Input>
            </div>
            </InputDiv>

            <InputDiv>
            <FontAwesomeIcon icon={faUser} />
            <div>
                <Input type="text" placeholder="Last Name"></Input>
            </div>
            </InputDiv>

            <InputDiv>
            <FontAwesomeIcon icon={faEnvelope} />
            <div>
                <Input type="text" placeholder="Email"></Input>
            </div>
            </InputDiv>

            <InputDiv>
            <FontAwesomeIcon icon={faPhone} />
            <div>
                <Input type="text" placeholder="Phone"></Input>
            </div>
            </InputDiv>

             <InputDiv>
            <FontAwesomeIcon icon={faCalendar} />
            <div>
                <Input type="text" placeholder="Date of Birth"></Input>
            </div>
            </InputDiv>
           
            
        </Form>
      </React.Fragment>
    );
}

export default profile;
