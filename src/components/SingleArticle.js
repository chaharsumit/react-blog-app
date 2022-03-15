import React from "react";
import ArticleHero from "./ArticleHero";
import ArticleBody from "./ArticleBody";
import Comment from "./Comment";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { ROOT_URL, userURL } from "../utils/constant";
import { getToken } from "../utils/storage";

///api/articles/:slug/favorite

export default function SingleArticle(props) {
  const [article, setArticle] = useState(null);
  const [profile, setProfile] = useState(null);
  let slug = useParams().slug;

  const navigate = useNavigate();

  useEffect(() => {
    fetchArticle();
  }, []);

  function fetchArticle() {
    fetch(props.baseUrl + "/" + slug, {
      method: "GET",
      headers: {
        Authorization: `Token ${getToken()}`
      },
    })
      .then(res => res.json())
      .then(article =>
        setArticle({
          article
        })
      );
  }

  async function deleteArticle() {
    try {
      await fetch(ROOT_URL + `articles/${article.article.article.slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${getToken()}`
        }
      });

      navigate("/");
    } catch (error) {
      console.dir(error);
    }
  }

  function favouriteArticle() {
    fetch(ROOT_URL + `articles/${article.article.article.slug}/favorite`, {
      method: "POST",
      headers: {
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(article =>
        setArticle({
          article
        })
      )
  }

  function unfavouriteArticle() {
    fetch(ROOT_URL + `articles/${article.article.article.slug}/favorite`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(article =>
        setArticle({
          article
        })
      );
  }

  function getUi() {
    if (!article) {
      return <Loader />;
    } else {
      return (
        <>
          <ArticleHero
            user={props.user}
            deleteArticle={deleteArticle}
            article={article}
            getDate={props.getDate}
            unfavouriteArticle={unfavouriteArticle}
            favouriteArticle={favouriteArticle}
            profile={profile}
          />
          <ArticleBody article={article} />
          <Comment
            article={article}
            baseUrl={props.baseUrl}
            user={props.user}
            getDate={props.getDate}
          />
        </>
      );
    }
  }
  return getUi();
}

/* articels happeing  due to passing object rather than value in setArticle */
