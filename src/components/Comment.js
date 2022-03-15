import { useState, useEffect } from "react";
import { ROOT_URL } from "../utils/constant";
import { getToken } from "../utils/storage";
import { Link } from 'react-router-dom';

export default function Comment(props){
  const [comments, setComment] = useState(null);
  const [body, setBody] = useState(null);
  let article = props.article.article.article;

  useEffect(() => {
    fetchComments();
  },[]);

  function fetchComments(){
    fetch(props.baseUrl + '/' + article.slug + '/comments').then(res => res.json()).then(comments => setComment({
      comments
    }))
  }


  async function postComment(){
    fetch(ROOT_URL + `articles/${props.article.article.article.slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`
      },
      body: JSON.stringify({
        comment: {
          body: body,
        }
      })
    })
      .then(() => {
        setBody(null);
        fetchComments();
      })
  }

  function handleComment(event){
    event.preventDefault();
    postComment();
  }

  function handleChange({target}){
    let { value } = target;
    setBody(
      value
    )
  }

  function deleteComment(id){
    fetch(ROOT_URL + `articles/${props.article.article.article.slug}/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${getToken()}`
      },
    })
      .then(() => fetchComments());
  }

  function getComments(){
    if(!comments){
      return <p>Loading Comments...</p>
    }else{
      return (
        <>
          {
            props.user ? <CommentForm handleChange={handleChange} body={body} handleComment={handleComment} />  : <p><Link to='/signup' className='text-danger'>Sign up</Link> or <Link to='/login' className="text-danger">Sign in</Link> to add comments to this article</p>
          }
          <ul className='comment-cards-list flex'>
            {
              comments.comments.comments.map(comment => (
                <li key={comment.id} className='comment-card'>
                  <p className='text-xsm comment-description'>{comment.body}</p>
                  <div className='comment-author-info flex'>
                    <img src={comment.author.image ? comment.author.image : "logo512.png"} className='user-icon-sm' />
                    <p className='text-xsm text-light'>{comment.author.username}</p>
                    <time className='text-xsm text-light'>{props.getDate(comment.createdAt)}</time>
                    {
                      props.user && props.user.username === comment.author.username ? <span onClick={() => deleteComment(comment.id)}>❌</span> : ''
                    }
                  </div>
                </li>
              )) 
            }
          </ul>
        </>
      )
    }
  }

  return (
    <section className='comment-section'>
      <div className='container flex'>
        {
          getComments()
        }
      </div>
    </section>
  )
}

function CommentForm(props){
  return (
    <form onSubmit={props.handleComment} className="comment-form flex">
      <textarea onChange={props.handleChange} value={props.body ? props.body : ''} name='body' type='text' placeholder='Add Comment' className="comment-textarea form-control"  />
      <fieldset className="comment-fieldset flex">
        <input type='submit' value='Post Comment' className="comment-submit" />
      </fieldset>
    </form>
  )
}