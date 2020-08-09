import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Form,Input,InputDiv,Button} from './profileStyles';



const changePassword = ()=>{
return (
          <React.Fragment>
         
          <Form style={{minWidth:"400px"}}>
           
            <InputDiv>
            <FontAwesomeIcon icon={faLock} />
            <div>
                <Input type="text" placeholder="Old Password"></Input>
            </div>
            </InputDiv>

            <InputDiv>
            <FontAwesomeIcon icon={faLock} />
            <div>
                <Input type="text" placeholder="New Password"></Input>
            </div>
            </InputDiv>

            <InputDiv>
            <FontAwesomeIcon icon={faLock} />
            <div>
                <Input type="text" placeholder="Confirm New Password"></Input>
            </div>
            </InputDiv>
            <Button type="submit" value="Submit"></Button>
          </Form>
          </React.Fragment>

    );
}



export default changePassword;
