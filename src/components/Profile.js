import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { articlesURL, ROOT_URL } from "../utils/constant";
import { profileURL } from "../utils/constant";
import { getToken } from "../utils/storage";
import Loader from './Loader';


export default function Profile(props) {
  const [activeTab, setTab] = useState("author");
  const [articles, setArticles] = useState(null);
  const [userProfile, setProfile] = useState(null);

  let params = useParams();

  useEffect(() => {
      getProfileUser();
      getProfileArticles();
  }, [activeTab]);
  

  /*
    function getAuthorArticles(){
      fetch(articlesURL + `/?limit=10&author=${props.user.username}`)
        .then(res => res.json())
        .then(({articles}) =>
          setArticles({
            articles
          })
        );
    }
  */


  function getProfileUser() {
    fetch(profileURL + params.username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(({profile}) => {
        setProfile(profile)
      });
  }

  function getProfileArticles() {
    let limit = 10;
    let new_url = (activeTab === 'author' ? `/?limit=${limit}&author=${params.username}` : `/?limit=${limit}&favorited=${params.username}`);
    fetch(articlesURL + new_url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(
        ({ articles }) =>
          setArticles({
            articles: articles
          })
      )
      .catch(err => {
        this.setState({ error: "Not Able to fetch articles" });
      });
  }

  function handleArticles(value){
    setTab(
      value
    );
  }

  function followUser(){
    fetch(ROOT_URL + `profiles/${params.username}/follow`, {
      method: "POST",
      headers: {
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(({profile}) => {
        setProfile(profile)
        console.log(profile)
      });
  }

  function unfollowUser(){
    fetch(ROOT_URL + `profiles/${params.username}/follow`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(({profile}) => {
        setProfile(profile)
      });
  }

  return (
    !userProfile ? (<Loader />) : (
    <>
      <section className="profile-hero">
        <div className="container flex">
          <div className="profile-info flex">
            <img src={userProfile ? userProfile.image : 'avatar.png'} className="profile-image" />
            <h3>{userProfile ? params.username : props.user.username}</h3>
            <p>{userProfile ? userProfile.bio : props.user.bio}</p>
          </div>
            {
              !userProfile.following ? <button className="setting-btn flex" onClick={followUser}>Follow user</button> : <button className="setting-btn flex" onClick={unfollowUser}>Unfollow user</button>
            }
            { !userProfile ? <button className="setting-btn flex"><Link to="/settings">Profile Settings</Link></button> : '' }
        </div>
      </section>
      <section className="profile-feed-section container">
        <ul className="feed-menu flex">
          <li
            onClick={() => handleArticles('author')}
            className={
              activeTab === 'author' ? "feed-status active-feed" : "feed-status"
            }
          >
            My Articles
          </li>
          <li onClick={() => handleArticles('favourited')} className={activeTab === 'favourited' ? "feed-status active-feed" : 'feed-status'}>Favourited Articles</li>
        </ul>
      </section>
      <section className="articles-container">
          <div className="container flex">
            {
              !articles ? '' : (
                  articles.articles.map(article => (
                    <article key={article.slug} className="article-card flex">
                      <div className="user-info flex">
                        <img src={article.author.image} className='user-icon' />
                        <div className='article-creation-info'>
                          <h6 className='text-sm text-primary'>
                            <Link to={`/profiles/${article.author.username}`} className='text-sm text-primary site-link'>
                              {article.author.username}
                            </Link>
                          </h6>
                          <time className='text-xsm text-secondary'>{
                            props.getDate(article.createdAt)
                          }
                          </time>
                          <button className='favourite-count'>💚 {article.favoritesCount}</button>
                        </div>
                      </div>
                      <div className="article-info">
                        <Link to={`/articles/${article.slug}`} className='site-link'>
                          <h3 className='text-md text-bold text-primary'>{article.title}</h3>
                        </Link>
                        <p className='text-sm text-secondary'>{article.description}</p>
                      </div>
                      <div className="read-info flex">
                        <Link to={`/articles/${article.slug}`} style={{textDecoration: 'none'}}>
                          <p className='text-xsm text-secondary read-link'>Read More...</p>
                        </Link>
                        <ul className='article-card-tag-list flex'>
                          {
                            article.tagList?.map(tag => (
                              <li key={tag} className='text-xsm text-secondary tag-item'>{tag}</li>
                            ))
                          }
                        </ul>
                      </div>
                    </article>
                  ))
              ) 
            }
          </div>
        </section>
    </>)
  );
}
/*

<section className="articles-container">
          <div className="container flex">
            {
              !articles ? '' : (
                  articles.map(article => (
                    <article key={article.slug} className="article-card flex">
                      <div className="user-info flex">
                        <img src={article.author.image} className='user-icon' />
                        <div className='article-creation-info'>
                          <h6 className='text-sm text-primary'>{article.author.username}</h6>
                          <time className='text-xsm text-secondary'>{
                            props.getDate(article.createdAt)
                          }
                          </time>
                        </div>
                      </div>
                      <div className="article-info">
                        <h3 className='text-md text-bold text-primary'>{article.title}</h3>
                        <p className='text-sm text-secondary'>{article.description}</p>
                      </div>
                      <div className="read-info flex">
                        <Link to={`/articles/${article.slug}`} style={{textDecoration: 'none'}}>
                          <p className='text-xsm text-secondary read-link'>Read More...</p>
                        </Link>
                        <ul className='article-card-tag-list flex'>
                          {
                            article.tagList?.map(tag => (
                              <li key={tag} className='text-xsm text-secondary tag-item'>{tag}</li>
                            ))
                          }
                        </ul>
                      </div>
                    </article>
                  ))
              ) 
            }
          </div>
        </section>

*/
