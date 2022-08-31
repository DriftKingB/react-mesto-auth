import Form from "../Form";
import Header from "../Header";
import useInputHandling from "../../custom_hooks/useInputHandling";
import { Link, useHistory } from "react-router-dom";
import auth from "../../utils/Auth";
import { useState } from "react";

export default function Login({ onSignIn }) {
  const history = useHistory();
  const [ isLoading, setIsLoading ] = useState(false);
  const hookConfig = {
    defaultInputs: { email: { value: '' }, password: { value: '' } },
    defaultInputIsValidState: false
  }
  const [ inputs, isValid, handleInputsUpdate, handleChange ] = useInputHandling(hookConfig);

  function handleSubmit(evt) {
    evt.preventDefault();
    
    setIsLoading(true);
    auth.login(inputs.email.value, inputs.password.value)
      .then((data) => { 
        onSignIn(data.token);
        history.push('/');
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  return(
    <>
      <Header 
        redirectLink={
          <Link className="header__link header__link_type_auth" to="sign-up">Регистрация</Link>
        }
      />
      <Form
        type='auth'
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isValid={isValid}
        inputs={inputs}
        name="login" 
        title="Вход" 
        submitText="Войти"
        loadingSubmitText="Вход"
        inputFieldset={
          <fieldset className="form__input-container form__input-container_type_auth">
            <div className="form__field">
              <input
                className={`form__input form__input_type_auth ${!(inputs.email?.isValid ?? true) ? 'form__input_invalid' : ''}`} 
                name="email" 
                id="email-input" 
                type="email" 
                placeholder="Email" 
                required 
                onChange={handleChange} 
                value={inputs.email?.value} 
              />
              <span className="form__input-error"> { inputs.email?.errorMessage } </span>
            </div>
            <div className="form__field">
              <input 
                className={`form__input form__input_type_auth ${!(inputs.password?.isValid ?? true) ? 'form__input_invalid' : ''}`} 
                name="password" 
                id="password-input" 
                type="password" 
                placeholder="Пароль" 
                required
                minLength="2" 
                maxLength="30" 
                onChange={handleChange} 
                value={inputs.password?.value} 
              />
              <span className="form__input-error"> { inputs.password?.errorMessage } </span>
            </div>
          </fieldset>
        } 
      />
    </>
  )
}