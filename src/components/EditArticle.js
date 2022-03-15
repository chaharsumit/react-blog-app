import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { composeURL } from "../utils/constant";
import { getToken } from "../utils/storage";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ROOT_URL } from "../utils/constant";

export default function EditArticle(props) {
  const [article, setArticle] = useState({
    title: null,
    description: null,
    body: null,
    tagList: null
  });

  let navigate = useNavigate();

  let params = useParams();

  useEffect(
    () =>
      fetch(ROOT_URL + `articles/${params.slug}`)
        .then(res => res.json())
        .then(({ article }) =>
          setArticle({
            ...article,
            tagList: article.tagList.join(",")
          })
        ),
    []
  );

  function handleChange({ target }) {
    let { name, value } = target;
    setArticle({
      ...article,
      [name]: value
    });
  }

  function editArticle() {
    let { title, description, body, tagList } = article;
    fetch(ROOT_URL + `articles/${params.slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tagList
            .slice(0)
            .split(",")
            .map(tag => tag.trim())
        }
      })
    })
      .then(res => res.json())
      .then(() => navigate(`/articles/${params.slug}`));
  }

  function composeArticle(event) {
    event.preventDefault();
    editArticle();
  }

  return article.success ? (
    <Navigate to={`/articles/${article.redirectTo}`} replace={true} />
  ) : (
    <section className="compose flex container">
      <form onSubmit={composeArticle} className="form flex">
        <input
          onChange={handleChange}
          value={article.title}
          className="form-control"
          type="text"
          name="title"
          placeholder="Article Title"
        />
        <input
          onChange={handleChange}
          className="form-control"
          value={article.description}
          type="text"
          name="description"
          placeholder="What's this article about?"
        />
        <textarea
          onChange={handleChange}
          value={article.body}
          type="text"
          name="body"
          placeholder="Write your article(in markdown)"
          className="compose-textarea form-control"
        />
        <input
          onChange={handleChange}
          value={article.tagList}
          className="form-control"
          type="text"
          name="tagList"
          placeholder="Enter Tags"
        />
        <input
          type="submit"
          value="Edit Article"
          className="form-control submit-btn"
        />
      </form>
    </section>
  );
}
