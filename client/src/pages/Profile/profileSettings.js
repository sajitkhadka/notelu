import React,{useState,useEffect} from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';
import { Pagecontainer,InputContainer} from '../Login/container';
import Navbar from '../../layout/navbar';

import ProfileBGImage from '../../img/ProfileEdit.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar,faLock,faPhone } from '@fortawesome/free-solid-svg-icons';
import { Form,Input,InputDiv,Button} from './profileStyles';

export var Image = styled.div`
max-width:30%;
  background-color: lightcoral;
  background: url(${ProfileBGImage}) no-repeat right center/cover;
  flex: 2;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ProfileSettings = ()=> {

    const [profile,setProfile] = useState({
        name:"",
        dob:"",
        password:"",
    })

    useEffect(()=>{
      loadProfile()
    },[])

    const loadProfile =()=>{
      axios({
        method:'GET',
          url: `${process.env.REACT_APP_API}/profile`,
          data:{name,dob,password}
      })
    }

    const {name,dob,password} = profile;

    const inputChangeHandler = name=>(e)=> {
      setProfile({...profile,[name]:e.target.value})
    };

    
    const onFormSubmit = (event)=>{
        event.preventDefault();

        axios({
          method:'POST',
          url: `${process.env.REACT_APP_API}/profile/update`,
          data:{name,dob,password}
        })        
        .then(response =>{
           // console.log(response);
            setProfile({...profile,name:'',dob:'',password:''})
            alert(`Profile for ${response.data.name} has been updated`)
        })
        .catch((error)=>{
            if(error){
                console.log(error.response);
                alert(error)
            }

        })
    }
  
    return (
        <React.Fragment>
          <Navbar />
          <Pagecontainer>
            <Image />
            <InputContainer>
              <Form onSubmit={onFormSubmit}>
                <h1>Profile</h1>
                <p style={{fontSize:'1.2rem'}}>You may edit your profile and click update to submit changes</p>
                <InputDiv>
                  <FontAwesomeIcon icon={faUser} />
                  <div>
                    <Input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={inputChangeHandler('name')}
                    ></Input>
                  </div>
                </InputDiv>
                <InputDiv>
                  <FontAwesomeIcon icon={faCalendar} />
                  <div>
                    <Input
                      type="date"
                      placeholder="Date of Birth"
                      value={dob}
                      onChange={inputChangeHandler('dob')}
                    ></Input>
                  </div>
                </InputDiv>
                <InputDiv>
                  <FontAwesomeIcon icon={faLock} />
                  <div>
                    <Input
                      type="email"
                      placeholder="email"
                      
                    ></Input>
                  </div>
                </InputDiv>
                <InputDiv>
                  <FontAwesomeIcon icon={faLock} />
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={inputChangeHandler('password')}
                    ></Input>
                  </div>
                </InputDiv>
  
                <Button type="submit" value="Update"></Button>
              </Form>
            </InputContainer>
          </Pagecontainer>
        </React.Fragment>
    );
}


export default ProfileSettings;