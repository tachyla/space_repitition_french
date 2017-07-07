import * as Cookies from 'js-cookie';

export const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
export const fetchQuestionsRequest = () => ({
  type: FETCH_QUESTIONS_REQUEST
});

export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const fetchQuestionsSuccess = questions => ({
  type: FETCH_QUESTIONS_SUCCESS,
  questions

});

export const FETCH_QUESTIONS_ERROR = 'FETCH_QUESTIONS_ERROR';
export const fetchQuestionsError = error => ({
  type: FETCH_QUESTIONS_ERROR,
  error
});



export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST
});

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  user

});

export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const fetchUserError = error => ({
  type: FETCH_USER_ERROR,
  error
});

export const NEXT_QUESTION = 'NEXT_QUESTION';
export const nextQuestion = (counter,boolean,numerator,denominator, currentQuestion) => ({
  type: NEXT_QUESTION,
  counter,
  boolean,
  numerator,
  denominator,
  currentQuestion
});

export const UPDATE_SCORE_REQUEST = 'UPDATE_SCORE_REQUEST';
export const updateScoreRequest = user => ({
  type: UPDATE_SCORE_REQUEST,
  user
});
export const UPDATE_SCORE_SUCCESS = 'UPDATE_SCORE_SUCCESS';
export const updateScoreSuccess = user => ({
  type: UPDATE_SCORE_SUCCESS,
  user
});
export const UPDATE_SCORE_ERROR = 'UPDATE_SCORE_ERROR';
export const updateScoreError = user => ({
  type: UPDATE_SCORE_ERROR,
  user
});

export const fetchQuestions = (accessToken) => (dispatch) => {
  dispatch(fetchQuestionsRequest());
  fetch('/api/questions', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(res => {
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  }).then(data => {
    dispatch(fetchQuestionsSuccess(data));
  }).catch(error => {
    dispatch(fetchQuestionsError(error));
  });
};

export const fetchUser = (accessToken) => (dispatch) => {
  dispatch(fetchUserRequest());
  fetch(`/api/users/${accessToken}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(res => {
    console.log('RES', res);
    if(!res.ok) {
      if(res.status === 401) {
        Cookies.remove('accessToken');
        return;
      }
      return Promise.reject(res.statusText);
    }
    return res.json();
  }).then(user => {
    console.log(user);
    dispatch(fetchUserSuccess(user));
  }).catch(error => {
    dispatch(fetchUserError(error));
  });
  
 
};

export const updateScore = (accessToken) => (dispatch, getState) => {
  const state = getState();
  console.log(state.score);
  dispatch(updateScoreRequest());
  fetch(`/api/users/${state.googleId.toString()}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({'score': state.score})
  }).then(res => {
    console.log(res);
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    dispatch(updateScoreSuccess(res));
  }).catch(err => {
    dispatch(updateScoreError(err));
  });
};