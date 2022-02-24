import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    //validation
    //...

    //request

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=
    [YOUR_SECRET_KEY]`,
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(async (res) => {
      authCtx.logout();
      navigate('/auth', {
        replace: true,
      });
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          ref={newPasswordInputRef}
          minLength='7'
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
