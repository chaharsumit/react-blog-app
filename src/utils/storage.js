export function setToken(token){
  localStorage.setItem('token', token);
}

export function getToken(){
  if(localStorage.token){
    return localStorage.token;
  }else{
    return null;
  }
}